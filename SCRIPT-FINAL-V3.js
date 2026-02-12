// =============================================
// LuMED - SCRIPT FINAL V4 - COPIE TODO ESTE CÓDIGO
// Matching por TIMESTAMP: vincula vídeo à aula
// cuja dataFim é mais próxima da data de criação do vídeo
// =============================================

var FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/lumed-aulas/databases/(default)/documents';
var ARQUIVO_CTRL = 'lumed_ctrl_v4.json';

// Janela máxima: só vincula vídeo criado até 3h após o fim da aula
var JANELA_MAX_MS = 3 * 60 * 60 * 1000;

// Função chamada pelo Web App
function doGet(e) {
  var resultado = sincronizar();
  return ContentService.createTextOutput(JSON.stringify(resultado)).setMimeType(ContentService.MimeType.JSON);
}

// FUNÇÃO PRINCIPAL
function sincronizar() {
  Logger.log('=== INICIANDO SINCRONIZAÇÃO V4 (TIMESTAMP MATCH) ===');

  var resultado = { videos: 0, aulas: 0 };
  var processados = getProcessados();
  var videosNovos = [];

  // ========== MÉTODO 1: Buscar vídeos com "tpq" no nome ==========
  Logger.log('Buscando vídeos com "tpq" no nome...');
  try {
    var videos = DriveApp.searchFiles('title contains "tpq" and mimeType = "video/mp4"');
    while (videos.hasNext()) {
      var video = videos.next();
      var id = video.getId();
      if (!processados[id]) {
        var dataCriacao = video.getDateCreated();
        videosNovos.push({
          id: id,
          nome: video.getName(),
          url: 'https://drive.google.com/file/d/' + id + '/view',
          dataCriacao: dataCriacao,
          fonte: 'busca-tpq'
        });
        Logger.log('  Encontrado (tpq): ' + video.getName() + ' | Criado: ' + dataCriacao.toISOString());
      }
    }
  } catch (e) {
    Logger.log('Erro na busca tpq: ' + e.message);
  }

  // ========== MÉTODO 2: Buscar em Meet Recordings/subpastas ==========
  Logger.log('Buscando em Meet Recordings...');
  try {
    var pastas = DriveApp.getFoldersByName('Meet Recordings');
    if (pastas.hasNext()) {
      var pastaRaiz = pastas.next();
      var subpastas = pastaRaiz.getFolders();

      while (subpastas.hasNext()) {
        var subpasta = subpastas.next();
        var idPasta = subpasta.getId();

        if (!processados['pasta_' + idPasta]) {
          var arquivos = subpasta.getFilesByType('video/mp4');
          if (arquivos.hasNext()) {
            var video = arquivos.next();
            var videoId = video.getId();

            if (!processados[videoId]) {
              var dataCriacao = video.getDateCreated();
              videosNovos.push({
                id: videoId,
                pastaId: idPasta,
                nome: video.getName(),
                url: 'https://drive.google.com/file/d/' + videoId + '/view',
                dataCriacao: dataCriacao,
                fonte: 'meet-recordings'
              });
              Logger.log('  Encontrado (Meet): ' + video.getName() + ' | Criado: ' + dataCriacao.toISOString());
            }
          }
        }
      }
    }
  } catch (e) {
    Logger.log('Erro Meet Recordings: ' + e.message);
  }

  // Deduplicar (mesmo vídeo pode aparecer nos 2 métodos)
  var idsVistos = {};
  var videosDedup = [];
  for (var k = 0; k < videosNovos.length; k++) {
    if (!idsVistos[videosNovos[k].id]) {
      idsVistos[videosNovos[k].id] = true;
      videosDedup.push(videosNovos[k]);
    }
  }
  videosNovos = videosDedup;

  Logger.log('Total vídeos novos (sem duplicatas): ' + videosNovos.length);

  if (videosNovos.length === 0) {
    Logger.log('Nenhum vídeo novo para processar');
    return resultado;
  }

  resultado.videos = videosNovos.length;

  // ========== Buscar aulas aguardando vídeo ==========
  var aulasAguardando = buscarAulasAguardando();
  Logger.log('Aulas aguardando: ' + aulasAguardando.length);

  // ========== Vincular vídeos às aulas POR TIMESTAMP ==========
  // Para cada aula, encontrar o vídeo cuja dataCriacao é mais próxima do dataFim da aula
  var videosUsados = {};

  for (var i = 0; i < aulasAguardando.length; i++) {
    var aula = aulasAguardando[i];
    var aulaFim = aula.dataFim ? new Date(aula.dataFim) : new Date(aula.dataInicio);

    var melhorVideo = null;
    var menorDif = Infinity;

    for (var j = 0; j < videosNovos.length; j++) {
      var video = videosNovos[j];
      if (videosUsados[video.id]) continue;

      var dif = Math.abs(video.dataCriacao.getTime() - aulaFim.getTime());

      // Só aceita vídeos dentro da janela de 3h
      if (dif < JANELA_MAX_MS && dif < menorDif) {
        melhorVideo = video;
        menorDif = dif;
      }
    }

    if (melhorVideo) {
      var difMin = Math.round(menorDif / 60000);
      Logger.log('MATCH: "' + melhorVideo.nome + '" -> "' + aula.tema + '" (diferença: ' + difMin + ' min)');

      if (atualizarAula(aula.path, melhorVideo.url)) {
        videosUsados[melhorVideo.id] = true;
        processados[melhorVideo.id] = { nome: melhorVideo.nome, data: new Date().toISOString(), aula: aula.tema };
        if (melhorVideo.pastaId) {
          processados['pasta_' + melhorVideo.pastaId] = true;
        }
        resultado.aulas++;
      }
    } else {
      Logger.log('SEM MATCH para aula: "' + aula.tema + '" (dataFim: ' + aulaFim.toISOString() + ')');
    }
  }

  salvarProcessados(processados);
  Logger.log('=== SINCRONIZAÇÃO CONCLUÍDA: ' + resultado.aulas + ' aula(s) vinculada(s) ===');
  return resultado;
}

// Buscar aulas com status aguardando-video (inclui dataFim para matching)
function buscarAulasAguardando() {
  var url = FIREBASE_URL + '/aulas';

  try {
    var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var data = JSON.parse(response.getContentText());

    if (!data.documents) return [];

    var aulas = [];
    for (var i = 0; i < data.documents.length; i++) {
      var doc = data.documents[i];
      var fields = doc.fields;

      if (fields.status && fields.status.stringValue === 'aguardando-video') {
        aulas.push({
          path: doc.name,
          tema: fields.tema ? fields.tema.stringValue : 'Sem tema',
          materia: fields.materia ? fields.materia.stringValue : '',
          dataInicio: fields.dataInicio ? fields.dataInicio.timestampValue : '',
          dataFim: fields.dataFim ? fields.dataFim.timestampValue : ''
        });
        Logger.log('  Aula aguardando: "' + (fields.tema ? fields.tema.stringValue : '?') +
          '" | Fim: ' + (fields.dataFim ? fields.dataFim.timestampValue : 'sem dataFim'));
      }
    }

    // Ordenar por dataFim (mais recente primeiro) - melhor para matching
    aulas.sort(function(a, b) {
      var dateA = a.dataFim || a.dataInicio;
      var dateB = b.dataFim || b.dataInicio;
      return dateB.localeCompare(dateA);
    });

    return aulas;

  } catch (e) {
    Logger.log('Erro ao buscar aulas: ' + e.message);
    return [];
  }
}

// Atualizar aula com vídeo
function atualizarAula(docPath, videoUrl) {
  var url = 'https://firestore.googleapis.com/v1/' + docPath;

  try {
    var getResp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var doc = JSON.parse(getResp.getContentText());

    doc.fields.status = { stringValue: 'finalizada' };
    doc.fields.videoUrl = { stringValue: videoUrl };

    var updateResp = UrlFetchApp.fetch(url, {
      method: 'PATCH',
      contentType: 'application/json',
      payload: JSON.stringify({ fields: doc.fields }),
      muteHttpExceptions: true
    });

    if (updateResp.getResponseCode() === 200) {
      Logger.log('Aula atualizada com sucesso!');
      return true;
    } else {
      Logger.log('Erro ao atualizar: ' + updateResp.getContentText());
      return false;
    }

  } catch (e) {
    Logger.log('Erro: ' + e.message);
    return false;
  }
}

// Controle de processados
function getProcessados() {
  try {
    var files = DriveApp.getFilesByName(ARQUIVO_CTRL);
    if (files.hasNext()) {
      return JSON.parse(files.next().getBlob().getDataAsString());
    }
  } catch (e) {}
  return {};
}

function salvarProcessados(dados) {
  var files = DriveApp.getFilesByName(ARQUIVO_CTRL);
  var content = JSON.stringify(dados, null, 2);

  if (files.hasNext()) {
    files.next().setContent(content);
  } else {
    DriveApp.createFile(ARQUIVO_CTRL, content);
  }
}

// Limpar controle (para testes)
function limparControle() {
  var files = DriveApp.getFilesByName(ARQUIVO_CTRL);
  if (files.hasNext()) {
    files.next().setContent('{}');
  }
  Logger.log('Controle limpo!');
}

// Trigger automático a cada 1 minuto
function ativarTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  ScriptApp.newTrigger('sincronizar')
    .timeBased()
    .everyMinutes(1)
    .create();

  Logger.log('Trigger ativado: executa a cada 1 minuto');
}

function desativarTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  Logger.log('Trigger desativado');
}

// Teste: mostra vídeos com datas e aulas com dataFim
function testar() {
  Logger.log('=== TESTE V4 (TIMESTAMP MATCH) ===');
  var processados = getProcessados();

  // Vídeos com tpq
  Logger.log('\n--- Vídeos com "tpq" ---');
  var count1 = 0;
  try {
    var videos = DriveApp.searchFiles('title contains "tpq" and mimeType = "video/mp4"');
    while (videos.hasNext()) {
      var v = videos.next();
      var jaProc = processados[v.getId()] ? ' [JÁ PROCESSADO]' : ' [NOVO]';
      Logger.log('  ' + v.getName() + ' | Criado: ' + v.getDateCreated().toISOString() + jaProc);
      count1++;
    }
  } catch(e) {}
  Logger.log('Total: ' + count1);

  // Meet Recordings
  Logger.log('\n--- Meet Recordings ---');
  var count2 = 0;
  try {
    var pastas = DriveApp.getFoldersByName('Meet Recordings');
    if (pastas.hasNext()) {
      var raiz = pastas.next();
      var subs = raiz.getFolders();
      while (subs.hasNext()) {
        var sub = subs.next();
        var arqs = sub.getFilesByType('video/mp4');
        while (arqs.hasNext()) {
          var a = arqs.next();
          var jaProc = processados[a.getId()] ? ' [JÁ PROCESSADO]' : ' [NOVO]';
          Logger.log('  ' + sub.getName() + '/' + a.getName() + ' | Criado: ' + a.getDateCreated().toISOString() + jaProc);
          count2++;
        }
      }
    }
  } catch(e) {}
  Logger.log('Total: ' + count2);

  // Aulas aguardando
  Logger.log('\n--- Aulas aguardando vídeo ---');
  var aulas = buscarAulasAguardando();
  for (var i = 0; i < aulas.length; i++) {
    Logger.log('  ' + aulas[i].materia + ': ' + aulas[i].tema + ' | Fim: ' + (aulas[i].dataFim || 'sem dataFim'));
  }
  Logger.log('Total: ' + aulas.length);

  // Simular matching
  Logger.log('\n--- SIMULAÇÃO DE MATCHING ---');
  var videosNovos = [];
  try {
    var allVids = DriveApp.searchFiles('title contains "tpq" and mimeType = "video/mp4"');
    while (allVids.hasNext()) {
      var vid = allVids.next();
      if (!processados[vid.getId()]) {
        videosNovos.push({ id: vid.getId(), nome: vid.getName(), dataCriacao: vid.getDateCreated() });
      }
    }
  } catch(e) {}

  for (var i = 0; i < aulas.length; i++) {
    var aula = aulas[i];
    var aulaFim = aula.dataFim ? new Date(aula.dataFim) : new Date(aula.dataInicio);
    var melhor = null;
    var menorDif = Infinity;
    for (var j = 0; j < videosNovos.length; j++) {
      var dif = Math.abs(videosNovos[j].dataCriacao.getTime() - aulaFim.getTime());
      if (dif < JANELA_MAX_MS && dif < menorDif) {
        melhor = videosNovos[j];
        menorDif = dif;
      }
    }
    if (melhor) {
      Logger.log('  MATCH: "' + aula.tema + '" <-> "' + melhor.nome + '" (dif: ' + Math.round(menorDif/60000) + ' min)');
    } else {
      Logger.log('  SEM MATCH: "' + aula.tema + '" (nenhum vídeo dentro de 3h)');
    }
  }
}

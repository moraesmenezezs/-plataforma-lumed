// =============================================
// LuMED - SCRIPT FINAL V3 - COPIE TODO ESTE CÓDIGO
// Busca vídeos em DOIS lugares:
// 1. Arquivos com "tpq" no nome
// 2. Subpastas do "Meet Recordings"
// =============================================

var FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/lumed-aulas/databases/(default)/documents';
var ARQUIVO_CTRL = 'lumed_ctrl_v3.json';

// Função chamada pelo Web App
function doGet(e) {
  var resultado = sincronizar();
  return ContentService.createTextOutput(JSON.stringify(resultado)).setMimeType(ContentService.MimeType.JSON);
}

// FUNÇÃO PRINCIPAL
function sincronizar() {
  Logger.log('=== INICIANDO SINCRONIZAÇÃO V3 ===');

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
        videosNovos.push({
          id: id,
          nome: video.getName(),
          url: 'https://drive.google.com/file/d/' + id + '/view',
          fonte: 'busca-tpq'
        });
        Logger.log('  Encontrado (tpq): ' + video.getName());
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
              videosNovos.push({
                id: videoId,
                pastaId: idPasta,
                nome: video.getName(),
                url: 'https://drive.google.com/file/d/' + videoId + '/view',
                fonte: 'meet-recordings'
              });
              Logger.log('  Encontrado (Meet): ' + video.getName());
            }
          }
        }
      }
    }
  } catch (e) {
    Logger.log('Erro Meet Recordings: ' + e.message);
  }

  Logger.log('Total vídeos novos: ' + videosNovos.length);

  if (videosNovos.length === 0) {
    Logger.log('Nenhum vídeo novo para processar');
    return resultado;
  }

  resultado.videos = videosNovos.length;

  // ========== Buscar aulas aguardando vídeo ==========
  var aulasAguardando = buscarAulasAguardando();
  Logger.log('Aulas aguardando: ' + aulasAguardando.length);

  // ========== Vincular vídeos às aulas ==========
  for (var i = 0; i < aulasAguardando.length && i < videosNovos.length; i++) {
    var aula = aulasAguardando[i];
    var video = videosNovos[i];

    Logger.log('Vinculando: ' + video.nome + ' -> ' + aula.tema);

    if (atualizarAula(aula.path, video.url)) {
      processados[video.id] = { nome: video.nome, data: new Date().toISOString() };
      if (video.pastaId) {
        processados['pasta_' + video.pastaId] = true;
      }
      resultado.aulas++;
    }
  }

  salvarProcessados(processados);
  Logger.log('=== SINCRONIZAÇÃO CONCLUÍDA: ' + resultado.aulas + ' aula(s) ===');
  return resultado;
}

// Buscar aulas com status aguardando-video
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
          dataInicio: fields.dataInicio ? fields.dataInicio.timestampValue : ''
        });
      }
    }

    // Ordenar por data (mais recente primeiro)
    aulas.sort(function(a, b) {
      return b.dataInicio.localeCompare(a.dataInicio);
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

// Teste: mostra vídeos e aulas encontrados
function testar() {
  Logger.log('=== TESTE V3 ===');

  // Vídeos com tpq
  Logger.log('\n--- Vídeos com "tpq" ---');
  var count1 = 0;
  try {
    var videos = DriveApp.searchFiles('title contains "tpq" and mimeType = "video/mp4"');
    while (videos.hasNext()) {
      var v = videos.next();
      Logger.log('  ' + v.getName());
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
          Logger.log('  ' + sub.getName() + '/' + a.getName());
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
    Logger.log('  ' + aulas[i].materia + ': ' + aulas[i].tema);
  }
  Logger.log('Total: ' + aulas.length);
}

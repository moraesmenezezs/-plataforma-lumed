// =============================================
// LuMED - SCRIPT FINAL - COPIE TODO ESTE CÓDIGO
// =============================================

var FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/lumed-aulas/databases/(default)/documents';

// Função chamada pelo Web App
function doGet(e) {
  var resultado = sincronizar();
  return ContentService.createTextOutput(JSON.stringify(resultado)).setMimeType(ContentService.MimeType.JSON);
}

// FUNÇÃO PRINCIPAL
function sincronizar() {
  Logger.log('=== INICIANDO SINCRONIZAÇÃO ===');

  var resultado = { videos: 0, aulas: 0 };
  var processados = getProcessados();

  // 1. Buscar vídeos com "tpq" no Drive
  var videos = DriveApp.searchFiles('title contains "tpq" and mimeType = "video/mp4"');
  var videosNovos = [];

  while (videos.hasNext()) {
    var video = videos.next();
    var id = video.getId();

    if (!processados[id]) {
      videosNovos.push({
        id: id,
        nome: video.getName(),
        url: 'https://drive.google.com/file/d/' + id + '/view'
      });
      resultado.videos++;
    }
  }

  Logger.log('Vídeos novos encontrados: ' + videosNovos.length);

  if (videosNovos.length === 0) {
    Logger.log('Nenhum vídeo novo para processar');
    return resultado;
  }

  // 2. Buscar aulas aguardando vídeo no Firebase
  var aulasAguardando = buscarAulasAguardando();
  Logger.log('Aulas aguardando: ' + aulasAguardando.length);

  // 3. Vincular vídeos às aulas (mais recente primeiro)
  for (var i = 0; i < aulasAguardando.length && i < videosNovos.length; i++) {
    var aula = aulasAguardando[i];
    var video = videosNovos[i];

    Logger.log('Vinculando: ' + video.nome + ' -> ' + aula.tema);

    if (atualizarAula(aula.path, video.url)) {
      processados[video.id] = { nome: video.nome, data: new Date().toISOString() };
      resultado.aulas++;
    }
  }

  // 4. Salvar processados
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
    // Primeiro buscar o documento atual
    var getResp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var doc = JSON.parse(getResp.getContentText());

    // Atualizar campos
    doc.fields.status = { stringValue: 'finalizada' };
    doc.fields.videoUrl = { stringValue: videoUrl };

    // Salvar
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

// Arquivo de controle de vídeos processados
var ARQUIVO_CTRL = 'lumed_ctrl.json';

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

// Configurar trigger automático (1 minuto)
function ativarTrigger() {
  // Remover triggers antigos
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  // Criar novo trigger
  ScriptApp.newTrigger('sincronizar')
    .timeBased()
    .everyMinutes(1)
    .create();

  Logger.log('Trigger ativado: executa a cada 1 minuto');
}

// Desativar trigger
function desativarTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  Logger.log('Trigger desativado');
}

// Teste manual
function testar() {
  Logger.log('=== TESTE ===');

  // Listar vídeos com tpq
  var videos = DriveApp.searchFiles('title contains "tpq" and mimeType = "video/mp4"');
  var count = 0;
  while (videos.hasNext()) {
    var v = videos.next();
    Logger.log('Video: ' + v.getName());
    count++;
  }
  Logger.log('Total videos: ' + count);

  // Listar aulas aguardando
  var aulas = buscarAulasAguardando();
  Logger.log('Aulas aguardando: ' + aulas.length);
  for (var i = 0; i < aulas.length; i++) {
    Logger.log('  - ' + aulas[i].tema + ' (' + aulas[i].materia + ')');
  }
}

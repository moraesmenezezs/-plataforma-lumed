// ============================================
// LuMED - Script de Sincronização Drive → Firebase
// VERSÃO 2 - Busca vídeos DENTRO das subpastas
// ============================================

const FIREBASE_PROJECT_ID = 'lumed-aulas';
const FIREBASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;
const PASTA_GRAVACOES = 'Meet Recordings';
const ARQUIVO_PROCESSADOS = 'lumed_videos_processados.json';

/**
 * WEB APP - Sincronização via URL
 */
function doGet(e) {
  const resultado = verificarNovasGravacoes();
  const output = ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Sincronização concluída',
    resultado: resultado
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * FUNÇÃO PRINCIPAL - Verifica gravações nas SUBPASTAS
 */
function verificarNovasGravacoes() {
  console.log('Execução iniciada');

  let resultado = {
    videosEncontrados: 0,
    aulasAtualizadas: 0
  };

  try {
    const pastas = DriveApp.getFoldersByName(PASTA_GRAVACOES);
    if (!pastas.hasNext()) {
      console.log('Pasta "Meet Recordings" não encontrada');
      return resultado;
    }

    const pastaRaiz = pastas.next();
    const processados = carregarProcessados();

    // Buscar SUBPASTAS (cada gravação do Meet é uma pasta)
    const subpastas = pastaRaiz.getFolders();

    while (subpastas.hasNext()) {
      const subpasta = subpastas.next();
      const idPasta = subpasta.getId();
      const nomePasta = subpasta.getName();

      // Pular se já processado
      if (processados[idPasta]) {
        continue;
      }

      console.log('Verificando pasta: ' + nomePasta);

      // Buscar vídeo MP4 DENTRO da subpasta
      const arquivos = subpasta.getFilesByType('video/mp4');

      if (arquivos.hasNext()) {
        const video = arquivos.next();
        const videoId = video.getId();
        const videoUrl = `https://drive.google.com/file/d/${videoId}/view`;

        resultado.videosEncontrados++;
        console.log('Vídeo encontrado: ' + video.getName());

        // Atualizar aula no Firebase
        const aulaAtualizada = atualizarAulaComVideo(videoUrl);

        if (aulaAtualizada) {
          processados[idPasta] = {
            nome: nomePasta,
            videoId: videoId,
            processadoEm: new Date().toISOString()
          };
          salvarProcessados(processados);
          resultado.aulasAtualizadas++;
          console.log('Aula atualizada com vídeo!');
        }
      }
    }

    console.log('Verificação concluída');

  } catch (error) {
    console.error('Erro: ' + error.message);
  }

  return resultado;
}

/**
 * Atualiza aula com status "aguardando-video"
 */
function atualizarAulaComVideo(videoUrl) {
  try {
    const queryUrl = FIREBASE_URL + '/aulas:runQuery';
    const query = {
      structuredQuery: {
        from: [{ collectionId: 'aulas' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'status' },
            op: 'EQUAL',
            value: { stringValue: 'aguardando-video' }
          }
        },
        orderBy: [{
          field: { fieldPath: 'dataInicio' },
          direction: 'DESCENDING'
        }],
        limit: 1
      }
    };

    const response = UrlFetchApp.fetch(queryUrl, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(query),
      muteHttpExceptions: true
    });

    const resultado = JSON.parse(response.getContentText());

    if (!resultado || resultado.length === 0 || !resultado[0].document) {
      console.log('Nenhuma aula aguardando vídeo');
      return false;
    }

    const doc = resultado[0].document;
    const docPath = doc.name;

    const updateUrl = `https://firestore.googleapis.com/v1/${docPath}?updateMask.fieldPaths=status&updateMask.fieldPaths=videoUrl`;
    const updateData = {
      fields: {
        ...doc.fields,
        status: { stringValue: 'finalizada' },
        videoUrl: { stringValue: videoUrl }
      }
    };

    const updateResponse = UrlFetchApp.fetch(updateUrl, {
      method: 'PATCH',
      contentType: 'application/json',
      payload: JSON.stringify(updateData),
      muteHttpExceptions: true
    });

    if (updateResponse.getResponseCode() === 200) {
      console.log('Aula atualizada: ' + videoUrl);
      return true;
    }
    return false;

  } catch (error) {
    console.error('Erro ao atualizar: ' + error.message);
    return false;
  }
}

function carregarProcessados() {
  try {
    const arquivos = DriveApp.getFilesByName(ARQUIVO_PROCESSADOS);
    if (arquivos.hasNext()) {
      return JSON.parse(arquivos.next().getBlob().getDataAsString());
    }
  } catch (e) {}
  return {};
}

function salvarProcessados(dados) {
  try {
    const arquivos = DriveApp.getFilesByName(ARQUIVO_PROCESSADOS);
    if (arquivos.hasNext()) {
      arquivos.next().setContent(JSON.stringify(dados, null, 2));
    } else {
      DriveApp.createFile(ARQUIVO_PROCESSADOS, JSON.stringify(dados, null, 2));
    }
  } catch (e) {}
}

/**
 * Configura trigger para 1 minuto
 */
function configurarTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'verificarNovasGravacoes') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('verificarNovasGravacoes')
    .timeBased()
    .everyMinutes(1)
    .create();
  console.log('Trigger configurado: 1 minuto');
}

/**
 * Limpa processados (para testes)
 */
function limparProcessados() {
  const arquivos = DriveApp.getFilesByName(ARQUIVO_PROCESSADOS);
  if (arquivos.hasNext()) {
    arquivos.next().setContent('{}');
    console.log('Processados limpos!');
  }
}

/**
 * Teste - Lista subpastas e vídeos
 */
function testarBusca() {
  const pastas = DriveApp.getFoldersByName(PASTA_GRAVACOES);
  if (!pastas.hasNext()) {
    console.log('Pasta não encontrada');
    return;
  }

  const pastaRaiz = pastas.next();
  const subpastas = pastaRaiz.getFolders();

  console.log('=== SUBPASTAS EM MEET RECORDINGS ===');
  while (subpastas.hasNext()) {
    const sub = subpastas.next();
    console.log('Pasta: ' + sub.getName());

    const videos = sub.getFilesByType('video/mp4');
    while (videos.hasNext()) {
      const v = videos.next();
      console.log('  → Vídeo: ' + v.getName() + ' (ID: ' + v.getId() + ')');
    }
  }
}

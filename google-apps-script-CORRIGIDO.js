// ============================================
// LuMED - Script de Sincronização Drive → Firebase
// VERSÃO CORRIGIDA - Busca apenas vídeos MP4
// ============================================

// Configuração do Firebase
const FIREBASE_PROJECT_ID = 'lumed-aulas';
const FIREBASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

// Nome da pasta de gravações do Meet no Drive
const PASTA_GRAVACOES = 'Meet Recordings';

// Arquivo para rastrear vídeos já processados
const ARQUIVO_PROCESSADOS = 'lumed_videos_processados.json';

/**
 * Função principal - Verifica novas gravações e atualiza Firebase
 * EXECUTA A CADA 5 MINUTOS
 */
function verificarNovasGravacoes() {
  console.log('Execução iniciada');

  try {
    // Buscar pasta de gravações
    const pastas = DriveApp.getFoldersByName(PASTA_GRAVACOES);

    if (!pastas.hasNext()) {
      console.log('Pasta "Meet Recordings" não encontrada');
      return;
    }

    const pasta = pastas.next();

    // Buscar APENAS arquivos de vídeo (MP4)
    const arquivos = pasta.getFilesByType('video/mp4');

    // Carregar lista de vídeos já processados
    const processados = carregarProcessados();

    while (arquivos.hasNext()) {
      const arquivo = arquivos.next();
      const id = arquivo.getId();
      const nome = arquivo.getName();

      // Pular se já foi processado
      if (processados[id]) {
        continue;
      }

      console.log('Novo vídeo encontrado: ' + nome);

      // Gerar link do Drive para visualização
      const videoUrl = `https://drive.google.com/file/d/${id}/view`;

      // Buscar aula mais recente aguardando vídeo
      const aulaAtualizada = atualizarAulaComVideo(videoUrl);

      if (aulaAtualizada) {
        // Marcar como processado
        processados[id] = {
          nome: nome,
          processadoEm: new Date().toISOString()
        };
        salvarProcessados(processados);

        console.log('Vídeo processado: ' + nome);
      }
    }

    console.log('Verificação concluída');

  } catch (error) {
    console.error('Erro na verificação: ' + error.message);
  }
}

/**
 * Atualiza a aula mais recente com status "aguardando-video"
 */
function atualizarAulaComVideo(videoUrl) {
  try {
    // Buscar aulas com status "aguardando-video"
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
        orderBy: [
          {
            field: { fieldPath: 'dataInicio' },
            direction: 'DESCENDING'
          }
        ],
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

    // Atualizar documento com o vídeo
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
      console.log('Aula atualizada com vídeo: ' + videoUrl);
      return true;
    } else {
      console.error('Erro ao atualizar aula: ' + updateResponse.getContentText());
      return false;
    }

  } catch (error) {
    console.error('Erro ao atualizar aula: ' + error.message);
    return false;
  }
}

/**
 * Carrega lista de vídeos já processados
 */
function carregarProcessados() {
  try {
    const arquivos = DriveApp.getFilesByName(ARQUIVO_PROCESSADOS);
    if (arquivos.hasNext()) {
      const arquivo = arquivos.next();
      const conteudo = arquivo.getBlob().getDataAsString();
      return JSON.parse(conteudo);
    }
  } catch (e) {
    console.log('Criando novo arquivo de controle');
  }
  return {};
}

/**
 * Salva lista de vídeos processados
 */
function salvarProcessados(dados) {
  try {
    const arquivos = DriveApp.getFilesByName(ARQUIVO_PROCESSADOS);
    if (arquivos.hasNext()) {
      const arquivo = arquivos.next();
      arquivo.setContent(JSON.stringify(dados, null, 2));
    } else {
      DriveApp.createFile(ARQUIVO_PROCESSADOS, JSON.stringify(dados, null, 2));
    }
  } catch (e) {
    console.error('Erro ao salvar processados: ' + e.message);
  }
}

/**
 * Configura o trigger para executar a cada 5 minutos
 */
function configurarTrigger() {
  // Remover triggers antigos
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'verificarNovasGravacoes') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Criar novo trigger
  ScriptApp.newTrigger('verificarNovasGravacoes')
    .timeBased()
    .everyMinutes(5)
    .create();

  console.log('Trigger configurado para executar a cada 5 minutos');
}

/**
 * Função de teste - Lista todos os arquivos na pasta Meet Recordings
 */
function listarArquivosDaPasta() {
  const pastas = DriveApp.getFoldersByName(PASTA_GRAVACOES);

  if (!pastas.hasNext()) {
    console.log('Pasta "Meet Recordings" não encontrada');
    return;
  }

  const pasta = pastas.next();
  console.log('=== TODOS OS ARQUIVOS NA PASTA ===');

  const todosArquivos = pasta.getFiles();
  while (todosArquivos.hasNext()) {
    const arquivo = todosArquivos.next();
    console.log('Nome: ' + arquivo.getName());
    console.log('Tipo: ' + arquivo.getMimeType());
    console.log('ID: ' + arquivo.getId());
    console.log('---');
  }

  console.log('=== APENAS VÍDEOS (MP4) ===');
  const videos = pasta.getFilesByType('video/mp4');
  let countVideos = 0;
  while (videos.hasNext()) {
    const video = videos.next();
    console.log('Vídeo: ' + video.getName());
    countVideos++;
  }
  console.log('Total de vídeos: ' + countVideos);
}

/**
 * Função de teste - Verifica conexão
 */
function testarConexao() {
  console.log('Testando conexão...');

  // Testar Drive
  const pastas = DriveApp.getFoldersByName(PASTA_GRAVACOES);
  if (pastas.hasNext()) {
    console.log('✓ Pasta "Meet Recordings" encontrada');

    const pasta = pastas.next();
    const videos = pasta.getFilesByType('video/mp4');
    let count = 0;
    while (videos.hasNext()) {
      videos.next();
      count++;
    }
    console.log('✓ ' + count + ' vídeo(s) MP4 encontrado(s)');
  } else {
    console.log('✗ Pasta não encontrada');
  }

  // Testar Firebase
  try {
    const response = UrlFetchApp.fetch(FIREBASE_URL + '/aulas?pageSize=1', {
      method: 'GET',
      muteHttpExceptions: true
    });

    if (response.getResponseCode() === 200) {
      console.log('✓ Firebase acessível');
    } else {
      console.log('✗ Firebase erro: ' + response.getResponseCode());
    }
  } catch (e) {
    console.log('✗ Firebase erro: ' + e.message);
  }
}

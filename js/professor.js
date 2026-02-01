// ============================================
// LuMED - JavaScript do Painel do Professor
// ============================================

// Elementos do DOM
const selectMateria = document.getElementById('select-materia');
const inputTema = document.getElementById('input-tema');
const inputMeet = document.getElementById('input-meet');
const btnSalvarLink = document.getElementById('btn-salvar-link');
const btnIniciar = document.getElementById('btn-iniciar');
const btnEncerrar = document.getElementById('btn-encerrar');
const formAula = document.getElementById('form-aula');
const aulaEmAndamento = document.getElementById('aula-em-andamento');
const aulaStatus = document.getElementById('aula-status');
const statusTexto = document.getElementById('status-texto');
const timerAula = document.getElementById('timer-aula');
const infoMateria = document.getElementById('info-materia');
const infoTema = document.getElementById('info-tema');
const infoInicio = document.getElementById('info-inicio');
const historicoLista = document.getElementById('historico-lista');
const toast = document.getElementById('toast');
const toastTexto = document.getElementById('toast-texto');
const btnSync = document.getElementById('btn-sync');
const syncStatus = document.getElementById('sync-status');
const syncSection = document.getElementById('sync-section');

// URL do Web App do Google Apps Script
const SYNC_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyfeVFRCD_lj9BdrYDP7T-xI9H6sI9FyuboIE_Yhc8SsRFfSxw9UhL9kL6-zfOGejKk/exec';

// Link fixo do Meet (mesma sala sempre)
// O parâmetro ?authuser=0&hs=122 ajuda a entrar mais rápido
const MEET_LINK_FIXO = 'https://meet.google.com/tpq-zxvy-cpe?authuser=0';

// Estado
let aulaAtual = null;
let timerInterval = null;
let segundosDecorridos = 0;

// Nomes das matérias para exibição
const nomesMateria = {
  biologia: 'Biologia',
  quimica: 'Química',
  fisica: 'Física',
  matematica: 'Matemática',
  portugues: 'Português',
  historia: 'História',
  geografia: 'Geografia',
  filosofia: 'Filosofia',
  sociologia: 'Sociologia',
  ingles: 'Inglês',
  redacao: 'Redação'
};

// Cores das matérias
const coresMateria = {
  biologia: '#22c55e',
  quimica: '#ec4899',
  fisica: '#8b5cf6',
  matematica: '#3b82f6',
  portugues: '#ef4444',
  historia: '#f59e0b',
  geografia: '#10b981',
  filosofia: '#6366f1',
  sociologia: '#14b8a6',
  ingles: '#06b6d4',
  redacao: '#f97316'
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  carregarLinkMeet();
  verificarAulaEmAndamento();
  carregarHistorico();
  inicializarEventos();
});

function inicializarEventos() {
  // Validar formulário
  selectMateria.addEventListener('change', validarFormulario);
  inputTema.addEventListener('input', validarFormulario);

  // Salvar link do Meet
  btnSalvarLink.addEventListener('click', salvarLinkMeet);

  // Iniciar aula
  btnIniciar.addEventListener('click', iniciarAula);

  // Encerrar aula
  btnEncerrar.addEventListener('click', encerrarAula);

  // Sincronizar vídeo
  if (btnSync) {
    btnSync.addEventListener('click', sincronizarVideo);
  }
}

// ============================================
// VALIDAÇÃO DO FORMULÁRIO
// ============================================
function validarFormulario() {
  const materiaValida = selectMateria.value !== '';
  const temaValido = inputTema.value.trim().length >= 3;

  btnIniciar.disabled = !(materiaValida && temaValido);
}

// ============================================
// LINK DO MEET
// ============================================
function carregarLinkMeet() {
  // Usar link fixo sempre
  inputMeet.value = MEET_LINK_FIXO;
  inputMeet.readOnly = true;
  inputMeet.style.backgroundColor = '#f1f5f9';

  // Esconder botão de salvar (não precisa mais)
  if (btnSalvarLink) {
    btnSalvarLink.style.display = 'none';
  }
}

function salvarLinkMeet() {
  // Não faz nada - link é fixo
  mostrarToast('Link fixo configurado!', 'info');
}

// ============================================
// INICIAR AULA
// ============================================
async function iniciarAula() {
  const materia = selectMateria.value;
  const tema = inputTema.value.trim();
  const meetLink = MEET_LINK_FIXO; // Sempre usa o link fixo

  if (!materia || !tema) {
    mostrarToast('Preencha todos os campos!', 'error');
    return;
  }

  // Criar objeto da aula
  aulaAtual = {
    id: gerarId(),
    materia: materia,
    tema: tema,
    meetLink: meetLink,
    dataInicio: new Date(),
    status: 'ao-vivo'
  };

  try {
    // Salvar no Firebase
    await aulasRef.doc(aulaAtual.id).set({
      ...aulaAtual,
      dataInicio: firebase.firestore.Timestamp.fromDate(aulaAtual.dataInicio)
    });

    // Atualizar interface
    mostrarAulaEmAndamento();

    // Abrir Meet em nova aba
    if (meetLink) {
      window.open(meetLink, '_blank');
    }

    mostrarToast('Aula iniciada com sucesso!', 'success');

  } catch (error) {
    console.error('Erro ao iniciar aula:', error);
    mostrarToast('Erro ao iniciar aula. Verifique a configuração do Firebase.', 'error');
  }
}

// ============================================
// MOSTRAR AULA EM ANDAMENTO
// ============================================
function mostrarAulaEmAndamento() {
  // Ocultar formulário
  formAula.style.display = 'none';

  // Mostrar info da aula
  aulaEmAndamento.style.display = 'block';

  // Atualizar status
  aulaStatus.className = 'aula-status ao-vivo';
  statusTexto.textContent = 'AULA AO VIVO';

  // Atualizar info
  infoMateria.textContent = nomesMateria[aulaAtual.materia] || aulaAtual.materia;
  infoTema.textContent = aulaAtual.tema;
  infoInicio.textContent = aulaAtual.dataInicio.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Iniciar timer
  iniciarTimer();

  // Salvar estado no localStorage
  localStorage.setItem('lumed_aula_atual', JSON.stringify(aulaAtual));
}

// ============================================
// TIMER
// ============================================
function iniciarTimer() {
  segundosDecorridos = 0;
  atualizarTimer();

  timerInterval = setInterval(() => {
    segundosDecorridos++;
    atualizarTimer();
  }, 1000);
}

function atualizarTimer() {
  const horas = Math.floor(segundosDecorridos / 3600);
  const minutos = Math.floor((segundosDecorridos % 3600) / 60);
  const segundos = segundosDecorridos % 60;

  timerAula.textContent =
    String(horas).padStart(2, '0') + ':' +
    String(minutos).padStart(2, '0') + ':' +
    String(segundos).padStart(2, '0');
}

function pararTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ============================================
// ENCERRAR AULA
// ============================================
async function encerrarAula() {
  if (!aulaAtual) return;

  pararTimer();

  const dataFim = new Date();
  const duracaoMinutos = Math.round(segundosDecorridos / 60);

  try {
    // Atualizar no Firebase - status "aguardando-video" até o script do Drive adicionar o vídeo
    await aulasRef.doc(aulaAtual.id).update({
      status: 'aguardando-video',
      dataFim: firebase.firestore.Timestamp.fromDate(dataFim),
      duracao: duracaoMinutos
    });

    // Limpar estado
    localStorage.removeItem('lumed_aula_atual');
    aulaAtual = null;

    // Voltar para formulário
    voltarParaFormulario();

    // Recarregar histórico
    carregarHistorico();

    mostrarToast('Aula encerrada e salva!', 'success');

  } catch (error) {
    console.error('Erro ao encerrar aula:', error);
    mostrarToast('Erro ao encerrar aula.', 'error');
  }
}

// ============================================
// VOLTAR PARA FORMULÁRIO
// ============================================
function voltarParaFormulario() {
  // Ocultar info da aula
  aulaEmAndamento.style.display = 'none';

  // Mostrar formulário
  formAula.style.display = 'block';

  // Resetar status
  aulaStatus.className = 'aula-status aguardando';
  statusTexto.textContent = 'Aguardando início da aula';

  // Limpar campos
  selectMateria.value = '';
  inputTema.value = '';
  btnIniciar.disabled = true;

  // Resetar timer
  segundosDecorridos = 0;
  timerAula.textContent = '00:00:00';
}

// ============================================
// VERIFICAR AULA EM ANDAMENTO
// ============================================
async function verificarAulaEmAndamento() {
  // Primeiro verificar localStorage
  const aulaSalva = localStorage.getItem('lumed_aula_atual');

  if (aulaSalva) {
    aulaAtual = JSON.parse(aulaSalva);
    aulaAtual.dataInicio = new Date(aulaAtual.dataInicio);

    // Calcular tempo decorrido
    const agora = new Date();
    segundosDecorridos = Math.floor((agora - aulaAtual.dataInicio) / 1000);

    mostrarAulaEmAndamento();
    return;
  }

  // Verificar no Firebase se há aula ao vivo
  try {
    const snapshot = await aulasRef
      .where('status', '==', 'ao-vivo')
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data();

      aulaAtual = {
        id: doc.id,
        materia: data.materia,
        tema: data.tema,
        meetLink: data.meetLink,
        dataInicio: data.dataInicio.toDate(),
        status: data.status
      };

      // Calcular tempo decorrido
      const agora = new Date();
      segundosDecorridos = Math.floor((agora - aulaAtual.dataInicio) / 1000);

      mostrarAulaEmAndamento();
    }
  } catch (error) {
    console.error('Erro ao verificar aula:', error);
  }
}

// ============================================
// CARREGAR HISTÓRICO
// ============================================
async function carregarHistorico() {
  try {
    const snapshot = await aulasRef
      .where('status', '==', 'finalizada')
      .orderBy('dataInicio', 'desc')
      .limit(5)
      .get();

    if (snapshot.empty) {
      historicoLista.innerHTML = `
        <div class="historico-vazio">
          <i class="bi bi-inbox"></i>
          <p>Nenhuma aula registrada ainda</p>
        </div>
      `;
      return;
    }

    historicoLista.innerHTML = '';

    snapshot.forEach(doc => {
      const aula = doc.data();
      const item = criarItemHistorico(aula);
      historicoLista.appendChild(item);
    });

  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    // Se der erro de índice, mostrar mensagem
    if (error.code === 'failed-precondition') {
      historicoLista.innerHTML = `
        <div class="historico-vazio">
          <i class="bi bi-exclamation-triangle"></i>
          <p>Configure o índice no Firebase</p>
          <small>Veja o console para mais detalhes</small>
        </div>
      `;
    }
  }
}

function criarItemHistorico(aula) {
  const div = document.createElement('div');
  div.className = 'historico-item';

  const cor = coresMateria[aula.materia] || '#8b5cf6';
  const nomeMateria = nomesMateria[aula.materia] || aula.materia;
  const data = formatarData(aula.dataInicio);
  const duracao = aula.duracao ? `${aula.duracao} min` : '';

  div.innerHTML = `
    <div class="historico-icon" style="background: ${cor}">
      <i class="bi bi-play-fill"></i>
    </div>
    <div class="historico-info">
      <div class="historico-materia">${nomeMateria}</div>
      <div class="historico-tema">${aula.tema}</div>
      <div class="historico-data">${data} ${duracao ? '• ' + duracao : ''}</div>
    </div>
  `;

  return div;
}

// ============================================
// TOAST
// ============================================
function mostrarToast(mensagem, tipo = 'info') {
  toast.className = `toast ${tipo}`;
  toastTexto.textContent = mensagem;

  // Ícone baseado no tipo
  const icone = toast.querySelector('i');
  if (tipo === 'success') {
    icone.className = 'bi bi-check-circle';
  } else if (tipo === 'error') {
    icone.className = 'bi bi-exclamation-circle';
  } else {
    icone.className = 'bi bi-info-circle';
  }

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ============================================
// GERAR ID
// ============================================
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ============================================
// SINCRONIZAR VÍDEO - COM MÚLTIPLAS TENTATIVAS
// ============================================
async function sincronizarVideo() {
  if (!btnSync) return;

  // Mostrar loading
  btnSync.disabled = true;
  btnSync.classList.add('loading');
  btnSync.innerHTML = '<i class="bi bi-arrow-repeat"></i> <span>SINCRONIZANDO...</span>';
  syncStatus.textContent = 'Buscando aulas aguardando vídeo...';
  syncStatus.className = 'sync-status';

  try {
    // Buscar aulas aguardando vídeo
    const snapshot = await aulasRef.where('status', '==', 'aguardando-video').get();
    const totalAguardando = snapshot.size;

    if (totalAguardando === 0) {
      syncStatus.textContent = 'Nenhuma aula aguardando vídeo.';
      syncStatus.className = 'sync-status';
      mostrarToast('Nenhuma aula para sincronizar.', 'info');
    } else {
      syncStatus.textContent = `${totalAguardando} aula(s) aguardando. Buscando vídeos no Drive...`;

      // Chamar o Web App do Apps Script
      try {
        fetch(SYNC_WEBAPP_URL, { mode: 'no-cors' });
      } catch (e) {}

      // Tentar verificar 3 vezes com intervalo de 2 segundos
      let aulasAtualizadas = 0;
      for (let tentativa = 1; tentativa <= 3; tentativa++) {
        syncStatus.textContent = `Verificando... (tentativa ${tentativa}/3)`;
        await new Promise(r => setTimeout(r, 2000));

        const novoSnapshot = await aulasRef.where('status', '==', 'aguardando-video').get();
        aulasAtualizadas = totalAguardando - novoSnapshot.size;

        if (aulasAtualizadas > 0) break;
      }

      if (aulasAtualizadas > 0) {
        syncStatus.textContent = `${aulasAtualizadas} aula(s) sincronizada(s)!`;
        syncStatus.className = 'sync-status success';
        mostrarToast(`${aulasAtualizadas} aula(s) sincronizada(s)!`, 'success');
      } else {
        syncStatus.textContent = 'Vídeo ainda não está no Drive. Aguarde ~2min após parar gravação.';
        syncStatus.className = 'sync-status';
        mostrarToast('Vídeo ainda não disponível.', 'info');
      }

      carregarHistorico();
    }

  } catch (error) {
    console.error('Erro ao sincronizar:', error);
    syncStatus.textContent = 'Erro. Tente novamente.';
    syncStatus.className = 'sync-status error';
    mostrarToast('Erro ao sincronizar.', 'error');
  }

  // Restaurar botão
  btnSync.disabled = false;
  btnSync.classList.remove('loading');
  btnSync.innerHTML = '<i class="bi bi-arrow-repeat"></i> <span>SINCRONIZAR VÍDEO</span>';
}

// Auto-sync: verificar a cada 30 segundos se há aulas aguardando
setInterval(async () => {
  try {
    const snapshot = await aulasRef.where('status', '==', 'aguardando-video').get();
    if (!snapshot.empty) {
      // Chamar sync silenciosamente
      fetch(SYNC_WEBAPP_URL, { mode: 'no-cors' }).catch(() => {});
    }
  } catch (e) {}
}, 30000);

// ============================================
// FUNÇÃO DE EMERGÊNCIA - SINCRONIZAÇÃO MANUAL
// Use no console: sincManual()
// ============================================
window.sincManual = async function() {
  console.log('=== SINCRONIZAÇÃO MANUAL ===');

  try {
    // Buscar aulas aguardando
    const snapshot = await aulasRef.where('status', '==', 'aguardando-video').get();
    console.log('Aulas aguardando vídeo:', snapshot.size);

    if (snapshot.empty) {
      console.log('Nenhuma aula para sincronizar.');
      return;
    }

    // Mostrar aulas
    snapshot.forEach(doc => {
      const aula = doc.data();
      console.log(`  - ${doc.id}: ${aula.materia} - ${aula.tema}`);
    });

    // Para sincronizar manualmente, use:
    console.log('\nPara sincronizar manualmente, execute no Apps Script:');
    console.log('1. Abra script.google.com');
    console.log('2. Execute a função "sincronizar"');
    console.log('3. Ou aguarde o trigger automático (1 minuto)');

  } catch (error) {
    console.error('Erro:', error);
  }
};

console.log('Painel do Professor carregado!');
console.log('Dica: Use sincManual() no console para verificar status.');

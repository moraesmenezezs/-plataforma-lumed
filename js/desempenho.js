// ============================================
// LuMED - JavaScript da Página de Desempenho
// Sistema de Troféus e Metas
// ============================================

// Variáveis globais
let metaHoras = 4;
let semanaAtual = {};
let trofeus = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  inicializarEventos();
  atualizarInterface();
  inicializarWidget();
  inicializarSidebarToggle();
  inicializarMenuMobile();
});

// ============================================
// MENU MOBILE
// ============================================

function inicializarMenuMobile() {
  const btnMenu = document.getElementById('btn-menu-mobile');
  const sidebar = document.getElementById('sidebar-left');
  const overlay = document.getElementById('menu-overlay');

  if (!btnMenu || !sidebar || !overlay) return;

  btnMenu.addEventListener('click', () => {
    sidebar.classList.add('aberta');
    overlay.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  });

  overlay.addEventListener('click', fecharMenuMobile);

  sidebar.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        fecharMenuMobile();
      }
    });
  });

  function fecharMenuMobile() {
    sidebar.classList.remove('aberta');
    overlay.classList.remove('ativo');
    document.body.style.overflow = '';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      fecharMenuMobile();
    }
  });
}

// ============================================
// SIDEBAR COLAPSÁVEL
// ============================================

function inicializarSidebarToggle() {
  const sidebar = document.getElementById('sidebar-left');
  const toggle = document.getElementById('sidebar-toggle');
  const appLayout = document.querySelector('.app-layout');

  if (!sidebar || !toggle) return;

  // Carregar estado salvo
  const estadoSalvo = localStorage.getItem('sidebar_colapsada');
  if (estadoSalvo === 'true') {
    sidebar.classList.add('colapsada');
    appLayout.classList.add('sidebar-colapsada');
    toggle.title = 'Expandir menu';
  }

  // Evento de clique no toggle
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('colapsada');
    appLayout.classList.toggle('sidebar-colapsada');

    const isColapsada = sidebar.classList.contains('colapsada');
    localStorage.setItem('sidebar_colapsada', isColapsada);
    toggle.title = isColapsada ? 'Expandir menu' : 'Recolher menu';
  });
}

// ============================================
// Carregar dados do localStorage
// ============================================
function carregarDados() {
  // Carregar meta de horas
  const metaSalva = localStorage.getItem('lumed_meta_horas');
  if (metaSalva) {
    metaHoras = parseInt(metaSalva);
  }

  // Carregar dados da semana atual
  const semanaSalva = localStorage.getItem('lumed_semana_atual');
  if (semanaSalva) {
    semanaAtual = JSON.parse(semanaSalva);
    // Verificar se é uma nova semana
    if (verificarNovaSemana()) {
      verificarTrofeuSemanaAnterior();
      semanaAtual = inicializarSemana();
    }
  } else {
    semanaAtual = inicializarSemana();
  }

  // Carregar troféus
  const trofeusSalvos = localStorage.getItem('lumed_trofeus');
  if (trofeusSalvos) {
    trofeus = JSON.parse(trofeusSalvos);
  }
}

// ============================================
// Inicializar semana
// ============================================
function inicializarSemana() {
  const hoje = new Date();
  const inicioSemana = getInicioSemana(hoje);

  return {
    inicioSemana: inicioSemana.toISOString(),
    dias: [
      { dia: 0, horas: 0, concluido: false },
      { dia: 1, horas: 0, concluido: false },
      { dia: 2, horas: 0, concluido: false },
      { dia: 3, horas: 0, concluido: false },
      { dia: 4, horas: 0, concluido: false },
      { dia: 5, horas: 0, concluido: false },
      { dia: 6, horas: 0, concluido: false }
    ]
  };
}

// Obter início da semana (domingo)
function getInicioSemana(data) {
  const d = new Date(data);
  const dia = d.getDay();
  const diff = d.getDate() - dia;
  return new Date(d.setDate(diff));
}

// Verificar se é uma nova semana
function verificarNovaSemana() {
  if (!semanaAtual.inicioSemana) return true;

  const inicioSemanaAtual = getInicioSemana(new Date());
  const inicioSemanaAnterior = new Date(semanaAtual.inicioSemana);

  return inicioSemanaAtual.toDateString() !== inicioSemanaAnterior.toDateString();
}

// Verificar e conceder troféu da semana anterior
function verificarTrofeuSemanaAnterior() {
  const diasConcluidos = semanaAtual.dias.filter(d => d.concluido).length;

  if (diasConcluidos >= 4) {
    const novoTrofeu = {
      id: Date.now(),
      data: new Date(semanaAtual.inicioSemana).toLocaleDateString('pt-BR'),
      diasConcluidos: diasConcluidos,
      metaHoras: metaHoras
    };
    trofeus.push(novoTrofeu);
    salvarTrofeus();

    // Mostrar notificação
    mostrarNotificacaoTrofeu(novoTrofeu);
  }
}

// ============================================
// Eventos
// ============================================
function inicializarEventos() {
  // Botões de meta
  document.getElementById('diminuir-meta').addEventListener('click', () => {
    if (metaHoras > 1) {
      metaHoras--;
      atualizarMeta();
    }
  });

  document.getElementById('aumentar-meta').addEventListener('click', () => {
    if (metaHoras < 12) {
      metaHoras++;
      atualizarMeta();
    }
  });

  // Registrar horas
  document.getElementById('btn-registrar-horas').addEventListener('click', registrarHoras);

  // Enter no input
  document.getElementById('horas-hoje').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      registrarHoras();
    }
  });
}

// ============================================
// Registrar horas de estudo
// ============================================
function registrarHoras() {
  const input = document.getElementById('horas-hoje');
  const horas = parseFloat(input.value);

  if (isNaN(horas) || horas < 0) {
    alert('Por favor, insira um número válido de horas.');
    return;
  }

  const hoje = new Date().getDay();
  semanaAtual.dias[hoje].horas = horas;
  semanaAtual.dias[hoje].concluido = horas >= metaHoras;

  salvarSemana();
  atualizarInterface();

  // Limpar input
  input.value = '';

  // Feedback visual
  const diaItem = document.querySelector(`.dia-item[data-dia="${hoje}"]`);
  if (diaItem) {
    diaItem.classList.add('registrado');
    setTimeout(() => diaItem.classList.remove('registrado'), 500);
  }

  // Verificar se ganhou troféu (ao vivo)
  verificarTrofeuAtual();
}

// Verificar troféu durante a semana
function verificarTrofeuAtual() {
  const diasConcluidos = semanaAtual.dias.filter(d => d.concluido).length;
  const diasRestantes = 7 - new Date().getDay();

  if (diasConcluidos >= 4) {
    const jaTemTrofeuEstaSemana = trofeus.some(t => {
      const dataTrofeu = new Date(semanaAtual.inicioSemana);
      return t.data === dataTrofeu.toLocaleDateString('pt-BR');
    });

    if (!jaTemTrofeuEstaSemana) {
      const novoTrofeu = {
        id: Date.now(),
        data: new Date(semanaAtual.inicioSemana).toLocaleDateString('pt-BR'),
        diasConcluidos: diasConcluidos,
        metaHoras: metaHoras
      };
      trofeus.push(novoTrofeu);
      salvarTrofeus();
      mostrarNotificacaoTrofeu(novoTrofeu);
      atualizarGaleriaTrofeus();
    }
  }
}

// ============================================
// Atualizar interface
// ============================================
function atualizarInterface() {
  atualizarMeta();
  atualizarDiasSemana();
  atualizarProgresso();
  atualizarGaleriaTrofeus();
}

function atualizarMeta() {
  document.getElementById('meta-horas').textContent = metaHoras;
  localStorage.setItem('lumed_meta_horas', metaHoras);
}

function atualizarDiasSemana() {
  const hoje = new Date().getDay();

  semanaAtual.dias.forEach((diaData, index) => {
    const diaEl = document.querySelector(`.dia-item[data-dia="${index}"]`);
    if (!diaEl) return;

    const statusEl = diaEl.querySelector('.dia-status i');
    const horasEl = diaEl.querySelector('.dia-horas');

    // Atualizar horas
    horasEl.textContent = diaData.horas + 'h';

    // Atualizar status
    diaEl.classList.remove('concluido', 'nao-concluido', 'hoje', 'futuro');

    if (index === hoje) {
      diaEl.classList.add('hoje');
    }

    if (index < hoje || (index === hoje && diaData.horas > 0)) {
      if (diaData.concluido) {
        diaEl.classList.add('concluido');
        statusEl.className = 'bi bi-check-circle-fill';
      } else if (diaData.horas > 0) {
        diaEl.classList.add('nao-concluido');
        statusEl.className = 'bi bi-x-circle-fill';
      } else if (index < hoje) {
        diaEl.classList.add('nao-concluido');
        statusEl.className = 'bi bi-dash-circle';
      } else {
        statusEl.className = 'bi bi-circle';
      }
    } else if (index > hoje) {
      diaEl.classList.add('futuro');
      statusEl.className = 'bi bi-circle';
    } else {
      statusEl.className = 'bi bi-circle';
    }
  });
}

function atualizarProgresso() {
  const diasConcluidos = semanaAtual.dias.filter(d => d.concluido).length;
  document.getElementById('dias-concluidos').textContent = diasConcluidos + '/7';
}

function atualizarGaleriaTrofeus() {
  const lista = document.getElementById('trofeus-lista');
  const total = document.getElementById('total-trofeus');

  total.textContent = trofeus.length;

  if (trofeus.length === 0) {
    lista.innerHTML = `
      <div class="trofeu-vazio">
        <i class="bi bi-trophy"></i>
        <p>Nenhum troféu ainda</p>
        <span>Complete 4 dias da semana com sua meta para ganhar!</span>
      </div>
    `;
    return;
  }

  lista.innerHTML = trofeus.map((trofeu, index) => `
    <div class="trofeu-item" style="animation-delay: ${index * 0.1}s">
      <div class="trofeu-icone">
        <i class="bi bi-trophy-fill"></i>
        <span class="trofeu-numero">#${index + 1}</span>
      </div>
      <div class="trofeu-info">
        <span class="trofeu-semana">Semana de ${trofeu.data}</span>
        <span class="trofeu-detalhes">
          <i class="bi bi-check-circle"></i> ${trofeu.diasConcluidos} dias ·
          <i class="bi bi-clock"></i> ${trofeu.metaHoras}h/dia
        </span>
      </div>
    </div>
  `).join('');
}

// ============================================
// Notificação de troféu
// ============================================
function mostrarNotificacaoTrofeu(trofeu) {
  const notif = document.createElement('div');
  notif.className = 'trofeu-notificacao';
  notif.innerHTML = `
    <div class="trofeu-notif-content">
      <i class="bi bi-trophy-fill"></i>
      <div>
        <h3>Parabéns!</h3>
        <p>Você ganhou um troféu!</p>
        <span>${trofeu.diasConcluidos} dias concluídos</span>
      </div>
    </div>
  `;

  document.body.appendChild(notif);

  setTimeout(() => notif.classList.add('mostrar'), 100);
  setTimeout(() => {
    notif.classList.remove('mostrar');
    setTimeout(() => notif.remove(), 500);
  }, 4000);
}

// ============================================
// Salvar dados
// ============================================
function salvarSemana() {
  localStorage.setItem('lumed_semana_atual', JSON.stringify(semanaAtual));
}

function salvarTrofeus() {
  localStorage.setItem('lumed_trofeus', JSON.stringify(trofeus));
}

// ============================================
// Widget Motivacional
// ============================================
function inicializarWidget() {
  const widget = document.getElementById('widget-motivacional');
  const toggle = document.getElementById('widget-toggle');

  if (!widget || !toggle) return;

  // Carregar estado do localStorage
  const minimizado = localStorage.getItem('widget_minimizado') === 'true';
  if (minimizado) {
    widget.classList.add('minimizado');
    toggle.querySelector('i').className = 'bi bi-chevron-up';
  }

  // Toggle pelo botão
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleWidget();
  });

  // Expandir ao clicar no widget minimizado
  widget.addEventListener('click', (e) => {
    if (widget.classList.contains('minimizado')) {
      toggleWidget();
    }
  });

  function toggleWidget() {
    widget.classList.toggle('minimizado');
    const isMinimizado = widget.classList.contains('minimizado');
    toggle.querySelector('i').className = isMinimizado ? 'bi bi-chevron-up' : 'bi bi-chevron-down';
    localStorage.setItem('widget_minimizado', isMinimizado);
  }
}

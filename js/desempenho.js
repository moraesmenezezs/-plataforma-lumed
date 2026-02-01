// ============================================
// LuMED - JavaScript da Página de Desempenho
// Sistema de Troféus, Metas e Questões
// ============================================

// Variáveis globais
let metaHoras = 4;
let semanaAtual = {};
let trofeus = [];
let questoesData = { total: 0, historico: [] };

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  carregarQuestoes();
  inicializarEventos();
  inicializarEventosQuestoes();
  atualizarInterface();
  atualizarQuestoesInterface();
  inicializarWidget();
  inicializarNavbar();
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

// ============================================
// NAVBAR SUPERIOR
// ============================================

function inicializarNavbar() {
  const navbar = document.querySelector('.navbar-top');
  const toggleBtn = document.querySelector('.navbar-toggle');
  const expandedMenu = document.querySelector('.navbar-expanded');

  if (!navbar) return;

  // Toggle menu expandido
  if (toggleBtn && expandedMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      expandedMenu.classList.toggle('aberto');
      toggleBtn.classList.toggle('ativo');

      const icon = toggleBtn.querySelector('i');
      if (expandedMenu.classList.contains('aberto')) {
        icon.className = 'bi bi-x-lg';
      } else {
        icon.className = 'bi bi-grid-3x3-gap-fill';
      }
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!expandedMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        expandedMenu.classList.remove('aberto');
        toggleBtn.classList.remove('ativo');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-grid-3x3-gap-fill';
      }
    });

    // Fechar ao clicar em item do menu
    expandedMenu.querySelectorAll('.nav-expanded-item').forEach(item => {
      item.addEventListener('click', () => {
        expandedMenu.classList.remove('aberto');
        toggleBtn.classList.remove('ativo');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-grid-3x3-gap-fill';
      });
    });
  }

}

// ============================================
// SISTEMA DE QUESTÕES
// ============================================

const coresMateria = {
  geral: '#8b5cf6',
  portugues: '#ef4444',
  matematica: '#3b82f6',
  historia: '#f59e0b',
  geografia: '#10b981',
  biologia: '#22c55e',
  fisica: '#8b5cf6',
  quimica: '#ec4899',
  filosofia: '#6366f1',
  sociologia: '#f97316',
  ingles: '#14b8a6'
};

const nomesMateria = {
  geral: 'Geral',
  portugues: 'Português',
  matematica: 'Matemática',
  historia: 'História',
  geografia: 'Geografia',
  biologia: 'Biologia',
  fisica: 'Física',
  quimica: 'Química',
  filosofia: 'Filosofia',
  sociologia: 'Sociologia',
  ingles: 'Inglês'
};

function carregarQuestoes() {
  const salvo = localStorage.getItem('lumed_questoes');
  if (salvo) {
    questoesData = JSON.parse(salvo);
  }
}

function salvarQuestoes() {
  localStorage.setItem('lumed_questoes', JSON.stringify(questoesData));
}

function inicializarEventosQuestoes() {
  const btnAdicionar = document.getElementById('btn-adicionar-questoes');
  const inputQuestoes = document.getElementById('input-questoes');
  const btnLimpar = document.getElementById('btn-limpar-historico');

  if (btnAdicionar) {
    btnAdicionar.addEventListener('click', adicionarQuestoes);
  }

  if (inputQuestoes) {
    inputQuestoes.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        adicionarQuestoes();
      }
    });
  }

  if (btnLimpar) {
    btnLimpar.addEventListener('click', limparHistoricoQuestoes);
  }
}

function limparHistoricoQuestoes() {
  mostrarConfirmacao(
    'Limpar histórico',
    'Deseja limpar todo o histórico e zerar o contador de questões?',
    () => {
      questoesData = { total: 0, historico: [] };
      salvarQuestoes();
      atualizarQuestoesInterface();
    }
  );
}

// ============================================
// MODAL DE CONFIRMAÇÃO PERSONALIZADO
// ============================================

let confirmacaoCallback = null;

function mostrarConfirmacao(titulo, mensagem, onConfirmar) {
  const modal = document.getElementById('modal-confirmacao');
  const tituloEl = document.getElementById('confirmacao-titulo');
  const mensagemEl = document.getElementById('confirmacao-mensagem');
  const btnConfirmar = document.getElementById('btn-confirmacao-confirmar');
  const btnCancelar = document.getElementById('btn-confirmacao-cancelar');

  if (!modal) return;

  tituloEl.textContent = titulo;
  mensagemEl.textContent = mensagem;
  confirmacaoCallback = onConfirmar;

  modal.classList.add('aberto');

  // Remover listeners antigos
  const novoBtnConfirmar = btnConfirmar.cloneNode(true);
  const novoBtnCancelar = btnCancelar.cloneNode(true);
  btnConfirmar.parentNode.replaceChild(novoBtnConfirmar, btnConfirmar);
  btnCancelar.parentNode.replaceChild(novoBtnCancelar, btnCancelar);

  // Confirmar
  novoBtnConfirmar.addEventListener('click', () => {
    modal.classList.remove('aberto');
    if (confirmacaoCallback) {
      confirmacaoCallback();
      confirmacaoCallback = null;
    }
  });

  // Cancelar
  novoBtnCancelar.addEventListener('click', () => {
    modal.classList.remove('aberto');
    confirmacaoCallback = null;
  });

  // Fechar ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('aberto');
      confirmacaoCallback = null;
    }
  });
}

function adicionarQuestoes() {
  const input = document.getElementById('input-questoes');
  const select = document.getElementById('select-materia-questoes');

  const quantidade = parseInt(input.value);
  const materia = select.value;

  if (isNaN(quantidade) || quantidade <= 0) {
    alert('Por favor, insira uma quantidade válida.');
    return;
  }

  // Adicionar ao total
  questoesData.total += quantidade;

  // Adicionar ao histórico
  const registro = {
    id: Date.now(),
    quantidade: quantidade,
    materia: materia,
    data: new Date().toISOString(),
    fonte: 'manual'
  };

  questoesData.historico.unshift(registro);

  // Manter apenas os últimos 50 registros
  if (questoesData.historico.length > 50) {
    questoesData.historico = questoesData.historico.slice(0, 50);
  }

  salvarQuestoes();
  atualizarQuestoesInterface();

  // Limpar input
  input.value = '';

  // Feedback visual
  input.style.borderColor = '#22c55e';
  setTimeout(() => {
    input.style.borderColor = '';
  }, 500);
}

function atualizarQuestoesInterface() {
  const totalEl = document.getElementById('total-questoes');
  const hojeEl = document.getElementById('questoes-hoje');
  const semanaEl = document.getElementById('questoes-semana');
  const mesEl = document.getElementById('questoes-mes');
  const historicoEl = document.getElementById('historico-questoes');

  if (!totalEl) return;

  // Total
  totalEl.textContent = questoesData.total;

  // Calcular hoje, semana, mês
  const agora = new Date();
  const inicioDia = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const inicioSemana = getInicioSemana(agora);
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

  let questoesHoje = 0;
  let questoesSemana = 0;
  let questoesMes = 0;

  questoesData.historico.forEach(item => {
    const dataItem = new Date(item.data);

    if (dataItem >= inicioDia) {
      questoesHoje += item.quantidade;
    }
    if (dataItem >= inicioSemana) {
      questoesSemana += item.quantidade;
    }
    if (dataItem >= inicioMes) {
      questoesMes += item.quantidade;
    }
  });

  if (hojeEl) hojeEl.textContent = questoesHoje;
  if (semanaEl) semanaEl.textContent = questoesSemana;
  if (mesEl) mesEl.textContent = questoesMes;

  // Histórico
  if (historicoEl) {
    if (questoesData.historico.length === 0) {
      historicoEl.innerHTML = `
        <div class="historico-vazio">
          <i class="bi bi-journal-x"></i>
          <p>Nenhum registro ainda</p>
        </div>
      `;
    } else {
      historicoEl.innerHTML = questoesData.historico.slice(0, 10).map(item => {
        const dataItem = new Date(item.data);
        const dataFormatada = dataItem.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });

        return `
          <div class="historico-item">
            <div class="historico-item-info">
              <div class="historico-item-icon" style="background: ${coresMateria[item.materia] || '#8b5cf6'}">
                <i class="bi bi-pencil-fill"></i>
              </div>
              <div class="historico-item-texto">
                <strong>${item.quantidade}</strong> questões de ${nomesMateria[item.materia] || 'Geral'}
              </div>
            </div>
            <div class="historico-item-data">${dataFormatada}</div>
          </div>
        `;
      }).join('');
    }
  }
}

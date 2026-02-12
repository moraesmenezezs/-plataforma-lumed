// ============================================
// Kumon Digital - Inicialização da Aplicação
// ============================================

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  console.log('Kumon Digital - Inicializando...');

  // Verificar se módulos estão carregados
  if (!window.kumonStorage) {
    console.error('Módulo storage não carregado');
    return;
  }

  // Inicializar usuário se não existir
  const usuario = window.kumonStorage.getUsuario();
  console.log('Usuário:', usuario);

  // Atualizar UI do dashboard se estivermos na página principal
  if (document.querySelector('.welcome-section')) {
    atualizarDashboard();
  }

  // Configurar eventos globais
  configurarEventos();
}

// Atualizar dashboard
function atualizarDashboard() {
  const progresso = window.kumonProgressao.getProgressoGeral();
  const niveis = window.kumonProgressao.getNiveisParaDashboard();
  const conquistas = window.kumonConquistas.contarConquistas();
  const estatisticas = window.kumonStorage.getEstatisticasDias(7);

  // Atualizar welcome stats
  const streakEl = document.querySelector('.welcome-stat .streak-valor');
  if (streakEl) {
    streakEl.textContent = progresso.streak.atual;
  }

  // Atualizar stats cards
  atualizarStatCard('stat-streak', progresso.streak.atual, 'dias');
  atualizarStatCard('stat-nivel', `${progresso.nivelAtual.fase}.${progresso.nivelAtual.nivel}`);
  atualizarStatCard('stat-questoes', progresso.estatisticas.totalQuestoes);
  atualizarStatCard('stat-conquistas', conquistas.desbloqueadas);

  // Renderizar grid de níveis
  renderizarNiveis(niveis);

  // Renderizar conquistas
  renderizarConquistas();

  // Atualizar gráfico se existir
  if (window.Chart && document.getElementById('chart-evolucao')) {
    atualizarGrafico(estatisticas);
  }
}

// Atualizar um stat card
function atualizarStatCard(id, valor, sufixo = '') {
  const el = document.getElementById(id);
  if (el) {
    const valorEl = el.querySelector('.stat-info h3');
    if (valorEl) {
      valorEl.textContent = sufixo ? `${valor} ${sufixo}` : valor;
    }
  }
}

// Renderizar grid de níveis
function renderizarNiveis(niveis) {
  const container = document.getElementById('levels-grid');
  if (!container) return;

  // Agrupar por fase
  const fases = {};
  niveis.forEach(nivel => {
    if (!fases[nivel.fase]) {
      fases[nivel.fase] = {
        nome: nivel.faseNome,
        niveis: []
      };
    }
    fases[nivel.fase].niveis.push(nivel);
  });

  let html = '';

  Object.entries(fases).forEach(([faseNum, fase]) => {
    const faseCor = window.kumonProgressao.FASES[faseNum]?.cor || '#22c55e';
    html += `
      <div class="fase-section">
        <div class="section-header">
          <div class="section-title">
            <i class="bi bi-layers" style="color: ${faseCor}; -webkit-text-fill-color: ${faseCor}"></i>
            <h2>Fase ${faseNum}: ${fase.nome}</h2>
          </div>
          <span class="fase-badge" style="background: ${faseCor}">${fase.niveis.length} níveis</span>
        </div>
        <div class="levels-grid">
    `;

    fase.niveis.forEach(nivel => {
      const statusClass = nivel.isCurrent ? 'current' : (nivel.desbloqueado ? '' : 'locked');
      const statusBadge = getStatusBadge(nivel.status);

      html += `
        <div class="level-card ${statusClass}" data-nivel="${nivel.id}" style="${nivel.isCurrent ? `border-color: ${faseCor}; box-shadow: 0 0 0 4px ${faseCor}22` : ''}">
          <div class="level-header">
            <div class="level-icon" style="${nivel.isCurrent ? `background: ${faseCor}; color: white` : `background: ${faseCor}18; color: ${faseCor}`}">
              <i class="bi ${nivel.icone}"></i>
            </div>
            <div class="level-status ${nivel.status}">
              <i class="bi ${statusBadge.icone}"></i>
              ${statusBadge.texto}
            </div>
          </div>
          <h3 class="level-title">${nivel.nome}</h3>
          <p class="level-description">${nivel.descricao}</p>
          <div class="level-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${(nivel.diasConsecutivos / nivel.diasNecessarios) * 100}%; background: ${faseCor}"></div>
            </div>
            <div class="progress-text">
              <span>${nivel.diasConsecutivos}/${nivel.diasNecessarios} dias</span>
              <span>${nivel.completado ? '100%' : Math.round((nivel.diasConsecutivos / nivel.diasNecessarios) * 100) + '%'}</span>
            </div>
          </div>
          <div class="level-footer">
            <div class="level-days">
              ${renderDayDots(nivel.diasConsecutivos, nivel.diasNecessarios)}
            </div>
            <button class="btn-practice" onclick="iniciarTreino('${nivel.id}')" ${!nivel.desbloqueado ? 'disabled' : ''}>
              <i class="bi bi-play-fill"></i>
              Praticar
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Obter badge de status
function getStatusBadge(status) {
  const badges = {
    completed: { icone: 'bi-check-circle-fill', texto: 'Completo' },
    current: { icone: 'bi-play-circle-fill', texto: 'Atual' },
    unlocked: { icone: 'bi-unlock-fill', texto: 'Disponível' },
    locked: { icone: 'bi-lock-fill', texto: 'Bloqueado' }
  };
  return badges[status] || badges.locked;
}

// Renderizar dots de dias
function renderDayDots(diasFeitos, totalDias) {
  let html = '';
  for (let i = 0; i < totalDias; i++) {
    const classe = i < diasFeitos ? 'completed' : '';
    html += `<div class="day-dot ${classe}">${i + 1}</div>`;
  }
  return html;
}

// Renderizar conquistas
function renderizarConquistas() {
  const container = document.getElementById('achievements-grid');
  if (!container) return;

  const conquistas = window.kumonConquistas.getTodasConquistas();

  let html = '';
  conquistas.slice(0, 8).forEach(conquista => {
    html += `
      <div class="achievement-card ${conquista.desbloqueada ? 'unlocked' : 'locked'}">
        <div class="achievement-icon" style="background: ${conquista.desbloqueada ? conquista.cor : '#e5e7eb'}">
          <i class="bi ${conquista.icone}"></i>
        </div>
        <h4 class="achievement-name">${conquista.nome}</h4>
        <p class="achievement-description">${conquista.descricao}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Iniciar treino
function iniciarTreino(nivelId) {
  // Salvar nível selecionado e redirecionar
  sessionStorage.setItem('kumon_nivel_treino', nivelId);
  window.location.href = 'treino.html';
}

// Atualizar gráfico de evolução
function atualizarGrafico(estatisticas) {
  const ctx = document.getElementById('chart-evolucao');
  if (!ctx || !window.Chart) return;

  const labels = [];
  const dados = [];

  // Últimos 7 dias
  for (let i = 6; i >= 0; i--) {
    const data = new Date();
    data.setDate(data.getDate() - i);
    const dataStr = data.toISOString().split('T')[0];
    const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });

    labels.push(diaSemana);

    const diaStats = estatisticas.porDia[dataStr];
    dados.push(diaStats ? diaStats.acertos : 0);
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Acertos',
        data: dados,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0,0,0,0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Configurar eventos globais
function configurarEventos() {
  // Hamburger menu toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('navbar-menu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = hamburgerBtn.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'bi bi-x-lg';
      } else {
        icon.className = 'bi bi-list';
      }
    });
    // Fechar ao clicar em link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = hamburgerBtn.querySelector('i');
        icon.className = 'bi bi-list';
      });
    });
  }

  // Atualizar navbar streak
  const streakNavbar = document.querySelector('.user-streak span');
  if (streakNavbar) {
    const usuario = window.kumonStorage.getUsuario();
    streakNavbar.textContent = usuario.streak.atual;
  }

  // Listener para login
  window.addEventListener('kumon-auth', (e) => {
    const { nome } = e.detail;

    // Atualizar nome no storage se necessário
    const usuario = window.kumonStorage.getUsuario();
    if (usuario.nome !== nome) {
      usuario.nome = nome;
      window.kumonStorage.salvarUsuario(usuario);
    }

    // Atualizar dashboard
    if (document.querySelector('.welcome-section')) {
      atualizarDashboard();
    }
  });
}

// Exportar funções globais
window.iniciarTreino = iniciarTreino;
window.atualizarDashboard = atualizarDashboard;

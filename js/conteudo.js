// ============================================
// LuMED - JavaScript da Página de Conteúdo
// Sistema de Níveis e Progresso
// ============================================

// Dados do progresso
let progressoData = {};

// ============================================
// TOGGLE MATÉRIA (abrir/fechar)
// ============================================
function toggleMateria(header) {
  const section = header.closest('.materia-section');
  section.classList.toggle('aberta');
}

// ============================================
// NAVEGAÇÃO DE NÍVEIS
// ============================================
function inicializarNiveis() {
  document.querySelectorAll('.materia-section').forEach(section => {
    const nivelTabs = section.querySelectorAll('.nivel-tab');
    const nivelContents = section.querySelectorAll('.nivel-content');

    nivelTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active de todos
        nivelTabs.forEach(t => t.classList.remove('active'));
        nivelContents.forEach(c => c.classList.remove('active'));

        // Adiciona active no clicado
        tab.classList.add('active');
        const nivel = tab.getAttribute('data-nivel');
        const content = section.querySelector(`[data-nivel-content="${nivel}"]`);
        if (content) {
          content.classList.add('active');
        }
      });
    });
  });
}

// ============================================
// TOGGLE TÓPICO (marcar como concluído)
// ============================================
function toggleTopico(checkbox) {
  const card = checkbox.closest('.topico-card');
  const topicoId = card.getAttribute('data-topico-id');

  if (checkbox.checked) {
    card.classList.add('completed');
  } else {
    card.classList.remove('completed');
  }

  // Salvar estado
  if (!progressoData.topicos) progressoData.topicos = {};
  progressoData.topicos[topicoId] = {
    ...progressoData.topicos[topicoId],
    concluido: checkbox.checked
  };

  atualizarProgressoNivel(card);
  atualizarProgressoGeral();
  salvarProgresso();
}

// ============================================
// TOGGLE TEORIA
// ============================================
function toggleTeoria(btn) {
  btn.classList.toggle('active');

  const card = btn.closest('.topico-card');
  const topicoId = card.getAttribute('data-topico-id');
  const isActive = btn.classList.contains('active');

  // Atualizar meta
  const metaTeoria = card.querySelector('.topico-meta span:first-child');
  if (isActive) {
    metaTeoria.innerHTML = '<i class="bi bi-check-circle"></i> Teoria estudada';
    metaTeoria.style.color = '#10b981';
  } else {
    metaTeoria.innerHTML = '<i class="bi bi-book"></i> Teoria';
    metaTeoria.style.color = '';
  }

  // Salvar estado
  if (!progressoData.topicos) progressoData.topicos = {};
  progressoData.topicos[topicoId] = {
    ...progressoData.topicos[topicoId],
    teoria: isActive
  };

  atualizarEstatisticasNivel(card);
  salvarProgresso();
}

// ============================================
// CONTADOR DE QUESTÕES
// ============================================
function incrementarQuestoes(btn) {
  const counter = btn.closest('.questoes-counter');
  const span = counter.querySelector('span');
  let valor = parseInt(span.textContent) || 0;
  valor++;
  span.textContent = valor;

  const card = btn.closest('.topico-card');
  atualizarQuestoesCard(card, valor);
}

function decrementarQuestoes(btn) {
  const counter = btn.closest('.questoes-counter');
  const span = counter.querySelector('span');
  let valor = parseInt(span.textContent) || 0;
  if (valor > 0) {
    valor--;
    span.textContent = valor;
  }

  const card = btn.closest('.topico-card');
  atualizarQuestoesCard(card, valor);
}

function atualizarQuestoesCard(card, valor) {
  const topicoId = card.getAttribute('data-topico-id');

  // Atualizar meta
  const metaQuestoes = card.querySelector('.topico-meta span:last-child');
  metaQuestoes.innerHTML = `<i class="bi bi-pencil"></i> ${valor} questões`;

  // Salvar estado
  if (!progressoData.topicos) progressoData.topicos = {};
  progressoData.topicos[topicoId] = {
    ...progressoData.topicos[topicoId],
    questoes: valor
  };

  atualizarEstatisticasNivel(card);
  salvarProgresso();
}

// ============================================
// ATUALIZAR PROGRESSO DO NÍVEL
// ============================================
function atualizarProgressoNivel(card) {
  const nivelContent = card.closest('.nivel-content');
  if (!nivelContent) return;

  const cards = nivelContent.querySelectorAll('.topico-card');
  const completedCards = nivelContent.querySelectorAll('.topico-card.completed');
  const dots = nivelContent.querySelectorAll('.progress-dot');
  const lines = nivelContent.querySelectorAll('.progress-line');

  // Atualizar bolinhas
  cards.forEach((c, index) => {
    if (dots[index]) {
      if (c.classList.contains('completed')) {
        dots[index].classList.add('completed');
      } else {
        dots[index].classList.remove('completed');
      }
    }
  });

  // Atualizar linhas
  lines.forEach((line, index) => {
    if (dots[index] && dots[index].classList.contains('completed')) {
      line.classList.add('completed');
    } else {
      line.classList.remove('completed');
    }
  });

  // Atualizar estatísticas
  const stats = nivelContent.querySelector('.nivel-progress-stats');
  if (stats) {
    stats.innerHTML = `<strong>${completedCards.length}</strong> de <strong>${cards.length}</strong> concluídos`;
  }

  // Atualizar badge no nível tab
  const section = card.closest('.materia-section');
  const nivelAtivo = nivelContent.getAttribute('data-nivel-content');
  const nivelTab = section.querySelector(`.nivel-tab[data-nivel="${nivelAtivo}"]`);
  if (nivelTab) {
    const badge = nivelTab.querySelector('.nivel-badge');
    if (badge) {
      badge.textContent = `${completedCards.length}/${cards.length}`;
    }
  }

  // Atualizar card de tópicos concluídos nas estatísticas
  const statConcluidos = nivelContent.querySelector('.stat-card.concluidos .stat-value');
  if (statConcluidos) {
    statConcluidos.textContent = `${completedCards.length}/${cards.length}`;
  }
}

// ============================================
// ATUALIZAR ESTATÍSTICAS DO NÍVEL
// ============================================
function atualizarEstatisticasNivel(card) {
  const nivelContent = card.closest('.nivel-content');
  if (!nivelContent) return;

  // Contar teorias estudadas
  const teoriasAtivas = nivelContent.querySelectorAll('.btn-teoria.active').length;
  const statTeoria = nivelContent.querySelector('.stat-card.teoria .stat-value');
  if (statTeoria) {
    statTeoria.textContent = teoriasAtivas;
  }

  // Contar total de questões
  let totalQuestoes = 0;
  nivelContent.querySelectorAll('.questoes-counter span').forEach(span => {
    totalQuestoes += parseInt(span.textContent) || 0;
  });
  const statQuestoes = nivelContent.querySelector('.stat-card.questoes .stat-value');
  if (statQuestoes) {
    statQuestoes.textContent = totalQuestoes;
  }
}

// ============================================
// ATUALIZAR PROGRESSO GERAL
// ============================================
function atualizarProgressoGeral() {
  const activeTab = document.querySelector('.tab-content.active');
  if (!activeTab) return;

  const checkboxes = activeTab.querySelectorAll('.topico-checkbox input[type="checkbox"]');
  const checked = activeTab.querySelectorAll('.topico-checkbox input[type="checkbox"]:checked');

  const total = checkboxes.length;
  const feitos = checked.length;
  const porcentagem = total > 0 ? Math.round((feitos / total) * 100) : 0;

  document.getElementById('progresso-valor').textContent = porcentagem + '%';
  document.getElementById('progresso-fill').style.width = porcentagem + '%';

  // Atualizar contadores de cada matéria
  activeTab.querySelectorAll('.materia-section').forEach(section => {
    const sectionCheckboxes = section.querySelectorAll('.topico-checkbox input[type="checkbox"]');
    const sectionChecked = section.querySelectorAll('.topico-checkbox input[type="checkbox"]:checked');
    const contador = section.querySelector('.materia-contador');
    if (contador && sectionCheckboxes.length > 0) {
      contador.textContent = sectionChecked.length + '/' + sectionCheckboxes.length;
    }
  });
}

// ============================================
// TROCAR ABAS DE VESTIBULARES
// ============================================
function inicializarAbas() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById('tab-' + tabId).classList.add('active');

      atualizarProgressoGeral();
    });
  });
}

// ============================================
// SALVAR PROGRESSO
// ============================================
function salvarProgresso() {
  localStorage.setItem('lumed_conteudo_v2', JSON.stringify(progressoData));
}

// ============================================
// CARREGAR PROGRESSO
// ============================================
function carregarProgresso() {
  const dados = localStorage.getItem('lumed_conteudo_v2');
  if (dados) {
    progressoData = JSON.parse(dados);

    // Restaurar estado dos tópicos
    if (progressoData.topicos) {
      Object.keys(progressoData.topicos).forEach(topicoId => {
        const card = document.querySelector(`[data-topico-id="${topicoId}"]`);
        if (!card) return;

        const topico = progressoData.topicos[topicoId];

        // Restaurar checkbox
        if (topico.concluido) {
          const checkbox = card.querySelector('.topico-checkbox input');
          if (checkbox) {
            checkbox.checked = true;
            card.classList.add('completed');
          }
        }

        // Restaurar teoria
        if (topico.teoria) {
          const btnTeoria = card.querySelector('.btn-teoria');
          if (btnTeoria) {
            btnTeoria.classList.add('active');
            const metaTeoria = card.querySelector('.topico-meta span:first-child');
            metaTeoria.innerHTML = '<i class="bi bi-check-circle"></i> Teoria estudada';
            metaTeoria.style.color = '#10b981';
          }
        }

        // Restaurar questões
        if (topico.questoes) {
          const counterSpan = card.querySelector('.questoes-counter span');
          if (counterSpan) {
            counterSpan.textContent = topico.questoes;
          }
          const metaQuestoes = card.querySelector('.topico-meta span:last-child');
          if (metaQuestoes) {
            metaQuestoes.innerHTML = `<i class="bi bi-pencil"></i> ${topico.questoes} questões`;
          }
        }
      });
    }
  }

  // Atualizar todos os níveis
  document.querySelectorAll('.nivel-content').forEach(nivel => {
    const cards = nivel.querySelectorAll('.topico-card');
    if (cards.length > 0) {
      atualizarProgressoNivel(cards[0]);
      atualizarEstatisticasNivel(cards[0]);
    }
  });

  atualizarProgressoGeral();
}

// ============================================
// WIDGET MOTIVACIONAL
// ============================================
function inicializarWidget() {
  const widget = document.getElementById('widget-motivacional');
  const toggle = document.getElementById('widget-toggle');

  if (!widget || !toggle) return;

  const minimizado = localStorage.getItem('widget_minimizado') === 'true';
  if (minimizado) {
    widget.classList.add('minimizado');
    toggle.querySelector('i').className = 'bi bi-chevron-up';
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleWidget();
  });

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

  const estadoSalvo = localStorage.getItem('sidebar_colapsada');
  if (estadoSalvo === 'true') {
    sidebar.classList.add('colapsada');
    appLayout.classList.add('sidebar-colapsada');
    toggle.title = 'Expandir menu';
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('colapsada');
    appLayout.classList.toggle('sidebar-colapsada');

    const isColapsada = sidebar.classList.contains('colapsada');
    localStorage.setItem('sidebar_colapsada', isColapsada);
    toggle.title = isColapsada ? 'Expandir menu' : 'Recolher menu';
  });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  inicializarAbas();
  inicializarNiveis();
  carregarProgresso();
  inicializarWidget();
  inicializarSidebarToggle();
  inicializarMenuMobile();
});

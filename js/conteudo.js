// ============================================
// LuMED - JavaScript da Página de Conteúdo
// Sistema de Níveis e Progresso - V2.0
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
  const wasCompleted = card.classList.contains('completed');
  const isChecked = checkbox.checked;

  if (isChecked) {
    card.classList.add('completed');
    card.classList.add('just-completed');

    // Disparar confete se acabou de completar
    if (!wasCompleted) {
      dispararConfete();
    }

    // Remover animação após terminar
    setTimeout(() => {
      card.classList.remove('just-completed');
    }, 600);
  } else {
    card.classList.remove('completed');
  }

  // Salvar estado
  if (!progressoData.topicos) progressoData.topicos = {};
  progressoData.topicos[topicoId] = {
    ...progressoData.topicos[topicoId],
    concluido: isChecked
  };

  atualizarStatusBadge(card);
  atualizarProgressoMini(card);
  atualizarProgressoNivel(card);

  // Sincronizar topicos equivalentes em outras provas
  sincronizarEquivalentes(topicoId, isChecked);

  atualizarProgressoGeral();
  salvarProgresso();
}

// Sincronizar topicos equivalentes entre provas
function sincronizarEquivalentes(topicoId, isChecked) {
  if (typeof TOPIC_SYNC_MAP === 'undefined' || !TOPIC_SYNC_MAP[topicoId]) return;

  const equivalentes = TOPIC_SYNC_MAP[topicoId];
  equivalentes.forEach(eqId => {
    const eqCard = document.querySelector(`[data-topico-id="${eqId}"]`);
    if (!eqCard) return;

    const eqCheckbox = eqCard.querySelector('.topico-checkbox input[type="checkbox"]');
    if (!eqCheckbox || eqCheckbox.checked === isChecked) return;

    // Atualizar checkbox e visual
    eqCheckbox.checked = isChecked;
    if (isChecked) {
      eqCard.classList.add('completed');
    } else {
      eqCard.classList.remove('completed');
    }

    // Salvar no progresso
    if (!progressoData.topicos) progressoData.topicos = {};
    progressoData.topicos[eqId] = {
      ...progressoData.topicos[eqId],
      concluido: isChecked
    };

    // Atualizar UI do card equivalente
    atualizarStatusBadge(eqCard);
    atualizarProgressoMini(eqCard);
    atualizarProgressoNivel(eqCard);
  });
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
  const metaTeoria = card.querySelector('.meta-teoria');
  if (metaTeoria) {
    if (isActive) {
      metaTeoria.innerHTML = '<i class="bi bi-check-circle-fill"></i> Teoria estudada';
      metaTeoria.style.color = '#10b981';
    } else {
      metaTeoria.innerHTML = '<i class="bi bi-book"></i> Teoria';
      metaTeoria.style.color = '';
    }
  }

  // Salvar estado
  if (!progressoData.topicos) progressoData.topicos = {};
  progressoData.topicos[topicoId] = {
    ...progressoData.topicos[topicoId],
    teoria: isActive
  };

  atualizarStatusBadge(card);
  atualizarProgressoMini(card);
  atualizarEstatisticasNivel(card);
  salvarProgresso();
}

// ============================================
// TOGGLE FAVORITO
// ============================================
function toggleFavorito(btn) {
  btn.classList.toggle('active');
  const card = btn.closest('.topico-card');
  const topicoId = card.getAttribute('data-topico-id');
  const isActive = btn.classList.contains('active');

  // Atualizar ícone
  const icon = btn.querySelector('i');
  icon.className = isActive ? 'bi bi-star-fill' : 'bi bi-star';

  // Atualizar visual do card
  card.classList.toggle('favorito', isActive);

  // Salvar estado
  if (!progressoData.topicos) progressoData.topicos = {};
  progressoData.topicos[topicoId] = {
    ...progressoData.topicos[topicoId],
    favorito: isActive
  };

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

  // Animação
  span.classList.add('animate-pulse');
  setTimeout(() => span.classList.remove('animate-pulse'), 300);

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
  } else {
    // Animação de shake se tentar diminuir abaixo de 0
    counter.classList.add('animate-shake');
    setTimeout(() => counter.classList.remove('animate-shake'), 300);
  }

  const card = btn.closest('.topico-card');
  atualizarQuestoesCard(card, valor);
}

function atualizarQuestoesCard(card, valor) {
  const topicoId = card.getAttribute('data-topico-id');

  // Atualizar meta
  const metaQuestoes = card.querySelector('.meta-questoes');
  if (metaQuestoes) {
    metaQuestoes.innerHTML = `<i class="bi bi-pencil"></i> ${valor} questões`;
    if (valor > 0) {
      metaQuestoes.style.color = '#10b981';
    } else {
      metaQuestoes.style.color = '';
    }
  }

  // Salvar estado
  if (!progressoData.topicos) progressoData.topicos = {};
  progressoData.topicos[topicoId] = {
    ...progressoData.topicos[topicoId],
    questoes: valor
  };

  atualizarStatusBadge(card);
  atualizarProgressoMini(card);
  atualizarEstatisticasNivel(card);
  salvarProgresso();
}

// ============================================
// ATUALIZAR STATUS BADGE
// ============================================
function atualizarStatusBadge(card) {
  const statusBadge = card.querySelector('.status-badge');
  if (!statusBadge) return;

  const checkbox = card.querySelector('.topico-checkbox input');
  const btnTeoria = card.querySelector('.btn-teoria');
  const questoesSpan = card.querySelector('.questoes-counter span');

  const concluido = checkbox && checkbox.checked;
  const teoriaEstudada = btnTeoria && btnTeoria.classList.contains('active');
  const questoesFeitas = questoesSpan && parseInt(questoesSpan.textContent) > 0;

  // Remover classes anteriores
  statusBadge.classList.remove('pendente', 'em-progresso', 'concluido');
  card.classList.remove('em-progresso');

  if (concluido) {
    statusBadge.className = 'status-badge concluido';
    statusBadge.innerHTML = '<i class="bi bi-check-circle-fill"></i> Concluído';
  } else if (teoriaEstudada || questoesFeitas) {
    statusBadge.className = 'status-badge em-progresso';
    statusBadge.innerHTML = '<i class="bi bi-hourglass-split"></i> Em Progresso';
    card.classList.add('em-progresso');
  } else {
    statusBadge.className = 'status-badge pendente';
    statusBadge.innerHTML = '<i class="bi bi-circle"></i> Pendente';
  }
}

// ============================================
// ATUALIZAR MINI BARRA DE PROGRESSO
// ============================================
function atualizarProgressoMini(card) {
  const progressBar = card.querySelector('.progress-mini-fill');
  const progressText = card.querySelector('.progress-mini-text');
  if (!progressBar || !progressText) return;

  const checkbox = card.querySelector('.topico-checkbox input');
  const btnTeoria = card.querySelector('.btn-teoria');
  const questoesSpan = card.querySelector('.questoes-counter span');

  const concluido = checkbox && checkbox.checked;
  const teoriaEstudada = btnTeoria && btnTeoria.classList.contains('active');
  const questoesFeitas = questoesSpan ? parseInt(questoesSpan.textContent) || 0 : 0;

  // Calcular progresso: teoria = 40%, questões > 0 = 30%, concluído = 30%
  let progresso = 0;
  if (teoriaEstudada) progresso += 40;
  if (questoesFeitas > 0) progresso += Math.min(30, questoesFeitas * 3); // Max 30%
  if (concluido) progresso = 100;

  progressBar.style.width = progresso + '%';
  progressText.textContent = progresso + '%';
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

  // Atualizar progresso circular (sidebar)
  const progressoValor = document.getElementById('progresso-valor');
  const progressoRingFill = document.getElementById('progresso-ring-fill');
  const statConcluidos = document.getElementById('stat-concluidos');
  const statTotal = document.getElementById('stat-total');

  if (progressoValor) progressoValor.textContent = porcentagem + '%';

  // Atualizar anel circular (circumference = 2 * PI * 40 = 251.2)
  if (progressoRingFill) {
    const circumference = 251.2;
    const offset = circumference - (circumference * porcentagem / 100);
    progressoRingFill.style.strokeDashoffset = offset;
  }

  if (statConcluidos) statConcluidos.textContent = feitos;
  if (statTotal) statTotal.textContent = total;

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
// BUSCA DE TÓPICOS
// ============================================
function inicializarBusca() {
  // Busca na sidebar (nova)
  const sidebarBuscaInput = document.getElementById('sidebar-busca-input');
  // Busca na toolbar (mobile/fallback)
  const buscaInput = document.getElementById('busca-topicos');
  const buscaLimpar = document.getElementById('busca-limpar');

  // Sidebar busca
  if (sidebarBuscaInput) {
    sidebarBuscaInput.addEventListener('input', (e) => {
      // Sincronizar com toolbar se existir
      if (buscaInput) buscaInput.value = e.target.value;
      filtrarTopicos();
    });
  }

  // Toolbar busca (mobile)
  if (buscaInput) {
    buscaInput.addEventListener('input', (e) => {
      const termo = e.target.value.toLowerCase().trim();

      // Mostrar/ocultar botão limpar
      if (buscaLimpar) {
        buscaLimpar.classList.toggle('visible', termo.length > 0);
      }

      // Sincronizar com sidebar se existir
      if (sidebarBuscaInput) sidebarBuscaInput.value = e.target.value;

      filtrarTopicos();
    });

    if (buscaLimpar) {
      buscaLimpar.addEventListener('click', () => {
        buscaInput.value = '';
        if (sidebarBuscaInput) sidebarBuscaInput.value = '';
        buscaLimpar.classList.remove('visible');
        filtrarTopicos();
      });
    }
  }
}

// ============================================
// FILTROS
// ============================================
function inicializarFiltros() {
  // Filtros na sidebar (novos)
  const sidebarFiltroBtns = document.querySelectorAll('.sidebar-filtro-btn');
  // Filtros na toolbar (mobile/fallback)
  const filtroBtns = document.querySelectorAll('.filtro-btn');

  // Sidebar filtros
  sidebarFiltroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filtro = btn.getAttribute('data-filtro');

      // Remover active de todos
      sidebarFiltroBtns.forEach(b => b.classList.remove('active'));
      filtroBtns.forEach(b => b.classList.remove('active'));

      // Adicionar active no clicado
      btn.classList.add('active');

      // Sincronizar com toolbar
      const toolbarBtn = document.querySelector(`.filtro-btn[data-filtro="${filtro}"]`);
      if (toolbarBtn) toolbarBtn.classList.add('active');

      filtrarTopicos();
    });
  });

  // Toolbar filtros (mobile)
  filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filtro = btn.getAttribute('data-filtro');

      filtroBtns.forEach(b => b.classList.remove('active'));
      sidebarFiltroBtns.forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      // Sincronizar com sidebar
      const sidebarBtn = document.querySelector(`.sidebar-filtro-btn[data-filtro="${filtro}"]`);
      if (sidebarBtn) sidebarBtn.classList.add('active');

      filtrarTopicos();
    });
  });
}

function filtrarTopicos() {
  // Buscar termo em ambos os inputs
  const sidebarBuscaInput = document.getElementById('sidebar-busca-input');
  const buscaInput = document.getElementById('busca-topicos');
  const termo = (sidebarBuscaInput?.value || buscaInput?.value || '').toLowerCase().trim();

  // Buscar filtro ativo em ambos
  const sidebarFiltroAtivo = document.querySelector('.sidebar-filtro-btn.active');
  const filtroAtivo = document.querySelector('.filtro-btn.active');
  const filtro = (sidebarFiltroAtivo || filtroAtivo)?.getAttribute('data-filtro') || 'todos';

  const cards = document.querySelectorAll('.topico-card');

  cards.forEach(card => {
    const nome = card.querySelector('.topico-nome').textContent.toLowerCase();
    const checkbox = card.querySelector('.topico-checkbox input');
    const btnTeoria = card.querySelector('.btn-teoria');
    const questoesSpan = card.querySelector('.questoes-counter span');
    const btnFavorito = card.querySelector('.btn-favorito');

    const concluido = checkbox && checkbox.checked;
    const teoriaEstudada = btnTeoria && btnTeoria.classList.contains('active');
    const questoesFeitas = questoesSpan && parseInt(questoesSpan.textContent) > 0;
    const emProgresso = (teoriaEstudada || questoesFeitas) && !concluido;
    const favorito = btnFavorito && btnFavorito.classList.contains('active');

    // Verificar busca
    const matchBusca = termo === '' || nome.includes(termo);

    // Verificar filtro
    let matchFiltro = true;
    switch (filtro) {
      case 'pendentes':
        matchFiltro = !concluido && !emProgresso;
        break;
      case 'em-progresso':
        matchFiltro = emProgresso;
        break;
      case 'concluidos':
        matchFiltro = concluido;
        break;
      case 'favoritos':
        matchFiltro = favorito;
        break;
      default:
        matchFiltro = true;
    }

    // Aplicar visibilidade
    if (!matchBusca) {
      card.classList.add('busca-oculto');
    } else {
      card.classList.remove('busca-oculto');
    }

    if (!matchFiltro) {
      card.classList.add('filtro-oculto');
    } else {
      card.classList.remove('filtro-oculto');
    }

    // Highlight na busca
    if (termo && matchBusca) {
      card.classList.add('busca-destaque');
    } else {
      card.classList.remove('busca-destaque');
    }
  });

  // Verificar se há resultados
  verificarResultadosVazios();
}

function verificarResultadosVazios() {
  document.querySelectorAll('.topicos-grid').forEach(grid => {
    const cardsVisiveis = grid.querySelectorAll('.topico-card:not(.busca-oculto):not(.filtro-oculto)');
    let mensagemVazia = grid.querySelector('.resultado-vazio');

    if (cardsVisiveis.length === 0) {
      if (!mensagemVazia) {
        mensagemVazia = document.createElement('div');
        mensagemVazia.className = 'resultado-vazio';
        mensagemVazia.innerHTML = `
          <i class="bi bi-search"></i>
          <p>Nenhum tópico encontrado</p>
          <small>Tente ajustar os filtros ou busca</small>
        `;
        grid.appendChild(mensagemVazia);
      }
    } else if (mensagemVazia) {
      mensagemVazia.remove();
    }
  });
}

// ============================================
// MODO FOCO
// ============================================
function inicializarModoFoco() {
  const btnModoFoco = document.getElementById('btn-modo-foco');
  if (!btnModoFoco) return;

  // Carregar estado salvo
  const modoFocoAtivo = localStorage.getItem('lumed_modo_foco') === 'true';
  if (modoFocoAtivo) {
    document.body.classList.add('modo-foco');
    btnModoFoco.classList.add('active');
    btnModoFoco.querySelector('i').className = 'bi bi-eye-slash';
  }

  btnModoFoco.addEventListener('click', () => {
    document.body.classList.toggle('modo-foco');
    btnModoFoco.classList.toggle('active');

    const isAtivo = document.body.classList.contains('modo-foco');
    btnModoFoco.querySelector('i').className = isAtivo ? 'bi bi-eye-slash' : 'bi bi-eye';
    localStorage.setItem('lumed_modo_foco', isAtivo);
  });
}

// ============================================
// MODO COMPACTO
// ============================================
function inicializarModoCompacto() {
  const btnModoCompacto = document.getElementById('btn-modo-compacto');
  if (!btnModoCompacto) return;

  // Carregar estado salvo
  const modoCompactoAtivo = localStorage.getItem('lumed_modo_compacto') === 'true';
  if (modoCompactoAtivo) {
    document.body.classList.add('modo-compacto');
    btnModoCompacto.classList.add('active');
    btnModoCompacto.querySelector('i').className = 'bi bi-grid';
  }

  btnModoCompacto.addEventListener('click', () => {
    document.body.classList.toggle('modo-compacto');
    btnModoCompacto.classList.toggle('active');

    const isAtivo = document.body.classList.contains('modo-compacto');
    btnModoCompacto.querySelector('i').className = isAtivo ? 'bi bi-grid' : 'bi bi-view-list';
    localStorage.setItem('lumed_modo_compacto', isAtivo);
  });
}

// ============================================
// ANIMAÇÃO DE CONFETE
// ============================================
function dispararConfete() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  const cores = ['#3b82f6', '#60a5fa', '#8b5cf6', '#a78bfa', '#c084fc', '#a78bfa', '#fbbf24', '#f59e0b'];
  const formas = ['circle', 'square', 'ribbon'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = `confetti ${formas[Math.floor(Math.random() * formas.length)]}`;
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

    container.appendChild(confetti);

    // Remover após animação
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
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
            const metaTeoria = card.querySelector('.meta-teoria');
            if (metaTeoria) {
              metaTeoria.innerHTML = '<i class="bi bi-check-circle-fill"></i> Teoria estudada';
              metaTeoria.style.color = '#10b981';
            }
          }
        }

        // Restaurar questões
        if (topico.questoes) {
          const counterSpan = card.querySelector('.questoes-counter span');
          if (counterSpan) {
            counterSpan.textContent = topico.questoes;
          }
          const metaQuestoes = card.querySelector('.meta-questoes');
          if (metaQuestoes) {
            metaQuestoes.innerHTML = `<i class="bi bi-pencil"></i> ${topico.questoes} questões`;
            if (topico.questoes > 0) {
              metaQuestoes.style.color = '#10b981';
            }
          }
        }

        // Restaurar favorito
        if (topico.favorito) {
          const btnFavorito = card.querySelector('.btn-favorito');
          if (btnFavorito) {
            btnFavorito.classList.add('active');
            btnFavorito.querySelector('i').className = 'bi bi-star-fill';
            card.classList.add('favorito');
          }
        }

        // Atualizar status e progresso mini
        atualizarStatusBadge(card);
        atualizarProgressoMini(card);
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
// NAVBAR SUPERIOR
// ============================================
function inicializarNavbar() {
  const navbar = document.getElementById('navbar-top');
  const toggle = document.getElementById('navbar-toggle');
  const mainContent = document.querySelector('.main-conteudo');

  if (!navbar || !toggle) return;

  // Toggle menu expandido
  toggle.addEventListener('click', () => {
    navbar.classList.toggle('menu-open');
  });

  // Fechar menu ao clicar em um item
  document.querySelectorAll('.nav-expanded-item').forEach(item => {
    item.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navbar.classList.contains('menu-open')) {
      navbar.classList.remove('menu-open');
    }
  });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  inicializarNavbar();
  inicializarAbas();
  inicializarNiveis();
  inicializarBusca();
  inicializarFiltros();
  inicializarModoFoco();
  inicializarModoCompacto();
  carregarProgresso();
  inicializarWidget();
});

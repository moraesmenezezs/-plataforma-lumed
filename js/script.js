// ============================================
// LuMED - JavaScript Principal
// ============================================

// Conteúdos por matéria (baseados nos editais)
const conteudosPorMateria = {
  portugues: [
    "Gêneros textuais",
    "Coesão e coerência textual",
    "Intertextualidade e interdiscursividade",
    "Variantes linguísticas",
    "Concordância e regência",
    "Períodos simples e compostos",
    "Quinhentismo, Barroco, Arcadismo",
    "Romantismo, Realismo, Naturalismo",
    "Simbolismo, Pré-Modernismo",
    "Modernismo e Literatura Contemporânea",
    "Literatura Amazonense",
    "Literatura Indígena e Africana",
    "Macunaíma - Mário de Andrade",
    "Triste Fim de Policarpo Quaresma",
    "Caligrafia de Deus - Márcio Souza"
  ],
  matematica: [
    "Razão, Proporção e Porcentagem",
    "Juros Simples e Compostos",
    "Função Polinomial de 1º grau",
    "Função Polinomial de 2º grau",
    "Função Exponencial",
    "Função Logarítmica",
    "Progressão Aritmética (PA)",
    "Progressão Geométrica (PG)",
    "Matrizes e Determinantes",
    "Sistemas Lineares",
    "Trigonometria",
    "Lei dos Senos e Cossenos",
    "Geometria Plana",
    "Geometria Espacial",
    "Análise Combinatória",
    "Probabilidade",
    "Estatística",
    "Geometria Analítica",
    "Polígonos Regulares",
    "Notação Científica"
  ],
  historia: [
    "Mundo Antigo: Grécia e Roma",
    "África Antiga",
    "Civilizações do Oriente",
    "América Pré-Colombiana",
    "Absolutismo e Mercantilismo",
    "Renascimento e Reformas",
    "Revolução Industrial",
    "Revolução Francesa",
    "Imperialismo e Neocolonialismo",
    "Primeira Guerra Mundial",
    "Revolução Russa",
    "Regimes Totalitários",
    "Segunda Guerra Mundial",
    "Guerra Fria",
    "Brasil Colonial",
    "Brasil Império",
    "República Velha e Era Vargas",
    "Ditadura Militar no Brasil",
    "Redemocratização do Brasil",
    "Povos Indígenas na Amazônia",
    "Período da Borracha",
    "Zona Franca de Manaus",
    "Cabanagem",
    "Populações Quilombolas",
    "Movimentos Sociais Contemporâneos"
  ],
  geografia: [
    "Cartografia e Projeções",
    "Geopolítica Mundial",
    "Globalização e Blocos Econômicos",
    "População Mundial e Migrações",
    "Urbanização e Problemas Urbanos",
    "Industrialização e Fontes de Energia",
    "Agronegócio e Agricultura Familiar",
    "Conflitos Agrários no Brasil",
    "Biomas Brasileiros",
    "Questões Ambientais",
    "Recursos Hídricos",
    "Clima e Fenômenos Climáticos",
    "Relevo e Solos",
    "Amazônia: ocupação e territorialidade",
    "Povos e Comunidades Tradicionais",
    "Ciclos Hidrológicos na Amazônia",
    "Empreendedorismo no Amazonas",
    "Comércio por Hidrovias e Rodovias",
    "Desenvolvimento Sustentável",
    "Indicadores Socioeconômicos"
  ],
  biologia: [
    "Citologia: estrutura celular",
    "Divisão Celular",
    "Metabolismo Energético",
    "Biologia Molecular: DNA e RNA",
    "Genética: Leis de Mendel",
    "Herança e Sexo",
    "Mutações Genéticas",
    "Biotecnologia",
    "Evolução Biológica",
    "Classificação dos Seres Vivos",
    "Ecologia: ecossistemas",
    "Ciclos Biogeoquímicos",
    "Impactos Ambientais",
    "Corpo Humano: sistemas",
    "ISTs e Métodos Contraceptivos",
    "Vacinas e Imunização",
    "Biodiversidade Amazônica",
    "Dinâmica de Populações"
  ],
  fisica: [
    "Cinemática",
    "Dinâmica: Leis de Newton",
    "Gravitação Universal",
    "Energia, Trabalho e Potência",
    "Quantidade de Movimento",
    "Hidrostática",
    "Termologia",
    "Calorimetria",
    "Termodinâmica",
    "Ondas",
    "Óptica",
    "Eletrostática",
    "Eletrodinâmica",
    "Circuitos Elétricos",
    "Magnetismo e Eletromagnetismo",
    "Física Moderna",
    "Energia Nuclear",
    "Fontes de Energia Renováveis"
  ],
  quimica: [
    "Estados Físicos da Matéria",
    "Substâncias e Misturas",
    "Modelos Atômicos",
    "Tabela Periódica",
    "Ligações Químicas",
    "Funções Inorgânicas",
    "Reações Químicas",
    "Estequiometria",
    "Soluções e Concentração",
    "Termoquímica",
    "Cinética Química",
    "Equilíbrio Químico",
    "Eletroquímica",
    "Química Orgânica",
    "Hidrocarbonetos",
    "Polímeros",
    "Bioquímica",
    "Química Ambiental"
  ],
  filosofia: [
    "Mito e Filosofia",
    "Ética e Moral",
    "Filosofia Política",
    "Direitos Humanos e Cidadania",
    "Diversidade Cultural",
    "Bioética",
    "Tecnologia e Sociedade",
    "Ética e Meio Ambiente",
    "Filosofia da Arte",
    "Trabalho e Dignidade Humana",
    "Preconceito e Discriminação",
    "Saberes Indígenas e Africanos"
  ],
  sociologia: [
    "Pensamento Sociológico no Brasil",
    "Cultura e Sociedade na Amazônia",
    "Movimentos Sociais",
    "Democracia e Cidadania",
    "Globalização e Desigualdades",
    "Trabalho e Classes Sociais",
    "Indústria Cultural e Mídia",
    "Questões Ambientais e Sociedade",
    "Etnicidade e Identidade",
    "Violência e Segurança Pública",
    "Direitos Trabalhistas",
    "Economia na Amazônia"
  ],
  ingles: [
    "Leitura e Interpretação",
    "Variantes da Língua Inglesa",
    "Fake News e Análise Crítica",
    "Vocabulário e Expressões",
    "Gramática: tempos verbais",
    "Textos Literários em Inglês",
    "Inglês e Tecnologia",
    "Cultura e Diversidade"
  ]
};

// Nomes das matérias para exibição
const nomesMaterias = {
  portugues: "Português",
  matematica: "Matemática",
  historia: "História",
  geografia: "Geografia",
  biologia: "Biologia",
  fisica: "Física",
  quimica: "Química",
  filosofia: "Filosofia",
  sociologia: "Sociologia",
  ingles: "Inglês"
};

// Ícones das matérias
const iconesMaterias = {
  portugues: "bi-book",
  matematica: "bi-calculator",
  historia: "bi-hourglass-split",
  geografia: "bi-globe",
  biologia: "bi-tree",
  fisica: "bi-lightning",
  quimica: "bi-droplet-fill",
  filosofia: "bi-lightbulb",
  sociologia: "bi-people",
  ingles: "bi-translate"
};

// Estado do modal
let materiaSelecionada = null;
let conteudoSelecionado = null;

// Elementos do DOM
const modal = document.getElementById('modal-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar-tarefa');
const btnFechar = document.getElementById('fechar-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const btnConfirmar = document.getElementById('btn-confirmar-tarefa');
const inputNome = document.getElementById('nome-tarefa');
const materiasGrid = document.getElementById('materias-grid');
const conteudoGroup = document.getElementById('conteudo-group');
const conteudosLista = document.getElementById('conteudos-lista');
const listaTarefas = document.getElementById('lista-tarefas');
const todoVazio = document.getElementById('todo-vazio');

// Abrir modal
btnAdicionar.addEventListener('click', () => {
  modal.classList.add('ativo');
  resetarModal();
});

// Fechar modal
btnFechar.addEventListener('click', fecharModal);
btnCancelar.addEventListener('click', fecharModal);

// Fechar ao clicar fora
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    fecharModal();
  }
});

function fecharModal() {
  modal.classList.remove('ativo');
  resetarModal();
}

function resetarModal() {
  materiaSelecionada = null;
  conteudoSelecionado = null;
  inputNome.value = '';
  conteudoGroup.style.display = 'none';
  conteudosLista.innerHTML = '';
  btnConfirmar.disabled = true;

  document.querySelectorAll('.materia-btn').forEach(btn => {
    btn.classList.remove('selecionada');
  });
}

// Selecionar matéria
materiasGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.materia-btn');
  if (!btn) return;

  // Remove seleção anterior
  document.querySelectorAll('.materia-btn').forEach(b => {
    b.classList.remove('selecionada');
  });

  // Adiciona seleção
  btn.classList.add('selecionada');
  materiaSelecionada = btn.dataset.materia;

  // Mostra conteúdos
  mostrarConteudos(materiaSelecionada);
  verificarBotao();
});

function mostrarConteudos(materia) {
  const conteudos = conteudosPorMateria[materia];
  const nomeMateria = nomesMaterias[materia];

  conteudoGroup.style.display = 'block';
  document.querySelector('.materia-selecionada').textContent = `- ${nomeMateria}`;

  conteudosLista.innerHTML = conteudos.map(conteudo => `
    <div class="conteudo-item" data-conteudo="${conteudo}">
      <i class="bi bi-check-circle-fill"></i>
      <span>${conteudo}</span>
    </div>
  `).join('');

  // Adiciona eventos aos conteúdos
  conteudosLista.querySelectorAll('.conteudo-item').forEach(item => {
    item.addEventListener('click', () => {
      // Remove seleção anterior
      conteudosLista.querySelectorAll('.conteudo-item').forEach(i => {
        i.classList.remove('selecionado');
      });

      // Adiciona seleção
      item.classList.add('selecionado');
      conteudoSelecionado = item.dataset.conteudo;

      // Preenche o nome se estiver vazio
      if (!inputNome.value.trim()) {
        inputNome.value = `Estudar ${conteudoSelecionado}`;
      }

      verificarBotao();
    });
  });

  conteudoSelecionado = null;
}

// Verificar se pode habilitar botão
function verificarBotao() {
  const nomePreenchido = inputNome.value.trim().length > 0;
  const materiaOk = materiaSelecionada !== null;

  btnConfirmar.disabled = !(nomePreenchido && materiaOk);
}

inputNome.addEventListener('input', verificarBotao);

// Verificar estado vazio
function verificarEstadoVazio() {
  const tarefas = listaTarefas.querySelectorAll('.todo-item-wrapper');

  if (tarefas.length === 0) {
    if (!todoVazio) {
      const vazio = document.createElement('div');
      vazio.className = 'todo-vazio';
      vazio.id = 'todo-vazio';
      vazio.innerHTML = `
        <i class="bi bi-clipboard-check"></i>
        <p>Nenhuma tarefa ainda</p>
        <span>Clique em "Adicionar tarefa" para começar</span>
      `;
      listaTarefas.appendChild(vazio);
    } else {
      todoVazio.style.display = 'flex';
    }
  } else {
    const vazioEl = document.getElementById('todo-vazio');
    if (vazioEl) {
      vazioEl.style.display = 'none';
    }
  }
}

// Adicionar tarefa
btnConfirmar.addEventListener('click', () => {
  const nome = inputNome.value.trim();
  const materia = materiaSelecionada;
  const nomeMateria = nomesMaterias[materia];
  const icone = iconesMaterias[materia];
  const inputQuestoes = document.getElementById('questoes-tarefa');
  const questoes = inputQuestoes ? parseInt(inputQuestoes.value) || 0 : 0;

  if (!nome || !materia) return;

  // Esconde estado vazio
  const vazioEl = document.getElementById('todo-vazio');
  if (vazioEl) vazioEl.style.display = 'none';

  // Cria wrapper com sistema de swipe
  const wrapper = document.createElement('div');
  wrapper.className = 'todo-item-wrapper';
  wrapper.dataset.questoes = questoes;
  wrapper.dataset.materia = materia;
  wrapper.dataset.contabilizado = 'false';

  const questoesLabel = questoes > 0 ? `<span class="todo-questoes"><i class="bi bi-pencil-square"></i> ${questoes} questões</span>` : '';

  wrapper.innerHTML = `
    <div class="todo-delete-bg" onclick="excluirTarefa(this.parentElement)" title="Excluir tarefa">
      <i class="bi bi-trash-fill"></i>
    </div>
    <div class="todo-item">
      <label class="todo-checkbox">
        <input type="checkbox" onchange="marcarTarefa(this)">
        <span class="checkmark"></span>
      </label>
      <div class="todo-content">
        <span class="todo-text">${nome}</span>
        <span class="todo-meta"><i class="bi ${icone}"></i> ${nomeMateria} ${questoesLabel}</span>
      </div>
    </div>
  `;

  // Adiciona eventos de swipe
  configurarSwipe(wrapper);

  // Adiciona na lista
  listaTarefas.appendChild(wrapper);

  // Salvar no localStorage
  salvarTarefas();

  // Fecha modal
  fecharModal();

  // Limpa campo de questões
  if (inputQuestoes) inputQuestoes.value = '';

  // Atualiza progresso
  atualizarProgressoTarefas();
});

// Configurar eventos de swipe (arrastar)
function configurarSwipe(wrapper) {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const todoItem = wrapper.querySelector('.todo-item');

  function finalizarSwipe() {
    const diff = startX - currentX;
    isDragging = false;

    if (diff > 40) {
      // Arrastou o suficiente - trava mostrando a lixeira
      wrapper.classList.add('swiped');
      todoItem.style.transform = 'translateX(-80px)';
    } else {
      // Não arrastou o suficiente - volta ao normal
      wrapper.classList.remove('swiped');
      todoItem.style.transform = 'translateX(0)';
    }
  }

  // Touch events (mobile)
  todoItem.addEventListener('touchstart', (e) => {
    if (e.target.closest('.todo-checkbox')) return;
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    todoItem.style.transition = 'none';
  }, { passive: true });

  todoItem.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Só permite arrastar para a esquerda (diff positivo)
    if (diff > 0) {
      const translateX = Math.min(diff, 80);
      todoItem.style.transform = `translateX(-${translateX}px)`;
    } else if (!wrapper.classList.contains('swiped')) {
      todoItem.style.transform = 'translateX(0)';
    }
  }, { passive: true });

  todoItem.addEventListener('touchend', () => {
    todoItem.style.transition = '';
    finalizarSwipe();
  });

  // Mouse events (desktop)
  todoItem.addEventListener('mousedown', (e) => {
    if (e.target.closest('.todo-checkbox')) return;
    e.preventDefault();
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
    todoItem.style.transition = 'none';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const diff = startX - currentX;

    if (diff > 0) {
      const translateX = Math.min(diff, 80);
      todoItem.style.transform = `translateX(-${translateX}px)`;
    } else if (!wrapper.classList.contains('swiped')) {
      todoItem.style.transform = 'translateX(0)';
    }
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    document.body.style.userSelect = '';
    todoItem.style.transition = '';
    finalizarSwipe();
  });

  // Clique para fechar swipe (voltar ao normal)
  todoItem.addEventListener('click', (e) => {
    if (wrapper.classList.contains('swiped') && !e.target.closest('.todo-checkbox')) {
      wrapper.classList.remove('swiped');
      todoItem.style.transform = 'translateX(0)';
    }
  });
}

// Excluir tarefa
function excluirTarefa(wrapper) {
  wrapper.style.animation = 'slideOut 0.3s ease forwards';
  setTimeout(() => {
    wrapper.remove();
    salvarTarefas();
    atualizarProgressoTarefas();
    verificarEstadoVazio();
  }, 300);
}

// Marcar tarefa como concluída
function marcarTarefa(checkbox) {
  const todoItem = checkbox.closest('.todo-item');
  const wrapper = checkbox.closest('.todo-item-wrapper');

  if (checkbox.checked) {
    todoItem.classList.add('completed');
    checkbox.nextElementSibling.innerHTML = '<i class="bi bi-check"></i>';

    // Adicionar questões ao desempenho se ainda não contabilizado
    if (wrapper && wrapper.dataset.contabilizado !== 'true') {
      const questoes = parseInt(wrapper.dataset.questoes) || 0;
      const materia = wrapper.dataset.materia || 'geral';

      if (questoes > 0) {
        adicionarQuestoesDesempenho(questoes, materia);
        wrapper.dataset.contabilizado = 'true';
      }
    }
  } else {
    todoItem.classList.remove('completed');
    checkbox.nextElementSibling.innerHTML = '';
    // Não reverte as questões ao desmarcar
  }

  salvarTarefas();
  atualizarProgressoTarefas();
  atualizarBannerQuestoes();
}

// Adicionar questões ao sistema de desempenho
function adicionarQuestoesDesempenho(quantidade, materia) {
  let questoesData = JSON.parse(localStorage.getItem('lumed_questoes')) || { total: 0, historico: [] };

  questoesData.total += quantidade;

  const registro = {
    id: Date.now(),
    quantidade: quantidade,
    materia: materia,
    data: new Date().toISOString(),
    fonte: 'tarefa'
  };

  questoesData.historico.unshift(registro);

  if (questoesData.historico.length > 50) {
    questoesData.historico = questoesData.historico.slice(0, 50);
  }

  localStorage.setItem('lumed_questoes', JSON.stringify(questoesData));
}

// Atualizar banner com total de questões
function atualizarBannerQuestoes() {
  const questoesData = JSON.parse(localStorage.getItem('lumed_questoes')) || { total: 0, historico: [] };
  const bannerQuestoes = document.querySelector('.welcome-stats .stat-item:first-child .stat-value');

  if (bannerQuestoes) {
    bannerQuestoes.textContent = questoesData.total;
  }
}

// Atualizar barra de progresso
function atualizarProgressoTarefas() {
  const total = listaTarefas.querySelectorAll('.todo-item-wrapper').length;
  const completadas = listaTarefas.querySelectorAll('.todo-item.completed').length;
  const porcentagem = total > 0 ? ((completadas / total) * 100).toFixed(0) : 0;

  const progressFill = document.querySelector('.atividades-main .progress-fill');
  const progressText = document.querySelector('.atividades-main .progress-text');
  const contadorTarefas = document.getElementById('contador-tarefas');

  if (progressFill) progressFill.style.width = porcentagem + '%';
  if (progressText) progressText.textContent = porcentagem + '%';
  if (contadorTarefas) contadorTarefas.textContent = `${completadas}/${total} concluídas`;
}

// Salvar tarefas no localStorage
function salvarTarefas() {
  const tarefas = [];
  listaTarefas.querySelectorAll('.todo-item-wrapper').forEach(wrapper => {
    const item = wrapper.querySelector('.todo-item');
    const texto = item.querySelector('.todo-text').textContent;
    const metaEl = item.querySelector('.todo-meta');
    const meta = metaEl.textContent.trim();
    const iconeEl = metaEl.querySelector('i');
    const icone = iconeEl ? iconeEl.className.replace('bi ', '') : 'bi-book';
    const completada = item.classList.contains('completed');
    const questoes = parseInt(wrapper.dataset.questoes) || 0;
    const materia = wrapper.dataset.materia || 'geral';
    const contabilizado = wrapper.dataset.contabilizado === 'true';

    tarefas.push({ texto, meta, icone, completada, questoes, materia, contabilizado });
  });

  localStorage.setItem('lumed_tarefas', JSON.stringify(tarefas));
}

// Carregar tarefas do localStorage
function carregarTarefas() {
  const dados = localStorage.getItem('lumed_tarefas');
  if (!dados) {
    verificarEstadoVazio();
    return;
  }

  const tarefas = JSON.parse(dados);

  if (tarefas.length === 0) {
    verificarEstadoVazio();
    return;
  }

  // Esconde estado vazio
  const vazioEl = document.getElementById('todo-vazio');
  if (vazioEl) vazioEl.style.display = 'none';

  // Recria tarefas
  tarefas.forEach(tarefa => {
    const wrapper = document.createElement('div');
    wrapper.className = 'todo-item-wrapper';
    wrapper.dataset.questoes = tarefa.questoes || 0;
    wrapper.dataset.materia = tarefa.materia || 'geral';
    wrapper.dataset.contabilizado = tarefa.contabilizado ? 'true' : 'false';

    wrapper.innerHTML = `
      <div class="todo-delete-bg" onclick="excluirTarefa(this.parentElement)" title="Excluir tarefa">
        <i class="bi bi-trash-fill"></i>
      </div>
      <div class="todo-item${tarefa.completada ? ' completed' : ''}">
        <label class="todo-checkbox">
          <input type="checkbox" ${tarefa.completada ? 'checked' : ''} onchange="marcarTarefa(this)">
          <span class="checkmark">${tarefa.completada ? '<i class="bi bi-check"></i>' : ''}</span>
        </label>
        <div class="todo-content">
          <span class="todo-text">${tarefa.texto}</span>
          <span class="todo-meta"><i class="bi ${tarefa.icone}"></i> ${tarefa.meta}</span>
        </div>
      </div>
    `;

    configurarSwipe(wrapper);
    listaTarefas.appendChild(wrapper);
  });

  atualizarProgressoTarefas();
}

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    to {
      transform: translateX(-100%);
      opacity: 0;
      height: 0;
      padding: 0;
      margin: 0;
    }
  }
`;
document.head.appendChild(style);

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  carregarTarefas();
  inicializarWidget();
  inicializarNavbar();
  inicializarCalendario();
  inicializarCronometro();
  atualizarContadorENEM();
  atualizarRadarVestibulares();
  atualizarBannerQuestoes();
  verificarPaginaInicial();
});

// Verificar se deve abrir uma página específica (via query string ou hash)
function verificarPaginaInicial() {
  const params = new URLSearchParams(window.location.search);
  const pagina = params.get('pagina');
  const hash = window.location.hash.replace('#', '');

  // Verificar query string primeiro
  if (pagina === 'planner') {
    const navPlanner = document.getElementById('nav-planner');
    if (navPlanner) navPlanner.click();
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  // Verificar hash da URL (vindo de outras páginas)
  if (hash) {
    let navElement = null;

    switch(hash) {
      case 'planner':
        navElement = document.getElementById('nav-planner');
        break;
      case 'timer':
        navElement = document.getElementById('nav-timer');
        break;
      case 'aulas':
        navElement = document.getElementById('nav-aulas');
        break;
      case 'redacao':
        navElement = document.getElementById('nav-redacao');
        break;
      case 'config':
        navElement = document.getElementById('nav-config');
        break;
    }

    if (navElement) {
      navElement.click();
    }

    // Limpar hash da URL
    window.history.replaceState({}, document.title, window.location.pathname);
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

  // Abrir menu
  btnMenu.addEventListener('click', () => {
    sidebar.classList.add('aberta');
    overlay.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  });

  // Fechar ao clicar no overlay
  overlay.addEventListener('click', fecharMenuMobile);

  // Fechar ao clicar em item do menu (mobile)
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

  // Fechar menu ao redimensionar para desktop
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
// WIDGET MOTIVACIONAL - Minimizar/Expandir
// ============================================

function inicializarWidget() {
  const widget = document.getElementById('widget-motivacional');
  const toggle = document.getElementById('widget-toggle');
  const widgetMini = document.getElementById('widget-mini');

  if (!widget || !toggle) return;

  // Carregar estado salvo
  const estadoSalvo = localStorage.getItem('widget_minimizado');
  if (estadoSalvo === 'true') {
    widget.classList.add('minimizado');
  }

  // Botão de minimizar
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    widget.classList.add('minimizado');
    localStorage.setItem('widget_minimizado', 'true');
  });

  // Clique no widget minimizado para expandir
  widget.addEventListener('click', () => {
    if (widget.classList.contains('minimizado')) {
      widget.classList.remove('minimizado');
      localStorage.setItem('widget_minimizado', 'false');
    }
  });
}

// ============================================
// CALENDÁRIO FUNCIONAL
// ============================================

let calendarioMesAtual = new Date().getMonth();
let calendarioAnoAtual = new Date().getFullYear();
let eventosCalendario = {};
let diaSelecionado = null;

const mesesNomes = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const mesesAbrev = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

function inicializarCalendario() {
  // Carregar eventos salvos
  carregarEventos();

  // Renderizar calendário
  renderizarCalendario();

  // Configurar modal de eventos
  configurarModalEventos();

  // Atualizar mês exibido
  atualizarMesExibido();
}

function carregarEventos() {
  const dados = localStorage.getItem('lumed_eventos');
  if (dados) {
    eventosCalendario = JSON.parse(dados);
  }
}

function salvarEventos() {
  localStorage.setItem('lumed_eventos', JSON.stringify(eventosCalendario));
}

function renderizarCalendario() {
  // Renderiza no calendário do planner (o único calendário na UI)
  const calendarDays = document.getElementById('calendar-days-planner');
  if (!calendarDays) return;

  const hoje = new Date();
  const primeiroDia = new Date(calendarioAnoAtual, calendarioMesAtual, 1);
  const ultimoDia = new Date(calendarioAnoAtual, calendarioMesAtual + 1, 0);

  let diaInicio = primeiroDia.getDay();
  const totalDias = ultimoDia.getDate();

  calendarDays.innerHTML = '';

  // Dias vazios do início
  for (let i = 0; i < diaInicio; i++) {
    const empty = document.createElement('span');
    empty.className = 'day empty';
    calendarDays.appendChild(empty);
  }

  // Dias do mês atual
  for (let dia = 1; dia <= totalDias; dia++) {
    const dataStr = formatarData(calendarioAnoAtual, calendarioMesAtual, dia);
    const dayEl = document.createElement('span');
    dayEl.className = 'day';
    dayEl.textContent = dia;

    if (dia === hoje.getDate() && calendarioMesAtual === hoje.getMonth() && calendarioAnoAtual === hoje.getFullYear()) {
      dayEl.classList.add('today');
    }

    // Verificar se tem evento
    if (eventosCalendario[dataStr]) {
      dayEl.classList.add('has-event');
      dayEl.classList.add(eventosCalendario[dataStr].tipo || 'evento');
    }

    // Click para abrir modal de evento
    dayEl.addEventListener('click', () => {
      abrirModalEvento(dataStr, dia);
    });

    calendarDays.appendChild(dayEl);
  }

  // Atualizar mês exibido
  const mesAtualEl = document.getElementById('mes-atual-planner');
  if (mesAtualEl) {
    mesAtualEl.textContent = `${mesesAbrev[calendarioMesAtual]} ${calendarioAnoAtual}`;
  }
}

function formatarData(ano, mes, dia) {
  return `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function atualizarMesExibido() {
  const mesAtualEl = document.querySelector('.mes-atual-mini');
  if (mesAtualEl) {
    mesAtualEl.textContent = `${mesesAbrev[calendarioMesAtual]} ${calendarioAnoAtual}`;
  }
}

function abrirModalEvento(dataStr, dia) {
  diaSelecionado = dataStr;

  const modal = document.getElementById('modal-evento');
  if (!modal) return;

  // Atualizar título do modal
  const tituloModal = modal.querySelector('.modal-header h2');
  const [ano, mes, diaNum] = dataStr.split('-');
  tituloModal.innerHTML = `<i class="bi bi-calendar-event"></i> ${diaNum} de ${mesesNomes[parseInt(mes) - 1]}`;

  // Carregar evento existente se houver
  const inputTitulo = document.getElementById('evento-titulo');
  const selectTipo = document.getElementById('evento-tipo');
  const inputDescricao = document.getElementById('evento-descricao');
  const btnExcluir = document.getElementById('btn-excluir-evento');

  if (eventosCalendario[dataStr]) {
    const evento = eventosCalendario[dataStr];
    inputTitulo.value = evento.titulo || '';
    selectTipo.value = evento.tipo || 'evento';
    inputDescricao.value = evento.descricao || '';
    btnExcluir.style.display = 'block';
  } else {
    inputTitulo.value = '';
    selectTipo.value = 'evento';
    inputDescricao.value = '';
    btnExcluir.style.display = 'none';
  }

  modal.classList.add('ativo');
}

function fecharModalEvento() {
  const modal = document.getElementById('modal-evento');
  if (modal) {
    modal.classList.remove('ativo');
  }
  diaSelecionado = null;
}

function salvarEvento() {
  if (!diaSelecionado) return;

  const inputTitulo = document.getElementById('evento-titulo');
  const selectTipo = document.getElementById('evento-tipo');
  const inputDescricao = document.getElementById('evento-descricao');

  const titulo = inputTitulo.value.trim();

  if (!titulo) {
    alert('Digite um título para o evento!');
    return;
  }

  eventosCalendario[diaSelecionado] = {
    titulo: titulo,
    tipo: selectTipo.value,
    descricao: inputDescricao.value.trim()
  };

  salvarEventos();
  renderizarCalendario();
  fecharModalEvento();
}

function excluirEvento() {
  if (!diaSelecionado) return;

  mostrarConfirmacao('Excluir evento', 'Tem certeza que deseja excluir este evento?', () => {
    delete eventosCalendario[diaSelecionado];
    salvarEventos();
    renderizarCalendario();
    fecharModalEvento();
  });
}

function configurarModalEventos() {
  const modal = document.getElementById('modal-evento');
  if (!modal) return;

  // Fechar ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      fecharModalEvento();
    }
  });

  // Botão fechar
  const btnFechar = document.getElementById('fechar-modal-evento');
  if (btnFechar) {
    btnFechar.addEventListener('click', fecharModalEvento);
  }

  // Botão cancelar
  const btnCancelar = document.getElementById('btn-cancelar-evento');
  if (btnCancelar) {
    btnCancelar.addEventListener('click', fecharModalEvento);
  }

  // Botão salvar
  const btnSalvar = document.getElementById('btn-salvar-evento');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', salvarEvento);
  }

  // Botão excluir
  const btnExcluir = document.getElementById('btn-excluir-evento');
  if (btnExcluir) {
    btnExcluir.addEventListener('click', excluirEvento);
  }
}

// ============================================
// CRONÔMETRO DE ESTUDOS
// ============================================

let cronometroInterval = null;
let cronometroSegundos = 0;
let cronometroRodando = false;

function inicializarCronometro() {
  const btnEstudar = document.getElementById('btn-estudar');
  const btnZerarDia = document.getElementById('btn-zerar-dia');

  if (!btnEstudar) return;

  // Carregar tempo de hoje
  carregarTempoEstudo();

  // Botão Estudar (play/pause)
  btnEstudar.addEventListener('click', toggleCronometro);

  // Botão Zerar Dia
  if (btnZerarDia) {
    btnZerarDia.addEventListener('click', zerarTempoDia);
  }

  // Atualizar exibição
  atualizarExibicaoTempo();
}

function toggleCronometro() {
  if (cronometroRodando) {
    pausarCronometro();
  } else {
    iniciarCronometro();
  }
}

function iniciarCronometro() {
  if (cronometroRodando) return;

  cronometroRodando = true;

  // Atualizar botão
  const btnEstudar = document.getElementById('btn-estudar');
  const icone = document.getElementById('icone-estudar');
  const texto = document.getElementById('texto-estudar');

  if (btnEstudar) btnEstudar.classList.add('estudando');
  if (icone) icone.className = 'bi bi-pause-fill';
  if (texto) texto.textContent = 'Pausar';

  // Iniciar contagem
  cronometroInterval = setInterval(() => {
    cronometroSegundos++;

    // Atualizar exibição a cada segundo
    atualizarExibicaoTempo();

    // Salvar a cada 30 segundos
    if (cronometroSegundos % 30 === 0) {
      salvarTempoEstudoSemResetar();
    }
  }, 1000);
}

function pausarCronometro() {
  if (!cronometroRodando) return;

  cronometroRodando = false;

  // Atualizar botão
  const btnEstudar = document.getElementById('btn-estudar');
  const icone = document.getElementById('icone-estudar');
  const texto = document.getElementById('texto-estudar');

  if (btnEstudar) btnEstudar.classList.remove('estudando');
  if (icone) icone.className = 'bi bi-play-fill';
  if (texto) texto.textContent = 'Continuar estudando';

  // Parar contagem
  clearInterval(cronometroInterval);

  // Salvar tempo
  salvarTempoEstudoSemResetar();
}

function zerarTempoDia() {
  mostrarConfirmacao('Zerar tempo', 'Tem certeza que deseja zerar o tempo de estudo de hoje?', () => {
    // Pausar cronômetro
    if (cronometroRodando) {
      pausarCronometro();
    }

    // Zerar sessão atual
    cronometroSegundos = 0;

    // Zerar tempo de hoje no localStorage
    const hoje = obterDataHoje();
    const tempos = obterTemposEstudo();
    tempos[hoje] = 0;
    localStorage.setItem('lumed_tempos_estudo', JSON.stringify(tempos));

    // Atualizar exibição
    atualizarExibicaoTempo();
  });
}

function formatarHoras(segundos) {
  const horas = segundos / 3600;
  if (horas < 1) {
    const minutos = Math.floor(segundos / 60);
    if (minutos === 0) {
      return `${segundos}s`;
    }
    return `${minutos}min`;
  }
  return `${horas.toFixed(1)}h`;
}

function obterDataHoje() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
}

function obterTemposEstudo() {
  const dados = localStorage.getItem('lumed_tempos_estudo');
  return dados ? JSON.parse(dados) : {};
}

function salvarTempoEstudoSemResetar() {
  const hoje = obterDataHoje();
  const tempos = obterTemposEstudo();

  // Salvar tempo total (salvo anteriormente + sessão atual)
  const tempoAnterior = tempos[hoje] || 0;
  tempos[hoje] = tempoAnterior + cronometroSegundos;

  localStorage.setItem('lumed_tempos_estudo', JSON.stringify(tempos));

  // Resetar contador da sessão (já foi salvo)
  cronometroSegundos = 0;
}

function carregarTempoEstudo() {
  // Sessão começa do zero, apenas atualiza exibição dos totais
  atualizarExibicaoTempo();
}

function atualizarExibicaoTempo() {
  const tempos = obterTemposEstudo();
  const hoje = obterDataHoje();

  // Tempo de hoje = salvo + sessão atual
  const tempoSalvo = tempos[hoje] || 0;
  const tempoTotal = tempoSalvo + cronometroSegundos;

  const displayHoje = document.getElementById('tempo-hoje');
  if (displayHoje) {
    displayHoje.textContent = formatarHoras(tempoTotal);
  }
}

// ============================================
// CONTADOR DIAS PARA VESTIBULARES
// ============================================

// Datas dos vestibulares 2026
const datasVestibulares = {
  enem: { data: new Date(2026, 10, 1), nome: 'ENEM 2026', ajustarDomingo: true }, // 1º domingo de novembro
  uea: { data: new Date(2026, 9, 26), nome: 'MACRO 2026', ajustarDomingo: false }, // 26 de outubro
  psi: { data: new Date(2026, 9, 13), nome: 'PSI 2026', ajustarDomingo: false } // 13 de outubro
};

function calcularDiasRestantes(dataAlvo, ajustarDomingo = false) {
  const data = new Date(dataAlvo);

  // Se precisa ajustar para o primeiro domingo (ENEM)
  if (ajustarDomingo) {
    while (data.getDay() !== 0) {
      data.setDate(data.getDate() + 1);
    }
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const diffTime = data - hoje;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

function atualizarContadorENEM() {
  const elementoDias = document.getElementById('dias-enem');
  if (!elementoDias) return;

  const dias = calcularDiasRestantes(datasVestibulares.enem.data, datasVestibulares.enem.ajustarDomingo);
  elementoDias.textContent = dias;
}

function atualizarRadarVestibulares() {
  const listaVestibulares = document.getElementById('lista-vestibulares');
  if (!listaVestibulares) return;

  // Calcula os dias para cada vestibular
  const diasEnem = calcularDiasRestantes(datasVestibulares.enem.data, datasVestibulares.enem.ajustarDomingo);
  const diasUea = calcularDiasRestantes(datasVestibulares.uea.data, datasVestibulares.uea.ajustarDomingo);
  const diasPsi = calcularDiasRestantes(datasVestibulares.psi.data, datasVestibulares.psi.ajustarDomingo);

  // Atualiza o HTML do radar
  listaVestibulares.innerHTML = `
    <!-- ENEM -->
    <div class="vestibular-mini">
      <div class="vestibular-logo-mini enem">ENEM</div>
      <div class="vestibular-info-mini">
        <span class="vestibular-nome-mini">${datasVestibulares.enem.nome}</span>
        <span class="vestibular-dias"><strong>${diasEnem}</strong> dias</span>
      </div>
    </div>

    <!-- MACRO UEA -->
    <div class="vestibular-mini">
      <div class="vestibular-logo-mini uea">UEA</div>
      <div class="vestibular-info-mini">
        <span class="vestibular-nome-mini">${datasVestibulares.uea.nome}</span>
        <span class="vestibular-dias"><strong>${diasUea}</strong> dias</span>
      </div>
    </div>

    <!-- PSI -->
    <div class="vestibular-mini">
      <div class="vestibular-logo-mini psi">PSI</div>
      <div class="vestibular-info-mini">
        <span class="vestibular-nome-mini">${datasVestibulares.psi.nome}</span>
        <span class="vestibular-dias"><strong>${diasPsi}</strong> dias</span>
      </div>
    </div>
  `;
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
      navbar.classList.toggle('menu-open');

      const icon = toggleBtn.querySelector('i');
      if (navbar.classList.contains('menu-open')) {
        icon.className = 'bi bi-x-lg';
      } else {
        icon.className = 'bi bi-grid-3x3-gap-fill';
      }
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!expandedMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navbar.classList.remove('menu-open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-grid-3x3-gap-fill';
      }
    });

    // Fechar ao clicar em item do menu e navegar para a seção correspondente
    expandedMenu.querySelectorAll('.nav-expanded-item').forEach(item => {
      item.addEventListener('click', () => {
        navbar.classList.remove('menu-open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-grid-3x3-gap-fill';

        // Navegar para a seção correspondente via data-section
        const section = item.getAttribute('data-section');
        if (section) {
          const navMap = {
            'painel': 'nav-painel',
            'planner': 'nav-planner',
            'timer': 'nav-timer',
            'aulas': 'nav-aulas',
            'redacao': 'nav-redacao',
            'config': 'nav-config'
          };
          const navId = navMap[section];
          if (navId) {
            const navItem = document.getElementById(navId);
            if (navItem) navItem.click();
          }
        }
      });
    });
  }

}

// ============================================
// PLANNER DE ESTUDOS
// ============================================

(function() {
  const plannerSection = document.getElementById('planner-section');
  const mainContent = document.querySelector('.main-content');
  const navPlanner = document.getElementById('nav-planner');
  const navPainel = document.getElementById('nav-painel');
  const gridBody = document.getElementById('grid-body');

  if (!plannerSection || !navPlanner) return;

  // Horários do dia
  const horarios = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ];

  // Cores das matérias
  const coresMateria = {
    portugues: '#ef4444',
    matematica: '#3b82f6',
    historia: '#f59e0b',
    geografia: '#10b981',
    biologia: '#22c55e',
    fisica: '#8b5cf6',
    quimica: '#ec4899',
    redacao: '#6366f1',
    ingles: '#14b8a6',
    revisao: '#64748b'
  };

  const nomesMateria = {
    portugues: 'Português',
    matematica: 'Matemática',
    historia: 'História',
    geografia: 'Geografia',
    biologia: 'Biologia',
    fisica: 'Física',
    quimica: 'Química',
    redacao: 'Redação',
    ingles: 'Inglês',
    revisao: 'Revisão'
  };

  let materiaSelecionada = null;
  let gradeData = JSON.parse(localStorage.getItem('plannerGrade')) || {};

  // Gerar grid
  function gerarGrid() {
    if (!gridBody) return;
    gridBody.innerHTML = '';

    horarios.forEach(horario => {
      const row = document.createElement('div');
      row.className = 'grid-row';

      // Célula de horário
      const timeCell = document.createElement('div');
      timeCell.className = 'grid-time';
      timeCell.textContent = horario;
      row.appendChild(timeCell);

      // 7 células para os dias
      for (let dia = 0; dia < 7; dia++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.horario = horario;
        cell.dataset.dia = dia;

        // Carregar dados salvos
        const key = `${dia}-${horario}`;
        if (gradeData[key]) {
          cell.classList.add('filled');
          cell.style.setProperty('--cor', coresMateria[gradeData[key]]);
          cell.textContent = nomesMateria[gradeData[key]];
        }

        cell.addEventListener('click', () => handleCellClick(cell, key));
        row.appendChild(cell);
      }

      gridBody.appendChild(row);
    });
  }

  // Clique na célula
  function handleCellClick(cell, key) {
    if (materiaSelecionada) {
      // Preencher célula
      cell.classList.add('filled');
      cell.style.setProperty('--cor', coresMateria[materiaSelecionada]);
      cell.textContent = nomesMateria[materiaSelecionada];
      gradeData[key] = materiaSelecionada;
      salvarGrade();
    } else if (gradeData[key]) {
      // Limpar célula se já tiver algo
      cell.classList.remove('filled');
      cell.style.removeProperty('--cor');
      cell.textContent = '';
      delete gradeData[key];
      salvarGrade();
    }
  }

  // Salvar grade
  function salvarGrade() {
    localStorage.setItem('plannerGrade', JSON.stringify(gradeData));
  }

  // Botões de matéria
  document.querySelectorAll('.materia-planner').forEach(btn => {
    btn.addEventListener('click', () => {
      const materia = btn.dataset.materia;

      if (materiaSelecionada === materia) {
        // Desselecionar
        materiaSelecionada = null;
        btn.classList.remove('selected');
      } else {
        // Selecionar nova
        document.querySelectorAll('.materia-planner').forEach(b => b.classList.remove('selected'));
        materiaSelecionada = materia;
        btn.classList.add('selected');
      }
    });
  });

  // Limpar grade
  const btnLimpar = document.getElementById('btn-limpar-grade');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      mostrarConfirmacao('Limpar grade', 'Deseja limpar toda a grade de estudos?', () => {
        gradeData = {};
        salvarGrade();
        gerarGrid();
      });
    });
  }

  // Navegação entre Painel e Planner
  navPlanner.addEventListener('click', () => {
    // Esconder todas as seções
    mainContent.style.display = 'none';
    const timerSec = document.getElementById('timer-section');
    const aulasSec = document.getElementById('aulas-section');
    if (timerSec) timerSec.style.display = 'none';
    if (aulasSec) aulasSec.style.display = 'none';
    plannerSection.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navPlanner.classList.add('active');

    gerarGrid();
    gerarCalendarioPlanner();
  });

  if (navPainel) {
    navPainel.addEventListener('click', () => {
      // Esconder todas as seções
      plannerSection.style.display = 'none';
      const timerSec = document.getElementById('timer-section');
      const aulasSec = document.getElementById('aulas-section');
      if (timerSec) timerSec.style.display = 'none';
      if (aulasSec) aulasSec.style.display = 'none';
      mainContent.style.display = 'block';

      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      navPainel.classList.add('active');
    });
  }

  // Calendário do Planner - usa o sistema global de calendário com eventos
  function gerarCalendarioPlanner() {
    // Sincronizar e renderizar usando o calendário global (que inclui eventos)
    renderizarCalendario();
  }

  // Navegação do calendário
  const prevMonth = document.getElementById('prev-month');
  const nextMonth = document.getElementById('next-month');

  if (prevMonth) {
    prevMonth.addEventListener('click', () => {
      calendarioMesAtual--;
      if (calendarioMesAtual < 0) {
        calendarioMesAtual = 11;
        calendarioAnoAtual--;
      }
      renderizarCalendario();
    });
  }

  if (nextMonth) {
    nextMonth.addEventListener('click', () => {
      calendarioMesAtual++;
      if (calendarioMesAtual > 11) {
        calendarioMesAtual = 0;
        calendarioAnoAtual++;
      }
      renderizarCalendario();
    });
  }

})();

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

  if (!modal) {
    // Fallback para confirm nativo se modal não existir
    if (confirm(mensagem)) {
      onConfirmar();
    }
    return;
  }

  tituloEl.textContent = titulo;
  mensagemEl.textContent = mensagem;
  confirmacaoCallback = onConfirmar;

  modal.classList.add('aberto');

  // Remover listeners antigos clonando os botões
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
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove('aberto');
      confirmacaoCallback = null;
    }
  };
}

// ============================================
// TIMER DE ESTUDOS
// ============================================

(function() {
  const timerSection = document.getElementById('timer-section');
  const mainContent = document.querySelector('.main-content');
  const plannerSection = document.getElementById('planner-section');
  const navTimer = document.getElementById('nav-timer');
  const navPainel = document.getElementById('nav-painel');
  const navPlanner = document.getElementById('nav-planner');

  if (!timerSection || !navTimer) return;

  // Elementos do timer
  const timerDisplay = document.getElementById('timer-display');
  const btnToggle = document.getElementById('btn-timer-toggle');
  const btnSave = document.getElementById('btn-timer-save');
  const fraseElement = document.getElementById('frase-motivacional');

  // Estado do timer - usa lumed_tempos_estudo[today] como fonte de verdade
  let timerInterval = null;
  let isRunning = false;

  function obterTempoHojeTimer() {
    const tempos = JSON.parse(localStorage.getItem('lumed_tempos_estudo')) || {};
    const h = new Date();
    const k = `${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,'0')}-${String(h.getDate()).padStart(2,'0')}`;
    return tempos[k] || 0;
  }

  function salvarTempoHojeTimer(seg) {
    const tempos = JSON.parse(localStorage.getItem('lumed_tempos_estudo')) || {};
    const h = new Date();
    const k = `${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,'0')}-${String(h.getDate()).padStart(2,'0')}`;
    tempos[k] = seg;
    localStorage.setItem('lumed_tempos_estudo', JSON.stringify(tempos));
  }

  let seconds = obterTempoHojeTimer();

  // Frases motivacionais
  const frases = [
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "Não importa o quão devagar você vá, desde que não pare.",
    "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
    "Acredite em si mesmo e todo o resto virá naturalmente.",
    "Cada hora de estudo te aproxima do seu sonho.",
    "A disciplina é a ponte entre metas e conquistas.",
    "Você não precisa ser perfeito, precisa ser persistente.",
    "O esforço de hoje é o sucesso de amanhã.",
    "Sua única limitação é aquela que você impõe a si mesmo.",
    "Grandes conquistas são feitas por pessoas que não desistem.",
    "O conhecimento é a única coisa que ninguém pode tirar de você.",
    "Estude como se fosse viver para sempre.",
    "Não espere por oportunidades, crie-as.",
    "A medicina começa com dedicação e termina com realização.",
    "Seu futuro está sendo construído agora, neste momento."
  ];

  // Atualizar display do timer
  function atualizarDisplay() {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const hoursSpan = timerDisplay.querySelector('.timer-hours');
    const minutesSpan = timerDisplay.querySelector('.timer-minutes');
    const secondsSpan = timerDisplay.querySelector('.timer-seconds');

    hoursSpan.textContent = hrs.toString().padStart(2, '0');
    minutesSpan.textContent = mins.toString().padStart(2, '0');
    secondsSpan.textContent = secs.toString().padStart(2, '0');

    // Atualizar o tempo no banner também
    atualizarTempoBanner();
  }

  // Atualizar tempo no banner
  function atualizarTempoBanner() {
    const tempoEstudoElement = document.getElementById('tempo-hoje');
    if (tempoEstudoElement) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);

      if (hrs > 0) {
        tempoEstudoElement.textContent = `${hrs}h ${mins}m`;
      } else if (mins > 0) {
        tempoEstudoElement.textContent = `${mins}m`;
      } else {
        tempoEstudoElement.textContent = `${seconds}s`;
      }
    }
  }

  // Iniciar/Pausar timer
  function toggleTimer() {
    if (isRunning) {
      // Pausar
      clearInterval(timerInterval);
      isRunning = false;
      salvarTempoHojeTimer(seconds);
      btnToggle.innerHTML = '<i class="bi bi-play-fill"></i><span>Iniciar</span>';
      btnToggle.classList.remove('running');
      timerSection.classList.remove('running');
    } else {
      // Iniciar
      timerInterval = setInterval(() => {
        seconds++;
        atualizarDisplay();
        // Salvar a cada 10 segundos para não sobrecarregar
        if (seconds % 10 === 0) {
          salvarTempoHojeTimer(seconds);
        }
      }, 1000);
      isRunning = true;
      btnToggle.innerHTML = '<i class="bi bi-pause-fill"></i><span>Pausar</span>';
      btnToggle.classList.add('running');
      timerSection.classList.add('running');
    }
  }

  // Salvar tempo
  function salvarTempo() {
    salvarTempoHojeTimer(seconds);

    // Feedback visual
    btnSave.innerHTML = '<i class="bi bi-check-lg"></i>';
    btnSave.style.background = '#22c55e';
    btnSave.style.color = 'white';

    setTimeout(() => {
      btnSave.innerHTML = '<i class="bi bi-check-lg"></i>';
      btnSave.style.background = '';
      btnSave.style.color = '';
    }, 1500);

    // Mostrar notificação
    mostrarNotificacao('Tempo salvo com sucesso!', 'success');
  }

  // Mostrar notificação
  function mostrarNotificacao(mensagem, tipo) {
    const notif = document.createElement('div');
    notif.className = `notificacao-timer ${tipo}`;
    notif.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${mensagem}`;
    notif.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${tipo === 'success' ? '#22c55e' : '#ef4444'};
      color: white;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notif.remove(), 300);
    }, 2000);
  }

  // Frase aleatória
  function mostrarFraseAleatoria() {
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    fraseElement.textContent = `"${fraseAleatoria}"`;
  }

  // Event listeners
  btnToggle.addEventListener('click', toggleTimer);
  btnSave.addEventListener('click', salvarTempo);

  // Navegação para Timer
  navTimer.addEventListener('click', () => {
    mainContent.style.display = 'none';
    plannerSection.style.display = 'none';
    const aulasSec = document.getElementById('aulas-section');
    if (aulasSec) aulasSec.style.display = 'none';
    timerSection.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navTimer.classList.add('active');

    // Pausar cronômetro do banner se estiver rodando para evitar conflito
    if (typeof cronometroRodando !== 'undefined' && cronometroRodando) {
      pausarCronometro();
    }

    // Recarregar tempo de hoje (pode ter mudado pelo cronômetro do banner)
    if (!isRunning) {
      seconds = obterTempoHojeTimer();
    }

    mostrarFraseAleatoria();
    atualizarDisplay();
  });

  // Atualizar navegação para Painel (esconder timer)
  if (navPainel) {
    const originalPainelClick = navPainel.onclick;
    navPainel.addEventListener('click', () => {
      timerSection.style.display = 'none';
    });
  }

  // Atualizar navegação para Planner (esconder timer)
  if (navPlanner) {
    const originalPlannerClick = navPlanner.onclick;
    navPlanner.addEventListener('click', () => {
      timerSection.style.display = 'none';
    });
  }

  // Inicializar display
  atualizarDisplay();
  mostrarFraseAleatoria();
})();

// ============================================
// SEÇÃO DE AULAS GRAVADAS
// ============================================

(function() {
  const aulasSection = document.getElementById('aulas-section');
  const mainContent = document.querySelector('.main-content');
  const plannerSection = document.getElementById('planner-section');
  const timerSection = document.getElementById('timer-section');
  const navAulas = document.getElementById('nav-aulas');
  const navPainel = document.getElementById('nav-painel');

  if (!aulasSection || !navAulas) return;

  // Estado
  let todasAulas = [];
  let aulaAoVivo = null;
  let aulasCarregadas = false;

  // Nomes das matérias
  const nomesMateriasAulas = {
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

  // Navegação para Aulas - esconder todas as outras seções
  navAulas.addEventListener('click', () => {
    mainContent.style.display = 'none';
    if (plannerSection) plannerSection.style.display = 'none';
    if (timerSection) timerSection.style.display = 'none';
    aulasSection.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navAulas.classList.add('active');

    // Carregar aulas apenas uma vez
    if (!aulasCarregadas) {
      carregarAulasFirebase();
      verificarAulaAoVivoFirebase();
      aulasCarregadas = true;
    }
  });

  // Esconder seção de aulas ao clicar em outras abas
  if (navPainel) {
    navPainel.addEventListener('click', () => {
      aulasSection.style.display = 'none';
    });
  }

  const navPlanner = document.getElementById('nav-planner');
  if (navPlanner) {
    navPlanner.addEventListener('click', () => {
      aulasSection.style.display = 'none';
    });
  }

  const navTimer = document.getElementById('nav-timer');
  if (navTimer) {
    navTimer.addEventListener('click', () => {
      aulasSection.style.display = 'none';
    });
  }

  // Carregar aulas do Firebase
  async function carregarAulasFirebase() {
    const aulasGrid = document.getElementById('aulas-grid');
    const loading = document.getElementById('loading-aulas');

    try {
      // Verificar se Firebase está disponível
      if (typeof aulasRef === 'undefined') {
        throw new Error('Firebase não configurado');
      }

      // Buscar aulas
      const snapshotAoVivo = await aulasRef.where('status', '==', 'ao-vivo').get();
      const snapshotFinalizada = await aulasRef.where('status', '==', 'finalizada').get();
      const snapshotAguardando = await aulasRef.where('status', '==', 'aguardando-video').get();

      todasAulas = [];

      snapshotAoVivo.forEach(doc => {
        todasAulas.push({ id: doc.id, ...doc.data() });
      });

      snapshotFinalizada.forEach(doc => {
        todasAulas.push({ id: doc.id, ...doc.data() });
      });

      snapshotAguardando.forEach(doc => {
        todasAulas.push({ id: doc.id, ...doc.data() });
      });

      // Ordenar
      todasAulas.sort((a, b) => {
        if (a.status === 'ao-vivo' && b.status !== 'ao-vivo') return -1;
        if (b.status === 'ao-vivo' && a.status !== 'ao-vivo') return 1;
        const dataA = a.dataInicio?.toDate ? a.dataInicio.toDate() : new Date(a.dataInicio);
        const dataB = b.dataInicio?.toDate ? b.dataInicio.toDate() : new Date(b.dataInicio);
        return dataB - dataA;
      });

      renderizarAulasGrid(todasAulas);

    } catch (error) {
      console.error('Erro ao carregar aulas:', error);
      if (loading) loading.style.display = 'none';
      aulasGrid.innerHTML = `
        <div class="aulas-vazio">
          <i class="bi bi-exclamation-triangle"></i>
          <h3>Erro ao carregar aulas</h3>
          <p>Verifique a configuração do Firebase</p>
        </div>
      `;
    }
  }

  // Renderizar aulas
  function renderizarAulasGrid(aulas) {
    const aulasGrid = document.getElementById('aulas-grid');
    const loading = document.getElementById('loading-aulas');

    if (loading) loading.style.display = 'none';

    if (aulas.length === 0) {
      aulasGrid.innerHTML = `
        <div class="aulas-vazio">
          <i class="bi bi-collection-play"></i>
          <h3>Nenhuma aula encontrada</h3>
          <p>As aulas gravadas aparecerão aqui</p>
        </div>
      `;
      return;
    }

    aulasGrid.innerHTML = '';

    aulas.forEach(aula => {
      const card = criarCardAulaElement(aula);
      aulasGrid.appendChild(card);
    });
  }

  // Criar card de aula
  function criarCardAulaElement(aula) {
    const div = document.createElement('div');
    div.className = 'aula-card';

    const nomeMateria = nomesMateriasAulas[aula.materia] || aula.materia;
    const data = formatarDataAula(aula.dataInicio);
    const duracao = aula.duracao ? formatarDuracaoAula(aula.duracao) : '';
    const aguardandoVideo = aula.status === 'aguardando-video';
    const aoVivo = aula.status === 'ao-vivo';

    let thumbnailClass = '';
    let icone = 'bi-play-circle';
    let btnTexto = 'Assistir Aula';
    let btnClass = '';
    let badgeExtra = '';

    if (aoVivo) {
      thumbnailClass = 'ao-vivo';
      icone = 'bi-broadcast';
      btnTexto = 'Entrar ao Vivo';
      btnClass = 'btn-ao-vivo';
      badgeExtra = '<span class="aula-ao-vivo-badge"><span class="dot-ao-vivo"></span> AO VIVO</span>';
    } else if (aguardandoVideo) {
      thumbnailClass = 'processando';
      icone = 'bi-hourglass-split';
      btnTexto = 'Processando...';
      btnClass = 'btn-aguardando';
      badgeExtra = '<span class="aula-processando">Processando vídeo...</span>';
    }

    div.innerHTML = `
      <div class="aula-thumbnail ${thumbnailClass}">
        <i class="bi ${icone} aula-thumbnail-icon"></i>
        <span class="aula-materia-badge materia-${aula.materia}">${nomeMateria}</span>
        ${duracao ? `<span class="aula-duracao">${duracao}</span>` : ''}
        ${badgeExtra}
      </div>
      <div class="aula-card-body">
        <div class="aula-card-materia">
          <i class="bi bi-bookmark-fill"></i>
          ${nomeMateria}
        </div>
        <div class="aula-card-tema">${aula.tema}</div>
        <div class="aula-card-meta">
          <span><i class="bi bi-calendar3"></i> ${data}</span>
          ${duracao ? `<span><i class="bi bi-clock"></i> ${duracao}</span>` : ''}
          ${aoVivo ? '<span class="meta-ao-vivo"><i class="bi bi-broadcast"></i> Ao Vivo</span>' : ''}
        </div>
        <button class="btn-assistir ${btnClass}" ${aguardandoVideo ? 'disabled' : ''}>
          <i class="bi ${aoVivo ? 'bi-broadcast' : (aguardandoVideo ? 'bi-hourglass-split' : 'bi-play-fill')}"></i>
          ${btnTexto}
        </button>
      </div>
    `;

    // Evento do botão
    const btn = div.querySelector('.btn-assistir');
    if (aoVivo) {
      btn.addEventListener('click', () => {
        if (aula.meetLink) window.open(aula.meetLink, '_blank');
      });
    } else if (!aguardandoVideo) {
      btn.addEventListener('click', () => {
        if (aula.videoUrl) window.open(aula.videoUrl, '_blank');
      });
    }

    return div;
  }

  // Verificar aula ao vivo
  async function verificarAulaAoVivoFirebase() {
    try {
      if (typeof aulasRef === 'undefined') return;

      const snapshot = await aulasRef.where('status', '==', 'ao-vivo').limit(1).get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        aulaAoVivo = { id: doc.id, ...doc.data() };
        mostrarBannerAoVivoElement();
      }
    } catch (error) {
      console.error('Erro ao verificar aula ao vivo:', error);
    }

    setTimeout(verificarAulaAoVivoFirebase, 30000);
  }

  // Mostrar banner ao vivo
  function mostrarBannerAoVivoElement() {
    if (!aulaAoVivo) return;

    const bannerAoVivo = document.getElementById('banner-ao-vivo');
    const aoVivoMateria = document.getElementById('ao-vivo-materia');
    const btnAoVivo = document.getElementById('btn-ao-vivo');

    if (!bannerAoVivo) return;

    const nomeMateria = nomesMateriasAulas[aulaAoVivo.materia] || aulaAoVivo.materia;
    aoVivoMateria.textContent = `${nomeMateria} - ${aulaAoVivo.tema}`;
    bannerAoVivo.style.display = 'flex';

    btnAoVivo.onclick = () => {
      if (aulaAoVivo.meetLink) window.open(aulaAoVivo.meetLink, '_blank');
    };
  }

  // Formatar data
  function formatarDataAula(timestamp) {
    if (!timestamp) return '';
    const data = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  // Formatar duração
  function formatarDuracaoAula(minutos) {
    if (!minutos) return '';
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return horas > 0 ? `${horas}h ${mins}min` : `${mins}min`;
  }

  // Filtros
  const filtroMateria = document.getElementById('filtro-materia');
  const filtroMes = document.getElementById('filtro-mes');
  const buscaAulas = document.getElementById('busca-aulas');

  function filtrarAulasGrid() {
    const materia = filtroMateria?.value || '';
    const mes = filtroMes?.value || '';
    const busca = buscaAulas?.value.toLowerCase().trim() || '';

    let aulasFiltradas = todasAulas;

    if (materia) {
      aulasFiltradas = aulasFiltradas.filter(a => a.materia === materia);
    }

    if (mes) {
      aulasFiltradas = aulasFiltradas.filter(a => {
        const dataAula = a.dataInicio?.toDate ? a.dataInicio.toDate() : new Date(a.dataInicio);
        const mesAula = String(dataAula.getMonth() + 1).padStart(2, '0');
        return mesAula === mes;
      });
    }

    if (busca) {
      aulasFiltradas = aulasFiltradas.filter(a =>
        a.tema.toLowerCase().includes(busca) ||
        (nomesMateriasAulas[a.materia] || a.materia).toLowerCase().includes(busca)
      );
    }

    renderizarAulasGrid(aulasFiltradas);
  }

  if (filtroMateria) filtroMateria.addEventListener('change', filtrarAulasGrid);
  if (filtroMes) filtroMes.addEventListener('change', filtrarAulasGrid);
  if (buscaAulas) buscaAulas.addEventListener('input', filtrarAulasGrid);

  // Modal de vídeo
  const modalVideo = document.getElementById('modal-video');
  const fecharVideoBtn = document.getElementById('fechar-video');

  if (fecharVideoBtn) {
    fecharVideoBtn.addEventListener('click', () => {
      modalVideo.classList.remove('show');
      const videoPlayer = document.getElementById('video-player');
      if (videoPlayer) videoPlayer.src = '';
    });
  }

  if (modalVideo) {
    modalVideo.addEventListener('click', (e) => {
      if (e.target === modalVideo) {
        modalVideo.classList.remove('show');
        const videoPlayer = document.getElementById('video-player');
        if (videoPlayer) videoPlayer.src = '';
      }
    });
  }

})();

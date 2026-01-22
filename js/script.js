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

  if (!nome || !materia) return;

  // Esconde estado vazio
  const vazioEl = document.getElementById('todo-vazio');
  if (vazioEl) vazioEl.style.display = 'none';

  // Cria wrapper com sistema de swipe
  const wrapper = document.createElement('div');
  wrapper.className = 'todo-item-wrapper';
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
        <span class="todo-meta"><i class="bi ${icone}"></i> ${nomeMateria}</span>
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

  if (checkbox.checked) {
    todoItem.classList.add('completed');
    checkbox.nextElementSibling.innerHTML = '<i class="bi bi-check"></i>';
  } else {
    todoItem.classList.remove('completed');
    checkbox.nextElementSibling.innerHTML = '';
  }

  salvarTarefas();
  atualizarProgressoTarefas();
}

// Atualizar barra de progresso
function atualizarProgressoTarefas() {
  const total = listaTarefas.querySelectorAll('.todo-item-wrapper').length;
  const completadas = listaTarefas.querySelectorAll('.todo-item.completed').length;
  const porcentagem = total > 0 ? ((completadas / total) * 100).toFixed(0) : 0;

  const progressFill = document.querySelector('.tarefas-diarias .progress-fill');
  const progressText = document.querySelector('.tarefas-diarias .progress-text');
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

    tarefas.push({ texto, meta, icone, completada });
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
  inicializarSidebarToggle();
  inicializarMenuMobile();
  inicializarCalendario();
  inicializarCronometro();
  atualizarContadorENEM();
});

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
  const calendarDays = document.querySelector('.calendario-sidebar .calendar-days');
  if (!calendarDays) return;

  const hoje = new Date();
  const primeiroDia = new Date(calendarioAnoAtual, calendarioMesAtual, 1);
  const ultimoDia = new Date(calendarioAnoAtual, calendarioMesAtual + 1, 0);

  // Dia da semana do primeiro dia (0 = Domingo)
  let diaInicio = primeiroDia.getDay();

  // Total de dias no mês
  const totalDias = ultimoDia.getDate();

  // Dias do mês anterior para preencher
  const mesAnterior = new Date(calendarioAnoAtual, calendarioMesAtual, 0);
  const diasMesAnterior = mesAnterior.getDate();

  let html = '';

  // Dias do mês anterior
  for (let i = diaInicio - 1; i >= 0; i--) {
    const dia = diasMesAnterior - i;
    html += `<span class="other-month">${dia}</span>`;
  }

  // Dias do mês atual
  for (let dia = 1; dia <= totalDias; dia++) {
    const dataStr = formatarData(calendarioAnoAtual, calendarioMesAtual, dia);
    const isHoje = (dia === hoje.getDate() &&
                    calendarioMesAtual === hoje.getMonth() &&
                    calendarioAnoAtual === hoje.getFullYear());

    let classes = [];
    if (isHoje) classes.push('today');

    // Verificar se tem evento
    if (eventosCalendario[dataStr]) {
      classes.push('has-event');
      // Verificar tipo do evento
      const tipoEvento = eventosCalendario[dataStr].tipo || 'evento';
      classes.push(tipoEvento);
    }

    html += `<span class="${classes.join(' ')}" data-dia="${dia}" data-data="${dataStr}" onclick="abrirModalEvento('${dataStr}', ${dia})">${dia}</span>`;
  }

  // Dias do próximo mês para completar
  const diasRestantes = 42 - (diaInicio + totalDias); // 6 semanas * 7 dias = 42
  for (let i = 1; i <= diasRestantes; i++) {
    html += `<span class="other-month">${i}</span>`;
  }

  calendarDays.innerHTML = html;
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

  if (confirm('Tem certeza que deseja excluir este evento?')) {
    delete eventosCalendario[diaSelecionado];
    salvarEventos();
    renderizarCalendario();
    fecharModalEvento();
  }
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
  if (!confirm('Tem certeza que deseja zerar o tempo de estudo de hoje?')) {
    return;
  }

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
// CONTADOR DIAS PARA O ENEM
// ============================================

function atualizarContadorENEM() {
  const elementoDias = document.getElementById('dias-enem');
  if (!elementoDias) return;

  // Data do ENEM 2026 (primeiro domingo de novembro)
  const enemData = new Date(2026, 10, 1); // Novembro = 10 (mês base 0)
  // Ajustar para o primeiro domingo
  while (enemData.getDay() !== 0) {
    enemData.setDate(enemData.getDate() + 1);
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const diffTime = enemData - hoje;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  elementoDias.textContent = diffDays;
}

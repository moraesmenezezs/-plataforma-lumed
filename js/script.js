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
if (btnAdicionar) btnAdicionar.addEventListener('click', () => {
  modal.classList.add('ativo');
  resetarModal();
});

// Fechar modal
if (btnFechar) btnFechar.addEventListener('click', fecharModal);
if (btnCancelar) btnCancelar.addEventListener('click', fecharModal);

// Fechar ao clicar fora
if (modal) modal.addEventListener('click', (e) => {
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
  const bannerQuestoes = document.getElementById('stat-questoes');

  if (bannerQuestoes && !bannerQuestoes.classList.contains('editing')) {
    bannerQuestoes.textContent = questoesData.total;
  }
}

// Atualizar banner com total de simulados
function atualizarBannerSimulados() {
  const simuladosData = JSON.parse(localStorage.getItem('lumed_simulados')) || { total: 0 };
  const bannerSimulados = document.getElementById('stat-simulados');

  if (bannerSimulados && !bannerSimulados.classList.contains('editing')) {
    bannerSimulados.textContent = simuladosData.total;
  }
}

// Stats editáveis (questões e simulados)
function inicializarStatsEditaveis() {
  const statQuestoes = document.getElementById('stat-questoes');
  const statSimulados = document.getElementById('stat-simulados');

  function criarInputEditar(el, storageKey) {
    el.addEventListener('click', function() {
      if (el.classList.contains('editing')) return;
      el.classList.add('editing');

      const valorAtual = parseInt(el.textContent) || 0;
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'stat-edit-input';
      input.value = valorAtual;
      input.min = 0;

      el.textContent = '';
      el.appendChild(input);
      input.focus();
      input.select();

      function salvar() {
        const novoValor = Math.max(0, parseInt(input.value) || 0);
        el.classList.remove('editing');
        el.textContent = novoValor;

        if (storageKey === 'lumed_questoes') {
          const data = JSON.parse(localStorage.getItem(storageKey)) || { total: 0, historico: [] };
          data.total = novoValor;
          localStorage.setItem(storageKey, JSON.stringify(data));
        } else {
          localStorage.setItem(storageKey, JSON.stringify({ total: novoValor }));
        }
      }

      input.addEventListener('blur', salvar);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { input.blur(); }
        if (e.key === 'Escape') {
          el.classList.remove('editing');
          el.textContent = valorAtual;
        }
      });
    });
  }

  if (statQuestoes) criarInputEditar(statQuestoes, 'lumed_questoes');
  if (statSimulados) criarInputEditar(statSimulados, 'lumed_simulados');
}

// ============================================
// MINI CRONOGRAMA (card alternável)
// ============================================
// Dia selecionado no cronograma (0=Seg..6=Dom)
let _cronoDiaSelecionado = (new Date().getDay() + 6) % 7;

function inicializarCronogramaPanel() {
  _cronoDiaSelecionado = (new Date().getDay() + 6) % 7;
  renderizarCronogramaDiasNav();
  renderizarCronogramaDia(_cronoDiaSelecionado);
}

function selecionarDiaCrono(diaIndex) {
  _cronoDiaSelecionado = diaIndex;
  renderizarCronogramaDiasNav();
  renderizarCronogramaDia(diaIndex);
}

function renderizarCronogramaDiasNav() {
  const nav = document.getElementById('cronograma-dias-nav');
  if (!nav) return;

  const letras = ['S','T','Q','Q','S','S','D'];
  const nomes = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const hoje = (new Date().getDay() + 6) % 7;
  const diasSemana = obterDiasDaSemana();
  const checks = carregarCronoCheck();

  let html = '';
  for (let i = 0; i < 7; i++) {
    const dateStr = formatarDataISO(diasSemana[i]);
    const prog = calcularProgressoDia(dateStr, i);
    const isCompleto = prog.total > 0 && prog.done === prog.total;

    let cls = 'crono-dia-btn';
    if (i === _cronoDiaSelecionado) cls += ' active';
    if (i === hoje) cls += ' hoje';
    if (isCompleto) cls += ' completo';

    html += `<button class="${cls}" onclick="selecionarDiaCrono(${i})" title="${nomes[i]}">`;
    html += `<span class="crono-dia-letra">${letras[i]}</span>`;
    if (i === hoje) html += '<span class="crono-dia-dot"></span>';
    if (isCompleto) html += '<span class="crono-dia-check"><i class="bi bi-check"></i></span>';
    html += '</button>';
  }
  nav.innerHTML = html;
}

function renderizarCronogramaDia(diaIndex) {
  const container = document.getElementById('cronograma-lista');
  if (!container) return;

  const tipoConfig = {
    teoria:       { label: 'Teoria',    cls: 'tipo-teoria',      icon: 'bi-book' },
    questoes:     { label: 'Questões',  cls: 'tipo-questoes',    icon: 'bi-pencil' },
    'anki-t':     { label: 'Anki T',    cls: 'tipo-anki-t',      icon: 'bi-stack' },
    'anki-r':     { label: 'Anki R',    cls: 'tipo-anki-r',      icon: 'bi-arrow-repeat' },
    descanso:     { label: 'Descanso',  cls: 'tipo-descanso',    icon: 'bi-cup-hot' },
    casa:         { label: 'Casa',      cls: 'tipo-casa',        icon: 'bi-house' },
    academia:     { label: 'Academia',  cls: 'tipo-academia',    icon: 'bi-activity' },
    'cafe-manha': { label: 'Café',      cls: 'tipo-cafe-manha',  icon: 'bi-cup' },
    almoco:       { label: 'Almoço',    cls: 'tipo-almoco',      icon: 'bi-egg-fried' },
    'cafe-tarde': { label: 'Lanche',    cls: 'tipo-cafe-tarde',  icon: 'bi-cup-straw' }
  };

  let cronoData;
  try {
    const raw = localStorage.getItem('cronogramaData');
    cronoData = raw ? JSON.parse(raw) : null;
  } catch(e) { cronoData = null; }

  if (!cronoData || !cronoData.cells || Object.keys(cronoData.cells).length === 0) {
    container.innerHTML = '<div class="crono-lista-vazio"><i class="bi bi-calendar-x"></i><p>Cronograma vazio</p><span>Preencha na aba Cronograma</span></div>';
    return;
  }

  const checks = carregarCronoCheck();
  const diasSemana = obterDiasDaSemana();
  const dateStr = formatarDataISO(diasSemana[diaIndex]);

  let html = '';
  let temItens = false;

  cronoData.horarios.forEach(horario => {
    let items = cronoData.cells[`${diaIndex}-${horario}`];
    if (!items) return;
    if (!Array.isArray(items)) items = [items];
    if (items.length === 0) return;

    items.forEach(item => {
      if (!item || !item.tipo) return;
      temItens = true;
      const cfg = tipoConfig[item.tipo] || { label: item.tipo, cls: '', icon: 'bi-circle' };
      const isEstudo = TIPOS_ESTUDO.includes(item.tipo);
      const cellKey = `${diaIndex}-${horario}`;
      const isChecked = checks[dateStr] && checks[dateStr][cellKey];

      let cls = 'crono-item';
      if (isChecked) cls += ' checked';
      if (!isEstudo) cls += ' nao-estudo';

      html += `<div class="${cls}"`;
      if (isEstudo) html += ` onclick="toggleCronoCheck('${dateStr}','${cellKey}')"`;
      html += '>';
      html += `<div class="crono-item-hora">${horario}</div>`;
      html += '<div class="crono-item-info">';
      html += `<span class="crono-item-badge ${cfg.cls}"><i class="bi ${cfg.icon}"></i> ${cfg.label}</span>`;
      if (item.materia) html += `<span class="crono-item-materia">${item.materia}</span>`;
      html += '</div>';
      if (isEstudo) {
        html += '<div class="crono-item-check">';
        html += isChecked ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-circle"></i>';
        html += '</div>';
      }
      html += '</div>';
    });
  });

  if (!temItens) {
    html = '<div class="crono-lista-vazio"><i class="bi bi-moon-stars"></i><p>Dia livre!</p><span>Nenhuma atividade programada</span></div>';
  }

  container.innerHTML = html;
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
  if (!listaTarefas) return;
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
  registrarLoginDia();
  atualizarBannerQuestoes();
  atualizarBannerSimulados();
  inicializarStatsEditaveis();
  inicializarCronogramaPanel();
  limparCronoCheckAntigo();
  renderizarMinhaSemana(true);
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
      case 'redacao':
        navElement = document.getElementById('nav-redacao');
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
let cronometroRodando = false;

function inicializarCronometro() {
  const btnEstudar = document.getElementById('btn-estudar');
  const btnZerarDia = document.getElementById('btn-zerar-dia');

  if (!btnEstudar) return;

  // Verificar se o cronômetro estava rodando antes do refresh
  const estado = JSON.parse(localStorage.getItem('lumed_crono_estado') || '{}');
  if (estado.rodando && estado.inicio) {
    // Resumir cronômetro automaticamente
    cronometroRodando = true;
    atualizarBotaoCronometro(true);
    cronometroInterval = setInterval(() => {
      atualizarExibicaoTempo();
    }, 1000);
  }

  // Botão Estudar (play/pause)
  btnEstudar.addEventListener('click', toggleCronometro);

  // Botão Zerar Dia
  if (btnZerarDia) {
    btnZerarDia.addEventListener('click', zerarTempoDia);
  }

  // Salvar ao sair/minimizar
  window.addEventListener('beforeunload', () => {
    if (cronometroRodando) salvarTempoEstudoAtual();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && cronometroRodando) salvarTempoEstudoAtual();
  });

  // Atualizar exibição
  atualizarExibicaoTempo();
}

function atualizarBotaoCronometro(rodando) {
  const btnEstudar = document.getElementById('btn-estudar');
  const icone = document.getElementById('icone-estudar');
  const texto = document.getElementById('texto-estudar');

  if (rodando) {
    if (btnEstudar) btnEstudar.classList.add('estudando');
    if (icone) icone.className = 'bi bi-pause-fill';
    if (texto) texto.textContent = 'Pausar';
  } else {
    if (btnEstudar) btnEstudar.classList.remove('estudando');
    if (icone) icone.className = 'bi bi-play-fill';
    if (texto) texto.textContent = 'Continuar estudando';
  }
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
  atualizarBotaoCronometro(true);

  // Salvar timestamp de início no localStorage
  const estado = { rodando: true, inicio: Date.now() };
  localStorage.setItem('lumed_crono_estado', JSON.stringify(estado));

  // Atualizar display a cada segundo
  cronometroInterval = setInterval(() => {
    atualizarExibicaoTempo();
  }, 1000);
}

function pausarCronometro() {
  if (!cronometroRodando) return;

  cronometroRodando = false;
  atualizarBotaoCronometro(false);
  clearInterval(cronometroInterval);

  // Calcular tempo decorrido e salvar
  salvarTempoEstudoAtual();

  // Limpar estado
  localStorage.setItem('lumed_crono_estado', JSON.stringify({ rodando: false }));
}

function salvarTempoEstudoAtual() {
  const estado = JSON.parse(localStorage.getItem('lumed_crono_estado') || '{}');
  if (!estado.inicio) return;

  const elapsed = Math.floor((Date.now() - estado.inicio) / 1000);
  if (elapsed <= 0) return;

  const hoje = obterDataHoje();
  const tempos = obterTemposEstudo();
  tempos[hoje] = (tempos[hoje] || 0) + elapsed;
  localStorage.setItem('lumed_tempos_estudo', JSON.stringify(tempos));

  // Resetar início para agora (evita contar tempo duplicado)
  estado.inicio = Date.now();
  localStorage.setItem('lumed_crono_estado', JSON.stringify(estado));
}

function zerarTempoDia() {
  mostrarConfirmacao('Zerar tempo', 'Tem certeza que deseja zerar o tempo de estudo de hoje?', () => {
    // Pausar cronômetro
    if (cronometroRodando) {
      pausarCronometro();
    }

    // Zerar tempo de hoje no localStorage
    const hoje = obterDataHoje();
    const tempos = obterTemposEstudo();
    tempos[hoje] = 0;
    localStorage.setItem('lumed_tempos_estudo', JSON.stringify(tempos));

    // Limpar estado
    localStorage.setItem('lumed_crono_estado', JSON.stringify({ rodando: false }));

    // Atualizar exibição
    atualizarExibicaoTempo();
  });
}

function formatarHoras(segundos) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  if (h === 0 && m === 0) {
    return `${segundos}s`;
  }
  if (h === 0) {
    return `${m}min`;
  }
  return `${h}h${String(m).padStart(2, '0')}`;
}

function obterDataHoje() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
}

function obterTemposEstudo() {
  const dados = localStorage.getItem('lumed_tempos_estudo');
  return dados ? JSON.parse(dados) : {};
}

function atualizarExibicaoTempo() {
  const tempos = obterTemposEstudo();
  const hoje = obterDataHoje();
  const tempoSalvo = tempos[hoje] || 0;

  // Se está rodando, somar o tempo desde o último início
  let tempoAtual = 0;
  if (cronometroRodando) {
    const estado = JSON.parse(localStorage.getItem('lumed_crono_estado') || '{}');
    if (estado.inicio) {
      tempoAtual = Math.floor((Date.now() - estado.inicio) / 1000);
    }
  }

  const tempoTotal = tempoSalvo + tempoAtual;

  const displayHoje = document.getElementById('tempo-hoje');
  if (displayHoje) {
    displayHoje.textContent = formatarHoras(tempoTotal);
  }

  // Atualizar minha semana também
  renderizarMinhaSemana();
}

// ============================================
// MINHA SEMANA - Tracker Semanal
// ============================================
const CRONO_CHECK_KEY = 'lumed_crono_check';
const TIPOS_ESTUDO = ['teoria', 'questoes', 'anki-t', 'anki-r'];

// Helpers de data
function obterSegundaSemana(data) {
  const d = new Date(data);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function obterDiasDaSemana() {
  const segunda = obterSegundaSemana(new Date());
  const dias = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(segunda);
    d.setDate(d.getDate() + i);
    dias.push(d);
  }
  return dias;
}

function formatarDataISO(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

// CRUD crono check
function carregarCronoCheck() {
  try {
    return JSON.parse(localStorage.getItem(CRONO_CHECK_KEY)) || {};
  } catch(e) { return {}; }
}

function salvarCronoCheck(dados) {
  localStorage.setItem(CRONO_CHECK_KEY, JSON.stringify(dados));
}

function toggleCronoCheck(dateStr, cellKey) {
  const dados = carregarCronoCheck();
  if (!dados[dateStr]) dados[dateStr] = {};
  dados[dateStr][cellKey] = !dados[dateStr][cellKey];
  if (!dados[dateStr][cellKey]) delete dados[dateStr][cellKey];
  if (Object.keys(dados[dateStr]).length === 0) delete dados[dateStr];
  salvarCronoCheck(dados);
  renderizarMinhaSemana(true);
  renderizarCronogramaDiasNav();
  renderizarCronogramaDia(_cronoDiaSelecionado);
}

// Obter itens de estudo do cronograma para um dia (diaIndex 0=Seg..6=Dom)
function obterItensCronogramaDia(diaIndex) {
  let cronoData;
  try {
    const raw = localStorage.getItem('cronogramaData');
    cronoData = raw ? JSON.parse(raw) : null;
  } catch(e) { return []; }
  if (!cronoData || !cronoData.cells || !cronoData.horarios) return [];

  const itens = [];
  cronoData.horarios.forEach(horario => {
    const key = `${diaIndex}-${horario}`;
    let items = cronoData.cells[key];
    if (!items) return;
    if (!Array.isArray(items)) items = [items];
    items.forEach(item => {
      if (TIPOS_ESTUDO.includes(item.tipo)) {
        itens.push({ cellKey: key, tipo: item.tipo, materia: item.materia || '' });
      }
    });
  });
  return itens;
}

// Calcular progresso de rotina para um dia
function calcularProgressoDia(dateStr, diaIndex) {
  const itens = obterItensCronogramaDia(diaIndex);
  if (itens.length === 0) return { total: 0, done: 0, percent: 0 };

  const checks = carregarCronoCheck();
  const diaChecks = checks[dateStr] || {};
  let done = 0;
  itens.forEach(item => {
    if (diaChecks[item.cellKey]) done++;
  });
  return { total: itens.length, done, percent: itens.length > 0 ? Math.round((done / itens.length) * 100) : 0 };
}

// Limpar dados de crono check > 4 semanas
function limparCronoCheckAntigo() {
  const dados = carregarCronoCheck();
  const limite = new Date();
  limite.setDate(limite.getDate() - 28);
  const limiteStr = formatarDataISO(limite);
  let changed = false;
  for (const dateStr in dados) {
    if (dateStr < limiteStr) {
      delete dados[dateStr];
      changed = true;
    }
  }
  if (changed) salvarCronoCheck(dados);
}

// Renderizar Minha Semana
let _ultimaRenderSemana = 0;
function renderizarMinhaSemana(forcar) {
  const agora = Date.now();
  if (!forcar && agora - _ultimaRenderSemana < 30000) return;
  _ultimaRenderSemana = agora;

  const container = document.getElementById('minha-semana-grid');
  if (!container) return;

  const tempos = obterTemposEstudo();
  const hoje = new Date();
  const hojeStr = formatarDataISO(hoje);
  const metaData = JSON.parse(localStorage.getItem('lumed_meta_horas') || '{}');
  const META_SEGUNDOS = (metaData.horas || 5) * 3600;
  const DIAS_LABEL = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  // Meta display
  const metaDisplay = document.getElementById('meta-diaria-display');
  if (metaDisplay) metaDisplay.textContent = (metaData.horas || 5) + 'h';

  const diasSemana = obterDiasDaSemana();

  const R = 18;
  const CIRC = 2 * Math.PI * R;

  container.innerHTML = diasSemana.map((data, i) => {
    const dateStr = formatarDataISO(data);
    const ehHoje = dateStr === hojeStr;
    const ehFuturo = data > hoje && !ehHoje;

    // Tempo de estudo
    let seg = tempos[dateStr] || 0;
    if (ehHoje) {
      try {
        const estado = JSON.parse(localStorage.getItem('lumed_crono_estado') || '{}');
        if (estado && estado.rodando && estado.inicio) {
          seg += Math.floor((Date.now() - estado.inicio) / 1000);
        }
      } catch(e) {}
    }

    const pctTempo = Math.min(seg / META_SEGUNDOS, 1);
    const offset = CIRC * (1 - pctTempo);
    const metaOk = seg >= META_SEGUNDOS;

    // Formatar valor de tempo
    let valor;
    const h = Math.floor(seg / 3600);
    const m = Math.floor((seg % 3600) / 60);
    if (h > 0) valor = `${h}h${String(m).padStart(2, '0')}`;
    else if (m > 0) valor = `${m}m`;
    else valor = '–';

    // Progresso rotina (crono check)
    const progresso = calcularProgressoDia(dateStr, i);
    const rotinaCompleta = progresso.total > 0 && progresso.done === progresso.total;

    // Status icon
    let statusIcon = '';
    if (ehFuturo) {
      statusIcon = '<i class="bi bi-lock-fill semana-status-icon futuro"></i>';
    } else if (rotinaCompleta && metaOk) {
      statusIcon = '<i class="bi bi-check-circle-fill semana-status-icon completo"></i>';
    } else if (progresso.done > 0 || seg > 0) {
      statusIcon = '<i class="bi bi-circle-half semana-status-icon parcial"></i>';
    }

    // Card classes
    let cardClass = 'semana-card';
    if (ehHoje) cardClass += ' semana-card-hoje';
    if (rotinaCompleta && metaOk && !ehFuturo) cardClass += ' semana-card-completo';
    if (ehFuturo) cardClass += ' semana-card-futuro';

    // Rotina bar
    let rotinaHtml = '';
    if (progresso.total > 0) {
      rotinaHtml = `
        <div class="semana-rotina">
          <div class="semana-rotina-bar">
            <div class="semana-rotina-fill" style="width: ${progresso.percent}%"></div>
          </div>
          <span class="semana-rotina-text">${progresso.done}/${progresso.total}</span>
        </div>`;
    } else if (!ehFuturo) {
      rotinaHtml = `<div class="semana-rotina"><span class="semana-rotina-text sem-rotina">Sem rotina</span></div>`;
    }

    return `<div class="${cardClass}">
      <div class="semana-card-top">
        <span class="semana-card-dia">${DIAS_LABEL[i]}</span>
        ${ehHoje ? '<span class="semana-badge-hoje">Hoje</span>' : ''}
        ${statusIcon}
      </div>
      <div class="semana-card-circle">
        <svg viewBox="0 0 44 44">
          <circle class="circle-bg" cx="22" cy="22" r="${R}"/>
          <circle class="circle-fill${metaOk ? ' meta-atingida' : ''}" cx="22" cy="22" r="${R}" stroke-dasharray="${CIRC}" stroke-dashoffset="${offset}"/>
        </svg>
        <span class="semana-card-valor${metaOk ? ' meta-atingida' : ''}">${valor}</span>
      </div>
      ${rotinaHtml}
    </div>`;
  }).join('');
}

// ============================================
// CONTADOR DIAS PARA VESTIBULARES
// ============================================

// Datas dos vestibulares 2026
const datasVestibulares = {
  enem: { data: new Date(2026, 10, 1), nome: 'ENEM 2026', ajustarDomingo: true }, // 1º domingo de novembro
  ufrr: { data: new Date(2026, 10, 29), nome: 'UFRR 2026', ajustarDomingo: false }, // 29 de novembro
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

function formatarSemanasEDias(totalDias) {
  const semanas = Math.floor(totalDias / 7);
  const dias = totalDias % 7;
  if (semanas === 0) return `${dias} dia${dias !== 1 ? 's' : ''}`;
  if (dias === 0) return `${semanas} semana${semanas !== 1 ? 's' : ''}`;
  return `${semanas} semana${semanas !== 1 ? 's' : ''} e ${dias} dia${dias !== 1 ? 's' : ''}`;
}

function atualizarContadorENEM() {
  const elementoDias = document.getElementById('dias-enem');
  if (!elementoDias) return;

  const dias = calcularDiasRestantes(datasVestibulares.enem.data, datasVestibulares.enem.ajustarDomingo);
  elementoDias.textContent = formatarSemanasEDias(dias);
}

function registrarLoginDia() {
  const hoje = new Date();
  const hojeStr = hoje.toISOString().split('T')[0];

  let dias = JSON.parse(localStorage.getItem('lumed_logins') || '[]');

  // Registrar hoje se ainda não registrou
  if (!dias.includes(hojeStr)) {
    dias.push(hojeStr);
  }

  localStorage.setItem('lumed_logins', JSON.stringify(dias));

  // Atualizar UI
  const el = document.getElementById('dias-semana-login');
  const labelEl = document.getElementById('dias-semana-label');
  if (el) el.textContent = dias.length;
  if (labelEl) labelEl.textContent = dias.length === 1 ? 'dia' : 'dias';

  // Atualizar foguinho na navbar
  atualizarStreakFire(dias.length);
}

function atualizarStreakFire(totalDias) {
  const fire = document.getElementById('streak-fire');
  const count = document.getElementById('streak-fire-count');
  if (!fire) return;

  if (count) count.textContent = totalDias;

  // Determinar nível do fogo
  let nivel;
  if (totalDias <= 5) nivel = 1;
  else if (totalDias <= 15) nivel = 2;
  else if (totalDias <= 30) nivel = 3;
  else if (totalDias <= 60) nivel = 4;
  else nivel = 5;

  // Remover níveis anteriores e aplicar novo
  fire.className = `streak-fire fire-level-${nivel}`;
  fire.title = `${totalDias} dia${totalDias !== 1 ? 's' : ''} na plataforma`;
}

function atualizarRadarVestibulares() {
  const listaVestibulares = document.getElementById('lista-vestibulares');
  if (!listaVestibulares) return;

  // Calcula os dias e ordena do mais perto ao mais distante
  const logoClasses = { enem: 'enem', ufrr: 'ufrr', uea: 'uea', psi: 'psi' };
  const logoTexts = { enem: 'ENEM', ufrr: 'UFRR', uea: 'UEA', psi: 'PSI' };

  const lista = Object.entries(datasVestibulares).map(([key, v]) => ({
    key,
    nome: v.nome,
    dias: calcularDiasRestantes(v.data, v.ajustarDomingo)
  })).sort((a, b) => a.dias - b.dias);

  listaVestibulares.innerHTML = lista.map(v => `
    <div class="vestibular-mini">
      <div class="vestibular-logo-mini ${logoClasses[v.key]}">${logoTexts[v.key]}</div>
      <div class="vestibular-info-mini">
        <span class="vestibular-nome-mini">${v.nome}</span>
        <span class="vestibular-dias">${formatarSemanasEDias(v.dias)}</span>
      </div>
    </div>
  `).join('');
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
            'redacao': 'nav-redacao'
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

// ========== CRONOGRAMA SEMANAL ==========
(function() {
  const plannerSection = document.getElementById('planner-section');
  const mainContent = document.querySelector('.main-content');
  const navPlanner = document.getElementById('nav-planner');
  const navPainel = document.getElementById('nav-painel');
  const gridBody = document.getElementById('grid-body');

  if (!plannerSection || !navPlanner) return;

  // Dados do cronograma
  const STORAGE_KEY = 'cronogramaData';
  const defaultHorarios = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'];

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { horarios: [...defaultHorarios], cells: {} };
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cronoData));
  }

  let cronoData = loadData();

  // Tipos
  const tipoConfig = {
    teoria:       { label: 'Teoria',         cls: 'tipo-teoria' },
    questoes:     { label: 'Questões',       cls: 'tipo-questoes' },
    'anki-t':     { label: 'Anki T',         cls: 'tipo-anki-t' },
    'anki-r':     { label: 'Anki R',         cls: 'tipo-anki-r' },
    descanso:     { label: 'Descanso',       cls: 'tipo-descanso' },
    casa:         { label: 'Casa',           cls: 'tipo-casa' },
    academia:     { label: 'Academia',       cls: 'tipo-academia' },
    'cafe-manha': { label: 'Café da manhã',  cls: 'tipo-cafe-manha' },
    almoco:       { label: 'Almoço',         cls: 'tipo-almoco' },
    'cafe-tarde': { label: 'Café da tarde',  cls: 'tipo-cafe-tarde' }
  };

  // Migrar dados antigos (objeto único → array)
  function migrarCells() {
    let changed = false;
    for (const key in cronoData.cells) {
      const val = cronoData.cells[key];
      if (val && !Array.isArray(val)) {
        // Migrar 'anki' antigo para 'anki-t'
        if (val.tipo === 'anki') val.tipo = 'anki-t';
        cronoData.cells[key] = [val];
        changed = true;
      }
    }
    if (changed) saveData();
  }

  // Gerar grid
  function gerarGrid() {
    if (!gridBody) return;
    gridBody.innerHTML = '';

    cronoData.horarios.forEach((horario, ri) => {
      const row = document.createElement('div');
      row.className = 'grid-row';

      // Horario editavel
      const timeCell = document.createElement('div');
      timeCell.className = 'grid-time';

      const input = document.createElement('input');
      input.value = horario;
      input.addEventListener('change', () => {
        cronoData.horarios[ri] = input.value;
        saveData();
      });
      timeCell.appendChild(input);

      // Botao deletar linha
      const delBtn = document.createElement('button');
      delBtn.className = 'btn-del-row';
      delBtn.innerHTML = '<i class="bi bi-x"></i>';
      delBtn.title = 'Apagar linha';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Apagar este horário?')) {
          // Remover celulas deste horario
          for (let d = 0; d < 7; d++) {
            delete cronoData.cells[`${d}-${horario}`];
          }
          cronoData.horarios.splice(ri, 1);
          saveData();
          gerarGrid();
        }
      });
      timeCell.appendChild(delBtn);
      row.appendChild(timeCell);

      // 7 dias (Seg=0 a Dom=6)
      for (let dia = 0; dia < 7; dia++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        const key = `${dia}-${horario}`;
        const items = cronoData.cells[key]; // array de itens

        if (items && Array.isArray(items) && items.length > 0) {
          cell.classList.add('filled');

          items.forEach(data => {
            const tc = tipoConfig[data.tipo] || tipoConfig.teoria;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cell-item';

            const badge = document.createElement('span');
            badge.className = 'cell-tipo ' + tc.cls;
            badge.textContent = tc.label;
            itemDiv.appendChild(badge);

            if (data.materia) {
              const mat = document.createElement('span');
              mat.className = 'cell-materia';
              mat.textContent = data.materia;
              mat.title = data.materia;
              itemDiv.appendChild(mat);
            }

            cell.appendChild(itemDiv);
          });
        } else {
          const ph = document.createElement('span');
          ph.className = 'cell-placeholder';
          ph.textContent = '+';
          cell.appendChild(ph);
        }

        cell.addEventListener('click', () => abrirModal(key, items));
        row.appendChild(cell);
      }

      gridBody.appendChild(row);
    });
  }

  // ===== Modal editar =====
  const modal = document.getElementById('crono-modal');
  const modalTitle = document.getElementById('crono-modal-title');
  const inputMateria = document.getElementById('crono-materia');
  const inputTopico = document.getElementById('crono-topico');
  const tiposBtns = document.querySelectorAll('#crono-tipos .crono-tipo-btn');
  const btnSalvar = document.getElementById('crono-btn-salvar');
  const btnLimparCell = document.getElementById('crono-btn-limpar');
  const btnClose = document.getElementById('crono-modal-close');

  let currentKey = null;
  let currentTipo = 'teoria';

  function abrirModal(key, items) {
    currentKey = key;
    currentTipo = 'teoria';
    inputMateria.value = '';
    inputTopico.value = '';

    // Reset tipos
    tiposBtns.forEach(b => b.classList.remove('selected'));
    tiposBtns[0].classList.add('selected');

    const dias = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
    const parts = key.split('-');
    modalTitle.textContent = dias[parseInt(parts[0])] + ' ' + parts[1];

    modal.style.display = 'flex';
    inputMateria.focus();
  }

  function fecharModal() {
    modal.style.display = 'none';
    currentKey = null;
  }

  tiposBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTipo = btn.dataset.tipo;
      tiposBtns.forEach(b => b.classList.toggle('selected', b === btn));
    });
  });

  btnSalvar.addEventListener('click', () => {
    if (currentKey) {
      if (!cronoData.cells[currentKey] || !Array.isArray(cronoData.cells[currentKey])) {
        cronoData.cells[currentKey] = [];
      }
      cronoData.cells[currentKey].push({
        tipo: currentTipo,
        materia: inputMateria.value.trim(),
        topico: inputTopico.value.trim()
      });
      saveData();
      gerarGrid();
    }
    fecharModal();
  });

  btnLimparCell.addEventListener('click', () => {
    if (currentKey && cronoData.cells[currentKey]) {
      // Se tem múltiplos, remove o último; se tem 1, apaga tudo
      if (Array.isArray(cronoData.cells[currentKey]) && cronoData.cells[currentKey].length > 1) {
        cronoData.cells[currentKey].pop();
      } else {
        delete cronoData.cells[currentKey];
      }
      saveData();
      gerarGrid();
    }
    fecharModal();
  });

  btnClose.addEventListener('click', fecharModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Enter para salvar
  inputTopico.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnSalvar.click();
  });

  // ===== Modal adicionar horario =====
  const modalHora = document.getElementById('crono-modal-hora');
  const inputHora = document.getElementById('crono-novo-horario');
  const btnHoraSalvar = document.getElementById('crono-hora-salvar');
  const btnHoraCancelar = document.getElementById('crono-hora-cancelar');
  const btnHoraClose = document.getElementById('crono-modal-hora-close');
  const btnAddHorario = document.getElementById('btn-add-horario');

  if (btnAddHorario) {
    btnAddHorario.addEventListener('click', () => {
      inputHora.value = '';
      modalHora.style.display = 'flex';
      inputHora.focus();
    });
  }

  function fecharModalHora() { modalHora.style.display = 'none'; }

  btnHoraSalvar.addEventListener('click', () => {
    const v = inputHora.value.trim();
    if (v) {
      cronoData.horarios.push(v);
      saveData();
      gerarGrid();
    }
    fecharModalHora();
  });

  btnHoraCancelar.addEventListener('click', fecharModalHora);
  btnHoraClose.addEventListener('click', fecharModalHora);
  modalHora.addEventListener('click', (e) => {
    if (e.target === modalHora) fecharModalHora();
  });
  inputHora.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnHoraSalvar.click();
  });

  // ===== Limpar tudo =====
  const btnLimpar = document.getElementById('btn-limpar-grade');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      mostrarConfirmacao('Limpar cronograma', 'Deseja limpar todo o cronograma?', () => {
        cronoData = { horarios: [...defaultHorarios], cells: {} };
        saveData();
        gerarGrid();
      });
    });
  }

  // ===== Navegacao =====
  navPlanner.addEventListener('click', () => {
    mainContent.style.display = 'none';
    const timerSec = document.getElementById('timer-section');
    if (timerSec) timerSec.style.display = 'none';
    const redSec = document.getElementById('redacao-section');
    if (redSec) redSec.style.display = 'none';
    plannerSection.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navPlanner.classList.add('active');

    migrarCells();
    gerarGrid();
  });

  if (navPainel) {
    navPainel.addEventListener('click', () => {
      plannerSection.style.display = 'none';
      const timerSec = document.getElementById('timer-section');
      if (timerSec) timerSec.style.display = 'none';
      mainContent.style.display = 'block';

      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      navPainel.classList.add('active');
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
      tempoEstudoElement.textContent = formatarHoras(seconds);
    }
    // Atualizar minha semana
    renderizarMinhaSemana();
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


// ============================================
// Kumon Digital - Lógica da Tela de Treino
// ============================================

let estadoTreino = {
  nivelId: null,
  config: null,
  questoes: [],
  questaoAtual: 0,
  acertos: 0,
  erros: 0,
  tempoInicio: null,
  tempoRestante: 0,
  timerInterval: null,
  respostas: []
};

// Inicializar treino
document.addEventListener('DOMContentLoaded', () => {
  const nivelId = sessionStorage.getItem('kumon_nivel_treino');

  if (!nivelId) {
    alert('Nenhum nível selecionado. Voltando ao dashboard...');
    window.location.href = 'index.html';
    return;
  }

  const config = window.kumonQuestoes.getNivelConfig(nivelId);
  if (!config) {
    alert('Nível não encontrado. Voltando ao dashboard...');
    window.location.href = 'index.html';
    return;
  }

  // Obter sublível atual do usuário
  const usuario = window.kumonStorage.getUsuario();
  const sublivel = usuario.nivelAtual.sublivel || 'basico';

  // Gerar questões
  const questoes = window.kumonQuestoes.gerar(nivelId, sublivel);

  // Configurar estado
  estadoTreino = {
    nivelId,
    config,
    questoes,
    questaoAtual: 0,
    acertos: 0,
    erros: 0,
    tempoInicio: Date.now(),
    tempoRestante: config.tempoLimite,
    timerInterval: null,
    respostas: [],
    sublivel
  };

  // Inicializar UI
  renderizarHeader();
  renderizarDicas();
  renderizarQuestao();
  iniciarTimer();

  // Configurar eventos
  configurarEventos();
});

// Verificar se a questão atual precisa de input de fração
function questaoEhFracao() {
  const { questoes, questaoAtual } = estadoTreino;
  const questao = questoes[questaoAtual];
  return questao && questao.tipoResposta === 'fracao';
}

// Obter a resposta do usuário (normal ou fração)
function obterResposta() {
  if (questaoEhFracao()) {
    const num = document.getElementById('fracao-numerador').value.trim();
    const den = document.getElementById('fracao-denominador').value.trim();
    if (!num || !den) return '';
    return `${num}/${den}`;
  }
  return document.getElementById('resposta-input').value.trim();
}

// Focar no input correto
function focarInput() {
  if (questaoEhFracao()) {
    document.getElementById('fracao-numerador').focus();
  } else {
    document.getElementById('resposta-input').focus();
  }
}

// Renderizar painel de dicas
function renderizarDicas() {
  const { config } = estadoTreino;
  const panel = document.getElementById('dicas-panel');
  const lista = document.getElementById('dicas-lista');

  if (!panel || !lista) return;

  if (config.dicas && config.dicas.length > 0) {
    panel.style.display = 'block';
    lista.innerHTML = config.dicas.map(dica => `<li>${dica}</li>`).join('');

    // Mobile: tornar colapsável
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      panel.classList.add('collapsible');
      const header = panel.querySelector('.dicas-header');
      // Adicionar chevron se não existir
      if (!header.querySelector('.dicas-chevron')) {
        const chevron = document.createElement('i');
        chevron.className = 'bi bi-chevron-down dicas-chevron';
        header.appendChild(chevron);
      }
      // Toggle ao clicar
      header.onclick = () => {
        lista.classList.toggle('open');
        const chevron = header.querySelector('.dicas-chevron');
        if (chevron) chevron.classList.toggle('open');
      };
    } else {
      panel.classList.remove('collapsible');
    }
  } else {
    panel.style.display = 'none';
  }
}

// Renderizar header do treino
function renderizarHeader() {
  const { config, questaoAtual, questoes } = estadoTreino;

  // Nível
  const nivelEl = document.querySelector('.treino-nivel span');
  if (nivelEl) {
    nivelEl.textContent = config.nome;
  }

  // Progresso
  const progressoEl = document.querySelector('.treino-progresso strong');
  if (progressoEl) {
    progressoEl.textContent = `${questaoAtual + 1}/${questoes.length}`;
  }
}

// Renderizar questão atual
function renderizarQuestao() {
  const { questoes, questaoAtual } = estadoTreino;
  const questao = questoes[questaoAtual];
  const ehFracao = questao.tipoResposta === 'fracao';

  // Número da questão
  const numeroEl = document.querySelector('.questao-numero');
  if (numeroEl) {
    numeroEl.textContent = `Questão ${questao.numero}`;
  }

  // Tipo
  const tipoEl = document.querySelector('.questao-tipo');
  if (tipoEl) {
    tipoEl.textContent = questao.tipo.charAt(0).toUpperCase() + questao.tipo.slice(1);
  }

  // Enunciado
  const enunciadoEl = document.querySelector('.questao-enunciado');
  if (enunciadoEl) {
    enunciadoEl.innerHTML = questao.enunciadoHTML || questao.enunciado;
  }

  // Alternar entre input normal e input fração
  const inputNormal = document.getElementById('resposta-input');
  const inputFracao = document.getElementById('fracao-input');
  const numEl = document.getElementById('fracao-numerador');
  const denEl = document.getElementById('fracao-denominador');
  const respostaContainer = document.querySelector('.resposta-container');

  if (ehFracao) {
    inputNormal.style.display = 'none';
    inputFracao.style.display = 'flex';
    inputFracao.className = 'fracao-input';
    respostaContainer.classList.add('modo-fracao');
    numEl.value = '';
    numEl.disabled = false;
    denEl.value = '';
    denEl.disabled = false;
    numEl.focus();
  } else {
    inputNormal.style.display = '';
    inputFracao.style.display = 'none';
    inputNormal.value = '';
    inputNormal.className = 'resposta-input';
    respostaContainer.classList.remove('modo-fracao');
    inputNormal.disabled = false;
    inputNormal.focus();
  }

  // Esconder feedback
  const feedbackEl = document.querySelector('.feedback-container');
  if (feedbackEl) {
    feedbackEl.classList.remove('show', 'correct', 'wrong');
  }

  // Esconder botão próximo (não usado — avanço automático)
  const btnProximo = document.querySelector('.btn-proximo');
  if (btnProximo) {
    btnProximo.style.display = 'none';
  }

  // Habilitar botão confirmar
  const btnConfirmar = document.querySelector('.btn-confirmar');
  if (btnConfirmar) {
    btnConfirmar.disabled = false;
  }

  // Atualizar barra de progresso
  atualizarBarraProgresso();

  // Atualizar header
  renderizarHeader();
}

// Atualizar barra de progresso
function atualizarBarraProgresso() {
  const { questoes, questaoAtual, respostas } = estadoTreino;
  const porcentagem = (questaoAtual / questoes.length) * 100;

  // Barra
  const barraEl = document.querySelector('.progress-bar-fill');
  if (barraEl) {
    barraEl.style.width = `${porcentagem}%`;
  }

  // Texto
  const textoEl = document.querySelector('.progress-bar-header strong');
  if (textoEl) {
    textoEl.textContent = `${questaoAtual}/${questoes.length}`;
  }

  // Dots
  const dotsContainer = document.querySelector('.progress-dots');
  if (dotsContainer && questoes.length <= 20) {
    let html = '';
    for (let i = 0; i < questoes.length; i++) {
      let classe = '';
      if (i < questaoAtual) {
        classe = respostas[i]?.correto ? 'completed' : 'wrong';
      } else if (i === questaoAtual) {
        classe = 'current';
      }
      html += `<div class="progress-dot ${classe}">${i + 1}</div>`;
    }
    dotsContainer.innerHTML = html;
  }
}

// Iniciar timer
function iniciarTimer() {
  const { config } = estadoTreino;
  estadoTreino.tempoRestante = config.tempoLimite;

  atualizarTimer();

  estadoTreino.timerInterval = setInterval(() => {
    estadoTreino.tempoRestante--;
    atualizarTimer();

    if (estadoTreino.tempoRestante <= 0) {
      finalizarTreino(true);
    }
  }, 1000);
}

// Atualizar display do timer
function atualizarTimer() {
  const { tempoRestante, config } = estadoTreino;
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;

  const timerEl = document.querySelector('.treino-timer');
  const timerSpan = timerEl?.querySelector('span');

  if (timerSpan) {
    timerSpan.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  // Mudar cor baseado no tempo restante
  if (timerEl) {
    timerEl.classList.remove('warning', 'danger');

    const porcentagem = tempoRestante / config.tempoLimite;
    if (porcentagem <= 0.2) {
      timerEl.classList.add('danger');
    } else if (porcentagem <= 0.4) {
      timerEl.classList.add('warning');
    }
  }
}

// Verificar resposta
function verificarResposta() {
  const { questoes, questaoAtual, nivelId, sublivel } = estadoTreino;
  const questao = questoes[questaoAtual];
  const respostaUsuario = obterResposta();
  const ehFracao = questaoEhFracao();

  if (!respostaUsuario) {
    focarInput();
    return;
  }

  const correto = window.kumonQuestoes.verificarResposta(questao, respostaUsuario);

  // Salvar resposta
  estadoTreino.respostas.push({
    questao: questaoAtual,
    respostaUsuario,
    respostaCorreta: questao.resposta,
    correto
  });

  if (correto) {
    estadoTreino.acertos++;
  } else {
    estadoTreino.erros++;
  }

  // Mostrar feedback
  mostrarFeedback(correto, questao.resposta);

  // Desabilitar inputs e marcar visual
  if (ehFracao) {
    const numEl = document.getElementById('fracao-numerador');
    const denEl = document.getElementById('fracao-denominador');
    const fracaoEl = document.getElementById('fracao-input');
    numEl.disabled = true;
    denEl.disabled = true;
    fracaoEl.classList.add(correto ? 'correct' : 'wrong');
  } else {
    const inputEl = document.getElementById('resposta-input');
    inputEl.disabled = true;
    inputEl.classList.add(correto ? 'correct' : 'wrong');
  }

  // Desabilitar botão confirmar
  document.querySelector('.btn-confirmar').disabled = true;

  // Atualizar progresso
  atualizarBarraProgresso();

  if (correto) {
    // ACERTOU → avança automaticamente
    if (questaoAtual < questoes.length - 1) {
      setTimeout(() => {
        estadoTreino.questaoAtual++;
        renderizarQuestao();
      }, 800);
    } else {
      // Última questão — finalizar
      setTimeout(() => finalizarTreino(false), 1000);
    }
  } else {
    // ERROU → gera nova questão diferente e refaz
    setTimeout(() => {
      const novas = window.kumonQuestoes.gerar(nivelId, sublivel);
      const novaQuestao = novas[0];
      novaQuestao.numero = questao.numero; // mantém o número
      estadoTreino.questoes[questaoAtual] = novaQuestao;
      renderizarQuestao();
    }, 1200);
  }
}

// Mostrar feedback
function mostrarFeedback(correto, respostaCorreta) {
  const feedbackEl = document.querySelector('.feedback-container');
  if (!feedbackEl) return;

  const iconEl = feedbackEl.querySelector('.feedback-icon i');
  const textEl = feedbackEl.querySelector('.feedback-text');
  const respostaEl = feedbackEl.querySelector('.feedback-resposta');

  if (correto) {
    feedbackEl.className = 'feedback-container show correct';
    iconEl.className = 'bi bi-check-lg';
    textEl.textContent = 'Correto!';
    if (respostaEl) respostaEl.textContent = '';
  } else {
    feedbackEl.className = 'feedback-container show wrong';
    iconEl.className = 'bi bi-x-lg';
    textEl.textContent = 'Incorreto';
    if (respostaEl) respostaEl.textContent = `Resposta: ${respostaCorreta}`;
  }
}

// Próxima questão
function proximaQuestao() {
  estadoTreino.questaoAtual++;
  renderizarQuestao();
}

// Finalizar treino
function finalizarTreino(tempoEsgotado) {
  // Parar timer
  if (estadoTreino.timerInterval) {
    clearInterval(estadoTreino.timerInterval);
  }

  const tempoGasto = Math.round((Date.now() - estadoTreino.tempoInicio) / 1000);

  // Preparar resultado
  const resultado = {
    nivelId: estadoTreino.nivelId,
    sublivel: estadoTreino.sublivel,
    acertos: estadoTreino.acertos,
    erros: estadoTreino.erros,
    totalQuestoes: estadoTreino.questoes.length,
    tempo: tempoGasto,
    tempoEsgotado,
    respostas: estadoTreino.respostas
  };

  // Salvar no sessionStorage para página de resultado
  sessionStorage.setItem('kumon_resultado', JSON.stringify(resultado));

  // Redirecionar para página de resultado
  window.location.href = 'resultado.html';
}

// Sair do treino
function sairTreino() {
  if (confirm('Tem certeza que deseja sair? Seu progresso será perdido.')) {
    if (estadoTreino.timerInterval) {
      clearInterval(estadoTreino.timerInterval);
    }
    window.location.href = 'index.html';
  }
}

// Configurar eventos
function configurarEventos() {
  // Botão confirmar
  const btnConfirmar = document.querySelector('.btn-confirmar');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', verificarResposta);
  }

  // Botão próximo
  const btnProximo = document.querySelector('.btn-proximo');
  if (btnProximo) {
    btnProximo.addEventListener('click', proximaQuestao);
  }

  // Botão sair
  const btnSair = document.querySelector('.btn-sair');
  if (btnSair) {
    btnSair.addEventListener('click', sairTreino);
  }

  // Referências dos inputs
  const inputEl = document.getElementById('resposta-input');
  const numEl = document.getElementById('fracao-numerador');
  const denEl = document.getElementById('fracao-denominador');

  // Estado da ordem de digitação (salvo no localStorage)
  let ordemInvertida = localStorage.getItem('kumon_ordem_invertida') !== 'false';

  // Botão toggle de ordem
  const btnOrdem = document.getElementById('btn-ordem-toggle');
  const ordemLabel = document.getElementById('ordem-label');

  function atualizarBotaoOrdem() {
    if (ordemInvertida) {
      btnOrdem.classList.add('invertido');
      ordemLabel.textContent = 'Direita \u2192 Esquerda';
    } else {
      btnOrdem.classList.remove('invertido');
      ordemLabel.textContent = 'Esquerda \u2192 Direita';
    }
  }

  if (btnOrdem) {
    atualizarBotaoOrdem();
    btnOrdem.addEventListener('click', () => {
      ordemInvertida = !ordemInvertida;
      localStorage.setItem('kumon_ordem_invertida', ordemInvertida);
      atualizarBotaoOrdem();
    });
  }

  // Helper: inserir dígito conforme a ordem escolhida
  function inserirDigito(campo, valor) {
    if (valor === '-') {
      if (campo.value.startsWith('-')) {
        campo.value = campo.value.slice(1);
      } else {
        campo.value = '-' + campo.value;
      }
    } else if (valor === '.') {
      if (!campo.value.includes('.')) {
        campo.value = campo.value + valor;
      }
    } else if (ordemInvertida) {
      // Ordem invertida: inserir à esquerda (unidade → dezena → centena)
      if (campo.value.startsWith('-')) {
        campo.value = '-' + valor + campo.value.slice(1);
      } else {
        campo.value = valor + campo.value;
      }
    } else {
      // Ordem normal: inserir à direita
      campo.value = campo.value + valor;
    }
  }

  // Helper: apagar último dígito inserido
  function apagarUltimo(campo) {
    if (ordemInvertida) {
      // Invertido: último digitado está à esquerda
      if (campo.value.startsWith('-') && campo.value.length > 1) {
        campo.value = '-' + campo.value.slice(2);
      } else if (campo.value.length > 0) {
        campo.value = campo.value.slice(1);
      }
    } else {
      // Normal: último digitado está à direita
      if (campo.value.length > 0) {
        campo.value = campo.value.slice(0, -1);
      }
    }
    if (campo.value === '-') campo.value = '';
  }

  // Interceptar teclado físico no input normal
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (inputEl.disabled) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        verificarResposta();
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        apagarUltimo(inputEl);
        return;
      }
      if (/^[0-9.\-]$/.test(e.key)) {
        e.preventDefault();
        inserirDigito(inputEl, e.key);
      }
    });
  }

  // Interceptar teclado físico nos inputs de fração
  if (numEl) {
    numEl.addEventListener('keydown', (e) => {
      if (numEl.disabled) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        if (numEl.value.trim() && !denEl.value.trim()) {
          denEl.focus();
        } else {
          verificarResposta();
        }
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        apagarUltimo(numEl);
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        denEl.focus();
        return;
      }
      if (/^[0-9.\-]$/.test(e.key)) {
        e.preventDefault();
        inserirDigito(numEl, e.key);
      }
    });
  }

  if (denEl) {
    denEl.addEventListener('keydown', (e) => {
      if (denEl.disabled) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        verificarResposta();
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        apagarUltimo(denEl);
        return;
      }
      if (/^[0-9.\-]$/.test(e.key)) {
        e.preventDefault();
        inserirDigito(denEl, e.key);
      }
    });
  }

  // Teclado numérico virtual
  document.querySelectorAll('.tecla').forEach(tecla => {
    tecla.addEventListener('click', () => {
      const valor = tecla.dataset.valor;

      if (valor === 'clear') {
        if (questaoEhFracao()) {
          numEl.value = '';
          denEl.value = '';
          numEl.focus();
        } else {
          inputEl.value = '';
          inputEl.focus();
        }
      } else if (valor === 'submit') {
        verificarResposta();
      } else if (valor === '/' && questaoEhFracao()) {
        denEl.focus();
      } else {
        if (questaoEhFracao()) {
          const ativo = document.activeElement;
          if (ativo === denEl) {
            inserirDigito(denEl, valor);
          } else {
            inserirDigito(numEl, valor);
          }
        } else {
          inserirDigito(inputEl, valor);
        }
      }
    });
  });
}

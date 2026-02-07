// ============================================
// Kumon Digital - Lógica da Tela de Resultado
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const resultadoStr = sessionStorage.getItem('kumon_resultado');

  if (!resultadoStr) {
    window.location.href = 'index.html';
    return;
  }

  const resultado = JSON.parse(resultadoStr);

  // Processar progressão
  const progressao = window.kumonProgressao.processarResultado(resultado);

  // Renderizar resultado
  renderizarResultado(resultado, progressao);

  // Limpar sessão
  sessionStorage.removeItem('kumon_resultado');
  sessionStorage.removeItem('kumon_nivel_treino');
});

function renderizarResultado(resultado, progressao) {
  const { acertos, erros, totalQuestoes, tempo, tempoEsgotado } = resultado;
  const porcentagem = Math.round((acertos / totalQuestoes) * 100);

  // Status geral
  const statusEl = document.querySelector('.resultado-status');
  if (statusEl) {
    if (progressao.passou) {
      statusEl.className = 'resultado-status sucesso';
      statusEl.innerHTML = `
        <div class="status-icon">
          <i class="bi bi-trophy-fill"></i>
        </div>
        <h1>Excelente!</h1>
        <p>Você passou com ${porcentagem}% de acertos!</p>
      `;
    } else if (progressao.falhou) {
      statusEl.className = 'resultado-status falha';
      statusEl.innerHTML = `
        <div class="status-icon">
          <i class="bi bi-emoji-frown"></i>
        </div>
        <h1>Continue tentando!</h1>
        <p>Você precisa de 90% para avançar. Tente novamente!</p>
      `;
    } else {
      statusEl.className = 'resultado-status parcial';
      statusEl.innerHTML = `
        <div class="status-icon">
          <i class="bi bi-emoji-neutral"></i>
        </div>
        <h1>Quase lá!</h1>
        <p>Você fez ${porcentagem}%. Precisa de 90% para avançar.</p>
      `;
    }
  }

  // Estatísticas
  atualizarStat('stat-acertos', acertos, totalQuestoes);
  atualizarStat('stat-erros', erros);
  atualizarStat('stat-porcentagem', porcentagem + '%');
  atualizarStat('stat-tempo', formatarTempo(tempo));

  // Mensagem de progressão
  const progressaoEl = document.querySelector('.progressao-mensagem');
  if (progressaoEl) {
    let html = `<p>${progressao.mensagem}</p>`;

    if (progressao.passou && !progressao.desbloqueou) {
      html += `
        <div class="dias-progresso">
          <span>Dias consecutivos: ${progressao.diasConsecutivos}/3</span>
          <div class="dias-visual">
            ${renderizarDias(progressao.diasConsecutivos)}
          </div>
        </div>
      `;
    }

    if (progressao.desbloqueou) {
      html += `
        <div class="desbloqueio-badge">
          <i class="bi bi-unlock-fill"></i>
          <span>Novo nível desbloqueado!</span>
        </div>
      `;
    }

    if (progressao.resetou) {
      html += `
        <div class="reset-aviso">
          <i class="bi bi-arrow-counterclockwise"></i>
          <span>Progresso reiniciado. Revise o conteúdo antes de tentar novamente.</span>
        </div>
      `;
    }

    progressaoEl.innerHTML = html;
  }

  // Streak
  const streakEl = document.querySelector('.streak-info');
  if (streakEl) {
    streakEl.innerHTML = `
      <div class="streak-badge">
        <i class="bi bi-fire"></i>
        <span>${progressao.streak} dias</span>
      </div>
      <p>Seu streak de prática</p>
    `;
  }

  // Detalhes das questões
  renderizarDetalhes(resultado.respostas);
}

function atualizarStat(id, valor, total = null) {
  const el = document.getElementById(id);
  if (!el) return;

  const valorEl = el.querySelector('.stat-valor');
  if (valorEl) {
    valorEl.textContent = total ? `${valor}/${total}` : valor;
  }
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${min}:${seg.toString().padStart(2, '0')}`;
}

function renderizarDias(diasFeitos) {
  let html = '';
  for (let i = 0; i < 3; i++) {
    const classe = i < diasFeitos ? 'completo' : '';
    html += `<div class="dia-circle ${classe}"><i class="bi bi-check-lg"></i></div>`;
  }
  return html;
}

function renderizarDetalhes(respostas) {
  const container = document.getElementById('detalhes-questoes');
  if (!container || !respostas) return;

  let html = '<h3><i class="bi bi-list-check"></i> Detalhes das Questões</h3><div class="questoes-lista">';

  respostas.forEach((r, i) => {
    const classe = r.correto ? 'correta' : 'errada';
    html += `
      <div class="questao-detalhe ${classe}">
        <span class="questao-num">${i + 1}</span>
        <span class="questao-sua-resposta">Sua resposta: ${r.respostaUsuario}</span>
        ${!r.correto ? `<span class="questao-resposta-correta">Correto: ${r.respostaCorreta}</span>` : ''}
        <i class="bi ${r.correto ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// Botões de ação
function voltarDashboard() {
  window.location.href = 'index.html';
}

function tentarNovamente() {
  const usuario = window.kumonStorage.getUsuario();
  const nivelId = `${usuario.nivelAtual.fase}_${usuario.nivelAtual.nivel}`;
  sessionStorage.setItem('kumon_nivel_treino', nivelId);
  window.location.href = 'treino.html';
}

// Expor funções
window.voltarDashboard = voltarDashboard;
window.tentarNovamente = tentarNovamente;

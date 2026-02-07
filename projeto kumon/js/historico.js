// ============================================
// Kumon Digital - Lógica da Tela de Histórico
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderizarHistorico();
  renderizarEstatisticas();
  configurarFiltros();
});

function renderizarHistorico() {
  const container = document.getElementById('historico-lista');
  if (!container) return;

  const historico = window.kumonStorage.getHistorico();

  if (historico.length === 0) {
    container.innerHTML = `
      <div class="historico-vazio">
        <i class="bi bi-journal-x"></i>
        <h3>Nenhuma sessão registrada</h3>
        <p>Complete sua primeira sessão de treino para ver seu histórico aqui.</p>
        <a href="index.html" class="btn btn-primary">
          <i class="bi bi-play-fill"></i>
          Começar a praticar
        </a>
      </div>
    `;
    return;
  }

  let html = '';

  historico.forEach(sessao => {
    const data = new Date(sessao.data);
    const dataFormatada = data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const horaFormatada = data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const config = window.kumonQuestoes.getNivelConfig(sessao.nivelId);
    const porcentagem = Math.round((sessao.acertos / sessao.totalQuestoes) * 100);

    let statusClasse = 'parcial';
    let statusTexto = 'Parcial';
    if (sessao.passou) {
      statusClasse = 'aprovado';
      statusTexto = 'Aprovado';
    } else if (sessao.falhou) {
      statusClasse = 'reprovado';
      statusTexto = 'Reprovado';
    }

    html += `
      <div class="historico-item">
        <div class="historico-data">
          <span class="dia">${dataFormatada}</span>
          <span class="hora">${horaFormatada}</span>
        </div>
        <div class="historico-nivel">
          <i class="bi ${config?.icone || 'bi-calculator'}"></i>
          <div class="nivel-info">
            <span class="nivel-nome">${config?.nome || 'Nível'}</span>
            <span class="nivel-fase">Fase ${sessao.fase}</span>
          </div>
        </div>
        <div class="historico-resultado">
          <div class="resultado-acertos">
            <span class="valor">${sessao.acertos}/${sessao.totalQuestoes}</span>
            <span class="label">Acertos</span>
          </div>
          <div class="resultado-porcentagem">
            <span class="valor">${porcentagem}%</span>
            <span class="label">Taxa</span>
          </div>
          <div class="resultado-tempo">
            <span class="valor">${formatarTempo(sessao.tempo)}</span>
            <span class="label">Tempo</span>
          </div>
        </div>
        <div class="historico-status ${statusClasse}">
          ${statusTexto}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderizarEstatisticas() {
  const stats7 = window.kumonStorage.getEstatisticasDias(7);
  const stats30 = window.kumonStorage.getEstatisticasDias(30);
  const usuario = window.kumonStorage.getUsuario();

  // Estatísticas gerais
  atualizarStat('total-sessoes', usuario.estatisticas.totalSessoes);
  atualizarStat('total-questoes', usuario.estatisticas.totalQuestoes);
  atualizarStat('total-acertos', usuario.estatisticas.totalAcertos);
  atualizarStat('tempo-total', formatarTempoLongo(usuario.estatisticas.tempoTotal));

  // Taxa de acerto
  const taxaAcerto = usuario.estatisticas.totalQuestoes > 0
    ? Math.round((usuario.estatisticas.totalAcertos / usuario.estatisticas.totalQuestoes) * 100)
    : 0;
  atualizarStat('taxa-acerto', taxaAcerto + '%');

  // Últimos 7 dias
  atualizarStat('sessoes-7dias', stats7.sessoes);
  atualizarStat('questoes-7dias', stats7.questoes);

  // Últimos 30 dias
  atualizarStat('sessoes-30dias', stats30.sessoes);
  atualizarStat('questoes-30dias', stats30.questoes);

  // Gráfico se disponível
  if (window.Chart && document.getElementById('chart-historico')) {
    renderizarGrafico(stats7);
  }
}

function atualizarStat(id, valor) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = valor;
  }
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${min}:${seg.toString().padStart(2, '0')}`;
}

function formatarTempoLongo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);

  if (horas > 0) {
    return `${horas}h ${minutos}min`;
  }
  return `${minutos}min`;
}

function renderizarGrafico(stats) {
  const ctx = document.getElementById('chart-historico');
  if (!ctx) return;

  const labels = [];
  const dadosAcertos = [];
  const dadosQuestoes = [];

  // Últimos 7 dias
  for (let i = 6; i >= 0; i--) {
    const data = new Date();
    data.setDate(data.getDate() - i);
    const dataStr = data.toISOString().split('T')[0];
    const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });

    labels.push(diaSemana);

    const diaStats = stats.porDia[dataStr];
    dadosAcertos.push(diaStats ? diaStats.acertos : 0);
    dadosQuestoes.push(diaStats ? diaStats.questoes : 0);
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Acertos',
          data: dadosAcertos,
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderRadius: 6
        },
        {
          label: 'Total',
          data: dadosQuestoes,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
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

function configurarFiltros() {
  const filtroFase = document.getElementById('filtro-fase');
  const filtroResultado = document.getElementById('filtro-resultado');

  if (filtroFase) {
    filtroFase.addEventListener('change', aplicarFiltros);
  }

  if (filtroResultado) {
    filtroResultado.addEventListener('change', aplicarFiltros);
  }
}

function aplicarFiltros() {
  const faseValor = document.getElementById('filtro-fase')?.value || 'todas';
  const resultadoValor = document.getElementById('filtro-resultado')?.value || 'todos';

  const historico = window.kumonStorage.getHistorico();
  let filtrado = historico;

  if (faseValor !== 'todas') {
    filtrado = filtrado.filter(s => s.fase === parseInt(faseValor));
  }

  if (resultadoValor !== 'todos') {
    if (resultadoValor === 'aprovado') {
      filtrado = filtrado.filter(s => s.passou);
    } else if (resultadoValor === 'reprovado') {
      filtrado = filtrado.filter(s => s.falhou);
    }
  }

  renderizarHistoricoFiltrado(filtrado);
}

function renderizarHistoricoFiltrado(historico) {
  const container = document.getElementById('historico-lista');
  if (!container) return;

  if (historico.length === 0) {
    container.innerHTML = `
      <div class="historico-vazio">
        <i class="bi bi-funnel"></i>
        <h3>Nenhum resultado encontrado</h3>
        <p>Tente ajustar os filtros.</p>
      </div>
    `;
    return;
  }

  // Usar a mesma lógica de renderizarHistorico
  let html = '';

  historico.forEach(sessao => {
    const data = new Date(sessao.data);
    const dataFormatada = data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const horaFormatada = data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const config = window.kumonQuestoes.getNivelConfig(sessao.nivelId);
    const porcentagem = Math.round((sessao.acertos / sessao.totalQuestoes) * 100);

    let statusClasse = 'parcial';
    let statusTexto = 'Parcial';
    if (sessao.passou) {
      statusClasse = 'aprovado';
      statusTexto = 'Aprovado';
    } else if (sessao.falhou) {
      statusClasse = 'reprovado';
      statusTexto = 'Reprovado';
    }

    html += `
      <div class="historico-item">
        <div class="historico-data">
          <span class="dia">${dataFormatada}</span>
          <span class="hora">${horaFormatada}</span>
        </div>
        <div class="historico-nivel">
          <i class="bi ${config?.icone || 'bi-calculator'}"></i>
          <div class="nivel-info">
            <span class="nivel-nome">${config?.nome || 'Nível'}</span>
            <span class="nivel-fase">Fase ${sessao.fase}</span>
          </div>
        </div>
        <div class="historico-resultado">
          <div class="resultado-acertos">
            <span class="valor">${sessao.acertos}/${sessao.totalQuestoes}</span>
            <span class="label">Acertos</span>
          </div>
          <div class="resultado-porcentagem">
            <span class="valor">${porcentagem}%</span>
            <span class="label">Taxa</span>
          </div>
          <div class="resultado-tempo">
            <span class="valor">${formatarTempo(sessao.tempo)}</span>
            <span class="label">Tempo</span>
          </div>
        </div>
        <div class="historico-status ${statusClasse}">
          ${statusTexto}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Exportar dados
function exportarHistorico() {
  const dados = window.kumonStorage.exportarDados();
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `kumon-historico-${new Date().toISOString().split('T')[0]}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

// Expor funções
window.exportarHistorico = exportarHistorico;

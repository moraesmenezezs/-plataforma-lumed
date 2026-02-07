// ============================================
// Kumon Digital - Sistema de Conquistas
// ============================================

// Lista de todas as conquistas
const CONQUISTAS = {
  // Primeiros passos
  primeira_sessao: {
    id: 'primeira_sessao',
    nome: 'Primeiro Passo',
    descricao: 'Complete sua primeira sessão de treino',
    icone: 'bi-star-fill',
    cor: '#22c55e',
    raridade: 'comum'
  },
  perfeito: {
    id: 'perfeito',
    nome: 'Perfeição',
    descricao: 'Acerte 100% das questões em uma sessão',
    icone: 'bi-bullseye',
    cor: '#f59e0b',
    raridade: 'raro'
  },

  // Streak
  streak_7: {
    id: 'streak_7',
    nome: 'Semana Perfeita',
    descricao: 'Mantenha um streak de 7 dias',
    icone: 'bi-fire',
    cor: '#ef4444',
    raridade: 'raro'
  },
  streak_30: {
    id: 'streak_30',
    nome: 'Mês de Dedicação',
    descricao: 'Mantenha um streak de 30 dias',
    icone: 'bi-fire',
    cor: '#8b5cf6',
    raridade: 'epico'
  },

  // Fases
  fase_1_completa: {
    id: 'fase_1_completa',
    nome: 'Fundamentos Sólidos',
    descricao: 'Complete todos os níveis da Fase 1',
    icone: 'bi-trophy-fill',
    cor: '#22c55e',
    raridade: 'raro'
  },
  fase_2_completa: {
    id: 'fase_2_completa',
    nome: 'Intermediário Master',
    descricao: 'Complete todos os níveis da Fase 2',
    icone: 'bi-trophy-fill',
    cor: '#3b82f6',
    raridade: 'epico'
  },
  fase_3_completa: {
    id: 'fase_3_completa',
    nome: 'Expressões Dominadas',
    descricao: 'Complete todos os níveis da Fase 3',
    icone: 'bi-trophy-fill',
    cor: '#8b5cf6',
    raridade: 'epico'
  },
  fase_4_completa: {
    id: 'fase_4_completa',
    nome: 'Poder das Potências',
    descricao: 'Complete todos os níveis da Fase 4',
    icone: 'bi-trophy-fill',
    cor: '#f59e0b',
    raridade: 'epico'
  },
  fase_5_completa: {
    id: 'fase_5_completa',
    nome: 'Mestre da Proporção',
    descricao: 'Complete todos os níveis da Fase 5',
    icone: 'bi-trophy-fill',
    cor: '#ef4444',
    raridade: 'epico'
  },
  fase_6_completa: {
    id: 'fase_6_completa',
    nome: 'Desvendador de X',
    descricao: 'Complete todos os níveis da Fase 6',
    icone: 'bi-trophy-fill',
    cor: '#06b6d4',
    raridade: 'epico'
  },
  fase_7_completa: {
    id: 'fase_7_completa',
    nome: 'Mente Lógica',
    descricao: 'Complete todos os níveis da Fase 7',
    icone: 'bi-trophy-fill',
    cor: '#ec4899',
    raridade: 'lendario'
  },
  fase_8_completa: {
    id: 'fase_8_completa',
    nome: 'Geômetra',
    descricao: 'Complete todos os níveis da Fase 8',
    icone: 'bi-trophy-fill',
    cor: '#14b8a6',
    raridade: 'lendario'
  },

  // Questões
  '100_questoes': {
    id: '100_questoes',
    nome: 'Centenário',
    descricao: 'Resolva 100 questões',
    icone: 'bi-check2-all',
    cor: '#10b981',
    raridade: 'comum'
  },
  '500_questoes': {
    id: '500_questoes',
    nome: 'Incansável',
    descricao: 'Resolva 500 questões',
    icone: 'bi-check2-all',
    cor: '#f59e0b',
    raridade: 'raro'
  },
  '1000_questoes': {
    id: '1000_questoes',
    nome: 'Lenda',
    descricao: 'Resolva 1000 questões',
    icone: 'bi-check2-all',
    cor: '#8b5cf6',
    raridade: 'epico'
  },

  // Velocidade
  velocista: {
    id: 'velocista',
    nome: 'Velocista',
    descricao: 'Complete uma sessão com 90%+ em menos de 2 minutos',
    icone: 'bi-lightning-fill',
    cor: '#f59e0b',
    raridade: 'raro'
  },

  // Consistência
  madrugador: {
    id: 'madrugador',
    nome: 'Madrugador',
    descricao: 'Complete uma sessão antes das 7h',
    icone: 'bi-sunrise',
    cor: '#f97316',
    raridade: 'comum'
  },
  noturno: {
    id: 'noturno',
    nome: 'Coruja Noturna',
    descricao: 'Complete uma sessão depois das 23h',
    icone: 'bi-moon-stars',
    cor: '#6366f1',
    raridade: 'comum'
  },

  // Especiais
  mestre_kumon: {
    id: 'mestre_kumon',
    nome: 'Mestre Kumon',
    descricao: 'Complete todos os níveis do Kumon Digital',
    icone: 'bi-award-fill',
    cor: '#fbbf24',
    raridade: 'lendario'
  }
};

// Cores por raridade
const RARIDADE_CORES = {
  comum: '#6b7280',
  raro: '#3b82f6',
  epico: '#8b5cf6',
  lendario: '#fbbf24'
};

// Obter todas as conquistas com status
function getTodasConquistas() {
  const conquistasDesbloqueadas = window.kumonStorage.getConquistas();

  return Object.values(CONQUISTAS).map(conquista => ({
    ...conquista,
    desbloqueada: conquistasDesbloqueadas.includes(conquista.id),
    raridadeCor: RARIDADE_CORES[conquista.raridade]
  }));
}

// Obter conquistas desbloqueadas
function getConquistasDesbloqueadas() {
  const conquistasDesbloqueadas = window.kumonStorage.getConquistas();

  return conquistasDesbloqueadas
    .map(id => CONQUISTAS[id])
    .filter(Boolean);
}

// Obter uma conquista específica
function getConquista(id) {
  const conquista = CONQUISTAS[id];
  if (!conquista) return null;

  return {
    ...conquista,
    desbloqueada: window.kumonStorage.temConquista(id),
    raridadeCor: RARIDADE_CORES[conquista.raridade]
  };
}

// Contar conquistas
function contarConquistas() {
  const desbloqueadas = window.kumonStorage.getConquistas().length;
  const total = Object.keys(CONQUISTAS).length;

  return {
    desbloqueadas,
    total,
    porcentagem: Math.round((desbloqueadas / total) * 100)
  };
}

// Mostrar notificação de conquista
function mostrarNotificacao(conquistaId) {
  const conquista = CONQUISTAS[conquistaId];
  if (!conquista) return;

  // Criar elemento de notificação
  const notificacao = document.createElement('div');
  notificacao.className = 'conquista-notificacao';
  notificacao.innerHTML = `
    <div class="conquista-notificacao-content">
      <div class="conquista-notificacao-icon" style="background: ${conquista.cor}">
        <i class="bi ${conquista.icone}"></i>
      </div>
      <div class="conquista-notificacao-info">
        <span class="conquista-label">Nova Conquista!</span>
        <span class="conquista-nome">${conquista.nome}</span>
        <span class="conquista-descricao">${conquista.descricao}</span>
      </div>
    </div>
  `;

  // Adicionar estilos inline (pode mover para CSS depois)
  notificacao.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    z-index: 3000;
    animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 4s forwards;
  `;

  document.body.appendChild(notificacao);

  // Adicionar estilos de animação se não existirem
  if (!document.getElementById('conquista-animations')) {
    const style = document.createElement('style');
    style.id = 'conquista-animations';
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(120%); opacity: 0; }
      }
      .conquista-notificacao-content {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 24px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        border: 2px solid #22c55e;
      }
      .conquista-notificacao-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
      }
      .conquista-notificacao-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .conquista-label {
        font-size: 12px;
        font-weight: 600;
        color: #22c55e;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .conquista-nome {
        font-size: 18px;
        font-weight: 700;
        color: #14532d;
      }
      .conquista-descricao {
        font-size: 13px;
        color: #6b7280;
      }
    `;
    document.head.appendChild(style);
  }

  // Remover após animação
  setTimeout(() => {
    notificacao.remove();
  }, 5000);
}

// Listener para eventos de conquista
window.addEventListener('kumon-conquista', (e) => {
  mostrarNotificacao(e.detail.conquistaId);
});

// Exportar para uso global
window.kumonConquistas = {
  CONQUISTAS,
  RARIDADE_CORES,
  getTodasConquistas,
  getConquistasDesbloqueadas,
  getConquista,
  contarConquistas,
  mostrarNotificacao
};

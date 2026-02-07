// ============================================
// Kumon Digital - Sistema de Progressão
// Níveis, Streak e Desbloqueio
// ============================================

// Regras de progressão
const REGRAS = {
  PORCENTAGEM_PASSAR: 100, // 100% para passar — errou uma, não avança
  PORCENTAGEM_FALHA: 100,  // Qualquer erro = não conta o dia
  DIAS_PARA_DESBLOQUEAR: 3, // 3 dias consecutivos
  SUBNIVEIS: ['basico', 'intermediario', 'avancado']
};

// Fases e níveis
const FASES = {
  1: {
    nome: 'Fundamentos',
    descricao: 'Operações básicas da matemática',
    cor: '#22c55e',
    niveis: ['1_1', '1_2', '1_3', '1_4']
  },
  2: {
    nome: 'Frações',
    descricao: 'Operações com frações e números mistos',
    cor: '#3b82f6',
    niveis: ['2_1', '2_2', '2_3', '2_4', '2_5']
  },
  3: {
    nome: 'MMC, MDC e Expressões',
    descricao: 'Múltiplos, divisores e expressões numéricas',
    cor: '#8b5cf6',
    niveis: ['3_1', '3_2', '3_3']
  },
  4: {
    nome: 'Potenciação e Radiciação',
    descricao: 'Potências, raízes e notação científica',
    cor: '#f59e0b',
    niveis: ['4_1', '4_2', '4_3', '4_4']
  },
  5: {
    nome: 'Razão, Proporção e Porcentagem',
    descricao: 'Proporcionalidade e cálculos percentuais',
    cor: '#ef4444',
    niveis: ['5_1', '5_2', '5_3', '5_4']
  },
  6: {
    nome: 'Equações',
    descricao: 'Equações de 1º e 2º grau e sistemas',
    cor: '#06b6d4',
    niveis: ['6_1', '6_2', '6_3', '6_4']
  },
  7: {
    nome: 'Conjuntos e Lógica',
    descricao: 'Conjuntos, lógica e análise combinatória',
    cor: '#ec4899',
    niveis: ['7_1', '7_2', '7_3']
  },
  8: {
    nome: 'Geometria Básica',
    descricao: 'Perímetro, área, volume e trigonometria',
    cor: '#14b8a6',
    niveis: ['8_1', '8_2', '8_3']
  }
};

// Obter próximo nível
function getProximoNivel(nivelAtual) {
  const { fase, nivel, sublivel } = nivelAtual;
  const nivelId = `${fase}_${nivel}`;
  const subIndex = REGRAS.SUBNIVEIS.indexOf(sublivel);

  // Se não está no último sublível, avança sublível
  if (subIndex < REGRAS.SUBNIVEIS.length - 1) {
    return {
      fase,
      nivel,
      sublivel: REGRAS.SUBNIVEIS[subIndex + 1]
    };
  }

  // Se está no último sublível, avança nível
  const faseAtual = FASES[fase];
  const nivelIndex = faseAtual.niveis.indexOf(nivelId);

  if (nivelIndex < faseAtual.niveis.length - 1) {
    // Próximo nível na mesma fase
    const proximoNivelId = faseAtual.niveis[nivelIndex + 1];
    const [novaFase, novoNivel] = proximoNivelId.split('_').map(Number);
    return {
      fase: novaFase,
      nivel: novoNivel,
      sublivel: REGRAS.SUBNIVEIS[0]
    };
  }

  // Se está na última fase e último nível
  if (fase >= 8) {
    return null; // Completou tudo!
  }

  // Próxima fase
  const proximaFase = fase + 1;
  const primeiroNivel = FASES[proximaFase].niveis[0];
  const [novaFase, novoNivel] = primeiroNivel.split('_').map(Number);
  return {
    fase: novaFase,
    nivel: novoNivel,
    sublivel: REGRAS.SUBNIVEIS[0]
  };
}

// Processar resultado de uma sessão
function processarResultado(resultado) {
  const { nivelId, acertos, totalQuestoes, tempo } = resultado;
  const porcentagem = (acertos / totalQuestoes) * 100;
  const passou = porcentagem >= REGRAS.PORCENTAGEM_PASSAR;
  const falhou = porcentagem < REGRAS.PORCENTAGEM_FALHA;

  const usuario = window.kumonStorage.getUsuario();
  const progresso = usuario.progresso[nivelId];
  const hoje = new Date().toISOString().split('T')[0];

  let mensagem = '';
  let desbloqueou = false;
  let proximoNivel = null;
  let resetou = false;

  // Atualizar streak
  const ultimaPratica = usuario.streak.ultimaPratica;
  const ontem = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (ultimaPratica === ontem) {
    usuario.streak.atual++;
  } else if (ultimaPratica !== hoje) {
    usuario.streak.atual = 1;
  }

  if (usuario.streak.atual > usuario.streak.recorde) {
    usuario.streak.recorde = usuario.streak.atual;
  }

  usuario.streak.ultimaPratica = hoje;

  // Atualizar estatísticas
  usuario.estatisticas.totalSessoes++;
  usuario.estatisticas.totalQuestoes += totalQuestoes;
  usuario.estatisticas.totalAcertos += acertos;
  usuario.estatisticas.tempoTotal += tempo;

  if (!usuario.estatisticas.melhorTempo || tempo < usuario.estatisticas.melhorTempo) {
    usuario.estatisticas.melhorTempo = tempo;
  }

  // Processar progresso no nível
  if (passou) {
    // Verificar se já praticou hoje neste nível
    const ultimaPraticaNivel = progresso.ultimaPratica;

    if (ultimaPraticaNivel !== hoje) {
      // Verificar se é dia consecutivo
      if (ultimaPraticaNivel === ontem) {
        progresso.diasConsecutivos++;
      } else {
        progresso.diasConsecutivos = 1;
      }
      progresso.ultimaPratica = hoje;
    }

    // Verificar desbloqueio do próximo nível
    if (progresso.diasConsecutivos >= REGRAS.DIAS_PARA_DESBLOQUEAR) {
      progresso.completado = true;

      // Desbloquear próximo nível
      proximoNivel = getProximoNivel(usuario.nivelAtual);

      if (proximoNivel) {
        const proximoId = `${proximoNivel.fase}_${proximoNivel.nivel}`;
        if (usuario.progresso[proximoId] && !usuario.progresso[proximoId].desbloqueado) {
          usuario.progresso[proximoId].desbloqueado = true;
          desbloqueou = true;
          mensagem = `Parabéns! Você desbloqueou o próximo nível!`;

          // Atualizar nível atual
          usuario.nivelAtual = proximoNivel;
        }
      } else {
        mensagem = 'Incrível! Você completou todos os níveis do Kumon Digital!';
      }
    } else {
      const diasRestantes = REGRAS.DIAS_PARA_DESBLOQUEAR - progresso.diasConsecutivos;
      mensagem = `Excelente! Faltam ${diasRestantes} dia(s) consecutivo(s) para desbloquear o próximo nível.`;
    }
  } else {
    // Errou pelo menos uma questão — não conta o dia
    mensagem = 'Você precisa acertar todas as questões para avançar. Tente novamente!';
  }

  // Salvar mudanças
  window.kumonStorage.salvarUsuario(usuario);

  // Adicionar sessão ao histórico
  window.kumonStorage.adicionarSessao({
    nivelId,
    fase: usuario.nivelAtual.fase,
    nivel: usuario.nivelAtual.nivel,
    sublivel: usuario.nivelAtual.sublivel,
    acertos,
    erros: totalQuestoes - acertos,
    totalQuestoes,
    tempo,
    porcentagem,
    passou,
    falhou
  });

  // Verificar conquistas
  verificarConquistas(usuario, resultado);

  return {
    passou,
    falhou,
    resetou,
    desbloqueou,
    proximoNivel,
    mensagem,
    porcentagem,
    diasConsecutivos: progresso.diasConsecutivos,
    streak: usuario.streak.atual
  };
}

// Verificar e desbloquear conquistas
function verificarConquistas(usuario, resultado) {
  const conquistas = [];

  // Primeira sessão
  if (usuario.estatisticas.totalSessoes === 1) {
    if (window.kumonStorage.desbloquearConquista('primeira_sessao')) {
      conquistas.push('primeira_sessao');
    }
  }

  // 100% de acertos
  if (resultado.acertos === resultado.totalQuestoes) {
    if (window.kumonStorage.desbloquearConquista('perfeito')) {
      conquistas.push('perfeito');
    }
  }

  // Streak de 7 dias
  if (usuario.streak.atual >= 7) {
    if (window.kumonStorage.desbloquearConquista('streak_7')) {
      conquistas.push('streak_7');
    }
  }

  // Streak de 30 dias
  if (usuario.streak.atual >= 30) {
    if (window.kumonStorage.desbloquearConquista('streak_30')) {
      conquistas.push('streak_30');
    }
  }

  // Completar fases 1-8
  for (let f = 1; f <= 8; f++) {
    const faseCompleta = FASES[f].niveis.every(id => {
      const prog = usuario.progresso[id];
      return prog && prog.completado;
    });
    if (faseCompleta) {
      const conquistaId = `fase_${f}_completa`;
      if (window.kumonStorage.desbloquearConquista(conquistaId)) {
        conquistas.push(conquistaId);
      }
    }
  }

  // Mestre Kumon - completou todas as 8 fases
  const todasFasesCompletas = Object.keys(FASES).every(f => {
    return FASES[f].niveis.every(id => {
      const prog = usuario.progresso[id];
      return prog && prog.completado;
    });
  });
  if (todasFasesCompletas) {
    if (window.kumonStorage.desbloquearConquista('mestre_kumon')) {
      conquistas.push('mestre_kumon');
    }
  }

  // 100 questões resolvidas
  if (usuario.estatisticas.totalQuestoes >= 100) {
    if (window.kumonStorage.desbloquearConquista('100_questoes')) {
      conquistas.push('100_questoes');
    }
  }

  // 500 questões resolvidas
  if (usuario.estatisticas.totalQuestoes >= 500) {
    if (window.kumonStorage.desbloquearConquista('500_questoes')) {
      conquistas.push('500_questoes');
    }
  }

  return conquistas;
}

// Obter status de um nível
function getStatusNivel(nivelId) {
  const usuario = window.kumonStorage.getUsuario();
  const progresso = usuario.progresso[nivelId];
  const nivelAtualId = `${usuario.nivelAtual.fase}_${usuario.nivelAtual.nivel}`;
  const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname);

  if (!progresso && !isLocal) {
    return { status: 'locked', texto: 'Bloqueado' };
  }

  if (progresso && progresso.completado) {
    return { status: 'completed', texto: 'Completo' };
  }

  if (nivelId === nivelAtualId) {
    return { status: 'current', texto: 'Atual' };
  }

  if (isLocal || (progresso && progresso.desbloqueado)) {
    return { status: 'unlocked', texto: 'Disponível' };
  }

  return { status: 'locked', texto: 'Bloqueado' };
}

// Obter progresso geral
function getProgressoGeral() {
  const usuario = window.kumonStorage.getUsuario();

  let totalNiveis = 0;
  let niveisCompletos = 0;

  Object.keys(FASES).forEach(fase => {
    FASES[fase].niveis.forEach(nivelId => {
      totalNiveis++;
      if (usuario.progresso[nivelId]?.completado) {
        niveisCompletos++;
      }
    });
  });

  return {
    porcentagem: Math.round((niveisCompletos / totalNiveis) * 100),
    niveisCompletos,
    totalNiveis,
    nivelAtual: usuario.nivelAtual,
    streak: usuario.streak,
    estatisticas: usuario.estatisticas
  };
}

// Obter níveis para exibição no dashboard
function getNiveisParaDashboard() {
  const usuario = window.kumonStorage.getUsuario();
  const nivelAtualId = `${usuario.nivelAtual.fase}_${usuario.nivelAtual.nivel}`;
  const niveisDashboard = [];

  Object.entries(FASES).forEach(([faseNum, fase]) => {
    fase.niveis.forEach(nivelId => {
      const config = window.kumonQuestoes.getNivelConfig(nivelId);
      const progresso = usuario.progresso[nivelId] || { desbloqueado: false, diasConsecutivos: 0 };
      const status = getStatusNivel(nivelId);
      const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname);

      niveisDashboard.push({
        id: nivelId,
        fase: parseInt(faseNum),
        faseNome: fase.nome,
        nome: config.nome,
        descricao: config.descricao,
        icone: config.icone,
        ...status,
        diasConsecutivos: progresso.diasConsecutivos,
        diasNecessarios: REGRAS.DIAS_PARA_DESBLOQUEAR,
        desbloqueado: isLocal || progresso.desbloqueado,
        completado: progresso.completado || false,
        isCurrent: nivelId === nivelAtualId
      });
    });
  });

  return niveisDashboard;
}

// Exportar para uso global
window.kumonProgressao = {
  processarResultado,
  getProximoNivel,
  getStatusNivel,
  getProgressoGeral,
  getNiveisParaDashboard,
  verificarConquistas,
  REGRAS,
  FASES
};

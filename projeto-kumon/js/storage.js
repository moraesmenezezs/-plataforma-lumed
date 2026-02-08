// ============================================
// Kumon Digital - Gestão de Dados
// Salva no localStorage e sincroniza com Supabase
// ============================================

const STORAGE_KEYS = {
  USUARIO: 'kumon_usuario',
  HISTORICO: 'kumon_historico',
  CONQUISTAS: 'kumon_conquistas'
};

// Estrutura padrão do usuário
function criarUsuarioPadrao() {
  return {
    nome: 'Estudante',
    nivelAtual: { fase: 1, nivel: 1, sublivel: 'basico' },
    streak: {
      atual: 0,
      recorde: 0,
      ultimaPratica: null
    },
    progresso: {
      // Fase 1 - Fundamentos
      '1_1': { diasConsecutivos: 0, desbloqueado: true, completado: false },
      '1_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '1_3': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '1_4': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      // Fase 2 - Frações
      '2_1': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '2_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '2_3': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '2_4': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '2_5': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      // Fase 3 - MMC, MDC e Expressões
      '3_1': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '3_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '3_3': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      // Fase 4 - Potenciação e Radiciação
      '4_1': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '4_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '4_3': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '4_4': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      // Fase 5 - Razão, Proporção e Porcentagem
      '5_1': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '5_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '5_3': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '5_4': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      // Fase 6 - Equações
      '6_1': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '6_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '6_3': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '6_4': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      // Fase 7 - Conjuntos e Lógica
      '7_1': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '7_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '7_3': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      // Fase 8 - Geometria Básica
      '8_1': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '8_2': { diasConsecutivos: 0, desbloqueado: false, completado: false },
      '8_3': { diasConsecutivos: 0, desbloqueado: false, completado: false }
    },
    estatisticas: {
      totalSessoes: 0,
      totalQuestoes: 0,
      totalAcertos: 0,
      tempoTotal: 0, // em segundos
      melhorTempo: null,
      dataInicio: new Date().toISOString()
    }
  };
}

// Migrar progresso de usuários com estrutura antiga (3 fases / 11 níveis)
function migrarProgresso(usuario) {
  // Detectar se é estrutura antiga: tem '2_1' como "Operações Mistas" (não existe mais)
  // ou não tem os novos níveis como '4_1', '5_1', etc.
  if (usuario.progresso && !usuario.progresso['4_1']) {
    const progressoAntigo = { ...usuario.progresso };
    const padrao = criarUsuarioPadrao();
    const novoProgresso = { ...padrao.progresso };

    // Fase 1 permanece igual (1_1 a 1_4)
    ['1_1', '1_2', '1_3', '1_4'].forEach(id => {
      if (progressoAntigo[id]) {
        novoProgresso[id] = progressoAntigo[id];
      }
    });

    // Mapeamento antigo -> novo
    // Antigo 2_2 (Frações) -> Novo 2_1 (Conceito e Simplificação)
    if (progressoAntigo['2_2']) {
      novoProgresso['2_1'] = progressoAntigo['2_2'];
    }
    // Antigo 2_3 (Porcentagem) -> Novo 5_3
    if (progressoAntigo['2_3']) {
      novoProgresso['5_3'] = progressoAntigo['2_3'];
    }
    // Antigo 2_4 (Regra de 3 Simples) -> Novo 5_2
    if (progressoAntigo['2_4']) {
      novoProgresso['5_2'] = progressoAntigo['2_4'];
    }
    // Antigo 3_1 (R3 Composta) -> Novo 5_4
    if (progressoAntigo['3_1']) {
      novoProgresso['5_4'] = progressoAntigo['3_1'];
    }
    // Antigo 3_2 (Conjuntos) -> Novo 7_1
    if (progressoAntigo['3_2']) {
      novoProgresso['7_1'] = progressoAntigo['3_2'];
    }
    // Antigo 3_3 (Lógica) -> Novo 7_2
    if (progressoAntigo['3_3']) {
      novoProgresso['7_2'] = progressoAntigo['3_3'];
    }

    // Se fase 1 estava completa, desbloquear fase 2
    const fase1Completa = ['1_1', '1_2', '1_3', '1_4'].every(id =>
      novoProgresso[id] && novoProgresso[id].completado
    );
    if (fase1Completa && !novoProgresso['2_1'].desbloqueado) {
      novoProgresso['2_1'].desbloqueado = true;
    }

    usuario.progresso = novoProgresso;

    // Ajustar nivelAtual se estava em fase/nível antigo
    const { fase, nivel } = usuario.nivelAtual;
    if (fase === 2 && nivel === 1) {
      // Op. Mistas removido, redirecionar para 2_1 (Frações)
      usuario.nivelAtual = { fase: 2, nivel: 1, sublivel: 'basico' };
    } else if (fase === 2 && nivel === 3) {
      usuario.nivelAtual = { fase: 5, nivel: 3, sublivel: usuario.nivelAtual.sublivel };
    } else if (fase === 2 && nivel === 4) {
      usuario.nivelAtual = { fase: 5, nivel: 2, sublivel: usuario.nivelAtual.sublivel };
    } else if (fase === 3 && nivel === 1) {
      usuario.nivelAtual = { fase: 5, nivel: 4, sublivel: usuario.nivelAtual.sublivel };
    } else if (fase === 3 && nivel === 2) {
      usuario.nivelAtual = { fase: 7, nivel: 1, sublivel: usuario.nivelAtual.sublivel };
    } else if (fase === 3 && nivel === 3) {
      usuario.nivelAtual = { fase: 7, nivel: 2, sublivel: usuario.nivelAtual.sublivel };
    }

    // Salvar migração
    usuario._versao = 2;
    salvarUsuario(usuario);
    console.log('Progresso migrado para a nova estrutura de 8 fases.');
  }
  return usuario;
}

// Obter dados do usuário
function getUsuario() {
  try {
    const dados = localStorage.getItem(STORAGE_KEYS.USUARIO);
    if (dados) {
      let usuario = JSON.parse(dados);
      // Migrar se necessário
      if (!usuario._versao || usuario._versao < 2) {
        usuario = migrarProgresso(usuario);
      }
      return usuario;
    }
  } catch (e) {
    console.error('Erro ao carregar usuário:', e);
  }
  return criarUsuarioPadrao();
}

// Salvar dados do usuário
function salvarUsuario(usuario) {
  try {
    localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(usuario));
    sincronizarComSupabase(usuario);
    return true;
  } catch (e) {
    console.error('Erro ao salvar usuário:', e);
    return false;
  }
}

// Atualizar campo específico do usuário
function atualizarUsuario(caminho, valor) {
  const usuario = getUsuario();
  const partes = caminho.split('.');
  let obj = usuario;

  for (let i = 0; i < partes.length - 1; i++) {
    if (!obj[partes[i]]) obj[partes[i]] = {};
    obj = obj[partes[i]];
  }

  obj[partes[partes.length - 1]] = valor;
  return salvarUsuario(usuario);
}

// Obter histórico de sessões
function getHistorico() {
  try {
    const dados = localStorage.getItem(STORAGE_KEYS.HISTORICO);
    if (dados) {
      return JSON.parse(dados);
    }
  } catch (e) {
    console.error('Erro ao carregar histórico:', e);
  }
  return [];
}

// Adicionar sessão ao histórico
function adicionarSessao(sessao) {
  const historico = getHistorico();
  const novaSessao = {
    id: Date.now(),
    data: new Date().toISOString(),
    ...sessao
  };

  historico.unshift(novaSessao);

  // Manter apenas as últimas 100 sessões
  if (historico.length > 100) {
    historico.pop();
  }

  try {
    localStorage.setItem(STORAGE_KEYS.HISTORICO, JSON.stringify(historico));
    return novaSessao;
  } catch (e) {
    console.error('Erro ao salvar sessão:', e);
    return null;
  }
}

// Obter conquistas
function getConquistas() {
  try {
    const dados = localStorage.getItem(STORAGE_KEYS.CONQUISTAS);
    if (dados) {
      return JSON.parse(dados);
    }
  } catch (e) {
    console.error('Erro ao carregar conquistas:', e);
  }
  return [];
}

// Desbloquear conquista
function desbloquearConquista(conquistaId) {
  const conquistas = getConquistas();

  if (!conquistas.includes(conquistaId)) {
    conquistas.push(conquistaId);

    try {
      localStorage.setItem(STORAGE_KEYS.CONQUISTAS, JSON.stringify(conquistas));

      // Dispara evento para mostrar notificação
      window.dispatchEvent(new CustomEvent('kumon-conquista', {
        detail: { conquistaId }
      }));

      return true;
    } catch (e) {
      console.error('Erro ao salvar conquista:', e);
    }
  }

  return false;
}

// Verificar se conquista está desbloqueada
function temConquista(conquistaId) {
  const conquistas = getConquistas();
  return conquistas.includes(conquistaId);
}

// Calcular estatísticas dos últimos N dias
function getEstatisticasDias(dias = 7) {
  const historico = getHistorico();
  const agora = new Date();
  const limite = new Date(agora.getTime() - dias * 24 * 60 * 60 * 1000);

  const sessoesPeriodo = historico.filter(s => new Date(s.data) >= limite);

  return {
    sessoes: sessoesPeriodo.length,
    questoes: sessoesPeriodo.reduce((acc, s) => acc + (s.totalQuestoes || 0), 0),
    acertos: sessoesPeriodo.reduce((acc, s) => acc + (s.acertos || 0), 0),
    tempo: sessoesPeriodo.reduce((acc, s) => acc + (s.tempo || 0), 0),
    porDia: agruparPorDia(sessoesPeriodo)
  };
}

// Agrupar sessões por dia
function agruparPorDia(sessoes) {
  const grupos = {};

  sessoes.forEach(s => {
    const dia = new Date(s.data).toISOString().split('T')[0];
    if (!grupos[dia]) {
      grupos[dia] = { sessoes: 0, acertos: 0, questoes: 0 };
    }
    grupos[dia].sessoes++;
    grupos[dia].acertos += s.acertos || 0;
    grupos[dia].questoes += s.totalQuestoes || 0;
  });

  return grupos;
}

// Sincronizar com Supabase (background)
async function sincronizarComSupabase(usuario) {
  try {
    const supabase = window.kumonSupabase?.getClient();
    if (!supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Salvar no Supabase (tabela kumon_progresso)
    // Isso requer criar a tabela no Supabase
    // Por enquanto, apenas localStorage

  } catch (e) {
    console.error('Erro ao sincronizar:', e);
  }
}

// Desbloquear todos os níveis
function desbloquearTodosNiveis() {
  const usuario = getUsuario();
  for (const nivelId in usuario.progresso) {
    usuario.progresso[nivelId].desbloqueado = true;
  }
  salvarUsuario(usuario);
  return true;
}

// Limpar todos os dados (reset)
function limparDados() {
  localStorage.removeItem(STORAGE_KEYS.USUARIO);
  localStorage.removeItem(STORAGE_KEYS.HISTORICO);
  localStorage.removeItem(STORAGE_KEYS.CONQUISTAS);
}

// Exportar dados para JSON
function exportarDados() {
  return {
    usuario: getUsuario(),
    historico: getHistorico(),
    conquistas: getConquistas(),
    exportadoEm: new Date().toISOString()
  };
}

// Importar dados de JSON
function importarDados(dados) {
  try {
    if (dados.usuario) {
      localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(dados.usuario));
    }
    if (dados.historico) {
      localStorage.setItem(STORAGE_KEYS.HISTORICO, JSON.stringify(dados.historico));
    }
    if (dados.conquistas) {
      localStorage.setItem(STORAGE_KEYS.CONQUISTAS, JSON.stringify(dados.conquistas));
    }
    return true;
  } catch (e) {
    console.error('Erro ao importar:', e);
    return false;
  }
}

// Exportar para uso global
window.kumonStorage = {
  getUsuario,
  salvarUsuario,
  atualizarUsuario,
  getHistorico,
  adicionarSessao,
  getConquistas,
  desbloquearConquista,
  temConquista,
  getEstatisticasDias,
  desbloquearTodosNiveis,
  limparDados,
  exportarDados,
  importarDados,
  criarUsuarioPadrao,
  migrarProgresso
};

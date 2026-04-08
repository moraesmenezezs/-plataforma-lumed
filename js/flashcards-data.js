// ============================================
// LuMED - Flashcards: Camada de Dados + SM-2
// ============================================
// Algoritmo de repetição espaçada (SM-2) com
// fases learning/review/relearning, CRUD de
// decks e cards, fila de revisão e estatísticas.

(function() {
  'use strict';

  const STORAGE_KEY = 'lumed_flashcards';

  // ── Estrutura padrão ──
  function criarDadosPadrao() {
    return {
      _version: 1,
      decks: {},
      cards: {},
      reviewLog: [],
      dailyStats: {},
      config: {
        novosCardsPorDia: 20,
        passos: [60, 600],       // 1min, 10min (em segundos)
        intervaloGraduacao: 1,   // dias
        facilidadeInicial: 2.5,
        limiteDiario: 100
      }
    };
  }

  // ── ID único ──
  function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  }

  // ── Data de hoje (YYYY-MM-DD) ──
  function hoje() {
    return new Date().toISOString().split('T')[0];
  }

  // ── Timestamp agora (ms) ──
  function agora() {
    return Date.now();
  }

  // ── localStorage ──
  function carregarFlashcards() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && data._version) return data;
      }
    } catch (e) {
      console.warn('[Flashcards] Erro ao carregar:', e);
    }
    return criarDadosPadrao();
  }

  function salvarFlashcards(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('[Flashcards] Erro ao salvar:', e);
    }
  }

  // ══════════════════════════════════════
  // CRUD: Decks
  // ══════════════════════════════════════

  const CORES_DECK = [
    '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
    '#f43f5e', '#ef4444', '#f97316', '#f59e0b',
    '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6'
  ];

  const ICONES_DECK = [
    'bi-book', 'bi-journal-text', 'bi-mortarboard',
    'bi-lightbulb', 'bi-lightning', 'bi-calculator',
    'bi-globe', 'bi-tree', 'bi-droplet-fill',
    'bi-people', 'bi-translate', 'bi-heart-pulse'
  ];

  function criarDeck(nome, descricao, cor, icone, parentId) {
    var data = carregarFlashcards();
    // Validar parent
    if (parentId) {
      if (!data.decks[parentId]) return null;
      if (data.decks[parentId].parentId) return null; // max 1 nivel
    }
    var id = 'deck_' + gerarId();
    data.decks[id] = {
      id: id,
      nome: nome || 'Novo Deck',
      descricao: descricao || '',
      cor: cor || CORES_DECK[Object.keys(data.decks).length % CORES_DECK.length],
      icone: icone || 'bi-book',
      parentId: parentId || null,
      criadoEm: agora(),
      atualizadoEm: agora()
    };
    salvarFlashcards(data);
    return data.decks[id];
  }

  function editarDeck(deckId, campos) {
    var data = carregarFlashcards();
    if (!data.decks[deckId]) return null;
    // Validar parentId se estiver sendo alterado
    if ('parentId' in campos) {
      var newParent = campos.parentId;
      if (newParent) {
        if (newParent === deckId) return null;
        if (!data.decks[newParent]) return null;
        if (data.decks[newParent].parentId) return null;
        // Deck com filhos nao pode virar filho
        for (var did in data.decks) {
          if (data.decks[did].parentId === deckId) return null;
        }
      }
    }
    for (var k in campos) {
      if (k !== 'id' && k !== 'criadoEm') {
        data.decks[deckId][k] = campos[k];
      }
    }
    data.decks[deckId].atualizadoEm = agora();
    salvarFlashcards(data);
    return data.decks[deckId];
  }

  function excluirDeck(deckId) {
    var data = carregarFlashcards();
    if (!data.decks[deckId]) return false;
    // Coletar IDs para excluir (deck + filhos)
    var idsExcluir = [deckId];
    for (var did in data.decks) {
      if (data.decks[did].parentId === deckId) {
        idsExcluir.push(did);
      }
    }
    // Excluir decks e seus cards
    for (var i = 0; i < idsExcluir.length; i++) {
      var delId = idsExcluir[i];
      delete data.decks[delId];
      for (var cid in data.cards) {
        if (data.cards[cid].deckId === delId) {
          delete data.cards[cid];
        }
      }
    }
    // Remover logs
    data.reviewLog = data.reviewLog.filter(function(r) {
      for (var j = 0; j < idsExcluir.length; j++) {
        if (r.deckId === idsExcluir[j]) return false;
      }
      return true;
    });
    salvarFlashcards(data);
    return true;
  }

  function obterDeck(deckId) {
    var data = carregarFlashcards();
    return data.decks[deckId] || null;
  }

  function listarDecks() {
    var data = carregarFlashcards();
    var lista = [];
    for (var id in data.decks) {
      lista.push(data.decks[id]);
    }
    lista.sort(function(a, b) { return a.criadoEm - b.criadoEm; });
    return lista;
  }

  // ══════════════════════════════════════
  // CRUD: Cards
  // ══════════════════════════════════════

  function criarCardPadrao(deckId, tipo) {
    var data = carregarFlashcards();
    var config = data.config;
    return {
      id: 'card_' + gerarId(),
      deckId: deckId,
      tipo: tipo || 'basico',   // basico, cloze, imagem
      frente: '',
      verso: '',
      imagemFrente: '',
      imagemVerso: '',
      tags: [],
      // SM-2
      intervalo: 0,
      repeticoes: 0,
      facilidade: config.facilidadeInicial,
      proximaRevisao: agora(),
      fase: 'new',              // new, learning, review, relearning
      passoAtual: 0,
      ultimaRevisao: null,
      criadoEm: agora()
    };
  }

  function criarCard(deckId, campos) {
    var data = carregarFlashcards();
    if (!data.decks[deckId]) return null;
    var card = criarCardPadrao(deckId, campos.tipo);
    for (var k in campos) {
      if (k !== 'id' && k !== 'criadoEm') {
        card[k] = campos[k];
      }
    }
    card.deckId = deckId;
    data.cards[card.id] = card;
    salvarFlashcards(data);
    return card;
  }

  function editarCard(cardId, campos) {
    var data = carregarFlashcards();
    if (!data.cards[cardId]) return null;
    for (var k in campos) {
      if (k !== 'id' && k !== 'deckId' && k !== 'criadoEm') {
        data.cards[cardId][k] = campos[k];
      }
    }
    salvarFlashcards(data);
    return data.cards[cardId];
  }

  function excluirCard(cardId) {
    var data = carregarFlashcards();
    if (!data.cards[cardId]) return false;
    delete data.cards[cardId];
    salvarFlashcards(data);
    return true;
  }

  function obterCard(cardId) {
    var data = carregarFlashcards();
    return data.cards[cardId] || null;
  }

  function listarCards(deckId) {
    var data = carregarFlashcards();
    var lista = [];
    for (var id in data.cards) {
      if (data.cards[id].deckId === deckId) {
        lista.push(data.cards[id]);
      }
    }
    lista.sort(function(a, b) { return a.criadoEm - b.criadoEm; });
    return lista;
  }

  // ══════════════════════════════════════
  // Algoritmo SM-2
  // ══════════════════════════════════════

  // qualidade: 0=Denovo, 2=Difícil, 4=Bom, 5=Fácil
  function calcularProximaRevisao(card, qualidade) {
    var data = carregarFlashcards();
    var config = data.config;
    var passos = config.passos;
    var now = agora();

    var novoCard = JSON.parse(JSON.stringify(card));
    novoCard.ultimaRevisao = now;

    if (novoCard.fase === 'new' || novoCard.fase === 'learning' || novoCard.fase === 'relearning') {
      // ── Fase Learning / Relearning ──
      if (qualidade === 0) {
        // Denovo: volta ao primeiro passo
        novoCard.fase = novoCard.fase === 'new' ? 'learning' : 'relearning';
        novoCard.passoAtual = 0;
        novoCard.proximaRevisao = now + (passos[0] * 1000);
      } else if (qualidade === 2) {
        // Difícil: repete o passo atual
        var passoAtual = Math.min(novoCard.passoAtual, passos.length - 1);
        novoCard.fase = novoCard.fase === 'new' ? 'learning' : novoCard.fase;
        novoCard.proximaRevisao = now + (passos[passoAtual] * 1000);
      } else if (qualidade === 4) {
        // Bom: avança passo
        novoCard.fase = novoCard.fase === 'new' ? 'learning' : novoCard.fase;
        novoCard.passoAtual = (novoCard.passoAtual || 0) + 1;
        if (novoCard.passoAtual >= passos.length) {
          // Graduou! Vai para review
          novoCard.fase = 'review';
          novoCard.intervalo = config.intervaloGraduacao;
          novoCard.repeticoes = 1;
          novoCard.proximaRevisao = now + (novoCard.intervalo * 86400000);
        } else {
          novoCard.proximaRevisao = now + (passos[novoCard.passoAtual] * 1000);
        }
      } else if (qualidade === 5) {
        // Fácil: gradua direto com bonus
        novoCard.fase = 'review';
        novoCard.intervalo = Math.max(config.intervaloGraduacao, 4);
        novoCard.repeticoes = 1;
        novoCard.facilidade = Math.max(1.3, novoCard.facilidade + 0.15);
        novoCard.proximaRevisao = now + (novoCard.intervalo * 86400000);
      }
    } else {
      // ── Fase Review ──
      if (qualidade === 0) {
        // Denovo: volta para relearning
        novoCard.fase = 'relearning';
        novoCard.passoAtual = 0;
        novoCard.intervalo = 1;
        novoCard.repeticoes = 0;
        novoCard.facilidade = Math.max(1.3, novoCard.facilidade - 0.2);
        novoCard.proximaRevisao = now + (passos[0] * 1000);
      } else if (qualidade === 2) {
        // Difícil: intervalo * 1.2, facilidade diminui
        novoCard.facilidade = Math.max(1.3, novoCard.facilidade - 0.15);
        novoCard.intervalo = Math.max(1, Math.round(novoCard.intervalo * 1.2));
        novoCard.repeticoes += 1;
        novoCard.proximaRevisao = now + (novoCard.intervalo * 86400000);
      } else if (qualidade === 4) {
        // Bom: aplica facilidade normalmente
        novoCard.facilidade = Math.max(1.3,
          novoCard.facilidade + (0.1 - (5 - qualidade) * (0.08 + (5 - qualidade) * 0.02))
        );
        if (novoCard.repeticoes === 0) {
          novoCard.intervalo = 1;
        } else if (novoCard.repeticoes === 1) {
          novoCard.intervalo = 6;
        } else {
          novoCard.intervalo = Math.round(novoCard.intervalo * novoCard.facilidade);
        }
        novoCard.repeticoes += 1;
        novoCard.proximaRevisao = now + (novoCard.intervalo * 86400000);
      } else if (qualidade === 5) {
        // Fácil: facilidade sobe, intervalo com bonus
        novoCard.facilidade = Math.max(1.3,
          novoCard.facilidade + (0.1 - (5 - qualidade) * (0.08 + (5 - qualidade) * 0.02))
        );
        if (novoCard.repeticoes === 0) {
          novoCard.intervalo = 1;
        } else if (novoCard.repeticoes === 1) {
          novoCard.intervalo = 6;
        } else {
          novoCard.intervalo = Math.round(novoCard.intervalo * novoCard.facilidade);
        }
        novoCard.intervalo = Math.round(novoCard.intervalo * 1.3);
        novoCard.repeticoes += 1;
        novoCard.facilidade = Math.max(1.3, novoCard.facilidade + 0.15);
        novoCard.proximaRevisao = now + (novoCard.intervalo * 86400000);
      }
    }

    return novoCard;
  }

  // ══════════════════════════════════════
  // Fila de revisão
  // ══════════════════════════════════════

  function contarCardsDevidos(deckId) {
    var data = carregarFlashcards();
    var config = data.config;
    var now = agora();
    var hj = hoje();

    var stats = data.dailyStats[hj] || { novos: 0 };
    var novosHoje = stats.novos || 0;

    var contagem = { novos: 0, aprendendo: 0, revisao: 0 };

    for (var id in data.cards) {
      var card = data.cards[id];
      if (deckId && card.deckId !== deckId) continue;

      if (card.fase === 'new') {
        if (novosHoje < config.novosCardsPorDia) {
          contagem.novos++;
        }
      } else if (card.fase === 'learning' || card.fase === 'relearning') {
        contagem.aprendendo++;
      } else if (card.fase === 'review' && card.proximaRevisao <= now) {
        contagem.revisao++;
      }
    }

    return contagem;
  }

  function construirFila(deckId) {
    var data = carregarFlashcards();
    var config = data.config;
    var now = agora();
    var hj = hoje();

    var stats = data.dailyStats[hj] || { novos: 0 };
    var novosHoje = stats.novos || 0;

    var learning = [];
    var review = [];
    var novos = [];

    for (var id in data.cards) {
      var card = data.cards[id];
      if (deckId && card.deckId !== deckId) continue;

      if (card.fase === 'learning' || card.fase === 'relearning') {
        if (card.proximaRevisao <= now) {
          learning.push(card);
        }
      } else if (card.fase === 'review') {
        if (card.proximaRevisao <= now) {
          review.push(card);
        }
      } else if (card.fase === 'new') {
        if (novosHoje < config.novosCardsPorDia) {
          novos.push(card);
        }
      }
    }

    // Ordenar: learning por proximaRevisao, review por proximaRevisao, novos por criadoEm
    learning.sort(function(a, b) { return a.proximaRevisao - b.proximaRevisao; });
    review.sort(function(a, b) { return a.proximaRevisao - b.proximaRevisao; });
    novos.sort(function(a, b) { return a.criadoEm - b.criadoEm; });

    // Limitar novos
    var limiteNovos = config.novosCardsPorDia - novosHoje;
    if (limiteNovos < 0) limiteNovos = 0;
    novos = novos.slice(0, limiteNovos);

    // Prioridade: learning > review > new
    return learning.concat(review).concat(novos);
  }

  // ══════════════════════════════════════
  // Registrar Review
  // ══════════════════════════════════════

  function registrarReview(cardId, qualidade, tempoMs) {
    var data = carregarFlashcards();
    var card = data.cards[cardId];
    if (!card) return null;

    var intervaloAnterior = card.intervalo;
    var faseAnterior = card.fase;

    // Calcular nova revisão
    var novoCard = calcularProximaRevisao(card, qualidade);

    // Salvar card atualizado
    data.cards[cardId] = novoCard;

    // Registrar no log
    data.reviewLog.push({
      cardId: cardId,
      deckId: novoCard.deckId,
      data: agora(),
      dataStr: hoje(),
      qualidade: qualidade,
      tempoMs: tempoMs || 0,
      intervaloAnterior: intervaloAnterior,
      intervaloNovo: novoCard.intervalo,
      faseAnterior: faseAnterior,
      faseNova: novoCard.fase
    });

    // Limitar log a 5000 entradas
    if (data.reviewLog.length > 5000) {
      data.reviewLog = data.reviewLog.slice(-5000);
    }

    // Atualizar stats do dia
    var hj = hoje();
    if (!data.dailyStats[hj]) {
      data.dailyStats[hj] = { novos: 0, revisados: 0, acertos: 0, erros: 0, tempoTotalMs: 0 };
    }
    var ds = data.dailyStats[hj];
    ds.revisados++;
    ds.tempoTotalMs += (tempoMs || 0);

    if (faseAnterior === 'new') {
      ds.novos++;
    }
    if (qualidade >= 4) {
      ds.acertos++;
    } else {
      ds.erros++;
    }

    salvarFlashcards(data);
    return novoCard;
  }

  // ══════════════════════════════════════
  // Parser Cloze
  // ══════════════════════════════════════

  // Formato: {{c1::resposta}} ou {{c1::resposta::dica}}
  function renderizarCloze(texto, mostrar) {
    if (!texto) return '';
    return texto.replace(/\{\{c(\d+)::([^:}]+)(?:::([^}]+))?\}\}/g, function(match, num, resposta, dica) {
      if (mostrar) {
        return '<span class="cloze-resposta">' + escapeHtml(resposta) + '</span>';
      } else {
        var placeholder = dica ? escapeHtml(dica) : '[...]';
        return '<span class="cloze-blank">' + placeholder + '</span>';
      }
    });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ══════════════════════════════════════
  // Estatísticas
  // ══════════════════════════════════════

  function obterEstatisticas(dias) {
    var data = carregarFlashcards();
    dias = dias || 30;

    var hj = new Date();
    var stats = {
      totalCards: 0,
      totalDecks: 0,
      revisadosHoje: 0,
      novosHoje: 0,
      acertosHoje: 0,
      errosHoje: 0,
      tempoHojeMs: 0,
      // Contadores por fase
      fasesCount: { new: 0, learning: 0, review: 0, relearning: 0 },
      // Gráfico: últimos N dias
      grafico: [],
      // Previsão: próximos 7 dias
      previsao: []
    };

    // Contar decks e cards
    stats.totalDecks = Object.keys(data.decks).length;
    for (var cid in data.cards) {
      stats.totalCards++;
      var fase = data.cards[cid].fase || 'new';
      stats.fasesCount[fase] = (stats.fasesCount[fase] || 0) + 1;
    }

    // Stats de hoje
    var hjStr = hoje();
    var dsHoje = data.dailyStats[hjStr];
    if (dsHoje) {
      stats.revisadosHoje = dsHoje.revisados || 0;
      stats.novosHoje = dsHoje.novos || 0;
      stats.acertosHoje = dsHoje.acertos || 0;
      stats.errosHoje = dsHoje.erros || 0;
      stats.tempoHojeMs = dsHoje.tempoTotalMs || 0;
    }

    // Gráfico dos últimos N dias
    for (var i = dias - 1; i >= 0; i--) {
      var d = new Date(hj);
      d.setDate(d.getDate() - i);
      var dStr = d.toISOString().split('T')[0];
      var ds = data.dailyStats[dStr] || { novos: 0, revisados: 0, acertos: 0, erros: 0, tempoTotalMs: 0 };
      stats.grafico.push({
        data: dStr,
        dia: d.getDate(),
        novos: ds.novos || 0,
        revisados: ds.revisados || 0,
        acertos: ds.acertos || 0,
        erros: ds.erros || 0,
        tempoMs: ds.tempoTotalMs || 0
      });
    }

    // Previsão: próximos 7 dias (cards devidos)
    var now = agora();
    for (var j = 0; j < 7; j++) {
      var futuro = now + (j * 86400000);
      var futuroFim = futuro + 86400000;
      var devidos = 0;
      for (var cid2 in data.cards) {
        var card = data.cards[cid2];
        if (card.fase === 'review' && card.proximaRevisao >= futuro && card.proximaRevisao < futuroFim) {
          devidos++;
        }
      }
      var dFut = new Date(futuro);
      stats.previsao.push({
        data: dFut.toISOString().split('T')[0],
        dia: dFut.getDate(),
        devidos: devidos
      });
    }

    return stats;
  }

  // ══════════════════════════════════════
  // Config
  // ══════════════════════════════════════

  function obterConfig() {
    var data = carregarFlashcards();
    return data.config;
  }

  function salvarConfig(novaConfig) {
    var data = carregarFlashcards();
    for (var k in novaConfig) {
      data.config[k] = novaConfig[k];
    }
    salvarFlashcards(data);
    return data.config;
  }

  // ══════════════════════════════════════
  // Texto de intervalo legível
  // ══════════════════════════════════════

  function textoIntervalo(card, qualidade) {
    var simulado = calcularProximaRevisao(card, qualidade);
    var diffMs = simulado.proximaRevisao - agora();

    if (diffMs < 60000) return '< 1min';
    if (diffMs < 3600000) return Math.round(diffMs / 60000) + 'min';
    if (diffMs < 86400000) return Math.round(diffMs / 3600000) + 'h';
    var dias = Math.round(diffMs / 86400000);
    if (dias === 1) return '1 dia';
    if (dias < 30) return dias + ' dias';
    if (dias < 365) return Math.round(dias / 30) + ' meses';
    return Math.round(dias / 365) + ' anos';
  }

  // ══════════════════════════════════════
  // Hierarquia: Pastas / Sub-decks
  // ══════════════════════════════════════

  function listarDecksRaiz() {
    var data = carregarFlashcards();
    var lista = [];
    for (var id in data.decks) {
      if (!data.decks[id].parentId) lista.push(data.decks[id]);
    }
    lista.sort(function(a, b) { return a.criadoEm - b.criadoEm; });
    return lista;
  }

  function listarSubdecks(parentId) {
    var data = carregarFlashcards();
    var lista = [];
    for (var id in data.decks) {
      if (data.decks[id].parentId === parentId) lista.push(data.decks[id]);
    }
    lista.sort(function(a, b) { return a.criadoEm - b.criadoEm; });
    return lista;
  }

  function temSubdecks(deckId) {
    var data = carregarFlashcards();
    for (var id in data.decks) {
      if (data.decks[id].parentId === deckId) return true;
    }
    return false;
  }

  // IDs do deck + seus filhos
  function _coletarIds(data, parentId) {
    var ids = [parentId];
    for (var id in data.decks) {
      if (data.decks[id].parentId === parentId) ids.push(id);
    }
    return ids;
  }

  function contarCardsDevidosAgregado(parentId) {
    var data = carregarFlashcards();
    var ids = _coletarIds(data, parentId);
    var config = data.config;
    var now = agora();
    var hj = hoje();
    var stats = data.dailyStats[hj] || { novos: 0 };
    var novosHoje = stats.novos || 0;
    var contagem = { novos: 0, aprendendo: 0, revisao: 0 };

    for (var cid in data.cards) {
      var card = data.cards[cid];
      var pertence = false;
      for (var j = 0; j < ids.length; j++) {
        if (card.deckId === ids[j]) { pertence = true; break; }
      }
      if (!pertence) continue;

      if (card.fase === 'new') {
        if (novosHoje < config.novosCardsPorDia) contagem.novos++;
      } else if (card.fase === 'learning' || card.fase === 'relearning') {
        contagem.aprendendo++;
      } else if (card.fase === 'review' && card.proximaRevisao <= now) {
        contagem.revisao++;
      }
    }
    return contagem;
  }

  function construirFilaAgregada(parentId) {
    var data = carregarFlashcards();
    var ids = _coletarIds(data, parentId);
    var config = data.config;
    var now = agora();
    var hj = hoje();
    var stats = data.dailyStats[hj] || { novos: 0 };
    var novosHoje = stats.novos || 0;

    var learning = [], review = [], novos = [];

    for (var cid in data.cards) {
      var card = data.cards[cid];
      var pertence = false;
      for (var j = 0; j < ids.length; j++) {
        if (card.deckId === ids[j]) { pertence = true; break; }
      }
      if (!pertence) continue;

      if (card.fase === 'learning' || card.fase === 'relearning') {
        if (card.proximaRevisao <= now) learning.push(card);
      } else if (card.fase === 'review') {
        if (card.proximaRevisao <= now) review.push(card);
      } else if (card.fase === 'new') {
        if (novosHoje < config.novosCardsPorDia) novos.push(card);
      }
    }

    learning.sort(function(a, b) { return a.proximaRevisao - b.proximaRevisao; });
    review.sort(function(a, b) { return a.proximaRevisao - b.proximaRevisao; });
    novos.sort(function(a, b) { return a.criadoEm - b.criadoEm; });

    var limiteNovos = config.novosCardsPorDia - novosHoje;
    if (limiteNovos < 0) limiteNovos = 0;
    novos = novos.slice(0, limiteNovos);

    return learning.concat(review).concat(novos);
  }

  function contarTotalCardsAgregado(parentId) {
    var data = carregarFlashcards();
    var ids = _coletarIds(data, parentId);
    var count = 0;
    for (var cid in data.cards) {
      for (var j = 0; j < ids.length; j++) {
        if (data.cards[cid].deckId === ids[j]) { count++; break; }
      }
    }
    return count;
  }

  function listarPossiveisPais(excludeDeckId) {
    var data = carregarFlashcards();
    var lista = [];
    for (var id in data.decks) {
      var d = data.decks[id];
      if (!d.parentId && id !== excludeDeckId) lista.push(d);
    }
    lista.sort(function(a, b) { return a.criadoEm - b.criadoEm; });
    return lista;
  }

  // ══════════════════════════════════════
  // Tags + Revisão Personalizada
  // ══════════════════════════════════════

  function listarTodasTags() {
    var data = carregarFlashcards();
    var tagsMap = {};
    for (var cid in data.cards) {
      var tags = data.cards[cid].tags || [];
      for (var i = 0; i < tags.length; i++) {
        var lower = tags[i].toLowerCase();
        if (!tagsMap[lower]) tagsMap[lower] = tags[i];
      }
    }
    var lista = [];
    for (var key in tagsMap) lista.push(tagsMap[key]);
    lista.sort();
    return lista;
  }

  function construirFilaCustom(deckIds, tags) {
    var data = carregarFlashcards();
    var config = data.config;
    var now = agora();
    var hj = hoje();
    var stats = data.dailyStats[hj] || { novos: 0 };
    var novosHoje = stats.novos || 0;

    // Expandir deckIds para incluir sub-decks
    var allDeckIds = {};
    for (var d = 0; d < deckIds.length; d++) {
      var ids = _coletarIds(data, deckIds[d]);
      for (var j = 0; j < ids.length; j++) allDeckIds[ids[j]] = true;
    }

    // Normalizar tags para lowercase
    var tagsLower = [];
    for (var t = 0; t < tags.length; t++) tagsLower.push(tags[t].toLowerCase());

    var seen = {};
    var learning = [], review = [], novos = [];

    for (var cid in data.cards) {
      var card = data.cards[cid];

      // Verificar se o card pertence por deck OU por tag
      var deckMatch = deckIds.length > 0 && allDeckIds[card.deckId];
      var tagMatch = false;
      if (tagsLower.length > 0 && card.tags) {
        for (var i = 0; i < card.tags.length; i++) {
          for (var k = 0; k < tagsLower.length; k++) {
            if (card.tags[i].toLowerCase() === tagsLower[k]) { tagMatch = true; break; }
          }
          if (tagMatch) break;
        }
      }

      if (!deckMatch && !tagMatch) continue;
      if (seen[cid]) continue;
      seen[cid] = true;

      if (card.fase === 'learning' || card.fase === 'relearning') {
        if (card.proximaRevisao <= now) learning.push(card);
      } else if (card.fase === 'review') {
        if (card.proximaRevisao <= now) review.push(card);
      } else if (card.fase === 'new') {
        if (novosHoje < config.novosCardsPorDia) novos.push(card);
      }
    }

    learning.sort(function(a, b) { return a.proximaRevisao - b.proximaRevisao; });
    review.sort(function(a, b) { return a.proximaRevisao - b.proximaRevisao; });
    novos.sort(function(a, b) { return a.criadoEm - b.criadoEm; });

    var limiteNovos = config.novosCardsPorDia - novosHoje;
    if (limiteNovos < 0) limiteNovos = 0;
    novos = novos.slice(0, limiteNovos);

    return learning.concat(review).concat(novos);
  }

  // ══════════════════════════════════════
  // API Pública
  // ══════════════════════════════════════

  window.FlashcardsData = {
    // Storage
    carregar: carregarFlashcards,
    salvar: salvarFlashcards,

    // Decks
    criarDeck: criarDeck,
    editarDeck: editarDeck,
    excluirDeck: excluirDeck,
    obterDeck: obterDeck,
    listarDecks: listarDecks,
    listarDecksRaiz: listarDecksRaiz,
    listarSubdecks: listarSubdecks,
    temSubdecks: temSubdecks,
    contarCardsDevidosAgregado: contarCardsDevidosAgregado,
    construirFilaAgregada: construirFilaAgregada,
    contarTotalCardsAgregado: contarTotalCardsAgregado,
    listarPossiveisPais: listarPossiveisPais,
    listarTodasTags: listarTodasTags,
    construirFilaCustom: construirFilaCustom,
    CORES_DECK: CORES_DECK,
    ICONES_DECK: ICONES_DECK,

    // Cards
    criarCard: criarCard,
    editarCard: editarCard,
    excluirCard: excluirCard,
    obterCard: obterCard,
    listarCards: listarCards,

    // SM-2
    calcularProximaRevisao: calcularProximaRevisao,
    construirFila: construirFila,
    registrarReview: registrarReview,
    contarCardsDevidos: contarCardsDevidos,
    textoIntervalo: textoIntervalo,

    // Cloze
    renderizarCloze: renderizarCloze,
    escapeHtml: escapeHtml,

    // Stats
    obterEstatisticas: obterEstatisticas,

    // Config
    obterConfig: obterConfig,
    salvarConfig: salvarConfig,

    // Helpers
    hoje: hoje
  };

})();

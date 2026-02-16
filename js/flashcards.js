// ============================================
// LuMED - Flashcards: Interface + Interações
// ============================================

(function() {
  'use strict';

  var FD = window.FlashcardsData;
  if (!FD) { console.error('[Flashcards] flashcards-data.js não carregado'); return; }

  // ── Estado ──
  var state = {
    currentView: 'decks',
    currentDeckId: null,
    editingDeckId: null,
    editingCardId: null,
    // Review
    fila: [],
    filaIndex: 0,
    filaTotal: 0,
    reviewDone: 0,
    reviewAcertos: 0,
    reviewErros: 0,
    cardFlipped: false,
    cardStartTime: 0,
    reviewStartTime: 0,
    reviewTimerInterval: null,
    // Modal
    selectedColor: '#6366f1',
    selectedIcon: 'bi-book',
    selectedTipo: 'basico'
  };

  // ══════════════════════════════════════
  // View Routing
  // ══════════════════════════════════════

  function mostrarView(view) {
    var views = ['decks', 'deck-detail', 'review', 'stats'];
    for (var i = 0; i < views.length; i++) {
      var el = document.getElementById('view-' + views[i]);
      if (el) el.style.display = views[i] === view ? '' : 'none';
    }
    state.currentView = view;
    window.scrollTo(0, 0);
  }

  // ══════════════════════════════════════
  // VIEW: Decks
  // ══════════════════════════════════════

  function renderizarDecks() {
    var decks = FD.listarDecks();
    var grid = document.getElementById('fc-decks-grid');
    var empty = document.getElementById('fc-empty-decks');

    if (!decks.length) {
      grid.style.display = 'none';
      empty.style.display = '';
      renderizarStatsBar();
      return;
    }

    grid.style.display = '';
    empty.style.display = 'none';

    var html = '';
    for (var i = 0; i < decks.length; i++) {
      var deck = decks[i];
      var contagem = FD.contarCardsDevidos(deck.id);
      var totalCards = FD.listarCards(deck.id).length;

      html += '<div class="fc-deck-card" data-deck-id="' + deck.id + '" style="--deck-color:' + deck.cor + '; --deck-color-bg:' + hexToRgba(deck.cor, 0.15) + ';">';
      html += '<div class="fc-deck-header">';
      html += '<div class="fc-deck-icon"><i class="bi ' + deck.icone + '"></i></div>';
      html += '<div class="fc-deck-title">' + FD.escapeHtml(deck.nome) + '</div>';
      html += '</div>';
      if (deck.descricao) {
        html += '<div class="fc-deck-desc">' + FD.escapeHtml(deck.descricao) + '</div>';
      } else {
        html += '<div class="fc-deck-desc">' + totalCards + ' card' + (totalCards !== 1 ? 's' : '') + '</div>';
      }
      html += '<div class="fc-deck-badges">';
      if (contagem.novos > 0) html += '<span class="fc-badge novos"><i class="bi bi-star-fill"></i> ' + contagem.novos + '</span>';
      if (contagem.aprendendo > 0) html += '<span class="fc-badge aprendendo"><i class="bi bi-arrow-repeat"></i> ' + contagem.aprendendo + '</span>';
      if (contagem.revisao > 0) html += '<span class="fc-badge revisao"><i class="bi bi-check2-circle"></i> ' + contagem.revisao + '</span>';
      if (contagem.novos === 0 && contagem.aprendendo === 0 && contagem.revisao === 0) {
        html += '<span class="fc-badge" style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);"><i class="bi bi-check-lg"></i> Em dia</span>';
      }
      html += '</div>';
      html += '</div>';
    }

    grid.innerHTML = html;

    // Click nos decks
    var cards = grid.querySelectorAll('.fc-deck-card');
    for (var j = 0; j < cards.length; j++) {
      cards[j].addEventListener('click', function() {
        abrirDetalhesDeck(this.getAttribute('data-deck-id'));
      });
    }

    renderizarStatsBar();
  }

  function renderizarStatsBar() {
    var stats = FD.obterEstatisticas(1);
    var contagem = FD.contarCardsDevidos(null);

    var elNovos = document.getElementById('stat-novos-dia');
    var elAprendendo = document.getElementById('stat-aprendendo');
    var elRevisao = document.getElementById('stat-revisao-dia');
    var elTempo = document.getElementById('stat-tempo-dia');

    if (elNovos) elNovos.textContent = contagem.novos;
    if (elAprendendo) elAprendendo.textContent = contagem.aprendendo;
    if (elRevisao) elRevisao.textContent = contagem.revisao;
    if (elTempo) elTempo.textContent = formatarTempo(stats.tempoHojeMs);
  }

  // ══════════════════════════════════════
  // VIEW: Deck Detail
  // ══════════════════════════════════════

  function abrirDetalhesDeck(deckId) {
    state.currentDeckId = deckId;
    mostrarView('deck-detail');
    renderizarDetalhesDeck(deckId);
  }

  function renderizarDetalhesDeck(deckId) {
    var deck = FD.obterDeck(deckId);
    if (!deck) { mostrarView('decks'); return; }

    document.getElementById('deck-detail-nome').textContent = deck.nome;
    document.getElementById('deck-detail-desc').textContent = deck.descricao || '';

    var contagem = FD.contarCardsDevidos(deckId);
    document.getElementById('deck-count-novos').textContent = contagem.novos;
    document.getElementById('deck-count-aprendendo').textContent = contagem.aprendendo;
    document.getElementById('deck-count-revisao').textContent = contagem.revisao;

    var total = contagem.novos + contagem.aprendendo + contagem.revisao;
    var reviewStart = document.getElementById('fc-review-start');
    if (reviewStart) reviewStart.style.display = total > 0 ? '' : 'none';

    // Lista de cards
    var cards = FD.listarCards(deckId);
    var lista = document.getElementById('fc-cards-list');
    var empty = document.getElementById('fc-empty-cards');

    if (!cards.length) {
      lista.style.display = 'none';
      empty.style.display = '';
      return;
    }

    lista.style.display = '';
    empty.style.display = 'none';

    var html = '';
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var preview = obterPreviewCard(card);
      var faseText = card.fase === 'new' ? 'Novo' :
                     card.fase === 'learning' ? 'Aprendendo' :
                     card.fase === 'relearning' ? 'Reaprendendo' :
                     'Revisão (i=' + card.intervalo + 'd)';

      html += '<div class="fc-card-item" data-card-id="' + card.id + '">';
      html += '<span class="fc-card-tipo-badge ' + card.tipo + '">' + card.tipo + '</span>';
      html += '<div class="fc-card-item-content">';
      html += '<div class="fc-card-item-front">' + FD.escapeHtml(preview) + '</div>';
      html += '<div class="fc-card-item-meta">' + faseText + '</div>';
      html += '</div>';
      html += '<div class="fc-card-item-actions">';
      html += '<button class="edit" data-card-id="' + card.id + '" title="Editar"><i class="bi bi-pencil"></i></button>';
      html += '<button class="delete" data-card-id="' + card.id + '" title="Excluir"><i class="bi bi-trash"></i></button>';
      html += '</div>';
      html += '</div>';
    }

    lista.innerHTML = html;

    // Eventos nos botões
    var editBtns = lista.querySelectorAll('button.edit');
    for (var j = 0; j < editBtns.length; j++) {
      editBtns[j].addEventListener('click', function(e) {
        e.stopPropagation();
        abrirModalCard(this.getAttribute('data-card-id'));
      });
    }
    var delBtns = lista.querySelectorAll('button.delete');
    for (var k = 0; k < delBtns.length; k++) {
      delBtns[k].addEventListener('click', function(e) {
        e.stopPropagation();
        var cid = this.getAttribute('data-card-id');
        confirmar('Excluir card', 'Tem certeza que deseja excluir este card?', function() {
          FD.excluirCard(cid);
          renderizarDetalhesDeck(state.currentDeckId);
        });
      });
    }
  }

  function obterPreviewCard(card) {
    if (card.tipo === 'cloze') {
      return (card.frente || '').replace(/\{\{c\d+::([^:}]+)(?:::[^}]+)?\}\}/g, '[$1]');
    }
    return card.frente || '(vazio)';
  }

  // ══════════════════════════════════════
  // VIEW: Review
  // ══════════════════════════════════════

  function iniciarRevisao(deckId) {
    var fila = FD.construirFila(deckId);
    if (!fila.length) return;

    state.fila = fila;
    state.filaIndex = 0;
    state.filaTotal = fila.length;
    state.reviewDone = 0;
    state.reviewAcertos = 0;
    state.reviewErros = 0;
    state.reviewStartTime = Date.now();

    mostrarView('review');

    // Esconder review done
    document.getElementById('fc-review-done').style.display = 'none';
    document.getElementById('fc-review-card').parentElement.style.display = '';
    document.getElementById('fc-reveal-actions').style.display = '';

    // Timer
    if (state.reviewTimerInterval) clearInterval(state.reviewTimerInterval);
    state.reviewTimerInterval = setInterval(atualizarTimer, 1000);
    atualizarTimer();

    mostrarProximoCard();
  }

  function mostrarProximoCard() {
    if (state.filaIndex >= state.fila.length) {
      finalizarRevisao();
      return;
    }

    // Re-check se learning cards voltaram
    var card = FD.obterCard(state.fila[state.filaIndex].id);
    if (!card) {
      state.filaIndex++;
      mostrarProximoCard();
      return;
    }

    state.cardFlipped = false;
    state.cardStartTime = Date.now();

    // Reset flip
    var inner = document.getElementById('fc-card-inner');
    inner.classList.remove('flipped');

    // Mostrar conteúdo frente
    var frontContent = document.getElementById('fc-card-front-content');
    var backContent = document.getElementById('fc-card-back-content');
    var frontImage = document.getElementById('fc-card-front-image');
    var backImage = document.getElementById('fc-card-back-image');
    var badge = document.getElementById('fc-card-badge');

    frontImage.style.display = 'none';
    backImage.style.display = 'none';

    if (card.tipo === 'cloze') {
      badge.textContent = 'Cloze';
      frontContent.innerHTML = FD.renderizarCloze(card.frente, false);
      backContent.innerHTML = FD.renderizarCloze(card.frente, true);
      if (card.verso) {
        backContent.innerHTML += '<div style="margin-top:1rem;font-size:0.85rem;color:rgba(255,255,255,0.5);">' + FD.escapeHtml(card.verso) + '</div>';
      }
    } else if (card.tipo === 'imagem') {
      badge.textContent = 'Imagem';
      frontContent.innerHTML = card.frente ? FD.escapeHtml(card.frente) : '';
      if (card.imagemFrente) {
        frontImage.style.display = '';
        frontImage.innerHTML = '<img src="' + FD.escapeHtml(card.imagemFrente) + '" alt="Card image" onerror="this.style.display=\'none\'">';
      }
      backContent.innerHTML = card.verso ? FD.escapeHtml(card.verso) : '';
      if (card.imagemVerso) {
        backImage.style.display = '';
        backImage.innerHTML = '<img src="' + FD.escapeHtml(card.imagemVerso) + '" alt="Card image" onerror="this.style.display=\'none\'">';
      }
    } else {
      badge.textContent = 'Frente';
      frontContent.innerHTML = FD.escapeHtml(card.frente || '');
      backContent.innerHTML = FD.escapeHtml(card.verso || '');
    }

    // Mostrar botão revelar, esconder rating
    document.getElementById('fc-reveal-actions').style.display = '';
    document.getElementById('fc-rating-actions').style.display = 'none';

    // Progresso
    atualizarProgresso();

    // Calcular tempos previstos
    atualizarTemposRating(card);
  }

  function revelarResposta() {
    if (state.cardFlipped) return;
    state.cardFlipped = true;

    document.getElementById('fc-card-inner').classList.add('flipped');
    document.getElementById('fc-reveal-actions').style.display = 'none';
    document.getElementById('fc-rating-actions').style.display = '';
  }

  function avaliarCard(qualidade) {
    if (!state.cardFlipped) return;

    var card = state.fila[state.filaIndex];
    var tempoMs = Date.now() - state.cardStartTime;

    var novoCard = FD.registrarReview(card.id, qualidade, tempoMs);

    state.reviewDone++;
    if (qualidade >= 4) {
      state.reviewAcertos++;
    } else {
      state.reviewErros++;
    }

    // Se o card foi para learning/relearning, re-adicioná-lo à fila
    if (novoCard && (novoCard.fase === 'learning' || novoCard.fase === 'relearning')) {
      state.fila.push(novoCard);
    }

    state.filaIndex++;
    mostrarProximoCard();
  }

  function atualizarTemposRating(card) {
    var qualidades = [0, 2, 4, 5];
    for (var i = 0; i < qualidades.length; i++) {
      var el = document.getElementById('rating-time-' + qualidades[i]);
      if (el) {
        el.textContent = FD.textoIntervalo(card, qualidades[i]);
      }
    }
  }

  function atualizarProgresso() {
    var total = state.filaTotal;
    var done = state.reviewDone;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;

    var fill = document.getElementById('review-progress-fill');
    var text = document.getElementById('review-progress-text');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = done + '/' + total;
  }

  function atualizarTimer() {
    var elapsed = Math.floor((Date.now() - state.reviewStartTime) / 1000);
    var min = Math.floor(elapsed / 60);
    var sec = elapsed % 60;
    var el = document.getElementById('review-timer');
    if (el) el.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function finalizarRevisao() {
    if (state.reviewTimerInterval) {
      clearInterval(state.reviewTimerInterval);
      state.reviewTimerInterval = null;
    }

    // Esconder card, mostrar done
    document.getElementById('fc-review-card').parentElement.style.display = 'none';
    document.getElementById('fc-reveal-actions').style.display = 'none';
    document.getElementById('fc-rating-actions').style.display = 'none';
    document.getElementById('fc-review-done').style.display = '';

    var elapsed = Math.floor((Date.now() - state.reviewStartTime) / 1000);
    var doneStats = document.getElementById('fc-done-stats');
    doneStats.innerHTML = '' +
      '<div class="fc-done-stat"><span class="fc-done-stat-value">' + state.reviewDone + '</span><span class="fc-done-stat-label">Revisados</span></div>' +
      '<div class="fc-done-stat"><span class="fc-done-stat-value" style="color:#4ade80">' + state.reviewAcertos + '</span><span class="fc-done-stat-label">Acertos</span></div>' +
      '<div class="fc-done-stat"><span class="fc-done-stat-value" style="color:#f87171">' + state.reviewErros + '</span><span class="fc-done-stat-label">Erros</span></div>' +
      '<div class="fc-done-stat"><span class="fc-done-stat-value">' + formatarTempo(elapsed * 1000) + '</span><span class="fc-done-stat-label">Tempo total</span></div>';
  }

  // ══════════════════════════════════════
  // VIEW: Estatísticas
  // ══════════════════════════════════════

  function renderizarEstatisticas() {
    var stats = FD.obterEstatisticas(30);

    // Stat cards
    document.getElementById('stats-total-cards').textContent = stats.totalCards;
    document.getElementById('stats-revisados-hoje').textContent = stats.revisadosHoje;

    var taxa = stats.revisadosHoje > 0 ? Math.round((stats.acertosHoje / stats.revisadosHoje) * 100) : 0;
    document.getElementById('stats-taxa-acerto').textContent = taxa + '%';

    var tempoMedio = stats.revisadosHoje > 0 ? Math.round(stats.tempoHojeMs / stats.revisadosHoje / 1000) : 0;
    document.getElementById('stats-tempo-medio').textContent = tempoMedio + 's';

    // Gráfico de revisões (últimos 30 dias)
    renderizarGraficoRevisoes(stats.grafico);

    // Gráfico de previsão
    renderizarGraficoPrevisao(stats.previsao);

    // Fases bar
    renderizarFasesBar(stats.fasesCount, stats.totalCards);
  }

  function renderizarGraficoRevisoes(grafico) {
    var container = document.getElementById('fc-chart-reviews');
    if (!container) return;

    var maxVal = 1;
    for (var i = 0; i < grafico.length; i++) {
      var total = (grafico[i].acertos || 0) + (grafico[i].erros || 0);
      if (total > maxVal) maxVal = total;
    }

    var html = '';
    for (var j = 0; j < grafico.length; j++) {
      var d = grafico[j];
      var acertos = d.acertos || 0;
      var erros = d.erros || 0;
      var total = acertos + erros;
      var hPct = total > 0 ? Math.max(2, (total / maxVal) * 100) : 0;
      var acPct = total > 0 ? (acertos / total) * 100 : 0;
      var erPct = total > 0 ? (erros / total) * 100 : 0;

      html += '<div class="fc-chart-bar">';
      if (total > 0) {
        html += '<div class="fc-bar-stack" style="height:' + hPct + '%;">';
        html += '<div class="fc-bar-acertos" style="height:' + acPct + '%;"></div>';
        html += '<div class="fc-bar-erros" style="height:' + erPct + '%;"></div>';
        html += '</div>';
      }
      if (j % 5 === 0 || j === grafico.length - 1) {
        html += '<span class="fc-bar-label">' + d.dia + '</span>';
      }
      html += '</div>';
    }

    container.innerHTML = html;
  }

  function renderizarGraficoPrevisao(previsao) {
    var container = document.getElementById('fc-chart-forecast');
    if (!container) return;

    var maxVal = 1;
    for (var i = 0; i < previsao.length; i++) {
      if (previsao[i].devidos > maxVal) maxVal = previsao[i].devidos;
    }

    var diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    var html = '';
    for (var j = 0; j < previsao.length; j++) {
      var d = previsao[j];
      var hPct = d.devidos > 0 ? Math.max(5, (d.devidos / maxVal) * 100) : 0;
      var dia = new Date(d.data);
      var label = j === 0 ? 'Hoje' : diasSemana[dia.getDay()];

      html += '<div class="fc-chart-bar">';
      html += '<div class="fc-bar-stack" style="height:' + hPct + '%;">';
      if (d.devidos > 0) {
        html += '<div class="fc-bar-forecast" style="height:100%;"></div>';
      }
      html += '</div>';
      html += '<span class="fc-bar-label">' + label + '</span>';
      html += '</div>';
    }

    container.innerHTML = html;
  }

  function renderizarFasesBar(fasesCount, total) {
    var container = document.getElementById('fc-phases-bar');
    if (!container || total === 0) {
      if (container) container.innerHTML = '<div class="fc-phase-segment" style="width:100%;background:rgba(255,255,255,0.06);"></div>';
      return;
    }

    var newPct = Math.round((fasesCount['new'] || 0) / total * 100);
    var learnPct = Math.round(((fasesCount.learning || 0) + (fasesCount.relearning || 0)) / total * 100);
    var reviewPct = 100 - newPct - learnPct;

    var html = '';
    if (newPct > 0) html += '<div class="fc-phase-segment new" style="width:' + newPct + '%;">' + (newPct > 8 ? newPct + '%' : '') + '</div>';
    if (learnPct > 0) html += '<div class="fc-phase-segment learning" style="width:' + learnPct + '%;">' + (learnPct > 8 ? learnPct + '%' : '') + '</div>';
    if (reviewPct > 0) html += '<div class="fc-phase-segment review" style="width:' + reviewPct + '%;">' + (reviewPct > 8 ? reviewPct + '%' : '') + '</div>';

    container.innerHTML = html;
  }

  // ══════════════════════════════════════
  // Modais: Deck
  // ══════════════════════════════════════

  function abrirModalDeck(deckId) {
    var modal = document.getElementById('modal-deck');
    var title = document.getElementById('modal-deck-title');
    var inputNome = document.getElementById('input-deck-nome');
    var inputDesc = document.getElementById('input-deck-desc');

    state.editingDeckId = deckId || null;

    if (deckId) {
      var deck = FD.obterDeck(deckId);
      if (!deck) return;
      title.textContent = 'Editar Deck';
      inputNome.value = deck.nome;
      inputDesc.value = deck.descricao || '';
      state.selectedColor = deck.cor;
      state.selectedIcon = deck.icone;
    } else {
      title.textContent = 'Novo Deck';
      inputNome.value = '';
      inputDesc.value = '';
      state.selectedColor = FD.CORES_DECK[Math.floor(Math.random() * FD.CORES_DECK.length)];
      state.selectedIcon = 'bi-book';
    }

    renderizarColorPicker();
    renderizarIconPicker();
    modal.style.display = '';
    inputNome.focus();
  }

  function fecharModalDeck() {
    document.getElementById('modal-deck').style.display = 'none';
    state.editingDeckId = null;
  }

  function salvarDeck() {
    var nome = document.getElementById('input-deck-nome').value.trim();
    if (!nome) return;

    var desc = document.getElementById('input-deck-desc').value.trim();

    if (state.editingDeckId) {
      FD.editarDeck(state.editingDeckId, {
        nome: nome,
        descricao: desc,
        cor: state.selectedColor,
        icone: state.selectedIcon
      });
    } else {
      FD.criarDeck(nome, desc, state.selectedColor, state.selectedIcon);
    }

    fecharModalDeck();
    renderizarDecks();

    if (state.currentView === 'deck-detail' && state.currentDeckId) {
      renderizarDetalhesDeck(state.currentDeckId);
    }
  }

  function renderizarColorPicker() {
    var container = document.getElementById('fc-color-picker');
    var html = '';
    for (var i = 0; i < FD.CORES_DECK.length; i++) {
      var c = FD.CORES_DECK[i];
      var sel = c === state.selectedColor ? ' selected' : '';
      html += '<div class="fc-color-option' + sel + '" data-color="' + c + '" style="background:' + c + ';"></div>';
    }
    container.innerHTML = html;

    var opts = container.querySelectorAll('.fc-color-option');
    for (var j = 0; j < opts.length; j++) {
      opts[j].addEventListener('click', function() {
        state.selectedColor = this.getAttribute('data-color');
        renderizarColorPicker();
      });
    }
  }

  function renderizarIconPicker() {
    var container = document.getElementById('fc-icon-picker');
    var html = '';
    for (var i = 0; i < FD.ICONES_DECK.length; i++) {
      var ic = FD.ICONES_DECK[i];
      var sel = ic === state.selectedIcon ? ' selected' : '';
      html += '<div class="fc-icon-option' + sel + '" data-icon="' + ic + '"><i class="bi ' + ic + '"></i></div>';
    }
    container.innerHTML = html;

    var opts = container.querySelectorAll('.fc-icon-option');
    for (var j = 0; j < opts.length; j++) {
      opts[j].addEventListener('click', function() {
        state.selectedIcon = this.getAttribute('data-icon');
        renderizarIconPicker();
      });
    }
  }

  // ══════════════════════════════════════
  // Modais: Card
  // ══════════════════════════════════════

  function abrirModalCard(cardId) {
    var modal = document.getElementById('modal-card');
    var title = document.getElementById('modal-card-title');

    state.editingCardId = cardId || null;

    // Limpar campos
    document.getElementById('input-card-frente').value = '';
    document.getElementById('input-card-verso').value = '';
    document.getElementById('input-card-cloze').value = '';
    document.getElementById('input-card-img-frente').value = '';
    document.getElementById('input-card-frente-img').value = '';
    document.getElementById('input-card-verso-img').value = '';
    document.getElementById('input-card-tags').value = '';

    if (cardId) {
      var card = FD.obterCard(cardId);
      if (!card) return;
      title.textContent = 'Editar Card';
      state.selectedTipo = card.tipo || 'basico';

      if (card.tipo === 'cloze') {
        document.getElementById('input-card-cloze').value = card.frente || '';
      } else if (card.tipo === 'imagem') {
        document.getElementById('input-card-img-frente').value = card.imagemFrente || '';
        document.getElementById('input-card-frente-img').value = card.frente || '';
        document.getElementById('input-card-verso-img').value = card.verso || '';
      } else {
        document.getElementById('input-card-frente').value = card.frente || '';
        document.getElementById('input-card-verso').value = card.verso || '';
      }

      document.getElementById('input-card-tags').value = (card.tags || []).join(', ');
    } else {
      title.textContent = 'Novo Card';
      state.selectedTipo = 'basico';
    }

    atualizarTipoTabs();
    modal.style.display = '';
  }

  function fecharModalCard() {
    document.getElementById('modal-card').style.display = 'none';
    state.editingCardId = null;
  }

  function atualizarTipoTabs() {
    var tabs = document.querySelectorAll('.fc-tipo-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-tipo') === state.selectedTipo);
    }

    document.getElementById('fields-basico').style.display = state.selectedTipo === 'basico' ? '' : 'none';
    document.getElementById('fields-cloze').style.display = state.selectedTipo === 'cloze' ? '' : 'none';
    document.getElementById('fields-imagem').style.display = state.selectedTipo === 'imagem' ? '' : 'none';
  }

  function salvarCard() {
    var campos = {
      tipo: state.selectedTipo,
      tags: document.getElementById('input-card-tags').value.split(',').map(function(t) { return t.trim(); }).filter(Boolean)
    };

    if (state.selectedTipo === 'cloze') {
      campos.frente = document.getElementById('input-card-cloze').value.trim();
      if (!campos.frente) return;
      campos.verso = '';
    } else if (state.selectedTipo === 'imagem') {
      campos.imagemFrente = document.getElementById('input-card-img-frente').value.trim();
      campos.frente = document.getElementById('input-card-frente-img').value.trim();
      campos.verso = document.getElementById('input-card-verso-img').value.trim();
      if (!campos.imagemFrente && !campos.frente) return;
    } else {
      campos.frente = document.getElementById('input-card-frente').value.trim();
      campos.verso = document.getElementById('input-card-verso').value.trim();
      if (!campos.frente) return;
    }

    if (state.editingCardId) {
      FD.editarCard(state.editingCardId, campos);
    } else {
      FD.criarCard(state.currentDeckId, campos);
    }

    fecharModalCard();
    renderizarDetalhesDeck(state.currentDeckId);
  }

  // ══════════════════════════════════════
  // Modal: Confirmação
  // ══════════════════════════════════════

  var _confirmCallback = null;

  function confirmar(titulo, msg, callback) {
    _confirmCallback = callback;
    document.getElementById('confirm-title').textContent = titulo;
    document.getElementById('confirm-msg').textContent = msg;
    document.getElementById('modal-confirm').style.display = '';
  }

  function fecharConfirm() {
    document.getElementById('modal-confirm').style.display = 'none';
    _confirmCallback = null;
  }

  // ══════════════════════════════════════
  // Helpers
  // ══════════════════════════════════════

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function formatarTempo(ms) {
    if (!ms) return '0min';
    var sec = Math.floor(ms / 1000);
    if (sec < 60) return sec + 's';
    var min = Math.floor(sec / 60);
    if (min < 60) return min + 'min';
    var h = Math.floor(min / 60);
    var m = min % 60;
    return h + 'h' + (m > 0 ? m + 'min' : '');
  }

  // ══════════════════════════════════════
  // Atalhos de Teclado
  // ══════════════════════════════════════

  document.addEventListener('keydown', function(e) {
    if (state.currentView !== 'review') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Esconder review done state
    if (document.getElementById('fc-review-done').style.display !== 'none') return;

    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      if (!state.cardFlipped) {
        revelarResposta();
      }
    } else if (e.key === '1') {
      e.preventDefault();
      if (state.cardFlipped) avaliarCard(0);
    } else if (e.key === '2') {
      e.preventDefault();
      if (state.cardFlipped) avaliarCard(2);
    } else if (e.key === '3') {
      e.preventDefault();
      if (state.cardFlipped) avaliarCard(4);
    } else if (e.key === '4') {
      e.preventDefault();
      if (state.cardFlipped) avaliarCard(5);
    }
  });

  // ══════════════════════════════════════
  // Event Listeners
  // ══════════════════════════════════════

  function init() {
    // ── Botões: Decks View ──
    var btnNovoDeck = document.getElementById('btn-novo-deck');
    var btnNovoDeckEmpty = document.getElementById('btn-novo-deck-empty');
    var btnStats = document.getElementById('btn-stats');

    if (btnNovoDeck) btnNovoDeck.addEventListener('click', function() { abrirModalDeck(null); });
    if (btnNovoDeckEmpty) btnNovoDeckEmpty.addEventListener('click', function() { abrirModalDeck(null); });
    if (btnStats) btnStats.addEventListener('click', function() { mostrarView('stats'); renderizarEstatisticas(); });

    // ── Botões: Deck Detail ──
    var btnVoltarDecks = document.getElementById('btn-voltar-decks');
    var btnEditarDeck = document.getElementById('btn-editar-deck-detail');
    var btnExcluirDeck = document.getElementById('btn-excluir-deck-detail');
    var btnNovoCard = document.getElementById('btn-novo-card');
    var btnNovoCardEmpty = document.getElementById('btn-novo-card-empty');
    var btnIniciarRevisao = document.getElementById('btn-iniciar-revisao');

    if (btnVoltarDecks) btnVoltarDecks.addEventListener('click', function() { mostrarView('decks'); renderizarDecks(); });
    if (btnEditarDeck) btnEditarDeck.addEventListener('click', function() { abrirModalDeck(state.currentDeckId); });
    if (btnExcluirDeck) btnExcluirDeck.addEventListener('click', function() {
      confirmar('Excluir deck', 'Todos os cards serão excluídos. Deseja continuar?', function() {
        FD.excluirDeck(state.currentDeckId);
        state.currentDeckId = null;
        mostrarView('decks');
        renderizarDecks();
      });
    });
    if (btnNovoCard) btnNovoCard.addEventListener('click', function() { abrirModalCard(null); });
    if (btnNovoCardEmpty) btnNovoCardEmpty.addEventListener('click', function() { abrirModalCard(null); });
    if (btnIniciarRevisao) btnIniciarRevisao.addEventListener('click', function() { iniciarRevisao(state.currentDeckId); });

    // ── Botões: Review ──
    var btnSairRevisao = document.getElementById('btn-sair-revisao');
    var btnRevelar = document.getElementById('btn-revelar');
    var btnVoltarDeck = document.getElementById('btn-voltar-deck');

    if (btnSairRevisao) btnSairRevisao.addEventListener('click', function() {
      if (state.reviewTimerInterval) clearInterval(state.reviewTimerInterval);
      abrirDetalhesDeck(state.currentDeckId);
    });
    if (btnRevelar) btnRevelar.addEventListener('click', revelarResposta);
    if (btnVoltarDeck) btnVoltarDeck.addEventListener('click', function() { abrirDetalhesDeck(state.currentDeckId); });

    // Click no card para revelar
    var reviewCard = document.getElementById('fc-review-card');
    if (reviewCard) reviewCard.addEventListener('click', function() {
      if (!state.cardFlipped) revelarResposta();
    });

    // Botões de avaliação
    var ratingBtns = document.querySelectorAll('.fc-btn-rating');
    for (var i = 0; i < ratingBtns.length; i++) {
      ratingBtns[i].addEventListener('click', function() {
        var q = parseInt(this.getAttribute('data-quality'));
        avaliarCard(q);
      });
    }

    // ── Botões: Stats ──
    var btnVoltarStats = document.getElementById('btn-voltar-stats');
    if (btnVoltarStats) btnVoltarStats.addEventListener('click', function() { mostrarView('decks'); renderizarDecks(); });

    // ── Modal Deck ──
    var modalDeckClose = document.getElementById('modal-deck-close');
    var modalDeckCancel = document.getElementById('modal-deck-cancel');
    var modalDeckSave = document.getElementById('modal-deck-save');

    if (modalDeckClose) modalDeckClose.addEventListener('click', fecharModalDeck);
    if (modalDeckCancel) modalDeckCancel.addEventListener('click', fecharModalDeck);
    if (modalDeckSave) modalDeckSave.addEventListener('click', salvarDeck);

    // ── Modal Card ──
    var modalCardClose = document.getElementById('modal-card-close');
    var modalCardCancel = document.getElementById('modal-card-cancel');
    var modalCardSave = document.getElementById('modal-card-save');

    if (modalCardClose) modalCardClose.addEventListener('click', fecharModalCard);
    if (modalCardCancel) modalCardCancel.addEventListener('click', fecharModalCard);
    if (modalCardSave) modalCardSave.addEventListener('click', salvarCard);

    // Tipo tabs
    var tipoTabs = document.querySelectorAll('.fc-tipo-tab');
    for (var j = 0; j < tipoTabs.length; j++) {
      tipoTabs[j].addEventListener('click', function() {
        state.selectedTipo = this.getAttribute('data-tipo');
        atualizarTipoTabs();
      });
    }

    // ── Modal Confirm ──
    var confirmCancel = document.getElementById('confirm-cancel');
    var confirmOk = document.getElementById('confirm-ok');

    if (confirmCancel) confirmCancel.addEventListener('click', fecharConfirm);
    if (confirmOk) confirmOk.addEventListener('click', function() {
      if (_confirmCallback) _confirmCallback();
      fecharConfirm();
    });

    // ── Fechar modais clicando no overlay ──
    var overlays = document.querySelectorAll('.fc-modal-overlay');
    for (var k = 0; k < overlays.length; k++) {
      overlays[k].addEventListener('click', function(e) {
        if (e.target === this) {
          this.style.display = 'none';
        }
      });
    }

    // Enter nas inputs do modal deck para salvar
    var inputDeckNome = document.getElementById('input-deck-nome');
    if (inputDeckNome) {
      inputDeckNome.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') salvarDeck();
      });
    }

    // ── Render inicial ──
    mostrarView('decks');
    renderizarDecks();
  }

  // ── Iniciar ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

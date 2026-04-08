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
    selectedTipo: 'basico',
    imgSource: 'upload',
    uploadedImageData: null,
    // Hierarquia
    currentParentId: null,
    selectedParentId: null,
    // Custom Review
    customSelectedDecks: [],
    customSelectedTags: [],
    customIsActive: false
  };

  // ══════════════════════════════════════
  // View Routing
  // ══════════════════════════════════════

  function mostrarView(view) {
    var views = ['decks', 'subdecks', 'deck-detail', 'review', 'stats', 'custom-review'];
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
    var decks = FD.listarDecksRaiz();
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
      var isParent = FD.temSubdecks(deck.id);
      var contagem, totalCards;

      if (isParent) {
        contagem = FD.contarCardsDevidosAgregado(deck.id);
        totalCards = FD.contarTotalCardsAgregado(deck.id);
      } else {
        contagem = FD.contarCardsDevidos(deck.id);
        totalCards = FD.listarCards(deck.id).length;
      }

      html += '<div class="fc-deck-card" data-deck-id="' + deck.id + '" style="--deck-color:' + deck.cor + '; --deck-color-bg:' + hexToRgba(deck.cor, 0.15) + ';">';
      if (isParent) html += '<span class="fc-folder-indicator"><i class="bi bi-folder-fill"></i></span>';
      html += '<div class="fc-deck-header">';
      html += '<div class="fc-deck-icon"><i class="bi ' + deck.icone + '"></i></div>';
      html += '<div class="fc-deck-title">' + FD.escapeHtml(deck.nome) + '</div>';
      html += '</div>';
      if (deck.descricao) {
        html += '<div class="fc-deck-desc">' + FD.escapeHtml(deck.descricao) + '</div>';
      } else if (isParent) {
        var numSub = FD.listarSubdecks(deck.id).length;
        html += '<div class="fc-deck-desc">' + numSub + ' sub-deck' + (numSub !== 1 ? 's' : '') + ' &middot; ' + totalCards + ' card' + (totalCards !== 1 ? 's' : '') + '</div>';
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
        var deckId = this.getAttribute('data-deck-id');
        if (FD.temSubdecks(deckId)) {
          abrirSubdecks(deckId);
        } else {
          abrirDetalhesDeck(deckId);
        }
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
  // VIEW: Sub-decks (dentro de pasta)
  // ══════════════════════════════════════

  function abrirSubdecks(parentId) {
    state.currentParentId = parentId;
    state.currentDeckId = null;
    mostrarView('subdecks');
    renderizarSubdecks(parentId);
  }

  function renderizarSubdecks(parentId) {
    var parent = FD.obterDeck(parentId);
    if (!parent) { mostrarView('decks'); renderizarDecks(); return; }

    // Breadcrumb + header
    var elBreadcrumb = document.getElementById('breadcrumb-parent-nome');
    var elNome = document.getElementById('subdeck-parent-nome');
    var elDesc = document.getElementById('subdeck-parent-desc');
    if (elBreadcrumb) elBreadcrumb.textContent = parent.nome;
    if (elNome) elNome.textContent = parent.nome;
    if (elDesc) elDesc.textContent = parent.descricao || '';

    // Contadores agregados
    var contagem = FD.contarCardsDevidosAgregado(parentId);
    var elNovos = document.getElementById('subdeck-count-novos');
    var elAprendendo = document.getElementById('subdeck-count-aprendendo');
    var elRevisao = document.getElementById('subdeck-count-revisao');
    if (elNovos) elNovos.textContent = contagem.novos;
    if (elAprendendo) elAprendendo.textContent = contagem.aprendendo;
    if (elRevisao) elRevisao.textContent = contagem.revisao;

    // Botao revisar tudo
    var total = contagem.novos + contagem.aprendendo + contagem.revisao;
    var reviewAll = document.getElementById('subdeck-review-all');
    var reviewCount = document.getElementById('subdeck-review-count');
    if (reviewAll) reviewAll.style.display = total > 0 ? '' : 'none';
    if (reviewCount) reviewCount.textContent = total;

    // Renderizar sub-decks
    var subdecks = FD.listarSubdecks(parentId);
    var grid = document.getElementById('fc-subdecks-grid');
    var empty = document.getElementById('fc-empty-subdecks');

    if (!subdecks.length) {
      grid.style.display = 'none';
      empty.style.display = '';
      return;
    }

    grid.style.display = '';
    empty.style.display = 'none';

    var html = '';
    for (var i = 0; i < subdecks.length; i++) {
      var deck = subdecks[i];
      var cont = FD.contarCardsDevidos(deck.id);
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
      if (cont.novos > 0) html += '<span class="fc-badge novos"><i class="bi bi-star-fill"></i> ' + cont.novos + '</span>';
      if (cont.aprendendo > 0) html += '<span class="fc-badge aprendendo"><i class="bi bi-arrow-repeat"></i> ' + cont.aprendendo + '</span>';
      if (cont.revisao > 0) html += '<span class="fc-badge revisao"><i class="bi bi-check2-circle"></i> ' + cont.revisao + '</span>';
      if (cont.novos === 0 && cont.aprendendo === 0 && cont.revisao === 0) {
        html += '<span class="fc-badge" style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);"><i class="bi bi-check-lg"></i> Em dia</span>';
      }
      html += '</div>';
      html += '</div>';
    }

    grid.innerHTML = html;

    // Click nos sub-decks -> detalhe
    var cards = grid.querySelectorAll('.fc-deck-card');
    for (var j = 0; j < cards.length; j++) {
      cards[j].addEventListener('click', function() {
        abrirDetalhesDeck(this.getAttribute('data-deck-id'));
      });
    }
  }

  function iniciarRevisaoAgregada(parentId) {
    var fila = FD.construirFilaAgregada(parentId);
    if (!fila.length) return;

    state.currentDeckId = parentId;
    state.fila = fila;
    state.filaIndex = 0;
    state.filaTotal = fila.length;
    state.reviewDone = 0;
    state.reviewAcertos = 0;
    state.reviewErros = 0;
    state.reviewStartTime = Date.now();

    mostrarView('review');

    document.getElementById('fc-review-done').style.display = 'none';
    document.getElementById('fc-review-card').parentElement.style.display = '';
    document.getElementById('fc-reveal-actions').style.display = '';

    if (state.reviewTimerInterval) clearInterval(state.reviewTimerInterval);
    state.reviewTimerInterval = setInterval(atualizarTimer, 1000);
    atualizarTimer();

    mostrarProximoCard();
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
        frontImage.innerHTML = '';
        var imgF = document.createElement('img');
        imgF.alt = 'Card image';
        imgF.onload = function() { this.style.display = ''; };
        imgF.onerror = function() {
          this.style.display = 'none';
          this.parentElement.innerHTML = '<div class="fc-img-error"><i class="bi bi-image"></i><span>Imagem não carregou</span></div>';
        };
        imgF.style.display = 'none';
        frontImage.appendChild(imgF);
        imgF.src = card.imagemFrente;
      }
      backContent.innerHTML = card.verso ? FD.escapeHtml(card.verso) : '';
      if (card.imagemVerso) {
        backImage.style.display = '';
        backImage.innerHTML = '';
        var imgV = document.createElement('img');
        imgV.alt = 'Card image';
        imgV.onload = function() { this.style.display = ''; };
        imgV.onerror = function() {
          this.style.display = 'none';
          this.parentElement.innerHTML = '<div class="fc-img-error"><i class="bi bi-image"></i><span>Imagem não carregou</span></div>';
        };
        imgV.style.display = 'none';
        backImage.appendChild(imgV);
        imgV.src = card.imagemVerso;
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
  // VIEW: Revisão Personalizada
  // ══════════════════════════════════════

  function renderizarCustomReview() {
    state.customSelectedDecks = [];
    state.customSelectedTags = [];

    // Renderizar lista de decks raiz com subdecks expandidos
    var decks = FD.listarDecksRaiz();
    var listEl = document.getElementById('fc-custom-decks-list');
    var html = '';

    // Botao selecionar/deselecionar todos
    html += '<div class="fc-custom-select-all">';
    html += '<button class="fc-btn fc-btn-ghost fc-btn-sm" id="btn-custom-select-all"><i class="bi bi-check2-all"></i> Selecionar Todos</button>';
    html += '<button class="fc-btn fc-btn-ghost fc-btn-sm" id="btn-custom-deselect-all" style="display:none;"><i class="bi bi-x-circle"></i> Desmarcar Todos</button>';
    html += '</div>';

    for (var i = 0; i < decks.length; i++) {
      var deck = decks[i];
      var isParent = FD.temSubdecks(deck.id);
      var totalCards = isParent ? FD.contarTotalCardsAgregado(deck.id) : FD.listarCards(deck.id).length;
      var contagem = isParent ? FD.contarCardsDevidosAgregado(deck.id) : FD.contarCardsDevidos(deck.id);
      var devidos = contagem.novos + contagem.aprendendo + contagem.revisao;

      if (isParent) {
        // Pasta pai com sub-decks expansíveis
        html += '<div class="fc-custom-deck-group" data-parent-id="' + deck.id + '">';
        html += '<label class="fc-custom-deck-item fc-custom-deck-parent" data-deck-id="' + deck.id + '">';
        html += '<input type="checkbox" value="' + deck.id + '" class="cb-parent">';
        html += '<div class="fc-custom-deck-icon" style="background:' + deck.cor + ';"><i class="bi ' + deck.icone + '"></i></div>';
        html += '<div class="fc-custom-deck-info">';
        html += '<div class="fc-custom-deck-name"><i class="bi bi-folder-fill" style="color:' + deck.cor + ';margin-right:4px;font-size:0.8em;"></i> ' + FD.escapeHtml(deck.nome) + '</div>';
        html += '<div class="fc-custom-deck-meta">' + totalCards + ' cards &middot; ' + devidos + ' para revisar</div>';
        html += '</div>';
        html += '<i class="bi bi-chevron-down fc-custom-expand-icon"></i>';
        html += '</label>';

        // Sub-decks
        var subdecks = FD.listarSubdecks(deck.id);
        html += '<div class="fc-custom-subdecks">';
        for (var s = 0; s < subdecks.length; s++) {
          var sub = subdecks[s];
          var subTotal = FD.listarCards(sub.id).length;
          var subContagem = FD.contarCardsDevidos(sub.id);
          var subDevidos = subContagem.novos + subContagem.aprendendo + subContagem.revisao;

          html += '<label class="fc-custom-deck-item fc-custom-subdeck-item" data-deck-id="' + sub.id + '" data-parent="' + deck.id + '">';
          html += '<input type="checkbox" value="' + sub.id + '" class="cb-sub" data-parent="' + deck.id + '">';
          html += '<div class="fc-custom-deck-icon fc-custom-subdeck-icon" style="background:' + sub.cor + ';"><i class="bi ' + sub.icone + '"></i></div>';
          html += '<div class="fc-custom-deck-info">';
          html += '<div class="fc-custom-deck-name">' + FD.escapeHtml(sub.nome) + '</div>';
          html += '<div class="fc-custom-deck-meta">' + subTotal + ' cards &middot; ' + subDevidos + ' para revisar</div>';
          html += '</div>';
          html += '</label>';
        }
        html += '</div>';
        html += '</div>';
      } else {
        // Deck simples sem filhos
        html += '<label class="fc-custom-deck-item" data-deck-id="' + deck.id + '">';
        html += '<input type="checkbox" value="' + deck.id + '">';
        html += '<div class="fc-custom-deck-icon" style="background:' + deck.cor + ';"><i class="bi ' + deck.icone + '"></i></div>';
        html += '<div class="fc-custom-deck-info">';
        html += '<div class="fc-custom-deck-name">' + FD.escapeHtml(deck.nome) + '</div>';
        html += '<div class="fc-custom-deck-meta">' + totalCards + ' cards &middot; ' + devidos + ' para revisar</div>';
        html += '</div>';
        html += '</label>';
      }
    }

    if (!decks.length) {
      html = '<p style="color:#94a3b8;font-size:0.85rem;">Nenhum deck criado ainda.</p>';
    }

    listEl.innerHTML = html;

    // Bind: Selecionar/Desmarcar Todos
    var btnSelectAll = document.getElementById('btn-custom-select-all');
    var btnDeselectAll = document.getElementById('btn-custom-deselect-all');
    if (btnSelectAll) btnSelectAll.addEventListener('click', function() {
      var allCbs = listEl.querySelectorAll('input[type="checkbox"]');
      state.customSelectedDecks = [];
      for (var c = 0; c < allCbs.length; c++) {
        allCbs[c].checked = true;
        var item = allCbs[c].closest('.fc-custom-deck-item');
        if (item) item.classList.add('selected');
        var val = allCbs[c].value;
        if (state.customSelectedDecks.indexOf(val) === -1) state.customSelectedDecks.push(val);
      }
      // Expandir todos os grupos
      var groups = listEl.querySelectorAll('.fc-custom-deck-group');
      for (var g = 0; g < groups.length; g++) groups[g].classList.add('expanded');
      btnSelectAll.style.display = 'none';
      btnDeselectAll.style.display = '';
      atualizarCustomCount();
    });
    if (btnDeselectAll) btnDeselectAll.addEventListener('click', function() {
      var allCbs = listEl.querySelectorAll('input[type="checkbox"]');
      state.customSelectedDecks = [];
      for (var c = 0; c < allCbs.length; c++) {
        allCbs[c].checked = false;
        var item = allCbs[c].closest('.fc-custom-deck-item');
        if (item) item.classList.remove('selected');
      }
      btnSelectAll.style.display = '';
      btnDeselectAll.style.display = 'none';
      atualizarCustomCount();
    });

    // Bind: checkboxes individuais
    var checkboxes = listEl.querySelectorAll('input[type="checkbox"]');
    for (var j = 0; j < checkboxes.length; j++) {
      checkboxes[j].addEventListener('change', function() {
        var deckId = this.value;
        var item = this.closest('.fc-custom-deck-item');
        var isParentCb = this.classList.contains('cb-parent');

        if (this.checked) {
          if (state.customSelectedDecks.indexOf(deckId) === -1) {
            state.customSelectedDecks.push(deckId);
          }
          item.classList.add('selected');

          // Se marcou uma pasta pai, marcar todos os filhos
          if (isParentCb) {
            var group = this.closest('.fc-custom-deck-group');
            if (group) {
              group.classList.add('expanded');
              var subCbs = group.querySelectorAll('.cb-sub');
              for (var sc = 0; sc < subCbs.length; sc++) {
                subCbs[sc].checked = true;
                var subItem = subCbs[sc].closest('.fc-custom-deck-item');
                if (subItem) subItem.classList.add('selected');
                var subId = subCbs[sc].value;
                if (state.customSelectedDecks.indexOf(subId) === -1) state.customSelectedDecks.push(subId);
              }
            }
          }
        } else {
          state.customSelectedDecks = state.customSelectedDecks.filter(function(id) { return id !== deckId; });
          item.classList.remove('selected');

          // Se desmarcou uma pasta pai, desmarcar todos os filhos
          if (isParentCb) {
            var group2 = this.closest('.fc-custom-deck-group');
            if (group2) {
              var subCbs2 = group2.querySelectorAll('.cb-sub');
              for (var sc2 = 0; sc2 < subCbs2.length; sc2++) {
                subCbs2[sc2].checked = false;
                var subItem2 = subCbs2[sc2].closest('.fc-custom-deck-item');
                if (subItem2) subItem2.classList.remove('selected');
                var subId2 = subCbs2[sc2].value;
                state.customSelectedDecks = state.customSelectedDecks.filter(function(id) { return id !== subId2; });
              }
            }
          }

          // Se desmarcou um filho, verificar se pai precisa desmarcar
          if (!isParentCb) {
            var parentId = this.getAttribute('data-parent');
            if (parentId) {
              var parentGroup = this.closest('.fc-custom-deck-group');
              if (parentGroup) {
                var parentCb = parentGroup.querySelector('.cb-parent');
                var allSubCbs = parentGroup.querySelectorAll('.cb-sub');
                var anyChecked = false;
                for (var ac = 0; ac < allSubCbs.length; ac++) {
                  if (allSubCbs[ac].checked) { anyChecked = true; break; }
                }
                if (!anyChecked && parentCb) {
                  parentCb.checked = false;
                  var parentItem = parentCb.closest('.fc-custom-deck-item');
                  if (parentItem) parentItem.classList.remove('selected');
                  state.customSelectedDecks = state.customSelectedDecks.filter(function(id) { return id !== parentId; });
                }
              }
            }
          }
        }

        // Atualizar botoes select/deselect
        var totalCbs = listEl.querySelectorAll('input[type="checkbox"]').length;
        var checkedCbs = listEl.querySelectorAll('input[type="checkbox"]:checked').length;
        if (btnSelectAll && btnDeselectAll) {
          btnSelectAll.style.display = checkedCbs === totalCbs ? 'none' : '';
          btnDeselectAll.style.display = checkedCbs > 0 ? '' : 'none';
        }

        atualizarCustomCount();
      });
    }

    // Bind: expandir/colapsar grupos ao clicar no chevron ou pai
    var expandIcons = listEl.querySelectorAll('.fc-custom-expand-icon');
    for (var ei = 0; ei < expandIcons.length; ei++) {
      expandIcons[ei].addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var group = this.closest('.fc-custom-deck-group');
        if (group) group.classList.toggle('expanded');
      });
    }

    // Renderizar sugestoes de tags
    renderizarTagSuggestions('');

    // Limpar tags selecionadas
    document.getElementById('fc-custom-tags-selected').innerHTML = '';

    // Input de tags
    var inputTags = document.getElementById('input-custom-tags');
    inputTags.value = '';
    inputTags.oninput = function() {
      renderizarTagSuggestions(this.value.trim());
    };
    inputTags.onkeydown = function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var tag = this.value.trim().toLowerCase();
        if (tag && state.customSelectedTags.indexOf(tag) === -1) {
          state.customSelectedTags.push(tag);
          renderizarTagsSelected();
          atualizarCustomCount();
          renderizarTagSuggestions('');
        }
        this.value = '';
      }
    };

    atualizarCustomCount();
  }

  function renderizarTagSuggestions(filtro) {
    var todasTags = FD.listarTodasTags();
    var container = document.getElementById('fc-custom-tags-suggestions');
    var filtroLower = (filtro || '').toLowerCase();
    var html = '';
    var count = 0;

    for (var i = 0; i < todasTags.length && count < 20; i++) {
      var tag = todasTags[i];
      var tagLower = tag.toLowerCase();
      // Nao mostrar tags ja selecionadas
      if (state.customSelectedTags.indexOf(tagLower) !== -1) continue;
      // Filtrar pelo texto digitado
      if (filtroLower && tagLower.indexOf(filtroLower) === -1) continue;
      html += '<button class="fc-tag-suggestion" data-tag="' + FD.escapeHtml(tagLower) + '">' + FD.escapeHtml(tag) + '</button>';
      count++;
    }

    container.innerHTML = html;

    // Bind click nas sugestoes
    var btns = container.querySelectorAll('.fc-tag-suggestion');
    for (var j = 0; j < btns.length; j++) {
      btns[j].addEventListener('click', function() {
        var tag = this.getAttribute('data-tag');
        if (state.customSelectedTags.indexOf(tag) === -1) {
          state.customSelectedTags.push(tag);
          renderizarTagsSelected();
          atualizarCustomCount();
          renderizarTagSuggestions(document.getElementById('input-custom-tags').value.trim());
        }
      });
    }
  }

  function renderizarTagsSelected() {
    var container = document.getElementById('fc-custom-tags-selected');
    var html = '';

    for (var i = 0; i < state.customSelectedTags.length; i++) {
      var tag = state.customSelectedTags[i];
      html += '<span class="fc-tag-chip">' + FD.escapeHtml(tag) + ' <span class="fc-tag-remove" data-tag="' + FD.escapeHtml(tag) + '">&times;</span></span>';
    }

    container.innerHTML = html;

    // Bind remover
    var removes = container.querySelectorAll('.fc-tag-remove');
    for (var j = 0; j < removes.length; j++) {
      removes[j].addEventListener('click', function() {
        var tag = this.getAttribute('data-tag');
        state.customSelectedTags = state.customSelectedTags.filter(function(t) { return t !== tag; });
        renderizarTagsSelected();
        atualizarCustomCount();
        renderizarTagSuggestions(document.getElementById('input-custom-tags').value.trim());
      });
    }
  }

  function atualizarCustomCount() {
    var fila = FD.construirFilaCustom(state.customSelectedDecks, state.customSelectedTags);
    var countEl = document.getElementById('fc-custom-card-count');
    var btnIniciar = document.getElementById('btn-iniciar-custom');

    if (countEl) countEl.textContent = fila.length;
    if (btnIniciar) btnIniciar.disabled = fila.length === 0;
  }

  function iniciarCustomReview() {
    var fila = FD.construirFilaCustom(state.customSelectedDecks, state.customSelectedTags);
    if (!fila.length) return;

    state.customIsActive = true;
    state.currentDeckId = null;
    state.fila = fila;
    state.filaIndex = 0;
    state.filaTotal = fila.length;
    state.reviewDone = 0;
    state.reviewAcertos = 0;
    state.reviewErros = 0;
    state.reviewStartTime = Date.now();

    mostrarView('review');

    document.getElementById('fc-review-done').style.display = 'none';
    document.getElementById('fc-review-card').parentElement.style.display = '';
    document.getElementById('fc-reveal-actions').style.display = '';

    if (state.reviewTimerInterval) clearInterval(state.reviewTimerInterval);
    state.reviewTimerInterval = setInterval(atualizarTimer, 1000);
    atualizarTimer();

    mostrarProximoCard();
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

    // Parent selector
    var selectParent = document.getElementById('select-deck-parent');
    if (selectParent) {
      var possibleParents = FD.listarPossiveisPais(deckId);
      var optHtml = '<option value="">Nenhuma (deck raiz)</option>';
      for (var p = 0; p < possibleParents.length; p++) {
        optHtml += '<option value="' + possibleParents[p].id + '">' + FD.escapeHtml(possibleParents[p].nome) + '</option>';
      }
      selectParent.innerHTML = optHtml;

      if (deckId) {
        var deckP = FD.obterDeck(deckId);
        state.selectedParentId = (deckP && deckP.parentId) || '';
        selectParent.value = state.selectedParentId;
        // Deck com filhos nao pode virar filho
        if (FD.temSubdecks(deckId)) {
          selectParent.disabled = true;
          selectParent.title = 'Este deck tem sub-decks';
        } else {
          selectParent.disabled = false;
          selectParent.title = '';
        }
      } else {
        // Novo deck: pre-selecionar pasta atual se estiver dentro de uma
        state.selectedParentId = state.currentParentId || '';
        selectParent.value = state.selectedParentId;
        selectParent.disabled = false;
        selectParent.title = '';
      }
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
    var selectParent = document.getElementById('select-deck-parent');
    var parentId = selectParent ? (selectParent.value || null) : null;

    if (state.editingDeckId) {
      FD.editarDeck(state.editingDeckId, {
        nome: nome,
        descricao: desc,
        cor: state.selectedColor,
        icone: state.selectedIcon,
        parentId: parentId
      });
    } else {
      FD.criarDeck(nome, desc, state.selectedColor, state.selectedIcon, parentId);
    }

    fecharModalDeck();

    // Atualizar a view correta
    if (state.currentView === 'subdecks' && state.currentParentId) {
      renderizarSubdecks(state.currentParentId);
    } else if (state.currentView === 'deck-detail' && state.currentDeckId) {
      renderizarDetalhesDeck(state.currentDeckId);
    }
    renderizarDecks();
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
    state.uploadedImageData = null;

    // Limpar campos
    document.getElementById('input-card-frente').value = '';
    document.getElementById('input-card-verso').value = '';
    document.getElementById('input-card-cloze').value = '';
    document.getElementById('input-card-img-frente').value = '';
    document.getElementById('input-card-frente-img').value = '';
    document.getElementById('input-card-verso-img').value = '';
    document.getElementById('input-card-tags').value = '';
    var fileInput = document.getElementById('input-card-file');
    if (fileInput) fileInput.value = '';
    resetFileDropContent();

    if (cardId) {
      var card = FD.obterCard(cardId);
      if (!card) return;
      title.textContent = 'Editar Card';
      state.selectedTipo = card.tipo || 'basico';

      if (card.tipo === 'cloze') {
        document.getElementById('input-card-cloze').value = card.frente || '';
      } else if (card.tipo === 'imagem') {
        var imgSrc = card.imagemFrente || '';
        if (imgSrc.indexOf('data:') === 0) {
          state.imgSource = 'upload';
          state.uploadedImageData = imgSrc;
        } else {
          state.imgSource = imgSrc ? 'url' : 'upload';
          document.getElementById('input-card-img-frente').value = imgSrc;
        }
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
      state.imgSource = 'upload';
    }

    atualizarTipoTabs();
    atualizarImgSourceTabs();
    atualizarPreviewImagem();
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
      if (state.imgSource === 'upload' && state.uploadedImageData) {
        campos.imagemFrente = state.uploadedImageData;
      } else {
        campos.imagemFrente = document.getElementById('input-card-img-frente').value.trim();
      }
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
  // Tabs de origem da imagem
  // ══════════════════════════════════════

  function atualizarImgSourceTabs() {
    var tabs = document.querySelectorAll('.fc-img-source-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-source') === state.imgSource);
    }
    var uploadFields = document.getElementById('fields-img-upload');
    var urlFields = document.getElementById('fields-img-url');
    if (uploadFields) uploadFields.style.display = state.imgSource === 'upload' ? '' : 'none';
    if (urlFields) urlFields.style.display = state.imgSource === 'url' ? '' : 'none';
  }

  // ══════════════════════════════════════
  // Upload de imagem (arquivo local)
  // ══════════════════════════════════════

  var MAX_IMG_SIZE = 500 * 1024; // 500KB
  var MAX_IMG_DIMENSION = 800;

  function processarArquivoImagem(file) {
    if (!file || !file.type.match('image.*')) return;

    var preview = document.getElementById('fc-img-preview');
    if (preview) {
      preview.style.display = '';
      preview.innerHTML = '<div class="fc-img-loading"><i class="bi bi-hourglass-split"></i> Processando...</div>';
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        // Redimensionar se necessário
        var w = img.width;
        var h = img.height;
        if (w > MAX_IMG_DIMENSION || h > MAX_IMG_DIMENSION) {
          if (w > h) {
            h = Math.round(h * MAX_IMG_DIMENSION / w);
            w = MAX_IMG_DIMENSION;
          } else {
            w = Math.round(w * MAX_IMG_DIMENSION / h);
            h = MAX_IMG_DIMENSION;
          }
        }

        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        // Comprimir como JPEG com qualidade 0.7
        var dataUrl = canvas.toDataURL('image/jpeg', 0.7);

        // Verificar tamanho
        if (dataUrl.length > MAX_IMG_SIZE * 1.37) {
          // Tentar qualidade menor
          dataUrl = canvas.toDataURL('image/jpeg', 0.4);
        }

        state.uploadedImageData = dataUrl;
        atualizarPreviewImagem();
        atualizarFileDropContent(file.name);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function atualizarFileDropContent(fileName) {
    var content = document.getElementById('fc-file-drop-content');
    if (!content) return;
    content.innerHTML = '<i class="bi bi-check-circle-fill" style="color:#22c55e;"></i><span>' + FD.escapeHtml(fileName) + '</span><span class="fc-form-hint">Clique para trocar</span>';
  }

  function resetFileDropContent() {
    var content = document.getElementById('fc-file-drop-content');
    if (!content) return;
    content.innerHTML = '<i class="bi bi-cloud-arrow-up"></i><span>Clique ou arraste uma imagem</span><span class="fc-form-hint">JPG, PNG, WebP (máx. 500KB)</span>';
  }

  // ══════════════════════════════════════
  // Preview de Imagem no Modal
  // ══════════════════════════════════════

  function atualizarPreviewImagem() {
    var preview = document.getElementById('fc-img-preview');
    if (!preview) return;

    var url = '';
    if (state.imgSource === 'upload') {
      url = state.uploadedImageData || '';
    } else {
      url = (document.getElementById('input-card-img-frente').value || '').trim();
    }

    if (!url) {
      preview.style.display = 'none';
      preview.innerHTML = '';
      return;
    }

    // Data URLs já estão carregadas
    if (url.indexOf('data:') === 0) {
      preview.style.display = '';
      preview.innerHTML = '';
      var img = document.createElement('img');
      img.src = url;
      preview.appendChild(img);
      return;
    }

    preview.style.display = '';
    preview.innerHTML = '<div class="fc-img-loading"><i class="bi bi-hourglass-split"></i> Carregando...</div>';

    var img = document.createElement('img');
    img.onload = function() {
      preview.innerHTML = '';
      preview.appendChild(img);
    };
    img.onerror = function() {
      preview.innerHTML = '<div class="fc-img-error"><i class="bi bi-exclamation-triangle"></i> URL inválida ou imagem não acessível. Use um link direto (ex: terminando em .jpg, .png)</div>';
    };
    img.src = url;
  }

  // ══════════════════════════════════════
  // Navegacao: Voltar do Review
  // ══════════════════════════════════════

  function voltarDoReview() {
    if (state.reviewTimerInterval) clearInterval(state.reviewTimerInterval);
    if (state.customIsActive) {
      state.customIsActive = false;
      mostrarView('decks');
      renderizarDecks();
      return;
    }
    var deck = FD.obterDeck(state.currentDeckId);
    if (deck && FD.temSubdecks(deck.id)) {
      // Veio de "Revisar Tudo" numa pasta
      abrirSubdecks(deck.id);
    } else if (deck && deck.parentId) {
      abrirDetalhesDeck(state.currentDeckId);
    } else {
      abrirDetalhesDeck(state.currentDeckId);
    }
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

    // ── Botão: Custom Review ──
    var btnCustomReview = document.getElementById('btn-custom-review');
    if (btnCustomReview) btnCustomReview.addEventListener('click', function() {
      mostrarView('custom-review');
      renderizarCustomReview();
    });

    var btnVoltarCustom = document.getElementById('btn-voltar-custom');
    if (btnVoltarCustom) btnVoltarCustom.addEventListener('click', function() {
      mostrarView('decks');
      renderizarDecks();
    });

    var btnIniciarCustom = document.getElementById('btn-iniciar-custom');
    if (btnIniciarCustom) btnIniciarCustom.addEventListener('click', function() {
      iniciarCustomReview();
    });

    // ── Botões: Subdecks View ──
    var btnVoltarRaiz = document.getElementById('btn-voltar-raiz');
    var btnEditarPasta = document.getElementById('btn-editar-pasta');
    var btnExcluirPasta = document.getElementById('btn-excluir-pasta');
    var btnNovoSubdeck = document.getElementById('btn-novo-subdeck');
    var btnNovoSubdeckEmpty = document.getElementById('btn-novo-subdeck-empty');
    var btnRevisarTudo = document.getElementById('btn-revisar-tudo');
    var breadcrumbHome = document.getElementById('breadcrumb-home');

    if (btnVoltarRaiz) btnVoltarRaiz.addEventListener('click', function() {
      state.currentParentId = null;
      mostrarView('decks');
      renderizarDecks();
    });
    if (breadcrumbHome) breadcrumbHome.addEventListener('click', function(e) {
      e.preventDefault();
      state.currentParentId = null;
      mostrarView('decks');
      renderizarDecks();
    });
    if (btnEditarPasta) btnEditarPasta.addEventListener('click', function() {
      abrirModalDeck(state.currentParentId);
    });
    if (btnExcluirPasta) btnExcluirPasta.addEventListener('click', function() {
      confirmar('Excluir pasta', 'Todos os sub-decks e cards dentro desta pasta serão excluídos. Deseja continuar?', function() {
        FD.excluirDeck(state.currentParentId);
        state.currentParentId = null;
        mostrarView('decks');
        renderizarDecks();
      });
    });
    if (btnNovoSubdeck) btnNovoSubdeck.addEventListener('click', function() { abrirModalDeck(null); });
    if (btnNovoSubdeckEmpty) btnNovoSubdeckEmpty.addEventListener('click', function() { abrirModalDeck(null); });
    if (btnRevisarTudo) btnRevisarTudo.addEventListener('click', function() {
      iniciarRevisaoAgregada(state.currentParentId);
    });

    // ── Botões: Deck Detail ──
    var btnVoltarDecks = document.getElementById('btn-voltar-decks');
    var btnEditarDeck = document.getElementById('btn-editar-deck-detail');
    var btnExcluirDeck = document.getElementById('btn-excluir-deck-detail');
    var btnNovoCard = document.getElementById('btn-novo-card');
    var btnNovoCardEmpty = document.getElementById('btn-novo-card-empty');
    var btnIniciarRevisao = document.getElementById('btn-iniciar-revisao');

    if (btnVoltarDecks) btnVoltarDecks.addEventListener('click', function() {
      var deck = FD.obterDeck(state.currentDeckId);
      if (deck && deck.parentId) {
        abrirSubdecks(deck.parentId);
      } else {
        mostrarView('decks');
        renderizarDecks();
      }
    });
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
      voltarDoReview();
    });
    if (btnRevelar) btnRevelar.addEventListener('click', revelarResposta);
    if (btnVoltarDeck) btnVoltarDeck.addEventListener('click', function() { voltarDoReview(); });

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
        atualizarPreviewImagem();
      });
    }

    // Preview de imagem ao digitar URL
    var inputImgFrente = document.getElementById('input-card-img-frente');
    if (inputImgFrente) {
      var _previewTimer = null;
      inputImgFrente.addEventListener('input', function() {
        clearTimeout(_previewTimer);
        _previewTimer = setTimeout(atualizarPreviewImagem, 600);
      });
    }

    // Tabs de origem da imagem (upload vs URL)
    var imgSourceTabs = document.querySelectorAll('.fc-img-source-tab');
    for (var st = 0; st < imgSourceTabs.length; st++) {
      imgSourceTabs[st].addEventListener('click', function() {
        state.imgSource = this.getAttribute('data-source');
        atualizarImgSourceTabs();
        atualizarPreviewImagem();
      });
    }

    // Upload de arquivo
    var fileInput = document.getElementById('input-card-file');
    var fileDrop = document.getElementById('fc-file-drop');
    if (fileInput) {
      fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          processarArquivoImagem(this.files[0]);
        }
      });
    }
    if (fileDrop) {
      fileDrop.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
      });
      fileDrop.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
      });
      fileDrop.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processarArquivoImagem(e.dataTransfer.files[0]);
        }
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

    // Sidebar toggle agora é gerenciado por sidebar.js

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

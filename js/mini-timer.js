// ============================================
// Mini-Timer Global - Aparece na navbar de todas as páginas
// Mostra o cronômetro rodando mesmo fora do index.html
// ============================================
(function() {
  const ESTADO_KEY = 'lumed_crono_estado';
  const TEMPOS_KEY = 'lumed_tempos_estudo';

  function getHoje() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  function getTempoAcumuladoHoje() {
    try {
      const tempos = JSON.parse(localStorage.getItem(TEMPOS_KEY) || '{}');
      return tempos[getHoje()] || 0;
    } catch(e) { return 0; }
  }

  function getEstado() {
    try {
      return JSON.parse(localStorage.getItem(ESTADO_KEY) || '{}');
    } catch(e) { return {}; }
  }

  function formatarTempo(totalSeg) {
    const h = Math.floor(totalSeg / 3600);
    const m = Math.floor((totalSeg % 3600) / 60);
    const s = Math.floor(totalSeg % 60);
    if (h > 0) {
      return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }
    return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }

  // Injetar CSS uma vez
  function injetarCSS() {
    if (document.getElementById('mini-timer-css')) return;
    const style = document.createElement('style');
    style.id = 'mini-timer-css';
    style.textContent = `
      .navbar-container { position: relative; }
      #mini-timer-global {
        display: none;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 200px;
        top: 50%;
        transform: translateY(-50%);
        background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
        border-radius: 50px;
        padding: 5px 14px;
        font-family: "Plus Jakarta Sans", sans-serif;
        font-size: 13px;
        font-weight: 700;
        color: #92400e;
        text-decoration: none;
        gap: 6px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(251, 191, 36, 0.25);
        height: 36px;
        z-index: 10;
      }
      #mini-timer-global:hover {
        background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.35);
      }
      #mini-timer-global i {
        font-size: 14px;
        color: #b45309;
      }
      @media (max-width: 1024px) {
        #mini-timer-global { right: 140px; }
      }
      @media (max-width: 480px) {
        #mini-timer-global {
          right: 100px;
          padding: 4px 10px;
          font-size: 12px;
          height: 32px;
          gap: 4px;
        }
        #mini-timer-global i { font-size: 12px; }
      }
    `;
    document.head.appendChild(style);
  }

  let miniEl = null;
  let valorEl = null;

  function criarMiniTimer() {
    const container = document.querySelector('.navbar-container');
    if (!container) return;

    injetarCSS();

    miniEl = document.createElement('a');
    miniEl.id = 'mini-timer-global';
    miniEl.href = 'index.html#timer';
    miniEl.title = 'Cronômetro rodando';
    miniEl.innerHTML = '<i class="bi bi-stopwatch-fill"></i><span id="mini-timer-valor">00:00</span>';
    container.appendChild(miniEl);
    valorEl = miniEl.querySelector('#mini-timer-valor');
  }

  function loop() {
    if (!miniEl) return;

    const estado = getEstado();
    const rodando = estado && estado.rodando && estado.inicio;

    if (rodando) {
      const acumulado = getTempoAcumuladoHoje();
      const decorrido = (Date.now() - estado.inicio) / 1000;
      valorEl.textContent = formatarTempo(acumulado + decorrido);
      miniEl.style.display = 'inline-flex';
    } else {
      miniEl.style.display = 'none';
    }
  }

  function init() {
    criarMiniTimer();
    loop();
    // Rodar a cada 500ms - sempre detecta mudanças
    setInterval(loop, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

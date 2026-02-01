// ============================================
// LuMED - JavaScript da Página de Aulas
// ============================================

// Elementos do DOM
const aulasGrid = document.getElementById('aulas-grid');
const loading = document.getElementById('loading');
const bannerAoVivo = document.getElementById('banner-ao-vivo');
const aoVivoMateria = document.getElementById('ao-vivo-materia');
const btnAoVivo = document.getElementById('btn-ao-vivo');
const filtroMateria = document.getElementById('filtro-materia');
const filtroMes = document.getElementById('filtro-mes');
const buscaAulas = document.getElementById('busca-aulas');
const modalVideo = document.getElementById('modal-video');
const fecharVideo = document.getElementById('fechar-video');
const videoPlayer = document.getElementById('video-player');
const videoTitulo = document.getElementById('video-titulo');
const videoInfo = document.getElementById('video-info');

// Estado
let todasAulas = [];
let aulaAoVivo = null;

// Nomes das matérias
const nomesMateria = {
  biologia: 'Biologia',
  quimica: 'Química',
  fisica: 'Física',
  matematica: 'Matemática',
  portugues: 'Português',
  historia: 'História',
  geografia: 'Geografia',
  filosofia: 'Filosofia',
  sociologia: 'Sociologia',
  ingles: 'Inglês',
  redacao: 'Redação'
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  carregarAulas();
  verificarAulaAoVivo();
  inicializarEventos();
});

function inicializarEventos() {
  // Filtros
  filtroMateria.addEventListener('change', filtrarAulas);
  filtroMes.addEventListener('change', filtrarAulas);
  buscaAulas.addEventListener('input', filtrarAulas);

  // Modal
  fecharVideo.addEventListener('click', fecharModal);
  modalVideo.addEventListener('click', (e) => {
    if (e.target === modalVideo) fecharModal();
  });

  // Tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
}

// ============================================
// CARREGAR AULAS
// ============================================
async function carregarAulas() {
  try {
    // Buscar TODAS as aulas (ao-vivo, aguardando-video, finalizada)
    const snapshotAoVivo = await aulasRef
      .where('status', '==', 'ao-vivo')
      .get();

    const snapshotFinalizada = await aulasRef
      .where('status', '==', 'finalizada')
      .get();

    const snapshotAguardando = await aulasRef
      .where('status', '==', 'aguardando-video')
      .get();

    todasAulas = [];

    // Adicionar aulas ao vivo primeiro
    snapshotAoVivo.forEach(doc => {
      todasAulas.push({
        id: doc.id,
        ...doc.data()
      });
    });

    snapshotFinalizada.forEach(doc => {
      todasAulas.push({
        id: doc.id,
        ...doc.data()
      });
    });

    snapshotAguardando.forEach(doc => {
      todasAulas.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Ordenar: ao-vivo primeiro, depois por data (mais recente primeiro)
    todasAulas.sort((a, b) => {
      // Ao vivo sempre primeiro
      if (a.status === 'ao-vivo' && b.status !== 'ao-vivo') return -1;
      if (b.status === 'ao-vivo' && a.status !== 'ao-vivo') return 1;

      const dataA = a.dataInicio?.toDate ? a.dataInicio.toDate() : new Date(a.dataInicio);
      const dataB = b.dataInicio?.toDate ? b.dataInicio.toDate() : new Date(b.dataInicio);
      return dataB - dataA;
    });

    renderizarAulas(todasAulas);

  } catch (error) {
    console.error('Erro ao carregar aulas:', error);
    mostrarErro();
  }
}

// ============================================
// RENDERIZAR AULAS
// ============================================
function renderizarAulas(aulas) {
  // Remover loading
  loading.style.display = 'none';

  if (aulas.length === 0) {
    aulasGrid.innerHTML = `
      <div class="aulas-vazio">
        <i class="bi bi-collection-play"></i>
        <h3>Nenhuma aula encontrada</h3>
        <p>As aulas gravadas aparecerão aqui</p>
      </div>
    `;
    return;
  }

  aulasGrid.innerHTML = '';

  aulas.forEach(aula => {
    const card = criarCardAula(aula);
    aulasGrid.appendChild(card);
  });
}

function criarCardAula(aula) {
  const div = document.createElement('div');
  div.className = 'aula-card';

  const nomeMateria = nomesMateria[aula.materia] || aula.materia;
  const data = formatarData(aula.dataInicio);
  const duracao = aula.duracao ? formatarDuracao(aula.duracao) : '';
  const temVideo = aula.videoUrl && aula.videoUrl.length > 0;
  const aguardandoVideo = aula.status === 'aguardando-video';
  const aoVivo = aula.status === 'ao-vivo';

  // Definir classe e ícone baseado no status
  let thumbnailClass = '';
  let icone = 'bi-play-circle';
  let btnTexto = 'Assistir Aula';
  let btnClass = '';
  let badgeExtra = '';

  if (aoVivo) {
    thumbnailClass = 'ao-vivo';
    icone = 'bi-broadcast';
    btnTexto = 'Entrar ao Vivo';
    btnClass = 'btn-ao-vivo';
    badgeExtra = '<span class="aula-ao-vivo-badge"><span class="dot-ao-vivo"></span> AO VIVO</span>';
  } else if (aguardandoVideo) {
    thumbnailClass = 'processando';
    icone = 'bi-hourglass-split';
    btnTexto = 'Processando...';
    btnClass = 'btn-aguardando';
    badgeExtra = '<span class="aula-processando">Processando vídeo...</span>';
  }

  div.innerHTML = `
    <div class="aula-thumbnail ${thumbnailClass}">
      <i class="bi ${icone} aula-thumbnail-icon"></i>
      <span class="aula-materia-badge materia-${aula.materia}">${nomeMateria}</span>
      ${duracao ? `<span class="aula-duracao">${duracao}</span>` : ''}
      ${badgeExtra}
    </div>
    <div class="aula-card-body">
      <div class="aula-card-materia">
        <i class="bi bi-bookmark-fill"></i>
        ${nomeMateria}
      </div>
      <div class="aula-card-tema">${aula.tema}</div>
      <div class="aula-card-meta">
        <span><i class="bi bi-calendar3"></i> ${data}</span>
        ${duracao ? `<span><i class="bi bi-clock"></i> ${duracao}</span>` : ''}
        ${aoVivo ? '<span class="meta-ao-vivo"><i class="bi bi-broadcast"></i> Ao Vivo</span>' : ''}
      </div>
      <button class="btn-assistir ${btnClass}" data-id="${aula.id}" ${aguardandoVideo ? 'disabled' : ''}>
        <i class="bi ${aoVivo ? 'bi-broadcast' : (aguardandoVideo ? 'bi-hourglass-split' : 'bi-play-fill')}"></i>
        ${btnTexto}
      </button>
    </div>
  `;

  // Evento do botão
  if (aoVivo) {
    const btn = div.querySelector('.btn-assistir');
    btn.addEventListener('click', () => {
      if (aula.meetLink) {
        window.open(aula.meetLink, '_blank');
      }
    });
  } else if (!aguardandoVideo) {
    const btn = div.querySelector('.btn-assistir');
    btn.addEventListener('click', () => abrirAula(aula));
  }

  return div;
}

// ============================================
// FILTRAR AULAS
// ============================================
function filtrarAulas() {
  const materia = filtroMateria.value;
  const mes = filtroMes.value;
  const busca = buscaAulas.value.toLowerCase().trim();

  let aulasFiltradas = todasAulas;

  // Filtrar por matéria
  if (materia) {
    aulasFiltradas = aulasFiltradas.filter(a => a.materia === materia);
  }

  // Filtrar por mês
  if (mes) {
    aulasFiltradas = aulasFiltradas.filter(a => {
      const dataAula = a.dataInicio.toDate ? a.dataInicio.toDate() : new Date(a.dataInicio);
      const mesAula = String(dataAula.getMonth() + 1).padStart(2, '0');
      return mesAula === mes;
    });
  }

  // Filtrar por busca
  if (busca) {
    aulasFiltradas = aulasFiltradas.filter(a =>
      a.tema.toLowerCase().includes(busca) ||
      (nomesMateria[a.materia] || a.materia).toLowerCase().includes(busca)
    );
  }

  renderizarAulas(aulasFiltradas);
}

// ============================================
// VERIFICAR AULA AO VIVO
// ============================================
async function verificarAulaAoVivo() {
  try {
    const snapshot = await aulasRef
      .where('status', '==', 'ao-vivo')
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      aulaAoVivo = {
        id: doc.id,
        ...doc.data()
      };

      mostrarBannerAoVivo();
    }

  } catch (error) {
    console.error('Erro ao verificar aula ao vivo:', error);
  }

  // Verificar novamente a cada 30 segundos
  setTimeout(verificarAulaAoVivo, 30000);
}

function mostrarBannerAoVivo() {
  if (!aulaAoVivo) return;

  const nomeMateria = nomesMateria[aulaAoVivo.materia] || aulaAoVivo.materia;
  aoVivoMateria.textContent = `${nomeMateria} - ${aulaAoVivo.tema}`;

  bannerAoVivo.style.display = 'flex';

  btnAoVivo.onclick = () => {
    if (aulaAoVivo.meetLink) {
      window.open(aulaAoVivo.meetLink, '_blank');
    } else {
      alert('Link do Meet não disponível');
    }
  };
}

// ============================================
// ABRIR AULA
// ============================================
function abrirAula(aula) {
  // Se tiver link do vídeo do Drive, abrir em nova aba
  if (aula.videoUrl) {
    // Abrir diretamente no Drive (funciona melhor que embed)
    window.open(aula.videoUrl, '_blank');
  } else {
    // Se não tiver vídeo, mostrar modal com placeholder
    const nomeMateria = nomesMateria[aula.materia] || aula.materia;
    const data = formatarData(aula.dataInicio);

    videoTitulo.textContent = aula.tema;
    videoInfo.textContent = `${nomeMateria} • ${data}`;

    videoPlayer.src = '';
    videoPlayer.outerHTML = `
      <div class="video-placeholder" style="
        width: 100%;
        aspect-ratio: 16/9;
        background: #1a1a1a;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
      ">
        <i class="bi bi-cloud-upload" style="font-size: 50px; margin-bottom: 15px;"></i>
        <p>Vídeo ainda não disponível</p>
        <small>O vídeo será adicionado em breve</small>
      </div>
    `;
    modalVideo.classList.add('show');
  }
}

function converterLinkDrive(url) {
  // Converter link do Google Drive para formato embed
  // https://drive.google.com/file/d/FILE_ID/view
  // para
  // https://drive.google.com/file/d/FILE_ID/preview

  if (url.includes('drive.google.com')) {
    return url.replace('/view', '/preview');
  }

  return url;
}

// ============================================
// FECHAR MODAL
// ============================================
function fecharModal() {
  modalVideo.classList.remove('show');
  videoPlayer.src = '';

  // Restaurar iframe se foi substituído por placeholder
  const placeholder = document.querySelector('.video-placeholder');
  if (placeholder) {
    placeholder.outerHTML = `<iframe class="video-player" id="video-player" src="" frameborder="0" allowfullscreen></iframe>`;
  }
}

// ============================================
// MOSTRAR ERRO
// ============================================
function mostrarErro() {
  loading.style.display = 'none';
  aulasGrid.innerHTML = `
    <div class="aulas-vazio">
      <i class="bi bi-exclamation-triangle"></i>
      <h3>Erro ao carregar aulas</h3>
      <p>Verifique a configuração do Firebase</p>
    </div>
  `;
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
function formatarData(timestamp) {
  if (!timestamp) return '';
  const data = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function formatarDuracao(minutos) {
  if (!minutos) return '';
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  if (horas > 0) {
    return `${horas}h ${mins}min`;
  }
  return `${mins}min`;
}

console.log('Página de Aulas carregada!');

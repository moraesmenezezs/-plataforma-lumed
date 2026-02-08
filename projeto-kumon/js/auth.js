// ============================================
// Kumon Digital - Sistema de Autenticação
// Baseado no auth.js da LuMED
// ============================================

// Tradução de erros Supabase para PT-BR
function traduzirErro(msg) {
  const erros = {
    'Invalid login credentials': 'Email ou senha incorretos.',
    'Email not confirmed': 'Confirme seu email antes de fazer login.',
    'User already registered': 'Este email já está cadastrado.',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
    'Unable to validate email address: invalid format': 'Formato de email inválido.',
    'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos.',
    'For security purposes, you can only request this after': 'Aguarde alguns segundos antes de tentar novamente.',
    'Signup requires a valid password': 'Digite uma senha válida.',
  };
  for (const [en, pt] of Object.entries(erros)) {
    if (msg && msg.includes(en)) return pt;
  }
  return msg || 'Ocorreu um erro. Tente novamente.';
}

// Injeta overlay de login no DOM
function criarOverlayLogin() {
  if (document.getElementById('auth-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-card">
      <div class="auth-header">
        <span class="auth-logo-icon"><i class="bi bi-calculator-fill"></i></span>
        <span class="auth-logo-text">Kumon</span>
      </div>
      <h2 class="auth-title" id="auth-title">Entrar na plataforma</h2>
      <p class="auth-subtitle" id="auth-subtitle">Acesse sua conta para continuar</p>

      <form id="auth-form" autocomplete="on">
        <div class="auth-field" id="auth-nome-group" style="display:none;">
          <label for="auth-nome"><i class="bi bi-person"></i> Seu nome</label>
          <input type="text" id="auth-nome" placeholder="Ex: João Silva" autocomplete="name">
        </div>
        <div class="auth-field">
          <label for="auth-email"><i class="bi bi-envelope"></i> Email</label>
          <input type="email" id="auth-email" placeholder="seu@email.com" autocomplete="email" required>
        </div>
        <div class="auth-field">
          <label for="auth-senha"><i class="bi bi-lock"></i> Senha</label>
          <input type="password" id="auth-senha" placeholder="Sua senha" autocomplete="current-password" required>
        </div>

        <div class="auth-msg" id="auth-msg"></div>

        <button type="submit" class="auth-btn" id="auth-btn">
          <span class="auth-btn-text">Entrar</span>
          <span class="auth-btn-spinner" style="display:none;"><i class="bi bi-arrow-repeat auth-spin"></i></span>
        </button>
      </form>

      <div class="auth-toggle">
        <span id="auth-toggle-text">Não tem conta?</span>
        <button type="button" id="auth-toggle-btn">Criar conta</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  let isRegistro = false;
  const form = document.getElementById('auth-form');
  const btn = document.getElementById('auth-btn');
  const btnText = btn.querySelector('.auth-btn-text');
  const btnSpinner = btn.querySelector('.auth-btn-spinner');
  const msg = document.getElementById('auth-msg');
  const toggleBtn = document.getElementById('auth-toggle-btn');
  const toggleText = document.getElementById('auth-toggle-text');
  const nomeGroup = document.getElementById('auth-nome-group');
  const titulo = document.getElementById('auth-title');
  const subtitulo = document.getElementById('auth-subtitle');

  toggleBtn.addEventListener('click', () => {
    isRegistro = !isRegistro;
    msg.textContent = '';
    msg.className = 'auth-msg';
    if (isRegistro) {
      nomeGroup.style.display = 'block';
      titulo.textContent = 'Criar sua conta';
      subtitulo.textContent = 'Preencha os dados para começar';
      btnText.textContent = 'Criar conta';
      toggleText.textContent = 'Já tem conta?';
      toggleBtn.textContent = 'Fazer login';
      document.getElementById('auth-senha').autocomplete = 'new-password';
    } else {
      nomeGroup.style.display = 'none';
      titulo.textContent = 'Entrar na plataforma';
      subtitulo.textContent = 'Acesse sua conta para continuar';
      btnText.textContent = 'Entrar';
      toggleText.textContent = 'Não tem conta?';
      toggleBtn.textContent = 'Criar conta';
      document.getElementById('auth-senha').autocomplete = 'current-password';
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const supabase = window.kumonSupabase.getClient();
    const email = document.getElementById('auth-email').value.trim();
    const senha = document.getElementById('auth-senha').value;
    const nome = document.getElementById('auth-nome').value.trim();

    msg.textContent = '';
    msg.className = 'auth-msg';
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-flex';
    btn.disabled = true;

    try {
      if (isRegistro) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { data: { nome: nome || 'Estudante' } }
        });
        if (error) throw error;
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          throw { message: 'User already registered' };
        }
        msg.textContent = 'Conta criada! Verifique seu email para confirmar.';
        msg.className = 'auth-msg auth-msg-success';
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
      }
    } catch (err) {
      msg.textContent = traduzirErro(err.message);
      msg.className = 'auth-msg auth-msg-error';
    } finally {
      btnText.style.display = 'inline';
      btnSpinner.style.display = 'none';
      btn.disabled = false;
    }
  });
}

// Gerencia dados Kumon por usuário (cada conta tem seu próprio progresso)
function gerenciarDadosUsuario(user) {
  const userId = user.id;
  const storedUserId = localStorage.getItem('kumon_current_uid');

  if (!storedUserId) {
    // Primeiro usuário a logar = conta teste → desbloquear tudo
    localStorage.setItem('kumon_current_uid', userId);
    localStorage.setItem('kumon_admin_uid', userId);
    if (window.kumonStorage) {
      window.kumonStorage.desbloquearTodosNiveis();
      console.log('[Auth] Conta teste detectada — todos os níveis desbloqueados');
    }
  } else if (storedUserId !== userId) {
    // Usuário diferente logando → salvar dados do anterior e carregar os deste
    const adminUid = localStorage.getItem('kumon_admin_uid');

    // Backup dos dados do usuário anterior
    const dadosAnteriores = window.kumonStorage ? window.kumonStorage.exportarDados() : null;
    if (dadosAnteriores) {
      localStorage.setItem('kumon_backup_' + storedUserId, JSON.stringify(dadosAnteriores));
    }

    // Verificar se este usuário já tem dados salvos
    const backupEsteUsuario = localStorage.getItem('kumon_backup_' + userId);
    if (backupEsteUsuario) {
      // Restaurar dados deste usuário
      const dados = JSON.parse(backupEsteUsuario);
      window.kumonStorage.importarDados(dados);
      console.log('[Auth] Dados do usuário restaurados');
    } else {
      // Novo usuário → criar dados padrão (níveis bloqueados)
      window.kumonStorage.limparDados();
      console.log('[Auth] Novo usuário — progresso iniciado do zero');
    }

    // Se é a conta admin/teste, desbloquear tudo
    if (userId === adminUid && window.kumonStorage) {
      window.kumonStorage.desbloquearTodosNiveis();
    }

    localStorage.setItem('kumon_current_uid', userId);
  } else {
    // Mesmo usuário — verificar se é admin e desbloquear
    const adminUid = localStorage.getItem('kumon_admin_uid');
    if (userId === adminUid && window.kumonStorage) {
      window.kumonStorage.desbloquearTodosNiveis();
    }
  }
}

// Remove overlay e atualiza UI com dados do usuário
function removerOverlay(session) {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) {
    overlay.classList.add('auth-overlay-hide');
    setTimeout(() => overlay.remove(), 400);
  }

  if (!session) return;

  const user = session.user;
  const nome = user.user_metadata?.nome || user.email?.split('@')[0] || 'Estudante';

  // Gerenciar dados Kumon por usuário
  gerenciarDadosUsuario(user);

  // Atualiza nome do usuário na navbar
  const userNameEl = document.querySelector('.user-name');
  if (userNameEl) {
    userNameEl.textContent = nome;
  }

  // Atualiza avatar com iniciais
  const avatarEl = document.querySelector('.user-avatar');
  if (avatarEl) {
    const iniciais = nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    avatarEl.textContent = iniciais;
  }

  // Atualiza welcome section
  const welcomeH1 = document.querySelector('.welcome-section h1');
  if (welcomeH1) {
    welcomeH1.textContent = 'Olá, ' + nome + '!';
  }

  // Dispara evento de login para outros módulos
  window.dispatchEvent(new CustomEvent('kumon-auth', { detail: { user, nome } }));

  // Configura dropdown de perfil
  configurarDropdownPerfil(user, nome);
}

// Dropdown de perfil no botão da navbar
function configurarDropdownPerfil(user, nome) {
  const btnPerfil = document.querySelector('.user-profile');
  if (!btnPerfil) return;

  // Remove dropdown anterior se existir
  const existente = document.getElementById('auth-dropdown');
  if (existente) existente.remove();

  const email = user.email || '';
  const iniciais = nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const dropdown = document.createElement('div');
  dropdown.id = 'auth-dropdown';
  dropdown.className = 'auth-dropdown';
  dropdown.innerHTML = `
    <div class="auth-dropdown-header">
      <div class="auth-dropdown-avatar">${iniciais}</div>
      <div class="auth-dropdown-info">
        <span class="auth-dropdown-nome">${nome}</span>
        <span class="auth-dropdown-email">${email}</span>
      </div>
    </div>
    <div class="auth-dropdown-divider"></div>
    <button class="auth-dropdown-btn" id="btn-logout">
      <i class="bi bi-box-arrow-right"></i>
      <span>Sair da conta</span>
    </button>
  `;

  btnPerfil.style.position = 'relative';
  btnPerfil.appendChild(dropdown);

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  btnPerfil.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('auth-dropdown-open');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('auth-dropdown-open');
  });

  document.getElementById('btn-logout').addEventListener('click', async (e) => {
    e.stopPropagation();
    const supabase = window.kumonSupabase.getClient();
    await supabase.auth.signOut();
  });
}

// Obter usuário atual
async function getUsuarioAtual() {
  const supabase = window.kumonSupabase.getClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Inicialização principal
async function initAuth() {
  // Modo teste: pular login em localhost
  const isLocal = ['localhost', '127.0.0.1'].includes(location.hostname);
  if (isLocal) {
    console.log('[Auth] Modo local detectado — login ignorado');
    return;
  }

  const supabase = window.kumonSupabase.getClient();
  if (!supabase) {
    console.error('Supabase não inicializado');
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    removerOverlay(session);
  } else {
    criarOverlayLogin();
  }

  // Listener para mudanças de auth
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      removerOverlay(session);
    } else if (event === 'SIGNED_OUT') {
      criarOverlayLogin();
    }
  });
}

// Exportar funções
window.kumonAuth = {
  init: initAuth,
  getUsuario: getUsuarioAtual
};

// Executa quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}

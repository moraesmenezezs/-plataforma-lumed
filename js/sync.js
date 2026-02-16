// ============================================
// LuMED/Kumon - Sincronização com Supabase
// ============================================
// Salva e carrega todos os dados do localStorage
// na tabela user_data do Supabase.
// Funciona em todas as páginas (LuMED e Kumon).

(function() {
  'use strict';

  // Chaves do localStorage que devem ser sincronizadas
  const SYNC_KEYS = [
    // LuMED - Conteúdo Programático
    'lumed_conteudo_v2',
    // LuMED - Painel (tarefas, eventos, cronograma)
    'lumed_tarefas',
    'lumed_eventos',
    'cronogramaData',
    'lumed_crono_check',
    // LuMED - Timer / Desempenho
    'lumed_tempos_estudo',
    'lumed_meta_horas',
    'lumed_semana_atual',
    'lumed_trofeus',
    'lumed_questoes',
    'lumed_simulados',
    'lumed_crono_estado',
    'lumed_logins',
    // LuMED - Preferências
    'lumed_modo_foco',
    'lumed_modo_compacto',
    'widget_minimizado',
    // LuMED - Professor
    'lumed_aula_atual',
    // LuMED - Flashcards
    'lumed_flashcards',
    // Kumon - Progresso
    'kumon_usuario',
    'kumon_historico',
    'kumon_conquistas'
  ];

  let _syncTimer = null;
  let _client = null;
  let _userId = null;
  let _token = null;
  let _syncing = false;
  let _loaded = false;

  // Guardar referências originais ANTES de qualquer override
  const _originalSetItem = Storage.prototype.setItem;
  const _originalGetItem = Storage.prototype.getItem;
  const _originalRemoveItem = Storage.prototype.removeItem;

  // ── Obter cliente Supabase (LuMED ou Kumon) ──
  function getClient() {
    if (_client) return _client;
    // LuMED: _supabase é global (auth.js)
    if (typeof _supabase !== 'undefined' && _supabase) {
      _client = _supabase;
    // Kumon: window.kumonSupabase (supabase-config.js)
    } else if (window.kumonSupabase) {
      _client = window.kumonSupabase.getClient();
    }
    return _client;
  }

  // ── Coletar dados sincronizáveis do localStorage ──
  function coletarDados() {
    const dados = {};
    for (let i = 0; i < SYNC_KEYS.length; i++) {
      const val = _originalGetItem.call(localStorage, SYNC_KEYS[i]);
      if (val !== null) {
        dados[SYNC_KEYS[i]] = val;
      }
    }
    return dados;
  }

  // ── Salvar na nuvem (assíncrono, via cliente Supabase) ──
  async function salvarNaNuvem() {
    if (_syncing || !_userId) return;
    _syncing = true;
    try {
      const client = getClient();
      if (!client) return;

      const dados = coletarDados();
      const { error } = await client
        .from('user_data')
        .upsert({
          user_id: _userId,
          data: dados,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) {
        console.warn('[Sync] Erro ao salvar:', error.message);
      } else {
        console.log('[Sync] Dados salvos na nuvem');
      }
    } catch (err) {
      console.warn('[Sync] Erro:', err);
    } finally {
      _syncing = false;
    }
  }

  // ── Salvar urgente (page close — usa fetch com keepalive) ──
  function salvarUrgente() {
    if (!_userId || !_token) return;
    try {
      const dados = coletarDados();
      fetch(SUPABASE_URL + '/rest/v1/user_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + _token,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          user_id: _userId,
          data: dados,
          updated_at: new Date().toISOString()
        }),
        keepalive: true
      }).catch(function() {});
    } catch (e) {
      // Silencioso — página está fechando
    }
  }

  // ── Agendar sync (debounce 2s) ──
  function agendarSync() {
    if (_syncTimer) clearTimeout(_syncTimer);
    _syncTimer = setTimeout(salvarNaNuvem, 2000);
  }

  // ── Carregar dados da nuvem para o localStorage ──
  async function carregarDaNuvem(userId) {
    const client = getClient();
    if (!client) return false;

    try {
      const { data, error } = await client
        .from('user_data')
        .select('data, updated_at')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Sem dados na nuvem — salvar dados locais atuais
          console.log('[Sync] Primeiro acesso — salvando dados locais na nuvem');
          _userId = userId;
          await salvarNaNuvem();
          return false;
        }
        console.warn('[Sync] Erro ao carregar:', error.message);
        return false;
      }

      if (data && data.data) {
        const cloudData = data.data;
        let changed = false;

        for (let i = 0; i < SYNC_KEYS.length; i++) {
          const key = SYNC_KEYS[i];
          if (cloudData[key] !== undefined) {
            const local = _originalGetItem.call(localStorage, key);
            if (local !== cloudData[key]) {
              _originalSetItem.call(localStorage, key, cloudData[key]);
              changed = true;
            }
          }
        }

        if (changed) {
          console.log('[Sync] Dados carregados da nuvem');
        }
        return changed;
      }
    } catch (err) {
      console.warn('[Sync] Erro ao carregar:', err);
    }
    return false;
  }

  // ── Override Storage.prototype para auto-sync ──
  Storage.prototype.setItem = function(key, value) {
    _originalSetItem.call(this, key, value);
    if (this === localStorage && _userId && SYNC_KEYS.indexOf(key) !== -1) {
      agendarSync();
    }
  };

  Storage.prototype.removeItem = function(key) {
    _originalRemoveItem.call(this, key);
    if (this === localStorage && _userId && SYNC_KEYS.indexOf(key) !== -1) {
      agendarSync();
    }
  };

  // ── Inicializar sync ao logar ──
  async function initSync(userId) {
    if (_loaded && _userId === userId) return;
    _userId = userId;

    // Cache do token para salvarUrgente
    const client = getClient();
    if (client) {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session) _token = session.access_token;
      } catch (e) {}
    }

    // Evitar loop infinito de reload (bloqueia por 30s após último reload)
    const reloadFlag = sessionStorage.getItem('lumed_sync_reloaded');
    if (reloadFlag) {
      const lastReload = parseInt(reloadFlag) || 0;
      if (Date.now() - lastReload < 30000) {
        _loaded = true;
        console.log('[Sync] Reload recente — usando dados locais');
        return;
      }
    }

    const changed = await carregarDaNuvem(userId);
    _loaded = true;

    if (changed) {
      sessionStorage.setItem('lumed_sync_reloaded', String(Date.now()));
      window.location.reload();
    }
  }

  // ── Configurar listener de autenticação ──
  function setupAuthListener() {
    const client = getClient();
    if (!client) {
      // Supabase ainda não carregou — tentar novamente
      setTimeout(setupAuthListener, 500);
      return;
    }

    // Verificar sessão existente
    client.auth.getSession().then(function(result) {
      const session = result.data.session;
      if (session && session.user) {
        initSync(session.user.id);
      }
    });

    // Ouvir mudanças futuras (login/logout)
    client.auth.onAuthStateChange(function(event, session) {
      if (event === 'SIGNED_IN' && session && session.user) {
        initSync(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        // Salvar antes de deslogar
        if (_userId) {
          salvarNaNuvem();
        }
        _userId = null;
        _token = null;
        _loaded = false;
      }
    });
  }

  // ── Salvar ao sair/minimizar a página ──
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && _userId) {
      if (_syncTimer) {
        clearTimeout(_syncTimer);
        _syncTimer = null;
      }
      salvarUrgente();
    }
  });

  window.addEventListener('beforeunload', function() {
    if (_userId) {
      if (_syncTimer) {
        clearTimeout(_syncTimer);
        _syncTimer = null;
      }
      salvarUrgente();
    }
  });

  // ── Iniciar ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAuthListener);
  } else {
    setupAuthListener();
  }

  // ── API pública (para debug/uso manual) ──
  window.lumedSync = {
    salvar: salvarNaNuvem,
    carregar: function() {
      return _userId ? carregarDaNuvem(_userId) : Promise.resolve(false);
    },
    status: function() {
      return { userId: _userId, syncing: _syncing, loaded: _loaded };
    }
  };
})();

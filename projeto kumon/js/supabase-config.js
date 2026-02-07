// ============================================
// Kumon Digital - Configuração Supabase
// ============================================

// Usando o mesmo projeto Supabase da LuMED
const SUPABASE_URL = 'https://scbzgbpuhiecadphajkd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjYnpnYnB1aGllY2FkcGhhamtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NjUzOTMsImV4cCI6MjA4NTU0MTM5M30.O0hRv63aXYwdcUNIyVw8K58h8ATpWEu8-K9ZL_CFcBo';

// Cliente Supabase
let _supabase = null;

function getSupabase() {
  if (!_supabase && window.supabase) {
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

// Exportar para uso global
window.kumonSupabase = {
  getClient: getSupabase,
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY
};

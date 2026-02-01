// ============================================
// LuMED - Configuração do Firebase
// ============================================

// INSTRUÇÕES:
// 1. Acesse https://console.firebase.google.com
// 2. Clique em "Criar projeto" ou "Adicionar projeto"
// 3. Nome do projeto: "lumed-aulas" (ou outro nome)
// 4. Desative o Google Analytics (não precisa)
// 5. Clique em "Criar projeto"
// 6. No painel, clique no ícone </> (Web)
// 7. Nome do app: "lumed-web"
// 8. Copie as credenciais e cole abaixo

const firebaseConfig = {
  apiKey: "AIzaSyBdovdrOWc5Lt4VJu_sa2Wvs_79wuo3Uog",
  authDomain: "lumed-aulas.firebaseapp.com",
  projectId: "lumed-aulas",
  storageBucket: "lumed-aulas.firebasestorage.app",
  messagingSenderId: "572329189671",
  appId: "1:572329189671:web:7faf24cea3d230a8f00902"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referências do banco de dados
const db = firebase.firestore();
const aulasRef = db.collection('aulas');
const materiasRef = db.collection('materias');

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

// Formatar data para exibição
function formatarData(timestamp) {
  if (!timestamp) return '';
  const data = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Formatar duração
function formatarDuracao(minutos) {
  if (!minutos) return '';
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  if (horas > 0) {
    return `${horas}h ${mins}min`;
  }
  return `${mins}min`;
}

// Gerar ID único
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

console.log('Firebase configurado com sucesso!');

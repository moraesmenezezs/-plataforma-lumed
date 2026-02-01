# O PROJETO LUMED - por Maria Luisa

---

## Mensagem da criadora

Oi! Se voce esta lendo isso, provavelmente esta dando continuidade a esse projeto ou tentando entender como ele funciona.

Eu sou a Maria Luisa. Criei essa plataforma durante minha preparacao para o ENEM e vestibulares de Medicina. Cada funcionalidade foi pensada para resolver um problema real que eu tinha no dia a dia dos estudos. Comecei sem saber nada de programacao e fui aprendendo no caminho, com muita ajuda da inteligencia artificial.

Esse projeto e mais do que um site. E o reflexo de meses de dedicacao, noites viradas, ideias malucas que deram certo e muita vontade de criar algo que ajudasse de verdade.

Para quem esta lendo: um beijo enorme! Vai dar tudo certo. Confia no processo, estuda com consistencia e nao desiste. O resultado vem, mesmo quando parece que nao. Eu acredito em voce.

Com todo carinho do mundo,

--- Maria Luisa

---

---

# TUDO O QUE FOI CONSTRUIDO

---

## 1. VISAO GERAL DA PLATAFORMA

A **Plataforma LuMED** (https://plataformalumed.site) e uma plataforma educacional completa para estudantes que estao se preparando para ENEM, vestibulares (PSI, UEA) e concursos.

### O que ela tem:

- **Painel principal** - Dashboard com banner de boas-vindas, contagem regressiva para provas, lista de tarefas da semana e radar dos vestibulares
- **Planner semanal** - Grade de horarios por dia da semana com materias coloridas e calendario com eventos
- **Timer de estudos** - Cronometro com frases motivacionais que salva o tempo estudado
- **Aulas ao vivo e gravadas** - Sistema completo de transmissao via Google Meet com gravacao automatica
- **Editais organizados** - Conteudo programatico completo do PSI, UEA e ENEM com checklist para marcar o que ja estudou
- **Desempenho** - Trofeus semanais, contagem de questoes resolvidas, graficos de evolucao por materia
- **Sistema de login** - Autenticacao por email/senha com Supabase Auth
- **Painel do professor** - Interface para iniciar/encerrar aulas e sincronizar videos
- **Widget motivacional** - Mensagem de motivacao com foto no canto da tela

---

## 2. ESTRUTURA DE ARQUIVOS

```
meu site/
│
├── index.html              Pagina principal (Painel + Planner + Timer + Aulas)
├── conteudo.html            Editais organizados por prova e materia
├── desempenho.html          Trofeus, questoes, graficos de evolucao
├── aulas.html               Pagina de aulas gravadas (para alunos)
├── professor.html           Painel do professor (iniciar/encerrar aulas)
│
├── css/
│   ├── style.css            Estilos globais (tema roxo/rosa) + login
│   ├── conteudo.css         Estilos dos editais
│   ├── aulas.css            Estilos da pagina de aulas
│   └── professor.css        Estilos do painel do professor
│
├── js/
│   ├── script.js            Logica principal (tarefas, planner, timer, calendario)
│   ├── conteudo.js          Logica dos editais com checklist e niveis
│   ├── desempenho.js        Trofeus, questoes, graficos
│   ├── aulas.js             Pagina de aulas dos alunos
│   ├── professor.js         Painel do professor
│   ├── firebase-config.js   Configuracao do Firebase
│   └── auth.js              Sistema de login (Supabase)
│
├── SCRIPT-FINAL-V3.js       Script do Google Apps Script (sincroniza videos)
├── sitemap.xml              Mapa do site para SEO
├── robots.txt               Configuracao para buscadores
│
└── O PROJETO - MARIA/       Esta pasta com toda a documentacao
```

---

## 3. TECNOLOGIAS USADAS

| Tecnologia | Para que serve |
|------------|---------------|
| **HTML/CSS/JS puro** | Todo o frontend, sem framework |
| **Firebase Firestore** | Banco de dados das aulas (ao vivo e gravadas) |
| **Supabase Auth** | Sistema de login por email/senha |
| **Google Meet** | Aulas ao vivo (link fixo para todos) |
| **Google Drive** | Armazenamento dos videos gravados |
| **Google Apps Script** | Automatiza a sincronizacao de videos do Drive com Firebase |
| **Vercel** | Hospedagem do site (deploy automatico) |
| **Bootstrap Icons** | Todos os icones da plataforma |
| **Plus Jakarta Sans** | Fonte principal do design |

---

## 4. SISTEMA DE LOGIN (Supabase Auth)

### Como funciona

1. Ao abrir qualquer pagina, o `js/auth.js` verifica se existe uma sessao ativa
2. Se NAO estiver logado: overlay roxo/rosa cobre toda a tela com formulario de login
3. O usuario pode **criar conta** (nome + email + senha) ou **fazer login**
4. Ao autenticar: overlay desaparece com animacao, nome aparece na navbar
5. Avatar com iniciais do nome (ex: "ML" para Maria Luisa) com gradiente roxo/rosa
6. Clicando no perfil: dropdown com nome, email e botao "Sair da conta"
7. Ao sair: overlay de login reaparece

### Credenciais do Supabase

- **Projeto:** LuMED-Auth
- **URL:** https://scbzgbpuhiecadphajkd.supabase.co
- **Dashboard:** https://supabase.com/dashboard/project/scbzgbpuhiecadphajkd
- **Anon Key:** esta em `js/auth.js` (linha 6)
- **Email autoconfirm:** ATIVADO (usuario nao precisa confirmar email)

### Conta de teste

- **Email:** teste@lumed.com
- **Senha:** teste123

### Paginas protegidas (todas)

O login e exigido em TODAS as paginas:
- index.html
- conteudo.html
- desempenho.html
- aulas.html
- professor.html

---

## 5. PAINEL PRINCIPAL (index.html)

A pagina principal tem **4 secoes** que alternam pela navbar:

### 5.1 Painel (tela inicial)
- Banner com "Ola, [Nome do usuario]"
- Contagem regressiva para ENEM, UEA (MACRO) e PSI
- Estatisticas: questoes resolvidas, tempo de estudo, simulados feitos
- Lista de tarefas da semana com checklist e barra de progresso
- Ao adicionar tarefa: escolhe materia, conteudo e quantidade de questoes
- Radar dos vestibulares com dias restantes

### 5.2 Planner
- Grade semanal (Dom a Sab) com horarios
- Calendario com navegacao por mes
- Eventos: simulados, provas, eventos personalizados
- Materias com cores para adicionar na grade
- Dados salvos no localStorage

### 5.3 Timer
- Cronometro (horas:minutos:segundos)
- Botao iniciar/pausar/salvar
- Frases motivacionais aleatorias
- Tempo salvo e exibido no banner principal

### 5.4 Aulas (integrado)
- Mesma funcionalidade do aulas.html
- Banner "AO VIVO" quando tem aula
- Cards de aulas gravadas
- Filtros por materia, mes e busca

---

## 6. EDITAIS ORGANIZADOS (conteudo.html)

### O que tem
- Conteudo programatico de **3 provas**: PSI, MACRO UEA e ENEM
- Cada prova tem todas as **materias** com seus topicos
- Sistema de **niveis** por materia
- **Checkbox** para marcar o que ja estudou
- **Barra de progresso** por materia e geral
- **Animacao de confete** quando completa 100% de uma materia
- Dados salvos no **localStorage** do navegador

### Materias cobertas
Portugues, Matematica, Historia, Geografia, Biologia, Fisica, Quimica, Filosofia, Sociologia, Ingles, Redacao

---

## 7. DESEMPENHO (desempenho.html)

### 7.1 Trofeus Semanais
- Configure sua meta diaria de horas (padrao: 4h)
- Registre horas estudadas por dia
- Se cumprir a meta em **4 ou mais dias da semana**, ganha um trofeu!
- Galeria de trofeus conquistados

### 7.2 Questoes Resolvidas
- Contador total de questoes
- Adicione questoes por materia
- Historico recente com data e materia
- Estatisticas: hoje, esta semana, este mes

### 7.3 Evolucao nos Simulados
- Grafico de linha com pontuacao ao longo dos meses
- Filtro por materia
- Ultima nota e tendencia (+/- pontos)

### 7.4 Desempenho por Materia
- Barras de progresso coloridas para cada materia
- Porcentagem de acertos

---

## 8. SISTEMA DE AULAS - EXPLICACAO COMPLETA

Este e o sistema mais complexo. Envolve 4 servicos: site, Google Meet, Google Drive e Firebase.

### 8.1 O Fluxo Completo

```
PROFESSOR                              ALUNO
    |                                    |
    | 1. Abre professor.html             |
    | 2. Escolhe materia e tema          |
    | 3. Clica "INICIAR AULA"           |
    |    -> Salva no Firebase            |
    |       (status: "ao-vivo")          |
    |    -> Abre Google Meet             |
    |                                    |
    |                                    | 4. Ve banner "AO VIVO AGORA"
    |                                    |    em aulas.html
    |                                    | 5. Clica e entra no Meet
    |                                    |
    | 6. GRAVA a aula no Meet            |
    |    (clicar em ⋮ -> Gravar)         |
    |                                    |
    | 7. Para a gravacao no Meet         |
    | 8. Clica "ENCERRAR AULA"          |
    |    -> Firebase: "aguardando-video" |
    |                                    |
    | 9. Video vai pro Drive             |
    |    (automatico, demora ~2min)      |
    |                                    |
    | 10. Apps Script encontra o video   |
    |     no Drive e atualiza Firebase   |
    |     (status: "finalizada" + link)  |
    |                                    |
    |                                    | 11. Ve aula gravada com
    |                                    |     botao "Assistir"
```

### 8.2 Pagina do Professor (professor.html)

**O que faz:**
- Formulario para iniciar aula (materia + tema)
- Timer de duracao da aula em andamento
- Botao "ENCERRAR AULA"
- Botao "SINCRONIZAR VIDEO" (conecta com Apps Script)
- Historico das ultimas aulas
- Auto-sync a cada 30 segundos

**Como usar:**
1. Abra professor.html
2. Selecione a materia no dropdown
3. Digite o tema da aula
4. Clique "INICIAR AULA"
5. O Meet abre automaticamente
6. No Meet, clique ⋮ -> "Gravar reuniao"
7. De a aula
8. Pare a gravacao no Meet
9. Volte e clique "ENCERRAR AULA"
10. Espere ~2min e clique "SINCRONIZAR VIDEO"

**Google Meet - Link fixo:**
- Link: https://meet.google.com/tpq-zxvy-cpe
- Codigo: tpq-zxvy-cpe
- Todas as aulas usam o mesmo link

### 8.3 Pagina de Aulas dos Alunos (aulas.html)

**O que mostra:**
- Cards de aulas com materia, tema, data e duracao
- Banner "AO VIVO AGORA" quando professor esta dando aula
- Filtros por materia, mes e busca por tema
- Status "Processando..." para aulas aguardando video
- Botao "Assistir Aula" abre o video do Drive

### 8.4 Firebase Firestore

- **Projeto:** lumed-aulas
- **Console:** https://console.firebase.google.com/project/lumed-aulas
- **Colecao:** `aulas`

Cada documento de aula:
```
{
  id: "abc123",
  materia: "biologia",
  tema: "Sistema Nervoso",
  meetLink: "https://meet.google.com/tpq-zxvy-cpe",
  dataInicio: Timestamp,
  dataFim: Timestamp,
  duracao: 45,
  status: "finalizada",
  videoUrl: "https://drive.google.com/file/d/xxx/view"
}
```

Status possiveis:
- `ao-vivo` - Aula acontecendo agora
- `aguardando-video` - Aula encerrada, video processando
- `finalizada` - Video disponivel para alunos

### 8.5 Google Apps Script (SCRIPT-FINAL-V3.js)

O script roda no Google Apps Script (NAO no site). Ele conecta o Drive ao Firebase.

**O que faz:**
1. Busca videos MP4 no Drive com "tpq" no nome
2. Busca em subpastas de "Meet Recordings"
3. Busca aulas com status "aguardando-video" no Firebase
4. Combina video + aula pela data mais proxima
5. Atualiza Firebase com link do video e muda para "finalizada"

**Funcoes:**
| Funcao | O que faz |
|--------|----------|
| `sincronizar()` | Busca videos e vincula com aulas |
| `testar()` | Debug - mostra videos e aulas nos logs |
| `limparControle()` | Limpa cache de videos processados |
| `ativarTrigger()` | Ativa sync automatico (1 min) |
| `desativarTrigger()` | Desativa sync automatico |

**Como configurar:**
1. Acesse https://script.google.com (com conta Google Workspace)
2. Crie projeto "LuMED Sync"
3. Cole o conteudo de `SCRIPT-FINAL-V3.js`
4. Execute `ativarTrigger()` para sync automatico
5. Faca deploy: Implantar -> Nova implantacao -> Aplicativo da Web
6. Execute como: Eu | Acesso: Qualquer pessoa
7. Copie URL e cole em `professor.js` linha 28

**URL atual:**
```
https://script.google.com/macros/s/AKfycbyfeVFRCD_lj9BdrYDP7T-xI9H6sI9FyuboIE_Yhc8SsRFfSxw9UhL9kL6-zfOGejKk/exec
```

---

## 9. GOOGLE WORKSPACE - POR QUE PRECISA DO PLANO PAGO

### O problema

A gravacao de reunioes no Google Meet **so funciona** com Google Workspace pago. A conta Google gratuita (Gmail pessoal) NAO permite gravar.

### Qual plano contratar

**Google Workspace Business Starter** (o mais barato que permite gravacao):
- Preco: ~R$ 33,60/mes por usuario
- Inclui: Meet com gravacao, 30 GB de Drive, email personalizado
- Contratar em: https://workspace.google.com/pricing

**Google Workspace Business Standard** (se precisar de mais espaco):
- Preco: ~R$ 67,20/mes por usuario
- Inclui: tudo do Starter + 2 TB de armazenamento + transcricoes

### Como configurar

1. Contrate o plano em workspace.google.com
2. Use um dominio (pode ser plataformalumed.site)
3. Crie a conta do professor com esse dominio
4. O Meet dessa conta tera o botao de gravar

### Se o botao de gravar nao aparece

- Verifique se esta usando a conta do Workspace (nao Gmail pessoal)
- No Admin Console do Workspace: Configuracoes do Meet -> ative gravacao
- Tente em janela anonima para garantir que esta na conta certa

---

## 10. HOSPEDAGEM (Vercel)

- **URL do site:** https://plataformalumed.site
- **Plataforma:** Vercel
- **Projeto:** lumed
- **GitHub:** https://github.com/moraesmenezezs/-plataforma-lumed.git

### Como fazer deploy

```bash
cd "C:\Users\MARIA LUISA\OneDrive\Desktop\meu site"
npx vercel --prod --yes
```

Isso sobe todas as alteracoes para o site em producao.

### Se der erro no deploy

1. Verifique login: `npx vercel whoami`
2. Se nao logado: `npx vercel login`
3. Tente novamente: `npx vercel --prod --yes`

---

## 11. DESIGN E TEMA VISUAL

- **Paleta:** Roxo e Rosa (gradientes)
- **Cor primaria:** #a855f7 (roxo)
- **Cor secundaria:** #ec4899 (rosa)
- **Background:** #f5f3f8 (roxo bem claro)
- **Cards:** #faf9fc (quase branco)
- **Fonte:** Plus Jakarta Sans (Google Fonts)
- **Icones:** Bootstrap Icons
- **Responsivo:** Adaptado para mobile

---

## 12. CUSTOS MENSAIS

| Servico | Custo | Observacao |
|---------|-------|-----------|
| Google Workspace Starter | ~R$ 33,60/mes | OBRIGATORIO para gravar aulas |
| Firebase (Spark) | Gratis | Plano gratuito suficiente |
| Supabase (Free) | Gratis | Ate 50.000 usuarios/mes |
| Vercel (Hobby) | Gratis | Hospedagem do site |
| Dominio | ~R$ 40/ano | plataformalumed.site |

**Total: ~R$ 33,60/mes + R$ 40/ano do dominio**

---

## 13. CREDENCIAIS E ACESSOS IMPORTANTES

### Firebase
- Console: https://console.firebase.google.com/project/lumed-aulas
- Arquivo de config: `js/firebase-config.js`

### Supabase
- Dashboard: https://supabase.com/dashboard/project/scbzgbpuhiecadphajkd
- Arquivo de config: `js/auth.js` (linhas 5-6)

### Vercel
- Dashboard: https://vercel.com/moraesmenezezs-projects/lumed

### GitHub
- Repositorio: https://github.com/moraesmenezezs/-plataforma-lumed

### Google Apps Script
- URL do Web App: (ver `professor.js` linha 28)
- Configurar em: https://script.google.com

### Google Meet
- Link fixo: https://meet.google.com/tpq-zxvy-cpe

---

## 14. PROBLEMAS COMUNS E SOLUCOES

### Login nao funciona
- Verifique se Supabase esta ativo: https://supabase.com/dashboard/project/scbzgbpuhiecadphajkd
- Se projeto pausou, clique "Restore"
- Verifique credenciais em `js/auth.js`

### Video nao sincroniza
1. Espere ~2 minutos apos parar gravacao
2. Clique "SINCRONIZAR VIDEO" no painel do professor
3. Se nao funcionar, abra Apps Script e execute `sincronizar()`
4. Execute `limparControle()` e tente de novo
5. Verifique pasta "Meet Recordings" no Drive

### Site nao atualiza apos mudancas
- Mude o `?v=X` no link do CSS (ex: `style.css?v=11`)
- Hard refresh: Ctrl+Shift+R
- Faca novo deploy: `npx vercel --prod --yes`

### Trigger do Apps Script parou
1. Abra Apps Script -> icone de relogio (Acionadores)
2. Se vazio, execute `ativarTrigger()`
3. Se com erro, execute `desativarTrigger()` e depois `ativarTrigger()`

### Aula presa em "aguardando-video"
- No Firebase Console, edite o documento manualmente
- Mude status para "finalizada" e adicione o videoUrl

---

## 15. MATERIAS CONFIGURADAS

| Codigo | Nome | Cor |
|--------|------|-----|
| portugues | Portugues | #ef4444 (vermelho) |
| matematica | Matematica | #3b82f6 (azul) |
| historia | Historia | #f59e0b (amarelo) |
| geografia | Geografia | #10b981 (verde) |
| biologia | Biologia | #22c55e (verde claro) |
| fisica | Fisica | #8b5cf6 (roxo) |
| quimica | Quimica | #ec4899 (rosa) |
| filosofia | Filosofia | #6366f1 (indigo) |
| sociologia | Sociologia | #14b8a6 (teal) |
| ingles | Ingles | #06b6d4 (cyan) |
| redacao | Redacao | #f97316 (laranja) |

---

*Documentacao criada em Fevereiro de 2026*
*Plataforma LuMED - Feita com dedicacao por Maria Luisa*

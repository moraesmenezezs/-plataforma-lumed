# LuMED - Resumo do Sistema de Sincronização de Aulas

## Data: 28/01/2026

---

## VISÃO GERAL

Sistema para gravar aulas do Google Meet e exibi-las automaticamente na plataforma LuMED para alunos.

### Fluxo:
1. Professor inicia aula no painel (professor.html)
2. Aula fica "ao-vivo" no Firebase
3. Professor grava no Meet (link fixo: tpq-zxvy-cpe)
4. Ao encerrar, status muda para "aguardando-video"
5. Script do Apps Script encontra o vídeo no Drive
6. Atualiza aula para "finalizada" com URL do vídeo
7. Alunos veem a aula em aulas.html

---

## ARQUIVOS PRINCIPAIS

### Site:
- `professor.html` - Painel do professor
- `aulas.html` - Página dos alunos
- `js/professor.js` - Lógica do painel
- `js/aulas.js` - Lógica das aulas
- `js/firebase-config.js` - Configuração Firebase
- `css/professor.css` - Estilos do painel
- `css/aulas.css` - Estilos das aulas

### Google Apps Script:
- `SCRIPT-FINAL-V3.js` - Script otimizado (USE ESTE!)

---

## CONFIGURAÇÕES

### Firebase:
- Projeto: `lumed-aulas`
- Coleção: `aulas`

### Google Meet:
- Link fixo: `https://meet.google.com/tpq-zxvy-cpe`
- Código: `tpq-zxvy-cpe`

### URL do Web App (Apps Script):
```
https://script.google.com/macros/s/AKfycbyfeVFRCD_lj9BdrYDP7T-xI9H6sI9FyuboIE_Yhc8SsRFfSxw9UhL9kL6-zfOGejKk/exec
```
*(Atualizar se fizer novo deploy)*

---

## COMO CONFIGURAR O APPS SCRIPT

1. Acesse: https://script.google.com
2. Crie ou abra projeto "LuMED"
3. Cole o conteúdo de `SCRIPT-FINAL-V3.js`
4. Salve (Ctrl+S)

### Funções disponíveis:
- `sincronizar()` - Sincroniza vídeos com aulas
- `testar()` - Mostra vídeos e aulas encontrados
- `limparControle()` - Limpa cache de processados
- `ativarTrigger()` - Ativa sync automático (1 min)
- `desativarTrigger()` - Desativa sync automático

### Deploy do Web App:
1. Implantar → Nova implantação
2. Tipo: Aplicativo da Web
3. Executar como: Eu
4. Quem pode acessar: Qualquer pessoa
5. Implantar e copiar URL

---

## COMO USAR (PROFESSOR)

### Antes da aula:
1. Abra professor.html
2. Selecione matéria e tema
3. Clique "INICIAR AULA"
4. No Meet, clique ⋮ → "Gravar reunião"

### Após a aula:
1. Pare a gravação no Meet
2. Clique "ENCERRAR AULA" no painel
3. Aguarde ~2 minutos (vídeo processa no Drive)
4. Clique "SINCRONIZAR VÍDEO" ou aguarde sync automático

---

## PROBLEMAS COMUNS

### Vídeo não sincroniza:
1. Verifique se gravação foi salva no Drive (pasta "Meet Recordings")
2. Execute `testar()` no Apps Script para ver logs
3. Execute `sincronizar()` manualmente
4. Se necessário, `limparControle()` e tente novamente

### Botão sync não funciona:
1. Verifique URL do Web App em professor.js (linha 28)
2. Faça novo deploy do Apps Script
3. Atualize a URL

### Trigger não roda:
1. Execute `desativarTrigger()`
2. Execute `ativarTrigger()`
3. Verifique em Acionadores se está ativo

---

## ESTRUTURA DO FIREBASE (Firestore)

### Coleção: `aulas`

Documento exemplo:
```json
{
  "id": "abc123",
  "materia": "biologia",
  "tema": "Sistema Nervoso",
  "meetLink": "https://meet.google.com/tpq-zxvy-cpe",
  "dataInicio": "Timestamp",
  "dataFim": "Timestamp",
  "duracao": 45,
  "status": "finalizada",
  "videoUrl": "https://drive.google.com/file/d/xxx/view"
}
```

### Status possíveis:
- `ao-vivo` - Aula em andamento
- `aguardando-video` - Aula encerrada, aguardando vídeo
- `finalizada` - Vídeo vinculado, pronta para alunos

---

## MATÉRIAS CONFIGURADAS

| Código | Nome |
|--------|------|
| biologia | Biologia |
| quimica | Química |
| fisica | Física |
| matematica | Matemática |
| portugues | Português |
| historia | História |
| geografia | Geografia |
| filosofia | Filosofia |
| sociologia | Sociologia |
| ingles | Inglês |
| redacao | Redação |

---

## MELHORIAS IMPLEMENTADAS

1. **Busca dupla**: Procura vídeos por nome ("tpq") E em subpastas do Meet Recordings
2. **Auto-sync**: Site tenta sincronizar a cada 30 segundos
3. **Múltiplas tentativas**: Botão sync tenta 3 vezes
4. **Trigger 1 minuto**: Apps Script roda automaticamente

---

## COMANDOS ÚTEIS (Console do navegador)

No painel do professor, abra F12 → Console:

```javascript
// Ver aulas aguardando vídeo
sincManual()

// Forçar sync
sincronizarVideo()
```

---

## CONTATO/SUPORTE

Para problemas com Claude Code:
https://github.com/anthropics/claude-code/issues

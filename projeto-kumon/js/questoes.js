// ============================================
// Kumon Digital - Geração Algorítmica de Questões
// 8 Fases, 30 Níveis — Matemática Completa ENEM
// DIFICULDADE AUMENTADA — Números grandes, operações longas
// ============================================

// ===== FUNÇÕES AUXILIARES =====

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escolher(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mdc(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  return b === 0 ? a : mdc(b, a % b);
}

function mmc(a, b) {
  return Math.abs(a * b) / mdc(a, b);
}

function decomporFatores(n) {
  const fatores = [];
  let d = 2;
  let num = Math.abs(n);
  while (num > 1) {
    while (num % d === 0) {
      fatores.push(d);
      num /= d;
    }
    d++;
  }
  return fatores;
}

function ehQuadradoPerfeito(n) {
  if (n < 0) return false;
  const raiz = Math.round(Math.sqrt(n));
  return raiz * raiz === n;
}

function simplificarFracao(num, den) {
  const d = mdc(Math.abs(num), Math.abs(den));
  return [num / d, den / d];
}

// ===== CONFIGURAÇÃO DOS NÍVEIS =====

const NIVEIS_CONFIG = {

  // =============================================
  // FASE 1 — FUNDAMENTOS (verde #22c55e)
  // =============================================

  '1_1': {
    nome: 'Soma',
    descricao: 'Adição com números grandes e múltiplos termos',
    fase: 1, nivel: 1,
    icone: 'bi-plus-lg',
    tempoLimite: 300,
    totalQuestoes: 20,
    dicas: [
      'Complete até 10: 8 + 7 → pense 8 + 2 = 10, sobra 5 → 15.',
      'Somar 9: some 10 e tire 1. Ex: 36 + 9 = 36 + 10 − 1 = 45.',
      'Decomponha: 47 + 28 → 47 + 30 − 2 = 75. Arredonde e ajuste!',
      'Doubles: se sabe 6+6=12, então 6+7=13 (um a mais).'
    ],
    gerar: (sublivel) => gerarSoma(sublivel)
  },
  '1_2': {
    nome: 'Subtração',
    descricao: 'Subtração com números grandes',
    fase: 1, nivel: 2,
    icone: 'bi-dash-lg',
    tempoLimite: 300,
    totalQuestoes: 20,
    dicas: [
      'Arredonde: 52 − 38 → 52 − 40 + 2 = 14. Tire o redondo e ajuste!',
      'Subtrair 9: tire 10 e some 1. Ex: 43 − 9 = 43 − 10 + 1 = 34.',
      'Conte pra frente: 63 − 47 → de 47 até 50 = 3, de 50 até 63 = 13 → total 16.',
      'Confira: resultado + o que subtraiu = número original. 14 + 38 = 52? ✓'
    ],
    gerar: (sublivel) => gerarSubtracao(sublivel)
  },
  '1_3': {
    nome: 'Multiplicação',
    descricao: 'Multiplicação com números grandes',
    fase: 1, nivel: 3,
    icone: 'bi-x-lg',
    tempoLimite: 360,
    totalQuestoes: 20,
    dicas: [
      '×5: metade do número com um 0. Ex: 8×5 → metade de 8=4, coloca 0 → 40.',
      '×9: o resultado soma 9. Ex: 9×7=63 → 6+3=9. E o primeiro dígito é (n−1).',
      '×11: repita o dígito. 11×7=77. Para 2 dígitos: 11×12→1(1+2)2=132.',
      '×4: dobre duas vezes. Ex: 7×4 → 7×2=14, 14×2=28.'
    ],
    gerar: (sublivel) => gerarMultiplicacao(sublivel)
  },
  '1_4': {
    nome: 'Divisão',
    descricao: 'Divisões com números grandes',
    fase: 1, nivel: 4,
    icone: 'bi-slash-lg',
    tempoLimite: 360,
    totalQuestoes: 20,
    dicas: [
      'Pense na tabuada ao contrário: 56÷8 = ? → 8×?=56 → 7.',
      'Divisível por 2: termina em par. Por 5: termina em 0 ou 5.',
      'Divisível por 3: soma dos dígitos divisível por 3. Ex: 72 → 7+2=9 → sim!',
      '÷5: multiplique por 2 e divida por 10. Ex: 45÷5 → 45×2=90 → 90÷10=9.'
    ],
    gerar: (sublivel) => gerarDivisao(sublivel)
  },

  // =============================================
  // FASE 2 — FRAÇÕES (azul #3b82f6)
  // =============================================

  '2_1': {
    nome: 'Conceito e Simplificação',
    descricao: 'Simplifique frações ao máximo',
    fase: 2, nivel: 1,
    icone: 'bi-percent',
    tempoLimite: 360,
    totalQuestoes: 18,
    dicas: [
      'Ambos pares? Divida por 2. Repita até não dar mais. Ex: 24/36 → 12/18 → 6/9.',
      'Soma dos dígitos divisível por 3? Divida por 3. Ex: 18/27 → 6/9 → 2/3.',
      'Termina em 0 ou 5? Divida por 5. Ex: 15/25 → 3/5.',
      'Atalho: ache o MDC de uma vez. MDC(12,18)=6 → 12/18 = 2/3 direto!'
    ],
    gerar: (sublivel) => gerarSimplificacao(sublivel)
  },
  '2_2': {
    nome: 'Soma e Subtração de Frações',
    descricao: 'Some e subtraia frações',
    fase: 2, nivel: 2,
    icone: 'bi-plus-slash-minus',
    tempoLimite: 420,
    totalQuestoes: 18,
    dicas: [
      'Mesmo denominador? Fácil: some/subtraia só os de cima! 2/7 + 3/7 = 5/7.',
      'Denominadores diferentes? Multiplique em X: a/b + c/d = (a×d + c×b) / (b×d).',
      'Truque: x/5 = 2x/10. Transforme /5 em /10 para facilitar. Ex: 3/5 + 1/10 = 6/10 + 1/10 = 7/10.',
      'Sempre simplifique no final! Se deu 4/8, divida ambos por 4 → 1/2.'
    ],
    gerar: (sublivel) => gerarSomaSubFracoes(sublivel)
  },
  '2_3': {
    nome: 'Multiplicação e Divisão de Frações',
    descricao: 'Multiplique e divida frações',
    fase: 2, nivel: 3,
    icone: 'bi-x-diamond',
    tempoLimite: 420,
    totalQuestoes: 15,
    dicas: [
      'Multiplique reto: (a/b) × (c/d) = (a×c)/(b×d). Simples assim!',
      'Divisão? Inverte a 2ª e multiplica: (a/b) ÷ (c/d) = (a×d)/(b×c).',
      'Simplifique ANTES em diagonal! 2/3 × 3/4 → corta o 3 → 2/4 = 1/2. Menos conta!',
      'Fração × inteiro: coloque o inteiro sobre 1. Ex: 3/4 × 6 = 3/4 × 6/1 = 18/4 = 9/2.'
    ],
    gerar: (sublivel) => gerarMultDivFracoes(sublivel)
  },
  '2_4': {
    nome: 'Números Mistos',
    descricao: 'Converta entre mistos e impróprias',
    fase: 2, nivel: 4,
    icone: 'bi-type-h1',
    tempoLimite: 480,
    totalQuestoes: 15,
    dicas: [
      'Misto → Imprópria: inteiro × debaixo + em cima. Ex: 2 3/4 → 2×4+3=11 → 11/4.',
      'Imprópria → Misto: divida! 17÷5 = 3 resto 2 → 3 2/5. Quociente é o inteiro.',
      'Truque rápido: 3 1/2 = 7/2. Pense: 3×2=6, +1=7. Pronto!',
      'Responda frações impróprias como a/b (ex: 11/4). O denominador não muda!'
    ],
    gerar: (sublivel) => gerarNumerosMistos(sublivel)
  },
  '2_5': {
    nome: 'Operações Combinadas com Frações',
    descricao: 'Expressões com várias operações de frações',
    fase: 2, nivel: 5,
    icone: 'bi-calculator',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'Ordem: 1º parênteses → 2º × e ÷ → 3º + e −. Sempre nessa sequência!',
      'Simplifique em diagonal ANTES de multiplicar. Menos conta = menos erro.',
      'Truque: a ÷ b/c = a × c/b. Dividir por fração = multiplicar pelo inverso.',
      'Faça passo a passo e simplifique cada resultado parcial. Não acumule frações enormes!'
    ],
    gerar: (sublivel) => gerarOperacoesCombFracoes(sublivel)
  },

  // =============================================
  // FASE 3 — MMC, MDC E EXPRESSÕES (roxo #8b5cf6)
  // =============================================

  '3_1': {
    nome: 'MMC e MDC',
    descricao: 'Calcule MMC e MDC de dois números',
    fase: 3, nivel: 1,
    icone: 'bi-intersect',
    tempoLimite: 420,
    totalQuestoes: 18,
    dicas: [
      'MDC rápido: divida o maior pelo menor e repita com o resto. 18÷12=1 resto 6, 12÷6=2 resto 0 → MDC=6.',
      'Atalho matador: MMC = (a × b) ÷ MDC. Ex: MMC(12,18) = 216÷6 = 36.',
      'Se um divide o outro, MDC é o menor e MMC é o maior. Ex: MDC(4,12)=4, MMC(4,12)=12.',
      'Números primos entre si (MDC=1)? O MMC é simplesmente a×b. Ex: MMC(7,5)=35.'
    ],
    gerar: (sublivel) => gerarMmcMdc(sublivel)
  },
  '3_2': {
    nome: 'Expressões Numéricas',
    descricao: 'Resolva expressões com +, −, ×, ÷',
    fase: 3, nivel: 2,
    icone: 'bi-braces',
    tempoLimite: 480,
    totalQuestoes: 15,
    dicas: [
      'PEMDAS: Parênteses → Expoentes → Multiplicação/Divisão → Adição/Subtração.',
      'Cuidado: 2 + 3 × 4 = 14, NÃO 20! A multiplicação vem antes.',
      'Truque: quebre a expressão em pedaços. Resolva cada × e ÷ primeiro, depois some tudo.',
      'Colchetes [ ] e chaves { } funcionam igual parênteses. Resolva de dentro para fora!'
    ],
    gerar: (sublivel) => gerarExpressoesNumericas(sublivel)
  },
  '3_3': {
    nome: 'Expressões com Frações e Potências',
    descricao: 'Expressões mistas complexas',
    fase: 3, nivel: 3,
    icone: 'bi-braces-asterisk',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'Potência primeiro! Resolva todos os expoentes antes de × e ÷.',
      'Fração com potência: (a/b)² = a²/b². Eleve em cima E embaixo. Ex: (2/3)² = 4/9.',
      'Truque: 2⁴ ÷ 2² = 2² = 4. Mesma base? Subtraia os expoentes!',
      'Misturou fração com potência? Resolva potência → simplifique → opere.'
    ],
    gerar: (sublivel) => gerarExpressoesMistas(sublivel)
  },

  // =============================================
  // FASE 4 — POTENCIAÇÃO E RADICIAÇÃO (amarelo #f59e0b)
  // =============================================

  '4_1': {
    nome: 'Potenciação Básica',
    descricao: 'Calcule potências de números inteiros',
    fase: 4, nivel: 1,
    icone: 'bi-arrow-up-right',
    tempoLimite: 360,
    totalQuestoes: 20,
    dicas: [
      'Memorize: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36, 7²=49, 8²=64, 9²=81, 10²=100.',
      'Cubos úteis: 2³=8, 3³=27, 4³=64, 5³=125, 10³=1000.',
      'Truque para quadrado de número terminado em 5: 25²→ 2×3=6, cola 25 → 625. 35²→ 3×4=12, cola 25 → 1225.',
      'Qualquer base elevada a 0 = 1. Elevada a 1 = ela mesma. Nunca erre esses!'
    ],
    gerar: (sublivel) => gerarPotenciacao(sublivel)
  },
  '4_2': {
    nome: 'Propriedades da Potenciação',
    descricao: 'Aplique as propriedades de potências',
    fase: 4, nivel: 2,
    icone: 'bi-lightning',
    tempoLimite: 420,
    totalQuestoes: 15,
    dicas: [
      'Multiplica mesma base? SOMA expoentes. 2³ × 2⁴ = 2⁷ = 128.',
      'Divide mesma base? SUBTRAI expoentes. 5⁶ ÷ 5² = 5⁴ = 625.',
      'Potência de potência? MULTIPLICA expoentes. (3²)³ = 3⁶ = 729.',
      'CUIDADO: (−2)² = +4 (par = positivo), mas (−2)³ = −8 (ímpar = negativo).'
    ],
    gerar: (sublivel) => gerarPropriedadesPotencia(sublivel)
  },
  '4_3': {
    nome: 'Radiciação',
    descricao: 'Calcule raízes quadradas e cúbicas',
    fase: 4, nivel: 3,
    icone: 'bi-square-half',
    tempoLimite: 420,
    totalQuestoes: 18,
    dicas: [
      'Decore: √1=1, √4=2, √9=3, √16=4, √25=5, √36=6, √49=7, √64=8, √81=9, √100=10.',
      'Simplificar raiz: ache o maior quadrado perfeito dentro. √72 = √(36×2) = 6√2.',
      'Raízes cúbicas: ∛8=2, ∛27=3, ∛64=4, ∛125=5. Decore!',
      'Truque: √(a×b) = √a × √b. Ex: √200 = √(100×2) = 10√2.'
    ],
    gerar: (sublivel) => gerarRadiciacao(sublivel)
  },
  '4_4': {
    nome: 'Notação Científica',
    descricao: 'Converta para notação científica',
    fase: 4, nivel: 4,
    icone: 'bi-rocket-takeoff',
    tempoLimite: 480,
    totalQuestoes: 15,
    dicas: [
      'Regra: o número tem que ficar entre 1 e 10. Ex: 4500 → 4.5 × 10³.',
      'Número GRANDE → vírgula anda pra ESQUERDA → expoente POSITIVO. 150000 = 1.5 × 10⁵.',
      'Número PEQUENO → vírgula anda pra DIREITA → expoente NEGATIVO. 0.003 = 3 × 10⁻³.',
      'Truque: conte os zeros! 5000000 tem 6 zeros → 5 × 10⁶. 0.0001 → 10⁻⁴.'
    ],
    gerar: (sublivel) => gerarNotacaoCientifica(sublivel)
  },

  // =============================================
  // FASE 5 — RAZÃO, PROPORÇÃO E PORCENTAGEM (vermelho #ef4444)
  // =============================================

  '5_1': {
    nome: 'Razão e Proporção',
    descricao: 'Calcule razões e proporções',
    fase: 5, nivel: 1,
    icone: 'bi-sliders',
    tempoLimite: 420,
    totalQuestoes: 18,
    dicas: [
      'Proporção: a/b = c/d → multiplique em cruz! a×d = b×c. Sempre funciona.',
      'Truque: se 2/5 = x/15, veja que 5×3=15, então x = 2×3 = 6. Ache o multiplicador!',
      'Simplificar razão: divida ambos pelo MDC. 12:8 → ÷4 → 3:2.',
      'Escala: se 1cm = 50km e tem 3cm, é 3×50 = 150km. Multiplique direto!'
    ],
    gerar: (sublivel) => gerarRazaoProporcao(sublivel)
  },
  '5_2': {
    nome: 'Regra de 3 Simples',
    descricao: 'Proporcionalidade direta',
    fase: 5, nivel: 2,
    icone: 'bi-arrow-left-right',
    tempoLimite: 480,
    totalQuestoes: 15,
    dicas: [
      'Monte: grandeza1 = grandeza2. Se A→B e C→X, então X = (B×C)/A. Pronto!',
      'Direta: mais → mais. 3 camisas = R$60, 5 camisas = ? → 5×60/3 = R$100.',
      'Inversa: mais → menos. 4 pedreiros em 6 dias, 8 pedreiros = ? → 4×6/8 = 3 dias.',
      'Dica: na inversa, inverta uma coluna antes de multiplicar em cruz.'
    ],
    gerar: (sublivel) => gerarRegraDe3Simples(sublivel)
  },
  '5_3': {
    nome: 'Porcentagem',
    descricao: 'Cálculos de porcentagem',
    fase: 5, nivel: 3,
    icone: 'bi-pie-chart',
    tempoLimite: 480,
    totalQuestoes: 15,
    dicas: [
      '10% = ÷10. Ande a vírgula! 10% de 350 = 35. 1% de 350 = 3.5.',
      'x% de 5 → 5x/100 = x/20. Truque: x/5 = 2x/10. Use frações simples!',
      'Decore: 25%=÷4, 50%=÷2, 75%=÷4×3, 20%=÷5. Muito mais rápido que calcular!',
      'Desconto de 30% = pague 70%. Aumento de 15% = pague 115%. Multiplique pelo fator!'
    ],
    gerar: (sublivel) => gerarPorcentagem(sublivel)
  },
  '5_4': {
    nome: 'Regra de 3 Composta',
    descricao: 'Proporcionalidade múltipla',
    fase: 5, nivel: 4,
    icone: 'bi-diagram-3',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'Passo 1: monte a tabela. Passo 2: para cada grandeza, seta ↑ ou ↓ comparando com X.',
      'Setas iguais = direta (mantém). Setas opostas = inversa (inverte a fração).',
      'Ex: 5 operários em 8h fazem 200 peças. 10 operários em 6h? Operários↑ inverte horas, horas↓ inverte.',
      'Multiplique todas as frações pelo valor de X. Simplifique antes para facilitar!'
    ],
    gerar: (sublivel) => gerarRegraDe3Composta(sublivel)
  },

  // =============================================
  // FASE 6 — EQUAÇÕES (ciano #06b6d4)
  // =============================================

  '6_1': {
    nome: 'Equação de 1º Grau',
    descricao: 'Resolva equações lineares',
    fase: 6, nivel: 1,
    icone: 'bi-x-diamond-fill',
    tempoLimite: 420,
    totalQuestoes: 18,
    dicas: [
      'Regra de ouro: x de um lado, números do outro. Trocou de lado? Troca o sinal!',
      'Soma vira subtração, × vira ÷ ao trocar de lado. Ex: 2x + 3 = 11 → 2x = 8 → x = 4.',
      'Fração? Multiplique tudo pelo denominador. Ex: x/3 = 5 → x = 15.',
      'Confira sempre: substitua o x na equação original e veja se fecha!'
    ],
    gerar: (sublivel) => gerarEquacao1Grau(sublivel)
  },
  '6_2': {
    nome: 'Sistema de Equações',
    descricao: 'Resolva sistemas lineares 2×2',
    fase: 6, nivel: 2,
    icone: 'bi-list-columns',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'Substituição: isole x numa equação e cole na outra. Ex: x=3−y → coloque na 2ª equação.',
      'Adição: some as duas equações para matar uma variável. Ajuste os coeficientes antes!',
      'Truque: multiplique uma equação inteira por −1 ou outro número para cancelar uma variável.',
      'Achou y? Volte e substitua para achar x. Responda só o valor pedido!'
    ],
    gerar: (sublivel) => gerarSistemaEquacoes(sublivel)
  },
  '6_3': {
    nome: 'Equação de 2º Grau',
    descricao: 'Resolva equações quadráticas',
    fase: 6, nivel: 3,
    icone: 'bi-graph-up-arrow',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'Bhaskara: Δ = b²−4ac. Depois x = (−b ± √Δ) / 2a. Faça passo a passo!',
      'Atalho: se a equação é x²−Sx+P=0, as raízes somam S e multiplicam P.',
      'Ex: x²−7x+12=0 → dois números que somam 7 e multiplicam 12 → 3 e 4!',
      'Δ > 0 = duas raízes. Δ = 0 = uma raiz. Δ < 0 = sem raiz real. Responda a MAIOR.'
    ],
    gerar: (sublivel) => gerarEquacao2Grau(sublivel)
  },
  '6_4': {
    nome: 'Problemas com Equações',
    descricao: 'Problemas contextualizados',
    fase: 6, nivel: 4,
    icone: 'bi-puzzle',
    tempoLimite: 600,
    totalQuestoes: 10,
    dicas: [
      'Chame o desconhecido de x. "O dobro" = 2x, "o triplo" = 3x, "a metade" = x/2.',
      '"A mais que B" = B+A. "5 a mais que x" = x+5. "3 a menos que x" = x−3.',
      '"Consecutivos" = x, x+1, x+2. "Pares consecutivos" = x, x+2, x+4.',
      'Achou x? Releia o problema — às vezes pedem a idade, o preço, não o x puro!'
    ],
    gerar: (sublivel) => gerarProblemasEquacoes(sublivel)
  },

  // =============================================
  // FASE 7 — CONJUNTOS E LÓGICA (rosa #ec4899)
  // =============================================

  '7_1': {
    nome: 'Conjuntos',
    descricao: 'União, interseção e diferença',
    fase: 7, nivel: 1,
    icone: 'bi-venn',
    tempoLimite: 480,
    totalQuestoes: 15,
    dicas: [
      'Fórmula mágica: Total = A + B − (A∩B). Funciona SEMPRE pra dois conjuntos!',
      'Só em A (exclusivo) = Total de A − os que estão nos dois. A − A∩B.',
      'Nenhum dos dois = Universo − A∪B. Não esqueça dos "de fora"!',
      'Desenhe o diagrama de Venn! Comece pela interseção, depois preencha o resto.'
    ],
    gerar: (sublivel) => gerarConjuntos(sublivel)
  },
  '7_2': {
    nome: 'Lógica Matemática',
    descricao: 'Problemas de raciocínio lógico',
    fase: 7, nivel: 2,
    icone: 'bi-lightbulb',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'PA: subtraia termos vizinhos. Sempre dá o mesmo? É aritmética! aₙ = a₁ + (n−1)×r.',
      'PG: divida termos vizinhos. Sempre dá o mesmo? É geométrica! aₙ = a₁ × q^(n−1).',
      'Soma de 1 a n = n×(n+1)/2. Ex: 1+2+3+...+100 = 100×101/2 = 5050.',
      'Padrão estranho? Tente: diferença entre termos, quadrados (1,4,9,16), fibonacci (1,1,2,3,5,8).'
    ],
    gerar: (sublivel) => gerarLogica(sublivel)
  },
  '7_3': {
    nome: 'Análise Combinatória Básica',
    descricao: 'Permutações e combinações simples',
    fase: 7, nivel: 3,
    icone: 'bi-shuffle',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'Decore fatoriais: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 10!=3628800.',
      'A ordem importa? Use ARRANJO. Não importa? Use COMBINAÇÃO. Essa é a chave!',
      'C(n,k) = n!/(k!×(n−k)!). Atalho: C(10,2) = 10×9/2 = 45. Cancele antes de multiplicar!',
      'Princípio multiplicativo: 3 camisas × 4 calças = 12 looks. Multiplique as opções!'
    ],
    gerar: (sublivel) => gerarCombinatoria(sublivel)
  },

  // =============================================
  // FASE 8 — GEOMETRIA BÁSICA (teal #14b8a6)
  // =============================================

  '8_1': {
    nome: 'Perímetro e Área',
    descricao: 'Calcule perímetro e área de figuras planas',
    fase: 8, nivel: 1,
    icone: 'bi-square',
    tempoLimite: 480,
    totalQuestoes: 15,
    dicas: [
      'Quadrado: P = 4×lado, A = lado². Ex: lado=5 → P=20, A=25.',
      'Retângulo: P = 2×(base+altura), A = base×altura. Ex: 6×4 → P=20, A=24.',
      'Triângulo: A = base×altura÷2. Sempre divida por 2! Metade do retângulo.',
      'Círculo: C = 2×π×r ≈ 6.28×r. Área = π×r² ≈ 3.14×r². π ≈ 3.14.'
    ],
    gerar: (sublivel) => gerarPerimetroArea(sublivel)
  },
  '8_2': {
    nome: 'Volume',
    descricao: 'Calcule volumes de sólidos',
    fase: 8, nivel: 2,
    icone: 'bi-box',
    tempoLimite: 540,
    totalQuestoes: 12,
    dicas: [
      'Cubo: V = aresta³. Ex: aresta=3 → V=27. É o cubo do número!',
      'Paralelepípedo (caixa): V = C × L × A. Multiplique as 3 dimensões.',
      'Cilindro: V = π×r²×h ≈ 3.14×r²×h. Primeiro calcule r², depois ×3.14×h.',
      'Cone = cilindro÷3. Esfera = 4/3×π×r³. Cone e pirâmide sempre ÷3!'
    ],
    gerar: (sublivel) => gerarVolume(sublivel)
  },
  '8_3': {
    nome: 'Pitágoras e Trigonometria',
    descricao: 'Teorema de Pitágoras e razões trigonométricas',
    fase: 8, nivel: 3,
    icone: 'bi-triangle',
    tempoLimite: 600,
    totalQuestoes: 10,
    dicas: [
      'Pitágoras: hip² = cat² + cat². Ache o lado que falta! hip = √(a²+b²), cat = √(hip²−cat²).',
      'Decore as ternas: (3,4,5), (5,12,13), (8,15,17). Múltiplos também! (6,8,10)=(3,4,5)×2.',
      'SOH-CAH-TOA: Sen=Oposto/Hip, Cos=Adjacente/Hip, Tan=Oposto/Adjacente.',
      'Tabela: sen30°=0.5, cos30°≈0.87, sen45°≈0.71, cos45°≈0.71, sen60°≈0.87, cos60°=0.5.'
    ],
    gerar: (sublivel) => gerarPitagorasTrig(sublivel)
  }
};


// ===================================================
// GERADORES DE QUESTÕES — FASE 1 (FUNDAMENTOS)
// Dificuldade AUMENTADA: números grandes, múltiplos termos
// ===================================================

function gerarSoma(sublivel) {
  let nums;
  switch (sublivel) {
    case 'basico':
      nums = [randomInt(50, 500), randomInt(50, 500)];
      break;
    case 'intermediario': {
      const count = randomInt(3, 4);
      nums = [];
      for (let i = 0; i < count; i++) nums.push(randomInt(100, 999));
      break;
    }
    case 'avancado': {
      const count = randomInt(3, 5);
      nums = [];
      for (let i = 0; i < count; i++) nums.push(randomInt(500, 9999));
      break;
    }
    default:
      nums = [randomInt(50, 300), randomInt(50, 300)];
  }
  const total = nums.reduce((s, n) => s + n, 0);
  const enunciado = nums.join(' + ');
  const enunciadoHTML = nums.join(' <span class="operador">+</span> ') + ' <span class="igual">=</span>';
  return { tipo: 'soma', enunciado, enunciadoHTML, resposta: total };
}

function gerarSubtracao(sublivel) {
  switch (sublivel) {
    case 'basico': {
      const a = randomInt(100, 999);
      const b = randomInt(10, a - 1);
      return {
        tipo: 'subtracao',
        enunciado: `${a} − ${b}`,
        enunciadoHTML: `${a} <span class="operador">−</span> ${b} <span class="igual">=</span>`,
        resposta: a - b
      };
    }
    case 'intermediario': {
      const a = randomInt(500, 5000);
      const b = randomInt(100, a - 50);
      return {
        tipo: 'subtracao',
        enunciado: `${a} − ${b}`,
        enunciadoHTML: `${a} <span class="operador">−</span> ${b} <span class="igual">=</span>`,
        resposta: a - b
      };
    }
    case 'avancado': {
      const a = randomInt(3000, 9999);
      const b = randomInt(500, Math.floor(a * 0.5));
      const c = randomInt(100, Math.floor((a - b) * 0.5));
      return {
        tipo: 'subtracao',
        enunciado: `${a} − ${b} − ${c}`,
        enunciadoHTML: `${a} <span class="operador">−</span> ${b} <span class="operador">−</span> ${c} <span class="igual">=</span>`,
        resposta: a - b - c
      };
    }
    default: {
      const a = randomInt(100, 500);
      const b = randomInt(10, a - 1);
      return {
        tipo: 'subtracao',
        enunciado: `${a} − ${b}`,
        enunciadoHTML: `${a} <span class="operador">−</span> ${b} <span class="igual">=</span>`,
        resposta: a - b
      };
    }
  }
}

function gerarMultiplicacao(sublivel) {
  let a, b;
  switch (sublivel) {
    case 'basico': a = randomInt(12, 50); b = randomInt(2, 9); break;
    case 'intermediario': a = randomInt(20, 99); b = randomInt(11, 50); break;
    case 'avancado': a = randomInt(100, 500); b = randomInt(11, 99); break;
    default: a = randomInt(12, 50); b = randomInt(2, 9);
  }
  return {
    tipo: 'multiplicacao',
    enunciado: `${a} × ${b}`,
    enunciadoHTML: `${a} <span class="operador">×</span> ${b} <span class="igual">=</span>`,
    resposta: a * b
  };
}

function gerarDivisao(sublivel) {
  let divisor, quociente;
  switch (sublivel) {
    case 'basico': divisor = randomInt(3, 12); quociente = randomInt(11, 50); break;
    case 'intermediario': divisor = randomInt(11, 25); quociente = randomInt(11, 50); break;
    case 'avancado': divisor = randomInt(12, 50); quociente = randomInt(20, 99); break;
    default: divisor = randomInt(3, 12); quociente = randomInt(11, 30);
  }
  const dividendo = divisor * quociente;
  return {
    tipo: 'divisao',
    enunciado: `${dividendo} ÷ ${divisor}`,
    enunciadoHTML: `${dividendo} <span class="operador">÷</span> ${divisor} <span class="igual">=</span>`,
    resposta: quociente
  };
}


// ===================================================
// GERADORES DE QUESTÕES — FASE 2 (FRAÇÕES)
// Dificuldade AUMENTADA: denominadores maiores
// ===================================================

function gerarSimplificacao(sublivel) {
  let num, den, fator;
  switch (sublivel) {
    case 'basico': fator = randomInt(2, 5); num = randomInt(2, 8) * fator; den = randomInt(3, 10) * fator; break;
    case 'intermediario': fator = randomInt(3, 8); num = randomInt(3, 12) * fator; den = randomInt(4, 15) * fator; break;
    case 'avancado': fator = randomInt(5, 12); num = randomInt(3, 15) * fator; den = randomInt(4, 20) * fator; break;
    default: fator = randomInt(2, 6); num = randomInt(2, 8) * fator; den = randomInt(3, 10) * fator;
  }
  if (num > den) [num, den] = [den, num];
  if (num === den) den += fator;

  const [resNum, resDen] = simplificarFracao(num, den);

  if (resDen === 1) {
    return {
      tipo: 'simplificacao',
      enunciado: `Simplifique: ${num}/${den}`,
      enunciadoHTML: `<div class="questao-porcentagem">Simplifique: <span class="fracao"><span class="fracao-num">${num}</span><span class="fracao-barra"></span><span class="fracao-den">${den}</span></span></div>`,
      resposta: resNum,
      tipoResposta: 'inteiro'
    };
  }

  return {
    tipo: 'simplificacao',
    enunciado: `Simplifique: ${num}/${den}`,
    enunciadoHTML: `<div class="questao-porcentagem">Simplifique: <span class="fracao"><span class="fracao-num">${num}</span><span class="fracao-barra"></span><span class="fracao-den">${den}</span></span></div>`,
    resposta: `${resNum}/${resDen}`,
    respostaNum: resNum,
    respostaDen: resDen,
    tipoResposta: 'fracao'
  };
}

function gerarSomaSubFracoes(sublivel) {
  let num1, den1, num2, den2, operacao;
  switch (sublivel) {
    case 'basico':
      den1 = den2 = randomInt(3, 12);
      num1 = randomInt(1, den1 - 1);
      num2 = randomInt(1, den1 - 1);
      operacao = escolher(['+', '-']);
      break;
    case 'intermediario':
      den1 = randomInt(3, 12);
      den2 = randomInt(3, 12);
      num1 = randomInt(1, den1 - 1);
      num2 = randomInt(1, den2 - 1);
      operacao = escolher(['+', '-']);
      break;
    case 'avancado':
      den1 = randomInt(5, 20);
      den2 = randomInt(5, 20);
      num1 = randomInt(1, den1);
      num2 = randomInt(1, den2);
      operacao = escolher(['+', '-']);
      break;
    default:
      den1 = den2 = randomInt(3, 10);
      num1 = randomInt(1, den1 - 1);
      num2 = randomInt(1, den2 - 1);
      operacao = '+';
  }

  let respostaNum, respostaDen;
  if (operacao === '+') {
    respostaNum = num1 * den2 + num2 * den1;
    respostaDen = den1 * den2;
  } else {
    if (num1 / den1 < num2 / den2) {
      [num1, num2] = [num2, num1];
      [den1, den2] = [den2, den1];
    }
    respostaNum = num1 * den2 - num2 * den1;
    respostaDen = den1 * den2;
  }

  const d = mdc(Math.abs(respostaNum), respostaDen);
  respostaNum /= d;
  respostaDen /= d;

  const opSymbol = operacao === '+' ? '+' : '−';

  if (respostaDen === 1 || respostaNum === 0) {
    return {
      tipo: 'fracao',
      enunciado: `${num1}/${den1} ${operacao} ${num2}/${den2}`,
      enunciadoHTML: `
        <span class="fracao"><span class="fracao-num">${num1}</span><span class="fracao-barra"></span><span class="fracao-den">${den1}</span></span>
        <span class="operador">${opSymbol}</span>
        <span class="fracao"><span class="fracao-num">${num2}</span><span class="fracao-barra"></span><span class="fracao-den">${den2}</span></span>
        <span class="igual">=</span>`,
      resposta: respostaNum,
      tipoResposta: 'inteiro'
    };
  }

  return {
    tipo: 'fracao',
    enunciado: `${num1}/${den1} ${operacao} ${num2}/${den2}`,
    enunciadoHTML: `
      <span class="fracao"><span class="fracao-num">${num1}</span><span class="fracao-barra"></span><span class="fracao-den">${den1}</span></span>
      <span class="operador">${opSymbol}</span>
      <span class="fracao"><span class="fracao-num">${num2}</span><span class="fracao-barra"></span><span class="fracao-den">${den2}</span></span>
      <span class="igual">=</span>`,
    resposta: `${respostaNum}/${respostaDen}`,
    respostaNum,
    respostaDen,
    tipoResposta: 'fracao'
  };
}

function gerarMultDivFracoes(sublivel) {
  let num1, den1, num2, den2, operacao;
  switch (sublivel) {
    case 'basico':
      den1 = randomInt(2, 8); num1 = randomInt(1, den1);
      den2 = randomInt(2, 8); num2 = randomInt(1, den2);
      operacao = '×';
      break;
    case 'intermediario':
      den1 = randomInt(3, 12); num1 = randomInt(1, den1);
      den2 = randomInt(3, 12); num2 = randomInt(1, den2);
      operacao = escolher(['×', '÷']);
      break;
    case 'avancado':
      den1 = randomInt(4, 15); num1 = randomInt(1, den1);
      den2 = randomInt(4, 15); num2 = randomInt(1, den2);
      operacao = escolher(['×', '÷']);
      break;
    default:
      den1 = randomInt(2, 8); num1 = randomInt(1, den1);
      den2 = randomInt(2, 8); num2 = randomInt(1, den2);
      operacao = '×';
  }

  let resNum, resDen;
  if (operacao === '×') {
    resNum = num1 * num2;
    resDen = den1 * den2;
  } else {
    resNum = num1 * den2;
    resDen = den1 * num2;
  }

  const d = mdc(Math.abs(resNum), Math.abs(resDen));
  resNum /= d;
  resDen /= d;

  if (resDen === 1) {
    return {
      tipo: 'fracao',
      enunciado: `${num1}/${den1} ${operacao} ${num2}/${den2}`,
      enunciadoHTML: `
        <span class="fracao"><span class="fracao-num">${num1}</span><span class="fracao-barra"></span><span class="fracao-den">${den1}</span></span>
        <span class="operador">${operacao}</span>
        <span class="fracao"><span class="fracao-num">${num2}</span><span class="fracao-barra"></span><span class="fracao-den">${den2}</span></span>
        <span class="igual">=</span>`,
      resposta: resNum,
      tipoResposta: 'inteiro'
    };
  }

  return {
    tipo: 'fracao',
    enunciado: `${num1}/${den1} ${operacao} ${num2}/${den2}`,
    enunciadoHTML: `
      <span class="fracao"><span class="fracao-num">${num1}</span><span class="fracao-barra"></span><span class="fracao-den">${den1}</span></span>
      <span class="operador">${operacao}</span>
      <span class="fracao"><span class="fracao-num">${num2}</span><span class="fracao-barra"></span><span class="fracao-den">${den2}</span></span>
      <span class="igual">=</span>`,
    resposta: `${resNum}/${resDen}`,
    respostaNum: resNum,
    respostaDen: resDen,
    tipoResposta: 'fracao'
  };
}

function gerarNumerosMistos(sublivel) {
  const tipo = escolher(['misto_para_impropria', 'impropria_para_misto']);
  let inteiro, num, den;

  switch (sublivel) {
    case 'basico': inteiro = randomInt(1, 5); den = randomInt(2, 6); num = randomInt(1, den - 1); break;
    case 'intermediario': inteiro = randomInt(3, 8); den = randomInt(3, 8); num = randomInt(1, den - 1); break;
    case 'avancado': inteiro = randomInt(5, 15); den = randomInt(3, 12); num = randomInt(1, den - 1); break;
    default: inteiro = randomInt(1, 5); den = randomInt(2, 6); num = randomInt(1, den - 1);
  }

  const numImpropria = inteiro * den + num;

  if (tipo === 'misto_para_impropria') {
    return {
      tipo: 'numeromisto',
      enunciado: `Converta ${inteiro} ${num}/${den} para fração imprópria`,
      enunciadoHTML: `<div class="questao-porcentagem">Converta para fração imprópria:<br><br><span class="destaque">${inteiro}</span> <span class="fracao"><span class="fracao-num">${num}</span><span class="fracao-barra"></span><span class="fracao-den">${den}</span></span></div>`,
      resposta: `${numImpropria}/${den}`,
      respostaNum: numImpropria,
      respostaDen: den,
      tipoResposta: 'fracao'
    };
  } else {
    return {
      tipo: 'numeromisto',
      enunciado: `Parte inteira de ${numImpropria}/${den}?`,
      enunciadoHTML: `<div class="questao-porcentagem">Qual a parte inteira de:<br><br><span class="fracao"><span class="fracao-num">${numImpropria}</span><span class="fracao-barra"></span><span class="fracao-den">${den}</span></span></div>`,
      resposta: inteiro,
      tipoResposta: 'inteiro'
    };
  }
}

function gerarOperacoesCombFracoes(sublivel) {
  let num1, den1, num2, den2, inteiro;
  switch (sublivel) {
    case 'basico':
      den1 = randomInt(2, 6); num1 = randomInt(1, den1);
      den2 = randomInt(2, 6); num2 = randomInt(1, den2);
      inteiro = randomInt(2, 6);
      break;
    case 'intermediario':
      den1 = randomInt(3, 8); num1 = randomInt(1, den1);
      den2 = randomInt(3, 8); num2 = randomInt(1, den2);
      inteiro = randomInt(3, 8);
      break;
    default:
      den1 = randomInt(3, 12); num1 = randomInt(1, den1);
      den2 = randomInt(3, 12); num2 = randomInt(1, den2);
      inteiro = randomInt(4, 10);
  }

  const op = escolher(['+', '×']);

  let resNum, resDen;
  if (op === '×') {
    resNum = num1 * num2;
    resDen = den1 * den2;
  } else {
    resNum = num1 * den2 + num2 * den1;
    resDen = den1 * den2;
  }

  resNum = resNum * inteiro;

  const d = mdc(Math.abs(resNum), Math.abs(resDen));
  resNum /= d;
  resDen /= d;

  const opSymbol = op === '+' ? '+' : '×';

  const enunciadoTexto = `${inteiro} × (${num1}/${den1} ${op} ${num2}/${den2})`;

  if (resDen === 1) {
    return {
      tipo: 'fracao_combinada',
      enunciado: enunciadoTexto,
      enunciadoHTML: `<div class="questao-porcentagem"><span class="destaque">${inteiro}</span> <span class="operador">×</span> ( <span class="fracao"><span class="fracao-num">${num1}</span><span class="fracao-barra"></span><span class="fracao-den">${den1}</span></span> <span class="operador">${opSymbol}</span> <span class="fracao"><span class="fracao-num">${num2}</span><span class="fracao-barra"></span><span class="fracao-den">${den2}</span></span> )</div>`,
      resposta: resNum,
      tipoResposta: 'inteiro'
    };
  }

  return {
    tipo: 'fracao_combinada',
    enunciado: enunciadoTexto,
    enunciadoHTML: `<div class="questao-porcentagem"><span class="destaque">${inteiro}</span> <span class="operador">×</span> ( <span class="fracao"><span class="fracao-num">${num1}</span><span class="fracao-barra"></span><span class="fracao-den">${den1}</span></span> <span class="operador">${opSymbol}</span> <span class="fracao"><span class="fracao-num">${num2}</span><span class="fracao-barra"></span><span class="fracao-den">${den2}</span></span> )</div>`,
    resposta: `${resNum}/${resDen}`,
    respostaNum: resNum,
    respostaDen: resDen,
    tipoResposta: 'fracao'
  };
}


// ===================================================
// GERADORES DE QUESTÕES — FASE 3 (MMC, MDC, EXPRESSÕES)
// Dificuldade AUMENTADA: números maiores, expressões mais complexas
// ===================================================

function gerarMmcMdc(sublivel) {
  let a, b;
  switch (sublivel) {
    case 'basico': a = randomInt(6, 24); b = randomInt(6, 24); break;
    case 'intermediario': a = randomInt(12, 60); b = randomInt(12, 60); break;
    case 'avancado': a = randomInt(24, 120); b = randomInt(24, 120); break;
    default: a = randomInt(8, 30); b = randomInt(8, 30);
  }

  const tipo = escolher(['mmc', 'mdc']);

  if (tipo === 'mmc') {
    return {
      tipo: 'mmc',
      enunciado: `MMC(${a}, ${b})`,
      enunciadoHTML: `<div class="questao-porcentagem">Calcule o <span class="destaque">MMC</span> de <span class="destaque">${a}</span> e <span class="destaque">${b}</span></div>`,
      resposta: mmc(a, b)
    };
  } else {
    return {
      tipo: 'mdc',
      enunciado: `MDC(${a}, ${b})`,
      enunciadoHTML: `<div class="questao-porcentagem">Calcule o <span class="destaque">MDC</span> de <span class="destaque">${a}</span> e <span class="destaque">${b}</span></div>`,
      resposta: mdc(a, b)
    };
  }
}

function gerarExpressoesNumericas(sublivel) {
  let expressao, resultado;

  switch (sublivel) {
    case 'basico': {
      const a = randomInt(10, 50);
      const b = randomInt(3, 12);
      const c = randomInt(5, 30);
      if (escolher([true, false])) {
        resultado = a + b * c;
        expressao = `${a} + ${b} × ${c}`;
      } else {
        resultado = a * b - c;
        expressao = `${a} × ${b} − ${c}`;
      }
      break;
    }
    case 'intermediario': {
      const a = randomInt(5, 20);
      const b = randomInt(5, 15);
      const c = randomInt(3, 12);
      const d = randomInt(5, 25);
      resultado = (a + b) * c - d;
      expressao = `(${a} + ${b}) × ${c} − ${d}`;
      break;
    }
    case 'avancado': {
      const a = randomInt(5, 15);
      const b = randomInt(3, 10);
      const c = randomInt(3, 8);
      const d = randomInt(2, 6);
      const e = randomInt(5, 20);
      resultado = a * b + c * d - e;
      expressao = `${a} × ${b} + ${c} × ${d} − ${e}`;
      break;
    }
    default: {
      const a = randomInt(10, 40);
      const b = randomInt(3, 10);
      const c = randomInt(5, 20);
      resultado = a + b * c;
      expressao = `${a} + ${b} × ${c}`;
    }
  }

  return {
    tipo: 'expressao',
    enunciado: expressao,
    enunciadoHTML: `<div class="questao-porcentagem">Resolva:<br><br><span class="destaque">${expressao}</span></div>`,
    resposta: resultado
  };
}

function gerarExpressoesMistas(sublivel) {
  let expressao, resultado;

  switch (sublivel) {
    case 'basico': {
      const base = randomInt(2, 6);
      const exp = randomInt(2, 3);
      const add = randomInt(5, 30);
      resultado = Math.pow(base, exp) + add;
      expressao = `${base}<sup>${exp}</sup> + ${add}`;
      break;
    }
    case 'intermediario': {
      const base = randomInt(2, 5);
      const exp = randomInt(2, 3);
      const mult = randomInt(3, 10);
      resultado = Math.pow(base, exp) * mult;
      expressao = `${base}<sup>${exp}</sup> × ${mult}`;
      break;
    }
    case 'avancado': {
      const b1 = randomInt(2, 5);
      const e1 = randomInt(2, 3);
      const b2 = randomInt(2, 5);
      const e2 = randomInt(2, 3);
      const op = escolher(['+', '-']);
      if (op === '+') {
        resultado = Math.pow(b1, e1) + Math.pow(b2, e2);
        expressao = `${b1}<sup>${e1}</sup> + ${b2}<sup>${e2}</sup>`;
      } else {
        const val1 = Math.pow(b1, e1);
        const val2 = Math.pow(b2, e2);
        if (val1 >= val2) {
          resultado = val1 - val2;
          expressao = `${b1}<sup>${e1}</sup> − ${b2}<sup>${e2}</sup>`;
        } else {
          resultado = val2 - val1;
          expressao = `${b2}<sup>${e2}</sup> − ${b1}<sup>${e1}</sup>`;
        }
      }
      break;
    }
    default: {
      const base = randomInt(2, 6);
      const exp = 2;
      const add = randomInt(5, 25);
      resultado = Math.pow(base, exp) + add;
      expressao = `${base}<sup>${exp}</sup> + ${add}`;
    }
  }

  return {
    tipo: 'expressao_mista',
    enunciado: expressao.replace(/<sup>/g, '^').replace(/<\/sup>/g, ''),
    enunciadoHTML: `<div class="questao-porcentagem">Resolva:<br><br><span class="destaque">${expressao}</span></div>`,
    resposta: resultado
  };
}


// ===================================================
// GERADORES DE QUESTÕES — FASE 4 (POTENCIAÇÃO E RADICIAÇÃO)
// Dificuldade AUMENTADA: bases e expoentes maiores
// ===================================================

function gerarPotenciacao(sublivel) {
  let base, exp;
  switch (sublivel) {
    case 'basico': base = randomInt(2, 10); exp = 2; break;
    case 'intermediario': base = randomInt(2, 12); exp = escolher([2, 3]); break;
    case 'avancado': base = randomInt(2, 15); exp = escolher([2, 3, 4]); break;
    default: base = randomInt(2, 8); exp = 2;
  }

  if (Math.pow(base, exp) > 50000) {
    base = randomInt(2, 6);
    exp = 2;
  }

  return {
    tipo: 'potenciacao',
    enunciado: `${base}^${exp}`,
    enunciadoHTML: `${base}<sup>${exp}</sup> <span class="igual">=</span>`,
    resposta: Math.pow(base, exp)
  };
}

function gerarPropriedadesPotencia(sublivel) {
  const tipos = ['produto', 'quociente', 'potencia_de_potencia'];
  const tipo = escolher(tipos);

  let base, m, n, resultado, expressao;

  switch (tipo) {
    case 'produto':
      base = randomInt(2, 6);
      m = randomInt(2, 5);
      n = randomInt(2, 5);
      resultado = Math.pow(base, m + n);
      expressao = `${base}<sup>${m}</sup> × ${base}<sup>${n}</sup>`;
      break;
    case 'quociente':
      base = randomInt(2, 6);
      m = randomInt(4, 8);
      n = randomInt(1, m - 1);
      resultado = Math.pow(base, m - n);
      expressao = `${base}<sup>${m}</sup> ÷ ${base}<sup>${n}</sup>`;
      break;
    case 'potencia_de_potencia':
      base = randomInt(2, 4);
      m = randomInt(2, 3);
      n = randomInt(2, 3);
      resultado = Math.pow(base, m * n);
      expressao = `(${base}<sup>${m}</sup>)<sup>${n}</sup>`;
      break;
  }

  if (resultado > 50000) {
    base = 2; m = 3; n = 2;
    resultado = Math.pow(2, 6);
    expressao = `(2<sup>3</sup>)<sup>2</sup>`;
  }

  return {
    tipo: 'propriedade_potencia',
    enunciado: expressao.replace(/<sup>/g, '^').replace(/<\/sup>/g, ''),
    enunciadoHTML: `<div class="questao-porcentagem">Resolva:<br><br><span class="destaque">${expressao}</span></div>`,
    resposta: resultado
  };
}

function gerarRadiciacao(sublivel) {
  const tipo = escolher(['raiz_quadrada', 'raiz_cubica']);

  if (tipo === 'raiz_quadrada') {
    let n;
    switch (sublivel) {
      case 'basico': n = escolher([4, 9, 16, 25, 36, 49, 64, 81]); break;
      case 'intermediario': n = escolher([100, 121, 144, 169, 196, 225, 256, 289]); break;
      case 'avancado': n = escolher([324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900]); break;
      default: n = escolher([4, 9, 16, 25, 36, 49, 64, 81, 100]);
    }
    const raiz = Math.round(Math.sqrt(n));
    return {
      tipo: 'radiciacao',
      enunciado: `√${n}`,
      enunciadoHTML: `<div class="questao-porcentagem">Calcule:<br><br>√<span class="destaque" style="border-top: 3px solid currentColor; padding: 0 8px;">${n}</span></div>`,
      resposta: raiz
    };
  } else {
    let n;
    switch (sublivel) {
      case 'basico': n = escolher([8, 27, 64]); break;
      case 'intermediario': n = escolher([8, 27, 64, 125, 216]); break;
      case 'avancado': n = escolher([8, 27, 64, 125, 216, 343, 512, 729, 1000]); break;
      default: n = escolher([8, 27, 64, 125]);
    }
    const raiz = Math.round(Math.cbrt(n));
    return {
      tipo: 'radiciacao',
      enunciado: `∛${n}`,
      enunciadoHTML: `<div class="questao-porcentagem">Calcule:<br><br>∛<span class="destaque" style="border-top: 3px solid currentColor; padding: 0 8px;">${n}</span></div>`,
      resposta: raiz
    };
  }
}

function gerarNotacaoCientifica(sublivel) {
  const tipo = escolher(['grande', 'pequeno']);

  if (tipo === 'grande') {
    let mantissa, expoente;
    switch (sublivel) {
      case 'basico':
        mantissa = randomInt(1, 9);
        expoente = randomInt(3, 5);
        break;
      case 'intermediario':
        mantissa = parseFloat((randomInt(10, 99) / 10).toFixed(1));
        expoente = randomInt(4, 8);
        break;
      case 'avancado':
        mantissa = parseFloat((randomInt(10, 99) / 10).toFixed(1));
        expoente = randomInt(6, 12);
        break;
      default:
        mantissa = randomInt(1, 9);
        expoente = randomInt(3, 6);
    }
    const numero = mantissa * Math.pow(10, expoente);
    return {
      tipo: 'notacao_cientifica',
      enunciado: `Qual o expoente de 10 em ${numero} em notação científica?`,
      enunciadoHTML: `<div class="questao-porcentagem">Qual o <span class="destaque">expoente de 10</span> quando escrevemos em notação científica:<br><br><span class="destaque">${numero.toLocaleString('pt-BR')}</span></div>`,
      resposta: expoente
    };
  } else {
    let mantissa, expoente;
    switch (sublivel) {
      case 'basico': mantissa = randomInt(1, 9); expoente = randomInt(2, 4); break;
      case 'intermediario': mantissa = randomInt(1, 9); expoente = randomInt(3, 6); break;
      case 'avancado': mantissa = randomInt(1, 9); expoente = randomInt(5, 9); break;
      default: mantissa = randomInt(1, 9); expoente = randomInt(2, 4);
    }
    const zeros = '0'.repeat(expoente - 1);
    const numeroStr = `0.${zeros}${mantissa}`;
    return {
      tipo: 'notacao_cientifica',
      enunciado: `Qual o expoente de 10 em ${numeroStr} em notação científica?`,
      enunciadoHTML: `<div class="questao-porcentagem">Qual o <span class="destaque">expoente de 10</span> quando escrevemos em notação científica:<br><br><span class="destaque">${numeroStr}</span></div>`,
      resposta: -expoente
    };
  }
}


// ===================================================
// GERADORES DE QUESTÕES — FASE 5 (RAZÃO, PROPORÇÃO, %)
// Dificuldade AUMENTADA: números maiores
// ===================================================

function gerarRazaoProporcao(sublivel) {
  let a, b, c, x;
  switch (sublivel) {
    case 'basico': a = randomInt(2, 10); b = randomInt(2, 10); c = randomInt(2, 8); break;
    case 'intermediario': a = randomInt(5, 20); b = randomInt(5, 20); c = randomInt(3, 15); break;
    case 'avancado': a = randomInt(10, 40); b = randomInt(10, 40); c = randomInt(5, 25); break;
    default: a = randomInt(3, 12); b = randomInt(3, 12); c = randomInt(2, 8);
  }

  x = (b * c) / a;
  while (x % 1 !== 0) {
    b = b + a;
    x = (b * c) / a;
  }

  return {
    tipo: 'proporcao',
    enunciado: `Se ${a}/${b} = ${c}/x, qual o valor de x?`,
    enunciadoHTML: `<div class="questao-porcentagem">Se <span class="fracao"><span class="fracao-num">${a}</span><span class="fracao-barra"></span><span class="fracao-den">${b}</span></span> <span class="operador">=</span> <span class="fracao"><span class="fracao-num">${c}</span><span class="fracao-barra"></span><span class="fracao-den"><span class="destaque">x</span></span></span>, qual o valor de <span class="destaque">x</span>?</div>`,
    resposta: x
  };
}

function gerarRegraDe3Simples(sublivel) {
  let a, b, c, x;
  switch (sublivel) {
    case 'basico':
      a = randomInt(3, 15); b = randomInt(2, 10) * a; c = randomInt(2, 8);
      break;
    case 'intermediario':
      a = randomInt(8, 25); b = randomInt(20, 80); c = randomInt(5, 15);
      break;
    case 'avancado':
      a = randomInt(15, 50); b = randomInt(50, 200); c = randomInt(10, 40);
      break;
    default:
      a = randomInt(3, 12); b = randomInt(10, 40); c = randomInt(2, 8);
  }
  x = (b * c) / a;
  while (x % 1 !== 0) {
    b = b + a;
    x = (b * c) / a;
  }
  return {
    tipo: 'regra3simples',
    enunciado: `Se ${a} → ${b}, então ${c} → ?`,
    enunciadoHTML: `
      <div class="regra-tres-container">
        <div class="regra-tres-linha">
          <span>${a}</span><span class="seta">→</span><span>${b}</span>
        </div>
        <div class="regra-tres-linha">
          <span>${c}</span><span class="seta">→</span><span class="incognita">?</span>
        </div>
      </div>`,
    resposta: x
  };
}

function gerarPorcentagem(sublivel) {
  let valor, porcentagem;
  switch (sublivel) {
    case 'basico':
      valor = escolher([100, 200, 300, 400, 500, 600, 800, 1000, 1500, 2000]);
      porcentagem = escolher([5, 10, 15, 20, 25, 30, 40, 50, 75]);
      break;
    case 'intermediario':
      valor = randomInt(100, 500) * 5;
      porcentagem = escolher([5, 8, 10, 12, 15, 18, 20, 25, 30, 35, 40, 50, 60, 75]);
      break;
    case 'avancado':
      valor = randomInt(200, 2000);
      porcentagem = randomInt(1, 95);
      break;
    default:
      valor = escolher([100, 200, 500, 1000]);
      porcentagem = escolher([10, 20, 25, 50]);
  }
  const resposta = (valor * porcentagem) / 100;
  return {
    tipo: 'porcentagem',
    enunciado: `${porcentagem}% de ${valor}`,
    enunciadoHTML: `<span class="questao-porcentagem">Quanto é <span class="destaque">${porcentagem}%</span> de <span class="destaque">${valor}</span>?</span>`,
    resposta: resposta
  };
}

function gerarRegraDe3Composta(sublivel) {
  let trabalhadores1, produtos1, dias1, trabalhadores2, dias2;
  switch (sublivel) {
    case 'basico':
      trabalhadores1 = randomInt(3, 8); produtos1 = trabalhadores1 * randomInt(3, 8); dias1 = randomInt(3, 7);
      trabalhadores2 = randomInt(3, 8); dias2 = randomInt(3, 7);
      break;
    case 'intermediario':
      trabalhadores1 = randomInt(5, 12); produtos1 = trabalhadores1 * randomInt(5, 10); dias1 = randomInt(4, 10);
      trabalhadores2 = randomInt(5, 12); dias2 = randomInt(4, 10);
      break;
    case 'avancado':
      trabalhadores1 = randomInt(8, 20); produtos1 = trabalhadores1 * randomInt(8, 15); dias1 = randomInt(5, 15);
      trabalhadores2 = randomInt(8, 20); dias2 = randomInt(5, 15);
      break;
    default:
      trabalhadores1 = randomInt(3, 8); produtos1 = trabalhadores1 * 5; dias1 = randomInt(3, 7);
      trabalhadores2 = randomInt(3, 8); dias2 = randomInt(3, 7);
  }
  const produtividade = produtos1 / (trabalhadores1 * dias1);
  const produtos2 = produtividade * trabalhadores2 * dias2;

  return {
    tipo: 'regra3composta',
    enunciado: `${trabalhadores1} trabalhadores → ${produtos1} peças em ${dias1} dias. ${trabalhadores2} trabalhadores em ${dias2} dias → ?`,
    enunciadoHTML: `
      <div class="questao-porcentagem">
        <span class="destaque">${trabalhadores1}</span> trabalhadores produzem
        <span class="destaque">${produtos1}</span> peças em
        <span class="destaque">${dias1}</span> dias.<br><br>
        Quantas peças <span class="destaque">${trabalhadores2}</span> trabalhadores
        produzem em <span class="destaque">${dias2}</span> dias?
      </div>`,
    resposta: produtos2
  };
}


// ===================================================
// GERADORES DE QUESTÕES — FASE 6 (EQUAÇÕES)
// Dificuldade AUMENTADA: coeficientes maiores
// ===================================================

function gerarEquacao1Grau(sublivel) {
  let a, b, x;
  switch (sublivel) {
    case 'basico':
      x = randomInt(2, 20);
      a = randomInt(2, 9);
      b = a * x;
      return {
        tipo: 'equacao1grau',
        enunciado: `${a}x = ${b}`,
        enunciadoHTML: `<div class="questao-porcentagem">Resolva:<br><br><span class="destaque">${a}<span class="variavel">x</span> = ${b}</span></div>`,
        resposta: x
      };
    case 'intermediario':
      x = randomInt(-10, 20);
      a = randomInt(3, 12);
      b = randomInt(5, 30);
      const resultado = a * x + b;
      return {
        tipo: 'equacao1grau',
        enunciado: `${a}x + ${b} = ${resultado}`,
        enunciadoHTML: `<div class="questao-porcentagem">Resolva:<br><br><span class="destaque">${a}<span class="variavel">x</span> + ${b} = ${resultado}</span></div>`,
        resposta: x
      };
    case 'avancado': {
      x = randomInt(-10, 15);
      a = randomInt(3, 12);
      const c2 = randomInt(1, 8);
      const d = randomInt(5, 25);
      // ax - c + d = res  →  ax = res + c - d  →  x = (res + c - d) / a
      const res = a * x - c2 + d;
      return {
        tipo: 'equacao1grau',
        enunciado: `${a}x - ${c2} + ${d} = ${res}`,
        enunciadoHTML: `<div class="questao-porcentagem">Resolva:<br><br><span class="destaque">${a}<span class="variavel">x</span> − ${c2} + ${d} = ${res}</span></div>`,
        resposta: x
      };
    }
    default:
      x = randomInt(2, 15);
      a = randomInt(2, 8);
      b = a * x;
      return {
        tipo: 'equacao1grau',
        enunciado: `${a}x = ${b}`,
        enunciadoHTML: `<div class="questao-porcentagem">Resolva:<br><br><span class="destaque">${a}<span class="variavel">x</span> = ${b}</span></div>`,
        resposta: x
      };
  }
}

function gerarSistemaEquacoes(sublivel) {
  let x = randomInt(1, 12);
  let y = randomInt(1, 12);

  let a1, b1, a2, b2;
  switch (sublivel) {
    case 'basico':
      a1 = 1; b1 = 1;
      a2 = randomInt(1, 4); b2 = randomInt(1, 4);
      break;
    case 'intermediario':
      a1 = randomInt(1, 4); b1 = randomInt(1, 4);
      a2 = randomInt(1, 5); b2 = randomInt(1, 5);
      break;
    case 'avancado':
      a1 = randomInt(2, 6); b1 = randomInt(2, 6);
      a2 = randomInt(2, 7); b2 = randomInt(2, 7);
      break;
    default:
      a1 = 1; b1 = 1;
      a2 = randomInt(1, 4); b2 = randomInt(1, 4);
  }

  const c1 = a1 * x + b1 * y;
  const c2 = a2 * x + b2 * y;

  const perguntaVar = escolher(['x', 'y']);
  const respostaFinal = perguntaVar === 'x' ? x : y;

  return {
    tipo: 'sistema',
    enunciado: `{ ${a1}x + ${b1}y = ${c1}, ${a2}x + ${b2}y = ${c2} } → ${perguntaVar} = ?`,
    enunciadoHTML: `
      <div class="questao-porcentagem">
        Resolva o sistema e encontre <span class="destaque">${perguntaVar}</span>:<br><br>
        <span class="destaque">${a1 === 1 ? '' : a1}<span class="variavel">x</span> + ${b1 === 1 ? '' : b1}<span class="variavel">y</span> = ${c1}</span><br>
        <span class="destaque">${a2 === 1 ? '' : a2}<span class="variavel">x</span> + ${b2 === 1 ? '' : b2}<span class="variavel">y</span> = ${c2}</span>
      </div>`,
    resposta: respostaFinal
  };
}

function gerarEquacao2Grau(sublivel) {
  let r1, r2;
  switch (sublivel) {
    case 'basico':
      r1 = randomInt(1, 8); r2 = randomInt(1, 8);
      break;
    case 'intermediario':
      r1 = randomInt(-8, 10); r2 = randomInt(1, 12);
      break;
    case 'avancado':
      r1 = randomInt(-12, 12); r2 = randomInt(-12, 12);
      break;
    default:
      r1 = randomInt(1, 8); r2 = randomInt(1, 8);
  }

  const a = 1;
  const b = -(r1 + r2);
  const c = r1 * r2;

  const maiorRaiz = Math.max(r1, r2);

  let bStr = '';
  if (b > 0) bStr = ` + ${b}x`;
  else if (b < 0) bStr = ` − ${Math.abs(b)}x`;
  else bStr = '';

  let cStr = '';
  if (c > 0) cStr = ` + ${c}`;
  else if (c < 0) cStr = ` − ${Math.abs(c)}`;
  else cStr = '';

  const expressao = `x²${bStr}${cStr} = 0`;

  return {
    tipo: 'equacao2grau',
    enunciado: expressao,
    enunciadoHTML: `<div class="questao-porcentagem">Encontre a <span class="destaque">maior raiz</span>:<br><br><span class="destaque"><span class="variavel">x</span>²${bStr.replace('x', '<span class="variavel">x</span>')}${cStr} = 0</span></div>`,
    resposta: maiorRaiz
  };
}

function gerarProblemasEquacoes(sublivel) {
  const problemas = [
    () => {
      const x = randomInt(10, 50);
      const k = randomInt(2, 7);
      const soma = k * x + x;
      return {
        tipo: 'problema_equacao',
        enunciado: `${k} vezes um número somado com ele mesmo dá ${soma}`,
        enunciadoHTML: `<div class="questao-porcentagem">${k === 2 ? 'O dobro' : k === 3 ? 'O triplo' : k + ' vezes'} um número, somado com o próprio número, resulta em <span class="destaque">${soma}</span>. Qual é esse número?</div>`,
        resposta: x
      };
    },
    () => {
      const idade1 = randomInt(15, 45);
      const diff = randomInt(3, 20);
      const soma = idade1 + (idade1 + diff);
      return {
        tipo: 'problema_equacao',
        enunciado: `Soma das idades = ${soma}, diferença = ${diff}`,
        enunciadoHTML: `<div class="questao-porcentagem">A soma das idades de duas pessoas é <span class="destaque">${soma}</span>. A mais velha tem <span class="destaque">${diff}</span> anos a mais. Qual a idade da mais <span class="destaque">nova</span>?</div>`,
        resposta: idade1
      };
    },
    () => {
      const preco = randomInt(50, 500);
      const desconto = escolher([5, 10, 12, 15, 20, 25, 30, 35, 40]);
      const final_ = preco * (1 - desconto / 100);
      return {
        tipo: 'problema_equacao',
        enunciado: `Preço com ${desconto}% de desconto`,
        enunciadoHTML: `<div class="questao-porcentagem">Um produto custa R$<span class="destaque">${preco}</span>. Com <span class="destaque">${desconto}%</span> de desconto, quanto ele custa?</div>`,
        resposta: final_
      };
    },
    () => {
      const n = randomInt(10, 40);
      const k = escolher([3, 4, 5, 6]);
      const resultado = k * n;
      return {
        tipo: 'problema_equacao',
        enunciado: `${k} vezes um número é ${resultado}`,
        enunciadoHTML: `<div class="questao-porcentagem">${k === 3 ? 'O triplo' : k === 4 ? 'O quádruplo' : k + ' vezes'} um número é <span class="destaque">${resultado}</span>. Qual é esse número?</div>`,
        resposta: n
      };
    },
    () => {
      const n = randomInt(5, 25);
      const soma = n + (n + 1) + (n + 2);
      return {
        tipo: 'problema_equacao',
        enunciado: `Três consecutivos somam ${soma}`,
        enunciadoHTML: `<div class="questao-porcentagem">A soma de três números <span class="destaque">consecutivos</span> é <span class="destaque">${soma}</span>. Qual é o <span class="destaque">menor</span> deles?</div>`,
        resposta: n
      };
    },
    () => {
      const comp = randomInt(10, 40);
      const larg = randomInt(5, comp - 2);
      const perimetro = 2 * (comp + larg);
      return {
        tipo: 'problema_equacao',
        enunciado: `Perímetro ${perimetro}, comprimento ${comp}`,
        enunciadoHTML: `<div class="questao-porcentagem">Um retângulo tem perímetro <span class="destaque">${perimetro}</span> e comprimento <span class="destaque">${comp}</span>. Qual a <span class="destaque">largura</span>?</div>`,
        resposta: larg
      };
    }
  ];

  return escolher(problemas)();
}


// ===================================================
// GERADORES DE QUESTÕES — FASE 7 (CONJUNTOS E LÓGICA)
// Dificuldade AUMENTADA: conjuntos maiores, sequências mais difíceis
// ===================================================

function gerarConjuntos(sublivel) {
  let totalA, totalB, intersecao;
  switch (sublivel) {
    case 'basico':
      totalA = randomInt(20, 50); totalB = randomInt(20, 50);
      intersecao = randomInt(8, Math.min(totalA, totalB) - 5);
      break;
    case 'intermediario':
      totalA = randomInt(40, 100); totalB = randomInt(40, 100);
      intersecao = randomInt(15, Math.min(totalA, totalB) - 10);
      break;
    case 'avancado':
      totalA = randomInt(60, 150); totalB = randomInt(60, 150);
      intersecao = randomInt(20, Math.min(totalA, totalB) - 15);
      break;
    default:
      totalA = randomInt(25, 60); totalB = randomInt(25, 60);
      intersecao = randomInt(10, 25);
  }

  const apenasA = totalA - intersecao;
  const apenasB = totalB - intersecao;
  const uniao = apenasA + apenasB + intersecao;

  const tipo = escolher(['uniao', 'intersecao', 'apenasA']);
  let pergunta, resposta;

  switch (tipo) {
    case 'uniao':
      pergunta = `Se A tem ${totalA} elementos, B tem ${totalB} elementos, e A ∩ B tem ${intersecao} elementos, quantos elementos tem A ∪ B?`;
      resposta = uniao;
      break;
    case 'intersecao':
      pergunta = `Se A tem ${totalA} elementos, B tem ${totalB} elementos, e A ∪ B tem ${uniao} elementos, quantos elementos tem A ∩ B?`;
      resposta = intersecao;
      break;
    case 'apenasA':
      pergunta = `Se A tem ${totalA} elementos e A ∩ B tem ${intersecao} elementos, quantos elementos pertencem apenas a A?`;
      resposta = apenasA;
      break;
  }

  return {
    tipo: 'conjuntos',
    enunciado: pergunta,
    enunciadoHTML: `<div class="questao-porcentagem">${pergunta}</div>`,
    resposta
  };
}

function gerarLogica(sublivel) {
  const problemas = [
    // PA - sequência aritmética
    () => {
      const inicio = randomInt(3, 30);
      const passo = randomInt(3, 12);
      const termos = sublivel === 'avancado' ? 6 : 5;
      const seq = [];
      for (let i = 0; i < termos; i++) seq.push(inicio + i * passo);
      return {
        tipo: 'logica',
        enunciado: `Próximo: ${seq.join(', ')}, ...?`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual o próximo número da sequência:<br><br><span class="destaque">${seq.join(', ')}, ...</span></div>`,
        resposta: inicio + termos * passo
      };
    },
    // PG - sequência geométrica
    () => {
      const inicio = randomInt(1, 5);
      const fator = randomInt(2, 4);
      const termos = sublivel === 'avancado' ? 5 : 4;
      const seq = [];
      let atual = inicio;
      for (let i = 0; i < termos; i++) { seq.push(atual); atual *= fator; }
      return {
        tipo: 'logica',
        enunciado: `Próximo: ${seq.join(', ')}, ...?`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual o próximo número da sequência:<br><br><span class="destaque">${seq.join(', ')}, ...</span></div>`,
        resposta: atual
      };
    },
    // Soma de 1 a n
    () => {
      const n = sublivel === 'avancado' ? randomInt(20, 50) : randomInt(8, 25);
      const soma = (n * (n + 1)) / 2;
      return {
        tipo: 'logica',
        enunciado: `Soma de 1 até ${n}?`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual a soma de todos os números de <span class="destaque">1</span> até <span class="destaque">${n}</span>?</div>`,
        resposta: soma
      };
    },
    // Quadrados perfeitos
    () => {
      const seq = [];
      const start = randomInt(1, 5);
      for (let i = start; i < start + 5; i++) seq.push(i * i);
      const proximo = (start + 5) * (start + 5);
      return {
        tipo: 'logica',
        enunciado: `Próximo: ${seq.join(', ')}, ...?`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual o próximo número da sequência:<br><br><span class="destaque">${seq.join(', ')}, ...</span></div>`,
        resposta: proximo
      };
    }
  ];
  return escolher(problemas)();
}

function gerarCombinatoria(sublivel) {
  const tipos = ['fatorial', 'principio_multiplicativo', 'combinacao'];
  const tipo = escolher(tipos);

  switch (tipo) {
    case 'fatorial': {
      const n = sublivel === 'avancado' ? randomInt(6, 8) : sublivel === 'intermediario' ? randomInt(5, 7) : randomInt(4, 6);
      let fat = 1;
      for (let i = 2; i <= n; i++) fat *= i;
      return {
        tipo: 'combinatoria',
        enunciado: `${n}! = ?`,
        enunciadoHTML: `<div class="questao-porcentagem">Calcule:<br><br><span class="destaque">${n}!</span></div>`,
        resposta: fat
      };
    }
    case 'principio_multiplicativo': {
      const a = randomInt(3, 8);
      const b = randomInt(3, 8);
      const c = sublivel === 'avancado' ? randomInt(2, 5) : 0;
      const contexto = c > 0
        ? `${a} camisas, ${b} calças e ${c} sapatos. Quantas combinações?`
        : escolher([
            `${a} camisas e ${b} calças. Quantas combinações?`,
            `${a} sabores e ${b} tamanhos. Quantas opções?`,
            `${a} entradas e ${b} sobremesas. Quantos pratos?`
          ]);
      return {
        tipo: 'combinatoria',
        enunciado: contexto,
        enunciadoHTML: `<div class="questao-porcentagem">${contexto}</div>`,
        resposta: c > 0 ? a * b * c : a * b
      };
    }
    case 'combinacao': {
      let n, k;
      switch (sublivel) {
        case 'basico': n = randomInt(5, 8); k = 2; break;
        case 'intermediario': n = randomInt(6, 10); k = randomInt(2, 3); break;
        case 'avancado': n = randomInt(8, 12); k = randomInt(2, 4); break;
        default: n = randomInt(5, 8); k = 2;
      }
      let numFat = 1, denFat = 1;
      for (let i = 0; i < k; i++) {
        numFat *= (n - i);
        denFat *= (i + 1);
      }
      const resultado = numFat / denFat;
      return {
        tipo: 'combinatoria',
        enunciado: `C(${n},${k}) = ?`,
        enunciadoHTML: `<div class="questao-porcentagem">Calcule a combinação:<br><br><span class="destaque">C(${n}, ${k})</span></div>`,
        resposta: resultado
      };
    }
  }
}


// ===================================================
// GERADORES DE QUESTÕES — FASE 8 (GEOMETRIA)
// Dificuldade AUMENTADA: dimensões maiores
// ===================================================

function gerarPerimetroArea(sublivel) {
  const figuras = ['quadrado', 'retangulo', 'triangulo', 'circulo'];
  const figura = escolher(figuras);

  switch (figura) {
    case 'quadrado': {
      const l = sublivel === 'avancado' ? randomInt(8, 25) : sublivel === 'intermediario' ? randomInt(5, 18) : randomInt(3, 12);
      const tipo = escolher(['perimetro', 'area']);
      if (tipo === 'perimetro') {
        return {
          tipo: 'geometria',
          enunciado: `Perímetro do quadrado de lado ${l}`,
          enunciadoHTML: `<div class="questao-porcentagem">Qual o <span class="destaque">perímetro</span> de um quadrado de lado <span class="destaque">${l}</span>?</div>`,
          resposta: 4 * l
        };
      } else {
        return {
          tipo: 'geometria',
          enunciado: `Área do quadrado de lado ${l}`,
          enunciadoHTML: `<div class="questao-porcentagem">Qual a <span class="destaque">área</span> de um quadrado de lado <span class="destaque">${l}</span>?</div>`,
          resposta: l * l
        };
      }
    }
    case 'retangulo': {
      const b = sublivel === 'avancado' ? randomInt(10, 30) : sublivel === 'intermediario' ? randomInt(6, 20) : randomInt(3, 15);
      const h = sublivel === 'avancado' ? randomInt(8, 25) : sublivel === 'intermediario' ? randomInt(4, 15) : randomInt(2, 10);
      const tipo = escolher(['perimetro', 'area']);
      if (tipo === 'perimetro') {
        return {
          tipo: 'geometria',
          enunciado: `Perímetro do retângulo ${b}×${h}`,
          enunciadoHTML: `<div class="questao-porcentagem">Qual o <span class="destaque">perímetro</span> de um retângulo de base <span class="destaque">${b}</span> e altura <span class="destaque">${h}</span>?</div>`,
          resposta: 2 * (b + h)
        };
      } else {
        return {
          tipo: 'geometria',
          enunciado: `Área do retângulo ${b}×${h}`,
          enunciadoHTML: `<div class="questao-porcentagem">Qual a <span class="destaque">área</span> de um retângulo de base <span class="destaque">${b}</span> e altura <span class="destaque">${h}</span>?</div>`,
          resposta: b * h
        };
      }
    }
    case 'triangulo': {
      const b = sublivel === 'avancado' ? randomInt(8, 25) : randomInt(4, 15);
      const h = sublivel === 'avancado' ? randomInt(6, 20) : randomInt(3, 12);
      const base = b % 2 === 0 ? b : b + 1;
      return {
        tipo: 'geometria',
        enunciado: `Área do triângulo base ${base} altura ${h}`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual a <span class="destaque">área</span> de um triângulo de base <span class="destaque">${base}</span> e altura <span class="destaque">${h}</span>?</div>`,
        resposta: (base * h) / 2
      };
    }
    case 'circulo': {
      const r = sublivel === 'avancado' ? randomInt(5, 15) : sublivel === 'intermediario' ? randomInt(3, 10) : randomInt(2, 7);
      const tipo = escolher(['circunferencia', 'area']);
      if (tipo === 'circunferencia') {
        const resp = Math.round(2 * 3.14 * r * 100) / 100;
        return {
          tipo: 'geometria',
          enunciado: `Circunferência do círculo de raio ${r} (π≈3.14)`,
          enunciadoHTML: `<div class="questao-porcentagem">Qual a <span class="destaque">circunferência</span> de um círculo de raio <span class="destaque">${r}</span>?<br><small>(Use π ≈ 3.14)</small></div>`,
          resposta: resp
        };
      } else {
        const resp = Math.round(3.14 * r * r * 100) / 100;
        return {
          tipo: 'geometria',
          enunciado: `Área do círculo de raio ${r} (π≈3.14)`,
          enunciadoHTML: `<div class="questao-porcentagem">Qual a <span class="destaque">área</span> de um círculo de raio <span class="destaque">${r}</span>?<br><small>(Use π ≈ 3.14)</small></div>`,
          resposta: resp
        };
      }
    }
  }
}

function gerarVolume(sublivel) {
  const solidos = ['cubo', 'paralelepipedo', 'cilindro'];
  const solido = escolher(solidos);

  switch (solido) {
    case 'cubo': {
      const a = sublivel === 'avancado' ? randomInt(5, 15) : sublivel === 'intermediario' ? randomInt(3, 10) : randomInt(2, 8);
      return {
        tipo: 'geometria',
        enunciado: `Volume do cubo de aresta ${a}`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual o <span class="destaque">volume</span> de um cubo de aresta <span class="destaque">${a}</span>?</div>`,
        resposta: a * a * a
      };
    }
    case 'paralelepipedo': {
      const c = sublivel === 'avancado' ? randomInt(5, 15) : randomInt(3, 10);
      const l = sublivel === 'avancado' ? randomInt(4, 12) : randomInt(2, 8);
      const h = sublivel === 'avancado' ? randomInt(4, 12) : randomInt(2, 8);
      return {
        tipo: 'geometria',
        enunciado: `Volume do paralelepípedo ${c}×${l}×${h}`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual o <span class="destaque">volume</span> de um paralelepípedo de dimensões <span class="destaque">${c}</span> × <span class="destaque">${l}</span> × <span class="destaque">${h}</span>?</div>`,
        resposta: c * l * h
      };
    }
    case 'cilindro': {
      const r = sublivel === 'avancado' ? randomInt(4, 10) : randomInt(2, 7);
      const h = sublivel === 'avancado' ? randomInt(5, 15) : randomInt(3, 10);
      const resp = Math.round(3.14 * r * r * h * 100) / 100;
      return {
        tipo: 'geometria',
        enunciado: `Volume do cilindro r=${r} h=${h} (π≈3.14)`,
        enunciadoHTML: `<div class="questao-porcentagem">Qual o <span class="destaque">volume</span> de um cilindro de raio <span class="destaque">${r}</span> e altura <span class="destaque">${h}</span>?<br><small>(Use π ≈ 3.14)</small></div>`,
        resposta: resp
      };
    }
  }
}

function gerarPitagorasTrig(sublivel) {
  // Ternas pitagóricas (incluindo múltiplos para mais variedade)
  const ternasBase = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25],[9,40,41],[11,60,61],[20,21,29],[12,35,37]];
  const multiplicadores = sublivel === 'avancado' ? [1, 2, 3] : sublivel === 'intermediario' ? [1, 2] : [1];
  const mult = escolher(multiplicadores);
  const ternaBase = escolher(ternasBase);
  const terna = ternaBase.map(v => v * mult);

  const tipo = escolher(['hipotenusa', 'cateto']);

  if (tipo === 'hipotenusa') {
    return {
      tipo: 'pitagoras',
      enunciado: `Catetos ${terna[0]} e ${terna[1]}, hipotenusa = ?`,
      enunciadoHTML: `<div class="questao-porcentagem">Um triângulo retângulo tem catetos <span class="destaque">${terna[0]}</span> e <span class="destaque">${terna[1]}</span>. Qual a <span class="destaque">hipotenusa</span>?</div>`,
      resposta: terna[2]
    };
  } else {
    const cateto = terna[0];
    const hip = terna[2];
    const outro = terna[1];
    return {
      tipo: 'pitagoras',
      enunciado: `Hipotenusa ${hip}, cateto ${cateto}, outro cateto = ?`,
      enunciadoHTML: `<div class="questao-porcentagem">Um triângulo retângulo tem hipotenusa <span class="destaque">${hip}</span> e um cateto <span class="destaque">${cateto}</span>. Qual o outro <span class="destaque">cateto</span>?</div>`,
      resposta: outro
    };
  }
}


// ===== API PRINCIPAL =====

function gerarQuestoes(nivelId, sublivel = 'basico') {
  const config = NIVEIS_CONFIG[nivelId];
  if (!config) {
    console.error('Nível não encontrado:', nivelId);
    return [];
  }
  const questoes = [];
  for (let i = 0; i < config.totalQuestoes; i++) {
    questoes.push({ numero: i + 1, ...config.gerar(sublivel) });
  }
  return questoes;
}

function getNivelConfig(nivelId) {
  return NIVEIS_CONFIG[nivelId] || null;
}

function getTodosNiveis() {
  return NIVEIS_CONFIG;
}

function getNiveisFase(fase) {
  return Object.entries(NIVEIS_CONFIG)
    .filter(([id, config]) => config.fase === fase)
    .map(([id, config]) => ({ id, ...config }));
}

function verificarResposta(questao, respostaUsuario) {
  const respostaCorreta = questao.resposta;
  let resposta = String(respostaUsuario).trim().replace(',', '.');

  // Para frações
  if (questao.tipoResposta === 'fracao') {
    const match = resposta.match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if (match) {
      const num = parseInt(match[1]);
      const den = parseInt(match[2]);
      const d = mdc(Math.abs(num), den);
      return num / d === questao.respostaNum && den / d === questao.respostaDen;
    }
    return false;
  }

  const numResposta = parseFloat(resposta);
  const numCorreta = typeof respostaCorreta === 'string' ? parseFloat(respostaCorreta) : respostaCorreta;

  if (isNaN(numResposta)) return false;
  return Math.abs(numResposta - numCorreta) < 0.01;
}

// Exportar para uso global
window.kumonQuestoes = {
  gerar: gerarQuestoes,
  getNivelConfig,
  getTodosNiveis,
  getNiveisFase,
  verificarResposta,
  NIVEIS_CONFIG
};

// ============================================
// LuMED - Dados dos Editais + Gerador de HTML
// PSI 2026, Macro UEA 2026, ENEM 2026
// ============================================

const NIVEIS_CONFIG = {
  nivelamento: { label: 'Nivelamento', classe: 'nivelamento' },
  basico1:     { label: 'Básico', classe: 'basico1' },
  basico2:     { label: 'Fundamento', classe: 'basico2' },
  construcao:  { label: 'Performance', classe: 'construcao' },
  ataque:      { label: 'Maestria', classe: 'ataque' }
};

// ============================================
// PSI 2026 - UFAM
// ============================================
const PSI_DATA = [
  {
    id: 'biologia', nome: 'Biologia', icone: 'bi-tree',
    cor: '#ec4899, #db2777',
    niveis: {
      nivelamento: [
        { id: 'bio-niv-1', nome: 'Citologia: estrutura e fisiologia celular' },
        { id: 'bio-niv-2', nome: 'Divisão Celular (mitose e meiose)' },
        { id: 'bio-niv-3', nome: 'Metabolismo Energético (fotossíntese e respiração)' }
      ],
      basico1: [
        { id: 'bio-b1-1', nome: 'Biologia Molecular: DNA e RNA' },
        { id: 'bio-b1-2', nome: 'Genética: Leis de Mendel' },
        { id: 'bio-b1-3', nome: 'Herança e Sexo' },
        { id: 'bio-b1-4', nome: 'Mutações Genéticas' }
      ],
      basico2: [
        { id: 'bio-b2-1', nome: 'Biotecnologia' },
        { id: 'bio-b2-2', nome: 'Evolução Biológica' },
        { id: 'bio-b2-3', nome: 'Classificação dos Seres Vivos' },
        { id: 'bio-b2-4', nome: 'Ecologia: ecossistemas e cadeias tróficas' }
      ],
      construcao: [
        { id: 'bio-c-1', nome: 'Ciclos Biogeoquímicos' },
        { id: 'bio-c-2', nome: 'Impactos Ambientais e Preservação' },
        { id: 'bio-c-3', nome: 'Corpo Humano: sistemas e órgãos' },
        { id: 'bio-c-4', nome: 'ISTs e Métodos Contraceptivos' }
      ],
      ataque: [
        { id: 'bio-a-1', nome: 'Vacinas e Imunização' },
        { id: 'bio-a-2', nome: 'Biodiversidade Amazônica' },
        { id: 'bio-a-3', nome: 'Dinâmica de Populações' }
      ]
    }
  },
  {
    id: 'matematica', nome: 'Matemática', icone: 'bi-calculator',
    cor: '#3b82f6, #1d4ed8',
    niveis: {
      nivelamento: [
        { id: 'mat-niv-1', nome: 'Razão, Proporção e Porcentagem' },
        { id: 'mat-niv-2', nome: 'Juros Simples e Compostos' },
        { id: 'mat-niv-3', nome: 'Função Polinomial de 1º grau' },
        { id: 'mat-niv-4', nome: 'Função Polinomial de 2º grau' }
      ],
      basico1: [
        { id: 'mat-b1-1', nome: 'Função Exponencial e Logarítmica' },
        { id: 'mat-b1-2', nome: 'Trigonometria no Triângulo e Ciclo' },
        { id: 'mat-b1-3', nome: 'Progressões Aritméticas e Geométricas' },
        { id: 'mat-b1-4', nome: 'Matrizes e Determinantes' }
      ],
      basico2: [
        { id: 'mat-b2-1', nome: 'Sistemas Lineares' },
        { id: 'mat-b2-2', nome: 'Polinômios e Equações Polinomiais' },
        { id: 'mat-b2-3', nome: 'Números Complexos' },
        { id: 'mat-b2-4', nome: 'Análise Combinatória e Binômio de Newton' }
      ],
      construcao: [
        { id: 'mat-c-1', nome: 'Geometria Plana: áreas e perímetros' },
        { id: 'mat-c-2', nome: 'Geometria Espacial: prismas, pirâmides e corpos redondos' },
        { id: 'mat-c-3', nome: 'Geometria Analítica: reta e circunferência' },
        { id: 'mat-c-4', nome: 'Cônicas: elipse, hipérbole e parábola' }
      ],
      ataque: [
        { id: 'mat-a-1', nome: 'Estatística: médias, moda e mediana' },
        { id: 'mat-a-2', nome: 'Probabilidade' },
        { id: 'mat-a-3', nome: 'Relações Métricas nos Triângulos' },
        { id: 'mat-a-4', nome: 'Congruência e Semelhança de Triângulos' }
      ]
    }
  },
  {
    id: 'fisica', nome: 'Física', icone: 'bi-lightning',
    cor: '#f59e0b, #d97706',
    niveis: {
      nivelamento: [
        { id: 'fis-niv-1', nome: 'Cinemática: MRU e MRUV' },
        { id: 'fis-niv-2', nome: 'Leis de Newton e Dinâmica' },
        { id: 'fis-niv-3', nome: 'Trabalho, Energia e Potência' }
      ],
      basico1: [
        { id: 'fis-b1-1', nome: 'Gravitação Universal e Leis de Kepler' },
        { id: 'fis-b1-2', nome: 'Hidrostática: pressão e empuxo' },
        { id: 'fis-b1-3', nome: 'Termometria e Dilatação Térmica' },
        { id: 'fis-b1-4', nome: 'Calorimetria e Mudanças de Fase' }
      ],
      basico2: [
        { id: 'fis-b2-1', nome: 'Termodinâmica e Máquinas Térmicas' },
        { id: 'fis-b2-2', nome: 'Óptica Geométrica: espelhos e lentes' },
        { id: 'fis-b2-3', nome: 'Ondas: som e fenômenos ondulatórios' },
        { id: 'fis-b2-4', nome: 'Eletrostática: carga, campo e potencial' }
      ],
      construcao: [
        { id: 'fis-c-1', nome: 'Eletrodinâmica: circuitos e Lei de Ohm' },
        { id: 'fis-c-2', nome: 'Eletromagnetismo e Indução' },
        { id: 'fis-c-3', nome: 'Lançamento de Projéteis e MCU' },
        { id: 'fis-c-4', nome: 'Impulso e Quantidade de Movimento' }
      ],
      ataque: [
        { id: 'fis-a-1', nome: 'Ondas Eletromagnéticas e Efeito Doppler' },
        { id: 'fis-a-2', nome: 'Física Moderna e Radioatividade' },
        { id: 'fis-a-3', nome: 'Instrumentos Ópticos e o Olho Humano' }
      ]
    }
  },
  {
    id: 'quimica', nome: 'Química', icone: 'bi-droplet-fill',
    cor: '#06b6d4, #0891b2',
    niveis: {
      nivelamento: [
        { id: 'qui-niv-1', nome: 'Propriedades da Matéria e Separação de Misturas' },
        { id: 'qui-niv-2', nome: 'Modelos Atômicos e Estrutura do Átomo' },
        { id: 'qui-niv-3', nome: 'Tabela Periódica e Propriedades' }
      ],
      basico1: [
        { id: 'qui-b1-1', nome: 'Ligações Químicas: iônica, covalente e metálica' },
        { id: 'qui-b1-2', nome: 'Funções Inorgânicas: ácidos, bases, sais e óxidos' },
        { id: 'qui-b1-3', nome: 'Reações Químicas e Estequiometria' },
        { id: 'qui-b1-4', nome: 'Estudo dos Gases' }
      ],
      basico2: [
        { id: 'qui-b2-1', nome: 'Soluções: concentração e propriedades coligativas' },
        { id: 'qui-b2-2', nome: 'Termoquímica: entalpia e Lei de Hess' },
        { id: 'qui-b2-3', nome: 'Cinética Química: velocidade e fatores' },
        { id: 'qui-b2-4', nome: 'Equilíbrio Químico e pH' }
      ],
      construcao: [
        { id: 'qui-c-1', nome: 'Eletroquímica: pilhas e eletrólise' },
        { id: 'qui-c-2', nome: 'Radioatividade e Energia Nuclear' },
        { id: 'qui-c-3', nome: 'Química Orgânica: cadeias e funções' },
        { id: 'qui-c-4', nome: 'Isomeria Plana e Espacial' }
      ],
      ataque: [
        { id: 'qui-a-1', nome: 'Polímeros e Macromoléculas' },
        { id: 'qui-a-2', nome: 'Bioquímica e Química Ambiental' },
        { id: 'qui-a-3', nome: 'Energias Químicas e Combustíveis' }
      ]
    }
  },
  {
    id: 'portugues', nome: 'Língua Portuguesa e Literatura', icone: 'bi-book',
    cor: '#8b5cf6, #7c3aed',
    niveis: {
      nivelamento: [
        { id: 'port-niv-1', nome: 'Fonologia e Ortografia' },
        { id: 'port-niv-2', nome: 'Morfologia: classes de palavras' },
        { id: 'port-niv-3', nome: 'Interpretação e Compreensão de Textos' }
      ],
      basico1: [
        { id: 'port-b1-1', nome: 'Sintaxe do Período Simples' },
        { id: 'port-b1-2', nome: 'Sintaxe do Período Composto' },
        { id: 'port-b1-3', nome: 'Regência, Crase e Concordância' }
      ],
      basico2: [
        { id: 'port-b2-1', nome: 'Semântica e Figuras de Linguagem' },
        { id: 'port-b2-2', nome: 'Coesão, Coerência e Tipologia Textual' },
        { id: 'port-b2-3', nome: 'Quinhentismo, Barroco e Arcadismo' }
      ],
      construcao: [
        { id: 'port-c-1', nome: 'Romantismo: poesia e prosa' },
        { id: 'port-c-2', nome: 'Realismo, Naturalismo e Parnasianismo' },
        { id: 'port-c-3', nome: 'Simbolismo e Pré-Modernismo' }
      ],
      ataque: [
        { id: 'port-a-1', nome: 'Modernismo: 1ª e 2ª fases' },
        { id: 'port-a-2', nome: 'Pós-Modernismo e Literatura Contemporânea' },
        { id: 'port-a-3', nome: 'Obra: Papéis Avulsos (Machado de Assis)' }
      ]
    }
  },
  {
    id: 'historia', nome: 'História', icone: 'bi-hourglass-split',
    cor: '#ef4444, #dc2626',
    niveis: {
      nivelamento: [
        { id: 'hist-niv-1', nome: 'Antiguidade Clássica: Grécia' },
        { id: 'hist-niv-2', nome: 'Antiguidade Clássica: Roma' },
        { id: 'hist-niv-3', nome: 'Europa Medieval: feudalismo e cruzadas' },
        { id: 'hist-niv-4', nome: 'Renascimento, Reforma e Contrarreforma' }
      ],
      basico1: [
        { id: 'hist-b1-1', nome: 'Expansão Marítima e Colonização' },
        { id: 'hist-b1-2', nome: 'Brasil Colonial: economia e sociedade' },
        { id: 'hist-b1-3', nome: 'Amazônia Colonial e Reformas Pombalinas' },
        { id: 'hist-b1-4', nome: 'Iluminismo e Revolução Francesa' },
        { id: 'hist-b1-5', nome: 'Independência do Brasil' }
      ],
      basico2: [
        { id: 'hist-b2-1', nome: 'Brasil Império: Primeiro e Segundo Reinados' },
        { id: 'hist-b2-2', nome: 'Incorporação da Amazônia ao Império' },
        { id: 'hist-b2-3', nome: 'Revolução Industrial e Movimento Operário' },
        { id: 'hist-b2-4', nome: 'Imperialismo e Primeira Guerra Mundial' },
        { id: 'hist-b2-5', nome: 'Revolução Russa e Crise de 1929' }
      ],
      construcao: [
        { id: 'hist-c-1', nome: 'Primeira República e Movimentos Sociais' },
        { id: 'hist-c-2', nome: 'Era Vargas e Estado Novo' },
        { id: 'hist-c-3', nome: 'Segunda Guerra e Regimes Totalitários' },
        { id: 'hist-c-4', nome: 'Guerra Fria e Bipolaridade Mundial' },
        { id: 'hist-c-5', nome: 'Ditadura Militar no Brasil' },
        { id: 'hist-c-6', nome: 'O Amazonas Republicano: borracha e Zona Franca' }
      ],
      ataque: [
        { id: 'hist-a-1', nome: 'Redemocratização e Nova República' },
        { id: 'hist-a-2', nome: 'Globalização e Nova Ordem Mundial' },
        { id: 'hist-a-3', nome: 'Brasil Contemporâneo: de Itamar a Lula' },
        { id: 'hist-a-4', nome: 'Amazônia: desenvolvimento e conflitos' },
        { id: 'hist-a-5', nome: 'Movimentos Culturais no Brasil e Amazônia' }
      ]
    }
  },
  {
    id: 'geografia', nome: 'Geografia', icone: 'bi-globe',
    cor: '#10b981, #059669',
    niveis: {
      nivelamento: [
        { id: 'geo-niv-1', nome: 'Cartografia: escalas, projeções e fusos horários' },
        { id: 'geo-niv-2', nome: 'Estrutura da Terra e Formação do Relevo' },
        { id: 'geo-niv-3', nome: 'Dinâmica da Atmosfera e Clima' },
        { id: 'geo-niv-4', nome: 'Grandes Paisagens Naturais' }
      ],
      basico1: [
        { id: 'geo-b1-1', nome: 'Dinâmica Populacional e Teorias Demográficas' },
        { id: 'geo-b1-2', nome: 'Urbanização e Problemas Urbanos' },
        { id: 'geo-b1-3', nome: 'Globalização e Organização do Espaço' },
        { id: 'geo-b1-4', nome: 'Divisão Regional do Brasil' }
      ],
      basico2: [
        { id: 'geo-b2-1', nome: 'Relevo e Bacias Hidrográficas do Brasil' },
        { id: 'geo-b2-2', nome: 'Climas e Ecossistemas Brasileiros' },
        { id: 'geo-b2-3', nome: 'Economia Brasileira: agricultura e indústria' },
        { id: 'geo-b2-4', nome: 'Energia e Transportes no Brasil' }
      ],
      construcao: [
        { id: 'geo-c-1', nome: 'População Brasileira e Migrações' },
        { id: 'geo-c-2', nome: 'Amazônia: posição geográfica e características naturais' },
        { id: 'geo-c-3', nome: 'Organização do Espaço Amazônico' },
        { id: 'geo-c-4', nome: 'Zona Franca de Manaus e Questão Indígena' }
      ],
      ataque: [
        { id: 'geo-a-1', nome: 'Recursos Naturais e Potencial da Amazônia' },
        { id: 'geo-a-2', nome: 'Impactos Ambientais e Sustentabilidade' },
        { id: 'geo-a-3', nome: 'Potencial Energético e Hidrelétrico' },
        { id: 'geo-a-4', nome: 'Geopolítica e Questões Socioespaciais' }
      ]
    }
  }
];

// ============================================
// MACRO UEA 2026
// ============================================
const MACRO_DATA = [
  {
    id: 'mc-portugues', nome: 'Língua Portuguesa e Literatura', icone: 'bi-book',
    cor: '#8b5cf6, #7c3aed',
    niveis: {
      nivelamento: [
        { id: 'mc-port-niv-1', nome: 'Recursos expressivos e gêneros textuais' },
        { id: 'mc-port-niv-2', nome: 'Leitura e interpretação de textos' },
        { id: 'mc-port-niv-3', nome: 'Variação linguística e norma culta' }
      ],
      basico1: [
        { id: 'mc-port-b1-1', nome: 'Períodos simples e compostos' },
        { id: 'mc-port-b1-2', nome: 'Coesão e coerência textual' },
        { id: 'mc-port-b1-3', nome: 'Significação das palavras no texto' },
        { id: 'mc-port-b1-4', nome: 'Gêneros digitais: memes, vlogs, fanfics' }
      ],
      basico2: [
        { id: 'mc-port-b2-1', nome: 'Argumentação e tipos de argumento' },
        { id: 'mc-port-b2-2', nome: 'Estilos de época: Quinhentismo ao Arcadismo' },
        { id: 'mc-port-b2-3', nome: 'Regência, crase e concordância' },
        { id: 'mc-port-b2-4', nome: 'Literatura indígena e africana' }
      ],
      construcao: [
        { id: 'mc-port-c-1', nome: 'Romantismo ao Pré-Modernismo' },
        { id: 'mc-port-c-2', nome: 'Modernismo e literatura marginal/periferia' },
        { id: 'mc-port-c-3', nome: 'Morfossintaxe e análise linguística' },
        { id: 'mc-port-c-4', nome: 'Gêneros acadêmicos e científicos' }
      ],
      ataque: [
        { id: 'mc-port-a-1', nome: 'Obras: Macunaíma, Policarpo Quaresma, Caligrafia de Deus' },
        { id: 'mc-port-a-2', nome: 'Redação dissertativo-argumentativa' },
        { id: 'mc-port-a-3', nome: 'Análise linguística e semiótica avançada' }
      ]
    }
  },
  {
    id: 'mc-arte', nome: 'Arte', icone: 'bi-palette',
    cor: '#f472b6, #ec4899',
    niveis: {
      nivelamento: [
        { id: 'mc-art-niv-1', nome: 'Linguagens artísticas: artes visuais, dança, música e teatro' },
        { id: 'mc-art-niv-2', nome: 'Patrimônio cultural material e imaterial' }
      ],
      basico1: [
        { id: 'mc-art-b1-1', nome: 'Práticas culturais e artísticas locais e nacionais' },
        { id: 'mc-art-b1-2', nome: 'Movimentos corporais e manifestações artísticas' }
      ],
      basico2: [
        { id: 'mc-art-b2-1', nome: 'Produção artística em âmbito global' },
        { id: 'mc-art-b2-2', nome: 'Tecnologias digitais na arte (TDIC)' }
      ],
      construcao: [
        { id: 'mc-art-c-1', nome: 'Estereótipos e preconceitos nas práticas artísticas' },
        { id: 'mc-art-c-2', nome: 'Indústria cultural e diálogo estético' }
      ],
      ataque: [
        { id: 'mc-art-a-1', nome: 'Circulação artística em mídias digitais' },
        { id: 'mc-art-a-2', nome: 'Arte amazônica e produção contemporânea' }
      ]
    }
  },
  {
    id: 'mc-ingles', nome: 'Língua Inglesa', icone: 'bi-translate',
    cor: '#0ea5e9, #0284c7',
    niveis: {
      nivelamento: [
        { id: 'mc-ing-niv-1', nome: 'Leitura e interpretação em inglês' },
        { id: 'mc-ing-niv-2', nome: 'Vocabulário e estrutura gramatical básica' }
      ],
      basico1: [
        { id: 'mc-ing-b1-1', nome: 'Análise de discursos e fake news em inglês' },
        { id: 'mc-ing-b1-2', nome: 'Variantes da língua inglesa' }
      ],
      basico2: [
        { id: 'mc-ing-b2-1', nome: 'Textos normativos e legais em inglês' },
        { id: 'mc-ing-b2-2', nome: 'Literatura e cultura em língua inglesa' }
      ],
      construcao: [
        { id: 'mc-ing-c-1', nome: 'Recursos linguísticos e multissemióticos' },
        { id: 'mc-ing-c-2', nome: 'Mecanismos argumentativos em inglês' }
      ],
      ataque: [
        { id: 'mc-ing-a-1', nome: 'Inglês digital e TDIC' },
        { id: 'mc-ing-a-2', nome: 'Manifestações culturais amazônicas em inglês' }
      ]
    }
  },
  {
    id: 'mc-matematica', nome: 'Matemática', icone: 'bi-calculator',
    cor: '#3b82f6, #1d4ed8',
    niveis: {
      nivelamento: [
        { id: 'mc-mat-niv-1', nome: 'Razão, Proporção e Porcentagem' },
        { id: 'mc-mat-niv-2', nome: 'Juros Simples e Compostos' },
        { id: 'mc-mat-niv-3', nome: 'Unidades de medida e Sistema Internacional' }
      ],
      basico1: [
        { id: 'mc-mat-b1-1', nome: 'Função de 1º e 2º grau' },
        { id: 'mc-mat-b1-2', nome: 'Função Exponencial e Logarítmica' },
        { id: 'mc-mat-b1-3', nome: 'Funções Trigonométricas: seno e cosseno' },
        { id: 'mc-mat-b1-4', nome: 'Progressões Aritméticas e Geométricas' }
      ],
      basico2: [
        { id: 'mc-mat-b2-1', nome: 'Matrizes, Determinantes e Sistemas Lineares' },
        { id: 'mc-mat-b2-2', nome: 'Polígonos regulares e projeções cartográficas' },
        { id: 'mc-mat-b2-3', nome: 'Medidas de tendência central e dispersão' },
        { id: 'mc-mat-b2-4', nome: 'Princípio Fundamental da Contagem' }
      ],
      construcao: [
        { id: 'mc-mat-c-1', nome: 'Geometria espacial: prismas, pirâmides e corpos redondos' },
        { id: 'mc-mat-c-2', nome: 'Lei dos Senos e Lei dos Cossenos' },
        { id: 'mc-mat-c-3', nome: 'Permutação, Arranjo e Combinação' },
        { id: 'mc-mat-c-4', nome: 'Probabilidade e Eventos Aleatórios' }
      ],
      ataque: [
        { id: 'mc-mat-a-1', nome: 'Grandezas proporcionais e Matemática Financeira' },
        { id: 'mc-mat-a-2', nome: 'Algoritmos e Linguagem de Programação' },
        { id: 'mc-mat-a-3', nome: 'Notação científica e relações métricas' }
      ]
    }
  },
  {
    id: 'mc-historia', nome: 'História', icone: 'bi-hourglass-split',
    cor: '#ef4444, #dc2626',
    niveis: {
      nivelamento: [
        { id: 'mc-hist-niv-1', nome: 'Mundo Antigo: Grécia, Roma e civilizações africanas' },
        { id: 'mc-hist-niv-2', nome: 'Sociedades pré-colombianas e povos indígenas' },
        { id: 'mc-hist-niv-3', nome: 'Patrimônio histórico, memória e correntes historiográficas' },
        { id: 'mc-hist-niv-4', nome: 'Absolutismo, Mercantilismo e Reformas Protestantes' }
      ],
      basico1: [
        { id: 'mc-hist-b1-1', nome: 'Revoluções Burguesas e Revolução Industrial' },
        { id: 'mc-hist-b1-2', nome: 'Colonização e resistência indígena e africana' },
        { id: 'mc-hist-b1-3', nome: 'Formação dos povos europeus e América colonial' },
        { id: 'mc-hist-b1-4', nome: 'Escravidão, abolição e leis trabalhistas' },
        { id: 'mc-hist-b1-5', nome: 'Movimentos sociais: Canudos, Cabanagem, Contestado' }
      ],
      basico2: [
        { id: 'mc-hist-b2-1', nome: 'Imperialismo, 1ª Guerra e Revolução Russa' },
        { id: 'mc-hist-b2-2', nome: 'Era Vargas e populismo no Brasil' },
        { id: 'mc-hist-b2-3', nome: 'Regimes totalitários do século XX' },
        { id: 'mc-hist-b2-4', nome: 'Coronelismo e caudilhismo na América Latina' },
        { id: 'mc-hist-b2-5', nome: 'Pré-história e colonização do Amazonas' }
      ],
      construcao: [
        { id: 'mc-hist-c-1', nome: 'Guerra Fria e nova ordem mundial' },
        { id: 'mc-hist-c-2', nome: 'Ditadura Militar e redemocratização' },
        { id: 'mc-hist-c-3', nome: 'Brasil contemporâneo: de Collor a Bolsonaro' },
        { id: 'mc-hist-c-4', nome: 'Período da Borracha e Zona Franca de Manaus' },
        { id: 'mc-hist-c-5', nome: 'SUDAM, SUFRAMA e desenvolvimento regional' }
      ],
      ataque: [
        { id: 'mc-hist-a-1', nome: 'Diversidade, racismo e políticas afirmativas' },
        { id: 'mc-hist-a-2', nome: 'Movimentos sociais contemporâneos (feminismo, LGBTQ+, negro)' },
        { id: 'mc-hist-a-3', nome: 'Povos indígenas e quilombolas na Amazônia' },
        { id: 'mc-hist-a-4', nome: 'Patrimônio histórico-cultural do Amazonas' },
        { id: 'mc-hist-a-5', nome: 'Protagonismo juvenil e participação política' }
      ]
    }
  },
  {
    id: 'mc-geografia', nome: 'Geografia', icone: 'bi-globe',
    cor: '#10b981, #059669',
    niveis: {
      nivelamento: [
        { id: 'mc-geo-niv-1', nome: 'Cartografia, SIGs e representações gráficas' },
        { id: 'mc-geo-niv-2', nome: 'População brasileira, amazônida e amazonense' },
        { id: 'mc-geo-niv-3', nome: 'Territórios indígenas e quilombolas na Amazônia' },
        { id: 'mc-geo-niv-4', nome: 'Conflitos agrários e estrutura fundiária' }
      ],
      basico1: [
        { id: 'mc-geo-b1-1', nome: 'Geopolítica mundial: potências e conflitos' },
        { id: 'mc-geo-b1-2', nome: 'Globalização e desigualdades' },
        { id: 'mc-geo-b1-3', nome: 'Comércio internacional e blocos econômicos' },
        { id: 'mc-geo-b1-4', nome: 'Migrações nacionais, internacionais e refugiados' }
      ],
      basico2: [
        { id: 'mc-geo-b2-1', nome: 'Questões ambientais: desmatamento e queimadas' },
        { id: 'mc-geo-b2-2', nome: 'Agronegócio e modelos de produção' },
        { id: 'mc-geo-b2-3', nome: 'Empreendedorismo social no Amazonas' },
        { id: 'mc-geo-b2-4', nome: 'Patrimônio cultural e povos tradicionais da Amazônia' }
      ],
      construcao: [
        { id: 'mc-geo-c-1', nome: 'Indústria 4.0 e mundo do trabalho' },
        { id: 'mc-geo-c-2', nome: 'Territorialidade urbana na Amazônia' },
        { id: 'mc-geo-c-3', nome: 'Comércio amazônico: hidrovias e rodovias' },
        { id: 'mc-geo-c-4', nome: 'Segregação espacial e movimentos sociais' }
      ],
      ataque: [
        { id: 'mc-geo-a-1', nome: 'Fake news, ciberespaço e territorialidade digital' },
        { id: 'mc-geo-a-2', nome: 'Relações de trabalho na Amazônia' },
        { id: 'mc-geo-a-3', nome: 'Economia verde e desenvolvimento sustentável' },
        { id: 'mc-geo-a-4', nome: 'Polo Industrial de Manaus e empregabilidade' }
      ]
    }
  },
  {
    id: 'mc-filosofia', nome: 'Filosofia', icone: 'bi-lightbulb',
    cor: '#a855f7, #9333ea',
    niveis: {
      nivelamento: [
        { id: 'mc-fil-niv-1', nome: 'Mito, ética e moral nos diferentes tempos' },
        { id: 'mc-fil-niv-2', nome: 'Diversidade cultural: brasileira e amazônica' },
        { id: 'mc-fil-niv-3', nome: 'Etnocentrismo, cidadania e direitos humanos' }
      ],
      basico1: [
        { id: 'mc-fil-b1-1', nome: 'Política, democracia e Estado Democrático de Direito' },
        { id: 'mc-fil-b1-2', nome: 'Bioética e tecnologias de comunicação' },
        { id: 'mc-fil-b1-3', nome: 'Cosmologias Antiga, Medieval e Moderna' }
      ],
      basico2: [
        { id: 'mc-fil-b2-1', nome: 'Ética e meio ambiente: desenvolvimento sustentável' },
        { id: 'mc-fil-b2-2', nome: 'Trabalho, dignidade humana e relações sociais' },
        { id: 'mc-fil-b2-3', nome: 'Filosofia da arte e indústria cultural' }
      ],
      construcao: [
        { id: 'mc-fil-c-1', nome: 'Totalitarismo, democracia e esfera pública' },
        { id: 'mc-fil-c-2', nome: 'Preconceito, discriminação e violência' },
        { id: 'mc-fil-c-3', nome: 'Valores humanos: liberdade, solidariedade e equidade' }
      ],
      ataque: [
        { id: 'mc-fil-a-1', nome: 'Filosofia e literatura amazônica' },
        { id: 'mc-fil-a-2', nome: 'Novas tecnologias e relações digitais' }
      ]
    }
  },
  {
    id: 'mc-sociologia', nome: 'Sociologia', icone: 'bi-people',
    cor: '#f97316, #ea580c',
    niveis: {
      nivelamento: [
        { id: 'mc-soc-niv-1', nome: 'Pensamento sociológico brasileiro' },
        { id: 'mc-soc-niv-2', nome: 'Etnografia e sociedade amazônica' },
        { id: 'mc-soc-niv-3', nome: 'Cultura material e simbólica na Amazônia' }
      ],
      basico1: [
        { id: 'mc-soc-b1-1', nome: 'Democracia, cidadania e direitos humanos' },
        { id: 'mc-soc-b1-2', nome: 'Movimentos sociais na Amazônia' },
        { id: 'mc-soc-b1-3', nome: 'Diversidade cultural e multiculturalismo' }
      ],
      basico2: [
        { id: 'mc-soc-b2-1', nome: 'Sociedade capitalista e classes sociais' },
        { id: 'mc-soc-b2-2', nome: 'Globalização, integração e padronização cultural' },
        { id: 'mc-soc-b2-3', nome: 'Natureza, cultura e conflitos socioambientais' }
      ],
      construcao: [
        { id: 'mc-soc-c-1', nome: 'Trabalho, economia e Polo Industrial de Manaus' },
        { id: 'mc-soc-c-2', nome: 'Desigualdade social e exclusão digital' },
        { id: 'mc-soc-c-3', nome: 'Legislação ambiental e sustentabilidade' }
      ],
      ataque: [
        { id: 'mc-soc-a-1', nome: 'Identidades e etnicidades na Amazônia' },
        { id: 'mc-soc-a-2', nome: 'Direitos trabalhistas e sindicalismo no Amazonas' }
      ]
    }
  },
  {
    id: 'mc-biologia', nome: 'Biologia', icone: 'bi-tree',
    cor: '#ec4899, #db2777',
    niveis: {
      nivelamento: [
        { id: 'mc-bio-niv-1', nome: 'Introdução à Biologia e seres vivos' },
        { id: 'mc-bio-niv-2', nome: 'Citologia: tipos de células e organelas' },
        { id: 'mc-bio-niv-3', nome: 'Origem da vida e evolução' }
      ],
      basico1: [
        { id: 'mc-bio-b1-1', nome: 'Ecologia: ecossistemas, cadeias tróficas e biomas' },
        { id: 'mc-bio-b1-2', nome: 'Corpo Humano: tecidos, órgãos e sistemas' },
        { id: 'mc-bio-b1-3', nome: 'Genética: 1ª e 2ª Lei de Mendel' },
        { id: 'mc-bio-b1-4', nome: 'Evolução biológica e classificação dos seres vivos' }
      ],
      basico2: [
        { id: 'mc-bio-b2-1', nome: 'Biologia Molecular: DNA, RNA e código genético' },
        { id: 'mc-bio-b2-2', nome: 'ISTs, Métodos Contraceptivos e Gestação' },
        { id: 'mc-bio-b2-3', nome: 'Impactos ambientais e fontes de energia' },
        { id: 'mc-bio-b2-4', nome: 'Ciclos Biogeoquímicos' }
      ],
      construcao: [
        { id: 'mc-bio-c-1', nome: 'Biotecnologia e transgênicos' },
        { id: 'mc-bio-c-2', nome: 'Saúde, nutrição e dependência química' },
        { id: 'mc-bio-c-3', nome: 'Biodiversidade e preservação ambiental' }
      ],
      ataque: [
        { id: 'mc-bio-a-1', nome: 'Vacinas e produção de medicamentos' },
        { id: 'mc-bio-a-2', nome: 'Dinâmica de populações e meio ambiente' }
      ]
    }
  },
  {
    id: 'mc-fisica', nome: 'Física', icone: 'bi-lightning',
    cor: '#f59e0b, #d97706',
    niveis: {
      nivelamento: [
        { id: 'mc-fis-niv-1', nome: 'Cinemática: espaço, velocidade e aceleração' },
        { id: 'mc-fis-niv-2', nome: 'Leis de Newton e movimento planetário' },
        { id: 'mc-fis-niv-3', nome: 'Energia e suas modalidades' }
      ],
      basico1: [
        { id: 'mc-fis-b1-1', nome: 'Termologia: temperatura e calor' },
        { id: 'mc-fis-b1-2', nome: 'Ondas: conceitos, tipos e som' },
        { id: 'mc-fis-b1-3', nome: 'Óptica: reflexão e refração da luz' },
        { id: 'mc-fis-b1-4', nome: 'Circuitos elétricos e dispositivos' }
      ],
      basico2: [
        { id: 'mc-fis-b2-1', nome: 'Eletrostática: eletrização e campo elétrico' },
        { id: 'mc-fis-b2-2', nome: 'Eletrodinâmica e consumo de energia' },
        { id: 'mc-fis-b2-3', nome: 'Calorimetria e efeito estufa' },
        { id: 'mc-fis-b2-4', nome: 'Usinas hidroelétricas e transformação de energia' }
      ],
      construcao: [
        { id: 'mc-fis-c-1', nome: 'Radiação eletromagnética e radioatividade' },
        { id: 'mc-fis-c-2', nome: 'Máquinas térmicas e motores de combustão' },
        { id: 'mc-fis-c-3', nome: 'Problemas de visão e tipos de lentes' }
      ],
      ataque: [
        { id: 'mc-fis-a-1', nome: 'Energia nuclear e bombas atômicas' },
        { id: 'mc-fis-a-2', nome: 'Fontes de energia alternativas e sustentáveis' }
      ]
    }
  },
  {
    id: 'mc-quimica', nome: 'Química', icone: 'bi-droplet-fill',
    cor: '#06b6d4, #0891b2',
    niveis: {
      nivelamento: [
        { id: 'mc-qui-niv-1', nome: 'Estados físicos, substâncias e misturas' },
        { id: 'mc-qui-niv-2', nome: 'Modelos atômicos e estrutura atômica' },
        { id: 'mc-qui-niv-3', nome: 'Tabela periódica e distribuição eletrônica' }
      ],
      basico1: [
        { id: 'mc-qui-b1-1', nome: 'Ligações químicas e forças intermoleculares' },
        { id: 'mc-qui-b1-2', nome: 'Reações químicas e leis ponderais' },
        { id: 'mc-qui-b1-3', nome: 'Cinética química e velocidade das reações' },
        { id: 'mc-qui-b1-4', nome: 'Química ambiental no Amazonas' }
      ],
      basico2: [
        { id: 'mc-qui-b2-1', nome: 'Termoquímica e equilíbrio térmico' },
        { id: 'mc-qui-b2-2', nome: 'Eletroquímica: pilhas e eletrólise' },
        { id: 'mc-qui-b2-3', nome: 'Funções orgânicas e saúde' },
        { id: 'mc-qui-b2-4', nome: 'Polímeros, plásticos e reciclagem' }
      ],
      construcao: [
        { id: 'mc-qui-c-1', nome: 'Biocombustíveis e química verde' },
        { id: 'mc-qui-c-2', nome: 'Ciclos biogeoquímicos e produção química' },
        { id: 'mc-qui-c-3', nome: 'Compostos orgânicos e bioquímica' }
      ],
      ataque: [
        { id: 'mc-qui-a-1', nome: 'Radioatividade e armas nucleares' },
        { id: 'mc-qui-a-2', nome: 'Sustentabilidade e novas tecnologias em Química' }
      ]
    }
  }
];

// ============================================
// ENEM 2026 - Matriz de Referência
// ============================================
const ENEM_DATA = [
  {
    id: 'en-linguagens', nome: 'Linguagens, Códigos e suas Tecnologias', icone: 'bi-chat-quote',
    cor: '#8b5cf6, #7c3aed',
    niveis: {
      nivelamento: [
        { id: 'en-ling-niv-1', nome: 'Gêneros textuais e tipologia' },
        { id: 'en-ling-niv-2', nome: 'Variação linguística e norma padrão' },
        { id: 'en-ling-niv-3', nome: 'Interpretação e compreensão de textos' }
      ],
      basico1: [
        { id: 'en-ling-b1-1', nome: 'Texto literário e contexto histórico' },
        { id: 'en-ling-b1-2', nome: 'Gêneros digitais e tecnologias da comunicação' },
        { id: 'en-ling-b1-3', nome: 'Práticas corporais e linguagem' }
      ],
      basico2: [
        { id: 'en-ling-b2-1', nome: 'Produção e recepção artística' },
        { id: 'en-ling-b2-2', nome: 'Recursos expressivos e argumentação' },
        { id: 'en-ling-b2-3', nome: 'Língua Estrangeira Moderna' }
      ],
      construcao: [
        { id: 'en-ling-c-1', nome: 'Aspectos linguísticos e coesão textual' },
        { id: 'en-ling-c-2', nome: 'Literatura brasileira e formação nacional' },
        { id: 'en-ling-c-3', nome: 'Diversidade artística e cultural' }
      ],
      ataque: [
        { id: 'en-ling-a-1', nome: 'Tecnologias da comunicação e informação' },
        { id: 'en-ling-a-2', nome: 'Texto argumentativo e produção escrita' },
        { id: 'en-ling-a-3', nome: 'Patrimônio linguístico e identidade nacional' }
      ]
    }
  },
  {
    id: 'en-matematica', nome: 'Matemática e suas Tecnologias', icone: 'bi-calculator',
    cor: '#3b82f6, #1d4ed8',
    niveis: {
      nivelamento: [
        { id: 'en-mat-niv-1', nome: 'Números e operações' },
        { id: 'en-mat-niv-2', nome: 'Razão, proporção e porcentagem' },
        { id: 'en-mat-niv-3', nome: 'Juros e relação entre grandezas' }
      ],
      basico1: [
        { id: 'en-mat-b1-1', nome: 'Geometria plana: figuras e propriedades' },
        { id: 'en-mat-b1-2', nome: 'Grandezas, medidas e escalas' },
        { id: 'en-mat-b1-3', nome: 'Trigonometria do ângulo agudo' }
      ],
      basico2: [
        { id: 'en-mat-b2-1', nome: 'Funções do 1º e 2º grau' },
        { id: 'en-mat-b2-2', nome: 'Função exponencial e logarítmica' },
        { id: 'en-mat-b2-3', nome: 'Sequências e progressões (PA e PG)' }
      ],
      construcao: [
        { id: 'en-mat-c-1', nome: 'Estatística: média, moda e mediana' },
        { id: 'en-mat-c-2', nome: 'Probabilidade e princípios de contagem' },
        { id: 'en-mat-c-3', nome: 'Gráficos e tabelas: interpretação e análise' }
      ],
      ataque: [
        { id: 'en-mat-a-1', nome: 'Geometria analítica: retas e circunferências' },
        { id: 'en-mat-a-2', nome: 'Geometria espacial: volumes e áreas' },
        { id: 'en-mat-a-3', nome: 'Problemas interdisciplinares e modelagem' }
      ]
    }
  },
  {
    id: 'en-natureza', nome: 'Ciências da Natureza e suas Tecnologias', icone: 'bi-tree',
    cor: '#10b981, #059669',
    niveis: {
      nivelamento: [
        { id: 'en-nat-niv-1', nome: 'Mecânica: movimento e forças (Física)' },
        { id: 'en-nat-niv-2', nome: 'Célula, metabolismo e energia (Biologia)' },
        { id: 'en-nat-niv-3', nome: 'Matéria, transformações e modelos atômicos (Química)' }
      ],
      basico1: [
        { id: 'en-nat-b1-1', nome: 'Energia, trabalho e conservação (Física)' },
        { id: 'en-nat-b1-2', nome: 'Ecologia, ecossistemas e biomas (Biologia)' },
        { id: 'en-nat-b1-3', nome: 'Ligações químicas e funções inorgânicas (Química)' },
        { id: 'en-nat-b1-4', nome: 'Genética e hereditariedade (Biologia)' }
      ],
      basico2: [
        { id: 'en-nat-b2-1', nome: 'Termodinâmica e calor (Física)' },
        { id: 'en-nat-b2-2', nome: 'Evolução e biodiversidade (Biologia)' },
        { id: 'en-nat-b2-3', nome: 'Estequiometria e soluções (Química)' },
        { id: 'en-nat-b2-4', nome: 'Saúde e qualidade de vida (Biologia)' }
      ],
      construcao: [
        { id: 'en-nat-c-1', nome: 'Eletricidade e magnetismo (Física)' },
        { id: 'en-nat-c-2', nome: 'Óptica e ondas (Física)' },
        { id: 'en-nat-c-3', nome: 'Química orgânica e polímeros (Química)' },
        { id: 'en-nat-c-4', nome: 'Biotecnologia e DNA (Biologia)' }
      ],
      ataque: [
        { id: 'en-nat-a-1', nome: 'Energia, meio ambiente e sustentabilidade' },
        { id: 'en-nat-a-2', nome: 'Radiação, matéria e radioatividade' },
        { id: 'en-nat-a-3', nome: 'Ciclos biogeoquímicos e impactos ambientais' }
      ]
    }
  },
  {
    id: 'en-humanas', nome: 'Ciências Humanas e suas Tecnologias', icone: 'bi-people',
    cor: '#f59e0b, #d97706',
    niveis: {
      nivelamento: [
        { id: 'en-hum-niv-1', nome: 'Identidades culturais, patrimônio e diversidade' },
        { id: 'en-hum-niv-2', nome: 'Espaço geográfico e cartografia' },
        { id: 'en-hum-niv-3', nome: 'Organização social e política' }
      ],
      basico1: [
        { id: 'en-hum-b1-1', nome: 'Movimentos sociais e transformações históricas' },
        { id: 'en-hum-b1-2', nome: 'Estado, democracia e cidadania' },
        { id: 'en-hum-b1-3', nome: 'Revoluções modernas e formação do capitalismo' },
        { id: 'en-hum-b1-4', nome: 'Ética, valores e pensamento filosófico' }
      ],
      basico2: [
        { id: 'en-hum-b2-1', nome: 'Industrialização e urbanização' },
        { id: 'en-hum-b2-2', nome: 'Geopolítica e conflitos internacionais' },
        { id: 'en-hum-b2-3', nome: 'Produção, trabalho e tecnologia' },
        { id: 'en-hum-b2-4', nome: 'Questões ambientais e sustentabilidade' }
      ],
      construcao: [
        { id: 'en-hum-c-1', nome: 'Brasil colonial, imperial e republicano' },
        { id: 'en-hum-c-2', nome: 'Globalização e nova ordem mundial' },
        { id: 'en-hum-c-3', nome: 'População, migrações e dinâmica territorial' },
        { id: 'en-hum-c-4', nome: 'Lutas sociais e direitos dos cidadãos' }
      ],
      ataque: [
        { id: 'en-hum-a-1', nome: 'Direitos humanos e políticas afirmativas' },
        { id: 'en-hum-a-2', nome: 'Relação sociedade-natureza e recursos naturais' },
        { id: 'en-hum-a-3', nome: 'Vida urbana, segregação e inclusão social' }
      ]
    }
  }
];

// ============================================
// GERADOR DE HTML
// ============================================
function gerarTopicoHTML(topico) {
  return `
    <div class="topico-card" data-topico-id="${topico.id}">
      <div class="topico-left">
        <label class="topico-checkbox" data-tooltip="Marcar como concluído">
          <input type="checkbox" onchange="toggleTopico(this)">
          <span class="checkmark"></span>
        </label>
        <div class="topico-info">
          <div class="topico-header-card">
            <div class="topico-nome">${topico.nome}</div>
            <button class="btn-favorito" onclick="toggleFavorito(this)" title="Adicionar aos favoritos">
              <i class="bi bi-star"></i>
            </button>
          </div>
          <div class="topico-meta">
            <span class="meta-teoria"><i class="bi bi-book"></i> Teoria</span>
            <span class="meta-questoes"><i class="bi bi-pencil"></i> 0 questões</span>
          </div>
          <div class="topico-progress-mini">
            <div class="progress-mini-bar">
              <div class="progress-mini-fill" style="width: 0%"></div>
            </div>
            <span class="progress-mini-text">0%</span>
          </div>
        </div>
      </div>
      <div class="topico-status">
        <span class="status-badge pendente">
          <i class="bi bi-circle"></i>
          Pendente
        </span>
      </div>
      <div class="topico-actions">
        <button class="action-btn btn-teoria" onclick="toggleTeoria(this)" data-tooltip="Marcar teoria como estudada">
          <i class="bi bi-book"></i>
          Teoria
        </button>
        <div class="questoes-counter" data-tooltip="Questões resolvidas">
          <button class="counter-btn minus" onclick="decrementarQuestoes(this)">-</button>
          <span>0</span>
          <button class="counter-btn" onclick="incrementarQuestoes(this)">+</button>
        </div>
      </div>
    </div>`;
}

function gerarNivelHTML(nivelKey, topicos, isFirst) {
  const config = NIVEIS_CONFIG[nivelKey];
  const dotsHTML = topicos.map((t, i) => {
    let html = `<div class="progress-dot" data-topico="${i+1}" title="${t.nome}"></div>`;
    if (i < topicos.length - 1) html += '<div class="progress-line"></div>';
    return html;
  }).join('\n                    ');

  const topicosHTML = topicos.map(t => gerarTopicoHTML(t)).join('');

  return `
              <div class="nivel-content${isFirst ? ' active' : ''}" data-nivel-content="${nivelKey}">
                <div class="nivel-progress">
                  <div class="nivel-progress-header">
                    <div class="nivel-progress-title">
                      <i class="bi bi-graph-up-arrow"></i>
                      Progresso do ${config.label}
                    </div>
                    <div class="nivel-progress-stats">
                      <strong>0</strong> de <strong>${topicos.length}</strong> concluídos
                    </div>
                  </div>
                  <div class="progress-dots">
                    ${dotsHTML}
                  </div>
                </div>
                <div class="topicos-grid">${topicosHTML}
                </div>
                <div class="nivel-stats">
                  <div class="stat-card teoria">
                    <i class="bi bi-book"></i>
                    <div class="stat-value">0</div>
                    <div class="stat-label">Teorias estudadas</div>
                  </div>
                  <div class="stat-card questoes">
                    <i class="bi bi-pencil"></i>
                    <div class="stat-value">0</div>
                    <div class="stat-label">Questões feitas</div>
                  </div>
                  <div class="stat-card concluidos">
                    <i class="bi bi-check-circle"></i>
                    <div class="stat-value">0/${topicos.length}</div>
                    <div class="stat-label">Tópicos concluídos</div>
                  </div>
                </div>
              </div>`;
}

function gerarMateriaHTML(materia) {
  const totalTopicos = Object.values(materia.niveis).reduce((s, t) => s + t.length, 0);
  const niveisKeys = Object.keys(materia.niveis);

  const tabsHTML = niveisKeys.map((key, i) => {
    const config = NIVEIS_CONFIG[key];
    const count = materia.niveis[key].length;
    return `
                <button class="nivel-tab ${config.classe}${i === 0 ? ' active' : ''}" data-nivel="${key}">
                  ${config.label}
                  <span class="nivel-badge">0/${count}</span>
                </button>`;
  }).join('');

  const niveisHTML = niveisKeys.map((key, i) =>
    gerarNivelHTML(key, materia.niveis[key], i === 0)
  ).join('');

  return `
          <section class="materia-section" data-materia="${materia.id}">
            <div class="materia-header" onclick="toggleMateria(this)">
              <div class="materia-info">
                <span class="materia-icon" style="background: linear-gradient(135deg, ${materia.cor});"><i class="${materia.icone}"></i></span>
                <h2>${materia.nome}</h2>
              </div>
              <div class="materia-progress-mini">
                <span class="materia-contador">0/${totalTopicos}</span>
                <i class="bi bi-chevron-down"></i>
              </div>
            </div>
            <div class="materia-content">
              <div class="niveis-nav">${tabsHTML}
              </div>
${niveisHTML}
            </div>
          </section>`;
}

function gerarTabConteudo(materias) {
  return materias.map(m => gerarMateriaHTML(m)).join('\n');
}

// ============================================
// INICIALIZAÇÃO - Gerar todo o conteúdo
// ============================================
function gerarTodosEditais() {
  const tabPSI = document.getElementById('tab-psi');
  const tabMacro = document.getElementById('tab-macro');
  const tabENEM = document.getElementById('tab-enem');

  if (tabPSI) tabPSI.innerHTML = gerarTabConteudo(PSI_DATA);
  if (tabMacro) tabMacro.innerHTML = gerarTabConteudo(MACRO_DATA);
  if (tabENEM) tabENEM.innerHTML = gerarTabConteudo(ENEM_DATA);
}

// Executar antes do conteudo.js carregar o progresso
document.addEventListener('DOMContentLoaded', () => {
  gerarTodosEditais();
});

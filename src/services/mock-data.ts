import type {
  Cliente,
  CrossSell,
  Funcionalidade,
  Integracao,
  ItemCatalogo,
  Marca,
  Modulo,
  Objecao,
  QuizPergunta,
} from "./api";

export const modulos: Modulo[] = [
  {
    id: "pdv",
    nome: "PDV",
    categoria: "Operação de loja",
    descricao: "Frente de caixa completa, offline-first, com fiscal integrado.",
    detalhe:
      "O PDV 3S é o coração da operação de loja: abre e fecha caixa, processa vendas de balcão, delivery e mesa, emite documentos fiscais e continua funcionando mesmo sem internet, sincronizando assim que a conexão volta.",
    beneficios: [
      "Funciona 100% offline com sincronização automática",
      "Integração nativa com TEF e carteiras digitais",
      "Sangria, suprimento e fechamento de caixa auditáveis",
      "Descontos e promoções aplicados por regra central",
    ],
  },
  {
    id: "kds",
    nome: "KDS",
    categoria: "Operação de loja",
    descricao: "Gestão de pedidos na cozinha com controle de tempo por praça.",
    detalhe:
      "O Kitchen Display System organiza a produção por praça, exibe o tempo decorrido de cada pedido e sinaliza atrasos, eliminando comandas em papel e reduzindo erros de montagem.",
    beneficios: [
      "Roteamento de itens por praça de produção",
      "Alertas visuais de SLA por pedido",
      "Histórico de tempo médio de preparo",
      "Modo bump com telas touch ou teclado",
    ],
  },
  {
    id: "totem",
    nome: "Totem",
    categoria: "Autoatendimento",
    descricao: "Autoatendimento com upsell guiado e pagamento embarcado.",
    detalhe:
      "O Totem 3S aumenta o ticket médio com sugestões de combos e adicionais no fluxo de compra, reduz filas no balcão e envia o pedido direto ao KDS.",
    beneficios: [
      "Upsell e cross-sell configuráveis por horário",
      "Pagamento por cartão, Pix e carteira digital",
      "Cardápio sincronizado com o backoffice",
      "Acessibilidade e múltiplos idiomas",
    ],
  },
  {
    id: "mobile",
    nome: "Mobile",
    categoria: "Operação de loja",
    descricao: "Aplicativo de garçom e gestor para pedidos e acompanhamento.",
    detalhe:
      "O app Mobile permite lançar pedidos na mesa, dividir contas, acompanhar indicadores da loja e aprovar operações sensíveis diretamente do celular.",
    beneficios: [
      "Pedido na mesa com envio direto ao KDS",
      "Divisão de conta e transferência de mesa",
      "Painel de vendas em tempo real",
      "Aprovações remotas com trilha de auditoria",
    ],
  },
  {
    id: "nfce",
    nome: "NFC-e",
    categoria: "Fiscal",
    descricao: "Emissão fiscal com contingência e monitoramento por loja.",
    detalhe:
      "Módulo fiscal responsável pela emissão, contingência e reprocessamento de notas, com painel de rejeições e conciliação por loja e por período.",
    beneficios: [
      "Contingência offline automática",
      "Painel de rejeições com reprocesso em lote",
      "Parametrização tributária centralizada",
      "Exportação de arquivos para a contabilidade",
    ],
  },
  {
    id: "backoffice",
    nome: "Backoffice",
    categoria: "Gestão",
    descricao: "Cadastro central, preços, estoque e relatórios da rede.",
    detalhe:
      "O Backoffice concentra cadastro de produtos, tabelas de preço, promoções, estoque e relatórios consolidados de toda a rede, com propagação para as lojas.",
    beneficios: [
      "Cardápio e preços replicados para toda a rede",
      "Controle de estoque e fichas técnicas",
      "Relatórios de venda, cancelamento e desconto",
      "Perfis de acesso por função",
    ],
  },
  {
    id: "tma",
    nome: "TMA",
    categoria: "Suporte",
    descricao: "Terminal de monitoramento e atendimento remoto das lojas.",
    detalhe:
      "O TMA dá visibilidade do parque instalado: status de cada terminal, versão de software, filas de sincronização e abertura de chamados assistidos.",
    beneficios: [
      "Health check de terminais em tempo real",
      "Atualização remota de versão",
      "Alertas proativos de indisponibilidade",
      "Histórico de incidentes por loja",
    ],
  },
  {
    id: "kinesis",
    nome: "Kinesis",
    categoria: "Dados",
    descricao: "Camada de dados e integrações em tempo quase real.",
    detalhe:
      "Kinesis é a espinha dorsal de dados do ecossistema 3S: streaming de eventos de venda, integrações com ERPs e marketplaces e base para dashboards analíticos.",
    beneficios: [
      "Streaming de eventos de venda",
      "Conectores para ERP e marketplaces",
      "Base para BI e dashboards executivos",
      "Reprocessamento e rastreabilidade de eventos",
    ],
  },
];

export const catalogo: ItemCatalogo[] = [
  { id: "inst-pdv", nome: "Instalação PDV", preco: 450, secao: "instalacao" },
  { id: "inst-kds", nome: "Instalação KDS", preco: 320, secao: "instalacao" },
  { id: "inst-totem", nome: "Instalação Totem", preco: 780, secao: "instalacao" },
  { id: "setup-backoffice", nome: "Setup Backoffice", preco: 1200, secao: "instalacao" },
  { id: "treinamento", nome: "Treinamento de equipe", preco: 600, secao: "instalacao" },
  { id: "mens-pdv", nome: "Mensalidade PDV", preco: 189, secao: "mensalidade" },
  { id: "mens-kds", nome: "Mensalidade KDS", preco: 129, secao: "mensalidade" },
  { id: "mens-totem", nome: "Mensalidade Totem", preco: 249, secao: "mensalidade" },
  { id: "mens-mobile", nome: "Mensalidade Mobile", preco: 99, secao: "mensalidade" },
  { id: "mens-nfce", nome: "Mensalidade NFC-e", preco: 79, secao: "mensalidade" },
  { id: "mens-backoffice", nome: "Mensalidade Backoffice", preco: 219, secao: "mensalidade" },
  { id: "add-tma", nome: "TMA — monitoramento", preco: 149, secao: "adicionais" },
  { id: "add-kinesis", nome: "Kinesis — dados", preco: 349, secao: "adicionais" },
  { id: "add-eats", nome: "3S Eats", preco: 199, secao: "adicionais" },
  { id: "add-go", nome: "3S Go", preco: 179, secao: "adicionais" },
  { id: "add-suporte", nome: "Suporte 24/7", preco: 259, secao: "adicionais" },
];

export const marcas: Marca[] = [
  { id: "m1", nome: "Burger House", gmvMedio: 420000, lojas: 12, mensalidade: 1890 },
  { id: "m2", nome: "Sushi Prime", gmvMedio: 310000, lojas: 7, mensalidade: 1290 },
  { id: "m3", nome: "Pizzaria Bella", gmvMedio: 265000, lojas: 9, mensalidade: 1450 },
  { id: "m4", nome: "Açaí do Norte", gmvMedio: 120000, lojas: 22, mensalidade: 2100 },
  { id: "m5", nome: "Cantina Nonna", gmvMedio: 198000, lojas: 4, mensalidade: 780 },
  { id: "m6", nome: "Taco Loco", gmvMedio: 154000, lojas: 6, mensalidade: 940 },
  { id: "m7", nome: "Padaria Aurora", gmvMedio: 88000, lojas: 3, mensalidade: 520 },
  { id: "m8", nome: "Grill & Co", gmvMedio: 505000, lojas: 15, mensalidade: 2480 },
];

const nomes = [
  ["Burger House", "Tabela A", "Hamburgueria", "Ativo"],
  ["Sushi Prime", "Tabela B", "Japonesa", "Ativo"],
  ["Pizzaria Bella", "Tabela A", "Pizzaria", "Em implantação"],
  ["Açaí do Norte", "Tabela C", "Açaí & Sobremesas", "Ativo"],
  ["Cantina Nonna", "Tabela B", "Italiana", "Prospect"],
  ["Taco Loco", "Tabela C", "Mexicana", "Ativo"],
  ["Padaria Aurora", "Tabela A", "Padaria", "Churn"],
  ["Grill & Co", "Tabela A", "Churrascaria", "Ativo"],
  ["Green Bowl", "Tabela C", "Saudável", "Em implantação"],
  ["Frango Dourado", "Tabela B", "Frango Frito", "Ativo"],
] as const;

export const clientes: Cliente[] = nomes.map(([marca, subtabela, culinaria, status], i) => ({
  id: `c${i + 1}`,
  marca,
  subtabela,
  culinaria,
  status: status as Cliente["status"],
  mensalidade2026: 690 + i * 245,
  cnpj: `12.${(345 + i).toString().padStart(3, "0")}.678/0001-${(10 + i).toString()}`,
  responsavel: ["Ana Souza", "Bruno Lima", "Carla Dias", "Diego Alves", "Elisa Rocha"][i % 5]!,
  email: `contato@${marca.toLowerCase().replace(/[^a-z]/g, "")}.com.br`,
  telefone: `(11) 9${(8000 + i).toString()}-${(1000 + i * 7).toString()}`,
  cidade: ["São Paulo", "Campinas", "Rio de Janeiro", "Curitiba", "Belo Horizonte"][i % 5]!,
  uf: ["SP", "SP", "RJ", "PR", "MG"][i % 5]!,
  lojas: 3 + i * 2,
  gmvMensal: 90000 + i * 41000,
  ticketMedio: 48 + i * 3,
  pedidosMes: 1800 + i * 640,
  inicioContrato: `0${(i % 9) + 1}/2024`,
  fimContrato: `0${(i % 9) + 1}/2027`,
  modulos: ["PDV", "KDS", "Backoffice"].concat(i % 2 ? ["Totem"] : ["Mobile"]),
  integracoes: ["iFood", "ERP Totvs"].concat(i % 3 ? ["Pix Itaú"] : []),
  gerenteConta: ["João Carvalho", "Marina Prado", "Rafael Nunes"][i % 3]!,
  nps: 60 + ((i * 7) % 40),
  ultimaInteracao: `1${i % 9}/08/2026`,
  observacoes:
    "Conta com potencial de expansão para novas praças no próximo ciclo de negociação.",
}));

export const funcionalidades: Funcionalidade[] = [
  ["Gestão de cardápio", "Cardápio único replicado para todos os canais."],
  ["Controle de estoque", "Baixa automática por ficha técnica e inventário cíclico."],
  ["Fidelidade & CRM", "Campanhas segmentadas por comportamento de compra."],
  ["Delivery integrado", "Pedidos de marketplaces direto no PDV e KDS."],
  ["Gestão de mesas", "Mapa de salão, transferência e divisão de conta."],
  ["Relatórios gerenciais", "DRE operacional, curva ABC e ranking de lojas."],
  ["Multiloja & franquias", "Governança central com autonomia controlada por loja."],
  ["Pagamentos", "TEF, Pix, carteiras digitais e conciliação automática."],
  ["Fiscal completo", "NFC-e, SAT e contingência com painel de rejeições."],
].map(([nome, resumo], i) => ({
  id: `f${i + 1}`,
  nome: nome!,
  resumo: resumo!,
  detalhe: `${resumo} Na prática, o parceiro ganha padronização de processo, menos retrabalho operacional e visibilidade em tempo real para decidir mais rápido. Use este argumento quando o cliente citar perda de controle na expansão da rede.`,
}));

export const crossSell: CrossSell[] = [
  {
    id: "eats",
    nome: "3S Eats",
    descricao: "Canal próprio de delivery com cardápio digital e taxa reduzida.",
    bullets: [
      "Loja online white label com domínio do parceiro",
      "Taxa menor que marketplaces tradicionais",
      "Base de clientes própria para campanhas",
      "Integração direta com PDV e KDS",
    ],
  },
  {
    id: "go",
    nome: "3S Go",
    descricao: "Retirada rápida e pedido antecipado para operações de alto giro.",
    bullets: [
      "Pedido antecipado com horário de retirada",
      "Fila digital e chamada por painel",
      "Ideal para praças de alimentação e aeroportos",
      "Redução de tempo de espera no balcão",
    ],
  },
  {
    id: "insights",
    nome: "3S Insights",
    descricao: "Camada analítica sobre o Kinesis com benchmarks de mercado.",
    bullets: [
      "Dashboards executivos prontos",
      "Comparativo com médias do segmento",
      "Alertas de queda de venda por loja",
      "Exportação para BI do cliente",
    ],
  },
];

export const integracoes: Integracao[] = [
  ["iFood", "Pedidos, cardápio e status sincronizados em tempo real.", "Marketplace"],
  ["Rappi", "Recebimento de pedidos e atualização de disponibilidade.", "Marketplace"],
  ["Totvs", "Integração contábil e fiscal com o ERP.", "ERP"],
  ["SAP", "Envio de movimentos financeiros e estoque.", "ERP"],
  ["Stone", "TEF e conciliação automática de recebíveis.", "Pagamentos"],
  ["Cielo", "Captura de transações e split de pagamento.", "Pagamentos"],
  ["Power BI", "Conector de dados via Kinesis para dashboards próprios.", "Dados"],
].map(([nome, descricao, categoria], i) => ({
  id: `i${i + 1}`,
  nome: nome!,
  descricao: descricao!,
  categoria: categoria!,
}));

export const quiz: QuizPergunta[] = [
  {
    id: "q1",
    pergunta: "Qual módulo continua operando mesmo sem conexão com a internet?",
    opcoes: ["Backoffice", "PDV", "Kinesis", "TMA"],
    correta: 1,
    explicacao: "O PDV é offline-first e sincroniza automaticamente quando a conexão retorna.",
  },
  {
    id: "q2",
    pergunta: "O KDS resolve principalmente qual dor da operação?",
    opcoes: [
      "Emissão de nota fiscal",
      "Organização e tempo de produção na cozinha",
      "Conciliação de recebíveis",
      "Cadastro de fornecedores",
    ],
    correta: 1,
    explicacao: "O KDS organiza a produção por praça e controla o SLA de cada pedido.",
  },
  {
    id: "q3",
    pergunta: "Qual o principal ganho comercial do Totem?",
    opcoes: [
      "Redução de impostos",
      "Aumento de ticket médio com upsell guiado",
      "Eliminação do backoffice",
      "Substituição do KDS",
    ],
    correta: 1,
    explicacao: "O upsell guiado no autoatendimento eleva o ticket médio e reduz filas.",
  },
  {
    id: "q4",
    pergunta: "Kinesis é a camada de...",
    opcoes: ["Fiscal", "Dados e integrações", "Autoatendimento", "Suporte remoto"],
    correta: 1,
    explicacao: "Kinesis faz streaming de eventos e alimenta integrações e BI.",
  },
  {
    id: "q5",
    pergunta: "Para uma rede que perdeu controle de preços entre lojas, o que priorizar?",
    opcoes: ["TMA", "Backoffice", "Mobile", "NFC-e"],
    correta: 1,
    explicacao: "O Backoffice centraliza cadastro e tabelas de preço com replicação para a rede.",
  },
  {
    id: "q6",
    pergunta: "O TMA é usado por qual time no dia a dia?",
    opcoes: ["Cozinha", "Suporte e operações", "Contabilidade", "Marketing"],
    correta: 1,
    explicacao: "O TMA monitora o parque instalado e apoia o atendimento remoto.",
  },
];

export const objecoes: Objecao[] = [
  {
    id: "o1",
    objecao: "“Está caro comparado ao meu sistema atual.”",
    opcoes: [
      "Posso pedir um desconto para o meu gestor.",
      "Vamos comparar custo total: quanto você perde hoje com quebra de caixa, retrabalho fiscal e loja parada?",
      "Todos os sistemas bons são caros.",
    ],
    correta: 1,
    explicacao: "Traga a conversa para custo total de operação, não para preço de tabela.",
  },
  {
    id: "o2",
    objecao: "“Minha equipe não vai se adaptar.”",
    opcoes: [
      "A adaptação é problema do RH.",
      "O sistema é fácil, não se preocupe.",
      "Fazemos treinamento presencial e o PDV é usado em produção em média em 2 dias; posso mostrar o plano de rollout.",
    ],
    correta: 2,
    explicacao: "Responda com plano concreto de implantação e prova de tempo de adoção.",
  },
  {
    id: "o3",
    objecao: "“Já tenho contrato com outro fornecedor.”",
    opcoes: [
      "Então vamos falar quando vencer o contrato.",
      "Quando vence? Podemos desenhar a migração para começar no fim da vigência e rodar piloto em uma loja antes.",
      "Cancele, vale a pena.",
    ],
    correta: 1,
    explicacao: "Mapeie a data de vencimento e proponha piloto, mantendo o ciclo vivo.",
  },
  {
    id: "o4",
    objecao: "“E se cair a internet no meu caixa?”",
    opcoes: [
      "O PDV opera offline e sincroniza sozinho; a NFC-e entra em contingência automática.",
      "Aí a loja para mesmo.",
      "Recomendo contratar dois links.",
    ],
    correta: 0,
    explicacao: "Offline-first + contingência fiscal é diferencial técnico forte do 3S.",
  },
  {
    id: "o5",
    objecao: "“Não quero trocar meu ERP.”",
    opcoes: [
      "Vai ter que trocar em algum momento.",
      "Você não precisa: integramos com Totvs, SAP e outros via Kinesis.",
      "Nosso backoffice substitui o ERP.",
    ],
    correta: 1,
    explicacao: "O 3S convive com o ERP existente através das integrações do Kinesis.",
  },
  {
    id: "o6",
    objecao: "“A implantação vai atrapalhar minha operação.”",
    opcoes: [
      "Fazemos tudo em um fim de semana, sem risco.",
      "Sempre atrapalha um pouco.",
      "Implantamos por ondas, começando por uma loja piloto e em horário de menor movimento.",
    ],
    correta: 2,
    explicacao: "Reduza risco percebido com rollout em ondas e piloto controlado.",
  },
  {
    id: "o7",
    objecao: "“O suporte de vocês é bom mesmo?”",
    opcoes: [
      "Temos suporte 24/7 com monitoramento proativo via TMA; posso compartilhar SLA e NPS atuais.",
      "É o melhor do mercado.",
      "Nunca tivemos reclamação.",
    ],
    correta: 0,
    explicacao: "Sustente a promessa com SLA, TMA e indicadores verificáveis.",
  },
  {
    id: "o8",
    objecao: "“Preciso aprovar com meu sócio.”",
    opcoes: [
      "Sem problema, aguardo você retornar.",
      "Faz sentido. Podemos marcar 20 minutos com ele para eu apresentar o business case direto?",
      "Você decide sozinho, não?",
    ],
    correta: 1,
    explicacao: "Traga o decisor para a mesa em vez de terceirizar a venda.",
  },
  {
    id: "o9",
    objecao: "“Não vejo retorno claro nesse investimento.”",
    opcoes: [
      "O retorno vem com o tempo.",
      "Vamos rodar a calculadora com seu GMV e nº de lojas para estimar economia e payback.",
      "Todo mundo que contrata gosta.",
    ],
    correta: 1,
    explicacao: "Use a calculadora e números do próprio cliente para provar payback.",
  },
  {
    id: "o10",
    objecao: "“Vou ficar preso a vocês.”",
    opcoes: [
      "Todo sistema é assim.",
      "Contrato tem cláusula de saída e seus dados são exportáveis a qualquer momento via Kinesis.",
      "Você não vai querer sair.",
    ],
    correta: 1,
    explicacao: "Portabilidade de dados e cláusula de saída dissolvem o medo de lock-in.",
  },
];

// Conteúdo copiado de wisemadness.org.br em 08/11/2026.
const S = 'https://storage.sitevero.com/cms-production/ed56bfa9-6eca-4a60-8be4-4f0eb861d98d/';
const TODAY = '2026-11-08';

const ORG = {
  nome: 'Associação Wise Madness',
  cnpj: '13.890.668/0001-01',
  abertura: '23/05/2011',
  email: 'adm@wisemadness.com.br',
  tel: '(14) 3208-7400',
  horario: 'Segunda a sexta, 7h30 às 16h30',
  sede: 'Rua Treze de Maio, 15-26, sala A, 2º andar · Bauru, SP · 17014-450',
  missao: 'Desenvolver o protagonismo social e garantir os direitos de crianças, adolescentes e jovens através da arte, cultura, esporte e empreendedorismo, para sua inclusão social e exercício pleno da cidadania.',
  visao: 'Ser uma instituição sólida, estruturada, com pessoal capacitado e com recursos e metodologia adequados a um padrão de atendimento de excelência.',
  valores: ['Ética', 'Responsabilidade', 'Solidariedade', 'Transparência', 'Compromisso', 'Integridade', 'Respeito'],
  redes: [
    ['Instagram', 'https://www.instagram.com/wisemadnesssocial/'],
    ['Facebook', 'https://www.facebook.com/wisemadness'],
    ['YouTube', 'https://www.youtube.com/@WMsabialoucura'],
    ['LinkedIn', 'https://www.linkedin.com/company/wiseonline/'],
  ],
};

const STATS = [
  { n: '638', t: 'crianças e adolescentes por dia no Serviço de Convivência' },
  { n: '40', t: 'crianças e adolescentes acolhidos nas casas Wise' },
  { n: '622 mil', t: 'refeições servidas em 2024' },
  { n: '7', t: 'unidades de atendimento em Bauru' },
];

const TIMELINE = [
  ['2006', 'Nasce a Wise, com street dance, teatro e pirofagia em casas e espaços públicos de Bauru.'],
  ['2010', 'Primeira sede própria, com oficinas artísticas e esportes radicais.'],
  ['2011', 'A associação ganha CNPJ e nasce o grupo Wise Way.'],
  ['2014', 'Parceria com a Prefeitura de Bauru: começam o Serviço de Convivência e o Acolhimento.'],
  ['2017', 'Começa a escola de futebol Wise Brac.'],
  ['2021', 'Primeira turma do Projeto Foco, de fotografia.'],
  ['2023', 'Projeto Hóquei, com o Atlético Hóquei Bauru.'],
  ['2024', 'Projeto Farol e a Wise Breakers Crew no Master Crews, em São Paulo.'],
  ['2026', 'Termo de fomento com o Ministério do Esporte.'],
];

const UNIDADES = [
  { id: 'I', nome: 'Wise Galpão', tipo: 'Serviço de Convivência (0 a 15 anos)', end: 'Rua Braz Lemos de Almeida, 2-45 · Vila Aviação B · 17047-630', tel: '(14) 99822-8920', email: 'wisegalpao@wisemadness.com.br', hor: '7h30 às 16h30' },
  { id: 'II', nome: 'Wise Rasi', tipo: 'Serviço de Convivência (6 a 15 anos)', end: 'Rua Augusto Moreno Munhoz, s/n · Octávio Rasi · 17039-210', tel: '(14) 99885-4718', email: 'wiserasi@wisemadness.com.br', hor: '7h30 às 16h30' },
  { id: 'III', nome: 'Wise Hope', tipo: 'Acolhimento institucional', end: null, tel: '(14) 3243-2715', email: 'wisehope@wisemadness.com.br', hor: '8h às 17h' },
  { id: 'IV', nome: 'Wise Brac', tipo: 'Serviço de Convivência (6 a 15 anos)', end: 'Rua Antônia Fabiano, 4-65 · Parque Jaraguá · 17067-670', tel: '(14) 99843-4540', email: 'wisebrac@wisemadness.com.br', hor: '7h30 às 16h30' },
  { id: 'V', nome: 'Wise New', tipo: 'Serviço de Convivência (6 a 15 anos)', end: 'Rua Sargento Joaquim Nunes Cabral, 2-50 · Nova Esperança · 17065-220', tel: '(14) 99834-7352', email: 'wisenew@wisemadness.com.br', hor: '7h30 às 16h30' },
  { id: 'VI', nome: 'Wise Generation', tipo: 'Acolhimento institucional', end: null, tel: '(14) 99156-8459', email: 'wisegeneration@wisemadness.com.br', hor: '8h às 17h' },
  { id: 'Adm', nome: 'Administrativo', tipo: 'RH, jurídico, prestação de contas, fiscal e coordenação', end: 'Rua Treze de Maio, 15-26, sala A, 2º andar · 17014-450', tel: '(14) 3208-7400', email: 'adm@wisemadness.com.br', hor: '8h às 17h' },
];

const SERVICOS = [
  {
    slug: 'servico-scfv', img: 'img/sobre.jpg', titulo: 'Serviço de Convivência e Fortalecimento de Vínculos', curto: 'Convivência (SCFV)',
    resumo: '638 crianças e adolescentes de 6 a 15 anos, todos os dias, no contraturno escolar.',
    publico: '6 a 15 anos', onde: 'Unidades I, II, IV e V', quando: 'Segunda a sexta, no contraturno escolar',
    texto: [
      'O Serviço de Convivência e Fortalecimento de Vínculos é realizado por meio de termos de colaboração com a Secretaria Municipal de Assistência Social (SMAS) e a Prefeitura de Bauru, dentro da rede de assistência social.',
      'Em grupos organizados por idade, as crianças e adolescentes participam de atividades artísticas, culturais, esportivas e de lazer. O objetivo é fortalecer as relações familiares e comunitárias, ampliar as redes de apoio e proteção e prevenir situações de violação de direitos.',
    ],
    contatos: [['Unidade II · Octávio Rasi', '(14) 99885-4718'], ['Unidade IV · Parque Jaraguá', '(14) 99843-4540'], ['Unidade V · Nova Esperança', '(14) 99834-7352']],
    parcerias: ['3380', '3378', '3379', '3484', '3153', '3152'],
  },
  {
    slug: 'servico-acolhimento', img: null, titulo: 'Serviço de Acolhimento Institucional', curto: 'Acolhimento',
    resumo: 'Duas casas que cuidam, todos os dias, de 40 crianças e adolescentes afastados temporariamente da família.',
    publico: '0 a 17 anos e 11 meses', onde: 'Casas Wise Hope e Wise Generation (endereços protegidos)', quando: 'Todos os dias, 24 horas',
    texto: [
      'As casas da Wise trabalham pela reorganização familiar. Recebem crianças e adolescentes em situação de risco no ambiente familiar que precisam ser temporariamente afastados desse convívio, com proteção integral, cuidado e carinho.',
      'As equipes são capacitadas para acolher cada criança até que a família possa reassumir esse papel. O trabalho é feito em parceria com a Prefeitura de Bauru, por meio da SMAS. Para proteger as crianças, os endereços das casas não são divulgados.',
    ],
    contatos: [['Equipe técnica · Wise Hope', '(14) 99836-8491'], ['Equipe técnica · Wise Generation', '(14) 99156-8459']],
    parcerias: ['3316', '3317', '3318', '2966'],
  },
];

const PROJETOS = [
  {
    slug: 'projeto-wise-way', nome: 'Wise Way', area: 'Arte e cultura', img: 'img/p-wiseway.jpg',
    resumo: 'Grupo de street dance e breaking que leva apresentações pela cidade.',
    publico: '6 a 16 anos', onde: 'Unidade I · Wise Galpão', quando: 'Sábados, 14h às 15h30', custo: 'Gratuito',
    texto: [
      'O Wise Way é um grupo de artes fundado em 2011 como extensão do projeto Impactar com Arte. Hoje reúne crianças e adolescentes das oficinas de street dance e breaking.',
      'Mais do que dança, o grupo trabalha valores como respeito, solidariedade e o papel social de cada criança. As apresentações acontecem em espaços públicos e privados da cidade e em espetáculos itinerantes da Wise.',
    ],
    contatos: [['Livinha', '(14) 99652-7998']],
  },
  {
    slug: 'projeto-oficinas-culturais', poster: true, nome: 'Oficinas Culturais', area: 'Arte e cultura', img: 'img/p-oficinas.jpg',
    resumo: 'Street dance, breaking, contemporâneo, rap, percussão e malabares em duas unidades.',
    publico: 'Crianças e adolescentes', onde: 'Unidades II e V', quando: 'Segunda a sábado (veja a grade)', custo: 'Gratuito',
    texto: [
      'As Oficinas Culturais são realizadas com apoio da Lei de Incentivo à Cultura (Lei Rouanet) do Ministério da Cultura, com patrocínio de Banco BTG Pactual, Mezzani Alimentos, Grupo Lwart, Imeca, Promins, Paschoalotto e Supermercados Pacaembu.',
    ],
    grade: {
      'Unidade II · Octávio Rasi': [
        ['Street dance', 'Sex 16h30–18h30 · Sáb 9h–11h'], ['Breaking', 'Ter 19h–21h · Qui 17h–19h'], ['Contemporâneo', 'Seg 17h–19h · Qua 17h–19h'],
        ['Rap', 'Seg 19h–21h · Qui 19h–21h'], ['Percussão', 'Ter 16h30–18h30 · Sex 19h–21h'], ['Malabares', 'Ter 18h30–20h30 · Sex 19h–21h'],
      ],
      'Unidade V · Nova Esperança': [
        ['Street dance', 'Qui 17h–19h · Sáb 14h–16h'], ['Breaking', 'Seg 17h–19h · Qui 17h–19h'], ['Contemporâneo', 'Ter 17h–19h · Qui 17h–19h'],
        ['Rap', 'Qua 19h–21h · Sex 19h–21h'], ['Percussão', 'Seg 17h–19h · Qua 17h–19h'], ['Malabares', 'Seg 17h–19h · Qui 17h–19h'],
      ],
    },
    contatos: [['Mayara', '(14) 99807-2402']],
  },
  {
    slug: 'projeto-impactar-com-arte', nome: 'Impactar com Arte', area: 'Arte e cultura', img: 'img/p-impactar.jpg',
    resumo: 'Apresentações em escolas e espaços públicos que convidam o público para as oficinas.',
    publico: 'Todas as idades', onde: 'Escolas e espaços públicos de Bauru', quando: 'Conforme agenda', custo: 'Gratuito',
    texto: [
      'O projeto leva apresentações culturais a escolas e espaços públicos, principalmente nas regiões periféricas. Quem assiste é convidado a participar das oficinas artísticas, gratuitas e abertas a todas as idades.',
      'São essas oficinas que preparam a próxima apresentação, tornando o Impactar com Arte um ciclo contínuo de aprendizado e palco.',
    ],
    contatos: [['Marcus Vinicius', '(14) 99648-8853']],
    parcerias: ['3459'],
  },
  {
    slug: 'projeto-hoquei', nome: 'Projeto Hóquei', area: 'Esporte', img: 'img/p-hoquei.jpg',
    resumo: 'Escola de hóquei sobre patins para crianças que não teriam acesso ao esporte.',
    publico: 'Crianças e adolescentes', onde: 'Bauru, com o Atlético Hóquei Bauru', quando: 'Conforme turma', custo: 'Gratuito',
    texto: [
      'Criado em 2023 pelo Atlético Hóquei Bauru (AHB), o projeto oferece a escola de hóquei a crianças em situação de risco ou cujas famílias não podem arcar com o custo do esporte, que exige patins, sticks e equipamentos de proteção.',
      'Com a Secretaria de Esportes e Lazer de Bauru (SEMEL) e equipes que doaram material, os alunos já disputaram o Campeonato Paulista nas categorias Sub-11 e Iniciantes.',
    ],
    contatos: [],
    parcerias: ['3163'],
  },
  {
    slug: 'projeto-wise-brac', nome: 'Wise Brac · Escola de Futebol', area: 'Esporte', img: 'img/p-wisebrac.jpg',
    resumo: 'Escolinha de futebol com café da manhã e tênis emprestado para quem precisa.',
    publico: '6 a 17 anos, em três turmas', onde: 'Unidade V · Wise New', quando: 'Turmas de 6–9, 10–13 e 14–17 anos', custo: 'Gratuito',
    texto: [
      'A escolinha começou em 1º de abril de 2017, criada por Diogo Fernandes e Daniel Rufino, que dividiam duas paixões: o futebol e ajudar o próximo.',
      'Além de técnica, os participantes aprendem disciplina, responsabilidade e respeito. Os treinos têm café da manhã, e quem não tem tênis adequado recebe um par para usar no treino.',
    ],
    contatos: [['Daniel', '(14) 99673-6183'], ['Diogo', '(14) 99732-7737']],
    parcerias: ['3165', '3164'],
  },
  {
    slug: 'projeto-foco', poster: true, nome: 'Projeto Foco', area: 'Qualificação', img: 'img/p-foco.jpg',
    resumo: 'Curso de fotografia que já formou cerca de 200 adolescentes desde 2021.',
    publico: 'Adolescentes', onde: 'Bauru', quando: 'Turmas anuais', custo: 'Gratuito',
    texto: [
      'O curso Foco usa a fotografia para que adolescentes em situação de vulnerabilidade enxerguem o mundo de outro jeito, desenvolvam talentos e abram portas profissionais.',
      'Além da técnica fotográfica, os jovens trabalham disciplina, trabalho em equipe e empreendedorismo. O projeto conta com apoio de Mezzani, Banco BTG Pactual, Confiança Supermercados, CMDCA e Condeca.',
    ],
    contatos: [],
    parcerias: ['condeca'],
  },
  {
    slug: 'projeto-farol', poster: true, nome: 'Projeto Farol', area: 'Qualificação', img: 'img/p-farol.jpg',
    resumo: 'Curso de informática e mundo do trabalho para jovens de 15 a 21 anos.',
    publico: '15 a 21 anos', onde: 'Bauru', quando: 'Turmas desde agosto de 2024', custo: 'Gratuito',
    texto: [
      'O Projeto Farol prepara jovens para o mercado de trabalho com informática prática e conteúdos sobre o mundo profissional.',
      'É realizado com investimento de Witzler Energia, Toyota Mori Motors, HMB Top Motors e Hyundai.',
    ],
    contatos: [['Inscrições', '(14) 99834-7352']],
  },
];

const ACONTECE = [
  { slug: 'evento-4-premio', tipo: 'Evento', data: '20/08/2026', titulo: '4º Prêmio Responsabilidade Social', img: 'img/ev-4premio.jpg', texto: 'Noite de reconhecimento às empresas e pessoas que apoiam a Wise, às 19h, no Alameda Hall.' },
  { slug: 'wise-news-out-2025', tipo: 'Wise News', data: '17/11/2025', titulo: 'Wise News · setembro e outubro de 2025', img: 'img/wisenews.jpg', texto: 'O informativo oficial da Wise Madness, com as novidades das unidades e dos projetos.', pdf: S + '1774006621222_wise-news-edicao-setembro-outubro-2025.pdf' },
  { slug: 'evento-bid-2025', tipo: 'Evento', data: '25/09/2025', titulo: 'BID 2025', img: 'img/ev-bid.jpg', texto: 'Das 8h às 14h50. Um convite para fazer parte da transformação de mais de mil crianças e adolescentes.' },
  { slug: 'evento-3-premio', tipo: 'Evento', data: '13/08/2025', titulo: '3º Prêmio de Responsabilidade Social', img: 'img/ev-3premio.jpg', texto: 'A partir das 19h, no Alameda Hall.' },
  { slug: 'master-crews-2024', tipo: 'Notícia', data: '14/12/2024', titulo: 'Wise Breakers Crew no maior campeonato de breaking do Brasil', img: 'img/mc-backstage.jpg', galeria: ['img/mc-backstage.jpg', 'img/mc-dupla.jpg', 'img/mc-trio.jpg', 'img/mc-sp.jpg', 'img/mc-arena.jpg', 'img/mc-grupo1.jpg', 'img/mc-trio2.jpg'],
    texto: 'Crianças e adolescentes do Serviço de Convivência das unidades Rasi e Nova Esperança, que formaram a Wise Breakers Crew, foram ao Master Crews, no Tendal da Lapa, em São Paulo. A viagem, a alimentação e os passeios foram possíveis graças a doações de parceiros. Parabéns aos educadores Pedro Kanagushu, Matheus Islan e Camilly Taina. Hip hop não para!' },
  { slug: 'ebook-liberdade-ou-prisao', tipo: 'Material', data: '2026', titulo: 'E-book Liberdade ou Prisão?', img: null, texto: 'E-book gratuito, publicado com o CMDCA.', pdf: 'https://sitevero-cms-production.nyc3.cdn.digitaloceanspaces.com/ed56bfa9-6eca-4a60-8be4-4f0eb861d98d/1774005832342_E-book_CMDCA.pdf' },
];

const LOGOS = [["Impactodo","l01.png"],["HMB Top Motors","l02.png"],["Supernova Technology","l03.png"],["Seven Empreendimentos","l04.png"],["Pegoraro Engenharia","l05.png"],["Omni","l06.png"],["Mônica Pasquarelli Cosméticos","l07.png"],["Michael Simões Advocacia","l08.png"],["Lwart","l09.png"],["Jalovi","l10.png"],["HumAlimentar","l11.png"],["Dona Baunilha","l12.png"],["Deocleciu's Churrascaria","l13.png"],["Apaloosa's Churrascaria","l14.png"],["Alpack","l15.png"],["Social Bauru","l16.png"],["Viverde","l17.png"],["FourC","l18.png"],["Paschoalotto","l19.png"],["Prefeitura de Bauru","l20.png"],["CMDCA Bauru","l21.png"],["Mesa Brasil Sesc","l22.png"],["BTG Pactual","l23.png"],["Confiança Supermercados","l24.png"],["Fundação Cerqueira Leite","l25.png"],["Agrosolo","l26.png"],["GFStore","l27.png"],["Stalo","l28.png"],["Witzler Energia","l29.png"],["Mectrol","l30.png"],["Scaffold Education","l31.png"],["Sistel Engenharia","l32.png"],["Neo Arquitetura","l33.png"],["Vineyard Bauru","l34.png"],["Kimetais","l35.png"],["Mezzani","l36.png"],["FRZ","l37.png"],["Toyota Mori Motors","l38.png"],["GODA Advocacia","l39.png"],["Hyundai","l40.png"],["Condeca","l41.png"],["Faga Medical","l42.png"]];
const LOGO_GROUPS = {
  'Poder público e conselhos': ['Prefeitura de Bauru', 'CMDCA Bauru', 'Condeca'],
  'Patrocinadores e investidores': ['BTG Pactual', 'Lwart', 'Mezzani', 'Paschoalotto', 'Witzler Energia', 'Toyota Mori Motors', 'Hyundai', 'HMB Top Motors', 'Confiança Supermercados', 'FourC'],
};

// ---------- Transparência ----------
// Datas e valores da lista pública de "Contratos e Serviços" (outubro de 2026).
const PARCERIAS = [
  { id: '1030', nome: 'Projeto esportivo · Ministério do Esporte', num: 'Termo de Fomento nº 1030/2026 · Transferegov 7AADBD/2026', tipo: 'Fomento', esfera: 'Federal', orgao: 'Ministério do Esporte', ini: '2026-09-27', fim: '2028-02-27', valor: 290732.68, desembolso: 'Parcela única', area: 'Esporte', conta: '58.111-9',
    docs: [['Termo de fomento', '1792517787096_Termo_de_Fomento_I_Ministerio_do_Esporte.pdf'], ['Publicação no Diário Oficial da União', '1792518492757_Publica_o_D_O_U.pdf']], repasses: [], pc: [] },
  { id: '3380', nome: 'Serviço de Convivência · Rede Básica · recurso municipal', num: 'Termo de Colaboração nº 3.380/2024 · Processo 183.116/2024 · Edital 577/2024 · Chamamento Público 72/2024', tipo: 'Colaboração', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-12-30', fim: '2025-12-29', valor: 2414956.31, desembolso: 'Mensal', area: 'SCFV', conta: '42.403-X',
    alerta: 'No site atual, o valor programado aparece como R$ 241.495.631,00, 100 vezes maior que o valor da lista.',
    docs: [['Termo de colaboração', '1773320659501_TERMO_3_380-2024.pdf']], repasses: [['2025-05-28', 201246.36, '1773873481215_EXTRATO_BANCARIO_CC_42_403-X_JAN_I_ABR_2025.pdf', '1773873490401_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_380_2024.pdf']], pc: [] },
  { id: '3378', nome: 'Serviço de Convivência · Rede Básica · recurso estadual', num: 'Termo de Colaboração nº 3.378/2024 · Processo 183.116/2024 · Edital 577/2024 · Chamamento Público 72/2024', tipo: 'Colaboração', esfera: 'Estadual', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-12-30', fim: '2025-12-29', valor: 69120, desembolso: 'Mensal', area: 'SCFV', conta: '51.107-2',
    docs: [['Termo de colaboração', '1773320663854_TERMO_3_378-2024.pdf']], repasses: [['2025-05-27', 5760, '1773874945318_EXTRATO_BANCARIO_CC_51_107-2_JAN_I_ABR_2025.pdf', '1773874945483_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_378_2024.pdf']], pc: [] },
  { id: '3379', nome: 'Serviço de Convivência · Rede Básica · recurso federal', num: 'Termo de Colaboração nº 3.379/2024 · Processo 183.116/2024 · Edital 577/2024 · Chamamento Público 72/2024', tipo: 'Colaboração', esfera: 'Federal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-12-29', fim: '2025-12-28', valor: 66975, desembolso: 'Mensal', area: 'SCFV', conta: '51.108-0',
    alerta: 'No site atual, o valor programado aparece como R$ 22.325,00, e o arquivo de prestação de contas é o demonstrativo de outro termo (3.316/2024).',
    docs: [['Termo de colaboração', '1773320661740_TERMO_3_379-2024.pdf']], repasses: [['2025-05-27', 5581.25, '1773872966045_EXTRATO_BANCARIO_CC_51_108-0_JAN_I_ABR_2025.pdf', '1773872967437_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_379_2024.pdf']],
    pc: [['2024', 'Relatório 1', '1773873185085_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_316_2024.pdf']] },
  { id: '3484', nome: 'Serviço de Convivência · emenda parlamentar federal', num: 'Termo de Colaboração nº 3.484/2025 · Processo 58.245/2024 · Emenda da deputada Adriana Ventura', tipo: 'Colaboração', esfera: 'Federal', orgao: 'Prefeitura Municipal de Bauru', ini: '2025-05-02', fim: '2026-05-28', valor: 166890, desembolso: 'Mensal', area: 'SCFV', conta: '51.582-5',
    docs: [['Termo de colaboração', '1773320638807_Termo_3_484_2025.pdf']], repasses: [], pc: [] },
  { id: '3153', nome: 'Serviço de Convivência · Unidade Wise New', num: 'Termo de Fomento nº 3.153/2024 · Processo 17.354/2024 · Emenda do vereador Junior Rodrigues · Custeio', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-08-07', fim: '2025-08-07', valor: 100000, desembolso: 'Mensal', area: 'SCFV', conta: null,
    docs: [['Termo de fomento', '1773320649417_Termo_de_Fomento_n_3153-2024_I_Emenda_Impositiva_Municipal_I_Vereador_Junior_Rodrigues.pdf']], repasses: [], pc: [] },
  { id: '3152', nome: 'Serviço de Convivência · Unidade Wise Life', num: 'Termo de Fomento nº 3.152/2024 · Emenda Impositiva 27.811.014.2.076 · Processo 17.418/2024 · Vereador Berriel · Auxílio', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-08-31', fim: '2025-08-29', valor: 50000, desembolso: 'Mensal', area: 'SCFV', conta: null,
    docs: [['Termo de fomento', '1773320651362_Termo_de_Fomento_n_3152-2024_I_Emenda_Impositiva_Municipal_I_Vereador_Berriel.pdf']], repasses: [], pc: [] },
  { id: '3316', nome: 'Acolhimento · Rede Especial · recurso municipal', num: 'Termo de Colaboração nº 3.316/2024 · Processo 183.270/2024 · Edital 577/2024 · Chamamento Público 72/2024', tipo: 'Colaboração', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-12-30', fim: '2025-12-29', valor: 173318040, desembolso: 'Mensal', area: 'Acolhimento', conta: '50.984-1',
    alerta: 'O valor de R$ 173.318.040,00 publicado no site atual é provavelmente um erro de vírgula: 12 parcelas de R$ 144.431,70 somam R$ 1.733.180,40.',
    docs: [['Edital 577/2024', '1773320669784_1_1_EDITAL_577_do_20241003_3898.pdf'], ['Homologação do chamamento público', '1773320670492_1_2_HOMOLOGA_O_FINAL_CHAMAMENTO_P_BLICO_2025.pdf'], ['Termo de colaboração', '1773320671286_TERMO_3_316-2024.pdf']],
    repasses: [['2025-05-27', 144431.70, '1773872531560_EXTRATO_BANCARIO_CC_50_984-1_JAN_I_ABR_2025.pdf', '1773872541589_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_316_2024.pdf']],
    pc: [['2026', 'Demonstrativo de receitas e despesas', '1773872541589_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_316_2024.pdf']] },
  { id: '3317', nome: 'Acolhimento · Rede Especial · recurso estadual', num: 'Termo de Colaboração nº 3.317/2024 · Processo 183.270/2024 · Edital 577/2024 · Chamamento Público 72/2024', tipo: 'Colaboração', esfera: 'Estadual', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-12-30', fim: '2025-12-29', valor: 86221.20, desembolso: 'Mensal', area: 'Acolhimento', conta: '51.104-8',
    alerta: 'No site atual, o valor programado aparece como R$ 8.622.120,00 e a parcela como R$ 718.510,00. Pelo total, a parcela mensal seria R$ 7.185,10.',
    docs: [['Termo de colaboração', '1773320667787_TERMO_3_317-2024.pdf']], repasses: [['2025-01-01', 718510, '1773873777691_EXTRATO_BANCARIO_CC_51_104-8_JAN_I_ABR_2025.pdf', '1773873777890_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_317_2024.pdf']], pc: [] },
  { id: '3318', nome: 'Acolhimento · Rede Especial · recurso federal', num: 'Termo de Colaboração nº 3.318/2024 · Processo 183.270/2024 · Edital 577/2024 · Chamamento Público 72/2024', tipo: 'Colaboração', esfera: 'Federal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-12-30', fim: '2025-12-29', valor: 144000, desembolso: 'Mensal', area: 'Acolhimento', conta: '51.105-6',
    docs: [['Termo de colaboração', '1773320665719_Termo_3_318_-_2024.pdf']], repasses: [['2025-05-28', 12000, '1773874504550_EXTRATO_BANCARIO_CC_51_105-6-X_JAN_I_ABR_2025.pdf', '1773874504785_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_318_2024.pdf']], pc: [] },
  { id: '2966', nome: 'Acolhimento · emenda parlamentar federal', num: 'Termo de Colaboração nº 2.966/2023 · Processo 51404/2023 · Emenda do deputado Rodrigo Agostinho', tipo: 'Colaboração', esfera: 'Federal', orgao: 'Prefeitura Municipal de Bauru', ini: '2023-12-19', fim: '2024-12-19', valor: 100000, desembolso: 'Mensal', area: 'Acolhimento', conta: '41.035-7',
    docs: [['Termo de colaboração', '1773320644138_Termo_de_Colabora_o_2_966-2023_Emenda_Parlamentar_Federal_I_Servi_o_de_Acolhimento_em_Abrigo_para_Crian_as_e_Adolescentes.pdf']],
    repasses: [['2023-11-30', 100000, '1773876996347_EXTRATO_BANCARIO_CC_41_035-7_DEZ_2023_E_JAN_I_DEZ_2024.pdf', '1773877005901_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_2_966_2023.pdf']],
    pc: [['2023', 'Demonstrativo de receitas e despesas', '1773877005901_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_2_966_2023.pdf']] },
  { id: '3459', nome: 'Impactar com Arte · CMDCA', num: 'Termo de Fomento nº 3.459/2025 · Processo 26834/2025 · Chamamento Público 416/CMDCA 2023', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2025-03-10', fim: '2026-03-10', valor: 86200, desembolso: 'Mensal', area: 'Arte e cultura', conta: '51.106-4',
    alerta: 'O relatório publicado no site atual é um arquivo provisório ("relatório em preparação").',
    docs: [['Termo de fomento', '1773320640563_Termo_de_fomento_3459-2025_-_Impactar_com_Artes.pdf']], repasses: [['2025-05-28', 7188.33, '1773871887597_EXTRATO_BANCARIO_CC_51_106-4_JAN_I_MAI_2025.pdf', null]], pc: [] },
  { id: '3458', nome: 'Capacitação FourC · CMDCA', num: 'Termo de Fomento nº 3.458/2025 · Processo 26834/2025 · Chamamento Público 416/CMDCA 2023', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2025-03-10', fim: '2026-03-10', valor: 168936, desembolso: 'Mensal', area: 'Qualificação', conta: '41.035-7',
    alerta: 'O relatório publicado no site atual é um arquivo provisório ("relatório em preparação").',
    docs: [['Termo de fomento', '1773320642125_Termo_de_Fomento_3458-2025_-_Four_C_e_Wise_Madness.pdf']], repasses: [['2025-05-28', 14078, '1773872257082_EXTRATO_BANCARIO_CC_41_035-7_JAN_I_MAI_2025.pdf', null]], pc: [] },
  { id: 'condeca', nome: 'Projeto Foco · Condeca', num: 'Termo de Fomento · Processo 012.00004180/2024-91 · Chamamento Público 01/SEDS/Condeca/2021-2022 · Fundo Estadual dos Direitos da Criança e do Adolescente', tipo: 'Fomento', esfera: 'Estadual', orgao: 'Secretaria de Desenvolvimento Social (SP)', ini: '2024-07-21', fim: '2025-07-21', valor: 189300, desembolso: 'Parcela única', area: 'Qualificação', conta: '41.349-6',
    alerta: 'O relatório publicado no site atual é um arquivo provisório ("relatório em preparação").',
    docs: [['Resultado publicado no Diário Oficial', '1773320657220_DOE-30_07_24_-_FOCO_CONDECA.pdf'], ['Termo de fomento', '1773320657551_TERMO_FOCO_-_CONDECA.pdf']], repasses: [['2024-06-30', 189300, '1773876716383_EXTRATO_BANCARIO_CC_41_349-6_JUL_I_DEZ_2024_E_JAN_I_MAIO_2025.pdf', null]], pc: [] },
  { id: '3163', nome: 'Projeto Hóquei', num: 'Termo de Fomento nº 3.163/2024 · Emenda Impositiva 27.811.014.2.076 · Processo 27.898/2024 · Vereador Berriel', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-12-30', fim: '2025-12-30', valor: 50000, desembolso: 'Mensal', area: 'Esporte', conta: '47.132-1',
    docs: [['Termo de fomento', '1773320654860_Termo_de_Fomento_31632024_H_quei_I_Emenda_Impositiva_Municipal_I_Vereador_Beriel.pdf']], repasses: [['2025-05-28', 4166.66, '1773874200368_EXTRATO_BANCARIO_CC_47_132-1_JAN_I_ABR_2025.pdf', '1773874201126_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_163_2024.pdf']], pc: [] },
  { id: '3165', nome: 'Wise Brac Futebol Clube · auxílio', num: 'Termo de Fomento nº 3.165/2024 · Processo 27.885/2024 · Emenda Impositiva 27.813.0014.2.075 · Vereador Miltinho Sardim', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-08-31', fim: '2025-08-31', valor: 22703, desembolso: 'Parcela única', area: 'Esporte', conta: '41.348-8',
    docs: [['Termo de fomento', '1773320647682_Termo_de_Fomento_n_3165-2024_I_Emenda_Impositiva_Municipal_I_Vereador_Miltinho_Sardim_I_Wise_Brac_Futebol_Club.pdf']], repasses: [['2024-09-01', 22703, '1773875758497_EXTRATO_BANCARIO_CC_41_348-8_SET_I_DEZ_2024.pdf', '1773875773147_Futebol.pdf']], pc: [] },
  { id: '3164', nome: 'Wise Brac Futebol Clube · custeio', num: 'Termo de Fomento nº 3.164/2024 · Processo 27.885/2024 · Emenda Impositiva 27.813.0014.2.075 · Vereador Miltinho Sardim', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-09-30', fim: '2025-08-31', valor: 27297, desembolso: 'Parcela única', area: 'Esporte', conta: '47.131-3',
    docs: [['Termo de fomento', '1773320645928_Termo_de_Fomento_n_3164-2024_IEmenda_Impositiva_Municipal_I_Vereador_Miltinho_Sardim_I_Wise_Brac_Futebol_ClubI_Custeio.pdf']], repasses: [['2025-05-28', 27297, '1773875337592_EXTRATO_BANCARIO_CC_47_131-3_SET_I_DEZ_2024.pdf', '1773875350823_Futebol.pdf']], pc: [] },
  { id: '3151', nome: 'Energia fotovoltaica e veículo', num: 'Termo de Fomento nº 3.151/2024 · Emenda Impositiva · Processo 17.371/2024 · Vereador Bira · Auxílio', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', ini: '2024-08-07', fim: '2024-12-29', valor: 246000, desembolso: 'Parcela única', area: 'Estrutura', conta: '47.134-8',
    docs: [['Termo de fomento', '1773320653055_Termo_de_Fomento_n_3151-2024_I_Emenda_Impositiva_Municipal_I_Vereador_Bira.pdf']],
    repasses: [['2024-07-31', 246000, '1773876068643_EXTRATO_BANCARIO_CC_47_134-8_AGO_I_DEZ_2024.pdf', '1773876078294_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_151_2024.pdf']],
    pc: [['2024', 'Demonstrativo de receitas e despesas', '1773876226809_Demonstrativo_Receitas_-Despesas_I_Termo_de_Colabora_o_3_151_2024.pdf']] },
];

// Biblioteca de documentos
const DOCS = [
  { cat: 'Estatuto e atas', ano: 2026, nome: 'Ata de eleição e posse da diretoria atual (4 de maio de 2026)', f: '1792183786799_13_-_Ata_12_Altera_o_04_de_maio_de_2026.pdf' },
  { cat: 'Estatuto e atas', ano: 2023, nome: 'Estatuto social (5ª alteração, 31 de agosto de 2023)', f: '1773320713793_Estatuto_5_Altera_o_-_31_AGOSTO_2023-Site.pdf' },
  { cat: 'Estatuto e atas', ano: 2024, nome: 'Manual do colaborador e código de conduta', f: '1773320708971_MANUAL_DO_COLABORADOR_vers_o_final.pdf' },
  { cat: 'Certidões', ano: 2026, nome: 'Certidão de débitos federais e dívida ativa da União', f: '1773320713036_Certidao-13890668000101.pdf' },
  { cat: 'Certidões', ano: 2025, nome: 'Certidão negativa de débitos trabalhistas (CNDT)', f: '1773320712449_Certida_042025_CNDT.pdf', renovar: true },
  { cat: 'Certidões', ano: 2024, nome: 'Certidão negativa de débitos municipais', f: '1773320710509_04-_Mobiliaria.pdf', renovar: true },
  { cat: 'Certidões', ano: 2024, nome: 'Certidão negativa de débitos estaduais', f: '1773320711197_CND_SP.pdf', renovar: true },
  { cat: 'Certidões', ano: 2024, nome: 'Certificado de regularidade do FGTS (CRF)', f: '1773320711853_Certidao_FGTS_042025.pdf', renovar: true },
  { cat: 'Balanços e auditoria', ano: 2025, nome: 'Parecer dos auditores independentes', f: '1786552454618_Caderno_dos_Auditores_Independentes_-_Wise_-_31_12_2025_Assinado.pdf' },
  { cat: 'Balanços e auditoria', ano: 2025, nome: 'Balanço patrimonial', f: '1786475790406_BALANCOPATRIMONIAL_MODELO3_ANUAL_01_12_2025_Assinado_assinado.pdf' },
  { cat: 'Balanços e auditoria', ano: 2025, nome: 'Notas explicativas às demonstrações financeiras', f: '1786552623978_2025-Dfs_Notas_Explicativas_Revisada_Assinado_assinado_assinado_assinado_assinado_281_29_assinado_assinado.pdf' },
  { cat: 'Balanços e auditoria', ano: 2025, nome: 'Demonstração do resultado (DRE)', f: '1786553650072_RELATORIODRE_MODELO3_ANUAL_01_12_2025_Assinado_281_29_assinado_1.pdf' },
  { cat: 'Balanços e auditoria', ano: 2025, nome: 'Balancete de verificação anual', f: '1786553131045_BALANCETEDEVERIFICACAO_ANUAL_01_12_2025_Assinado_assinado.pdf' },
  { cat: 'Balanços e auditoria', ano: 2023, nome: 'Demonstrações financeiras e notas explicativas', f: '1773320697712_Demonstra_es_Financeiras_e_notas_explicativas_2023.pdf' },
  { cat: 'Balanços e auditoria', ano: 2022, nome: 'Demonstrações financeiras e notas explicativas', f: '1773320698823_Demonstra_es_Financeiras_e_Notas_Explicativas_2022.pdf' },
  { cat: 'Balanços e auditoria', ano: 2021, nome: 'Demonstrações financeiras e notas explicativas', f: '1773320699708_Demonstra_es_Financeiras_e_Notas_Explicativas_2021.pdf' },
  { cat: 'Balanços e auditoria', ano: 2020, nome: 'Balanço patrimonial', f: '1773320700786_Balan_o_Patrtimonial_2020.pdf' },
  { cat: 'Balanços e auditoria', ano: 2019, nome: 'Demonstrações financeiras e notas explicativas', f: '1773320701586_Demonstra_es_Financeiras_e_Notas_Explicativas_2019.pdf' },
  { cat: 'Balanços e auditoria', ano: 2018, nome: 'Demonstrações financeiras e notas explicativas', f: '1773320702779_Demonstra_es_Financeiras_e_Notas_Explicativas_2018.pdf' },
  { cat: 'Balanços e auditoria', ano: 2017, nome: 'Demonstrações financeiras e notas explicativas', f: '1773320703892_Demonstra_es_Financeiras_e_Notas_Explicativas_2017.pdf' },
  { cat: 'Balanços e auditoria', ano: 2016, nome: 'Demonstrações financeiras e notas explicativas', f: '1773320704736_Demonstra_es_Financeiras_e_Notas_Explicativas_2016.pdf' },
  { cat: 'Relatórios de atividades', ano: 2025, nome: 'Relatório anual de execução de atividades', f: '1773320676845_RELATO_RIO_2025.pdf' },
  { cat: 'Relatórios de atividades', ano: 2024, nome: 'Relatório anual de execução de atividades', f: '1773320679383_RELAT_RIO_2024.pdf' },
  { cat: 'Relatórios de atividades', ano: 2023, nome: 'Relatório anual de execução de atividades', f: '1773320681112_assinado_RELATORIO_DE_ATIVIDADES_2023.pdf' },
];

const DIRIGENTES = ['Brenda da Silva Alves', 'Anderson Ricardo Mariano', 'Marcus Vinicius Fernandes'];

// Contas bancárias (deduplicadas a partir das 38 linhas publicadas)
const CONTAS = {
  'Doações e recursos próprios': [
    ['Doações via PIX', 'Ag. 3507', 'C/C 577967573-9', 'Banco a confirmar'],
    ['Recebimentos', 'Ag. 6919-1', 'C/C 28.033-X', 'Banco a confirmar'],
    ['Pagamentos', 'Ag. 6919-1', 'C/C 34.969-0', 'Banco a confirmar'],
    ['Doações · pagamentos', 'Ag. 001', 'C/C 41.62174-2', 'Banco a confirmar'],
  ],
  'Lei Rouanet · Oficinas Culturais (Pronac 236853)': [
    ['Depósitos', 'Ag. 3015-5', 'C/C 46.122-9', 'Banco do Brasil'],
    ['Pagamentos', 'Ag. 3015-5', 'C/C 46.123-7', 'Banco do Brasil'],
  ],
};

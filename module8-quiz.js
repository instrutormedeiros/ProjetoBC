/* === module8-quiz.js === */
var questionBank = {
    'module8': [
        {
            id: 'm8-q1',
            question: 'Luvas, capacete e botas são exemplos de qual tipo de equipamento?',
            options: { a: 'EPC (Equipamento de Proteção Coletiva).', b: 'PPCI (Plano de Prevenção Contra Incêndio).', c: 'EPI (Equipamento de Proteção Individual).', d: 'CBMDF (Corpo de Bombeiros).' },
            answer: 'c',
            explanation: 'EPI é o Equipamento de Proteção Individual, destinado a proteger o brigadista.'
        },
        {
            id: 'm8-q2',
            question: 'O que significa a sigla PPCI?',
            options: { a: 'Plano de Primeiros Cuidados Imediatos.', b: 'Plano de Prevenção Contra Incêndio e Pânico.', c: 'Procedimento Padrão de Combate a Incêndio.', d: 'Proteção Particular Contra Incidentes.' },
            answer: 'b',
            explanation: 'PPCI significa Plano de Prevenção Contra Incêndio e Pânico.'
        },
        {
            id: 'm8-q3',
            question: 'Um alarme de incêndio e as portas corta-fogo são classificados como:',
            options: { a: 'EPC (Equipamento de Proteção Coletiva).', b: 'EPI (Equipamento de Proteção Individual).', c: 'Itens do PPCI.', d: 'Equipamentos de uso exclusivo do CBMDF.' },
            answer: 'a',
            explanation: 'EPC é o Equipamento de Proteção Coletiva, pois protege todas as pessoas no ambiente.'
        },
        {
            id: 'm8-q4',
            question: 'Quem é o profissional responsável pela elaboração do PPCI?',
            options: { a: 'O Chefe de Brigada.', b: 'O Supervisor da Brigada.', c: 'O Brigadista Particular.', d: 'Um membro do CBMDF.' },
            answer: 'b',
            explanation: 'O Supervisor da Brigada é o responsável técnico pela elaboração do PPCI.'
        },
        {
            id: 'm8-q5',
            question: 'Qual é a principal diferença entre EPI e EPC?',
            options: { a: 'EPI é caro, EPC é barato.', b: 'EPI protege o indivíduo, EPC protege o ambiente/grupo.', c: 'EPI é descartável, EPC é reutilizável.', d: 'EPI é elétrico, EPC é manual.' },
            answer: 'b',
            explanation: 'EPI (Individual) protege o usuário; EPC (Coletivo) protege todas as pessoas no local.'
        },
        {
            id: 'm8-q6',
            question: 'Uma máscara de proteção respiratória é um exemplo de:',
            options: { a: 'EPI.', b: 'EPC.', c: 'PPCI.', d: 'NR.' },
            answer: 'a',
            explanation: 'A máscara protege apenas o indivíduo que a está usando, sendo um EPI.'
        },
        {
            id: 'm8-q7',
            question: 'Extintores e sinalização de emergência são exemplos de:',
            options: { a: 'EPI.', b: 'EPC.', c: 'PPCI.', d: 'APH.' },
            answer: 'b',
            explanation: 'Extintores e sinalização são de Proteção Coletiva, pois servem a todos no ambiente.'
        },
        {
            id: 'm8-q8',
            question: 'O PPCI é um documento que deve conter, entre outras coisas:',
            options: { a: 'A escala de férias dos funcionários.', b: 'O cardápio do refeitório.', c: 'Análise de riscos e procedimentos de emergência.', d: 'O contato pessoal de cada funcionário.' },
            answer: 'c',
            explanation: 'O PPCI detalha a análise de riscos, procedimentos de abandono, simulados, etc.'
        },
        {
            id: 'm8-q9',
            question: 'Óculos de segurança são classificados como:',
            options: { a: 'EPI.', b: 'EPC.', c: 'Item de Lazer.', d: 'Item opcional.' },
            answer: 'a',
            explanation: 'Os óculos protegem os olhos do usuário, sendo um Equipamento de Proteção Individual.'
        },
        {
            id: 'm8-q10',
            question: 'Qual dos seguintes itens é um EPC?',
            options: { a: 'Luvas.', b: 'Capacete.', c: 'Portas corta-fogo.', d: 'Botas.' },
            answer: 'c',
            explanation: 'Portas corta-fogo protegem o ambiente e as rotas de fuga para todos, sendo um EPC.'
        },
        {
            id: 'm8-q11',
            question: 'O que o PPCI detalha?',
            options: { a: 'Apenas os nomes dos brigadistas.', b: 'Apenas os tipos de extintores.', c: 'Apenas os riscos de incêndio.', d: 'O conjunto de ações e recursos para emergências.' },
            answer: 'd',
            explanation: 'O PPCI é um plano completo que detalha ações, recursos, riscos e procedimentos.'
        },
        {
            id: 'm8-q12',
            question: 'O organograma da brigada deve estar contido em qual documento?',
            options: { a: 'No PPCI.', b: 'No manual do EPI.', c: 'Na NR-23.', d: 'No relatório de ocorrência.' },
            answer: 'a',
            explanation: 'O PPCI deve conter o organograma da brigada, detalhando a hierarquia.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
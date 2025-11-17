/* === module14-quiz.js === */
var questionBank = {
    'module14': [
        {
            id: 'm14-q1',
            question: 'Qual o termo para ocorrências onde o número de vítimas excede a capacidade de resposta do serviço de salvamento local?',
            options: { a: 'Catástrofe (Tragédia).', b: 'Calamidade.', c: 'Desastre.', d: 'IMV.' },
            answer: 'c',
            explanation: 'Desastre é a ocorrência onde o número de vítimas excede a capacidade de resposta do serviço de salvamento local.'
        },
        {
            id: 'm14-q2',
            question: 'A queda de estruturas com teto, devido a falhas estruturais ou acidentes naturais, é classificada como:',
            options: { a: 'Soterramento.', b: 'Desabamento.', c: 'Catástrofe.', d: 'Incidente de Múltiplas Vítimas.' },
            answer: 'b',
            explanation: 'Desabamento é a queda de estruturas com teto. Soterramento é a queda de terra/pedras.'
        },
        {
            id: 'm14-q3',
            question: 'Qual termo descreve uma série de desastres que lança um grande número de pessoas em situação de desamparo, onde até o poder público perde a capacidade de resposta?',
            options: { a: 'Desastre.', b: 'Catástrofe.', c: 'Emergência.', d: 'Calamidade.' },
            answer: 'd',
            explanation: 'Calamidade é o nível mais grave, onde o poder público perde a capacidade de resposta.'
        },
        {
            id: 'm14-q4',
            question: 'Qual o termo usado para um acontecimento funesto (fatal) de grande desgraça que atinge muitas pessoas?',
            options: { a: 'Soterramento.', b: 'Desastre.', c: 'Catástrofe (Tragédia).', d: 'Calamidade.' },
            answer: 'c',
            explanation: 'Catástrofe (ou Tragédia) é um acontecimento funesto de grande desgraça.'
        },
        {
            id: 'm14-q5',
            question: 'A queda de terra, pedras ou outras substâncias sobre pessoas ou edificações, geralmente devido a chuvas, é chamada de:',
            options: { a: 'Desabamento.', b: 'Catástrofe.', c: 'Soterramento.', d: 'IMV.' },
            answer: 'c',
            explanation: 'Soterramento é a queda de terra, pedras ou outras substâncias (não estruturas de teto).'
        },
        {
            id: 'm14-q6',
            question: 'Em uma operação de salvamento de grande escala, qual é o principal objetivo da equipe?',
            options: { a: 'Remover objetos de valor do local.', b: 'Garantir a segurança da equipe e das vítimas.', c: 'Agir o mais rápido possível sem planejamento.', d: 'Focar apenas na extinção do incêndio.' },
            answer: 'b',
            explanation: 'O principal objetivo de qualquer operação de salvamento é garantir a segurança da equipe e das vítimas.'
        },
        {
            id: 'm14-q7',
            question: 'Qual das ocorrências é causada pela queda de terra ou pedras?',
            options: { a: 'Desabamento.', b: 'Catástrofe.', c: 'Soterramento.', d: 'Desastre.' },
            answer: 'c',
            explanation: 'Soterramento é a queda de terra, pedras ou outras substâncias não estruturais.'
        },
        {
            id: 'm14-q8',
            question: 'Em uma ocorrência onde o número de vítimas é alto, mas os recursos conseguem atender, é classificado como IMV. Se os recursos NÃO conseguem atender, é um:',
            options: { a: 'Catástrofe.', b: 'Desastre.', c: 'Calamidade.', d: 'Soterramento.' },
            answer: 'b',
            explanation: 'Desastre é a ocorrência onde o número de vítimas excede a capacidade de resposta do serviço de salvamento local.'
        },
        {
            id: 'm14-q9',
            question: 'Qual é o termo mais amplo para um acontecimento funesto de grande desgraça?',
            options: { a: 'Emergência.', b: 'Desastre.', c: 'Tragédia (Catástrofe).', d: 'Soterramento.' },
            answer: 'c',
            explanation: 'Catástrofe ou Tragédia é o termo que define o grande acontecimento funesto.'
        },
        {
            id: 'm14-q10',
            question: 'Qual é o evento causado por falhas estruturais na edificação?',
            options: { a: 'Soterramento.', b: 'Desabamento.', c: 'Calamidade.', d: 'Desastre.' },
            answer: 'b',
            explanation: 'Desabamento é a queda de estruturas com teto, geralmente devido a falhas estruturais.'
        },
        {
            id: 'm14-q11',
            question: 'Qual tipo de ocorrência exige a máxima mobilização de recursos, incluindo ajuda externa?',
            options: { a: 'Desastre.', b: 'Catástrofe.', c: 'Calamidade.', d: 'Soterramento.' },
            answer: 'c',
            explanation: 'A Calamidade é o evento de maior escala e desamparo, exigindo a máxima ajuda e recursos.'
        },
        {
            id: 'm14-q12',
            question: 'Em um resgate de vítimas de desabamento, a comunicação deve ser:',
            options: { a: 'Apenas verbal.', b: 'Objetiva, padronizada e constante.', c: 'Limitada ao chefe de brigada.', d: 'Feita por gestos apenas.' },
            answer: 'b',
            explanation: 'A comunicação eficaz é essencial para coordenar ações e evitar falhas durante a operação.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
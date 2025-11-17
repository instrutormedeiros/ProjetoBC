/* === module25-quiz.js === */
var questionBank = {
    'module25': [
        {
            id: 'm25-q1',
            question: 'A recarga anual de um extintor corresponde a qual nível de manutenção?',
            options: { a: 'Nível 1.', b: 'Nível 2.', c: 'Nível 3.', d: 'Nível 4.' },
            answer: 'b',
            explanation: 'Nível 2 é a manutenção e recarga anual, feita por empresa credenciada.'
        },
        {
            id: 'm25-q2',
            question: 'Qual equipamento de combate a incêndio geralmente contém dois lances de mangueira e uma chave Storz?',
            options: { a: 'Sistema de Hidrantes.', b: 'Extintor de Gás Carbônico.', c: 'Sprinklers.', d: 'Alarme de Incêndio.' },
            answer: 'a',
            explanation: 'O abrigo do Sistema de Hidrantes contém os lances de mangueira, esguicho e a chave Storz (chave de mangueira).'
        },
        {
            id: 'm25-q3',
            question: 'O teste hidrostático do cilindro de um extintor deve ser feito a cada:',
            options: { a: '1 ano.', b: '3 anos.', c: '5 anos.', d: '10 anos.' },
            answer: 'c',
            explanation: 'Nível 3 é o Teste Hidrostático, realizado a cada 5 anos para verificar a integridade do cilindro.'
        },
        {
            id: 'm25-q4',
            question: 'A mangueira de hidrante recomendada para uso industrial, mais resistente à abrasão, é a do:',
            options: { a: 'Tipo 3.', b: 'Tipo 4.', c: 'Tipo 1.', d: 'Tipo 2.' },
            answer: 'd',
            explanation: 'Mangueira Tipo 1 é para uso residencial/predial. Tipo 2 é para uso industrial/comercial, sendo mais resistente.'
        },
        {
            id: 'm25-q5',
            question: 'O que é a manutenção Nível 1 de um extintor?',
            options: { a: 'Recarga anual.', b: 'Teste hidrostático.', c: 'Inspeção visual periódica (pela brigada).', d: 'Descarte do equipamento.' },
            answer: 'c',
            explanation: 'Nível 1 é a inspeção visual (checagem de lacre, manômetro, aparência) que pode ser feita pela própria brigada.'
        },
        {
            id: 'm25-q6',
            question: 'Qual extintor é indicado para Classe A (madeira, papel)?',
            options: { a: 'Água (AP).', b: 'Gás Carbônico (CO2).', c: 'Pó Químico Seco (PQS) - BC.', d: 'Todos os anteriores.' },
            answer: 'a',
            explanation: 'O extintor de Água (AP) é o principal agente para incêndios Classe A, pois age por resfriamento.'
        },
        {
            id: 'm25-q7',
            question: 'A mangueira Tipo 1 é destinada a qual uso?',
            options: { a: 'Industrial e naval.', b: 'Uso residencial/predial leve.', c: 'Apenas para o Corpo de Bombeiros.', d: 'Apenas para espuma.' },
            answer: 'b',
            explanation: 'A Mangueira Tipo 1 é para edificações residenciais, com menor resistência à abrasão.'
        },
        {
            id: 'm25-q8',
            question: 'Qual das seguintes é uma atribuição da brigada?',
            options: { a: 'Conhecer os riscos do local.', b: 'Combater princípios de incêndio.', c: 'Promover a evacuação segura.', d: 'Todas as anteriores.' },
            answer: 'd',
            explanation: 'A brigada deve conhecer os riscos, combater o início do fogo e auxiliar na evacuação.'
        },
        {
            id: 'm25-q9',
            question: 'Quantos anos dura o teste hidrostático (Nível 3) de um extintor?',
            options: { a: '1 ano.', b: '3 anos.', c: '5 anos.', d: 'Depende do agente.' },
            answer: 'c',
            explanation: 'O teste de integridade do cilindro (hidrostático) é realizado a cada 5 anos.'
        },
        {
            id: 'm25-q10',
            question: 'Qual extintor NÃO deve ser usado em Classe A (madeira)?',
            options: { a: 'Água (AP).', b: 'Gás Carbônico (CO2).', c: 'Pó Químico Seco (PQS) - ABC.', d: 'Espuma Mecânica.' },
            answer: 'b',
            explanation: 'O CO2 age por abafamento e não é eficaz em materiais Classe A, que queimam em profundidade e deixam brasas.'
        },
        {
            id: 'm25-q11',
            question: 'Quem deve realizar a manutenção Nível 2 (recarga anual)?',
            options: { a: 'A própria brigada.', b: 'Uma empresa credenciada.', c: 'O síndico do prédio.', d: 'Qualquer funcionário.' },
            answer: 'b',
            explanation: 'As manutenções de Nível 2 e 3 devem ser feitas por empresas credenciadas.'
        },
        {
            id: 'm25-q12',
            question: 'Quantos metros geralmente têm os lances de mangueira em um hidrante predial?',
            options: { a: '5m.', b: '10m.', c: '15m.', d: '30m.' },
            answer: 'c',
            explanation: 'O padrão para abrigos de hidrante é conter 2 lances de mangueira de 15 metros cada.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
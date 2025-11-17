/* === module20-quiz.js === */
var questionBank = {
    'module20': [
        {
            id: 'm20-q1',
            question: 'Usar água para apagar um fogo em madeira é um exemplo de qual método de extinção?',
            options: { a: 'Abafamento.', b: 'Resfriamento.', c: 'Isolamento.', d: 'Quebra da Reação em Cadeia.' },
            answer: 'b',
            explanation: 'A água é um agente de Resfriamento, pois remove o Calor.'
        },
        {
            id: 'm20-q2',
            question: 'Um incêndio em um computador ligado na tomada pertence a qual classe?',
            options: { a: 'Classe A.', b: 'Classe B.', c: 'Classe C.', d: 'Classe K.' },
            answer: 'c',
            explanation: 'Classe C é para equipamentos elétricos energizados (ligados na tomada).'
        },
        {
            id: 'm20-q3',
            question: 'Incêndios em papel, madeira e tecido são classificados como:',
            options: { a: 'Classe A.', b: 'Classe B.', c: 'Classe C.', d: 'Classe D.' },
            answer: 'a',
            explanation: 'Classe A é para sólidos combustíveis que deixam resíduos (cinzas, brasas).'
        },
        {
            id: 'm20-q4',
            question: 'Retirar uma cadeira de madeira de perto de uma cortina em chamas é um método de extinção por:',
            options: { a: 'Resfriamento.', b: 'Abafamento.', c: 'Quebra da reação em cadeia.', d: 'Isolamento.' },
            answer: 'd',
            explanation: 'Isolamento é o método de remover o Combustível (a cadeira) da área do fogo.'
        },
        {
            id: 'm20-q5',
            question: 'Incêndios em líquidos inflamáveis (gasolina, álcool) pertencem a qual classe?',
            options: { a: 'Classe A.', b: 'Classe B.', c: 'Classe C.', d: 'Classe D.' },
            answer: 'b',
            explanation: 'Classe B é para líquidos inflamáveis e gases combustíveis.'
        },
        {
            id: 'm20-q6',
            question: 'Usar um extintor de CO2 em um incêndio Classe B é um método de:',
            options: { a: 'Resfriamento.', b: 'Abafamento.', c: 'Isolamento.', d: 'Todos os anteriores.' },
            answer: 'b',
            explanation: 'O CO2 (Gás Carbônico) age por abafamento, removendo o Comburente (oxigênio).'
        },
        {
            id: 'm20-q7',
            question: 'Incêndios em metais pirofóricos (magnésio, sódio) são de qual classe?',
            options: { a: 'Classe A.', b: 'Classe B.', c: 'Classe C.', d: 'Classe D.' },
            answer: 'd',
            explanation: 'Classe D é específica para metais combustíveis, que exigem agentes extintores especiais.'
        },
        {
            id: 'm20-q8',
            question: 'Qual é o método de extinção para incêndios Classe A (madeira, papel)?',
            options: { a: 'Principalmente Resfriamento.', b: 'Principalmente Abafamento.', c: 'Principalmente Isolamento.', d: 'Apenas agentes químicos.' },
            answer: 'a',
            explanation: 'O método principal para Classe A é o Resfriamento, geralmente com água.'
        },
        {
            id: 'm20-q9',
            question: 'Um incêndio em uma fritadeira elétrica em uma cozinha industrial é de qual classe?',
            options: { a: 'Classe A.', b: 'Classe B.', c: 'Classe C.', d: 'Classe K.' },
            answer: 'd',
            explanation: 'Classe K é específica para óleos e gorduras de cozinha.'
        },
        {
            id: 'm20-q10',
            question: 'Remover o oxigênio do Tetraedro do Fogo é o método de:',
            options: { a: 'Resfriamento.', b: 'Abafamento.', c: 'Isolamento.', d: 'Quebra da Reação.' },
            answer: 'b',
            explanation: 'Abafamento é o método que remove ou isola o Comburente (oxigênio).'
        },
        {
            id: 'm20-q11',
            question: 'Remover o calor do Tetraedro do Fogo é o método de:',
            options: { a: 'Resfriamento.', b: 'Abafamento.', c: 'Isolamento.', d: 'Quebra da Reação.' },
            answer: 'a',
            explanation: 'Resfriamento é o método que remove o Calor.'
        },
        {
            id: 'm20-q12',
            question: 'Por que não se deve usar água em incêndios de Classe C?',
            options: { a: 'Porque a água evapora.', b: 'Porque a água é um agente de abafamento.', c: 'Porque a água conduz eletricidade e causa risco de choque.', d: 'Porque a água aumenta as chamas.' },
            answer: 'c',
            explanation: 'A água é condutora de eletricidade, por isso nunca deve ser usada em equipamentos energizados (Classe C).'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
/* === module17-quiz.js === */
var questionBank = {
    'module17': [
        {
            id: 'm17-q1',
            question: 'Quais são os quatro elementos do Tetraedro do Fogo?',
            options: { a: 'Calor, Combustível, Comburente e Reação em Cadeia.', b: 'Fogo, Água, Ar e Terra.', c: 'Combustível, Calor, Fumaça e Gás.', d: 'Sólido, Líquido, Gasoso e Plasma.' },
            answer: 'a',
            explanation: 'São os 4 elementos essenciais: Calor, Combustível, Comburente (Oxigênio) e Reação em Cadeia.'
        },
        {
            id: 'm17-q2',
            question: 'Uma fumaça de cor negra/cinza escura indica a queima de qual tipo de material?',
            options: { a: 'Madeira e papel.', b: 'Tecidos de algodão.', c: 'Derivados de petróleo, como plásticos.', d: 'Metais pirofóricos.' },
            answer: 'c',
            explanation: 'Fumaça escura (negra/cinza escura) indica queima de derivados de petróleo (plásticos, pneus, etc.).'
        },
        {
            id: 'm17-q3',
            question: 'O oxigênio do ar atua como qual elemento do Tetraedro do Fogo?',
            options: { a: 'Combustível.', b: 'Comburente.', c: 'Calor.', d: 'Reação em Cadeia.' },
            answer: 'b',
            explanation: 'O Comburente é o agente oxidante que reage com o combustível. O mais comum é o Oxigênio.'
        },
        {
            id: 'm17-q4',
            question: 'A queima de produtos químicos que liberam gases tóxicos geralmente produz fumaça de cor:',
            options: { a: 'Amarela/Vermelha.', b: 'Branca/Cinza Clara.', c: 'Negra/Cinza Escura.', d: 'Azul.' },
            answer: 'a',
            explanation: 'Fumaça colorida (amarela, vermelha, etc.) indica a queima de produtos químicos específicos.'
        },
        {
            id: 'm17-q5',
            question: 'O que é "Combustível"?',
            options: { a: 'O oxigênio.', b: 'A faísca que inicia o fogo.', c: 'O material que queima.', d: 'O processo autossustentável.' },
            answer: 'c',
            explanation: 'Combustível é qualquer material que pode queimar (madeira, papel, gasolina, gás).'
        },
        {
            id: 'm17-q6',
            question: 'O que é "Carga de Incêndio"?',
            options: { a: 'O peso do extintor.', b: 'A quantidade total de combustível em um ambiente.', c: 'A temperatura do fogo.', d: 'O tempo que o fogo leva para se apagar.' },
            answer: 'b',
            explanation: 'Carga de Incêndio é a soma de todo o material combustível que pode queimar em um local.'
        },
        {
            id: 'm17-q7',
            question: 'Uma fumaça branca/cinza clara indica a queima de:',
            options: { a: 'Plásticos e pneus.', b: 'Madeira, papel e tecidos.', c: 'Produtos químicos tóxicos.', d: 'Metais combustíveis.' },
            answer: 'b',
            explanation: 'Fumaça clara geralmente indica a queima de materiais comuns, como madeira, papel e tecidos.'
        },
        {
            id: 'm17-q8',
            question: 'O que é a "Reação em Cadeia"?',
            options: { a: 'O oxigênio no ar.', b: 'O material que queima.', c: 'A faísca inicial.', d: 'O processo autossustentável que alimenta o ciclo de combustão.' },
            answer: 'd',
            explanation: 'É o 4º elemento do tetraedro, o processo que permite que o fogo continue queimando.'
        },
        {
            id: 'm17-q9',
            question: 'O que é "Calor" no Tetraedro do Fogo?',
            options: { a: 'A energia que inicia a reação.', b: 'O material que queima.', c: 'O oxigênio.', d: 'A fumaça.' },
            answer: 'a',
            explanation: 'Calor é a energia de ativação, como uma faísca ou chama, que dá início à combustão.'
        },
        {
            id: 'm17-q10',
            question: 'Uma combustão incompleta ocorre quando há:',
            options: { a: 'Excesso de oxigênio ( >16%).', b: 'Pouco oxigênio ( <16%).', c: 'Excesso de combustível.', d: 'Muita fumaça.' },
            answer: 'b',
            explanation: 'A combustão incompleta ocorre com pouco oxigênio (abaixo de 16%).'
        },
        {
            id: 'm17-q11',
            question: 'Qual é o comburente mais comum na Terra?',
            options: { a: 'Hidrogênio.', b: 'Gás Carbônico.', c: 'Oxigênio.', d: 'Nitrogênio.' },
            answer: 'c',
            explanation: 'O oxigênio presente no ar é o comburente mais comum para o fogo.'
        },
        {
            id: 'm17-q12',
            question: 'Madeira, papel e gasolina são exemplos de qual elemento?',
            options: { a: 'Calor.', b: 'Comburente.', c: 'Reação em Cadeia.', d: 'Combustível.' },
            answer: 'd',
            explanation: 'Estes são materiais que queimam, portanto, são classificados como Combustível.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
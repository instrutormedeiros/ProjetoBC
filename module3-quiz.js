/* === module3-quiz.js === */
var questionBank = {
    'module3': [
        {
            id: 'm3-q1',
            question: 'Achar que toda pessoa com cabelo colorido é "rebelde" é um exemplo de qual forma de julgamento?',
            options: { a: 'Projeção.', b: 'Efeito de Contraste.', c: 'Estereótipo.', d: 'Feedback.' },
            answer: 'c',
            explanation: 'Estereótipo é julgar alguém com base em ideias generalizadas sobre um grupo.'
        },
        {
            id: 'm3-q2',
            question: 'Se você julga um novo colega de trabalho comparando-o com o desempenho excelente do colega anterior, você está sob qual influência?',
            options: { a: 'Projeção.', b: 'Efeito de Contraste.', c: 'Estereótipo.', d: 'Rumor.' },
            answer: 'b',
            explanation: 'O Efeito de Contraste ocorre quando julgamos alguém comparando-o com outra pessoa ou situação recente.'
        },
        {
            id: 'm3-q3',
            question: 'Um funcionário que é desonesto pode começar a desconfiar de todos os seus colegas, achando que eles também são desonestos. Isso é um exemplo de:',
            options: { a: 'Projeção.', b: 'Estereótipo.', c: 'Efeito de Contraste.', d: 'Comunicação Ascendente.' },
            answer: 'a',
            explanation: 'Projeção é quando atribuímos nossas próprias características (neste caso, a desonestidade) aos outros.'
        },
        {
            id: 'm3-q4',
            question: 'Entrevistar um candidato mediano logo após um candidato muito ruim pode fazer com que o mediano pareça melhor do que realmente é. Este fenômeno é o:',
            options: { a: 'Estereótipo.', b: 'Efeito de Contraste.', c: 'Projeção.', d: 'Liderança Carismática.' },
            answer: 'b',
            explanation: 'Este é um exemplo clássico de Efeito de Contraste, onde a comparação imediata distorce a percepção.'
        },
        {
            id: 'm3-q5',
            question: 'O que é "Projeção" no contexto da percepção social?',
            options: { a: 'Julgar alguém baseado em um rótulo de grupo.', b: 'Comparar uma pessoa com outra que vimos recentemente.', c: 'Atribuir nossos próprios sentimentos ou características a outras pessoas.', d: 'Planejar o futuro de uma equipe.' },
            answer: 'c',
            explanation: 'Projeção é "projetar" nossas experiências internas nos outros, como se fossem um espelho.'
        },
        {
            id: 'm3-q6',
            question: 'Achar que uma pessoa de óculos é automaticamente "nerd" é um exemplo de:',
            options: { a: 'Projeção.', b: 'Efeito de Contraste.', c: 'Estereótipo.', d: 'Bom julgamento.' },
            answer: 'c',
            explanation: 'Isso é um Estereótipo, um "rótulo" generalizado baseado na aparência.'
        },
        {
            id: 'm3-q7',
            question: 'Qual dos três tipos de julgamento envolve uma comparação com algo visto recentemente?',
            options: { a: 'Projeção.', b: 'Estereótipo.', c: 'Efeito de Contraste.', d: 'Todos os três.' },
            answer: 'c',
            explanation: 'O Efeito de Contraste é o único que depende de uma comparação recente para distorcer o julgamento.'
        },
        {
            id: 'm3-q8',
            question: 'Se você está se sentindo nervoso e acha que todos ao seu redor também estão nervosos, você está demonstrando:',
            options: { a: 'Projeção.', b: 'Estereótipo.', c: 'Efeito de Contraste.', d: 'Empatia.' },
            answer: 'a',
            explanation: 'Este é o exemplo de Projeção dado no módulo; atribuir seu nervosismo aos outros.'
        },
        {
            id: 'm3-q9',
            question: 'O ato de colocar um "rótulo" em alguém sem conhecê-lo de verdade, baseado em seu grupo, é chamado de:',
            options: { a: 'Projeção.', b: 'Efeito de Contraste.', c: 'Estereótipo.', d: 'Comunicação.' },
            answer: 'c',
            explanation: 'Estereótipo é essencialmente "rotular" pessoas com base em generalizações.'
        },
        {
            id: 'm3-q10',
            question: 'Em um concurso de talentos, um cantor mediano que se apresenta após um cantor péssimo parece incrível. Este é o Efeito de...',
            options: { a: 'Projeção.', b: 'Estereótipo.', c: 'Contraste.', d: 'Liderança.' },
            answer: 'c',
            explanation: 'A performance ruim anterior serve como ponto de contraste, melhorando a percepção da performance mediana.'
        },
        {
            id: 'm3-q11',
            question: 'Qual forma de julgamento é como usar um "espelho" para avaliar os outros?',
            options: { a: 'Projeção.', b: 'Estereótipo.', c: 'Efeito de Contraste.', d: 'Feedback.' },
            answer: 'a',
            explanation: 'A projeção é descrita como usar um espelho, pois reflete nossas próprias características nos outros.'
        },
        {
            id: 'm3-q12',
            question: 'Julgar alguém baseado em ideias pré-concebidas sobre sua idade ou estilo é um exemplo de:',
            options: { a: 'Projeção.', b: 'Estereótipo.', c: 'Efeito de Contraste.', d: 'Decisão Democrática.' },
            answer: 'b',
            explanation: 'Estereótipo é o julgamento baseado em generalizações sobre um grupo (idade, estilo, etc.).'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);

}

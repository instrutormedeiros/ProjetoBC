/* === module15-quiz.js === */
var questionBank = {
    'module15': [
        {
            id: 'm15-q1',
            question: 'Durante uma evacuação sem visibilidade, qual é a orientação correta?',
            options: { a: 'Correr para sair mais rápido.', b: 'Fazer com que todos se abaixem.', c: 'Subir para o telhado.', d: 'Abrir todas as janelas.' },
            answer: 'b',
            explanation: 'Se não houver visibilidade (ex: fumaça), todos devem se abaixar para respirar ar mais limpo.'
        },
        {
            id: 'm15-q2',
            question: 'Qual profissional deve ser o último na coluna de evacuação, conhecido como "cerra fila"?',
            options: { a: 'Um brigadista ou pessoa de confiança.', b: 'A vítima mais ferida.', c: 'Qualquer pessoa que estiver por último.', d: 'O "xerife" da fila.' },
            answer: 'a',
            explanation: 'O "cerra fila" é o brigadista que vai no final, garantindo que ninguém ficou para trás.'
        },
        {
            id: 'm15-q3',
            question: 'Ao passar por portas durante uma evacuação de incêndio, o que deve ser feito?',
            options: { a: 'Deixá-las abertas para facilitar a saída.', b: 'Trancá-las para isolar o fogo.', c: 'Fechá-las sem trancar.', d: 'Retirar as portas.' },
            answer: 'c',
            explanation: 'As portas devem ser fechadas (para conter o fogo/fumaça) mas nunca trancadas (para permitir o acesso dos bombeiros).'
        },
        {
            id: 'm15-q4',
            question: 'O brigadista que lidera a coluna de evacuação é chamado de:',
            options: { a: '"Xerife".', b: '"Cerra fila".', c: '"Guia".', d: '"Líder".' },
            answer: 'a',
            explanation: 'O brigadista da frente é o "xerife" (guia) e o de trás é o "cerra fila" (varredor).'
        },
        {
            id: 'm15-q5',
            question: 'Qual a orientação correta sobre o uso das escadas em um incêndio?',
            options: { a: 'Usar o elevador, que é mais rápido.', b: 'Descer sempre pelas escadas de emergência, nunca subir.', c: 'Subir para o telhado e aguardar o resgate aéreo.', d: 'Usar a escada rolante se a de emergência estiver cheia.' },
            answer: 'b',
            explanation: 'A regra é descer pelas escadas de emergência. Só se sobe com orientação direta do CBM.'
        },
        {
            id: 'm15-q6',
            question: 'Como se deve respirar em um ambiente com fumaça?',
            options: { a: 'De forma funda e lenta.', b: 'Prender a respiração o máximo possível.', c: 'De forma curta e rápida.', d: 'Normalmente, a fumaça não é tóxica.' },
            answer: 'c',
            explanation: 'A orientação é respirar de forma curta e rápida para minimizar a inalação de fumaça.'
        },
        {
            id: 'm15-q7',
            question: 'Como podemos improvisar EPIs durante uma evacuação?',
            options: { a: 'Usando sacos plásticos na cabeça.', b: 'Com cobertores, toalhas ou panos molhados.', c: 'Não se deve improvisar, é melhor ir sem nada.', d: 'Usando roupas de lã.' },
            answer: 'b',
            explanation: 'Panos molhados podem ajudar a filtrar a fumaça e proteger contra o calor.'
        },
        {
            id: 'm15-q8',
            question: 'Qual das seguintes é uma forma de "Locomoção" (movimentação do socorrista)?',
            options: { a: 'Cadeirinha.', b: 'Mochila.', c: 'Rastejo.', d: 'Transporte de Noiva.' },
            answer: 'c',
            explanation: 'Locomoção (como o socorrista se move): Em pé, 3 Pontas e Rastejo.'
        },
        {
            id: 'm15-q9',
            question: 'Qual das seguintes é uma forma de "Transporte de Vítimas"?',
            options: { a: 'Em pé.', b: '3 Pontas.', c: 'Cadeirinha.', d: 'Rastejo.' },
            answer: 'c',
            explanation: 'Transporte (como mover a vítima): Cadeirinha, Mochila, Arrasto, etc.'
        },
        {
            id: 'm15-q10',
            question: 'O que o "Xerife" faz na coluna de evacuação?',
            options: { a: 'Vai no final, checando as salas.', b: 'Vai no meio, acalmando as pessoas.', c: 'Vai na frente, guiando o caminho.', d: 'Fica no ponto de encontro.' },
            answer: 'c',
            explanation: 'O "xerife" é o brigadista que vai na frente, liderando a coluna.'
        },
        {
            id: 'm15-q11',
            question: 'O que o "Cerra fila" faz na coluna de evacuação?',
            options: { a: 'Vai na frente, abrindo portas.', b: 'Vai no final, garantindo que ninguém ficou para trás.', c: 'Vai no meio, contando as pessoas.', d: 'Leva os extintores.' },
            answer: 'b',
            explanation: 'O "cerra fila" é o último, garantindo que a evacuação daquele setor foi completa.'
        },
        {
            id: 'm15-q12',
            question: 'Ao evacuar, o que deve ser feito com as portas?',
            options: { a: 'Deixá-las abertas.', b: 'Fechá-las e trancá-las.', c: 'Fechá-las sem trancar.', d: 'Arrombá-las.' },
            answer: 'c',
            explanation: 'Fechá-las (para barrar fumaça) sem trancar (para permitir acesso do CBMDF).'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
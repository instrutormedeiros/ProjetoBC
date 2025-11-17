/* === module4-quiz.js === */
var questionBank = {
    'module4': [
        {
            id: 'm4-q1',
            question: 'Qual tipo de líder inspira a equipe a abraçar uma visão, fazendo-a se sentir parte de algo maior?',
            options: { a: 'Autoritário.', b: 'Transformacional.', c: 'Laissez-Faire.', d: 'Carismático.' },
            answer: 'b',
            explanation: 'A Liderança Transformacional foca na visão e no crescimento da equipe para "transformar" o grupo.'
        },
        {
            id: 'm4-q2',
            question: 'Em uma tomada de decisão onde o líder ouve a opinião de todos, mas ele mesmo dá a palavra final, o modelo é:',
            options: { a: 'Consultivo.', b: 'Democrático.', c: 'Consenso.', d: 'Autoritário.' },
            answer: 'a',
            explanation: 'No modelo Consultivo, o líder "consulta" a equipe, mas a decisão final ainda é dele.'
        },
        {
            id: 'm4-q3',
            question: 'Uma equipe precisa decidir o local da confraternização de fim de ano e todos devem concordar com a escolha. Que tipo de tomada de decisão é essa?',
            options: { a: 'Democrática.', b: 'Consultiva.', c: 'Consenso.', d: 'Autoritária.' },
            answer: 'c',
            explanation: 'Consenso é quando todos os membros concordam com a mesma decisão, buscando 100% de aceitação.'
        },
        {
            id: 'm4-q4',
            question: 'Um líder que delega quase todas as decisões para a equipe, oferecendo liberdade total, se enquadra no tipo:',
            options: { a: 'Carismático.', b: 'Transformacional.', c: 'Autoritário.', d: 'Laissez-Faire.' },
            answer: 'd',
            explanation: 'Laissez-Faire (deixar fazer) é o estilo de liderança que dá total autonomia à equipe.'
        },
        {
            id: 'm4-q5',
            question: 'Qual é a principal diferença entre um Chefe e um Líder?',
            options: { a: 'O Chefe é mais velho, o Líder é mais novo.', b: 'O Chefe manda e controla; o Líder inspira e guia.', c: 'O Chefe é carismático; o Líder é autoritário.', d: 'Não há diferença, são a mesma coisa.' },
            answer: 'b',
            explanation: 'Um chefe foca no controle e "manda", enquanto um líder "inspira, motiva e guia".'
        },
        {
            id: 'm4-q6',
            question: 'Um líder com uma personalidade magnética, que atrai seguidores por sua influência pessoal, é chamado de:',
            options: { a: 'Autoritário.', b: 'Laissez-Faire.', c: 'Transformacional.', d: 'Carismático.' },
            answer: 'd',
            explanation: 'A Liderança Carismática é centrada na personalidade magnética do líder.'
        },
        {
            id: 'm4-q7',
            question: 'Quando um líder toma todas as decisões sozinho, sem consultar ninguém, ele está sendo:',
            options: { a: 'Democrático.', b: 'Autoritário.', c: 'Laissez-Faire.', d: 'Consultivo.' },
            answer: 'b',
            explanation: 'O líder Autoritário centraliza todas as decisões nele mesmo.'
        },
        {
            id: 'm4-q8',
            question: 'Qual tipo de tomada de decisão é baseada na votação da maioria?',
            options: { a: 'Consenso.', b: 'Consultiva.', c: 'Autoritária.', d: 'Democrática.' },
            answer: 'd',
            explanation: 'A decisão Democrática é aquela tomada por votação (a maioria vence).'
        },
        {
            id: 'm4-q9',
            question: 'Em qual tipo de Liderança o LÍDER é o centro das atenções, e não a ideia?',
            options: { a: 'Transformacional.', b: 'Carismática.', c: 'Laissez-Faire.', d: 'Autoritária.' },
            answer: 'b',
            explanation: 'Na Liderança Carismática, as pessoas seguem o líder por causa de sua forte influência pessoal.'
        },
        {
            id: 'm4-q10',
            question: 'Na liderança Transformacional, o foco principal é:',
            options: { a: 'A personalidade do líder.', b: 'A visão e o crescimento da equipe.', c: 'Dar total autonomia.', d: 'Tomar decisões sozinho.' },
            answer: 'b',
            explanation: 'A Liderança Transformacional inspira as pessoas a abraçar uma visão e crescer com ela.'
        },
        {
            id: 'm4-q11',
            question: 'Um chefe que "manda" e foca apenas na execução de tarefas é o oposto de um líder que:',
            options: { a: 'Também manda, mas é mais educado.', b: 'Paga mais.', c: 'Inspira, motiva e guia a equipe.', d: 'Dá folgas.' },
            answer: 'c',
            explanation: 'A diferença principal é "mandar" versus "inspirar e guiar".'
        },
        {
            id: 'm4-q12',
            question: 'No modelo "Consenso", o que acontece se um membro não concordar?',
            options: { a: 'A maioria vence.', b: 'O líder decide.', c: 'A decisão não é tomada até que todos concordem.', d: 'O membro é expulso da equipe.' },
            answer: 'c',
            explanation: 'Consenso exige que 100% do grupo concorde com a decisão.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
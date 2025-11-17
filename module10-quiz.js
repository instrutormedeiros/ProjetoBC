/* === module10-quiz.js === */
var questionBank = {
    'module10': [
        {
            id: 'm10-q1',
            question: 'O uniforme de um Brigadista Particular pode ser usado para deslocamentos em vias públicas?',
            options: { a: 'Sim, desde que esteja com o crachá.', b: 'Não, o uso é exclusivo no local de serviço.', c: 'Sim, apenas em emergências.', d: 'Apenas se o CBMDF autorizar.' },
            answer: 'b',
            explanation: 'O uso do uniforme é obrigatório e exclusivo para o local de serviço.'
        },
        {
            id: 'm10-q2',
            question: 'Um Brigadista Particular que falta a 3 convocações para avaliação ou é reprovado 3 vezes consecutivas, sofrerá qual penalidade?',
            options: { a: 'Advertência.', b: 'Multa.', c: 'Suspensão.', d: 'Descredenciamento.' },
            answer: 'd',
            explanation: 'Faltar 3 vezes ou reprovar 3 vezes consecutivas resulta em descredenciamento.'
        },
        {
            id: 'm10-q3',
            question: 'Qual a forma de identificação de um Brigadista Voluntário?',
            options: { a: 'Crachá ou colete opcional.', b: 'Uniforme completo obrigatório.', c: 'Apenas crachá com validade de 6 meses.', d: 'Não precisa de identificação.' },
            answer: 'a',
            explanation: 'O uso de uniforme é dispensado, podendo usar crachá ou um colete opcional.'
        },
        {
            id: 'm10-q4',
            question: 'A falta a 2 convocações para avaliação, sem justificativa, resulta em qual penalidade para o Brigadista Particular?',
            options: { a: 'Descredenciamento.', b: 'Advertência.', c: 'Suspensão.', d: 'Reprovação automática.' },
            answer: 'c',
            explanation: 'Faltar a 2 convocações sem justificativa pode levar à suspensão.'
        },
        {
            id: 'm10-q5',
            question: 'O uniforme do Brigadista Particular pode ser similar ao do CBMDF?',
            options: { a: 'Sim, para impor respeito.', b: 'Não, em hipótese alguma.', c: 'Sim, desde que tenha a palavra "Brigadista".', d: 'Sim, se o CBMDF autorizar.' },
            answer: 'b',
            explanation: 'O uniforme não pode ser parecido com os do CBMDF ou de outras forças militares.'
        },
        {
            id: 'm10-q6',
            question: 'Qual a validade do crachá de identificação do Brigadista Particular?',
            options: { a: '1 ano.', b: '2 anos.', c: '6 meses.', d: 'Tempo indeterminado.' },
            answer: 'c',
            explanation: 'O crachá deve conter foto e ter validade de 6 meses.'
        },
        {
            id: 'm10-q7',
            question: 'Um Brigadista Particular reprovado na avaliação tem quantos dias para agendar uma nova?',
            options: { a: '10 dias.', b: '30 dias.', c: '60 dias.', d: '90 dias.' },
            answer: 'b',
            explanation: 'O brigadista reprovado tem 30 dias para agendar uma nova avaliação.'
        },
        {
            id: 'm10-q8',
            question: 'O uniforme do Brigadista Particular deve conter qual inscrição nas costas?',
            options: { a: 'SEGURANÇA.', b: 'BRIGADISTA.', c: 'BOMBEIRO.', d: 'SOCORRISTA.' },
            answer: 'b',
            explanation: 'Deve conter a descrição "Brigadista" nas costas.'
        },
        {
            id: 'm10-q9',
            question: 'O uso de colete é obrigatório para o Brigadista Voluntário?',
            options: { a: 'Sim, é obrigatório.', b: 'Não, é opcional.', c: 'Sim, apenas em emergências.', d: 'Não, é proibido.' },
            answer: 'b',
            explanation: 'A identificação do Voluntário pode ser feita por crachá ou, opcionalmente, por um colete.'
        },
        {
            id: 'm10-q10',
            question: 'Quem aprova o uniforme do Brigadista Particular?',
            options: { a: 'O Supervisor de Brigada.', b: 'A empresa contratante.', c: 'O CBMDF (Corpo de Bombeiros).', d: 'A ABNT.' },
            answer: 'c',
            explanation: 'O uniforme deve ser aprovado previamente pelo CBMDF.'
        },
        {
            id: 'm10-q11',
            question: 'Qual é o critério para o CBMDF avaliar os brigadistas particulares?',
            options: { a: 'Apenas uma vez por ano.', b: 'Apenas se houver um incêndio.', c: 'A qualquer momento.', d: 'Apenas na contratação.' },
            answer: 'c',
            explanation: 'O CBMDF pode avaliar os brigadistas particulares a qualquer momento.'
        },
        {
            id: 'm10-q12',
            question: 'A avaliação do Brigadista Particular pode ser de quais tipos?',
            options: { a: 'Apenas teórica.', b: 'Apenas prática.', c: 'Teórica e/ou prática.', d: 'Apenas física.' },
            answer: 'c',
            explanation: 'A avaliação pode ser teórica e/ou prática, a critério do CBMDF.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
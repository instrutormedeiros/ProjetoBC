/* === module7-quiz.js === */
var questionBank = {
    'module7': [
        {
            id: 'm7-q1',
            question: 'Quem é o responsável técnico por elaborar o PPCI e coordenar os treinamentos?',
            options: { a: 'Supervisor de Brigada.', b: 'Chefe de Brigada.', c: 'Brigadista Particular.', d: 'Agente Fiscalizador.' },
            answer: 'a',
            explanation: 'O Supervisor de Brigada é o responsável técnico pelo planejamento, organização e elaboração do PPCI.'
        },
        {
            id: 'm7-q2',
            question: 'Qual brigadista é um funcionário do local que atua como apoio em emergências no próprio trabalho?',
            options: { a: 'Chefe de Brigada.', b: 'Brigadista Particular.', c: 'Brigadista Voluntário.', d: 'Supervisor de Brigada.' },
            answer: 'c',
            explanation: 'O Brigadista Voluntário é um funcionário do local que acumula sua função normal com a de brigadista.'
        },
        {
            id: 'm7-q3',
            question: 'Quem é o responsável por coordenar e orientar as ações da equipe durante uma emergência?',
            options: { a: 'Brigadista Voluntário.', b: 'Chefe de Brigada.', c: 'Supervisor de Brigada.', d: 'Brigadista Particular.' },
            answer: 'b',
            explanation: 'O Chefe de Brigada é quem coordena e orienta as ações de emergência no momento do evento.'
        },
        {
            id: 'm7-q4',
            question: 'Qual brigadista tem dedicação exclusiva às suas funções no local de trabalho e é credenciado pelo CBMDF?',
            options: { a: 'Chefe de Brigada.', b: 'Brigadista Voluntário.', c: 'Supervisor de Brigada.', d: 'Brigadista Particular.' },
            answer: 'd',
            explanation: 'O Brigadista Particular é o profissional contratado com dedicação exclusiva para as tarefas de brigada.'
        },
        {
            id: 'm7-q5',
            question: 'O que é a Brigada de Incêndio?',
            options: { a: 'Um grupo de funcionários que apenas assiste a palestras.', b: 'Apenas os bombeiros militares.', c: 'Um grupo organizado de pessoas treinadas para atuar em emergências de incêndio e pânico.', d: 'A equipe de manutenção do prédio.' },
            answer: 'c',
            explanation: 'É um grupo treinado e capacitado para atuar na prevenção e em emergências de incêndio e pânico.'
        },
        {
            id: 'm7-q6',
            question: 'Qual a principal diferença entre o Brigadista Particular e o Voluntário?',
            options: { a: 'O Particular usa uniforme, o Voluntário não.', b: 'O Particular tem dedicação exclusiva, o Voluntário acumula funções.', c: 'O Particular só combate o fogo, o Voluntário só faz prevenção.', d: 'O Particular é credenciado, o Voluntário não precisa de treino.' },
            answer: 'b',
            explanation: 'O Brigadista Particular tem dedicação exclusiva, enquanto o Voluntário é um funcionário que também atua na brigada.'
        },
        {
            id: 'm7-q7',
            question: 'Quem é o profissional que planeja e organiza as atividades da brigada, sendo o responsável técnico?',
            options: { a: 'Chefe de Brigada.', b: 'Brigadista Voluntário.', c: 'Supervisor de Brigada.', d: 'Um membro do CBMDF.' },
            answer: 'c',
            explanation: 'O Supervisor de Brigada é o responsável técnico pelo planejamento e organização.'
        },
        {
            id: 'm7-q8',
            question: 'A quem o Chefe de Brigada se reporta durante uma emergência?',
            options: { a: 'Ao Brigadista Voluntário.', b: 'Ao Supervisor de Brigada.', c: 'Apenas ao CBMDF.', d: 'A ninguém, ele tem autonomia total.' },
            answer: 'b',
            explanation: 'O Chefe de Brigada coordena as ações, mas segue o plano e se reporta ao Supervisor (responsável técnico).'
        },
        {
            id: 'm7-q9',
            question: 'O Brigadista Voluntário atua em emergências:',
            options: { a: 'Apenas fora do seu horário de trabalho.', b: 'Apenas se for chamado em casa.', c: 'Durante seu expediente de trabalho, como apoio.', d: 'Apenas se o Brigadista Particular faltar.' },
            answer: 'c',
            explanation: 'O Brigadista Voluntário é um funcionário que atua durante seu expediente normal de trabalho.'
        },
        {
            id: 'm7-q10',
            question: 'Quem garante que o PPCI seja colocado em prática pela equipe durante a emergência?',
            options: { a: 'Supervisor de Brigada.', b: 'Brigadista Voluntário.', c: 'Chefe de Brigada.', d: 'Agente Fiscalizador.' },
            answer: 'c',
            explanation: 'O Chefe de Brigada é o líder operacional que coordena a equipe na prática.'
        },
        {
            id: 'm7-q11',
            question: 'O Brigadista Particular precisa ser credenciado por qual órgão?',
            options: { a: 'ABNT.', b: 'Ministério do Trabalho (MTE).', c: 'CBMDF (Corpo de Bombeiros).', d: 'Não precisa de credenciamento.' },
            answer: 'c',
            explanation: 'O Brigadista Particular é um profissional credenciado pelo CBMDF.'
        },
        {
            id: 'm7-q12',
            question: 'Qual é a função do Supervisor de Brigada em relação ao PPCI?',
            options: { a: 'Apenas ler o PPCI.', b: 'Apenas aprovar o PPCI feito pelo Chefe.', c: 'Elaborar o PPCI.', d: 'Ignorar o PPCI e focar na prática.' },
            answer: 'c',
            explanation: 'O Supervisor de Brigada é o responsável técnico por elaborar o PPCI.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
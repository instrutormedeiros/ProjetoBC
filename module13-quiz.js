/* === module13-quiz.js === */
var questionBank = {
    'module13': [
        {
            id: 'm13-q1',
            question: 'A fase de análise da cena, com varredura de riscos e sinalização, é chamada de:',
            options: { a: 'Deslocamento.', b: 'Reconhecimento.', c: 'Regresso.', d: 'Aviso.' },
            answer: 'b',
            explanation: 'Reconhecimento é a análise da cena para observar riscos e garantir a segurança.'
        },
        {
            id: 'm13-q2',
            question: 'O ponto de encontro seguro da equipe, onde as vítimas são deixadas, é conhecido como:',
            options: { a: 'Local de Deslocamento.', b: 'Ponto de Regresso.', c: 'Abrigo.', d: 'Zona de Reconhecimento.' },
            answer: 'c',
            explanation: 'O Abrigo é o ponto de encontro seguro para a equipe e para as vítimas resgatadas.'
        },
        {
            id: 'm13-q3',
            question: 'O recebimento de um chamado de emergência via telefone corresponde a qual etapa da operação?',
            options: { a: 'Aviso.', b: 'Deslocamento.', c: 'Reconhecimento.', d: 'Abrigo.' },
            answer: 'a',
            explanation: 'O Aviso é o reconhecimento do pedido de socorro (grito, apito, rádio ou telefone).'
        },
        {
            id: 'm13-q4',
            question: 'Durante o percurso até o local da emergência, a equipe elabora táticas e organiza equipamentos. Esta fase é a de:',
            options: { a: 'Reconhecimento.', b: 'Aviso.', c: 'Abrigo.', d: 'Deslocamento.' },
            answer: 'd',
            explanation: 'O Deslocamento é o percurso até o local, usado como período de preparação e elaboração de táticas.'
        },
        {
            id: 'm13-q5',
            question: 'Qual é o primeiro ponto (etapa) da operação de salvamento?',
            options: { a: 'Deslocamento.', b: 'Reconhecimento.', c: 'Aviso.', d: 'Abrigo.' },
            answer: 'c',
            explanation: 'A operação começa com o Aviso (o reconhecimento do pedido de socorro).'
        },
        {
            id: 'm13-q6',
            question: 'O que é feito na etapa de "Reconhecimento"?',
            options: { a: 'A equipe se desloca para o local.', b: 'A equipe organiza os materiais no ponto seguro.', c: 'A equipe analisa a cena, observa riscos e sinaliza o local.', d: 'A equipe recebe o chamado pelo rádio.' },
            answer: 'c',
            explanation: 'Reconhecimento é a análise da cena para observar riscos e garantir a segurança da equipe.'
        },
        {
            id: 'm13-q7',
            question: 'Em qual etapa a primeira equipe a chegar organiza os materiais enquanto a próxima assume o atendimento?',
            options: { a: 'Aviso.', b: 'Deslocamento.', c: 'Reconhecimento.', d: 'Abrigo.' },
            answer: 'd',
            explanation: 'No Abrigo (ponto seguro), as equipes se organizam para o revezamento e atendimento.'
        },
        {
            id: 'm13-q8',
            question: 'A saída do local do salvamento para um ponto seguro é chamada de:',
            options: { a: 'Deslocamento.', b: 'Regresso.', c: 'Aviso.', d: 'Reconhecimento.' },
            answer: 'b',
            explanation: 'O Regresso é a saída do local do incidente para o Abrigo.'
        },
        {
            id: 'm13-q9',
            question: 'Qual etapa é um "período de preparação" onde táticas são elaboradas?',
            options: { a: 'Aviso.', b: 'Deslocamento.', c: 'Reconhecimento.', d: 'Abrigo.' },
            answer: 'b',
            explanation: 'O Deslocamento (percurso até o local) é usado pela equipe para organizar equipamentos e táticas.'
        },
        {
            id: 'm13-q10',
            question: 'A varredura total para observar riscos (fogo, fumaça) acontece em qual fase?',
            options: { a: 'Aviso.', b: 'Deslocamento.', c: 'Reconhecimento.', d: 'Regresso.' },
            answer: 'c',
            explanation: 'A análise de riscos da cena é a principal característica da fase de Reconhecimento.'
        },
        {
            id: 'm13-q11',
            question: 'Gritar por socorro é um exemplo de qual ponto da operação?',
            options: { a: 'Aviso.', b: 'Reconhecimento.', c: 'Regresso.', d: 'Deslocamento.' },
            answer: 'a',
            explanation: 'O Aviso é o momento em que o pedido de socorro é reconhecido (grito, apito, telefone, rádio).'
        },
        {
            id: 'm13-q12',
            question: 'Qual é a sequência correta das etapas de uma operação de salvamento?',
            options: { a: 'Aviso → Deslocamento → Reconhecimento → Abrigo → Regresso.', b: 'Deslocamento → Reconhecimento → Regresso → Aviso.', c: 'Abrigo → Deslocamento → Regresso → Aviso.', d: 'Reconhecimento → Aviso → Abrigo → Regresso.' },
            answer: 'a',
            explanation: 'A ordem correta é: Aviso, Deslocamento, Reconhecimento, Abrigo e Regresso.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
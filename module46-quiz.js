/* === module53-quiz.js === */
var questionBank = {
    'module53': [
        {
            id: 'm53-q1',
            question: 'Qual é o objetivo da "fase prévia" no salvamento em alturas?',
            options: { a: 'Iniciar o resgate da vítima imediatamente.', b: 'Coletar informações detalhadas para planejar a operação e reduzir imprevistos.', c: 'Montar os equipamentos de ancoragem.', d: 'Realizar a avaliação final da operação.' },
            answer: 'b',
            explanation: 'A fase prévia (antes de chegar ao local) serve para coletar informações e iniciar o planejamento.'
        },
        {
            id: 'm53-q2',
            question: 'O que é avaliado na "fase de reconhecimento"?',
            options: { a: 'Informações sobre vítimas, riscos (como eletricidade ou fogo) e a necessidade de reforços.', b: 'Apenas o número de vítimas.', c: 'O custo total da operação.', d: 'A condição dos equipamentos após o uso.' },
            answer: 'a',
            explanation: 'O reconhecimento é feito no local para confirmar informações, avaliar riscos (eletricidade, arestas) e definir o plano.'
        },
        {
            id: 'm53-q3',
            question: 'Por que o plano de ação na "fase de preparação" deve ser flexível?',
            options: { a: 'Porque o plano não é importante.', b: 'Para permitir que cada bombeiro atue de forma independente.', c: 'Para se adaptar a imprevistos, como desabamentos ou mudanças no estado da vítima.', d: 'Para economizar tempo na fase de planejamento.' },
            answer: 'c',
            explanation: 'A flexibilidade é necessária para lidar com imprevistos (ex: desabamentos) que mudam o cenário.'
        },
        {
            id: 'm53-q4',
            question: 'O que ocorre na "fase de desmobilização"?',
            options: { a: 'A montagem dos sistemas de acesso à vítima.', b: 'O primeiro contato com a vítima.', c: 'A coleta de informações iniciais sobre o acidente.', d: 'Revisão e acondicionamento dos equipamentos, além de uma reunião para avaliar a operação.' },
            answer: 'd',
            explanation: 'A desmobilização é a fase final, após o resgate, para guardar materiais e avaliar a operação.'
        },
        {
            id: 'm53-q5',
            question: 'Em qual fase é crucial a comunicação entre a equipe durante a execução do resgate?',
            options: { a: 'Fase Prévia.', b: 'Fase de Reconhecimento.', c: 'Fase de Salvamento.', d: 'Fase de Desmobilização.' },
            answer: 'c',
            explanation: 'A comunicação clara é crucial durante a Fase de Salvamento (a execução) para coordenar as ações.'
        },
        {
            id: 'm53-q6',
            question: 'Coletar informações como "altura" e "número de vítimas" ANTES de chegar ao local pertence a qual fase?',
            options: { a: 'Fase Prévia.', b: 'Fase de Reconhecimento.', c: 'Fase de Preparação.', d: 'Fase de Salvamento.' },
            answer: 'a',
            explanation: 'Esta coleta inicial de informações é a Fase Prévia.'
        },
        {
            id: 'm53-q7',
            question: 'Montar os sistemas de acesso à vítima e disponibilizar recursos humanos e materiais faz parte de qual fase?',
            options: { a: 'Fase Prévia.', b: 'Fase de Reconhecimento.', c: 'Fase de Preparação.', d: 'Fase de Desmobilização.' },
            answer: 'c',
            explanation: 'A Fase de Preparação é onde os sistemas são montados e os recursos organizados.'
        },
        {
            id: 'm53-q8',
            question: 'Avaliar a vítima para determinar a necessidade de APH ocorre em qual fase?',
            options: { a: 'Fase Prévia.', b: 'Fase de Reconhecimento.', c: 'Fase de Salvamento.', d: 'Fase de Desmobilização.' },
            answer: 'c',
            explanation: 'A avaliação da vítima e o APH são realizados durante a Fase de Salvamento.'
        },
        {
            id: 'm53-q9',
            question: 'Escolher os pontos de ancoragem e montar os sistemas de descensão/içamento é parte da:',
            options: { a: 'Fase de Salvamento.', b: 'Fase de Reconhecimento.', c: 'Fase de Desmobilização.', d: 'Fase Prévia.' },
            answer: 'a',
            explanation: 'A execução (escolha de ancoragens, montagem dos sistemas, resgate) é a Fase de Salvamento.'
        },
        {
            id: 'm53-q10',
            question: 'Avaliar riscos como "arestas vivas" é feito em qual fase?',
            options: { a: 'Fase Prévia.', b: 'Fase de Reconhecimento.', c: 'Fase de Preparação.', d: 'Fase de Desmobilização.' },
            answer: 'b',
            explanation: 'A avaliação de riscos no local (como arestas vivas, eletricidade) é feita na Fase de Reconhecimento.'
        },
        {
            id: 'm53-q11',
            question: 'Uma reunião para avaliar acertos e falhas (briefing pós-missão) ocorre na:',
            options: { a: 'Fase Prévia.', b: 'Fase de Reconhecimento.', c: 'Fase de Salvamento.', d: 'Fase de Desmobilização.' },
            answer: 'd',
            explanation: 'A avaliação da operação (acertos e falhas) é parte da Fase de Desmobilização.'
        },
        {
            id: 'm53-q12',
            question: 'Confirmar as informações coletadas e verificar a necessidade de reforços é feito na:',
            options: { a: 'Fase Prévia.', b: 'Fase de Reconhecimento.', c: 'Fase de Preparação.', d: 'Fase de Desmobilização.' },
            answer: 'b',
            explanation: 'O Reconhecimento serve para confirmar (ou corrigir) as informações da Fase Prévia e chamar reforços se necessário.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
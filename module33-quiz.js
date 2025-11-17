/* === module33-quiz.js === */
var questionBank = {
    'module33': [
        {
            id: 'm33-q1',
            question: 'Qual é a conduta correta para uma vítima de Síncope (Desmaio)?',
            options: {
                a: 'Deixar a vítima sentada e dar água com açúcar.',
                b: 'Dar tapas no rosto para acordar.',
                c: 'Deitar a vítima no chão e elevar suas pernas.',
                d: 'Tentar levantar a vítima imediatamente.'
            },
            answer: 'c',
            explanation: 'A conduta correta é deitar a vítima no chão e elevar suas pernas para melhorar o fluxo sanguíneo ao cérebro.'
        },
        {
            id: 'm33-q2',
            question: 'Durante uma crise convulsiva, qual ação é fundamental para proteger a vítima?',
            options: {
                a: 'Tentar puxar a língua para fora.',
                b: 'Segurar firmemente os braços e pernas para parar os movimentos.',
                c: 'Colocar um objeto (pano, colher) na boca da vítima.',
                d: 'Proteger a cabeça (amparar) e lateralizá-la.'
            },
            answer: 'd',
            explanation: 'Deve-se proteger a cabeça da vítima para evitar lesões e lateralizá-la para evitar engasgos com saliva ou vômito.'
        },
        {
            id: 'm33-q3',
            question: 'Qual ação NÃO se deve fazer em uma crise convulsiva?',
            options: {
                a: 'Afastar objetos ao redor.',
                b: 'Cronometrar a crise.',
                c: 'Tentar puxar a língua ou colocar objetos na boca.',
                d: 'Proteger a cabeça da vítima.'
            },
            answer: 'c',
            explanation: 'NÃO se deve colocar objetos na boca (risco de quebrar dentes/obstruir) nem tentar puxar a língua (mito).'
        },
        {
            id: 'm33-q4',
            question: 'Qual mnemônico é usado para identificar rapidamente um Acidente Vascular Encefálico (AVE)?',
            options: {
                a: 'SAMPLE',
                b: 'AVDI',
                c: 'FAST',
                d: 'PMS'
            },
            answer: 'c',
            explanation: 'O teste FAST (Face, Arm, Speech, Time) é usado para identificar rapidamente os sinais de um AVE.'
        },
        {
            id: 'm33-q5',
            question: 'Dor no peito em aperto, que irradia para braço esquerdo e mandíbula, com suor frio, são sinais clássicos de:',
            options: {
                a: 'Síncope',
                b: 'Crise convulsiva',
                c: 'Acidente Vascular Encefálico (AVE)',
                d: 'Infarto Agudo do Miocárdio (IAM)'
            },
            answer: 'd',
            explanation: 'Dor no peito em aperto, irradiação para braço esquerdo/mandíbula e suor frio são sinais clássicos de IAM (Infarto).'
        },
        {
            id: 'm33-q6',
            question: 'O que diferencia "Epilepsia" de uma "Crise Convulsiva" isolada?',
            options: {
                a: 'Epilepsia é mais forte que a convulsão.',
                b: 'Convulsão só acontece por febre e epilepsia não.',
                c: 'Epilepsia é uma disfunção crônica que causa convulsões recorrentes.',
                d: 'Não há diferença, são a mesma coisa.'
            },
            answer: 'c',
            explanation: 'A Epilepsia é uma disfunção crônica do cérebro que causa convulsões recorrentes. Ter uma convulsão isolada (ex: por febre) não significa ter epilepsia.'
        },
        {
            id: 'm33-q7',
            question: 'Na sigla FAST (para AVE), o que significa o "S" (Speech)?',
            options: {
                a: 'Sorriso (Smile)',
                b: 'Sintomas (Symptoms)',
                c: 'Fala (Speech) arrastada ou confusa',
                d: 'Súbito (Sudden)'
            },
            answer: 'c',
            explanation: 'O "S" de FAST refere-se a Speech (Fala), verificando se a vítima apresenta fala arrastada ou confusa.'
        },
        {
            id: 'm33-q8',
            question: 'Na sigla FAST (para AVE), o que significa o "F" (Face)?',
            options: {
                a: 'Fraqueza (Faint)',
                b: 'Febre (Fever)',
                c: 'Rosto (Face) torto ou assimétrico',
                d: 'Frio (Feel)'
            },
            answer: 'c',
            explanation: 'O "F" de FAST refere-se a Face (Rosto), verificando se há assimetria (rosto torto) ao sorrir.'
        },
        {
            id: 'm33-q9',
            question: 'Qual é a conduta correta para uma vítima com suspeita de Infarto (IAM)?',
            options: {
                a: 'Manter a vítima sentada, acalmar e acionar 192/193.',
                b: 'Deitar a vítima e elevar as pernas.',
                c: 'Pedir para a vítima tossir com força.',
                d: 'Dar água com açúcar e esperar melhorar.'
            },
            answer: 'a',
            explanation: 'A vítima deve ser mantida sentada (posição que cansa menos o coração), acalmada, e o socorro (192/193) deve ser acionado imediatamente.'
        },
        {
            id: 'm33-q10',
            question: 'Quando se deve ligar para 192/193 em uma crise convulsiva?',
            options: {
                a: 'Apenas se a vítima for idosa.',
                b: 'Em todas as crises, sem exceção.',
                c: 'Se a crise durar mais de 5 minutos ou for a primeira vez.',
                d: 'Apenas se a vítima morder a língua.'
            },
            answer: 'c',
            explanation: 'Deve-se acionar o socorro se a crise durar mais de 5 minutos, se for a primeira crise da pessoa, ou se ocorrer em gestantes/diabéticos.'
        },
        {
            id: 'm33-q11',
            question: 'Tontura, visão escura, palidez e suor frio antes de desmaiar são chamados de:',
            options: {
                a: 'Sinais de Infarto',
                b: 'Sinais de Síncope',
                c: 'Sinais de AVE',
                d: 'Sinais de Convulsão'
            },
            answer: 'b',
            explanation: 'Esses são os sinais clássicos que antecedem a Síncope (Desmaio).'
        },
        {
            id: 'm33-q12',
            question: 'Qual é a causa mais comum de convulsão em crianças menores de 5 anos?',
            options: {
                a: 'Epilepsia',
                b: 'Febre alta',
                c: 'Hipoglicemia',
                d: 'Traumatismo craniano'
            },
            answer: 'b',
            explanation: 'A febre alta é a principal causa de convulsão em crianças pequenas.'
        }
    ]
};
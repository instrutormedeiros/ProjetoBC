/* === module26-quiz.js === */
var questionBank = {
    'module26': [
        {
            id: 'm26-q1',
            question: 'Qual a diferença principal entre Urgência e Emergência?',
            options: {
                a: 'Urgência é trauma, Emergência é clínico.',
                b: 'Urgência tem risco iminente de vida, Emergência não.',
                c: 'Urgência não tem risco iminente de vida, Emergência tem.',
                d: 'Urgência é SBV, Emergência é SAV.'
            },
            answer: 'c',
            explanation: 'Emergência é uma ocorrência que apresenta risco iminente de vida, enquanto Urgência é grave mas não representa esse risco imediato.'
        },
        {
            id: 'm26-q2',
            question: 'Segundo o Art. 135 (Omissão de Socorro), qual ação já descaracteriza o crime para um leigo que não se sente confiante para agir?',
            options: {
                a: 'Pedir socorro à autoridade pública (ligar 192 ou 193).',
                b: 'Tentar fazer compressões torácicas, mesmo sem saber.',
                c: 'Levar a vítima ao hospital no próprio carro.',
                d: 'Apenas filmar a situação para ter provas.'
            },
            answer: 'a',
            explanation: 'O simples ato de pedir socorro à autoridade pública (ligar para 192 ou 193) já descaracteriza a omissão.'
        },
        {
            id: 'm26-q3',
            question: 'Quando o "Consentimento Implícito" é aplicado?',
            options: {
                a: 'Quando a vítima diz "sim" verbalmente.',
                b: 'Apenas quando um familiar autoriza o atendimento.',
                c: 'Quando a vítima assina um termo de autorização.',
                d: 'Quando a vítima está inconsciente, confusa ou é um menor desacompanhado.'
            },
            answer: 'd',
            explanation: 'O Consentimento Implícito é assumido quando a vítima está inconsciente, confusa, gravemente ferida e não pode responder, ou em menores desacompanhados.'
        },
        {
            id: 'm26-q4',
            question: 'Qual é o número de emergência para acionar o SAMU (Atendimento Clínico)?',
            options: {
                a: '190 (Polícia Militar)',
                b: '193 (Bombeiros)',
                c: '191 (Polícia Rodoviária Federal)',
                d: '192 (SAMU)'
            },
            answer: 'd',
            explanation: 'O número do SAMU, focado em atendimento clínico, é 192.'
        },
        {
            id: 'm26-q5',
            question: 'O que define o Suporte Básico de Vida (SBV)?',
            options: {
                a: 'Conjunto de procedimentos invasivos, como acesso venoso.',
                b: 'Atendimento realizado apenas por médicos especialistas.',
                c: 'Conjunto de procedimentos não invasivos, como RCP e controle de hemorragias.',
                d: 'O mesmo que Primeiros Socorros, mas feito no hospital.'
            },
            answer: 'c',
            explanation: 'O SBV é o conjunto de procedimentos não invasivos que podem ser feitos por socorristas treinados.'
        },
        {
            id: 'm26-q6',
            question: 'O que define o Suporte Avançado de Vida (SAV)?',
            options: {
                a: 'Qualquer atendimento feito por um socorrista treinado.',
                b: 'Procedimentos invasivos, como intubação e uso de medicamentos, realizados por equipe médica.',
                c: 'O uso de um desfibrilador (DEA), que é considerado básico.',
                d: 'O atendimento inicial para estabilizar a vítima.'
            },
            answer: 'b',
            explanation: 'O SAV envolve procedimentos invasivos e é realizado por equipe médica.'
        },
        {
            id: 'm26-q7',
            question: 'Qual é o objetivo principal do Atendimento Pré-Hospitalar (APH)?',
            options: {
                a: 'Curar a vítima no local do acidente.',
                b: 'Substituir o atendimento hospitalar.',
                c: 'Estabilizar a vítima e transportá-la com segurança ao hospital.',
                d: 'Apenas fazer o transporte da vítima, sem intervenção.'
            },
            answer: 'c',
            explanation: 'O objetivo do APH é estabilizar a vítima fora do ambiente hospitalar e transportá-la com segurança para uma unidade de saúde.'
        },
        {
            id: 'm26-q8',
            question: 'O que o Art. 196 da Constituição Federal estabelece?',
            options: {
                a: 'O crime de omissão de socorro.',
                b: 'A saúde é um direito de todos e dever do Estado.',
                c: 'A inviolabilidade do direito à vida (Art. 5º).',
                d: 'As regras para consentimento implícito.'
            },
            answer: 'b',
            explanation: 'O Art. 196 estabelece que a saúde é um direito de todos e dever do Estado, fundamentando os serviços de emergência públicos.'
        },
        {
            id: 'm26-q9',
            question: 'Qual é o número de emergência para acionar o CBMDF (Bombeiros)?',
            options: {
                a: '190',
                b: '192',
                c: '193',
                d: '197'
            },
            answer: 'c',
            explanation: 'O número do CBMDF (Corpo de Bombeiros) é 193.'
        },
        {
            id: 'm26-q10',
            question: 'Se uma vítima consciente e orientada recusar atendimento, qual a conduta correta do socorrista?',
            options: {
                a: 'Ignorar a recusa e atender a vítima à força.',
                b: 'Chamar a polícia para forçar o atendimento.',
                c: 'Respeitar a decisão da vítima, se possível na presença de testemunhas.',
                d: 'Esperar a vítima desmaiar para poder aplicar o consentimento implícito.'
            },
            answer: 'c',
            explanation: 'Se uma vítima consciente e orientada recusa o atendimento, o socorrista deve respeitar sua decisão e não forçar o procedimento.'
        },
        {
            id: 'm26-q11',
            question: '"Cuidados imediatos prestados... com o objetivo de manter a vida e reduzir sequelas até a chegada de socorro especializado" é a definição de:',
            options: {
                a: 'Suporte Avançado de Vida (SAV)',
                b: 'Primeiros Socorros',
                c: 'Atendimento Hospitalar',
                d: 'Consentimento Formal'
            },
            answer: 'b',
            explanation: 'Essa é a definição de Primeiros Socorros.'
        },
        {
            id: 'm26-q12',
            question: 'Qual número de emergência é usado para contatar a Polícia Militar (PM)?',
            options: {
                a: '192',
                b: '197',
                c: '190',
                d: '193'
            },
            answer: 'c',
            explanation: 'O número para acionar a Polícia Militar (PM) é 190.'
        }
    ]
};
/* === module39-quiz.js === */
var questionBank = {
    'module39': [
        {
            id: 'm39-q1',
            question: 'Em uma vítima de OVACE com "Obstrução Parcial" (tosse forte), qual a conduta correta?',
            options: {
                a: 'Aplicar tapas nas costas imediatamente.',
                b: 'Aplicar compressões abdominais.',
                c: 'Incentivar a vítima a tossir e não interferir.',
                d: 'Tentar a varredura digital.'
            },
            answer: 'c',
            explanation: 'Em obstrução parcial (tosse forte), a conduta é incentivar a tossir e não interferir, pois a vítima ainda consegue respirar.'
        },
        {
            id: 'm39-q2',
            question: 'Qual o sinal universal de asfixia (Obstrução Total)?',
            options: {
                a: 'Vítima grita por socorro.',
                b: 'Vítima tosse com muita força.',
                c: 'Vítima coloca as mãos no pescoço.',
                d: 'Vítima fica pálida e com suor frio.'
            },
            answer: 'c',
            explanation: 'O sinal universal de asfixia (obstrução total) é a vítima colocar as mãos no pescoço.'
        },
        {
            id: 'm39-q3',
            question: 'Qual manobra de desengasgo NÃO deve ser feita em Gestantes ou Obesos?',
            options: {
                a: 'Tapas nas costas.',
                b: 'Compressões Torácicas.',
                c: 'Compressões Abdominais ("Heimlich").',
                d: 'RCP.'
            },
            answer: 'c',
            explanation: 'Não se deve fazer compressões abdominais em gestantes ou obesos. Deve-se substituir por compressões torácicas.'
        },
        {
            id: 'm39-q4',
            question: 'Qual é a sequência correta para desengasgo em LACTENTE (< 1 ano) consciente?',
            options: {
                a: '5 compressões abdominais + 5 tapas nas costas.',
                b: 'Apenas compressões abdominais.',
                c: '5 tapas nas costas + 5 compressões torácicas.',
                d: 'Apenas RCP.'
            },
            answer: 'c',
            explanation: 'A sequência para lactente consciente é um ciclo de 5 tapas nas costas, seguidos por 5 compressões torácicas.'
        },
        {
            id: 'm39-q5',
            question: 'Se uma vítima de OVACE (adulto ou bebê) fica INCONSCIENTE, qual a conduta imediata?',
            options: {
                a: 'Tentar a varredura digital cega.',
                b: 'Iniciar RCP imediatamente, começando pelas compressões.',
                c: 'Aplicar apenas ventilações.',
                d: 'Continuar os tapas nas costas.'
            },
            answer: 'b',
            explanation: 'Se a vítima de OVACE fica inconsciente, a conduta é colocá-la em superfície rígida e iniciar RCP imediatamente (começando pelas compressões).'
        },
        {
            id: 'm39-q6',
            question: 'Em um adulto consciente com obstrução total, qual é a sequência de manobras citada no material?',
            options: {
                a: 'Apenas Compressões Abdominais ("Heimlich").',
                b: '5 tapas nas costas e, se não resolver, compressões abdominais.',
                c: 'RCP imediato.',
                d: 'Varredura digital.'
            },
            answer: 'b',
            explanation: 'O material cita a sequência de 5 tapas nas costas, seguidos por compressões abdominais se não resolver.'
        },
        {
            id: 'm39-q7',
            question: 'Em um lactente consciente engasgado, como deve ser a posição para aplicar os 5 golpes nas costas?',
            options: {
                a: 'De bruços no antebraço, com a cabeça mais baixa que o tronco.',
                b: 'De barriga para cima no antebraço.',
                c: 'Sentado no colo do socorrista.',
                d: 'Deitado em uma superfície rígida.'
            },
            answer: 'a',
            explanation: 'O bebê deve ser segurado de bruços no antebraço, com a cabeça mais baixa que o tronco.'
        },
        {
            id: 'm39-q8',
            question: 'O que NUNCA se deve fazer em um lactente com OVACE?',
            options: {
                a: 'Tapas nas costas.',
                b: 'Compressões torácicas.',
                c: 'Compressão abdominal.',
                d: 'Iniciar RCP se ficar inconsciente.'
            },
            answer: 'c',
            explanation: 'Compressão abdominal (Manobra de Heimlich) é proibida em bebês devido ao risco de lesão nos órgãos.'
        },
        {
            id: 'm39-q9',
            question: 'Em uma vítima inconsciente por OVACE, quando o socorrista deve tentar remover o objeto?',
            options: {
                a: 'A qualquer momento, com uma varredura cega.',
                b: 'Apenas se conseguir VER o objeto na boca.',
                c: 'Nunca, deve apenas continuar a RCP.',
                d: 'Apenas após aplicar os 5 tapas nas costas.'
            },
            answer: 'b',
            explanation: 'Na vítima inconsciente, o socorrista deve procurar o objeto na boca (antes de ventilar) e removê-lo APENAS se estiver visível. A varredura cega é proibida.'
        },
        {
            id: 'm39-q10',
            question: 'Em quais vítimas as compressões abdominais são substituídas por compressões torácicas?',
            options: {
                a: 'Idosos e Crianças.',
                b: 'Gestantes e Obesos.',
                c: 'Vítimas inconscientes.',
                d: 'Vítimas com obstrução parcial.'
            },
            answer: 'b',
            explanation: 'Em gestantes e obesos, as compressões abdominais não são seguras ou eficazes, devendo ser substituídas por compressões torácicas.'
        },
        {
            id: 'm39-q11',
            question: 'Sinais de obstrução total (grave) incluem:',
            options: {
                a: 'Tosse forte e respiração com dificuldade.',
                b: 'Capacidade de falar e pedir ajuda.',
                c: 'Não tosse, não fala, não respira (ou esforço silencioso).',
                d: 'Vítima pálida e com suor frio, mas consciente.'
            },
            answer: 'c',
            explanation: 'A obstrução total é caracterizada pela incapacidade de tossir, falar ou respirar, e pelo sinal universal.'
        },
        {
            id: 'm39-q12',
            question: 'A nova técnica (AHA 2025 citada) para compressões torácicas em lactente consciente usa:',
            options: {
                a: 'Apenas 2 dedos.',
                b: 'Apenas 1 dedo.',
                c: 'A base da palma da mão.',
                d: 'As duas mãos sobrepostas.'
            },
            answer: 'c',
            explanation: 'O material cita que a nova diretriz AHA 2025 usa a base da palma da mão para as compressões torácicas de desengasgo.'
        }
    ]
};
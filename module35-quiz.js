/* === module35-quiz.js === */
var questionBank = {
    'module35': [
        {
            id: 'm35-q1',
            question: 'Qual é a ordem correta da prioridade de segurança na Avaliação da Cena?',
            options: {
                a: 'Vítima, Eu, Equipe, Pessoas ao redor',
                b: 'Eu, Minha equipe, Pessoas ao redor, A vítima',
                c: 'Eu, A vítima, Minha equipe, Pessoas ao redor',
                d: 'Equipe, Pessoas ao redor, Eu, A vítima'
            },
            answer: 'b',
            explanation: 'A prioridade de segurança é sempre: 1º Eu (socorrista), 2º Minha equipe, 3º Pessoas ao redor, 4º A vítima.'
        },
        {
            id: 'm35-q2',
            question: 'No protocolo XABCDE, o que o "X" representa?',
            options: {
                a: 'Raio-X',
                b: 'Exposição da vítima',
                c: 'Hemorragia Exsanguinante (grave)',
                d: 'Controle de Coluna Cervical'
            },
            answer: 'c',
            explanation: 'O "X" representa Hemorragia Exsanguinante, sangramentos graves que matam rápido e devem ser controlados primeiro.'
        },
        {
            id: 'm35-q3',
            question: 'Qual manobra de abertura de vias aéreas é a preferida em uma vítima de TRAUMA?',
            options: {
                a: 'Chin Lift (Elevação do Queixo)',
                b: 'Jaw Thrust (Tração da Mandíbula)',
                c: 'Compressão abdominal',
                d: 'Virar a cabeça de lado'
            },
            answer: 'b',
            explanation: 'A manobra Jaw Thrust (Tração da Mandíbula) é a preferida no trauma, pois não movimenta o pescoço (coluna cervical).'
        },
        {
            id: 'm35-q4',
            question: 'No método AVDI para avaliação neurológica, o que significa o "D"?',
            options: {
                a: 'Distante',
                b: 'Desacordado',
                c: 'Responde a estímulo de Dor',
                d: 'Responde a estímulo Distal'
            },
            answer: 'c',
            explanation: 'O "D" no AVDI significa que a vítima só Responde a estímulo de Dor.'
        },
        {
            id: 'm35-q5',
            question: 'Após expor a vítima no "E" do XABCDE para procurar lesões, qual é a ação imediata?',
            options: {
                a: 'Cobrir a vítima para prevenir hipotermia.',
                b: 'Iniciar a Avaliação Secundária.',
                c: 'Perguntar o nome da vítima (SAMPLE).',
                d: 'Verificar o pulso novamente.'
            },
            answer: 'a',
            explanation: 'Após examinar no "E", a vítima deve ser coberta imediatamente para prevenir a hipotermia.'
        },
        {
            id: 'm35-q6',
            question: 'Para que serve a Avaliação Secundária?',
            options: {
                a: 'Para controlar hemorragias graves.',
                b: 'Para garantir a segurança da cena.',
                c: 'Para procurar lesões que não matam imediatamente.',
                d: 'Para verificar o nível de consciência.'
            },
            answer: 'c',
            explanation: 'A Avaliação Secundária só é feita após o XABCDE estar estável e serve para procurar lesões que não matam imediatamente.'
        },
        {
            id: 'm35-q7',
            question: 'Qual manobra de abertura de vias aéreas é usada em paciente CLÍNICO (SEM suspeita de trauma)?',
            options: {
                a: 'Chin Lift (Elevação do Queixo)',
                b: 'Jaw Thrust (Tração da Mandíbula)',
                c: 'Apenas lateralização da cabeça.',
                d: 'Nenhuma, apenas se observa.'
            },
            answer: 'a',
            explanation: 'A manobra Chin Lift (Elevação do Queixo) é a padrão para pacientes sem suspeita de trauma cervical.'
        },
        {
            id: 'm35-q8',
            question: 'O que significa o "Mecanismo do Trauma"?',
            options: {
                a: 'O tipo de ambulância a ser chamada.',
                b: 'O nome do hospital para onde a vítima vai.',
                c: 'A forma como o acidente aconteceu (energia envolvida).',
                d: 'O conjunto de lesões da vítima.'
            },
            answer: 'c',
            explanation: 'O Mecanismo do Trauma é a forma como o acidente aconteceu (ex: queda de altura, colisão), que ajuda a prever lesões internas.'
        },
        {
            id: 'm35-q9',
            question: 'Na letra "C" (Circulação) do XABCDE, o que é avaliado PRIMEIRO em uma vítima inconsciente?',
            options: {
                a: 'Pulso Radial (punho)',
                b: 'Pulso Pedial (pé)',
                c: 'Pulso Central (Carótida)',
                d: 'Enchimento capilar'
            },
            answer: 'c',
            explanation: 'Em vítimas inconscientes, verifica-se o pulso central (Carótida no pescoço), que é mais forte e o último a parar.'
        },
        {
            id: 'm35-q10',
            question: 'Na letra "D" (Déficit Neurológico), uma pontuação $\le8$ na Escala de Glasgow indica:',
            options: {
                a: 'Vítima estável e alerta.',
                b: 'Trauma leve.',
                c: 'Possível coma (trauma grave).',
                d: 'Vítima fingindo.'
            },
            answer: 'c',
            explanation: 'Uma pontuação na Escala de Coma de Glasgow igual ou inferior a 8 indica um quadro neurológico grave (possível coma).'
        },
        {
            id: 'm35-q11',
            question: 'No mnemônico SAMPLE/AMPLE, o que significa a letra "L"?',
            options: {
                a: 'Lesões',
                b: 'Líquidos',
                c: 'Localização da dor',
                d: 'Última refeição'
            },
            answer: 'd',
            explanation: 'A letra "L" refere-se a "Líquidos e última refeição", informação importante em caso de cirurgia.'
        },
        {
            id: 'm35-q12',
            question: 'O que significa o "B" (Breathing) no XABCDE?',
            options: {
                a: 'Batimentos (Pulso)',
                b: 'Sangramento (Bleeding)',
                c: 'Respiração e Ventilação',
                d: 'Ossos (Bones)'
            },
            answer: 'c',
            explanation: 'O "B" de Breathing refere-se à avaliação da Respiração e Ventilação (se o ar está entrando e saindo).'
        }
    ]
};
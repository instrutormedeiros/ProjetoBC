/* === module36-quiz.js === */
var questionBank = {
    'module36': [
        {
            id: 'm36-q1',
            question: 'Qual é a conduta correta se uma vítima de PAB (faca) ainda está com o objeto cravado no corpo?',
            options: {
                a: 'Remover o objeto imediatamente para aliviar a pressão.',
                b: 'Puxar o objeto um pouco para ver a profundidade.',
                c: 'NÃO remover o objeto e estabilizá-lo com curativos.',
                d: 'Quebrar o cabo do objeto para facilitar o transporte.'
            },
            answer: 'c',
            explanation: 'NUNCA se deve remover o objeto cravado. Ele deve ser estabilizado com curativos e ataduras.'
        },
        {
            id: 'm36-q2',
            question: 'Na PAB com objeto cravado, como se controla uma hemorragia ativa?',
            options: {
                a: 'Pressionando diretamente sobre o objeto.',
                b: 'Aplicando um torniquete acima do objeto.',
                c: 'Com compressão AO REDOR do objeto, nunca sobre ele.',
                d: 'Ignorando o sangramento, pois o objeto está estancando.'
            },
            answer: 'c',
            explanation: 'O controle da hemorragia deve ser feito com compressão ao redor do objeto, e NUNCA sobre ele.'
        },
        {
            id: 'm36-q3',
            question: 'Por que uma PAF (Perfuração por Arma de Fogo) é considerada tão grave?',
            options: {
                a: 'Porque o projétil é sempre envenenado.',
                b: 'Porque a trajetória interna é imprevisível e pode criar múltiplas cavidades.',
                c: 'Porque o orifício de entrada é sempre maior que o de saída.',
                d: 'Porque o projétil sempre fica alojado.'
            },
            answer: 'b',
            explanation: 'A PAF é grave porque a trajetória interna do projétil é imprevisível e pode criar múltiplas cavidades internas (lesão cavitária).'
        },
        {
            id: 'm36-q4',
            question: 'Qual é o primeiro princípio geral no atendimento de PAB ou PAF?',
            options: {
                a: 'Garantir a segurança da cena (agressor pode estar presente).',
                b: 'Procurar imediatamente pelo projétil ou arma.',
                c: 'Remover o objeto cravado.',
                d: 'Lavar o ferimento com água e sabão.'
            },
            answer: 'a',
            explanation: 'O primeiro princípio é garantir a segurança da cena, pois existe a possibilidade do agressor ainda estar presente.'
        },
        {
            id: 'm36-q5',
            question: 'PAB significa Perfuração por Arma Branca. Qual destes NÃO é um exemplo de arma branca?',
            options: {
                a: 'Faca',
                b: 'Canivete',
                c: 'Vidro quebrado',
                d: 'Pistola'
            },
            answer: 'd',
            explanation: 'Pistola é uma arma de fogo (PAF), não uma arma branca (PAB).'
        },
        {
            id: 'm36-q6',
            question: 'Em uma PAF, o que o socorrista deve ativamente procurar?',
            options: {
                a: 'O projétil dentro da ferida.',
                b: 'Orifício de entrada e possível orifício de saída.',
                c: 'A pólvora na pele da vítima.',
                d: 'Apenas o orifício de entrada.'
            },
            answer: 'b',
            explanation: 'Na conduta da PAF, o socorrista deve procurar pelo orifício de entrada e um possível orifício de saída.'
        },
        {
            id: 'm36-q7',
            question: 'Qual é a principal diferença de energia entre PAB e PAF?',
            options: {
                a: 'PAB tem alta energia (onda de choque), PAF tem baixa energia.',
                b: 'PAF tem alta energia (onda de choque), PAB tem baixa ou moderada.',
                c: 'Ambas têm a mesma energia.',
                d: 'A energia depende do material do objeto.'
            },
            answer: 'b',
            explanation: 'A PAF é considerada de alta energia (criando uma onda de choque interna), enquanto a PAB é de baixa ou moderada energia.'
        },
        {
            id: 'm36-q8',
            question: 'É correto "sondar" ou "investigar" um ferimento de PAB ou PAF para ver o que atingiu?',
            options: {
                a: 'Sim, para saber a gravidade.',
                b: 'Não, pois pode causar mais lesões ou infecção.',
                c: 'Sim, mas apenas com o dedo enluvado.',
                d: 'Apenas se o objeto não estiver mais cravado.'
            },
            answer: 'b',
            explanation: 'Um princípio geral é NUNCA sondar ou "investigar" ferimentos, pois isso pode agravar a lesão.'
        },
        {
            id: 'm36-q9',
            question: 'Qual protocolo de avaliação deve ser seguido em vítimas de PAB ou PAF?',
            options: {
                a: 'Apenas verificar o ferimento.',
                b: 'O XABCDE do trauma.',
                c: 'A escala de Glasgow apenas.',
                d: 'O método SAMPLE.'
            },
            answer: 'b',
            explanation: 'Vítimas de PAB e PAF são vítimas de trauma penetrante, devendo seguir o protocolo XABCDE.'
        },
        {
            id: 'm36-q10',
            question: 'O risco interno em traumas penetrantes (PAB/PAF) é:',
            options: {
                a: 'Sempre menor do que o ferimento externo aparenta.',
                b: 'Sempre igual ao ferimento externo.',
                c: 'Sempre maior do que o ferimento externo aparenta.',
                d: 'Inexistente se não houver sangramento.'
            },
            answer: 'c',
            explanation: 'Em ambos os casos, o risco interno é sempre maior do que o que aparece na pele.'
        },
        {
            id: 'm36-q11',
            question: 'Qual é um dos principais riscos em PAB que atinge o tórax?',
            options: {
                a: 'Pneumotórax (perfuração do pulmão)',
                b: 'Fratura de fêmur',
                c: 'Queimadura de 3º grau',
                d: 'Hipoglicemia'
            },
            answer: 'a',
            explanation: 'A perfuração do tórax por arma branca tem alto risco de causar Pneumotórax (perfuração do pulmão).'
        },
        {
            id: 'm36-q12',
            question: 'A trajetória de uma PAB é geralmente ______, enquanto a de uma PAF é ______.',
            options: {
                a: 'Imprevisível / Linear',
                b: 'Linear / Imprevisível',
                c: 'Curta / Longa',
                d: 'Larga / Fina'
            },
            answer: 'b',
            explanation: 'A trajetória da PAB é geralmente linear e previsível, enquanto a da PAF é imprevisível devido à cavitação.'
        }
    ]
};
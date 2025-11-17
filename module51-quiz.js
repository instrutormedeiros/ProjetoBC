/* === module58-quiz.js === */
var questionBank = {
    'module58': [
        {
            id: 'm58-q1',
            question: 'Por que os SAS (Sistemas de Ancoragens de Segurança) devem ter pelo menos dois pontos de ancoragem?',
            options: { a: 'Para tornar a montagem mais demorada.', b: 'Para garantir redundância, assegurando que, em caso de falha de um ponto, o outro mantenha a segurança.', c: 'Porque a lei exige o uso de no mínimo dois mosquetões.', d: 'Para dividir o peso igualmente em todos os casos.' },
            answer: 'b',
            explanation: 'O uso de dois pontos (principal e secundário) garante a redundância, um princípio básico de segurança.'
        },
        {
            id: 'm58-q2',
            question: 'Qual é a diferença entre ancoragem equalizada e equalizável?',
            options: { a: 'Equalizada é para um bombeiro; equalizável é para dois.', b: 'Equalizada usa cordas; equalizável usa fitas.', c: 'Não há diferença, os termos são sinônimos.', d: 'Equalizada tem ponto de descida fixo; equalizável permite ajustes laterais (mobilidade).' },
            answer: 'd',
            explanation: 'Equalizada = ponto fixo; Equalizável = ponto de descida móvel (permite ajustar).'
        },
        {
            id: 'm58-q3',
            question: 'O que deve ser evitado ao montar um SAS?',
            options: { a: 'Braços de alavanca e abrasão em arestas vivas.', b: 'O uso de mosquetões com trava.', c: 'Ancoragens com mais de um ponto.', d: 'A proteção das cordas.' },
            answer: 'a',
            explanation: 'Braços de alavanca (que multiplicam a força) e arestas vivas (que cortam a corda) devem ser evitados a todo custo.'
        },
        {
            id: 'm58-q4',
            question: 'Por que a angulação entre pontos de ancoragem é importante?',
            options: { a: 'Ângulos menores diminuem a segurança.', b: 'A angulação não afeta a força nos pontos.', c: 'Ângulos maiores aumentam a força aplicada em cada ponto, podendo comprometer a segurança.', d: 'A angulação ideal é sempre 180 graus.' },
            answer: 'c',
            explanation: 'Quanto maior o ângulo entre os pontos, maior a força aplicada em cada um. Ângulos muito abertos são perigosos.'
        },
        {
            id: 'm58-q5',
            question: 'Qual é a resistência mínima recomendada para mosquetões usados em ancoragens de SAS?',
            options: { a: '> 5 kN.', b: '> 10 kN.', c: '> 15 kN.', d: '> 22 kN.' },
            answer: 'd',
            explanation: 'Os mosquetões devem ser superdimensionados, com resistência superior a 22 kN (Quilonewtons).'
        },
        {
            id: 'm58-q6',
            question: 'O que é um "braço de alavanca" em uma ancoragem?',
            options: { a: 'Um equipamento para içar vítimas.', b: 'Uma forma de ancoragem que reduz a força nos pontos.', c: 'Uma forma de ancoragem que multiplica a força aplicada no ponto, aumentando o risco.', d: 'Um tipo de nó.' },
            answer: 'c',
            explanation: 'É quando a ancoragem é feita longe da base da estrutura, criando uma alavanca que multiplica a força e aumenta o risco de falha.'
        },
        {
            id: 'm58-q7',
            question: 'Em uma "Ancoragem em linha - Tradicional", qual ponto está mais próximo do objetivo?',
            options: { a: 'O ponto principal.', b: 'O ponto secundário.', c: 'Ambos estão na mesma distância.', d: 'Não importa a distância.' },
            answer: 'a',
            explanation: 'Na ancoragem Tradicional, o ponto principal está mais próximo do objetivo (local da descida).'
        },
        {
            id: 'm58-q8',
            question: 'Em uma "Ancoragem em linha - Contraposta", qual ponto está mais próximo do objetivo?',
            options: { a: 'O ponto principal.', b: 'O ponto secundário.', c: 'Ambos estão na mesma distância.', d: 'Não importa a distância.' },
            answer: 'b',
            explanation: 'Na ancoragem Contraposta, o ponto secundário (de "contra-força") está mais próximo do objetivo.'
        },
        {
            id: 'm58-q9',
            question: 'Para que servem as proteções de arestas vivas?',
            options: { a: 'Para proteger as mãos do socorrista.', b: 'Para proteger a vítima.', c: 'Para proteger as cordas contra abrasão e corte.', d: 'Para proteger a estrutura do prédio.' },
            answer: 'c',
            explanation: 'Arestas vivas (quinas) podem cortar a corda sob tensão. Proteções (fitas, etc.) são usadas para evitar a abrasão.'
        },
        {
            id: 'm58-q10',
            question: 'O que é uma ancoragem distribuída "equalizada"?',
            options: { a: 'Possui um ponto de descida fixo, definido na montagem.', b: 'Permite ajustar o ponto de descida lateralmente.', c: 'Usa apenas um ponto de ancoragem.', d: 'Usa apenas fitas.' },
            answer: 'a',
            explanation: 'A ancoragem equalizada (ou estática) distribui o peso, mas o ponto de descida é fixo.'
        },
        {
            id: 'm58-q11',
            question: 'O que é uma ancoragem distribuída "equalizável"?',
            options: { a: 'Possui um ponto de descida fixo.', b: 'Permite ajustar o ponto de descida, oferecendo mobilidade.', c: 'Usa apenas um ponto de ancoragem.', d: 'É mais fraca que a equalizada.' },
            answer: 'b',
            explanation: 'A ancoragem equalizável (ou dinâmica) permite que o ponto de descida se mova lateralmente, mantendo a distribuição de força.'
        },
        {
            id: 'm58-q12',
            question: 'Onde a ancoragem deve ser feita preferencialmente?',
            options: { a: 'Longe do local da descida.', b: 'Em um ponto baixo, longe da borda.', c: 'Diretamente sobre o local de descida.', d: 'Em qualquer estrutura metálica.' },
            answer: 'c',
            explanation: 'Deve-se ancorar diretamente sobre o local de descida para evitar pêndulos perigosos.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
/* === module5-quiz.js === */
var questionBank = {
    'module5': [
        {
            id: 'm5-q1',
            question: 'A perda parcial ou total da audição, que afeta a capacidade de ouvir sons, é chamada de:',
            options: { a: 'Deficiência Visual.', b: 'Deficiência Auditiva.', c: 'Deficiência Intelectual.', d: 'Deficiência Física.' },
            answer: 'b',
            explanation: 'A Deficiência Auditiva é a perda parcial ou total da audição.'
        },
        {
            id: 'm5-q2',
            question: 'Quando uma pessoa possui a combinação de dois ou mais tipos de deficiência, como visual e física, isso é classificado como:',
            options: { a: 'Deficiência Intelectual.', b: 'Deficiência Grave.', c: 'Deficiência Combinada.', d: 'Deficiência Múltipla.' },
            answer: 'd',
            explanation: 'Deficiência Múltipla é a combinação de dois ou mais tipos de deficiência.'
        },
        {
            id: 'm5-q3',
            question: 'Uma pessoa que utiliza cadeira de rodas para se locomover possui que tipo de deficiência?',
            options: { a: 'Deficiência Física.', b: 'Deficiência Múltipla.', c: 'Deficiência Intelectual.', d: 'Deficiência Auditiva.' },
            answer: 'a',
            explanation: 'A Deficiência Física é a limitação no movimento ou na estrutura do corpo que afeta a mobilidade.'
        },
        {
            id: 'm5-q4',
            question: 'A limitação que afeta áreas como aprendizado, memória e raciocínio é característica da:',
            options: { a: 'Deficiência Visual.', b: 'Deficiência Física.', c: 'Deficiência Intelectual.', d: 'Deficiência Auditiva.' },
            answer: 'c',
            explanation: 'A Deficiência Intelectual é a limitação no funcionamento intelectual (aprendizado, memória).'
        },
        {
            id: 'm5-q5',
            question: 'O que é Deficiência Visual?',
            options: { a: 'A perda parcial ou total da audição.', b: 'A limitação no movimento do corpo.', c: 'A perda parcial ou total da visão.', d: 'A limitação no aprendizado.' },
            answer: 'c',
            explanation: 'A Deficiência Visual é a perda parcial ou total da visão, variando de baixa visão à cegueira.'
        },
        {
            id: 'm5-q6',
            question: 'Uma pessoa cega que usa bengala é um exemplo de qual tipo de deficiência?',
            options: { a: 'Física.', b: 'Visual.', c: 'Auditiva.', d: 'Múltipla.' },
            answer: 'b',
            explanation: 'A cegueira é um tipo de Deficiência Visual.'
        },
        {
            id: 'm5-q7',
            question: 'Qual é a definição de Deficiência Física?',
            options: { a: 'Limitação no funcionamento intelectual.', b: 'Perda total da visão.', c: 'Perda total da audição.', d: 'Limitação no movimento ou estrutura do corpo.' },
            answer: 'd',
            explanation: 'É a limitação no movimento ou na estrutura do corpo, afetando a mobilidade ou coordenação.'
        },
        {
            id: 'm5-q8',
            question: 'Uma pessoa surda que se comunica por Libras é um exemplo de qual deficiência?',
            options: { a: 'Visual.', b: 'Física.', c: 'Intelectual.', d: 'Auditiva.' },
            answer: 'd',
            explanation: 'A surdez é um tipo de Deficiência Auditiva.'
        },
        {
            id: 'm5-q9',
            question: 'O que caracteriza a Deficiência Intelectual?',
            options: { a: 'Dificuldade de locomoção.', b: 'Dificuldade de enxergar.', c: 'Limitação no funcionamento intelectual, aprendizado e raciocínio.', d: 'Dificuldade de ouvir.' },
            answer: 'c',
            explanation: 'Afeta áreas como aprendizado, memória e raciocínio.'
        },
        {
            id: 'm5-q10',
            question: 'Se uma pessoa possui Deficiência Física e também Deficiência Auditiva, ela é classificada como tendo:',
            options: { a: 'Deficiência Intelectual.', b: 'Deficiência Múltipla.', c: 'Deficiência Visual Grave.', d: 'Deficiência Física Grave.' },
            answer: 'b',
            explanation: 'A Deficiência Múltipla é a combinação de duas ou mais deficiências.'
        },
        {
            id: 'm5-q11',
            question: 'Qual tipo de deficiência exige apoios mais variados e personalizados?',
            options: { a: 'Deficiência Física.', b: 'Deficiência Múltipla.', c: 'Deficiência Intelectual.', d: 'Deficiência Visual.' },
            answer: 'b',
            explanation: 'A Deficiência Múltipla, por ser a combinação de várias, exige apoios mais personalizados.'
        },
        {
            id: 'm5-q12',
            question: 'A perda da mobilidade nas pernas (paraplegia) é um exemplo de qual deficiência?',
            options: { a: 'Física.', b: 'Intelectual.', c: 'Auditiva.', d: 'Múltipla.' },
            answer: 'a',
            explanation: 'A paraplegia afeta a mobilidade e a estrutura do corpo, sendo uma Deficiência Física.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
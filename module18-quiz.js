/* === module18-quiz.js === */
var questionBank = {
    'module18': [
        {
            id: 'm18-q1',
            question: 'Qual é o ponto de temperatura em que um combustível entra em combustão ESPONTANEAMENTE, sem fonte externa?',
            options: { a: 'Ponto de Fulgor.', b: 'Ponto de Combustão.', c: 'Ponto de Ignição.', d: 'Ponto Crítico.' },
            answer: 'c',
            explanation: 'Ponto de Ignição é a temperatura em que o material queima espontaneamente, sem uma faísca.'
        },
        {
            id: 'm18-q2',
            question: 'Quando o calor de um incêndio atravessa uma viga de metal e inicia fogo do outro lado, qual método de propagação ocorreu?',
            options: { a: 'Irradiação.', b: 'Condução.', c: 'Convecção.', d: 'Explosão.' },
            answer: 'b',
            explanation: 'Condução é a transferência de calor por contato direto através de um material (como o metal).'
        },
        {
            id: 'm18-q3',
            question: 'A temperatura mínima na qual um líquido libera vapores que se inflamam, mas a chama NÃO se sustenta, é o:',
            options: { a: 'Ponto de Fulgor.', b: 'Ponto de Combustão.', c: 'Ponto de Ignição.', d: 'Ponto de Ebulição.' },
            answer: 'a',
            explanation: 'Ponto de Fulgor: os vapores se inflamam, mas a chama apaga pois a taxa de vaporização é baixa.'
        },
        {
            id: 'm18-q4',
            question: 'A fumaça quente de um incêndio sobe e inicia fogo no andar de cima. Este é um exemplo de propagação por:',
            options: { a: 'Condução.', b: 'Irradiação.', c: 'Convecção.', d: 'Ignição.' },
            answer: 'c',
            explanation: 'Convecção é a transferência de calor por massas de ar e fumaça aquecida, que sobem.'
        },
        {
            id: 'm18-q5',
            question: 'Qual ponto é atingido quando os vapores se inflamam com uma fonte externa e a chama SE MANTÉM?',
            options: { a: 'Ponto de Fulgor.', b: 'Ponto de Combustão.', c: 'Ponto de Ignição.', d: 'Ponto de Ebulição.' },
            answer: 'b',
            explanation: 'Ponto de Combustão: a chama se mantém pois a taxa de vaporização é suficiente.'
        },
        {
            id: 'm18-q6',
            question: 'Sentir o calor de uma fogueira no rosto, mesmo estando a metros de distância, é um exemplo de:',
            options: { a: 'Condução.', b: 'Convecção.', c: 'Irradiação.', d: 'Ponto de Fulgor.' },
            answer: 'c',
            explanation: 'Irradiação é a transferência de calor por ondas, sem necessidade de contato físico.'
        },
        {
            id: 'm18-q7',
            question: 'Qual dos três pontos de inflamabilidade possui a MAIOR temperatura?',
            options: { a: 'Ponto de Fulgor.', b: 'Ponto de Combustão.', c: 'Ponto de Ignição.', d: 'São todos iguais.' },
            answer: 'c',
            explanation: 'O Ponto de Ignição é a temperatura mais alta, pois não precisa de fonte externa.'
        },
        {
            id: 'm18-q8',
            question: 'Qual método de propagação de calor NÃO precisa de um meio material (contato ou ar) para ocorrer?',
            options: { a: 'Condução.', b: 'Convecção.', c: 'Irradiação.', d: 'Todos precisam.' },
            answer: 'c',
            explanation: 'A Irradiação (ondas de calor) pode viajar através do vácuo (como o calor do Sol).'
        },
        {
            id: 'm18-q9',
            question: 'Aquecer uma barra de ferro em uma ponta e a outra ponta esquentar é um exemplo de:',
            options: { a: 'Condução.', b: 'Convecção.', c: 'Irradiação.', d: 'Ponto de Combustão.' },
            answer: 'a',
            explanation: 'Condução é a transferência de calor através de um sólido (contato direto molécula a molécula).'
        },
        {
            id: 'm18-q10',
            question: 'O ar quente de um ar-condicionado subindo para o teto é um exemplo de:',
            options: { a: 'Condução.', b: 'Convecção.', c: 'Irradiação.', d: 'Ponto de Ignição.' },
            answer: 'b',
            explanation: 'Convecção é o movimento de fluidos (ar ou líquidos) quentes, que sobem por serem menos densos.'
        },
        {
            id: 'm18-q11',
            question: 'Qual ponto de inflamabilidade é o mais baixo (ocorre primeiro)?',
            options: { a: 'Ponto de Fulgor.', b: 'Ponto de Combustão.', c: 'Ponto de Ignição.', d: 'Ponto de Ebulição.' },
            answer: 'a',
            explanation: 'O Ponto de Fulgor é a temperatura mínima para liberar os primeiros vapores inflamáveis.'
        },
        {
            id: 'm18-q12',
            question: 'Para qual método de propagação a fumaça é o principal veículo?',
            options: { a: 'Condução.', b: 'Convecção.', c: 'Irradiação.', d: 'Ignição.' },
            answer: 'b',
            explanation: 'A Convecção move o calor através de massas de ar e fumaça aquecida.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
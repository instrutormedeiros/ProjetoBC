/* === module12-quiz.js === */
var questionBank = {
    'module12': [
        {
            id: 'm12-q1',
            question: 'A retirada de uma vítima do local do acidente para um local seguro corresponde a qual fase do salvamento?',
            options: { a: 'Busca.', b: 'Resgate.', c: 'Abrigo.', d: 'Reconhecimento.' },
            answer: 'b',
            explanation: 'Resgate é a fase de retirada da vítima do local do incidente para um local seguro.'
        },
        {
            id: 'm12-q2',
            question: 'Um resgate em um prédio utilizando cordas e pontos de ancoragem é classificado como:',
            options: { a: 'Aéreo.', b: 'Terrestre.', c: 'Vertical.', d: 'Aquático.' },
            answer: 'c',
            explanation: 'Salvamento Vertical é realizado em altura, usando técnicas de rapel e ancoragem.'
        },
        {
            id: 'm12-q3',
            question: 'A fase de procurar por uma vítima em uma estrutura colapsada é chamada de:',
            options: { a: 'Busca.', b: 'Resgate.', c: 'Salvamento Aéreo.', d: 'Salvamento Vertical.' },
            answer: 'a',
            explanation: 'Busca é a fase em que se procura por algo ou alguém que precisa ser salvo.'
        },
        {
            id: 'm12-q4',
            question: 'O salvamento de um afogado em um rio é classificado como:',
            options: { a: 'Terrestre.', b: 'Vertical.', c: 'Aéreo.', d: 'Aquático.' },
            answer: 'd',
            explanation: 'Salvamento Aquático é realizado em meio líquido (rios, lagos, mar).'
        },
        {
            id: 'm12-q5',
            question: 'Quais são as duas fases principais do salvamento?',
            options: { a: 'Busca e Resgate.', b: 'Aéreo e Terrestre.', c: 'Vertical e Aquático.', d: 'Aviso e Abrigo.' },
            answer: 'a',
            explanation: 'O processo de salvamento é dividido nas fases de Busca (procurar) e Resgate (retirar).'
        },
        {
            id: 'm12-q6',
            question: 'Um resgate que utiliza um helicóptero é classificado como:',
            options: { a: 'Aéreo.', b: 'Vertical.', c: 'Terrestre.', d: 'Aquático.' },
            answer: 'a',
            explanation: 'Salvamento Aéreo é realizado com o uso ou auxílio de aeronaves.'
        },
        {
            id: 'm12-q7',
            question: 'O que define o Salvamento Terrestre?',
            options: { a: 'O uso de helicópteros.', b: 'O uso de cordas em prédios.', c: 'Ocorre em contato direto com o solo.', d: 'Ocorre em rios ou lagos.' },
            answer: 'c',
            explanation: 'Salvamento Terrestre ocorre em contato direto com o solo.'
        },
        {
            id: 'm12-q8',
            question: 'O que define o Salvamento Vertical?',
            options: { a: 'É feito em rios com correnteza.', b: 'É feito com drones.', c: 'É feito em contato com o solo.', d: 'É realizado em altura, com técnicas de rapel e ancoragem.' },
            answer: 'd',
            explanation: 'O Salvamento Vertical é específico para operações em altura (planos verticais, inclinados).'
        },
        {
            id: 'm12-q9',
            question: 'Qual dos seguintes NÃO é um tipo de classificação de salvamento?',
            options: { a: 'Aéreo.', b: 'Vertical.', c: 'Terrestre.', d: 'Rápido.' },
            answer: 'd',
            explanation: 'As classificações de salvamento quanto ao ambiente são: Aéreo, Vertical, Terrestre e Aquático.'
        },
        {
            id: 'm12-q10',
            question: 'O uso de drones para localizar uma vítima se enquadra em qual classificação?',
            options: { a: 'Aéreo.', b: 'Vertical.', c: 'Terrestre.', d: 'Aquático.' },
            answer: 'a',
            explanation: 'O salvamento aéreo é feito com auxílio de aeronaves, o que inclui drones.'
        },
        {
            id: 'm12-q11',
            question: 'Resgatar alguém de um carro acidentado na estrada é um salvamento:',
            options: { a: 'Aéreo.', b: 'Vertical.', c: 'Terrestre.', d: 'Aquático.' },
            answer: 'c',
            explanation: 'O resgate em um acidente de carro no solo é um salvamento terrestre.'
        },
        {
            id: 'm12-q12',
            question: 'A fase de "Resgate" começa quando:',
            options: { a: 'A vítima é encontrada.', b: 'A equipe chega ao local.', c: 'O CBMDF é acionado.', d: 'A vítima chega ao hospital.' },
            answer: 'a',
            explanation: 'O Resgate (retirada) começa após a Busca (procura) ser bem-sucedida e a vítima ser encontrada.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
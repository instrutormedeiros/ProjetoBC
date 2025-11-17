/* === module57-quiz.js === */
var questionBank = {
    'module57': [
        {
            id: 'm57-q1',
            question: 'Qual é o nó mais indicado para encordoamento (se conectar à corda), por ser revisável e ter perda de resistência moderada?',
            options: { a: 'Nó Fiel.', b: 'Azelha simples.', c: 'Prússico.', d: 'Azelha em oito (oito duplo).' },
            answer: 'd',
            explanation: 'A Azelha em oito (ou oito duplo / oito guiado) é o nó padrão para encordoamento (fixação na cadeirinha).'
        },
        {
            id: 'm57-q2',
            question: 'Para que serve o nó Pescador Duplo?',
            options: { a: 'Une cabos (cordas) com nós contrapostos.', b: 'Para fixar a corda em uma ancoragem.', c: 'Para unir fitas.', d: 'É um nó autoblocante para subidas.' },
            answer: 'a',
            explanation: 'O Pescador Duplo é um nó de união, usado para juntar duas cordas de forma segura.'
        },
        {
            id: 'm57-q3',
            question: 'O que caracteriza o nó Valdotan?',
            options: { a: 'É um nó de união para cordas de diâmetros diferentes.', b: 'É o nó mais fácil de desatar sob tensão.', c: 'Sete voltas, usado em descensão em cordas tensionadas para auto-resgate.', d: 'Tem a menor perda de resistência entre todos os nós.' },
            answer: 'c',
            explanation: 'O Valdotan (ou VT) é um nó autoblocante usado em auto-resgate, composto por sete voltas.'
        },
        {
            id: 'm57-q4',
            question: 'Por que o nó dinâmico UIAA (meio-fiel) é eficaz?',
            options: { a: 'Porque não desliza em nenhuma circunstância.', b: 'Oferece grande capacidade de frenagem e segurança, ideal para uso com mosquetões HMS.', c: 'É o nó mais rápido para fazer e desatar.', d: 'Porque une fitas com segurança máxima.' },
            answer: 'b',
            explanation: 'O UIAA (ou meio-fiel) é um nó deslizante que usa o atrito no mosquetão (HMS) para frear, sendo um nó de segurança.'
        },
        {
            id: 'm57-q5',
            question: 'Qual é o único nó usado para unir FITAS?',
            options: { a: 'Pescador Duplo.', b: 'Azelha em Oito.', c: 'Nó de Fita.', d: 'Fiel.' },
            answer: 'c',
            explanation: 'O Nó de Fita é o único nó seguro para unir as pontas de fitas tubulares ou planas.'
        },
        {
            id: 'm57-q6',
            question: 'O que é um nó "autoblocante"?',
            options: { a: 'Um nó que não pode ser desfeito.', b: 'Um nó que trava sob carga em um sentido, usado para subir.', c: 'Um nó que une duas cordas.', d: 'Um nó de ancoragem.' },
            answer: 'b',
            explanation: 'Nós autoblocantes (Prússico, Machard, Valdotan) travam na corda quando recebem carga, permitindo subidas.'
        },
        {
            id: 'm57-q7',
            question: 'Qual nó de ancoragem é fácil de fazer, mas MUITO difícil de desatar após receber tensão (carga)?',
            options: { a: 'Azelha em Oito.', b: 'Azelha Simples.', c: 'Fiel.', d: 'Azelha em Nove.' },
            answer: 'b',
            explanation: 'A Azelha Simples "aperta" muito sob tensão, tornando-se quase impossível de desatar.'
        },
        {
            id: 'm57-q8',
            question: 'Qual nó autoblocante é feito com três voltas e "aperta" muito a corda?',
            options: { a: 'Prússico.', b: 'Machard.', c: 'Valdotan.', d: 'Fiel.' },
            answer: 'a',
            explanation: 'O Prússico é o nó autoblocante clássico de três voltas.'
        },
        {
            id: 'm57-q9',
            question: 'O que significa "Azelha em oito duplo-alçado (orelha de coelho)"?',
            options: { a: 'Um nó com duas alças.', b: 'Um nó para duas cordas.', c: 'Um nó para unir fitas.', d: 'Um nó de parada.' },
            answer: 'a',
            explanation: 'É um nó que cria duas alças (orelhas), usado para equalizar ancoragens (SAS).'
        },
        {
            id: 'm57-q10',
            question: 'O que é o nó "Oito simples"?',
            options: { a: 'Um nó de ancoragem.', b: 'Um nó de união.', c: 'Um nó de parada (volume na extremidade da corda).', d: 'Um nó autoblocante.' },
            answer: 'c',
            explanation: 'O Oito Simples é um nó de parada, usado no final da corda para evitar que ela passe por um descensor.'
        },
        {
            id: 'm57-q11',
            question: 'Para que serve o nó "Oito duplo guiado"?',
            options: { a: 'Para unir duas cordas de diâmetros diferentes.', b: 'Para criar uma alça fixa e segura na extremidade da corda (para ancoragem).', c: 'Para deslizar na corda.', d: 'Para fazer um nó de parada.' },
            answer: 'b',
            explanation: 'O Oito Duplo Guiado (ou Azelha em Oito) cria uma alça fixa (uma azelha) na ponta da corda.'
        },
        {
            id: 'm57-q12',
            question: 'O nó "Fiel" é um nó de ancoragem que...',
            options: { a: 'Nunca desliza.', b: 'É difícil de desatar.', c: 'Desliza sob cargas acima de 400 kg.', d: 'É usado para unir cordas.' },
            answer: 'c',
            explanation: 'O nó Fiel é eficaz e rápido, mas tem a desvantagem de deslizar sob cargas muito altas (>400 kg).'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
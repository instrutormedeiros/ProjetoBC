/* === module11-quiz.js === */
var questionBank = {
    'module11': [
        {
            id: 'm11-q1',
            question: 'Se um bombeiro diz "QSL" no rádio, o que ele quer dizer?',
            options: { a: 'Qual o seu endereço?', b: 'Estou à disposição.', c: 'Entendido.', d: 'Aguarde.' },
            answer: 'c',
            explanation: 'QSL é o código internacional para "Entendido" ou "Confirmado".'
        },
        {
            id: 'm11-q2',
            question: 'Como se soletra a letra "T" no alfabeto fonético?',
            options: { a: 'Titã.', b: 'Tango.', c: 'Trovão.', d: 'Tigre.' },
            answer: 'b',
            explanation: 'No Alfabeto Fonético Internacional, T = Tango.'
        },
        {
            id: 'm11-q3',
            question: 'Para perguntar a localização de outra viatura, qual código Q você usaria?',
            options: { a: 'QTH.', b: 'QAP.', c: 'QRV.', d: 'QSL.' },
            answer: 'a',
            explanation: 'QTH significa "Qual seu endereço/localização?".'
        },
        {
            id: 'm11-q4',
            question: 'No alfabeto fonético, "Mike" corresponde a qual letra?',
            options: { a: 'L.', b: 'N.', c: 'M.', d: 'P.' },
            answer: 'c',
            explanation: 'No Alfabeto Fonético Internacional, M = Mike.'
        },
        {
            id: 'm11-q5',
            question: 'O que significa o código "QAP"?',
            options: { a: 'Aguarde.', b: 'Repita a mensagem.', c: 'Estou na escuta.', d: 'Qual é o seu nome?' },
            answer: 'c',
            explanation: 'QAP é um dos códigos mais comuns, significando "Estou na escuta" ou "Permanecer na escuta".'
        },
        {
            id: 'm11-q6',
            question: 'Qual código Q é usado para pedir para "Aguardar"?',
            options: { a: 'QRV.', b: 'QRL.', c: 'QTH.', d: 'QRX.' },
            answer: 'd',
            explanation: 'QRX significa "Aguarde um momento".'
        },
        {
            id: 'm11-q7',
            question: 'Para que serve o Alfabeto Fonético?',
            options: { a: 'Para falar em código secreto.', b: 'Para soletrar palavras sem erros ou ambiguidades.', c: 'Para se comunicar mais rápido.', d: 'Apenas para uso militar.' },
            answer: 'b',
            explanation: 'O Alfabeto Fonético é usado para soletrar (ex: placas, nomes) de forma clara, evitando confusão entre letras com sons parecidos (como P e B).'
        },
        {
            id: 'm11-q8',
            question: 'O que significa "QRV"?',
            options: { a: 'Estou à disposição.', b: 'Problema.', c: 'Mensagem.', d: 'Hora certa.' },
            answer: 'a',
            explanation: 'QRV significa "Estou à sua disposição".'
        },
        {
            id: 'm11-q9',
            question: 'No alfabeto fonético, "VICTOR" e "ZULU" correspondem a quais letras?',
            options: { a: 'V e S.', b: 'F e Z.', c: 'V e Z.', d: 'V e X.' },
            answer: 'c',
            explanation: 'V = VICTOR e Z = ZULU.'
        },
        {
            id: 'm11-q10',
            question: 'Se você não entendeu uma mensagem, qual código Q você usa?',
            options: { a: 'QSL.', b: 'QSM.', c: 'QRU.', d: 'QTC.' },
            answer: 'b',
            explanation: 'QSM significa "Repita a mensagem".'
        },
        {
            id: 'm11-q11',
            question: 'O que significa "QRA"?',
            options: { a: 'Nome da pessoa.', b: 'Endereço.', c: 'Refeição.', d: 'Problema.' },
            answer: 'a',
            explanation: 'QRA é usado para perguntar ou informar o nome da pessoa ou da estação.'
        },
        {
            id: 'm11-q12',
            question: 'O que significa a sigla "VTR"?',
            options: { a: 'Vítima.', b: 'Viatura (carro).', c: 'Voltando.', d: 'Término do Resgate.' },
            answer: 'b',
            explanation: 'VTR é a sigla comum para "Viatura".'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
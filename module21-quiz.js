/* === module21-quiz.js === */
var questionBank = {
    'module21': [
        {
            id: 'm21-q1',
            question: 'Um incêndio causado pela queda de um raio é classificado como de causa:',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Indeterminada.' },
            answer: 'a',
            explanation: 'Causas Naturais ocorrem sem intervenção humana, como raios, vulcões, etc.'
        },
        {
            id: 'm21-q2',
            question: 'Um curto-circuito em uma fiação elétrica que inicia um incêndio é um exemplo de causa:',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Intencional.' },
            answer: 'b',
            explanation: 'Causas Acidentais ocorrem por descuidos, falhas ou acidentes, sem intenção.'
        },
        {
            id: 'm21-q3',
            question: 'Qual tipo de causa envolve a intenção de provocar o fogo para causar dano?',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Espontânea.' },
            answer: 'c',
            explanation: 'Causas Criminosas são incêndios provocados de propósito (intencionais).'
        },
        {
            id: 'm21-q4',
            question: 'Deixar uma panela no fogo e esquecer, causando um incêndio na cozinha, é um exemplo de causa:',
            options: { a: 'Acidental.', b: 'Natural.', c: 'Criminosa.', d: 'Vulcânica.' },
            answer: 'a',
            explanation: 'Esquecer algo no fogo é um descuido, portanto, uma causa Acidental.'
        },
        {
            id: 'm21-q5',
            question: 'Um incêndio iniciado por um vazamento de gás é classificado como:',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Espontânea.' },
            answer: 'b',
            explanation: 'Falhas em equipamentos, como vazamento de gás, são causas Acidentais.'
        },
        {
            id: 'm21-q6',
            question: 'Um incêndio causado por uma erupção vulcânica é de qual tipo?',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Indeterminada.' },
            answer: 'a',
            explanation: 'Fenômenos da natureza, como erupções vulcânicas, são Causas Naturais.'
        },
        {
            id: 'm21-q7',
            question: 'Um incêndio provocado por "vingança" ou "fraude em seguro" é de causa:',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Psicológica.' },
            answer: 'c',
            explanation: 'Incêndios provocados intencionalmente são classificados como Criminosos.'
        },
        {
            id: 'm21-q8',
            question: 'Faíscas de uma máquina de solda que causam um incêndio são um exemplo de causa:',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Controlada.' },
            answer: 'b',
            explanation: 'Este é um acidente ocorrido durante uma atividade humana, sendo uma causa Acidental.'
        },
        {
            id: 'm21-q9',
            question: 'Quais são as três principais classificações para as causas de incêndio?',
            options: { a: 'Elétrica, Química e Física.', b: 'Natural, Acidental e Criminosa.', c: 'Pequena, Média e Grande.', d: 'Humana, Animal e Natural.' },
            answer: 'b',
            explanation: 'As três classificações de acordo com a origem são: Naturais, Acidentais e Criminosas.'
        },
        {
            id: 'm21-q10',
            question: 'Superaquecimento de equipamentos eletrônicos que inicia um fogo é uma causa:',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Normal.' },
            answer: 'b',
            explanation: 'Falha ou superaquecimento de equipamentos é uma causa Acidental.'
        },
        {
            id: 'm21-q11',
            question: 'Qual causa de incêndio NÃO envolve a ação do homem?',
            options: { a: 'Causas Naturais.', b: 'Causas Acidentais.', c: 'Causas Criminosas.', d: 'Todas envolvem.' },
            answer: 'a',
            explanation: 'Causas Naturais (raios, vulcões) são as únicas que ocorrem sem intervenção humana.'
        },
        {
            id: 'm21-q12',
            question: 'Incêndios por "motivos psicológicos" se enquadram em qual categoria?',
            options: { a: 'Natural.', b: 'Acidental.', c: 'Criminosa.', d: 'Indeterminada.' },
            answer: 'c',
            explanation: 'Mesmo que por motivos psicológicos, o ato de iniciar o fogo é intencional, sendo uma causa Criminosa.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
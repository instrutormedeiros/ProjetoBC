/* === module16-quiz.js === */
var questionBank = {
    'module16': [
        {
            id: 'm16-q1',
            question: 'Qual norma regulamentadora trata das medidas de proteção contra incêndio?',
            options: { a: 'NR-23.', b: 'NR-10.', c: 'NR-35.', d: 'NR-01.' },
            answer: 'a',
            explanation: 'A NR-23 (Proteção Contra Incêndios) estabelece as medidas obrigatórias para os locais de trabalho.'
        },
        {
            id: 'm16-q2',
            question: 'Qual a definição correta de "incêndio"?',
            options: { a: 'Uma reação de combustão controlada.', b: 'O fogo que foge ao controle humano.', c: 'Qualquer chama visível.', d: 'O calor gerado por uma reação química.' },
            answer: 'b',
            explanation: 'Incêndio é o fogo que foge ao controle, causando danos e riscos.'
        },
        {
            id: 'm16-q3',
            question: 'A chama de um isqueiro, usada para acender uma vela, é um exemplo de:',
            options: { a: 'Incêndio.', b: 'Combustão espontânea.', c: 'Fogo.', d: 'Princípio de incêndio.' },
            answer: 'c',
            explanation: 'Fogo é uma reação de combustão controlada, usada como ferramenta.'
        },
        {
            id: 'm16-q4',
            question: 'Qual dos itens abaixo NÃO é uma exigência da NR-23 para locais de trabalho?',
            options: { a: 'Proteção contra incêndio.', b: 'Pessoal treinado.', c: 'Saídas de emergência.', d: 'Brigada de incêndio particular em todos os locais.' },
            answer: 'd',
            explanation: 'A NR-23 exige "pessoal treinado", mas não uma brigada particular em *todos* os locais (isso depende do tamanho e risco).'
        },
        {
            id: 'm16-q5',
            question: 'O que significa PCI?',
            options: { a: 'Plano de Controle de Incidentes.', b: 'Prevenção e Combate a Incêndio.', c: 'Primeiros Cuidados Imediatos.', d: 'Proteção Coletiva de Indivíduos.' },
            answer: 'b',
            explanation: 'PCI é a sigla para Prevenção e Combate a Incêndio.'
        },
        {
            id: 'm16-q6',
            question: 'A diferença entre fogo e incêndio é principalmente o:',
            options: { a: 'Tamanho.', b: 'Controle.', c: 'Calor.', d: 'Material.' },
            answer: 'b',
            explanation: 'Fogo é controlado; incêndio está fora de controle.'
        },
        {
            id: 'm16-q7',
            question: 'A NR-23 é uma norma do(a):',
            options: { a: 'ABNT.', b: 'Corpo de Bombeiros.', c: 'Ministério do Trabalho e Emprego (MTE).', d: 'Prefeitura.' },
            answer: 'c',
            explanation: 'Normas Regulamentadoras (NRs) são emitidas pelo MTE (ou órgão governamental equivalente).'
        },
        {
            id: 'm16-q8',
            question: 'O que o termo "combustão" significa?',
            options: { a: 'O mesmo que fogo.', b: 'Uma reação química de oxidação rápida que libera calor.', c: 'O mesmo que incêndio.', d: 'Apenas a presença de fumaça.' },
            answer: 'b',
            explanation: 'Combustão é a reação química que produz o fogo.'
        },
        {
            id: 'm16-q9',
            question: 'A NR-23 exige que os locais de trabalho tenham saídas:',
            options: { a: 'Apenas uma saída principal.', b: 'Saídas de emergência suficientes.', c: 'Saídas voltadas para o norte.', d: 'Saídas com portas de vidro.' },
            answer: 'b',
            explanation: 'A norma exige "saídas de emergência suficientes" para a evacuação segura.'
        },
        {
            id: 'm16-q10',
            question: 'A chama de um fogão aceso é um exemplo de:',
            options: { a: 'Fogo.', b: 'Incêndio.', c: 'Princípio de incêndio.', d: 'Combustão incompleta.' },
            answer: 'a',
            explanation: 'Como a chama do isqueiro, a do fogão é um fogo controlado.'
        },
        {
            id: 'm16-q11',
            question: 'O estudo de PCI se baseia na compreensão de quê?',
            options: { a: 'Apenas das leis.', b: 'Apenas dos extintores.', c: 'Do fogo, seus componentes e fenômenos.', d: 'Apenas da evacuação.' },
            answer: 'c',
            explanation: 'O estudo de PCI abrange a compreensão aprofundada do fogo, seus componentes e fenômenos.'
        },
        {
            id: 'm16-q12',
            question: 'Um fogo em uma lata de lixo que foge do controle é um:',
            options: { a: 'Fogo controlado.', b: 'Incêndio.', c: 'Fenômeno normal.', d: 'Combustível.' },
            answer: 'b',
            explanation: 'No momento em que o fogo foge ao controle humano, ele é classificado como incêndio.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
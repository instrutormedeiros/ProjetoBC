/* === module19-quiz.js === */
var questionBank = {
    'module19': [
        {
            id: 'm19-q1',
            question: 'A explosão que ocorre pela entrada súbita de ar (oxigênio) em um cômodo fechado e quente é chamada de:',
            options: { a: 'Backdraft.', b: 'Flashover.', c: 'Boilover.', d: 'BLEVE.' },
            answer: 'a',
            explanation: 'Backdraft é a explosão causada pela entrada repentina de ar (comburente) em um ambiente com gases superaquecidos.'
        },
        {
            id: 'm19-q2',
            question: 'Se o fogo tomou conta de um sofá inteiro, mas ainda está restrito a ele, qual é a classificação do tipo de incêndio?',
            options: { a: 'Princípio de Incêndio.', b: 'Pequeno Incêndio.', c: 'Médio Incêndio.', d: 'Grande Incêndio.' },
            answer: 'b',
            explanation: 'Fogo em um móvel (como um sofá) é classificado como Pequeno Incêndio.'
        },
        {
            id: 'm19-q3',
            question: 'A inflamação súbita e generalizada de todos os materiais combustíveis em um ambiente é o fenômeno chamado:',
            options: { a: 'Backdraft.', b: 'Flashover.', c: 'Boilover.', d: 'Rollover.' },
            answer: 'b',
            explanation: 'Flashover é a ignição generalizada de todo o ambiente quando tudo atinge a temperatura de ignição.'
        },
        {
            id: 'm19-q4',
            question: 'Um incêndio que atinge um cômodo inteiro é classificado como de tipo:',
            options: { a: 'Pequeno.', b: 'Grande.', c: 'Médio.', d: 'Extraordinário.' },
            answer: 'c',
            explanation: 'Fogo em um cômodo inteiro é classificado como Médio Incêndio.'
        },
        {
            id: 'm19-q5',
            question: 'O que é BLEVE?',
            options: { a: 'A entrada de ar em um cômodo.', b: 'A queima dos gases no teto.', c: 'A explosão de um líquido em ebulição em um recipiente pressurizado.', d: 'Jogar água em óleo quente.' },
            answer: 'c',
            explanation: 'BLEVE é a explosão de vapor em expansão de um líquido em ebulição, tipicamente em um tanque ou botijão.'
        },
        {
            id: 'm19-q6',
            question: 'O que é Boilover?',
            options: { a: 'A queima rápida de gases no teto.', b: 'A entrada de ar em um cômodo fechado.', c: 'Quando se joga água em um tanque de líquido inflamável em chamas, e ele transborda.', d: 'A ignição de todo o cômodo ao mesmo tempo.' },
            answer: 'c',
            explanation: 'Boilover ocorre quando a água fervente no fundo do tanque expulsa o líquido inflamável.'
        },
        {
            id: 'm19-q7',
            question: 'A ignição dos gases superaquecidos acumulados no teto, que "rolam" em chamas, é chamada de:',
            options: { a: 'Flashover.', b: 'Backdraft.', c: 'Boilover.', d: 'Rollover.' },
            answer: 'd',
            explanation: 'Rollover é a queima dos gases (fumaça) que "rolam" pelo teto.'
        },
        {
            id: 'm19-q8',
            question: 'Um fogo em uma lixeira é classificado como:',
            options: { a: 'Pequeno Incêndio.', b: 'Médio Incêndio.', c: 'Princípio de Incêndio.', d: 'Incidente.' },
            answer: 'c',
            explanation: 'Fogo em objeto isolado (como uma lixeira) é um Princípio de Incêndio.'
        },
        {
            id: 'm19-q9',
            question: 'Qual fenômeno é o mais perigoso ao se abrir uma porta de um cômodo em chamas e com pouca ventilação?',
            options: { a: 'Flashover.', b: 'Backdraft.', c: 'Boilover.', d: 'Rollover.' },
            answer: 'b',
            explanation: 'O Backdraft ocorre exatamente quando o oxigênio (ar) entra em um ambiente confinado e superaquecido.'
        },
        {
            id: 'm19-q10',
            question: 'Um incêndio que toma toda a edificação é classificado como:',
            options: { a: 'Pequeno.', b: 'Médio.', c: 'Grande.', d: 'Extraordinário.' },
            answer: 'c',
            explanation: 'Fogo em toda a edificação é um Grande Incêndio.'
        },
        {
            id: 'm19-q11',
            question: 'Incêndios florestais de proporções extremas são classificados como:',
            options: { a: 'Médio.', b: 'Grande.', c: 'Extraordinário.', d: 'Incontrolável.' },
            answer: 'c',
            explanation: 'Incêndios de proporções extremas são classificados como Extraordinários.'
        },
        {
            id: 'm19-q12',
            question: 'Qual fenômeno antecede o Flashover?',
            options: { a: 'Rollover.', b: 'Backdraft.', c: 'Boilover.', d: 'BLEVE.' },
            answer: 'a',
            explanation: 'O Rollover (queima dos gases no teto) aquece o ambiente rapidamente, levando ao Flashover (ignição generalizada).'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
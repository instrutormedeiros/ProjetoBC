/* === module9-quiz.js === */
var questionBank = {
    'module9': [
        {
            id: 'm9-q1',
            question: 'Fazer rondas periódicas, inspecionar extintores e treinar a população são exemplos de:',
            options: { a: 'Ações de Emergência.', b: 'Ações do CBMDF.', c: 'Ações Burocráticas.', d: 'Ações de Prevenção.' },
            answer: 'd',
            explanation: 'Estas são Ações de Prevenção, feitas no dia a dia para evitar que emergências ocorram.'
        },
        {
            id: 'm9-q2',
            question: 'Qual é a primeira medida a ser tomada pela brigada ao identificar uma situação de emergência?',
            options: { a: 'Acionar o CBMDF imediatamente.', b: 'Tentar apagar o fogo sozinho.', c: 'Retirar materiais de valor do local.', d: 'Esperar para ver se o alarme dispara.' },
            answer: 'a',
            explanation: 'A identificação da situação e o acionamento do CBMDF são as primeiras ações de emergência.'
        },
        {
            id: 'm9-q3',
            question: 'Qual das seguintes NÃO é uma ação de prevenção da brigada?',
            options: { a: 'Inspecionar saídas de emergência.', b: 'Elaborar relatórios de irregularidades.', c: 'Fornecer informações ao CBMDF na sua chegada.', d: 'Realizar simulados de abandono.' },
            answer: 'c',
            explanation: 'Fornecer informações ao CBMDF é uma Ação de Emergência, realizada após a chegada do socorro.'
        },
        {
            id: 'm9-q4',
            question: 'Durante uma emergência, qual ação a brigada deve tomar em relação aos recursos do local?',
            options: { a: 'Aguardar o CBMDF para usar os extintores.', b: 'Combater o fogo em sua fase inicial com os equipamentos disponíveis.', c: 'Proteger os equipamentos para que não sejam danificados.', d: 'Evitar o uso das mangueiras para não gastar água.' },
            answer: 'b',
            explanation: 'A brigada é treinada para combater o fogo em sua fase inicial com os recursos do local.'
        },
        {
            id: 'm9-q5',
            question: 'Elaborar relatórios sobre irregularidades e riscos é uma ação de:',
            options: { a: 'Prevenção.', b: 'Emergência.', c: 'Pós-emergência.', d: 'Exclusiva do CBMDF.' },
            answer: 'a',
            explanation: 'Relatórios de inspeção e riscos são Ações de Prevenção, feitas rotineiramente.'
        },
        {
            id: 'm9-q6',
            question: 'Prestar os primeiros socorros a feridos é uma Ação de:',
            options: { a: 'Prevenção.', b: 'Emergência.', c: 'Avaliação.', d: 'Exclusiva do Supervisor.' },
            answer: 'b',
            explanation: 'O atendimento a feridos ocorre durante a Ação de Emergência.'
        },
        {
            id: 'm9-q7',
            question: 'Qual o objetivo de treinar os ocupantes do prédio com simulados?',
            options: { a: 'Cumprir uma formalidade.', b: 'É uma Ação de Emergência.', c: 'É uma Ação de Prevenção para garantir um abandono seguro.', d: 'Substituir o CBMDF.' },
            answer: 'c',
            explanation: 'Simulados são Ações de Prevenção para treinar os ocupantes para um abandono real.'
        },
        {
            id: 'm9-q8',
            question: 'Cortar o fornecimento de energia e gás durante um incêndio é uma Ação de:',
            options: { a: 'Prevenção.', b: 'Emergência.', c: 'Manutenção.', d: 'Investigação.' },
            answer: 'b',
            explanation: 'Esta é uma Ação de Emergência para evitar riscos adicionais, como explosões ou choques elétricos.'
        },
        {
            id: 'm9-q9',
            question: 'Identificar a situação e acionar o CBMDF são ações de:',
            options: { a: 'Prevenção.', b: 'Emergência.', c: 'Pós-Incidente.', d: 'Treinamento.' },
            answer: 'b',
            explanation: 'Estas são as primeiras e mais cruciais Ações de Emergência.'
        },
        {
            id: 'm9-q10',
            question: 'Implementar e manter o PPCI atualizado é uma atribuição de:',
            options: { a: 'Prevenção.', b: 'Emergência.', c: 'Apenas do CBMDF.', d: 'Apenas do Chefe de Brigada.' },
            answer: 'a',
            explanation: 'Manter o PPCI é uma tarefa contínua de Prevenção, liderada pelo Supervisor.'
        },
        {
            id: 'm9-q11',
            question: 'Auxiliar no abandono seguro da edificação e controlar o pânico é uma Ação de:',
            options: { a: 'Prevenção.', b: 'Emergência.', c: 'Treinamento.', d: 'Pós-Emergência.' },
            answer: 'b',
            explanation: 'Controlar o pânico e guiar o abandono são Ações de Emergência vitais.'
        },
        {
            id: 'm9-q12',
            question: 'Qual o limite de atuação da brigada no combate ao fogo?',
            options: { a: 'Até o fogo atingir grandes proporções.', b: 'Apenas na fase inicial do fogo.', c: 'Até o CBMDF mandar parar.', d: 'A brigada não combate o fogo, só evacua.' },
            answer: 'b',
            explanation: 'A brigada é treinada para o combate ao fogo em sua fase inicial, usando os recursos locais.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
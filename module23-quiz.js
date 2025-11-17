/* === module23-quiz.js === */
var questionBank = {
    'module23': [
        {
            id: 'm23-q1',
            question: 'Qual a principal característica das placas de sinalização de emergência para garantir visibilidade no escuro?',
            options: { a: 'Serem feitas de metal reflexivo.', b: 'Serem fotoluminescentes.', c: 'Terem iluminação LED própria.', d: 'Serem sempre na cor vermelha.' },
            answer: 'b',
            explanation: 'Elas devem ser fotoluminescentes (brilham no escuro) para funcionar mesmo em blecautes.'
        },
        {
            id: 'm23-q2',
            question: 'Qual a cor padrão das placas que indicam rotas de fuga e saídas de emergência?',
            options: { a: 'Verde.', b: 'Vermelha.', c: 'Amarela.', d: 'Azul.' },
            answer: 'a',
            explanation: 'Placas de Orientação e Salvamento (rotas de fuga, saídas) são verdes.'
        },
        {
            id: 'm23-q3',
            question: 'Qual a função da Iluminação de Emergência de Aclaramento?',
            options: { a: 'Indicar a localização exata dos extintores.', b: 'Piscar para chamar a atenção.', c: 'Clarear o ambiente geral (corredores, halls) para evitar pânico.', d: 'Destacar apenas as placas de saída.' },
            answer: 'c',
            explanation: 'Iluminação de Aclaramento (luminárias/blocos) clareia o ambiente geral para as pessoas verem o caminho.'
        },
        {
            id: 'm23-q4',
            question: 'Em que situação a sinalização de piso é especialmente útil?',
            options: { a: 'Em locais com teto muito alto.', b: 'Apenas em escritórios pequenos.', c: 'Para indicar onde não pisar.', d: 'Quando a visualização superior pode ser obstruída por fumaça.' },
            answer: 'd',
            explanation: 'Se a fumaça tomar o ambiente, a sinalização de piso (fotoluminescente) pode ser a única visível.'
        },
        {
            id: 'm23-q5',
            question: 'Placas de cor VERMELHA são usadas para indicar o quê?',
            options: { a: 'Rotas de fuga.', b: 'Riscos (Alerta).', c: 'Localização de equipamentos de combate (extintor, hidrante).', d: 'Ações proibidas.' },
            answer: 'c',
            explanation: 'Placas de Equipamentos (extintor, hidrante, alarme) são vermelhas.'
        },
        {
            id: 'm23-q6',
            question: 'Placas de formato TRIANGULAR e cor AMARELA são usadas para:',
            options: { a: 'Proibição.', b: 'Alerta de Riscos.', c: 'Rotas de Fuga.', d: 'Equipamentos.' },
            answer: 'b',
            explanation: 'Placas de Alerta (ex: "Risco Elétrico") são triangulares e amarelas.'
        },
        {
            id: 'm23-q7',
            question: 'Placas de formato CIRCULAR com faixa VERMELHA são usadas para:',
            options: { a: 'Proibição.', b: 'Alerta de Riscos.', c: 'Rotas de Fuga.', d: 'Equipamentos.' },
            answer: 'a',
            explanation: 'Placas de Proibição (ex: "Proibido Fumar") são circulares com faixa vermelha.'
        },
        {
            id: 'm23-q8',
            question: 'Quando as Luzes de Emergência são ativadas?',
            options: { a: 'Manualmente pelo brigadista.', b: 'Quando o alarme de incêndio dispara.', c: 'Automaticamente na falta de energia elétrica.', d: 'Apenas quando detectam fumaça.' },
            answer: 'c',
            explanation: 'Elas acendem automaticamente quando há um blecaute (falta de energia).'
        },
        {
            id: 'm23-q9',
            question: 'Qual tipo de iluminação de emergência destaca as próprias placas de saída e degraus?',
            options: { a: 'Iluminação de Aclaramento.', b: 'Iluminação Fotoluminescente.', c: 'Iluminação de Balizamento.', d: 'Iluminação de Alerta.' },
            answer: 'c',
            explanation: 'A iluminação de Balizamento (Sinalização) é usada para destacar os pontos da rota de fuga.'
        },
        {
            id: 'm23-q10',
            question: 'Uma placa com o desenho de um extintor deve ser de que cor?',
            options: { a: 'Verde.', b: 'Amarela.', c: 'Vermelha.', d: 'Azul.' },
            answer: 'c',
            explanation: 'Placas que indicam Equipamentos de combate são vermelhas.'
        },
        {
            id: 'm23-q11',
            question: 'Uma placa com uma seta indicando a direção da saída deve ser de que cor?',
            options: { a: 'Verde.', b: 'Amarela.', c: 'Vermelha.', d: 'Preta.' },
            answer: 'a',
            explanation: 'Placas de Orientação e Salvamento (rotas de fuga) são verdes.'
        },
        {
            id: 'm23-q12',
            question: 'A Sinalização de Emergência é considerada um sistema de proteção de qual tipo?',
            options: { a: 'Ativo (requer ação humana).', b: 'Automático (requer energia).', c: 'Passivo (funciona sem ação ou energia).', d: 'Temporário.' },
            answer: 'c',
            explanation: 'É um sistema passivo, pois as placas (fotoluminescentes) e a iluminação (bateria) funcionam sem energia externa.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
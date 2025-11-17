/* === module56-quiz.js === */
var questionBank = {
    'module56': [
        {
            id: 'm56-q1',
            question: 'Qual é a função do cinto de segurança tipo paraquedista?',
            options: { a: 'Apenas para carregar equipamentos.', b: 'Manter o bombeiro aquecido.', c: 'Prover segurança, mantendo o centro de gravidade acima da cintura pélvica para evitar giros.', d: 'Proteger contra quedas de objetos.' },
            answer: 'c',
            explanation: 'O cinto paraquedista (arnês) é fundamental para a segurança, distribuindo o impacto e mantendo o bombeiro na posição correta.'
        },
        {
            id: 'm56-q2',
            question: 'Por que as luvas são indispensáveis no salvamento em alturas?',
            options: { a: 'Para melhorar o tato e a sensibilidade nas mãos.', b: 'Protegem contra queimaduras por abrasão na palma e polegar em manobras com cordas.', c: 'Para manter as mãos limpas.', d: 'São itens opcionais, usados apenas em tempo frio.' },
            answer: 'b',
            explanation: 'As luvas são indispensáveis para proteger as mãos contra a abrasão (queimadura por fricção) causada pela corda.'
        },
        {
            id: 'm56-q3',
            question: 'Qual é a principal vantagem dos descensores auto-blocantes (Stop, I\'D)?',
            options: { a: 'Permitem pausas sem usar as mãos, não torcem a corda e suportam maior carga.', b: 'São mais leves e baratos que o freio oito.', c: 'Torcem a corda, o que aumenta a segurança.', d: 'São usados exclusivamente para subidas.' },
            answer: 'a',
            explanation: 'A principal vantagem é a segurança: eles travam (blocam) automaticamente, permitindo pausas sem usar as mãos.'
        },
        {
            id: 'm56-q4',
            question: 'Mosquetões com trava são usados para quê?',
            options: { a: 'Apenas para pendurar equipamentos leves.', b: 'Para ancoragens definitivas e segurança (onde a abertura acidental é um risco).', c: 'Para segurança temporária, pois abrem fácil.', d: 'Nunca são usados em salvamento.' },
            answer: 'b',
            explanation: 'Mosquetões com trava são usados em pontos críticos (ancoragens, cinto, descensores) para evitar aberturas acidentais.'
        },
        {
            id: 'm56-q5',
            question: 'Qual é a principal desvantagem do descensor "Freio Oito"?',
            options: { a: 'É muito pesado.', b: 'Não funciona com cordas finas.', c: 'Torce a corda e não suporta cargas muito pesadas sem ajustes.', d: 'É muito caro.' },
            answer: 'c',
            explanation: 'O freio oito, embora simples, torce a corda (cria "cocas") e é menos eficiente para cargas pesadas.'
        },
        {
            id: 'm56-q6',
            question: 'O capacete de salvamento em altura deve ter:',
            options: { a: 'Uma aba longa para proteger do sol.', b: 'Jugular (alça de queixo) para fixação.', c: 'Ser de metal.', d: 'Não ter furos de ventilação.' },
            answer: 'b',
            explanation: 'O capacete deve ter jugular para garantir que ele não caia durante a operação.'
        },
        {
            id: 'm56-q7',
            question: 'Para que servem os "Blocantes" (como Jumar ou Croll)?',
            options: { a: 'Para descer a corda.', b: 'Para ascensão (subida) e multiplicação de força.', c: 'Para cortar a corda.', d: 'Para unir duas cordas.' },
            answer: 'b',
            explanation: 'Blocantes (ou ascensores) usam micro-garras para travar na corda, permitindo a subida ou a criação de sistemas de vantagem mecânica.'
        },
        {
            id: 'm56-q8',
            question: 'Qual equipamento é usado para desvio ou multiplicação de força (vantagem mecânica)?',
            options: { a: 'Roldanas (Polias).', b: 'Freio Oito.', c: 'Trava-quedas.', d: 'Malhas Rápidas.' },
            answer: 'a',
            explanation: 'Roldanas (ou polias) são essenciais para criar sistemas de multiplicação de força (içamento) e reduzir o atrito.'
        },
        {
            id: 'm56-q9',
            question: 'Qual é a diferença entre um Mosquetão de Aço e um de Duralumínio?',
            options: { a: 'Aço é mais leve.', b: 'Duralumínio é mais resistente.', c: 'Aço é mais resistente e pesado (para ancoragens); Duralumínio é leve (para EPI).', d: 'Aço não tem trava.' },
            answer: 'c',
            explanation: 'Mosquetões de Aço são muito resistentes e pesados (usados em ancoragens); Duralumínio é mais leve (usado no cinto do socorrista).'
        },
        {
            id: 'm56-q10',
            question: 'Descensores de barras (Rack) são usados principalmente para:',
            options: { a: 'Subidas rápidas.', b: 'Grandes descidas (rapel longo), pois controlam a frenagem.', c: 'Ancoragens.', d: 'Unir cordas.' },
            answer: 'b',
            explanation: 'O Rack é ideal para descidas muito longas, pois dissipa melhor o calor e permite controle fino da frenagem.'
        },
        {
            id: 'm56-q11',
            question: 'Para que servem as "Malhas Rápidas"?',
            options: { a: 'Para descer a corda.', b: 'Para manobras auxiliares, fechadas com rosca.', c: 'Para subir a corda.', d: 'Para cortar a corda.' },
            answer: 'b',
            explanation: 'Malhas rápidas (links de aço com rosca) são conectores para manobras auxiliares ou pontos de ancoragem.'
        },
        {
            id: 'm56-q12',
            question: 'O que é um Trava-quedas?',
            options: { a: 'Um tipo de descensor.', b: 'Um equipamento que trava sob carga em um sentido (para segurança).', c: 'Um nó de subida.', d: 'Um capacete.' },
            answer: 'b',
            explanation: 'O trava-quedas (como o ASAP) corre livre na corda de segurança e trava automaticamente em caso de queda.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
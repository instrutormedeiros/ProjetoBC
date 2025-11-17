/* === module22-quiz.js === */
var questionBank = {
    'module22': [
        {
            id: 'm22-q1',
            question: 'Qual componente do SCIP é considerado a forma mais eficaz de controlar um incêndio em seu estágio inicial de forma automática?',
            options: { a: 'Extintores portáteis.', b: 'Sistema de Hidrantes.', c: 'Sprinklers (Chuveiros Automáticos).', d: 'Detectores de Fumaça.' },
            answer: 'c',
            explanation: 'Sprinklers são automáticos e ativam individualmente sobre o foco, controlando o fogo no início.'
        },
        {
            id: 'm22-q2',
            question: 'Qual equipamento é considerado de primeira resposta para combate inicial e imediato a focos de incêndio?',
            options: { a: 'Hidrante.', b: 'Extintor de Incêndio.', c: 'Sprinkler.', d: 'Central de Alarme.' },
            answer: 'b',
            explanation: 'Extintores são os equipamentos de primeira resposta, destinados ao combate imediato.'
        },
        {
            id: 'm22-q3',
            question: 'Qual a função principal dos Detectores Automáticos no SCIP?',
            options: { a: 'Identificar sinais precoces de incêndio (fumaça, calor, chama) e alertar a central.', b: 'Liberar água automaticamente sobre o fogo.', c: 'Alertar os ocupantes com sinais sonoros e visuais.', d: 'Fornecer água para as mangueiras.' },
            answer: 'a',
            explanation: 'Detectores (de fumaça, calor) identificam o incêndio e enviam o sinal para a Central de Alarme.'
        },
        {
            id: 'm22-q4',
            question: 'O que é a Central de Alarmes?',
            options: { a: 'O local onde ficam guardados os extintores.', b: 'Um tipo de sirene de alta potência.', c: 'O abrigo onde ficam as mangueiras de incêndio.', d: 'O equipamento que recebe sinais dos detectores/botoeiras e comanda os alarmes.' },
            answer: 'd',
            explanation: 'A Central de Alarmes é o "cérebro" que recebe os sinais e dispara os avisadores (sirenes).'
        },
        {
            id: 'm22-q5',
            question: 'Qual componente é ativado pelo rompimento de um bulbo termossensível (ampola)?',
            options: { a: 'Detector de Fumaça.', b: 'Acionador manual (botoeira).', c: 'Sprinkler.', d: 'Hidrante.' },
            answer: 'c',
            explanation: 'O Sprinkler possui um bulbo (ampola) que se rompe com o calor, liberando a água.'
        },
        {
            id: 'm22-q6',
            question: 'Para que servem os Hidrantes?',
            options: { a: 'Para detectar fumaça.', b: 'Para disparar um alarme sonoro.', c: 'Para fornecer um ponto de conexão de água com alta vazão para mangueiras.', d: 'Para quebrar vidros em uma emergência.' },
            answer: 'c',
            explanation: 'Hidrantes são pontos de tomada de água para uso da brigada ou do Corpo de Bombeiros.'
        },
        {
            id: 'm22-q7',
            question: 'Extintores de Pó Químico (PQS) são indicados para quais classes de fogo (geralmente)?',
            options: { a: 'Apenas Classe A (Madeira).', b: 'Apenas Classe C (Elétricos).', c: 'Classes B e C.', d: 'Apenas Classe K (Cozinha).' },
            answer: 'c',
            explanation: 'O PQS comum é BC (Líquidos e Elétricos). O PQS ABC também cobre Classe A.'
        },
        {
            id: 'm22-q8',
            question: 'O que são Avisadores Visuais?',
            options: { a: 'Placas de saída.', b: 'Luzes estroboscópicas (piscantes).', c: 'Detectores de chama.', d: 'O visor da central de alarme.' },
            answer: 'b',
            explanation: 'Avisadores visuais, como luzes estroboscópicas, servem para alertar pessoas (especialmente deficientes auditivos).'
        },
        {
            id: 'm22-q9',
            question: 'Onde as mangueiras de incêndio ficam acondicionadas?',
            options: { a: 'Na sala da Central de Alarme.', b: 'Em abrigos (caixas vermelhas).', c: 'Junto com os sprinklers no teto.', d: 'Na portaria.' },
            answer: 'b',
            explanation: 'As mangueiras, esguichos e chaves ficam guardadas nos abrigos de mangueira (caixas vermelhas).'
        },
        {
            id: 'm22-q10',
            question: 'Qual o objetivo principal do SCIP?',
            options: { a: 'Apenas alertar sobre o fogo.', b: 'Detectar, combater e garantir a evacuação segura.', c: 'Apenas combater o fogo.', d: 'Substituir o Corpo de Bombeiros.' },
            answer: 'b',
            explanation: 'O SCIP é um sistema completo para detectar, combater o incêndio e garantir a evacuação segura.'
        },
        {
            id: 'm22-q11',
            question: 'Extintores de Dióxido de Carbono (CO2) são ideais para qual classe de fogo?',
            options: { a: 'Classe A (Madeira).', b: 'Classe K (Óleo).', c: 'Classe C (Equipamentos Elétricos).', d: 'Classe D (Metais).' },
            answer: 'c',
            explanation: 'O CO2 apaga por abafamento e é um agente "limpo" (não danifica), ideal para Classe C (elétricos).'
        },
        {
            id: 'm22-q12',
            question: 'Detectores Térmicos e Detectores de Fumaça enviam seus sinais para onde?',
            options: { a: 'Para os Sprinklers.', b: 'Para os Hidrantes.', c: 'Para o celular do brigadista.', d: 'Para a Central de Alarmes.' },
            answer: 'd',
            explanation: 'Todos os dispositivos de detecção (manuais ou automáticos) se reportam à Central de Alarmes.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
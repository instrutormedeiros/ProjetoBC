/* === module59-quiz.js === */
var questionBank = {
    'module59': [
        {
            id: 'm59-q1',
            question: 'O que diferencia o resgate simples do complexo?',
            options: { a: 'O simples é sempre mais rápido que o complexo.', b: 'O simples é para lesões leves (um bombeiro); o complexo é para lesões graves (exige equipe e macas).', c: 'O simples não usa cordas, o complexo sim.', d: 'Não há diferença, a escolha é aleatória.' },
            answer: 'b',
            explanation: 'O resgate simples é para vítimas com lesões leves (usando triângulo de evacuação, por ex.). O complexo é para lesões graves (exige maca e mais bombeiros).'
        },
        {
            id: 'm59-q2',
            question: 'Como funciona o sistema de içamento 3:1 (vantagem mecânica)?',
            options: { a: 'Triplica o peso da vítima, exigindo três bombeiros para puxar.', b: 'Usa três cordas separadas para segurança.', c: 'Usa roldanas móveis para reduzir o peso da vítima a um terço, facilitando o içamento.', d: 'É um sistema de descida controlada.' },
            answer: 'c',
            explanation: 'Um sistema 3:1 usa roldanas (polias) para dividir o peso da carga por três, tornando o içamento mais leve.'
        },
        {
            id: 'm59-q3',
            question: 'Qual é a função do nó Valdotan no auto-resgate?',
            options: { a: 'Permite descida controlada no mesmo cabo da vítima, conectando-a ao socorrista.', b: 'Serve para cortar o cabo da vítima com segurança.', c: 'É usado para unir duas cordas durante uma subida.', d: 'Bloqueia a corda para o socorrista descansar.' },
            answer: 'a',
            explanation: 'O Valdotan (VT) é um nó autoblocante usado em auto-resgate, permitindo a descida em cordas já tensionadas.'
        },
        {
            id: 'm59-q4',
            question: 'Por que a descida com maca (resgate complexo) usa duas cordas?',
            options: { a: 'Para ser duas vezes mais rápida.', b: 'Uma para a vítima e outra para os equipamentos.', c: 'Para que dois bombeiros possam descer ao mesmo tempo.', d: 'Uma corda principal (descida) e uma de segurança (backup) garantem redundância.' },
            answer: 'd',
            explanation: 'Utiliza-se uma corda principal (de trabalho/descida) e uma corda de segurança (backup/redundância).'
        },
        {
            id: 'm59-q5',
            question: 'O "Auto-Resgate" é uma técnica realizada por:',
            options: { a: 'Um socorrista sem apoio (sozinho).', b: 'Uma equipe de pelo menos quatro bombeiros.', c: 'A própria vítima.', d: 'Um helicóptero.' },
            answer: 'a',
            explanation: 'Auto-Resgate são as técnicas que o socorrista usa para resgatar a si mesmo ou a uma vítima sem apoio externo.'
        },
        {
            id: 'm59-q6',
            question: 'O "Triângulo de Evacuação" é um equipamento usado em qual tipo de resgate?',
            options: { a: 'Resgate Simples (vítimas com lesões leves).', b: 'Resgate Complexo (vítimas com fraturas graves).', c: 'Auto-Resgate.', d: 'Resgate Aquático.' },
            answer: 'a',
            explanation: 'É ideal para resgates simples, pois é rápido de vestir em vítimas conscientes e com lesões leves.'
        },
        {
            id: 'm59-q7',
            question: 'Qual equipamento é usado no Resgate Complexo para vítimas com lesões graves (fraturas)?',
            options: { a: 'Triângulo de Evacuação.', b: 'Cabo solteiro.', c: 'Maca (rígida ou flexível).', d: 'Freio oito.' },
            answer: 'c',
            explanation: 'Vítimas com lesões graves (politrauma) devem ser transportadas em macas para estabilização.'
        },
        {
            id: 'm59-q8',
            question: 'O que é "Transposição de Nó"?',
            options: { a: 'Uma técnica para unir duas cordas.', b: 'Uma técnica para o socorrista (subindo ou descendo) passar por um nó no meio da corda.', c: 'Uma técnica de ancoragem.', d: 'Um tipo de descensor.' },
            answer: 'b',
            explanation: 'É uma técnica para o socorrista (subindo ou descendo) passar por um nó no meio da corda.'
        },
        {
            id: 'm59-q9',
            question: 'Em um resgate complexo, quantos bombeiros a equipe exige (no mínimo)?',
            options: { a: 'Um.', b: 'Dois.', c: 'Quatro.', d: 'Dez.' },
            answer: 'c',
            explanation: 'O resgate complexo (com maca) exige uma equipe de pelo menos quatro bombeiros.'
        },
        {
            id: 'm59-q10',
            question: 'Para que serve o "cabo-guia" em uma descensão com maca?',
            options: { a: 'É a corda de segurança.', b: 'É a corda principal.', c: 'É uma corda usada para evitar que a maca bata em obstáculos.', d: 'É a corda que o socorrista usa.' },
            answer: 'c',
            explanation: 'O cabo-guia (ou tirolesa) é usado para desviar a maca de obstáculos durante a descida.'
        },
        {
            id: 'm59-q11',
            question: 'Quais nós autoblocantes são mencionados na técnica de auto-resgate "corte no cabo da vítima"?',
            options: { a: 'Nó Fiel.', b: 'Prússico ou Machard.', c: 'Azelha em Oito.', d: 'Pescador Duplo.' },
            answer: 'b',
            explanation: 'O socorrista usa nós blocantes (Prússico, Machard) para se conectar ao cabo da vítima antes de cortá-lo.'
        },
        {
            id: 'm59-q12',
            question: 'Sistemas de içamento 3:1 são ideais para resgatar vítimas em:',
            options: { a: 'Locais muito altos (ex: topo de prédios).', b: 'Depressões naturais (buracos, poços) ou estruturas urbanas.', c: 'Incêndios.', d: 'Locais com água.' },
            answer: 'b',
            explanation: 'Sistemas de vantagem mecânica (içamento) são usados para puxar a vítima para cima (ex: de uma depressão).'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
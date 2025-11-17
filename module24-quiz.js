/* === module24-quiz.js === */
var questionBank = {
    'module24': [
        {
            id: 'm24-q1',
            question: 'Qual é a função principal da Casa de Bombas no SCIP?',
            options: { a: 'Armazenar a água da reserva técnica de incêndio (RTI).', b: 'Filtrar a água antes de ir para os hidrantes.', c: 'Detectar o início de um incêndio.', d: 'Garantir a pressurização e o abastecimento de água para hidrantes e sprinklers.' },
            answer: 'd',
            explanation: 'A Casa de Bombas é o "coração" que pressuriza a água para hidrantes e sprinklers.'
        },
        {
            id: 'm24-q2',
            question: 'Qual a finalidade da Bomba Jockey?',
            options: { a: 'Manter a pressão do sistema estável, compensando pequenas perdas.', b: 'Ser a bomba principal em caso de incêndio.', c: 'Funcionar apenas quando falta energia elétrica.', d: 'Drenar a água do sistema para manutenção.' },
            answer: 'a',
            explanation: 'A Bomba Jockey é auxiliar, serve para manter a rede pressurizada e compensar pequenas perdas, evitando acionamentos desnecessários das bombas principais.'
        },
        {
            id: 'm24-q3',
            question: 'Qual a grande vantagem de ter uma Bomba a Diesel no sistema?',
            options: { a: 'É mais silenciosa que a bomba elétrica.', b: 'Utiliza menos água durante a operação.', c: 'Garante o funcionamento do sistema mesmo sem energia elétrica.', d: 'É acionada antes da bomba jockey.' },
            answer: 'c',
            explanation: 'A Bomba Diesel (ou motobomba) garante o funcionamento do sistema em caso de blecaute (falha da energia elétrica).'
        },
        {
            id: 'm24-q4',
            question: 'O que são os Pressostatos e qual sua função?',
            options: { a: 'Válvulas que controlam a direção da água.', b: 'Sensores que monitoram a pressão da água e acionam/desligam as bombas.', c: 'Dispositivos que medem o volume de água na reserva.', d: 'Motores que impulsionam as bombas.' },
            answer: 'b',
            explanation: 'Pressostatos são os "interruptores" automáticos que monitoram a pressão (Kgf/cm²) e ligam as bombas corretas.'
        },
        {
            id: 'm24-q5',
            question: 'Qual bomba é acionada primeiro se houver uma pequena queda de pressão (gotejamento)?',
            options: { a: 'Bomba Principal (01).', b: 'Bomba Reserva (02).', c: 'Bomba Diesel.', d: 'Bomba Jockey.' },
            answer: 'd',
            explanation: 'A Bomba Jockey é a primeira a ligar para compensar pequenas perdas de pressão e manter o sistema estabilizado.'
        },
        {
            id: 'm24-q6',
            question: 'Para que servem os Registros na Casa de Bombas?',
            options: { a: 'Para ligar as bombas manualmente.', b: 'Para medir a pressão da água.', c: 'Para controlar o fluxo de água (isolar trechos para manutenção).', d: 'Para detectar fumaça no ambiente.' },
            answer: 'c',
            explanation: 'Registros são válvulas que controlam o fluxo de água, permitindo o isolamento de partes do sistema.'
        },
        {
            id: 'm24-q7',
            question: 'Qual é a função da Bomba Reserva (Bomba 02)?',
            options: { a: 'Manter a pressão da rede compensando gotejamentos.', b: 'Entrar em operação automaticamente se a Bomba Principal (01) falhar.', c: 'Ser usada apenas para testes semanais.', d: 'Fornecer água apenas para os sprinklers.' },
            answer: 'b',
            explanation: 'A Bomba Reserva (02) existe para redundância, assumindo se a Bomba 01 falhar.'
        },
        {
            id: 'm24-q8',
            question: 'O que significa a unidade "Kgf/cm²" nesse contexto?',
            options: { a: 'A velocidade da água.', b: 'O volume da reserva de água.', c: 'A unidade de medida da pressão da água.', d: 'A potência da bomba.' },
            answer: 'c',
            explanation: 'Kgf/cm² (Quilograma-força por centímetro quadrado) é a unidade usada para medir a pressão da água no sistema.'
        },
        {
            id: 'm24-q9',
            question: 'Qual bomba é a principal responsável pelo fluxo de água em um incêndio?',
            options: { a: 'Bomba Jockey.', b: 'Bomba Principal (01).', c: 'Bomba de Drenagem.', d: 'Bomba de Teste.' },
            answer: 'b',
            explanation: 'A Bomba Principal (01) é a que tem alta capacidade de fluxo para fornecer o volume de água necessário no combate.'
        },
        {
            id: 'm24-q10',
            question: 'A Bomba Jockey possui alta ou baixa vazão?',
            options: { a: 'Alta vazão (muita água).', b: 'Baixa vazão (pouca água).', c: 'Vazão nula.', d: 'Vazão intermitente.' },
            answer: 'b',
            explanation: 'A Bomba Jockey tem baixa vazão (não serve para apagar incêndio), mas alta pressão (para manter o sistema cheio).'
        },
        {
            id: 'm24-q11',
            question: 'Os testes de funcionamento das bombas devem ser feitos:',
            options: { a: 'Apenas uma vez por ano.', b: 'Apenas se houver um incêndio.', c: 'Regularmente (diária, semanal ou mensalmente).', d: 'Apenas pela empresa de manutenção.' },
            answer: 'c',
            explanation: 'A equipe de brigada deve realizar inspeções visuais diárias e testes de funcionamento periódicos.'
        },
        {
            id: 'm24-q12',
            question: 'A Casa de Bombas pressuriza a água para quais sistemas?',
            options: { a: 'Apenas para a caixa d\'água do prédio.', b: 'Apenas para os extintores.', c: 'Para os hidrantes e sprinklers.', d: 'Apenas para o CBMDF usar.' },
            answer: 'c',
            explanation: 'A Casa de Bombas é o "coração" dos sistemas de hidrantes e sprinklers.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
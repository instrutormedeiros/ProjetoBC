/* === module51-quiz.js === */
var questionBank = {
    'module51': [
        {
            id: 'm51-q1',
            question: 'Por que a segurança da equipe é a prioridade no salvamento em alturas?',
            options: { a: 'Porque o sucesso do resgate não deve custar a vida de um bombeiro.', b: 'Porque os equipamentos da equipe são mais caros.', c: 'Para que a operação seja mais rápida.', d: 'Para impressionar a vítima e os observadores.' },
            answer: 'a',
            explanation: 'A prioridade é proteger a vida dos bombeiros; um resgate bem-sucedido não deve custar a vida de um socorrista.'
        },
        {
            id: 'm51-q2',
            question: 'O que significa "não agravar as lesões da vítima"?',
            options: { a: 'Retirar a vítima o mais rápido possível, a qualquer custo.', b: 'Evitar conversar com a vítima para não causar estresse.', c: 'Manipular a vítima com cuidado, utilizando técnicas de imobilização para evitar novos danos.', d: 'Medicar a vítima antes do resgate.' },
            answer: 'c',
            explanation: 'A manipulação cuidadosa (imobilização, controle de hemorragias) é essencial para não piorar o estado da vítima.'
        },
        {
            id: 'm51-q3',
            question: 'Qual é a importância da "redundância" na segurança?',
            options: { a: 'Para tornar a operação mais complexa e desafiadora.', b: 'Garante que, em caso de falha de um sistema, outro assuma, evitando acidentes.', c: 'Para utilizar mais equipamentos.', d: 'É um procedimento opcional em resgates simples.' },
            answer: 'b',
            explanation: 'Redundância (sistemas duplicados ou triplicados) garante que, em caso de falha de um sistema, outro segure a carga.'
        },
        {
            id: 'm51-q4',
            question: 'Como o SCO (Sistema de Comando em Operações) contribui para o salvamento em alturas?',
            options: { a: 'Aumenta a burocracia e lentidão da equipe.', b: 'Limita a comunicação entre os bombeiros.', c: 'Foca apenas na economia de equipamentos.', d: 'Organiza a operação, define papéis e estabelece um plano de ação claro.' },
            answer: 'd',
            explanation: 'O SCO organiza a operação, definindo quem faz o quê (papéis) e o plano de ação, aumentando a eficiência e a segurança.'
        },
        {
            id: 'm51-q5',
            question: 'O que significa "avaliar o binômio risco/benefício"?',
            options: { a: 'Sempre escolher a opção mais rápida.', b: 'Analisar a operação, buscando soluções simples e seguras e evitando improvisações.', c: 'Sempre escolher a opção mais barata.', d: 'Calcular o custo do equipamento.' },
            answer: 'b',
            explanation: 'É analisar se o risco da operação compensa o benefício, priorizando sempre soluções seguras e simples.'
        },
        {
            id: 'm51-q6',
            question: 'O que significa o princípio de "Simplificar"?',
            options: { a: 'Usar menos equipamentos.', b: 'Usar técnicas simples para evitar manobras complexas, reduzindo o risco de erros.', c: 'Fazer o resgate de qualquer jeito.', d: 'Ignorar o planejamento.' },
            answer: 'b',
            explanation: 'O uso de técnicas simples reduz a chance de erros, que podem ser fatais em altura.'
        },
        {
            id: 'm51-q7',
            question: 'Qual é a primeira prioridade de segurança em um resgate?',
            options: { a: 'A vítima.', b: 'O equipamento.', c: 'Garantir a própria segurança (do socorrista).', d: 'Os bens materiais.' },
            answer: 'c',
            explanation: 'A prioridade número 1 é a segurança do próprio bombeiro/socorrista.'
        },
        {
            id: 'm51-q8',
            question: 'O que deve ser feito com os sistemas antes de iniciar a operação?',
            options: { a: 'Devem ser testados apenas se parecerem velhos.', b: 'Devem ser usados imediatamente para ganhar tempo.', c: 'Devem ser inspecionados para garantir sua integridade.', d: 'Devem ser lubrificados.' },
            answer: 'c',
            explanation: 'Todos os equipamentos e sistemas devem ser rigorosamente inspecionados antes de cada uso.'
        },
        {
            id: 'm51-q9',
            question: 'O que é "Economia de esforço e tempo"?',
            options: { a: 'Fazer o resgate correndo.', b: 'Priorizar soluções mais simples (ex: descer em vez de içar).', c: 'Usar o mínimo de bombeiros possível.', d: 'Deixar a vítima no local.' },
            answer: 'b',
            explanation: 'É buscar a solução mais simples e segura, como descer uma vítima (a favor da gravidade) em vez de içá-la (contra a gravidade).'
        },
        {
            id: 'm51-q10',
            question: 'Qual princípio de segurança envolve duplicar ou triplicar sistemas?',
            options: { a: 'Redundância.', b: 'Simplificar.', c: 'SCO.', d: 'Não agravar lesões.' },
            answer: 'a',
            explanation: 'Redundância é ter um sistema de "backup" (ou dois) caso o principal falhe.'
        },
        {
            id: 'm51-q11',
            question: 'O que é um SCO?',
            options: { a: 'Sistema de Cordas Operacionais.', b: 'Sistema de Comando em Operações.', c: 'Socorro de Cuidado Ostensivo.', d: 'Supervisor de Campo e Operações.' },
            answer: 'b',
            explanation: 'SCO é a sigla para Sistema de Comando em Operações.'
        },
        {
            id: 'm51-q12',
            question: 'Priorizar a imobilização da vítima antes da remoção rápida refere-se a qual princípio?',
            options: { a: 'Garantir a própria segurança.', b: 'Não agravar lesões.', c: 'Redundância.', d: 'Simplificar.' },
            answer: 'b',
            explanation: 'A manipulação cuidadosa e a imobilização são focadas em "Não agravar lesões", mesmo que demore um pouco mais.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
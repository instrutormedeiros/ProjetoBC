/* === module41-quiz.js === */
var questionBank = {
    'module41': [
        {
            id: 'm41-q1',
            question: 'Qual é a definição correta de Espaço Confinado, segundo a NR-33?',
            options: {
                a: 'Qualquer área subterrânea com pouca luz.',
                b: 'Uma área não projetada para ocupação humana contínua, com acessos limitados e ventilação inadequada.',
                c: 'Qualquer local de trabalho com mais de 2 metros de altura.',
                d: 'Uma sala pequena com apenas uma porta e uma janela.'
            },
            answer: 'b',
            explanation: 'A definição oficial combina: não ser projetada para ocupação contínua, ter acessos limitados e ventilação inadequada.'
        },
        {
            id: 'm41-q2',
            question: 'Qual é a função do Vigia em trabalhos de espaço confinado?',
            options: {
                a: 'Entrar no espaço para ajudar o Trabalhador Autorizado.',
                b: 'Assinar a Permissão de Entrada e Trabalho (PET).',
                c: 'Permanecer do lado de fora monitorando as condições e o trabalhador.',
                d: 'Realizar o monitoramento atmosférico dentro do espaço.'
            },
            answer: 'c',
            explanation: 'O Vigia deve permanecer do lado de fora para monitorar e acionar o resgate se necessário.'
        },
        {
            id: 'm41-q3',
            question: 'Quem é o responsável por autorizar e controlar todas as atividades, emitindo a PET?',
            options: {
                a: 'O Vigia',
                b: 'O Supervisor de Entrada',
                c: 'O Trabalhador Autorizado',
                d: 'O Engenheiro de Segurança'
            },
            answer: 'b',
            explanation: 'O Supervisor de Entrada é o responsável por autorizar e controlar as atividades, incluindo a emissão da PET.'
        },
        {
            id: 'm41-q4',
            question: 'Qual a carga horária mínima de treinamento para o Supervisor de Entrada?',
            options: {
                a: '8 horas',
                b: '16 horas',
                c: '20 horas',
                d: '40 horas'
            },
            answer: 'd',
            explanation: 'O Supervisor de Entrada, por ter mais responsabilidades, deve ter um treinamento mínimo de 40 horas.'
        },
        {
            id: 'm41-q5',
            question: 'Qual a carga horária mínima de treinamento para o Trabalhador Autorizado e o Vigia?',
            options: {
                a: '8 horas',
                b: '16 horas',
                c: '40 horas',
                d: '24 horas'
            },
            answer: 'b',
            explanation: 'Tanto o Trabalhador Autorizado quanto o Vigia devem ter um treinamento mínimo de 16 horas.'
        },
        {
            id: 'm41-q6',
            question: 'Qual documento é essencial e obrigatório ser emitido ANTES de iniciar qualquer trabalho em espaço confinado?',
            options: {
                a: 'Permissão de Entrada e Trabalho (PET)',
                b: 'Relatório de Atividades Diárias',
                c: 'Certificado de Conclusão de Curso',
                d: 'Análise Preliminar de Risco (APR) apenas'
            },
            answer: 'a',
            explanation: 'A Permissão de Entrada e Trabalho (PET) é o documento que formaliza a autorização para o trabalho.'
        },
        {
            id: 'm41-q7',
            question: 'Quando deve ser feito o monitoramento atmosférico do espaço confinado?',
            options: {
                a: 'Apenas uma vez por semana.',
                b: 'Apenas se o trabalhador sentir cheiro de gás.',
                c: 'Antes da entrada e durante toda a atividade.',
                d: 'Apenas na primeira vez que o espaço for usado.'
            },
            answer: 'c',
            explanation: 'O monitoramento atmosférico é uma medida essencial que deve ser feita antes e de forma contínua durante o trabalho.'
        },
        {
            id: 'm41-q8',
            question: 'Qual dos seguintes é um exemplo de Espaço Confinado?',
            options: {
                a: 'Um pátio de manobras aberto.',
                b: 'Um escritório com ar-condicionado.',
                c: 'Silos, tanques, poços ou galerias.',
                d: 'Uma varanda de prédio.'
            },
            answer: 'c',
            explanation: 'Silos, tanques, poços e galerias são exemplos clássicos de espaços confinados.'
        },
        {
            id: 'm41-q9',
            question: 'Qual o prazo para a reciclagem do treinamento de NR-33?',
            options: {
                a: 'A cada 6 meses.',
                b: 'A cada 12 meses.',
                c: 'A cada 24 meses.',
                d: 'Somente quando houver um acidente.'
            },
            answer: 'b',
            explanation: 'A reciclagem deve ocorrer a cada 12 meses ou em casos específicos, como mudança de função.'
        },
        {
            id: 'm41-q10',
            question: 'Quem é o "Trabalhador Autorizado"?',
            options: {
                a: 'Quem fica do lado de fora vigiando.',
                b: 'Quem assina a PET.',
                c: 'Quem entra e executa atividades dentro do espaço confinado.',
                d: 'Quem fiscaliza a NR-33 na empresa.'
            },
            answer: 'c',
            explanation: 'O Trabalhador Autorizado é aquele treinado para entrar e realizar o trabalho dentro do espaço confinado.'
        },
        {
            id: 'm41-q11',
            question: 'Além do acesso limitado, qual outra característica define um espaço confinado?',
            options: {
                a: 'Ser sempre subterrâneo.',
                b: 'Ventilação inadequada.',
                c: 'Presença obrigatória de água.',
                d: 'Ser sempre escuro.'
            },
            answer: 'b',
            explanation: 'A ventilação inadequada (permitindo acúmulo de gases ou falta de O2) é uma característica chave.'
        },
        {
            id: 'm41-q12',
            question: 'Qual das seguintes NÃO é uma medida essencial de segurança listada na NR-33?',
            options: {
                a: 'Emissão da Permissão de Entrada e Trabalho (PET).',
                b: 'Uso de, no mínimo, dois trabalhadores autorizados por vigia.',
                c: 'Monitoramento atmosférico contínuo.',
                d: 'Procedimentos de resgate definidos e equipe preparada.'
            },
            answer: 'b',
            explanation: 'Embora possa ser uma prática, a norma lista as outras três como medidas essenciais. O número de trabalhadores por vigia é definido na PET.'
        }
    ]
};
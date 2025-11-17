/* === module27-quiz.js === */
var questionBank = {
    'module27': [
        {
            id: 'm27-q1',
            question: 'Qual é a prioridade máxima em qualquer atendimento de APH, segundo o módulo de biossegurança?',
            options: {
                a: 'A segurança pessoal do socorrista.',
                b: 'A rápida avaliação da vítima.',
                c: 'O controle da hemorragia.',
                d: 'O acionamento do SAV.'
            },
            answer: 'a',
            explanation: 'A segurança pessoal é a prioridade máxima em qualquer atendimento.'
        },
        {
            id: 'm27-q2',
            question: 'Quais são os 3 EPIs essenciais listados para a biossegurança?',
            options: {
                a: 'Luvas, Capacete e Botas.',
                b: 'Máscara, Protetor auricular e Luvas.',
                c: 'Luvas descartáveis, Óculos de proteção e Máscara facial.',
                d: 'Avental, Óculos e Botas.'
            },
            answer: 'c',
            explanation: 'Os itens essenciais listados são: Luvas descartáveis, Óculos de proteção e Máscara facial.'
        },
        {
            id: 'm27-q3',
            question: 'Qual fluido corporal, que protege o cérebro, pode vazar pelo nariz ou ouvido em traumas graves de crânio?',
            options: {
                a: 'Líquido Sinovial',
                b: 'Líquido Pleural',
                c: 'Líquor (Líquido Cefalorraquidiano)',
                d: 'Líquido Ascítico'
            },
            answer: 'c',
            explanation: 'O Líquor (Líquido Cefalorraquidiano) fica ao redor do cérebro e pode sair pelo nariz ou ouvido em traumas graves de crânio.'
        },
        {
            id: 'm27-q4',
            question: 'Em caso de acidente biológico com respingo de fluido nos olhos (mucosa), qual a conduta correta?',
            options: {
                a: 'Lavar com água e sabão.',
                b: 'Lavar com água corrente ou soro fisiológico.',
                c: 'Apenas enxugar e continuar o atendimento.',
                d: 'Aplicar álcool 70%.'
            },
            answer: 'b',
            explanation: 'Em contato com mucosa (boca ou olhos), deve-se lavar com água corrente ou soro fisiológico.'
        },
        {
            id: 'm27-q5',
            question: 'Qual é a conduta correta em caso de acidente biológico com contato em pele não-íntegra?',
            options: {
                a: 'Lavar abundantemente o local com água e sabão.',
                b: 'Aplicar iodo ou álcool 70%.',
                c: 'Apenas cobrir com um curativo.',
                d: 'Lavar apenas com soro fisiológico.'
            },
            answer: 'a',
            explanation: 'Em caso de exposição na pele (íntegra ou não-íntegra), a conduta imediata é lavar abundantemente o local com água e sabão.'
        },
        {
            id: 'm27-q6',
            question: 'Respingos de fluidos nos olhos ou boca são qual via de exposição?',
            options: {
                a: 'Perfuração da pele',
                b: 'Contato com pele não-íntegra',
                c: 'Contato com mucosas',
                d: 'Inalação de partículas'
            },
            answer: 'c',
            explanation: 'A exposição por respingos de fluidos nos olhos ou na boca é classificada como "Contato com mucosas".'
        },
        {
            id: 'm27-q7',
            question: 'O líquido que lubrifica as articulações (joelho, ombro) e pode aparecer em ferimentos profundos é chamado de:',
            options: {
                a: 'Líquido Pericárdico',
                b: 'Líquido Sinovial',
                c: 'Líquor',
                d: 'Líquido Amniótico'
            },
            answer: 'b',
            explanation: 'O Líquido Sinovial é o que lubrifica as articulações e pode aparecer em ferimentos profundos que as atingem.'
        },
        {
            id: 'm27-q8',
            question: 'Qual é a conduta correta ao manipular objetos perfurocortantes (como agulhas) após o uso?',
            options: {
                a: 'Tentar reencapá-los com cuidado.',
                b: 'Descartá-los em recipientes apropriados (descarpack).',
                c: 'Entregar para a vítima descartar.',
                d: 'Guardar no bolso para descartar depois.'
            },
            answer: 'b',
            explanation: 'Nunca tente reencapar agulhas. Descarte-os imediatamente em recipientes apropriados.'
        },
        {
            id: 'm27-q9',
            question: 'O líquido que fica ao redor do bebê durante a gravidez é chamado de:',
            options: {
                a: 'Líquido Ascítico',
                b: 'Líquido Pleural',
                c: 'Líquido Amniótico',
                d: 'Líquido Pericárdico'
            },
            answer: 'c',
            explanation: 'O Líquido Amniótico é o que fica ao redor do bebê durante a gravidez.'
        },
        {
            id: 'm27-q10',
            question: 'O acúmulo de líquido na cavidade abdominal, geralmente por doenças do fígado, é chamado de:',
            options: {
                a: 'Líquido Ascítico',
                b: 'Líquido Sinovial',
                c: 'Líquor',
                d: 'Líquido Pleural'
            },
            answer: 'a',
            explanation: 'O Líquido Ascítico é o acúmulo de líquido na cavidade abdominal.'
        },
        {
            id: 'm27-q11',
            question: 'Como o Líquor (Líquido Cefalorraquidiano) pode ser reconhecido em um trauma de crânio?',
            options: {
                a: 'Como um líquido escuro, parecido com sangue venoso.',
                b: 'Como um líquido viscoso e amarelado.',
                c: 'Como um gotejamento claro "água com açúcar" saindo do nariz ou ouvido.',
                d: 'Como uma secreção purulenta.'
            },
            answer: 'c',
            explanation: 'O Líquor pode ser reconhecido saindo pelo nariz ou ouvido, com aspecto claro como "água com açúcar".'
        },
        {
            id: 'm27-q12',
            question: 'O líquido que fica entre o pulmão e a pleura (membrana do tórax) é chamado de:',
            options: {
                a: 'Líquido Pleural',
                b: 'Líquido Pericárdico',
                c: 'Líquor',
                d: 'Líquido Sinovial'
            },
            answer: 'a',
            explanation: 'O Líquido Pleural fica entre o pulmão e a pleura (membrana do tórax).'
        }
    ]
};
/* === module52-quiz.js === */
var questionBank = {
    'module52': [
        {
            id: 'm52-q1',
            question: 'Quais são as condições básicas para um salvamento seguro?',
            options: { a: 'Apenas força física e coragem.', b: 'Velocidade, improvisação e agilidade.', c: 'Controle emocional, da situação, dos materiais, das vítimas, execução com convicção e organização.', d: 'Ter os equipamentos mais caros do mercado.' },
            answer: 'c',
            explanation: 'O salvamento seguro depende de um conjunto de controles (emocional, situação, materiais, vítimas) e organização.'
        },
        {
            id: 'm52-q2',
            question: 'O que caracteriza a segurança coletiva?',
            options: { a: 'A proteção exclusiva do bombeiro líder.', b: 'Conjunto de procedimentos para proteger a integridade da equipe, vítimas e bens.', c: 'O uso de um único equipamento por toda a equipe.', d: 'A segurança dos equipamentos eletrônicos no local.' },
            answer: 'b',
            explanation: 'A segurança coletiva engloba a proteção de toda a equipe, das vítimas e dos bens envolvidos.'
        },
        {
            id: 'm52-q3',
            question: 'Quais são os principais riscos na segurança coletiva?',
            options: { a: 'Perda de controle da situação, falta de conhecimento técnico, inexperiência e descontrole emocional.', b: 'Excesso de planejamento e comunicação.', c: 'O mau tempo e a falta de visibilidade.', d: 'A presença de civis e da imprensa.' },
            answer: 'a',
            explanation: 'A falta de conhecimento, inexperiência e descontrole emocional são os maiores riscos para a equipe.'
        },
        {
            id: 'm52-q4',
            question: 'Como garantir a segurança dos bens materiais?',
            options: { a: 'Priorizando os bens materiais acima das vidas.', b: 'Protegendo os bens sem comprometer vidas, avaliando as condições e os recursos.', c: 'Ignorando completamente os bens materiais.', d: 'Deixando essa tarefa para os proprietários.' },
            answer: 'b',
            explanation: 'A proteção de bens só deve ser feita se não colocar vidas (da equipe ou das vítimas) em risco.'
        },
        {
            id: 'm52-q5',
            question: 'O uso correto de EPIs (Capacete, Luvas, Cinto) refere-se a qual tipo de segurança?',
            options: { a: 'Segurança individual.', b: 'Segurança coletiva.', c: 'Segurança dos materiais.', d: 'Segurança dos bens.' },
            answer: 'a',
            explanation: 'EPIs são para a segurança individual do bombeiro.'
        },
        {
            id: 'm52-q6',
            question: 'Manter a calma sob pressão para tomar decisões acertadas é o:',
            options: { a: 'Controle dos materiais.', b: 'Controle das vítimas.', c: 'Controle emocional.', d: 'Controle da situação.' },
            answer: 'c',
            explanation: 'O controle emocional é a capacidade de manter a calma e o raciocínio sob pressão.'
        },
        {
            id: 'm52-q7',
            question: 'Avaliar os riscos do ambiente (eletricidade, fogo) é parte de qual controle?',
            options: { a: 'Controle dos materiais.', b: 'Controle das vítimas.', c: 'Controle emocional.', d: 'Controle da situação.' },
            answer: 'd',
            explanation: 'Controlar a situação envolve avaliar e gerenciar os riscos do ambiente.'
        },
        {
            id: 'm52-q8',
            question: 'Garantir que os equipamentos estão em boas condições e sejam usados corretamente é o:',
            options: { a: 'Controle dos materiais.', b: 'Controle das vítimas.', c: 'Controle emocional.', d: 'Controle da situação.' },
            answer: 'a',
            explanation: 'O controle dos materiais é garantir que eles estão aptos para o uso.'
        },
        {
            id: 'm52-q9',
            question: 'Adaptar as técnicas de resgate ao grau de lesão da vítima é o:',
            options: { a: 'Controle dos materiais.', b: 'Controle das vítimas.', c: 'Controle emocional.', d: 'Controle da situação.' },
            answer: 'b',
            explanation: 'O controle das vítimas envolve avaliar seu estado e adaptar o resgate a isso.'
        },
        {
            id: 'm52-q10',
            question: 'Usar equipamentos adequados e bem mantidos refere-se à:',
            options: { a: 'Segurança individual.', b: 'Segurança coletiva.', c: 'Segurança dos materiais.', d: 'Segurança dos bens.' },
            answer: 'c',
            explanation: 'A segurança dos materiais garante que o equipamento não falhará durante o uso.'
        },
        {
            id: 'm52-q11',
            question: 'Realizar as manobras com confiança e precisão é a:',
            options: { a: 'Execução com convicção.', b: 'Controle emocional.', c: 'Controle da situação.', d: 'Organização dos materiais.' },
            answer: 'a',
            explanation: 'Execução com convicção é realizar a manobra com certeza e precisão.'
        },
        {
            id: 'm52-q12',
            question: 'Disponibilizar os equipamentos em locais seguros e de fácil acesso é a:',
            options: { a: 'Execução com convicção.', b: 'Controle emocional.', c: 'Segurança dos materiais.', d: 'Organização dos materiais.' },
            answer: 'd',
            explanation: 'A organização prévia dos materiais facilita o acesso durante a operação.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
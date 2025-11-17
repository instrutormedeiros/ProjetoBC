/* === module50-quiz.js === */
var questionBank = {
    'module41': [
        {
            id: 'm41-q1',
            question: 'Qual é o objetivo principal do salvamento em alturas?',
            options: { a: 'Apenas utilizar equipamentos modernos.', b: 'Realizar o resgate de vítimas em locais elevados de forma segura, utilizando técnicas e equipamentos adequados.', c: 'Focar apenas na rapidez da operação, independentemente dos riscos.', d: 'Treinar a pressão psicológica dos bombeiros.' },
            answer: 'b',
            explanation: 'O objetivo é a excelência na prestação do serviço, realizando o resgate com segurança e técnica.'
        },
        {
            id: 'm41-q2',
            question: 'Por que a capacitação contínua é crucial para os bombeiros?',
            options: { a: 'Para reduzir o custo dos equipamentos.', b: 'Apenas para cumprir exigências burocráticas.', c: 'Garante o domínio das técnicas, o uso correto de equipamentos e a capacidade de lidar com alta pressão.', d: 'Para diminuir a necessidade de planejamento.' },
            answer: 'c',
            explanation: 'A capacitação é essencial para lidar com a pressão psicológica e os riscos inerentes, onde erros são fatais.'
        },
        {
            id: 'm41-q3',
            question: 'Quais são os três planos em que o salvamento em alturas pode ser realizado?',
            options: { a: 'Interno, externo e subterrâneo.', b: 'Rápido, lento e moderado.', c: 'Simples, complexo e tático.', d: 'Vertical, inclinado e horizontal.' },
            answer: 'd',
            explanation: 'As operações podem ocorrer em planos verticais (paredes), inclinados (telhados) ou horizontais (pontes).'
        },
        {
            id: 'm41-q4',
            question: 'O que é necessário para alcançar a excelência no salvamento em alturas?',
            options: { a: 'Planejamento estruturado, treinamento contínuo e equipamentos modernos.', b: 'Apenas a coragem dos bombeiros.', c: 'Contratar o maior número de profissionais possível.', d: 'Focar em operações de um único tipo.' },
            answer: 'a',
            explanation: 'A excelência baseia-se em planejamento, capacitação e melhoria das condições de trabalho (equipamentos).'
        },
        {
            id: 'm41-q5',
            question: 'O salvamento em alturas é uma atividade de qual profissional?',
            options: { a: 'Apenas Policiais.', b: 'Apenas Médicos.', c: 'Bombeiros Profissionais Civis.', d: 'Qualquer pessoa com corda.' },
            answer: 'c',
            explanation: 'O módulo especifica que é uma atividade crítica desempenhada por bombeiros profissionais civis.'
        },
        {
            id: 'm41-q6',
            question: 'Um resgate em um telhado é um exemplo de salvamento em plano:',
            options: { a: 'Vertical.', b: 'Horizontal.', c: 'Inclinado.', d: 'Subterrâneo.' },
            answer: 'c',
            explanation: 'Telhados são exemplos de planos inclinados.'
        },
        {
            id: 'm41-q7',
            question: 'Um resgate em uma parede de edifício é um exemplo de salvamento em plano:',
            options: { a: 'Vertical.', b: 'Horizontal.', c: 'Inclinado.', d: 'Aéreo.' },
            answer: 'a',
            explanation: 'Paredes de edifícios ou penhascos são exemplos de planos verticais.'
        },
        {
            id: 'm41-q8',
            question: 'Um resgate em uma ponte ou plataforma é um exemplo de salvamento em plano:',
            options: { a: 'Vertical.', b: 'Horizontal.', c: 'Inclinado.', d: 'Aquático.' },
            answer: 'b',
            explanation: 'Pontes ou plataformas são exemplos de planos horizontais elevados.'
        },
        {
            id: 'm41-q9',
            question: 'Por que a capacitação é importante para a pressão psicológica?',
            options: { a: 'Não é importante, o bombeiro já é treinado.', b: 'Para o bombeiro saber conversar com a vítima.', c: 'Para o bombeiro lidar com os riscos inerentes onde qualquer erro pode ser fatal.', d: 'Para o bombeiro poder relaxar.' },
            answer: 'c',
            explanation: 'A capacitação ajuda o bombeiro a lidar com a pressão psicológica e os riscos fatais da operação.'
        },
        {
            id: 'm41-q10',
            question: 'O que este módulo (50) estabelece?',
            options: { a: 'As técnicas de nós.', b: 'A base para os princípios técnicos e táticos dos módulos seguintes.', c: 'Como usar os equipamentos.', d: 'Como falar no rádio.' },
            answer: 'b',
            explanation: 'Este módulo é introdutório e estabelece a base para os princípios técnicos e táticos futuros.'
        },
        {
            id: 'm41-q11',
            question: 'As técnicas de salvamento em altura NÃO envolvem qual dos seguintes?',
            options: { a: 'Ancoragens seguras.', b: 'Sistemas de descensão.', c: 'Improvisação como regra principal.', d: 'Sistemas de içamento.' },
            answer: 'c',
            explanation: 'O salvamento em altura exige planejamento meticuloso e técnicas avançadas, evitando a improvisação.'
        },
        {
            id: 'm41-q12',
            question: 'A busca por eficiência e segurança no salvamento em alturas visa:',
            options: { a: 'Economizar cordas.', b: 'Alcançar a excelência na prestação de serviços à sociedade.', c: 'Terminar o serviço mais rápido para ir embora.', d: 'Aparecer na mídia.' },
            answer: 'b',
            explanation: 'A busca por eficiência e segurança visa a excelência na prestação de serviços.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
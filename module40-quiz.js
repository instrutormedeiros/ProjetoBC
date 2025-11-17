/* === module40-quiz.js === */
var questionBank = {
    'module40': [
        {
            id: 'm40-q1',
            question: 'O que define um Incidente com Múltiplas Vítimas (IMV)?',
            options: {
                a: 'Qualquer acidente com mais de 3 vítimas.',
                b: 'Um evento que sobrecarrega os recursos de emergência disponíveis.',
                c: 'Um acidente onde há pelo menos uma vítima fatal.',
                d: 'Um acidente que envolve apenas vítimas em estado grave.'
            },
            answer: 'b',
            explanation: 'Um IMV é qualquer evento que gera um número de vítimas que sobrecarrega os recursos de emergência inicialmente disponíveis.'
        },
        {
            id: 'm40-q2',
            question: 'Qual é o objetivo principal da triagem em um IMV?',
            options: {
                a: 'Atender primeiro quem grita mais alto.',
                b: 'Fazer o melhor para a vítima mais jovem.',
                c: 'Salvar todos os pacientes, sem exceção.',
                d: 'Fazer o melhor para o maior número de vítimas.'
            },
            answer: 'd',
            explanation: 'Em cenários de IMV, o objetivo muda de "fazer o melhor para cada vítima" para "fazer o melhor para o maior número de vítimas".'
        },
        {
            id: 'm40-q3',
            question: 'No método START, qual é o primeiro passo da avaliação?',
            options: {
                a: 'Verificar a respiração.',
                b: 'Verificar se a vítima consegue andar.',
                c: 'Verificar o pulso radial.',
                d: 'Verificar o nível de consciência.'
            },
            answer: 'b',
            explanation: 'O primeiro passo é perguntar quem consegue andar. Se a vítima consegue andar, ela é classificada como VERDE.'
        },
        {
            id: 'm40-q4',
            question: 'No método START, uma vítima que não anda, não respira (mesmo após abertura das vias aéreas) é classificada como:',
            options: {
                a: 'VERMELHO',
                b: 'AMARELO',
                c: 'VERDE',
                d: 'PRETO'
            },
            answer: 'd',
            explanation: 'Se, após abrir as vias aéreas, a vítima não respira, ela é classificada como PRETO.'
        },
        {
            id: 'm40-q5',
            question: 'No método START, uma vítima que não anda, respira (FR > 30 mpm) é classificada como:',
            options: {
                a: 'VERMELHO',
                b: 'AMARELO',
                c: 'VERDE',
                d: 'PRETO'
            },
            answer: 'a',
            explanation: 'Uma vítima que não anda, mas está respirando com frequência acima de 30 mpm, é classificada como VERMELHO.'
        },
        {
            id: 'm40-q6',
            question: 'No método START, uma vítima que não anda, respira (FR < 30), mas tem pulso radial ausente é classificada como:',
            options: {
                a: 'VERMELHO',
                b: 'AMARELO',
                c: 'VERDE',
                d: 'PRETO'
            },
            answer: 'a',
            explanation: 'Se a vítima passa na respiração (FR < 30), mas falha na perfusão (pulso radial ausente), é classificada como VERMELHO.'
        },
        {
            id: 'm40-q7',
            question: 'No método START, uma vítima que não anda, respira (FR < 30), tem pulso radial, mas NÃO obedece a comandos simples é classificada como:',
            options: {
                a: 'VERMELHO',
                b: 'AMARELO',
                c: 'VERDE',
                d: 'PRETO'
            },
            answer: 'a',
            explanation: 'Após passar pela respiração e perfusão, se a vítima falha no nível de consciência (não obedece a comandos), é classificada como VERMELHO.'
        },
        {
            id: 'm40-q8',
            question: 'No método START, uma vítima que não anda, respira (FR < 30), tem pulso radial E obedece a comandos simples é classificada como:',
            options: {
                a: 'VERMELHO',
                b: 'AMARELO',
                c: 'VERDE',
                d: 'PRETO'
            },
            answer: 'b',
            explanation: 'Se a vítima passa por todos os testes (não anda, respira bem, tem pulso) e consegue obedecer a comandos, ela é classificada como AMARELO.'
        },
        {
            id: 'm40-q9',
            question: 'A categoria VERDE no método START é designada para:',
            options: {
                a: 'Vítimas com ferimentos leves, capazes de andar.',
                b: 'Vítimas graves que podem aguardar.',
                c: 'Vítimas em PCR.',
                d: 'Vítimas que precisam de transporte imediato.'
            },
            answer: 'a',
            explanation: 'A categoria VERDE é para as "walking wounded", vítimas com ferimentos leves que conseguem andar.'
        },
        {
            id: 'm40-q10',
            question: 'A categoria AMARELO no método START é designada para:',
            options: {
                a: 'Vítimas que conseguem andar.',
                b: 'Vítimas graves, mas que não correm risco de vida imediato.',
                c: 'Vítimas com lesões obviamente mortais.',
                d: 'Vítimas com respiração acima de 30 mpm.'
            },
            answer: 'b',
            explanation: 'A categoria AMARELO é para vítimas graves (que não andam), mas que estão estáveis (respiram bem, têm pulso, obedecem comandos) e podem aguardar.'
        },
        {
            id: 'm40-q11',
            question: 'A categoria PRETO no método START é designada para:',
            options: {
                a: 'Vítimas com fraturas, mas conscientes.',
                b: 'Vítimas com ferimentos leves.',
                c: 'Vítimas com lesões obviamente mortais ou em PCR (em IMV).',
                d: 'Vítimas que precisam de cirurgia imediata.'
            },
            answer: 'c',
            explanation: 'A categoria PRETO é para vítimas falecidas, com lesões incompatíveis com a vida, ou em PCR em um cenário com recursos limitados.'
        },
        {
            id: 'm40-q12',
            question: 'O que significa a sigla START?',
            options: {
                a: 'Socorro Tático e Rápido para Traumas.',
                b: 'Sistema Tático de Atendimento e Resgate.',
                c: 'Simple Triage And Rapid Treatment.',
                d: 'Suporte Total ao Acidentado no Resgate e Transporte.'
            },
            answer: 'c',
            explanation: 'START é um acrônimo para Simple Triage And Rapid Treatment (Triagem Simples e Tratamento Rápido).'
        }
    ]
};
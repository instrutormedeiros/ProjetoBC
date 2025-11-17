/* === module38-quiz.js === */
var questionBank = {
    'module38': [
        {
            id: 'm38-q1',
            question: 'Quais são os DOIS ritmos cardíacos CHOCÁVEIS (que o DEA indica choque)?',
            options: {
                a: 'Assistolia e AESP',
                b: 'Fibrilação Ventricular (FV) e Taquicardia Ventricular Sem Pulso (TVSP)',
                c: 'Assistolia e Fibrilação Ventricular (FV)',
                d: 'AESP e Taquicardia Ventricular Sem Pulso (TVSP)'
            },
            answer: 'b',
            explanation: 'Os ritmos chocáveis são a Fibrilação Ventricular (FV) e a Taquicardia Ventricular Sem Pulso (TVSP).'
        },
        {
            id: 'm38-q2',
            question: 'Qual ritmo de PCR é conhecido como "linha reta" e NÃO é chocável?',
            options: {
                a: 'Fibrilação Ventricular (FV)',
                b: 'AESP',
                c: 'Assistolia',
                d: 'Taquicardia Ventricular (TVSP)'
            },
            answer: 'c',
            explanation: 'A Assistolia é a "linha reta" (ausência total de atividade elétrica) e não é chocável.'
        },
        {
            id: 'm38-q3',
            question: 'Imediatamente APÓS o DEA aplicar um choque, o que o socorrista deve fazer?',
            options: {
                a: 'Retomar a RCP imediatamente por 2 minutos.',
                b: 'Verificar o pulso da vítima.',
                c: 'Esperar o DEA analisar novamente.',
                d: 'Aplicar um segundo choque manual.'
            },
            answer: 'a',
            explanation: 'Imediatamente após o choque, o socorrista deve retomar a RCP por 2 minutos, antes da próxima análise.'
        },
        {
            id: 'm38-q4',
            question: 'Se o DEA analisar e disser "CHOQUE NÃO INDICADO", o que o socorrista deve fazer?',
            options: {
                a: 'Verificar o pulso, pois a vítima voltou.',
                b: 'Continuar a RCP imediatamente por 2 minutos.',
                c: 'Desligar o DEA e esperar o SAV.',
                d: 'Reposicionar os eletrodos.'
            },
            answer: 'b',
            explanation: 'Se o DEA não indicar choque (ritmo AESP ou Assistolia), o socorrista deve continuar a RCP por 2 minutos.'
        },
        {
            id: 'm38-q5',
            question: 'Qual cuidado deve ser tomado ao usar o DEA em um tórax molhado?',
            options: {
                a: 'Aplicar os eletrodos normalmente.',
                b: 'Secar o tórax antes de aplicar os eletrodos.',
                c: 'Aplicar o choque com a vítima na água.',
                d: 'Aumentar a energia do DEA.'
            },
            answer: 'b',
            explanation: 'Em um tórax molhado, o socorrista deve secar o tórax antes de aplicar os eletrodos.'
        },
        {
            id: 'm38-q6',
            question: 'Qual ritmo de PCR é a principal causa de morte súbita e se caracteriza por um coração que apenas "treme"?',
            options: {
                a: 'Assistolia',
                b: 'AESP',
                c: 'Fibrilação Ventricular (FV)',
                d: 'Bradicardia'
            },
            answer: 'c',
            explanation: 'A Fibrilação Ventricular (FV) é a atividade elétrica caótica (o coração "treme") e é a principal causa de morte súbita.'
        },
        {
            id: 'm38-q7',
            question: 'Qual é o cuidado correto ao usar o DEA em um paciente com marca-passo implantado?',
            options: {
                a: 'Não usar o DEA, é contraindicado.',
                b: 'Colar o eletrodo diretamente sobre o marca-passo.',
                c: 'Evitar colar o eletrodo sobre o dispositivo, posicionando-o ao lado.',
                d: 'Desligar o marca-passo antes de chocar.'
            },
            answer: 'c',
            explanation: 'Deve-se evitar colar o eletrodo diretamente sobre o dispositivo (marca-passo), posicionando-o alguns centímetros ao lado.'
        },
        {
            id: 'm38-q8',
            question: 'Qual é a posição correta dos eletrodos (pás) do DEA no tórax de um adulto?',
            options: {
                a: 'Ambos no centro do peito.',
                b: 'Um no peito e outro nas costas.',
                c: 'Um abaixo da clavícula direita e outro na linha axilar esquerda.',
                d: 'Ambos no lado esquerdo do peito.'
            },
            answer: 'c',
            explanation: 'A posição padrão é: um eletrodo abaixo da clavícula direita e o outro na linha axilar esquerda (abaixo da mama).'
        },
        {
            id: 'm38-q9',
            question: 'Qual cuidado deve ser tomado com o fluxo de oxigênio durante o choque do DEA?',
            options: {
                a: 'Aumentar o fluxo de oxigênio para a vítima.',
                b: 'Afastar o fluxo de oxigênio (1 metro) do tórax durante o choque.',
                c: 'Não há problema, pode continuar ventilando com oxigênio.',
                d: 'Desligar o DEA e usar apenas oxigênio.'
            },
            answer: 'b',
            explanation: 'O fluxo de oxigênio deve ser afastado cerca de 1 metro do tórax durante o choque para evitar risco de faísca/fogo.'
        },
        {
            id: 'm38-q10',
            question: 'O que é AESP (Atividade Elétrica Sem Pulso)?',
            options: {
                a: 'Ausência total de atividade elétrica ("linha reta").',
                b: 'Ritmo muito rápido e caótico.',
                c: 'Atividade elétrica organizada no monitor, mas sem pulso palpável.',
                d: 'Ritmo lento que não precisa de RCP.'
            },
            answer: 'c',
            explanation: 'AESP é quando o monitor mostra atividade elétrica organizada, mas o coração não tem força mecânica para gerar um pulso.'
        },
        {
            id: 'm38-q11',
            question: 'Ao usar o DEA em um tórax peludo, o que se deve fazer?',
            options: {
                a: 'Colar o eletrodo e chocar assim mesmo.',
                b: 'Raspar rapidamente ou tracionar os pelos com outro eletrodo.',
                c: 'Molhar o tórax para melhorar o contato.',
                d: 'Não usar o DEA.'
            },
            answer: 'b',
            explanation: 'Em tórax peludo, deve-se raspar rapidamente ou usar a técnica de tracionar os pelos (colar e puxar) para garantir o contato do eletrodo.'
        },
        {
            id: 'm38-q12',
            question: 'Qual é a função da desfibrilação elétrica?',
            options: {
                a: 'Reiniciar um coração que está em Assistolia ("linha reta").',
                b: 'Interromper uma arritmia caótica (FV ou TVSP) e permitir que o marca-passo natural retome.',
                c: 'Dar um "tranco" mecânico no coração para ele voltar a bater.',
                d: 'Aquecer o músculo cardíaco.'
            },
            answer: 'b',
            explanation: 'A desfibrilação usa corrente elétrica para interromper a Fibrilação Ventricular (FV) ou TV Sem Pulso, permitindo que o ritmo normal seja retomado.'
        }
    ]
};
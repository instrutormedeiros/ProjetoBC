/* === module42-quiz.js === */
var questionBank = {
    'module42': [
        {
            id: 'm42-q1',
            question: 'Qual é a "Regra de Ouro" antes de qualquer entrada ou resgate em espaço confinado?',
            options: {
                a: 'Entrar rapidamente para salvar a vítima.',
                b: 'Nunca entrar sem monitorar a atmosfera e sem PET.',
                c: 'Usar apenas cordas, sem tripé.',
                d: 'Confiar na própria experiência e entrar sem EPR.'
            },
            answer: 'b',
            explanation: 'A regra de ouro é: Ninguém entra sem PET (Permissão de Entrada e Trabalho) e sem monitorar a atmosfera.'
        },
        {
            id: 'm42-q2',
            question: 'Qual é o primeiro parâmetro que um detector multigás deve medir ao avaliar a atmosfera?',
            options: {
                a: 'Gases tóxicos (H₂S, CO)',
                b: 'Gases inflamáveis',
                c: 'Oxigênio (O₂)',
                d: 'Poeira'
            },
            answer: 'c',
            explanation: 'A ordem correta de medição é 1º Oxigênio (O₂), 2º Gases inflamáveis, e 3º Gases tóxicos.'
        },
        {
            id: 'm42-q3',
            question: 'Qual é a técnica de salvamento PREFERENCIAL em espaço confinado?',
            options: {
                a: 'Resgate com entrada rápida do socorrista.',
                b: 'Resgate sem entrada (usando tripé, guincho, etc.).',
                c: 'Resgate com entrada de dois socorristas.',
                d: 'Aguardar a vítima sair sozinha.'
            },
            answer: 'b',
            explanation: 'O resgate sem entrada é o preferencial, pois utiliza meios mecânicos (tripé, guincho) para retirar a vítima sem expor outro socorrista.'
        },
        {
            id: 'm42-q4',
            question: 'O que deve ser feito se o monitoramento atmosférico indicar um ambiente contaminado?',
            options: {
                a: 'Entrar mesmo assim, mas prender a respiração.',
                b: 'Aplicar ventilação forçada e usar EPR adequado.',
                c: 'Lavar o espaço com água.',
                d: 'Abandonar o resgate permanentemente.'
            },
            answer: 'b',
            explanation: 'Se o ambiente estiver contaminado, deve-se aplicar ventilação forçada e a equipe que entrar deve usar Equipamento de Proteção Respiratória (EPR).'
        },
        {
            id: 'm42-q5',
            question: 'Qual equipamento é usado para o içamento e descida de vítimas ou socorristas, sendo frequentemente acoplado a um tripé?',
            options: {
                a: 'Lanterna intrinsecamente segura',
                b: 'Detector multigás',
                c: 'Guincho de resgate e trava-quedas retrátil',
                d: 'Sistema de polias e cordas apenas'
            },
            answer: 'c',
            explanation: 'O Guincho de resgate e o trava-quedas retrátil são equipamentos essenciais usados com o tripé para o acesso e içamento seguro.'
        },
        {
            id: 'm42-q6',
            question: 'Qual é um dos "Erros que Mais Matam" em espaços confinados?',
            options: {
                a: 'Demorar para preencher a PET.',
                b: 'Entrar sem medir a atmosfera.',
                c: 'Usar um tripé de resgate.',
                d: 'Ter um Vigia do lado de fora.'
            },
            answer: 'b',
            explanation: 'Entrar sem medir a atmosfera é um dos erros fatais mais comuns, pois o socorrista pode se tornar uma vítima.'
        },
        {
            id: 'm42-q7',
            question: 'Quando o "Resgate com entrada" é permitido?',
            options: {
                a: 'A qualquer momento, se o socorrista for experiente.',
                b: 'Apenas se a vítima estiver gritando.',
                c: 'Somente quando indispensável e com EPI/EPR adequado e PET.',
                d: 'Apenas se o Vigia autorizar verbalmente.'
            },
            answer: 'c',
            explanation: 'O resgate com entrada só deve ocorrer quando for indispensável e todas as medidas de segurança (EPI/EPR e PET) estiverem em vigor.'
        },
        {
            id: 'm42-q8',
            question: 'Qual equipamento de proteção respiratória é necessário se houver risco atmosférico (falta de O₂ ou gases tóxicos)?',
            options: {
                a: 'Máscara cirúrgica',
                b: 'Máscara PFF2',
                c: 'Equipamento de Respiração Autônoma (SCBA)',
                d: 'Qualquer protetor facial.'
            },
            answer: 'c',
            explanation: 'Em ambientes com risco atmosférico (IPVS), é obrigatório o uso de Equipamento de Respiração Autônoma (SCBA ou "EPR de adução de ar").'
        },
        {
            id: 'm42-q9',
            question: 'Qual a função do Supervisor de Entrada durante um RESGATE?',
            options: {
                a: 'Entrar primeiro para avaliar a vítima.',
                b: 'Manter contato com a família da vítima.',
                c: 'Autorizar e coordenar toda a operação de resgate.',
                d: 'Operar o guincho de resgate.'
            },
            answer: 'c',
            explanation: 'O Supervisor de Entrada é quem autoriza e coordena toda a operação, incluindo o resgate.'
        },
        {
            id: 'm42-q10',
            question: 'Qual a primeira ação a ser feita com a vítima IMEDIATAMENTE após o resgate bem-sucedido?',
            options: {
                a: 'Levar para o vestiário para tomar banho.',
                b: 'Aplicar suporte básico de vida (SBV) e oxigênio, se necessário.',
                c: 'Pedir para a vítima assinar os documentos.',
                d: 'Liberar a vítima para ir para casa.'
            },
            answer: 'b',
            explanation: 'Após o resgate, a vítima deve receber imediatamente os cuidados de APH, como SBV e oxigênio suplementar.'
        },
        {
            id: 'm42-q11',
            question: 'Qual equipamento é usado para garantir a iluminação em um espaço com risco de gases inflamáveis?',
            options: {
                a: 'Lanterna comum de celular.',
                b: 'Lanterna intrinsecamente segura.',
                c: 'Qualquer lanterna de LED.',
                d: 'Fósforos ou isqueiros.'
            },
            answer: 'b',
            explanation: 'Deve-se usar uma lanterna intrinsecamente segura, que é projetada para não gerar faíscas, evitando uma explosão.'
        },
        {
            id: 'm42-q12',
            question: 'Qual destes gases tóxicos é comumente medido pelo detector multigás?',
            options: {
                a: 'Nitrogênio (N₂)',
                b: 'Hélio (He)',
                c: 'H₂S (Gás Sulfídrico) ou CO (Monóxido de Carbono)',
                d: 'Argônio (Ar)'
            },
            answer: 'c',
            explanation: 'O detector multigás é configurado para medir gases tóxicos comuns em espaços confinados, como H₂S (gás de esgoto) e CO (queima incompleta).'
        }
    ]
};
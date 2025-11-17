/* === module6-quiz.js === */
var questionBank = {
    'module6': [
        {
            id: 'm6-q1',
            question: 'Qual a principal característica das Normas Regulamentadoras (NRs)?',
            options: { a: 'São obrigatórias por lei para todas as empresas.', b: 'São recomendações opcionais de segurança.', c: 'São criadas pela ABNT para padronização.', d: 'Aplicam-se apenas a empresas públicas.' },
            answer: 'a',
            explanation: 'As NRs são regras obrigatórias por lei, criadas pelo MTE, para segurança e saúde no trabalho.'
        },
        {
            id: 'm6-q2',
            question: 'Quem é o responsável pela criação das Normas Técnicas (NBRs) no Brasil?',
            options: { a: 'Ministério do Trabalho e Emprego (MTE).', b: 'Associação Brasileira de Normas Técnicas (ABNT).', c: 'Corpo de Bombeiros.', d: 'Sindicatos dos trabalhadores.' },
            answer: 'b',
            explanation: 'As NBRs (Normas Brasileiras) são criadas pela ABNT para padronização.'
        },
        {
            id: 'm6-q3',
            question: 'Qual o objetivo principal das Normas Técnicas (NTs/NBRs)?',
            options: { a: 'Aplicar multas às empresas.', b: 'Definir salários mínimos.', c: 'Padronizar procedimentos e características técnicas.', d: 'Fiscalizar as condições de trabalho.' },
            answer: 'c',
            explanation: 'As NTs/NBRs servem para padronizar procedimentos, garantindo qualidade e segurança.'
        },
        {
            id: 'm6-q4',
            question: 'O descumprimento das Normas Regulamentadoras (NRs) pode resultar em:',
            options: { a: 'Apenas advertências verbais.', b: 'Elogios pela economia de recursos.', c: 'Redução de impostos.', d: 'Multas, penalidades ou até interdição das atividades.' },
            answer: 'd',
            explanation: 'O descumprimento das NRs, por serem leis, pode gerar multas, penalidades e interdição.'
        },
        {
            id: 'm6-q5',
            question: 'O que significa a sigla MTE?',
            options: { a: 'Ministério do Trabalho e Emprego.', b: 'Método Técnico de Emergência.', c: 'Módulo de Treinamento e Ensino.', d: 'Material de Tática e Equipamentos.' },
            answer: 'a',
            explanation: 'MTE é a sigla para Ministério do Trabalho e Emprego, o órgão que cria as NRs.'
        },
        {
            id: 'm6-q6',
            question: 'O que significa a sigla ABNT?',
            options: { a: 'Agência Brasileira de Normas de Trabalho.', b: 'Associação Brasileira de Normas Técnicas.', c: 'Associação de Brigadistas e Normas Táticas.', d: 'Agência Nacional de Bombeiros e Técnicos.' },
            answer: 'b',
            explanation: 'ABNT é a sigla para Associação Brasileira de Normas Técnicas, responsável pelas NBRs.'
        },
        {
            id: 'm6-q7',
            question: 'Qual norma é OBRIGATÓRIA por lei federal?',
            options: { a: 'NR (Norma Regulamentadora).', b: 'NT (Norma Técnica).', c: 'NBR (Norma Brasileira).', d: 'Todas as anteriores.' },
            answer: 'a',
            explanation: 'As NRs são obrigatórias por lei. As NBRs/NTs são padrões técnicos que ganham força de lei quando citadas em NRs ou decretos.'
        },
        {
            id: 'm6-q8',
            question: 'Qual norma é focada em PADRONIZAR procedimentos e diretrizes técnicas?',
            options: { a: 'NR (Norma Regulamentadora).', b: 'NT (Norma Técnica) / NBR.', c: 'CLT (Consolidação das Leis do Trabalho).', d: 'CF (Constituição Federal).' },
            answer: 'b',
            explanation: 'As NTs/NBRs, criadas pela ABNT, focam em padronizar processos e especificações técnicas.'
        },
        {
            id: 'm6-q9',
            question: 'Interdição ou embargo de atividades são penalidades para o descumprimento de qual norma?',
            options: { a: 'NBR.', b: 'NT.', c: 'NR.', d: 'ISO.' },
            answer: 'c',
            explanation: 'O descumprimento das NRs (Normas Regulamentadoras) pode levar a penalidades severas, como multas e interdição.'
        },
        {
            id: 'm6-q10',
            question: 'A NR-35 (Trabalho em Altura) é um exemplo de qual tipo de norma?',
            options: { a: 'Norma Técnica (NT).', b: 'Norma da ABNT (NBR).', c: 'Norma Regulamentadora (NR).', d: 'Norma Opcional.' },
            answer: 'c',
            explanation: 'Como o próprio nome diz, a NR-35 é uma Norma Regulamentadora do MTE.'
        },
        {
            id: 'm6-q11',
            question: 'Qual o foco das NRs?',
            options: { a: 'Qualidade do produto final.', b: 'Padronização de medidas.', c: 'Segurança e saúde no trabalho.', d: 'Regras de comércio internacional.' },
            answer: 'c',
            explanation: 'As NRs (Normas Regulamentadoras) tratam especificamente de segurança e saúde no trabalho.'
        },
        {
            id: 'm6-q12',
            question: 'A NBR 14276 (Brigada de Incêndio) é um exemplo de:',
            options: { a: 'Norma Regulamentadora (NR).', b: 'Norma Técnica (NBR).', c: 'Lei federal.', d: 'Decreto estadual.' },
            answer: 'b',
            explanation: 'A sigla NBR significa Norma Brasileira, criada pela ABNT para padronização.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
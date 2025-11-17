/* === module55-quiz.js === */
var questionBank = {
    'module55': [
        {
            id: 'm55-q1',
            question: 'Qual é a principal função das fitas tubulares em ancoragens?',
            options: { a: 'Equalizar tensão entre pontos e proteger cordas contra abrasão.', b: 'Servir como corda principal de resgate.', c: 'Apenas para o transporte de materiais.', d: 'Para imobilizar vítimas.' },
            answer: 'a',
            explanation: 'Fitas são usadas em ancoragens para equalizar a força entre os pontos e como proteção de arestas vivas.'
        },
        {
            id: 'm55-q2',
            question: 'Em quais situações as escadas de gancho são mais úteis?',
            options: { a: 'Resgates em rios e lagos.', b: 'Acesso a locais subterrâneos.', c: 'Resgates em varandas, sacadas ou janelas, especialmente com fogo ou fumaça.', d: 'Transporte de vítimas em terreno plano.' },
            answer: 'c',
            explanation: 'As escadas de gancho são para acesso rápido a janelas/sacadas, especialmente em cenários de incêndio.'
        },
        {
            id: 'm55-q3',
            question: 'Qual é a diferença entre macas rígidas e flexíveis?',
            options: { a: 'Rígidas são para vítimas leves; flexíveis para vítimas pesadas.', b: 'Rígidas são mais pesadas e resistentes; flexíveis são leves, mas exigem maior habilidade técnica.', c: 'Macas rígidas são descartáveis.', d: 'Macas flexíveis não precisam de manutenção.' },
            answer: 'b',
            explanation: 'Macas rígidas (metálicas) são pesadas e resistentes; flexíveis (plástico) são leves e mais difíceis de manejar.'
        },
        {
            id: 'm55-q4',
            question: 'Para que tipo de vítima o triângulo de evacuação é indicado?',
            options: { a: 'Para vítimas inconscientes e com fraturas graves.', b: 'Apenas para crianças.', c: 'Para transporte de equipamentos.', d: 'Para vítimas conscientes com lesões leves.' },
            answer: 'd',
            explanation: 'O triângulo de evacuação é versátil e ideal para vítimas conscientes com lesões leves.'
        },
        {
            id: 'm55-q5',
            question: 'Qual tipo de fita é mais flexível e resistente?',
            options: { a: 'Plana.', b: 'Tubular.', c: 'Adesiva.', d: 'Zebrada.' },
            answer: 'b',
            explanation: 'Fitas tubulares são mais flexíveis e resistentes que as fitas planas.'
        },
        {
            id: 'm55-q6',
            question: 'Quantos bombeiros são necessários para garantir a estabilidade de uma escada prolongável durante o acesso?',
            options: { a: 'Um.', b: 'Dois.', c: 'Três.', d: 'Quatro.' },
            answer: 'c',
            explanation: 'São necessários três bombeiros para estabilizar a escada (um em cada pé e um controlando o balanço).'
        },
        {
            id: 'm55-q7',
            question: 'O primeiro bombeiro a subir em uma escada de gancho deve usar qual equipamento de segurança?',
            options: { a: 'Um cabo solteiro.', b: 'Dois cabos solteiros.', c: 'Uma maca.', d: 'Um triângulo de evacuação.' },
            answer: 'a',
            explanation: 'O primeiro bombeiro a subir deve usar um cabo solteiro para sua segurança.'
        },
        {
            id: 'm55-q8',
            question: 'Qual equipamento de evacuação é mais pesado e resistente?',
            options: { a: 'Maca flexível.', b: 'Maca rígida (metálica).', c: 'Triângulo de evacuação.', d: 'Cinto paraquedista.' },
            answer: 'b',
            explanation: 'Macas rígidas, geralmente metálicas, são mais pesadas e resistentes.'
        },
        {
            id: 'm55-q9',
            question: 'Qual equipamento de evacuação é versátil, ocupa pouco espaço e é ideal para vítimas conscientes?',
            options: { a: 'Maca flexível.', b: 'Maca rígida.', c: 'Triângulo de evacuação.', d: 'Escada de gancho.' },
            answer: 'c',
            explanation: 'O triângulo de evacuação é compacto e eficiente para vítimas conscientes com lesões leves.'
        },
        {
            id: 'm55-q10',
            question: 'Qual tipo de maca exige maior conhecimento técnico para sua correta utilização?',
            options: { a: 'Maca flexível.', b: 'Maca rígida.', c: 'Todas as macas.', d: 'Nenhuma maca.' },
            answer: 'a',
            explanation: 'Macas flexíveis são leves, mas exigem maior conhecimento técnico para embalar e estabilizar a vítima.'
        },
        {
            id: 'm55-q11',
            question: 'Fitas são usadas em ancoragens para proteger as cordas contra o quê?',
            options: { a: 'Água.', b: 'Calor.', c: 'Abrasão em arestas vivas.', d: 'Produtos químicos.' },
            answer: 'c',
            explanation: 'Fitas (ou proteções específicas) são usadas para proteger a corda da abrasão (desgaste por atrito) em arestas vivas (quinas).'
        },
        {
            id: 'm55-q12',
            question: 'Escadas de gancho são geralmente fabricadas de alumínio ou...',
            options: { a: 'Madeira.', b: 'Aço.', c: 'Plástico.', d: 'Fibra de vidro.' },
            answer: 'd',
            explanation: 'São fabricadas em alumínio ou fibra de vidro (material isolante elétrico).'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
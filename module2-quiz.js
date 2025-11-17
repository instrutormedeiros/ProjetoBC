/* === module2-quiz.js === */
var questionBank = {
    'module2': [
        {
            id: 'm2-q1',
            question: 'Quando um funcionário envia um relatório de problemas para seu chefe, que tipo de comunicação formal está ocorrendo?',
            options: { a: 'Ascendente.', b: 'Descendente.', c: 'Horizontal.', d: 'Informal.' },
            answer: 'a',
            explanation: 'A comunicação ascendente flui de um nível hierárquico inferior para um superior.'
        },
        {
            id: 'm2-q2',
            question: 'A comunicação informal "Videira" é caracterizada por ser:',
            options: { a: 'Lenta, oficial e sempre verdadeira.', b: 'Documentada, hierárquica e clara.', c: 'Rápida, anônima e dificilmente rastreável.', d: 'Exclusiva entre pessoas do mesmo nível.' },
            answer: 'c',
            explanation: 'A videira é como um boato: se espalha rapidamente e sua origem é incerta.'
        },
        {
            id: 'm2-q3',
            question: 'Qual elemento da comunicação confirma que a mensagem foi recebida e compreendida?',
            options: { a: 'Canal.', b: 'Feedback.', c: 'Emissor.', d: 'Receptor.' },
            answer: 'b',
            explanation: 'O Feedback é a resposta do receptor, essencial para confirmar a compreensão.'
        },
        {
            id: 'm2-q4',
            question: 'A comunicação entre dois chefes de setores diferentes para alinhar um projeto é um exemplo de comunicação:',
            options: { a: 'Ascendente.', b: 'Descendente.', c: 'Informal.', d: 'Horizontal.' },
            answer: 'd',
            explanation: 'A comunicação horizontal ocorre entre pessoas do mesmo nível hierárquico.'
        },
        {
            id: 'm2-q5',
            question: 'Quem é o "Receptor" no processo de comunicação?',
            options: { a: 'Quem emite a mensagem.', b: 'O meio por onde a mensagem é transmitida.', c: 'Quem recebe a mensagem.', d: 'A resposta à mensagem.' },
            answer: 'c',
            explanation: 'O Receptor é quem recebe e decodifica a mensagem enviada pelo Emissor.'
        },
        {
            id: 'm2-q6',
            question: 'Um e-mail do diretor para todos os funcionários estabelecendo novas regras é um exemplo de comunicação:',
            options: { a: 'Ascendente.', b: 'Horizontal.', c: 'Descendente.', d: 'Videira.' },
            answer: 'c',
            explanation: 'A comunicação descendente flui de um nível superior para um inferior, como ordens ou regras.'
        },
        {
            id: 'm2-q7',
            question: 'O que é um "Rumor"?',
            options: { a: 'Uma informação oficial da empresa.', b: 'Informação que circula sem confirmação de veracidade e sem fonte confiável.', c: 'Uma conversa entre pessoas do mesmo nível.', d: 'Uma sugestão enviada ao chefe.' },
            answer: 'b',
            explanation: 'Rumor é uma informação informal que circula sem confirmação se é verdadeira.'
        },
        {
            id: 'm2-q8',
            question: 'O "Canal" na comunicação refere-se a quê?',
            options: { a: 'A pessoa que fala.', b: 'A pessoa que ouve.', c: 'A resposta dada.', d: 'O meio por onde a mensagem é transmitida.' },
            answer: 'd',
            explanation: 'O Canal é o meio físico ou virtual usado para transmitir a mensagem (TV, jornal, conversa).'
        },
        {
            id: 'm2-q9',
            question: 'Qual tipo de comunicação acontece de forma espontânea, sem seguir regras ou hierarquia?',
            options: { a: 'Comunicação Formal.', b: 'Comunicação Descendente.', c: 'Comunicação Informal.', d: 'Comunicação Ascendente.' },
            answer: 'c',
            explanation: 'A comunicação informal é espontânea e não segue canais oficiais.'
        },
        {
            id: 'm2-q10',
            question: 'O que é "Mexerico" (ou Fofoca)?',
            options: { a: 'Uma ordem dada por um superior.', b: 'Falar sobre pessoas específicas, com informações que podem não ser verdadeiras.', c: 'Uma sugestão de melhoria.', d: 'Uma informação oficial e rápida.' },
            answer: 'b',
            explanation: 'O Mexerico (Fofoca) é um tipo de comunicação informal focada em pessoas específicas.'
        },
        {
            id: 'm2-q11',
            question: 'Qual dos seguintes NÃO é um tipo de comunicação formal?',
            options: { a: 'Ascendente.', b: 'Descendente.', c: 'Horizontal.', d: 'Videira.' },
            answer: 'd',
            explanation: 'Videira, Rumor e Mexerico são tipos de comunicação informal.'
        },
        {
            id: 'm2-q12',
            question: 'A principal diferença entre Rumor e Videira é:',
            options: { a: 'Rumor é rápido, Videira é lenta.', b: 'Rumor é verdadeiro, Videira é falsa.', c: 'Videira é rápida e anônima; Rumor é sobre algo sem confirmação.', d: 'Não há diferença.' },
            answer: 'c',
            explanation: 'A videira é notável pela rapidez como se espalha, sendo difícil rastrear a origem, enquanto o rumor é focado na falta de veracidade.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
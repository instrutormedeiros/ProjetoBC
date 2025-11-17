/* === module54-quiz.js === */
var questionBank = {
    'module54': [
        {
            id: 'm54-q1',
            question: 'Por que as fibras sintéticas (poliamida) são preferidas para cordas de salvamento?',
            options: { a: 'Porque são mais baratas e fáceis de encontrar.', b: 'Oferecem maior resistência, durabilidade e capacidade de amortecimento.', c: 'Porque são mais leves e absorvem mais água.', d: 'Porque não necessitam de manutenção.' },
            answer: 'b',
            explanation: 'Fibras sintéticas têm maior resistência, durabilidade e absorção de choque (amortecimento) que as naturais.'
        },
        {
            id: 'm54-q2',
            question: 'Qual é a diferença entre cordas estáticas e dinâmicas?',
            options: { a: 'Estáticas são para escalada e dinâmicas para salvamento.', b: 'Não há diferença significativa entre elas.', c: 'Estáticas são mais elásticas que as dinâmicas.', d: 'Estáticas têm baixa elasticidade (<5%, para salvamento); dinâmicas têm alta elasticidade (>5%, para escalada).' },
            answer: 'd',
            explanation: 'Estáticas (usadas em salvamento) não esticam; Dinâmicas (usadas em escalada) esticam para absorver quedas.'
        },
        {
            id: 'm54-q3',
            question: 'Quais são os principais cuidados na manutenção de cordas?',
            options: { a: 'Evitar abrasão, contato com produtos químicos, calor excessivo e pisar na corda.', b: 'Lavar com alvejante e secar ao sol para desinfetar.', c: 'Guardar a corda sempre tensionada para manter a resistência.', d: 'A manutenção só é necessária após uma queda.' },
            answer: 'a',
            explanation: 'Deve-se evitar qualquer coisa que degrade as fibras: abrasão (areia, pisar), químicos, sol (UV) e calor.'
        },
        {
            id: 'm54-q4',
            question: 'O que é o Fator de Queda (FQ) e como é calculado?',
            options: { a: 'É a altura máxima que uma corda pode cair, calculado por FQ=H*L.', b: 'É a resistência da corda, medida em kN.', c: 'É a razão que mede o esforço da corda em uma queda, calculada pela fórmula FQ=2H/L.', d: 'É o tempo que a corda leva para secar.' },
            answer: 'c',
            explanation: 'Fator de Queda (FQ) = 2x Altura da Queda (H) / Comprimento da Corda (L). Ele mede a severidade da queda.'
        },
        {
            id: 'm54-q5',
            question: 'Em cordas de "alma e capa", qual parte suporta a maior parte da carga (80-85%)?',
            options: { a: 'A capa (parte externa colorida).', b: 'A alma (núcleo interno).', c: 'Ambas suportam 50% da carga.', d: 'Nenhuma, a costura é que suporta.' },
            answer: 'b',
            explanation: 'A Alma (núcleo) suporta 80-85% da carga; a Capa (externa) protege a alma contra abrasão.'
        },
        {
            id: 'm54-q6',
            question: 'Cordas com elasticidade MENOR que 5% são usadas para salvamento e são chamadas de:',
            options: { a: 'Dinâmicas.', b: 'Estáticas.', c: 'Trançadas.', d: 'Torcidas.' },
            answer: 'b',
            explanation: 'Cordas Estáticas (ou semi-estáticas) têm baixa elasticidade e são usadas em salvamento e rapel.'
        },
        {
            id: 'm54-q7',
            question: 'Cordas com elasticidade MAIOR que 5% são usadas para escalada e são chamadas de:',
            options: { a: 'Dinâmicas.', b: 'Estáticas.', c: 'Trançadas.', d: 'Torcidas.' },
            answer: 'a',
            explanation: 'Cordas Dinâmicas esticam para absorver o impacto (força de choque) de uma queda de escalada.'
        },
        {
            id: 'm54-q8',
            question: 'Cordas de apoio (para segurança individual) geralmente têm qual diâmetro?',
            options: { a: 'Mais de 10 mm.', b: '7-8 mm.', c: '4-6 mm.', d: 'Menos de 4 mm.' },
            answer: 'b',
            explanation: 'Cordas de 7-8 mm são usadas como cordas de apoio (ex: segurança individual, backup).'
        },
        {
            id: 'm54-q9',
            question: 'Cordeletes (para ascensão e auto-resgate) geralmente têm qual diâmetro?',
            options: { a: 'Mais de 10 mm.', b: '7-8 mm.', c: '4-6 mm.', d: 'Menos de 4 mm.' },
            answer: 'c',
            explanation: 'Cordeletes, usados para nós blocantes (Prússik, Machard), têm diâmetro de 4 a 6 mm.'
        },
        {
            id: 'm54-q10',
            question: 'Qual é a forma correta de secar uma corda após lavá-la?',
            options: { a: 'Ao sol, para ser mais rápido.', b: 'Perto de um aquecedor.', c: 'Na secadora de roupas.', d: 'À sombra, em local ventilado.' },
            answer: 'd',
            explanation: 'A corda deve secar lentamente à sombra, longe do sol (raios UV) e de fontes de calor, que degradam as fibras.'
        },
        {
            id: 'm54-q11',
            question: 'O que NUNCA se deve fazer com uma corda?',
            options: { a: 'Lavá-la.', b: 'Pisar nela ou deixá-la em contato com areia.', c: 'Guardá-la em uma sacola.', d: 'Usá-la para rapel.' },
            answer: 'b',
            explanation: 'Pisar na corda ou sujá-la com areia/terra causa abrasão interna (micro-cortes na alma), danificando-a.'
        },
        {
            id: 'm54-q12',
            question: 'Qual fibra sintética é extremamente resistente, comparável ao aço?',
            options: { a: 'Polipropileno.', b: 'Poliéster.', c: 'Poliamida.', d: 'Aramida (Kevlar).' },
            answer: 'd',
            explanation: 'A Aramida (Kevlar) é conhecida por sua altíssima resistência a corte e tração.'
        }
    ]
};

// **CHAMADA DE RETORNO EXPLÍCITA**
if (typeof handleQuizLoad === 'function') {
    handleQuizLoad(questionBank);
}
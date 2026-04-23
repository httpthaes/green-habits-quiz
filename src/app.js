//apresentacao

const btnComecar = document.querySelector('#btn-comecar');
const apresentacao = document.querySelector('.section-apresentacao');
const quiz = document.querySelector('.section-perguntas');

btnComecar.addEventListener('click', () => {
    apresentacao.classList.add('escondido')
    quiz.classList.remove('escondido')
})

//quiz

let pontos = 0;
let perguntasRespondidas = 0;
const perguntas = document.querySelectorAll('.pergunta');
const btnResultado = document.querySelector('#btn-resultado')

function verificarFim() {
    if (perguntasRespondidas == 5) {
        btnResultado.disabled = false
    }
}

perguntas.forEach(pergunta => {
    const btnSim = pergunta.querySelector('.btn-sim')
    const btnNao = pergunta.querySelector('.btn-nao')

    btnSim.addEventListener('click', () => {
        pontos++
        btnSim.disabled = true
        btnNao.disabled = true
        perguntasRespondidas++
        verificarFim()
    })

    btnNao.addEventListener('click', () => {
        btnSim.disabled = true
        btnNao.disabled = true
        perguntasRespondidas++
        verificarFim()
    })
});

//resultado

const resultado = document.querySelector('.section-resultado')
const mensagemResultado = document.querySelector('#mensagem-resultado');

btnResultado.addEventListener('click', () => {
    if (pontos == 5) {
        mensagemResultado.innerHTML = `
        <span>⭐ 5 de 5 — Excelente! </span>
        <p>
            Você é um exemplo de consumo consciente! 
            Seus hábitos no dia a dia já refletem uma preocupação 
            genuína com o uso de recursos. Continue assim e 
            inspire colegas ao seu redor a também adotarem 
            práticas sustentáveis.
        </p>
        `
    } else if (pontos >= 3){
        mensagemResultado.innerHTML = `
        <span>✅ 3 a 4 de 5 — Bom!</span>
        <p>
            Você tem bons hábitos, mas ainda há 
            espaço para melhorar. Identifique as perguntas em que 
            respondeu "Não" e foque nelas. Pequenas mudanças — 
            como fechar a torneira ou desligar a luz — somam 
            grandes resultados ao longo do tempo.
        </p>
        `
    } else {
        mensagemResultado.innerHTML = `
        <span>⚠️ Menos de 3 — Atenção!</span>
        <p>
            Pequenas mudanças fazem grande 
            diferença. Você não precisa mudar tudo de uma vez — 
            comece por um hábito por semana. O diagnóstico é o 
            primeiro passo para uma jornada de transformação 
            pessoal e coletiva rumo à sustentabilidade.
        </p>
        `
    }

    localStorage.setItem('ultimaPontuacao', pontos)
    quiz.classList.add('escondido')
    resultado.classList.remove('escondido')
})

document.addEventListener('DOMContentLoaded', () => {
    const ultimaPontuacao = localStorage.getItem('ultimaPontuacao')
    const ultimoResultado = document.querySelector('#ultimo-resultado')
    
    if (ultimaPontuacao) {
        ultimoResultado.textContent = `
        Na última vez você fez ${ultimaPontuacao} de 5 pontos.
        `
    } else {
        ultimoResultado.textContent = `
        💡 Dica: Refaça o diagnóstico periodicamente para acompanhar 
        sua evolução. Cada nova tentativa é uma oportunidade de consolidar 
        hábitos mais conscientes e sustentáveis.
        `
    }
})
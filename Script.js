const personagem = document.getElementById("personagem");
const cenario = document.getElementById("cenario");
const obstaculo = document.getElementById("obstaculo");
const vidasTexto = document.getElementById("vidas");
const pontosTexto = document.getElementById("pontos");
const nomePrincesa = document.getElementById("nomePrincesa");
const mensagem = document.getElementById("mensagem");
const tituloMensagem = document.getElementById("tituloMensagem");
const textoMensagem = document.getElementById("textoMensagem");

const botaoJogar = document.getElementById("jogar");
const botaoNovamente = document.getElementById("novamente");
const botaoVoltar = document.getElementById("voltar");
const botaoEsquerda = document.getElementById("esquerda");
const botaoDireita = document.getElementById("direita");
const botaoPular = document.getElementById("pular");

let posicao = 45;
let posicaoObstaculo = 0;
let vidas = 3;
let pontos = 0;
let velocidade = 4;
let jogando = false;
let pulando = false;
let ultimoTempo = 0;
let tempoColisao = 0;
let teclas = {};

const dadosSalvos = localStorage.getItem("princesaSelecionada");
let princesaEscolhida = null;

try {
    princesaEscolhida = dadosSalvos ? JSON.parse(dadosSalvos) : null;
} catch {
    princesaEscolhida = null;
}

if (princesaEscolhida && princesaEscolhida.nome) {
    nomePrincesa.textContent =
        "A princesa " + princesaEscolhida.nome + " vai salvar o reino!";
}

function atualizarVidas() {
    vidasTexto.textContent = "❤️".repeat(vidas) + "🤍".repeat(3 - vidas);
}

function limitarPosicao() {
    const limite = cenario.clientWidth - personagem.offsetWidth;
    posicao = Math.max(0, Math.min(posicao, limite));
    personagem.style.left = posicao + "px";
}

function andar(direcao) {
    if (!jogando) return;

    posicao += direcao * 8;
    limitarPosicao();
}

function pular() {
    if (!jogando || pulando) return;

    pulando = true;
    personagem.classList.add("pulando");

    setTimeout(() => {
        personagem.classList.remove("pulando");
        pulando = false;
    }, 650);
}

function iniciarJogo() {
    if (jogando) return;

    vidas = 3;
    pontos = 0;
    velocidade = 4;
    posicao = 45;
    posicaoObstaculo = cenario.clientWidth;
    ultimoTempo = 0;
    tempoColisao = 0;
    teclas = {};

    personagem.style.left = posicao + "px";
    personagem.classList.remove("pulando");
    pulando = false;

    obstaculo.style.left = posicaoObstaculo + "px";

    atualizarVidas();
    pontosTexto.textContent = pontos;

    mensagem.classList.add("escondida");
    jogando = true;

    requestAnimationFrame(atualizarJogo);
}

function atualizarJogo(tempo) {
    if (!jogando) return;

    if (!ultimoTempo) ultimoTempo = tempo;

    const delta = Math.min((tempo - ultimoTempo) / 16.67, 2);
    ultimoTempo = tempo;

    if (teclas.ArrowLeft) andar(-1);
    if (teclas.ArrowRight) andar(1);

    posicaoObstaculo -= velocidade * delta;

    if (posicaoObstaculo < -obstaculo.offsetWidth) {
        posicaoObstaculo = cenario.clientWidth;
        pontos++;
        pontosTexto.textContent = pontos;
        velocidade = Math.min(velocidade + 0.15, 9);
    }

    obstaculo.style.left = posicaoObstaculo + "px";

    verificarColisao();

    if (jogando) {
        requestAnimationFrame(atualizarJogo);
    }
}

function verificarColisao() {
    if (pulando || !jogando) return;

    const princesa = personagem.getBoundingClientRect();
    const arvore = obstaculo.getBoundingClientRect();

    const colidiu =
        princesa.left + 12 < arvore.right - 10 &&
        princesa.right - 12 > arvore.left + 10 &&
        princesa.bottom > arvore.top + 10 &&
        princesa.top < arvore.bottom - 5;

    if (colidiu && !tempoColisao) {
        tempoColisao = 1;
        vidas--;
        atualizarVidas();

        if (vidas <= 0) {
            terminarJogo();
            return;
        }

        obstaculo.style.left = "-100px";

        setTimeout(() => {
            tempoColisao = 0;
        }, 700);
    }
}

function terminarJogo() {
    jogando = false;
    teclas = {};

    tituloMensagem.textContent = "💔 Fim de jogo!";
    textoMensagem.textContent =
        "Você fez " + pontos + " pontos. Clique em Jogar novamente!";

    mensagem.classList.remove("escondida");
}

botaoJogar.addEventListener("click", iniciarJogo);
botaoNovamente.addEventListener("click", iniciarJogo);

botaoVoltar.addEventListener("click", () => {
    window.location.href = "https://thallytasalviano.github.io/atividade-jogo/";
});

botaoEsquerda.addEventListener("pointerdown", (evento) => {
    evento.preventDefault();
    andar(-1);
});

botaoDireita.addEventListener("pointerdown", (evento) => {
    evento.preventDefault();
    andar(1);
});

botaoPular.addEventListener("pointerdown", (evento) => {
    evento.preventDefault();
    pular();
});

document.addEventListener("keydown", (evento) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(evento.key)) {
        evento.preventDefault();
    }

    if (evento.key === "ArrowLeft") teclas.ArrowLeft = true;
    if (evento.key === "ArrowRight") teclas.ArrowRight = true;

    if (evento.key === "ArrowUp" || evento.code === "Space") {
        pular();
    }
});

document.addEventListener("keyup", (evento) => {
    if (evento.key === "ArrowLeft") teclas.ArrowLeft = false;
    if (evento.key === "ArrowRight") teclas.ArrowRight = false;
});

window.addEventListener("blur", () => {
    teclas = {};
});

atualizarVidas();

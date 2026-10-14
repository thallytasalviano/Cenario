
const personagem = document.getElementById("personagem");
const arvore = document.getElementById("arvore");
const cenario = document.getElementById("cenario");
const pontosTexto = document.getElementById("pontos");
const vidasTexto = document.getElementById("vidas");
const mensagem = document.getElementById("mensagem");
const tituloMensagem = document.getElementById("tituloMensagem");
const textoMensagem = document.getElementById("textoMensagem");
const botaoIniciar = document.getElementById("iniciar");
const botaoPular = document.getElementById("pular");
const botaoReiniciar = document.getElementById("reiniciar");

let jogando = false;
let pulando = false;
let vidas = 3;
let pontos = 0;
let velocidade = 260;
let posicaoArvore = 0;
let ultimoTempo = 0;
let animacao = null;
let tempoPulo = null;
let proximaArvore = 0;
let invulneravelAte = 0;

function atualizarPainel() {
    pontosTexto.textContent = pontos;
    vidasTexto.textContent =
        "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);
}

function pular() {
    if (!jogando || pulando) return;

    pulando = true;
    personagem.classList.add("pulando");

    clearTimeout(tempoPulo);

    tempoPulo = setTimeout(() => {
        personagem.classList.remove("pulando");
        pulando = false;
    }, 650);
}

function iniciarJogo() {
    cancelAnimationFrame(animacao);
    clearTimeout(tempoPulo);

    jogando = true;
    pulando = false;
    vidas = 3;
    pontos = 0;
    velocidade = 260;
    invulneravelAte = 0;
    ultimoTempo = 0;

    personagem.classList.remove("pulando");
    personagem.style.opacity = "1";

    posicaoArvore = cenario.clientWidth + 30;
    proximaArvore = 0;
    arvore.style.left = posicaoArvore + "px";

    mensagem.classList.add("escondida");
    atualizarPainel();

    animacao = requestAnimationFrame(jogar);
}

function jogar(tempoAtual) {
    if (!jogando) return;

    if (ultimoTempo === 0) {
        ultimoTempo = tempoAtual;
    }

    // Calcula o tempo para o movimento ficar mais regular.
    const delta = Math.min((tempoAtual - ultimoTempo) / 1000, 0.05);
    ultimoTempo = tempoAtual;

    // Faz a árvore se mover para a esquerda.
    posicaoArvore -= velocidade * delta;
    arvore.style.left = posicaoArvore + "px";

    // Verifica se a princesa bateu na árvore.
    const p = personagem.getBoundingClientRect();
    const a = arvore.getBoundingClientRect();

    const colidiu =
        p.left + 12 < a.right - 10 &&
        p.right - 12 > a.left + 10 &&
        p.top + 12 < a.bottom - 8 &&
        p.bottom - 5 > a.top + 8;

    if (
        colidiu &&
        !pulando &&
        performance.now() > invulneravelAte
    ) {
        perderVida();
    }

    // Quando a árvore sai da tela, ganha um ponto.
    if (posicaoArvore < -60 && proximaArvore === 0) {
        pontos++;
        proximaArvore = 1;
        atualizarPainel();

        // Aumenta a velocidade aos poucos.
        if (pontos % 5 === 0) {
            velocidade += 25;
        }
    }

    // Cria o próximo obstáculo.
    if (posicaoArvore < -60) {
        posicaoArvore =
            cenario.clientWidth + 100 + Math.random() * 140;

        arvore.style.left = posicaoArvore + "px";
        proximaArvore = 0;
    }

    animacao = requestAnimationFrame(jogar);
}

function perderVida() {
    vidas--;
    invulneravelAte = performance.now() + 1200;
    atualizarPainel();

    // Pisca a personagem depois da colisão.
    personagem.style.opacity = "0.35";

    setTimeout(() => {
        personagem.style.opacity = "1";
    }, 250);

    if (vidas <= 0) {
        fimDeJogo();
    }
}

function fimDeJogo() {
    jogando = false;
    cancelAnimationFrame(animacao);
    clearTimeout(tempoPulo);

    pulando = false;
    personagem.classList.remove("pulando");

    tituloMensagem.textContent = "💔 Fim de jogo!";
    textoMensagem.textContent =
        "Você conseguiu " + pontos + " pontos!";

    mensagem.classList.remove("escondida");
}

// Botões do jogo.
botaoIniciar.addEventListener("click", iniciarJogo);
botaoPular.addEventListener("click", pular);
botaoReiniciar.addEventListener("click", iniciarJogo);

// Também permite pular com a barra de espaço ou seta para cima.
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        pular();
    }
});

atualizarPainel();

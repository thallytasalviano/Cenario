
const personagem = document.getElementById("personagem");
const arvore = document.getElementById("arvore");
const pontosTexto = document.getElementById("pontos");
const mensagem = document.getElementById("mensagem");
const botaoIniciar = document.getElementById("iniciar");
const botaoPular = document.getElementById("pular");

// Estado do jogo
let jogando = false;
let pulando = false;
let pontos = 0;
let vidas = 3;
let velocidade = 6;
let posicaoArvore = 0;
let animacao;
let ultimoPonto = false;
let invulneravel = false;
let tempoPulo;

function atualizarPainel() {
    pontosTexto.textContent = pontos;

    let painelVidas = document.getElementById("vidas");

    if (!painelVidas) {
        painelVidas = document.createElement("div");
        painelVidas.id = "vidas";
        painelVidas.style.cssText =
            "position:absolute;top:65px;left:15px;" +
            "font-size:22px;z-index:20;";
        document.querySelector(".cenario").appendChild(painelVidas);
    }

    painelVidas.textContent =
        "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);
}

// Pular usando teclado ou botão
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

document.addEventListener("keydown", function(event) {
    if (
        event.code === "Space" ||
        event.code === "ArrowUp"
    ) {
        event.preventDefault();
        pular();
    }
});

botaoPular.addEventListener("click", pular);

// Iniciar ou reiniciar
function iniciarJogo() {
    cancelAnimationFrame(animacao);
    clearTimeout(tempoPulo);

    pontos = 0;
    vidas = 3;
    velocidade = 6;
    pulando = false;
    invulneravel = false;
    ultimoPonto = false;
    jogando = true;

    personagem.classList.remove("pulando");
    personagem.style.opacity = "1";

    posicaoArvore = document.querySelector(".cenario").clientWidth + 100;
    arvore.style.left = posicaoArvore + "px";
    arvore.style.display = "block";

    atualizarPainel();
    mensagem.style.display = "none";

    jogar();
}

// Loop principal e colisão
function jogar() {
    if (!jogando) return;

    posicaoArvore -= velocidade;
    arvore.style.left = posicaoArvore + "px";

    const p = personagem.getBoundingClientRect();
    const a = arvore.getBoundingClientRect();

    // Área de colisão entre princesa e árvore
    const colidiu =
        p.left + 15 < a.right - 12 &&
        p.right - 15 > a.left + 12 &&
        p.top + 15 < a.bottom - 8 &&
        p.bottom - 5 > a.top + 12;

    if (colidiu && !invulneravel && !pulando) {
        perderVida();
    }

    // Conta pontos quando a árvore passa
    if (a.right < p.left && !ultimoPonto) {
        pontos++;
        pontosTexto.textContent = pontos;
        ultimoPonto = true;

        if (pontos % 5 === 0) {
            velocidade += 0.5;
        }
    }

    // Cria o próximo obstáculo
    if (posicaoArvore < -100) {
        posicaoArvore =
            document.querySelector(".cenario").clientWidth +
            100 + Math.random() * 180;

        ultimoPonto = false;
    }

    animacao = requestAnimationFrame(jogar);
}

// Perder vida ao bater
function perderVida() {
    vidas--;
    invulneravel = true;

    atualizarPainel();

    // Pisca após a colisão
    personagem.style.opacity = "0.3";

    setTimeout(() => {
        personagem.style.opacity = "1";
    }, 150);

    setTimeout(() => {
        invulneravel = false;
    }, 1200);

    if (vidas <= 0) {
        fimDeJogo();
    }
}

// Fim de jogo
function fimDeJogo() {
    jogando = false;
    cancelAnimationFrame(animacao);

    mensagem.style.display = "block";
    mensagem.innerHTML = `
        <h2>💔 Fim de jogo!</h2>
        <p>Você fez ${pontos} pontos!</p>
        <p>Suas vidas acabaram.</p>
        <button id="reiniciar">JOGAR NOVAMENTE</button>
    `;

    document.getElementById("reiniciar")
        .addEventListener("click", iniciarJogo);
}

botaoIniciar.addEventListener("click", iniciarJogo);

atualizarPainel();

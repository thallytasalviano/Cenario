  
const personagem = document.getElementById("personagem");
const arvore = document.getElementById("arvore");
const cenario = document.getElementById("cenario");

const pontosEl = document.getElementById("pontos");
const vidasEl = document.getElementById("vidas");
const iniciarBtn = document.getElementById("iniciar");
const pularBtn = document.getElementById("pular");

const mensagem = document.getElementById("mensagem");
const tituloMensagem = document.getElementById("tituloMensagem");
const textoMensagem = document.getElementById("textoMensagem");
const reiniciarBtn = document.getElementById("reiniciar");

let rodando = false;
let pulando = false;
let pontos = 0;
let vidas = 3;
let obstaculoX = 0;
let velocidade = 5;
let frame = null;
let ultimoTempo = 0;
let invulneravel = false;
let tempoProtecao = null;

function atualizarPainel() {
    pontosEl.textContent = pontos;

    vidasEl.textContent =
        "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);
}

function pular() {
    if (!rodando || pulando) return;

    pulando = true;

    personagem.classList.remove("pulando");
    void personagem.offsetWidth;
    personagem.classList.add("pulando");

    setTimeout(() => {
        pulando = false;
        personagem.classList.remove("pulando");
    }, 650);
}

function iniciar() {
    if (frame !== null) {
        cancelAnimationFrame(frame);
    }

    if (tempoProtecao !== null) {
        clearTimeout(tempoProtecao);
        tempoProtecao = null;
    }

    rodando = true;
    pulando = false;
    pontos = 0;
    vidas = 3;
    velocidade = 5;
    ultimoTempo = 0;
    invulneravel = false;

    obstaculoX = cenario.clientWidth + 20;
    arvore.style.left = obstaculoX + "px";

    personagem.classList.remove("pulando");
    mensagem.classList.add("escondida");

    iniciarBtn.textContent = "Recomeçar jogo";

    atualizarPainel();
    frame = requestAnimationFrame(ciclo);
}

function colisao() {
    if (pulando) return false;

    const p = personagem.getBoundingClientRect();
    const a = arvore.getBoundingClientRect();

    const margem = 10;

    return (
        p.left + margem < a.right - margem &&
        p.right - margem > a.left + margem &&
        p.bottom - 4 > a.top + margem
    );
}

function ciclo(tempo) {
    if (!rodando) return;

    if (!ultimoTempo) ultimoTempo = tempo;

    const delta = Math.min(
        (tempo - ultimoTempo) / 16.67,
        2
    );

    ultimoTempo = tempo;

    obstaculoX -= velocidade * delta;

    const largura = cenario.clientWidth;

    if (obstaculoX < -60) {
        obstaculoX = largura + 20;
        pontos++;

        velocidade = Math.min(velocidade + 0.2, 10);

        atualizarPainel();
    }

    arvore.style.left = obstaculoX + "px";

    if (!invulneravel && colisao()) {
        vidas--;
        invulneravel = true;

        atualizarPainel();

        obstaculoX = largura + 30;
        arvore.style.left = obstaculoX + "px";

        tempoProtecao = setTimeout(() => {
            invulneravel = false;
            tempoProtecao = null;
        }, 700);

        if (vidas <= 0) {
            rodando = false;

            tituloMensagem.textContent = "Fim de jogo! 👑";

            textoMensagem.textContent =
                `Você fez ${pontos} ponto(s). Tente novamente!`;

            mensagem.classList.remove("escondida");
            iniciarBtn.textContent = "Começar jogo";

            frame = null;
            return;
        }
    }

    frame = requestAnimationFrame(ciclo);
}

iniciarBtn.addEventListener("click", iniciar);
pularBtn.addEventListener("click", pular);
reiniciarBtn.addEventListener("click", iniciar);

document.addEventListener("keydown", (evento) => {
    if (
        evento.code === "Space" ||
        evento.code === "ArrowUp"
    ) {
        evento.preventDefault();
        pular();
    }
});

atualizarPainel();

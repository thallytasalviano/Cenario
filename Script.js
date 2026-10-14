
const princesa = document.getElementById("princesa");
const cenario = document.querySelector(".cenario");

let posicao = 50;
let pulando = false;

document.addEventListener("keydown", function(event) {
    const larguraCenario = cenario.clientWidth;
    const larguraPrincesa = princesa.offsetWidth;

    if (event.key === "ArrowRight") {
        event.preventDefault();
        posicao = Math.min(posicao + 15, larguraCenario - larguraPrincesa);
        princesa.style.left = posicao + "px";
        princesa.classList.add("andando");
        princesa.style.transform = "scaleX(1)";
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        posicao = Math.max(posicao - 15, 0);
        princesa.style.left = posicao + "px";
        princesa.classList.add("andando");
        princesa.style.transform = "scaleX(-1)";
    }

    if (event.code === "Space" && !pulando) {
        event.preventDefault();
        pulando = true;
        princesa.classList.add("pulando");
    }
});

princesa.addEventListener("animationend", function(event) {
    if (event.animationName === "pular") {
        princesa.classList.remove("pulando");
        pulando = false;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        princesa.classList.remove("andando");
    }
});


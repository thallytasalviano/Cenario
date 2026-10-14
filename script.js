const formulario = document.getElementById("formPrincesa");
const lista = document.getElementById("listaPrincesas");
const botao = document.getElementById("botao");

let princesas = JSON.parse(localStorage.getItem("princesas")) || [];
let editando = null;

mostrarPrincesas();

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const princesa = {
        nome: document.getElementById("nome").value.trim(),
        reino: document.getElementById("reino").value.trim(),
        idade: document.getElementById("idade").value,
        poder: document.getElementById("poder").value.trim()
    };

    if (!princesa.nome || !princesa.reino ||
        !princesa.idade || !princesa.poder) {
        alert("Preencha todos os campos!");
        return;
    }

    if (editando !== null) {
        princesas[editando] = princesa;
        editando = null;
        botao.textContent = "Cadastrar";
    } else {
        princesas.push(princesa);
    }

    localStorage.setItem("princesas", JSON.stringify(princesas));

    formulario.reset();
    mostrarPrincesas();
});

function mostrarPrincesas() {
    lista.innerHTML = "";

    princesas.forEach(function(princesa, index) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h2>👑 ${princesa.nome}</h2>
            <p><strong>Reino:</strong> ${princesa.reino}</p>
            <p><strong>Idade:</strong> ${princesa.idade}</p>
            <p><strong>Poder:</strong> ${princesa.poder}</p>
            <div class="botoes">
                <button type="button" onclick="editarPrincesa(${index})">Editar</button>
                <button type="button" onclick="excluirPrincesa(${index})">Excluir</button>
                <button type="button" onclick="jogarPrincesa(${index})">Jogar</button>
            </div>
        `;

        lista.appendChild(card);
    });
}

function editarPrincesa(index) {
    const princesa = princesas[index];

    document.getElementById("nome").value = princesa.nome;
    document.getElementById("reino").value = princesa.reino;
    document.getElementById("idade").value = princesa.idade;
    document.getElementById("poder").value = princesa.poder;

    editando = index;
    botao.textContent = "Salvar alteração";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function excluirPrincesa(index) {
    if (confirm("Deseja excluir esta princesa?")) {
        princesas.splice(index, 1);
        localStorage.setItem("princesas", JSON.stringify(princesas));
        mostrarPrincesas();
    }
}

function jogarPrincesa(index) {
    localStorage.setItem(
        "princesaSelecionada",
        JSON.stringify(princesas[index])
    );

    window.location.href = "https://thallytasalviano.github.io/Cenario/";
}

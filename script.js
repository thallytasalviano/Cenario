
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 20px 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    background: linear-gradient(#ffe6f2, #fff8fc);
    color: #8c3268;
}

h1 {
    font-size: 25px;
    margin-bottom: 20px;
}

.painel {
    display: flex;
    justify-content: space-between;
    max-width: 700px;
    margin: 0 auto 10px;
    padding: 0 5px;
    font-size: 20px;
}

.cenario {
    position: relative;
    width: 100%;
    max-width: 700px;
    height: 300px;
    margin: 0 auto;
    overflow: hidden;
    border: 4px solid #e7a3cf;
    border-radius: 15px;
    background: linear-gradient(#9de5ff 0%, #e9faff 75%, #a9df83 75%);
}

.cenario::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35px;
    background: #77bd61;
    border-top: 4px solid #4e963f;
}

#personagem {
    position: absolute;
    z-index: 2;
    left: 45px;
    bottom: 30px;
    font-size: 52px;
    line-height: 1;
}

#personagem.pulando {
    animation: pulo 650ms ease-out;
}

@keyframes pulo {
    0% { bottom: 30px; }
    45% { bottom: 145px; }
    100% { bottom: 30px; }
}

#arvore {
    position: absolute;
    z-index: 2;
    left: 100%;
    bottom: 28px;
    font-size: 48px;
    line-height: 1;
}

.botoes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 18px;
}

button {
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    background: #d94f9a;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

button:active {
    transform: scale(0.96);
}

#mensagem {
    position: absolute;
    z-index: 5;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 238, 248, 0.94);
    padding: 15px;
}

#mensagem h2 {
    margin: 0 0 8px;
}

#mensagem p {
    font-size: 18px;
}

.escondida {
    display: none !important;
}

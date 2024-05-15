/* Variáveis Elementos */
const html = document.querySelector('html');
const timer = document.querySelector('#timer');
const image = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
/* Variáveis btn */
const startBtn = document.querySelector('.app__card-primary-button');
const focusBtn = document.querySelector('.app__card-button--foco');
const shortBtn = document.querySelector('.app__card-button--curto');
const longBtn = document.querySelector('.app__card-button--longo');
const allBtn = document.querySelectorAll('.app__card-button');
/* Variáveis Musica */
const musicInput = document.querySelector('#alternar-musica');
const focusMusic = new Audio("/sons/luna-rise-part-one.mp3");
focusMusic.loop = true;
/* Variáveis tipo temporizador */
const focusTimer = 1500;
const shortBreakTimer = 300;
const longBreakTimer = 900;

/* Eventos de Click */
musicInput.addEventListener("change", () => {
    if(focusMusic.paused)   {
        focusMusic.play();
    } else {
        focusMusic.pause();
    }
})
focusBtn.addEventListener('click', () => {
    alterarContexto('foco');
    focusBtn.classList.add('active');
})
shortBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    shortBtn.classList.add('active');
})
longBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longBtn.classList.add('active');
})

function alterarContexto(contexto) {
    allBtn.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    image.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            title.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
            case "descanso-curto":
                title.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;
            case "descanso-longo":
                title.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
            break;
        default:
            break;
    }
}
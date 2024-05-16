/* Variáveis Elementos */
const html = document.querySelector('html');
const timer = document.querySelector('#timer');
const image = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
/* Variáveis btn */
const startPauseBtn = document.querySelector('#start-pause');
const focusBtn = document.querySelector('.app__card-button--foco');
const shortBtn = document.querySelector('.app__card-button--curto');
const longBtn = document.querySelector('.app__card-button--longo');
const allBtn = document.querySelectorAll('.app__card-button');
/* Variáveis Musica */
const musicInput = document.querySelector('#alternar-musica');
const focusMusic = new Audio("/sons/luna-rise-part-one.mp3");
/* As 3 variáveis abaixo vão pegar o som que deve ser reproduzino no play no pause e no fim */
const audioPlay = new Audio("/sons/play.wav");
const audioPause = new Audio("/sons/pause.mp3");
const audioEnd = new Audio("/sons/beep.mp3");
focusMusic.loop = true;
/* Variáveis tipo temporizador */
const focusTimer = 1500;
const shortBreakTimer = 300;
const longBreakTimer = 900;
/* Variáveis temporizados */
/* Temos a variável intervaloId que tem como valor null, pois deve ser zerado. */
let temporizadorEmSegundos = 5;
let intervaloId = null;

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

/* Na arrow function de contagem regressiva, temos uma verificação aonde evitamos que os numeros do contador sejam negativos, além disso quando o temporizador for igual a zero ele irá tocar o som de audioEnd. */
const contagemRegressiva = () => {
    if(temporizadorEmSegundos <= 0) {
        audioEnd.play();
        stop();
        alert('Tempo Finalizado');
        return;
    }
    /* Para começar a decrementar o valor de temporizador usamos a variável -= 1, pega sempre o valor existente e subtrai 1 */
    temporizadorEmSegundos -= 1;
    console.log(temporizadorEmSegundos);
}
/* Encontramos o Event Listener para escutar o click e executar a função startOrPause */
startPauseBtn.addEventListener('click', startOrPause)

/* Na função startOrPause() temos uma condicional que tem como parâmetro o valor de intervaloId, além do play a musica de Pause do contador. */
function startOrPause() {
    if (intervaloId) {
        audioPause.play();
        stop();
        return;
    }
/* Abaixo encontramos o audio do Play para quando começarmos a contagem. */
    audioPlay.play();
    /* No intervaloId passamos o método setInterval com 2 parâmetros sendo ele a contagemRegressiva e o valor em segundos. */
    intervaloId = setInterval(contagemRegressiva, 1000);
}

/* Aqui encontramos a função clearInterval, que vai limpar o valor de intervaloId e será repassado o valor de null. */
function stop() {
    clearInterval(intervaloId);
    intervaloId = null;
}
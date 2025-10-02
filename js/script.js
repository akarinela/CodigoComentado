const timerEl = document.getElementById('timer'); // pega o elemento <h2 id="timer">, onde o tempo vai ser exibido.
const marksList = document.getElementById('marks-list'); // pega a <div id="marks-list">, onde as voltas vão aparecer.
let intervalId = 0; // vai guardando o id 
let timer = 0; // contador 
let marks = []; // guarda os tempos marcados

const formatTime = (time) => { // está em centésimos de segundos
    const hours = Math.floor(time / 360000); // 1h: 360000cen (60min x 60seg x 100)
    const minutes = Math.floor((time % 360000) / 6000); // resto do tempo dividido por 6000 (60 x 100)
    const seconds = Math.floor((time % 6000) / 100); //resto divivido por 100
    const hundredths = time % 100; // sobras

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

const setTimer = (time) => { // Atualiza o texto do cronômetro (<h2>).
    timerEl.innerText = formatTime(time);
}

const addMarkToList = (markIndex, markTime) => { // Insere uma nova linha dentro da lista com o número da marca (Marca 1, Marca 2...) e o tempo formatado.
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if (action == 'start' || action == 'continue') { // se está em start ou continue:
        intervalId = setInterval(() => { // criar um serLinterval que a cada 10ms adiciona no timer e atualizar o timer
            timer += 1; 
            setTimer(timer); 
    }, 10);
        button.setAttribute('action', 'pause'); // pause
        button.innerHTML = '<i class="fa-solid fa-pause"></i>'; // muda action para pause
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = '';
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);
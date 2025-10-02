// --- ELEMENTOS DO HTML ---
// Pega o elemento do HTML onde o tempo será exibido. A partir de agora, 'timerEl' representa esse elemento.
const timerEl = document.getElementById('timer'); 
// Pega a <div> onde a lista de voltas (marcas) será mostrada.
const marksList = document.getElementById('marks-list'); 

// --- VARIÁVEIS DE CONTROLE ---
// Armazena o ID do nosso 'setInterval'. É um número que usamos para poder pausar ou parar o cronômetro. Começa em 0.
let intervalId = 0; 
// A variável principal que conta o tempo em centésimos de segundo. Começa em 0.
let timer = 0; 
// Um array (lista) que vai guardar cada tempo que o usuário marcar ("volta").
let marks = []; 

// --- FUNÇÕES ---

/**
 * Converte o tempo (em centésimos de segundo) para o formato HH:MM:SS:CC.
 * @param {number} time - O tempo em centésimos de segundo.
 * @returns {string} - O tempo formatado como texto.
 */
const formatTime = (time) => { 
    // Calcula as horas dividindo o tempo total por 360000 (100 centésimos * 60 segundos * 60 minutos).
    const hours = Math.floor(time / 360000); 
    // Calcula os minutos pegando o "resto" da divisão das horas e dividindo por 6000 (100 centésimos * 60 segundos).
    const minutes = Math.floor((time % 360000) / 6000); 
    // Calcula os segundos pegando o "resto" da divisão dos minutos e dividindo por 100.
    const seconds = Math.floor((time % 6000) / 100); 
    // Os centésimos são simplesmente o "resto" da divisão por 100.
    const hundredths = time % 100; 

    // Monta a string final, garantindo que cada parte tenha sempre 2 dígitos (ex: '01' em vez de '1').
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

/**
 * Atualiza o texto do cronômetro na tela.
 * @param {number} time - O tempo atual do contador.
 */
const setTimer = (time) => { 
    // Chama a função formatTime para formatar o número e atualiza o conteúdo de texto do elemento na tela.
    timerEl.innerText = formatTime(time);
}

/**
 * Adiciona uma nova marca de tempo (volta) na lista visível na tela.
 * @param {number} markIndex - O número da volta (ex: 1, 2, 3...).
 * @param {number} markTime - O tempo capturado para essa volta.
 */
const addMarkToList = (markIndex, markTime) => { 
    // Adiciona um novo parágrafo (<p>) ao HTML da lista de marcas. O `+=` garante que as marcas anteriores não sejam apagadas.
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

/**
 * Função principal que controla o botão de Iniciar/Pausar/Continuar.
 */
const toggleTimer = () => {
    // Pega o botão principal de controle.
    const button = document.getElementById('power');
    // Pega o valor do atributo 'action' do botão. É assim que sabemos se ele deve 'iniciar', 'pausar' ou 'continuar'.
    const action = button.getAttribute('action');

    // Limpa qualquer 'setInterval' que já esteja rodando. Isso previne que vários contadores rodem ao mesmo tempo.
    clearInterval(intervalId);

    // Se a ação for 'start' (primeiro clique) ou 'continue' (clique depois de pausar)...
    if (action == 'start' || action == 'continue') { 
        // ...iniciamos um novo 'setInterval'.
        intervalId = setInterval(() => { // A função dentro do setInterval será executada a cada 10 milissegundos.
            timer += 1; // Incrementa nosso contador de tempo.
            setTimer(timer); // Atualiza o valor na tela.
        }, 10);
        // Atualiza o estado do botão para 'pause', para que o próximo clique seja uma pausa.
        button.setAttribute('action', 'pause'); 
        // Muda o ícone do botão para o de pausa.
        button.innerHTML = '<i class="fa-solid fa-pause"></i>'; 
    
    // Se a ação for 'pause'...
    } else if (action == 'pause') {
        // ...o 'clearInterval' lá em cima já pausou o cronômetro.
        // Apenas atualizamos o estado do botão para 'continue', para que o próximo clique retome a contagem.
        button.setAttribute('action', 'continue');
        // Mudamos o ícone do botão de volta para o de 'play'.
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

/**
 * Marca o tempo atual ("volta") quando o botão de marcar é clicado.
 */
const markTime = () => {
    // Adiciona o valor atual do 'timer' ao final do nosso array 'marks'.
    marks.push(timer);
    // Chama a função para exibir essa nova marca na tela, usando o tamanho do array para saber o número da volta.
    addMarkToList(marks.length, timer);
}

/**
 * Reseta o cronômetro para o estado inicial.
 */
const resetTimer = () => {
    // Para completamente o contador.
    clearInterval(intervalId);
    // Zera a variável do tempo.
    timer = 0;
    // Esvazia o array de marcas.
    marks = [];
    // Atualiza a tela para mostrar "00:00:00:00".
    setTimer(timer);
    // Limpa a lista de marcas da tela.
    marksList.innerHTML = '';
    // Pega o botão de controle...
    const button = document.getElementById('power');
    // ...e redefine seu estado inicial para 'start'.
    button.setAttribute('action', 'start');
    // ...e seu ícone para 'play'.
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// --- EVENT LISTENERS (OUVINTES DE EVENTO) ---
// Adiciona um "ouvinte" ao botão 'power'. Quando ele for clicado, a função 'toggleTimer' será executada.
document.getElementById('power').addEventListener('click', toggleTimer);
// Adiciona um "ouvinte" ao botão 'mark'. Quando clicado, executa a função 'markTime'.
document.getElementById('mark').addEventListener('click', markTime);
// Adiciona um "ouvinte" ao botão 'reset'. Quando clicado, executa a função 'resetTimer'.
document.getElementById('reset').addEventListener('click', resetTimer);
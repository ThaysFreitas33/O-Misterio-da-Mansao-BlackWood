const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let selectedPathQuestions = []; // Variável para armazenar o caminho selecionado

const initialQuestions = [
    {
        text: "Escolha o cenário inicial:",
        answers: [
            { text: "Residência BlackWood", nextPath: "A" },
            { text: "Pela Empresa", nextPath: "B" }
        ]
    }
];

const pathAQuestions = [
    {
        text: "Você adentra a casa. Qual área deseja investigar primeiro?",
        answers: [
            { text: "Cozinha", nextQuestion: 1 },
            { text: "Sala de estar", nextQuestion: 2 }
        ]
    },
    {
        text: "Na cozinha, você encontra um bilhete suspeito. Deseja lê-lo?",
        answers: [
            { text: "Sim", nextQuestion: 3 },
            { text: "Não", nextQuestion: 4 }
        ]
    },
    {
        text: "Fim do caminho A! Você encontrou uma pista crucial!",
        answers: []
    }
];

const pathBQuestions = [
    {
        text: "Você chega na empresa. Deseja ir diretamente à sala do chefe ou verificar os arquivos?",
        answers: [
            { text: "Sala do chefe", nextQuestion: 1 },
            { text: "Arquivos", nextQuestion: 2 }
        ]
    },
    {
        text: "Na sala do chefe, você encontra uma gaveta trancada. Deseja tentar abri-la?",
        answers: [
            { text: "Sim", nextQuestion: 3 },
            { text: "Não", nextQuestion: 4 }
        ]
    },
    {
        text: "Fim do caminho B! Você descobriu um segredo importante!",
        answers: []
    }
];

function startGame() {
    currentQuestionIndex = 0;
    selectedPathQuestions = []; // Reseta o caminho escolhido
    restartButton.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestions = selectedPathQuestions.length > 0 ? selectedPathQuestions : initialQuestions;

    if (currentQuestionIndex >= currentQuestions.length) {
        alert("Fim do jogo!");
        showRestart();
        return;
    }

    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionText.innerText = currentQuestion.text;
    answerButtons.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    updateBackground(answer.text);

    if (answer.nextPath) {
        // Define o caminho e seleciona o conjunto de perguntas correspondente
        selectedPathQuestions = answer.nextPath === "A" ? pathAQuestions : pathBQuestions;
        currentQuestionIndex = 0;
        showQuestion();
        return;
    }

    if (answer.nextQuestion !== undefined) {
        currentQuestionIndex = answer.nextQuestion;
        showQuestion();
    } else {
        alert("Fim do jogo.");
        showRestart();
    }
}

function updateBackground(answerText) {
    const backgrounds = {
        "Residência BlackWood": "url('assets/img/background-mansao.png')",
        "Pela Empresa": "url('assets/img/background-empresa.png')",
        "Cozinha": "url('assets/img/background-cozinha.png')",
        "Sala de estar": "url('assets/img/background-sala-estar.png')",
        "Sala do chefe": "url('assets/img/background-sala-chefe.png')",
        "Arquivos": "url('assets/img/background-arquivos.png')"
    };

    document.body.style.backgroundImage = backgrounds[answerText] || "none";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

function showRestart() {
    restartButton.classList.remove('hidden');
}

restartButton.addEventListener('click', startGame);

// Inicia o jogo
startGame();

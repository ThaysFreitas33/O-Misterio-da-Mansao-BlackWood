const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;

const questions = [
    {
        text: "Escolha o cenário inicial:",
        answers: [
            { text: "Residência BlackWood", nextQuestion: 1 },
            { text: "Pela Empresa", nextQuestion: 2 }
        ]
    },
    {
        text: "Você adentra a casa sem saber ainda se está totalmente vazia, decidindo iniciar pela cozinha, local onde foi encontrado o bilhete. Tudo se encontra limpo desde a noite interior, o que significa que quaisquer sinais de digitais ou pegadas sumiram.", 

        answers: [
            { text: "Continuar explorando", nextQuestion: 3 },

        ]
    },
    {
        text: "Andando mais um pouco, você encontra um pequeno caderno. Você decide passar o olho por ele até que encontra uma página intitulada de “Restrições”. Nela estão as mais especificações de alimentos e dietas que podiam e não podiam ser feitas a partir do paladar de Brandão. As restrições pareciam ter sido escritas às pressas, dentre todas, no meio estava perdido “Nada de camarão” grifado em vermelho.",
        answers: [
            { text: "Saio da sala", nextQuestion: 6 }
        ]
    },
    {
        text: "Você imediatamente fica confuso. Luiz, o cozinheiro, alegou não saber da alergia de seu chefe, então como ele podia ter anotado essa informação e simplesmente não ter lembrado dela? Luiz era apenas um funcionário novato, mas você raciocina que se ele estivesse tão preocupado com o seu emprego, teria se atentado a um detalhe tão importante quanto esse.",
        answers: [
            { text: "Investigar o celular", nextQuestion: 7 },
            { text: "Ignorar e seguir em frente", nextQuestion: 8 }
        ]
    },
    {
        text: "Escadas: Há um quarto com uma porta entreaberta. Deseja investigar?",
        answers: [
            { text: "Investigar o quarto", nextQuestion: 9 },
            { text: "Continuar sem investigar", nextQuestion: 10 }
        ]
    },
    {
        text: "Na sala de Robert: Você percebe passos vindo. O que fazer?",
        answers: [
            { text: "Continuo procurando", nextQuestion: 11, incorrect: true },
            { text: "Saio imediatamente", nextQuestion: 12 }
        ]
    },
    {
        text: "Sala principal: Você encontrou novas pistas. Deseja retornar?",
        answers: [
            { text: "Voltar para a mansão", nextQuestion: 13 },
            { text: "Continuar na empresa", nextQuestion: 14 }
        ]
    },
    {
        text: "Veronica está furiosa com a invasão. O que fazer?",
        answers: [
            { text: "Confrontá-la", nextQuestion: 15, incorrect: true },
            { text: "Sair rapidamente", nextQuestion: 16 }
        ]
    },
    {
        text: "Chegou ao final! Quem é o assassino?",
        answers: [
            { text: "Sophia", isCorrect: false },
            { text: "Luiz", isCorrect: false },
            { text: "Verônica", isCorrect: true },
            { text: "Robert", isCorrect: false }
        ]
    }
];

function startGame() {
    currentQuestionIndex = 0;
    restartButton.classList.add('hidden');
    nextButton.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("Fim do jogo! Obrigado por jogar.");
        showRestart();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
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
    // Alterar o background ao selecionar "Residência BlackWood"
    if (answer.text === "Residência BlackWood") {
        document.body.style.backgroundImage = "url('assets/img/background-mansao.png')"; // Substitua pelo caminho correto da imagem
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

    if (answer.text === "Continuar explorando") {
        document.body.style.backgroundImage = "url('assets/img/background3.png')"; // Substitua pelo caminho correto da imagem
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }


    // Verificar se a resposta está correta ou incorreta
    if (answer.isCorrect) {
        alert("Parabéns, você solucionou o caso!");
        showRestart();
    } else if (answer.incorrect) {
        alert("Escolha incorreta! Você foi removido do caso.");
        showRestart();
    } else if (answer.nextQuestion !== undefined) {
        currentQuestionIndex = answer.nextQuestion;
        showQuestion();
    } else {
        alert("Resposta inválida ou sem próximo passo!");
    }
}



function showRestart() {
    restartButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
}

restartButton.addEventListener('click', startGame);

startGame();

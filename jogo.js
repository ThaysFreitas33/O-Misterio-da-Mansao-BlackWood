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
        text: "Você adentra a casa sem saber ainda se está totalmente vazia. Decidindo iniciar pela cozinha, local onde foi encontrado o bilhete. Tudo se encontra limpo desde a noite anterior, o que significa que quaisquer sinais de digitais ou pegadas sumiram.",
        answers: [
            { text: "Continuar investigando", nextQuestion: 2 }
        ]
    },
    {
        text: "Andando mais um pouco, você encontra um pequeno caderno. Você decide passar o olho por ele até que encontra uma página intitulada de “Restrições”. Nela estão as especificações de alimentos e dietas que podiam e não podiam ser feitas a partir do paladar de Brandão. As restrições pareciam ter sido escritas às pressas, dentre todas, no meio estava perdido “Nada de camarão” grifado em vermelho.",
        answers: [
            { text: "Continuar investigando", nextQuestion: 3 }
        ]
    },
    {
        text: "Você imediatamente fica confuso. Luiz, o cozinheiro, alegou não saber da alergia de seu chefe, então como ele podia ter anotado essa informação e simplesmente não ter lembrado dela? Luiz era apenas um funcionário novato, mas você raciocina que, se ele estivesse tão preocupado com o seu emprego, teria se atentado a um detalhe tão importante quanto esse.",
        answers: [
            { text: "Investigar o próximo local", nextQuestion: 4 }
        ]
    },
    {
        text: "Você devolve o caderno para o local onde encontrou, se retirando da cozinha e navegando em outras áreas da casa. Andando lentamente, você encontra uma porta estranha no corredor que leva para um cômodo desconhecido. Que informações podem ter lá? Parece muito chamativo. ",
        answers: [
            { text: "Explorar o resto da casa", nextQuestion: 5 },
            { text: "Abrir a porta e entrar", nextQuestion: 6 }
        ]
    },
    {
        text: "Passando pela porta, você escolhe averiguar outros cômodos convenientes da casa. Subindo as escadas, se encontra o quarto de Brandão e sua esposa Sophia, aparentemente vazio.",
        answers: [
            { text: "Investigar o quarto", nextQuestion: 7 },
        ]
    },
    
    {
        text: "Escolha ruim. A porta dava para um porão, um local mal cuidado, abandonado e sem nenhuma iluminação, você acaba escorregando pela escada que já estava em condições ruins de se pisar, perdendo a noção de qual canto foi parar pelo tamanho enorme do porão, parece que a porta se trancou sozinha. O porão também parece ter isolamento acústico, então não se é capaz de ouvir o que vem de dentro e muito menos o que vem de fora. Com isso, so lhe resta encarar o desafio para escapar ou reiniciar o jogo",
        answers: [
            { text: "Encarar o desafio", nextQuestion: 9 },
            { text: "Abandonar o jogo", nextQuestion: 10 }
        ]
    },

    {
        text: "Escolha ruim. A porta dava para um porão, um local mal cuidado, abandonado e sem nenhuma iluminação, você acaba escorregando pela escada que já estava em condições ruins de se pisar, perdendo a noção de qual canto foi parar pelo tamanho enorme do porão, parece que a porta se trancou sozinha. O porão também parece ter isolamento acústico, então não se é capaz de ouvir o que vem de dentro e muito menos o que vem de fora. Com isso, so lhe resta encarar o desafio para escapar ou reiniciar o jogo",
        answers: [
            { text: "Encarar o desafio", nextQuestion: 11 },
            { text: "Abandonar o jogo", nextQuestion: 22 }
        ]
    },
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
    // Alterar o fundo de acordo com a resposta
    if (answer.text === "Residência BlackWood") {
        document.body.style.backgroundImage = "url('assets/img/background-mansao.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

    if (answer.text === "Continuar investigando") {
        document.body.style.backgroundImage = "url('assets/img/background3.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

    if (answer.text === "Abrir a porta e entrar") {
        document.body.style.backgroundImage = "url('assets/img/background-porao.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

    if (answer.text === "Explorar o resto da casa") {
        document.body.style.backgroundImage = "url('assets/img/background-6.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

    if (answer.text === "Investigar o quarto") {
        document.body.style.backgroundImage = "url('assets/img/background7.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

    if(answer.text === "Explorar o resto da casa"){
        document.body.style.back
    }



    // Verificar se a resposta está correta, incorreta ou tem próximo passo
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

// Inicia o jogo
startGame();

//  text: "Chegou ao final! Quem é o assassino?",
// answers: [
   //     { text: "Sophia", isCorrect: false },
     //   { text: "Luiz", isCorrect: false },
       // { text: "Verônica", isCorrect: true },
       // { text: "Robert", isCorrect: false }
    //]
// }
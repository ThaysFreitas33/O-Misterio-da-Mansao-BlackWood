const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let selectedPathQuestions = [];
let startTime;
let timerInterval;

const initialQuestions = [
    {
        text: "Por onde acha mais adequado começar?",
        answers: [
            { text: "Pela residência BlackWood", nextPath: "A" },
            { text: "Pela empresa", nextPath: "B" }
        ]   
    }
];

const pathAQuestions = [
    {
        id: "inicio",
        text: "Você decide investigar a Residência BlackWood. Ao chegar, você encontra um caderno com a anotação 'Nada de camarão'. Luiz, o cozinheiro, disse não saber da alergia de Brandão. Isso não faz sentido. O que fazer agora?",
        answers: [
            { text: "Investigar a porta estranha no corredor", nextQuestion: 1 },
            { text: "Continuar explorando a casa", nextQuestion: 2 }
        ]
    },
    {
        id: "porta",
        text: "Você investiga a porta estranha, mas cai no porão e fica preso. Não há como sair.",
        answers: [
            { text: "Reiniciar", Restart },
        ]
    },
    {
        id: "casa",
        text: "Você continua explorando a casa e encontra o quarto de Brandão e Sophia. Lá, encontra um brinco dourado. Quem poderia ser o dono desse brinco?",
        answers: [
            { text: "Investigar mais a fundo", nextQuestion: 3 },
            { text: "Sair do quarto", nextQuestion: 4 }
        ]
    },
    {
        id: "brinco",
        text: "O brinco encontrado não é de Sophia, que usa somente prata, indicando a presença de outra mulher. Você decide investigar mais fora do quarto.",
        answers: [
            { text: "Próximo", nextQuestion: 4 },
        ]
    },
    {
        id: "foto",
        text: "Ao sair no corredor, você encontra uma foto rasgada de Brandão e Verônica. Há sinais de um relacionamento complicado entre pai e filha. Com essas descobertas você decide ir para a delegacia.",
        answers: [
            { text: "Ir para a delegacia", nextQuestion: 5 }
        ]
    },
    {
        id: "delegacia",
        text: "No caminho para a delegacia, você encontra uma cabana. Lá, encontra um porta-retrato e taças com marcas de batom roxo, você vê que atrás da foto há a data “Março, 2020”. Ao lado há uma notinha de compra com informações desbotadas, mas ainda dando para ver a data de compra e o produto, “14 de novembro de 2020” foram compradas duas garrafas de vinho. Você esuta barulhos semelhantes a passos do lado de fora da cabana. O que fazer?",
        answers: [
            { text: "Investigar mais", nextQuestion: 6 },
            { text: "Averiguar do lado de fora", nextQuestion: 7 }
        ]
    },
    {
        id: "erro-cabana",
        text: "Escolha ruim, a pessoa que você encontrou lá fora não era bem intencionada, antes que você percebesse, seus olhos e sua boca foram tapados. Ela sabia perfeitamente o que era o local onde você estava, e que você definitivamente não deveria estar lá. Tudo fica escuro, você não sabe para onde está sendo levado. ",
        answers: [
            { text: "Reiniciar", Restart },
            { text: "Ir para o labirinto", nextQuestion: 8 }
        ]
    },
    {
        id: "labirinto-cabana",
        text: "Em uma das gavetas, você encontra um desenho antigo, parece ter sido feito por uma criança, neles estão três pessoas, com os nomes em cima “Pai” “Mãe” “Eu”  e “amor”  com corações. As coisas que se encontram nesse local parecem verdadeiramente íntimas.",
        answers: [
            { text: "Não sair", Restart },
            { text: "Sair", nextQuestion: 6 }
        ]
    },
    {
        id: "cabana",
        text: "Em uma das gavetas, você encontra um desenho antigo, parece ter sido feito por uma criança, neles estão três pessoas, com os nomes em cima “Pai” “Mãe” “Eu”  e “amor”  com corações. As coisas que se encontram nesse local parecem verdadeiramente íntimas.",
        answers: [
            { text: "Ir para a delegacia e investigar mais", nextQuestion: 9 }
        ]
    },
    {
        id: "delegacia-2",
        text: "Através de registros, você descobre que a primeira esposa de Brandão se chama Amélia, morreu há dois anos atrás, em 2022, através de envenenamento e poucos meses depois, Brandão se casou outra vez, dessa vez com Sophia. Minimamente estranho para quem supostamente deveria estar de luto pela esposa.",
        answers: [
            { text: "Próximo", nextQuestion: 10 }
        ]
    },
    {
        id: "delegacia-3",
        text: "O seu expediente está finalizando, mas você lembra que ainda pode haver informações cruciais na empresa da qual Brandão trabalhava, então decide passar por lá.",
        answers: [
            { text: "Ir para a empresa de Brandão", nextQuestion: 11}
        ]
    },
    {
        id: "empresa",
        text: "Você encontra a sala de Brandão, uma das principais, que por algum motivo, estava aberta, a sala parecia de certa forma ter sido revirada. Além da desorganização, encontrava-se uma parte da quina da mesa de vidro quebrada, como se alguém tivesse batido ali. Não parecia ser por acidente… parecia efeito de uma briga. Próximo ao chão, era possível ver algo brilhando, se tratava de um anel, especificamente de uma aliança, patenteada de um nome feminino e ao lado, o nome “Robert” ",
        answers: [
            { text: "Continuar investigando", nextQuestion: 12 },
            { text: "Sair da sala", nextQuestion: 13 }
        ]
    },
    {
        id: "salas",
        text: "Em cima da mesa, era possível ver vários papeis remexidos, você decide olhar melhor, percebendo que são comparativos de vendas feitas por Brandão e por Robert, como se instigasse uma espécie de competição. Isso significa que… eles não trabalham exatamente juntos? Mas trabalham buscando superar um ao outro? Você reuniu o máximo de pistas possível, vá para o final.",
        answers: [
            { text: "Ir para a conclusão", nextQuestion: 14  }
        ]
    },
    {
        id: "final",
        text: "Parabéns por chegar até aqui! Agora quem você acha que é o assassino?",
        answers: [
            { text: "Certo", Restart },
            { text: "Errado", Restart },
        ]
    },
    {
        id: "erro",
        text: "Você errou! Reinicie o jogo e tentar descobrir ou saber agora quem era o assassino! ",
        answers: [
            { text: "Reiniciar", Restart },
        ]
    },
    {
        id: "acerto",
        text: "Parabéns! Você descobriu que Verônica é a assassina. Ela envenenou Brandão por vingança!",
        answers: [
            { text: "Início", Restart }
        ]
    },
    {
        id: "resolução",
        text: "A verdadeira assassina é a Veronica. A primeira pista que o jogo nos deixa, é Verônica em seu interrogatório revelar que sabia do bilhete, e nenhuma das outros suspeitos sequer o mencionou. Como Veronica poderia saber do bilhete se somente o cozinheiro e você sabiam da existência dele? ",
        answers: [
            { text: "Saber mais", nextQuestion: "infos" },
            { text: "Início", Restart }
        ]
    },
    {
        id: "infos",
        text: "Brandão era um homem de muito poder político em FishTown, a sociedade sempre colocou muita pressão nele e em Robert para ver quem seria melhor do que o outro em ajuda a causas sociais. Para ambos, manter seus status social limpo sempre foi uma grande prioridadeBrandão teve uma primeira esposa chamada Amélia, Veronica tinha nascido muito antes de eles formalizarem um casamento. Meses depois Amélia descobriu a infidelidade do marido com Sophia, ameaçando expor para a imprensa o tipo de homem que ele era. A fim de evitar isso, Sophia e Brandão se uniram para levar Amélia a óbito de forma minuciosa, através de envenenamento. Um tempo depois, Sophia e Brandão se casaram, mas Veronica, agora crescida, próximo do aniversário de seu pai, descobriu sobre a infidelidade e também do homicídio planejado de sua mãe, e de que mesmo após Brandão ter se casado de novo, ele continuou sendo infiel. Em forma de vingança, “envenenou” seu pai assim como ele fez com sua primeira esposa, só que dessa vez, com uma alergia extremamente perigosa. Para cobrir seus rastros, escreveu um bilhete anônimo e deixou com o cozinheiro novo, Luiz, sabendo que dificilmente ele não aceitaria uma suposta ordem. A intenção em si de Veronica era fazer seu pai passar muito mal, mas não necessariamente matá-lo, então seu desespero no interrogatório é genuíno. ",
        answers: [
            { text: "Início", Restart }
        ]
    },
    {
        id: "labirinto",
        text: "Você está no labirinto. Complete o desafio do Arduino para escapar!",
        answers: []
    },
    {
        id: "reiniciar",
        text: "O jogo será reiniciado.",
        answers: []
    }
];

const pathBQuestions = [
    {
        id: "inicio",
        text: "Chegando na empresa, você percebe que o local parece se concentrar muito em evidenciar os rostos de Brandão e Robert, ao lado mostrando algumas de suas ações relevantes para FishTown. Não é difícil reparar que os murmúrios dos funcionários são sobre seus lamentos pela morte de Brandão, e certas “comemorações” por Robert ter passado em sua frente. Que tipo de relação eles costumam ter de fato além do pessoal e profissional? ",
        answers: [
            { text: "Investigar a sala de Robert", nextQuestion: 1 },
        ]
    },
    {
        id: "sala-robert",
        text: "Você entra na sala de Robert e encontra seu computador aberto. Ele está em um site de notícias, com manchetes destacando sua ascensão social após a morte de Brandão. Você repara que há alguns contratos assinados ao lado, uma letra rúbrica e ágil em sua escrita, bem diferente da fonte de texto que você encontrou no bilhete, o que talvez diminua as chances de ele ter sido escrito por Robert.. Passos fora da sala são ouvidos. O que fazer?",
        answers: [
            { text: "Ficar e continuar procurando", nextQuestion: 2 },
            { text: "Sair da sala rapidamente", nextQuestion: 3 }
        ]
    },
    
    {
        id: "erro-robert",
        text: "Robert entra e te pega mexendo em suas coisas sem permissão. Apesar de você ter mandato, a situação se complica. Você é afastado do caso.",
        answers: [
            { text: "Reiniciar", Restart },
        ]
    },
    {
        id: "sair-robert",
        text: "Você sai da sala de Robert sem ser notado e decide voltar para a Mansão BlackWood.",
        answers: [
            { text: "Continuar investigando na mansão", nextQuestion: 4 }
        ]
    },
    {
        id: "mansao",
        text: "Já na Mansão BlackWood, um celular de repente começa a tocar muitas notificações, você se aproxima e percebe que são respostas a mensagens de reclamações, aparentemente a respeito do salário. O único que trabalha nesta casa é Luiz, então há grandes chances de esse celular pertencer a ele Mas por quais motivos ele estaria reclamando do salário? Brandão sempre foi uma pessoa muito bem sucedida. Luiz de fato mencionou na entrevista que jamais faria algo do gênero por dinheiro… mas será que ele é confiável. ",
        answers: [
            { text: "Explorar o andar superior", nextQuestion: 5 }
        ]
    },
    {
        id: "andar-superior",
        text: "No andar superior, você visualiza um comôdo com a porta entreaberta.  Ao adentrar, você nota ser o quarto de Veronica, com muitas coisas chamando a atenção. Uma delas é um cofre, que está brilhando perto de uma cômoda, se Veronica tiver uma informação interessante para o caso, talvez esteja lá. ",
        answers: [
            { text: "Tentar abrir o cofre", nextQuestion: 6 },
            { text: "Procurar em lugares mais seguros", nextQuestion: 7 }
        ]
    },
    {
        id: "cofre",
        text: "Você tenta abrir o cofre, mas não tem informações suficientes. Um alarme dispara e Verônica aparece. Ela te acusa de tentativa de roubo, e você é afastado do caso.",
        answers: [
            { text: "Reiniciar", Restart },
            { text: "Ir para o labirinto", nextQuestion: 8 }
        ]
    },
    {
        id: "labirinto-cofre",
        text: "Você tenta abrir o cofre, mas não tem informações suficientes. Um alarme dispara e Verônica aparece. Ela te acusa de tentativa de roubo, e você é afastado do caso.",
        answers: [
            { text: "Não saiu", Restart },
            { text: "Saiu", nextQuestion: 9 }
        ]
    },
    {
        id: "pistas-seguras",
        text: "Você foi cauteloso, não há como adivinhar a senha do cofre sabendo tão pouco sobre Veronica, com isso acaba encontrando um fundo falso no armário, com arquivos médicos detalhando a alergia de Brandão a camarão. Isso levanta questões: por que Verônica guardaria isso?",
        answers: [
            { text: "Investigar mais no quarto", nextQuestion: 10 }
        ]
    },
    {
        id: "quarto-veronica",
        text: "Você olha mais atentamente o resto do quarto, embaixo da cama encontra um diário e uma caixa onde dentro dela há uma chave e várias fotos de um casal após um casamento. O homem ligeiramente mais jovem parece ser Brandão, ao lado de uma mulher que não é Sophia. Seria essa a primeira esposa dele? A verdade é que olhando de longe, Veronica não parecia ser filha de Sophia de fato. E aquela chave? Para que servia? ",
        answers: [
            { text: "Tentar abrir o diário ali mesmo", nextQuestion: 11 },
            { text: "Ir para um local seguro para abrir", nextQuestion: 12 }
        ]
    },
    {
        id: "erro-diario",
        text: "Você tenta abrir o diário ali mesmo. Sophia aparece e, chocada, te acusa de invadir a privacidade de Verônica. Você é afastado do caso.",
        answers: [
            { text: "Reiniciar", Restart },
            { text: "Ir para o labirinto", nextQuestion: 13 }
        ]
    },
    {
        id: "labirinto-diario",
        text: "Você tenta abrir o diário ali mesmo. Sophia aparece e, chocada, te acusa de invadir a privacidade de Verônica. Você é afastado do caso.",
        answers: [
            { text: "Não saiu", Restart },
            { text: "Saiu", nextQuestion: 14 }
        ]
    },
    {
        id: "diario",
        text: "Você abre o diário em um local seguro. Nele, Verônica descreve seu ódio pelo pai e pela madrasta, mencionando que Brandão causou a morte de sua mãe e que Sophia é cúmplice.",
        answers: [
            { text: "Decidir quem é o culpado", nextQuestion: 15 }
        ]
    },
    {   id: "final",
        text: "Parabéns por chegar até aqui! Agora quem você acha que é o assassino?",
        answers: [
            { text: "Certo", Restart },
            { text: "Errado", Restart },
        ]
    },
    {
        id: "erro",
        text: "Você errou! Deseja reiniciar o jogo e tentar descobrir ou saber agora quem era o assassino? ",
        answers: [
            { text: "Reiniciar", Restart },
            { text: "Saber resolução", nextQuestion: 16 }
        ]
    },
    {
        id: "acerto",
        text: "Parabéns! Você descobriu que Verônica é a assassina. Ela envenenou Brandão por vingança!",
        answers: [
            { text: "Início", Restart }
        ]
    },
    {
        id: "resolução",
        text: "A verdadeira assassina é a Veronica. A primeira pista que o jogo nos deixa, é Verônica em seu interrogatório revelar que sabia do bilhete, e nenhuma das outros suspeitos sequer o mencionou. Como Veronica poderia saber do bilhete se somente o cozinheiro e você sabiam da existência dele? ",
        answers: [
            { text: "Saber mais", nextQuestion: 17 },
            { text: "Início", Restart }
        ]
    },
    {
        id: "infos",
        text: "Brandão era um homem de muito poder político em FishTown, a sociedade sempre colocou muita pressão nele e em Robert para ver quem seria melhor do que o outro em ajuda a causas sociais. Para ambos, manter seus status social limpo sempre foi uma grande prioridadeBrandão teve uma primeira esposa chamada Amélia, Veronica tinha nascido muito antes de eles formalizarem um casamento. Meses depois Amélia descobriu a infidelidade do marido com Sophia, ameaçando expor para a imprensa o tipo de homem que ele era. A fim de evitar isso, Sophia e Brandão se uniram para levar Amélia a óbito de forma minuciosa, através de envenenamento. Um tempo depois, Sophia e Brandão se casaram, mas Veronica, agora crescida, próximo do aniversário de seu pai, descobriu sobre a infidelidade e também do homicídio planejado de sua mãe, e de que mesmo após Brandão ter se casado de novo, ele continuou sendo infiel. Em forma de vingança, “envenenou” seu pai assim como ele fez com sua primeira esposa, só que dessa vez, com uma alergia extremamente perigosa. Para cobrir seus rastros, escreveu um bilhete anônimo e deixou com o cozinheiro novo, Luiz, sabendo que dificilmente ele não aceitaria uma suposta ordem. A intenção em si de Veronica era fazer seu pai passar muito mal, mas não necessariamente matá-lo, então seu desespero no interrogatório é genuíno. ",
        answers: [
            { text: "Início", Restart }
        ]
    },
    {
        id: "labirinto",
        text: "Você está no labirinto. Complete o desafio do Arduino para escapar!",
        answers: []
    },
    {
        id: "reiniciar",
        text: "O jogo será reiniciado.",
        answers: []
    }
    
];

// Função para iniciar o jogo
function startGame() {
    currentQuestionIndex = 0;
    selectedPathQuestions = [];
    restartButton.classList.add('hidden');
    startTime = new Date();
    startTimer();
    showQuestion();
}

// Função para tratar a resposta selecionada
function selectAnswer(answer) {
    if (answer.nextPath) {
        // Atualiza para o caminho escolhido
        selectedPathQuestions = answer.nextPath === "A" ? pathAQuestions : pathBQuestions;
        currentQuestionIndex = 0;
        showQuestion();
        return;
    }

    if (answer.nextQuestion !== undefined) {
        currentQuestionIndex = answer.nextQuestion;
        showQuestion();
    } else {
        stopTimer();
        showEndGame();
    }
}


// Função para iniciar o cronômetro
// Função para iniciar o jogo
function startGame() {
    currentQuestionIndex = 0;
    selectedPathQuestions = [];
    restartButton.classList.add('hidden');
    startTime = new Date();
    startTimer();
    showQuestion();
}

function Restart() {
    currentQuestionIndex = 0;
    selectedPathQuestions = [];
    restartButton.classList.add('hidden');
    startTime = new Date();
    startTimer();
    showQuestion();
}
// Função para tratar a resposta selecionada
function selectAnswer(answer) {
    if (answer.nextPath) {
        // Atualiza para o caminho escolhido
        selectedPathQuestions = answer.nextPath === "A" ? pathAQuestions : pathBQuestions;
        currentQuestionIndex = 0;
        showQuestion();
        return;
    }

    if (answer.nextQuestion !== undefined) {
        currentQuestionIndex = answer.nextQuestion;
        showQuestion();
    } else {
        stopTimer();
        showEndGame();
    }
}

// Função para iniciar o cronômetro
function startTimer() {
    const timerDisplay = document.getElementById('container-cronometro');
    if (!timerDisplay) {
        console.error("Elemento com id 'container-cronometro' não encontrado.");
        return;
    }
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timerDisplay.innerText = `Tempo: ${elapsedTime}s`;
    }, 1000);
}

// Função para parar o cronômetro
function stopTimer() {
    clearInterval(timerInterval);
}

// Função para mostrar as perguntas e respostas
function showQuestion() {
    const currentQuestions = selectedPathQuestions.length > 0 ? selectedPathQuestions : initialQuestions;

    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');

    if (!questionText || !answerButtons) {
        console.error("Elemento(s) necessário(s) não encontrado(s):", !questionText ? "'question-text'" : "", !answerButtons ? "'answer-buttons'" : "");
        return;
    }

    if (currentQuestionIndex >= currentQuestions.length) {
        stopTimer();
        showEndGame();
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

// Função para atualizar o fundo de acordo com a resposta
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

// Função para mostrar o fim do jogo
function showEndGame() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const playerName = prompt("Fim do jogo! Digite seu nome para registrar no ranking:");

    if (playerName) {
        saveRanking(playerName, elapsedTime);
        // Redireciona o usuário para a página de ranking
        window.location.href = "ranking.html";
    } else {
        alert("Nome é obrigatório para registrar no ranking!");
        showRestart();
    }
}

// Garantir que o DOM esteja completamente carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {
    // O código JavaScript só será executado após o carregamento completo do DOM.
    startGame(); // Inicia o jogo quando a página for carregada.
});


function saveRanking(playerName, elapsedTime) {
    const rankings = JSON.parse(localStorage.getItem('rankings')) || [];
    rankings.push({ name: playerName, time: elapsedTime });
    rankings.sort((a, b) => a.time - b.time);
    localStorage.setItem('rankings', JSON.stringify(rankings));
}


function showRestart() {
    restartButton.classList.remove('hidden');
}

restartButton.addEventListener('click', Restart());

// Inicia o jogo
startGame();
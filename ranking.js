// Dados fictícios para exemplo
const players = [
    { name: "Jogador1", score: 150 },
    { name: "Jogador2", score: 120 },
    { name: "Jogador3", score: 100 },
    { name: "Jogador4", score: 80 },
    { name: "Jogador5", score: 60 }
];

// Função para carregar o ranking na tabela
function loadRanking() {
    const rankingTable = document.getElementById("ranking-table");
    rankingTable.innerHTML = ""; // Limpa a tabela antes de preencher

    players
        .sort((a, b) => b.score - a.score) // Ordena pela pontuação decrescente
        .forEach((player, index) => {
            const row = document.createElement("tr");

            const positionCell = document.createElement("td");
            positionCell.textContent = index + 1;

            const nameCell = document.createElement("td");
            nameCell.textContent = player.name;

            const scoreCell = document.createElement("td");
            scoreCell.textContent = player.score;

            row.appendChild(positionCell);
            row.appendChild(nameCell);
            row.appendChild(scoreCell);
            rankingTable.appendChild(row);
        });
}

// Botão de voltar ao jogo
document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "index.html"; // Altere para o caminho da página inicial
});

// Inicializa o ranking ao carregar a página
window.addEventListener("DOMContentLoaded", loadRanking);

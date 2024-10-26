const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const celebration = document.getElementById('celebration');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;
let score = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            message.textContent = `${currentPlayer} Kazandı!`;
            celebration.innerHTML = `🎉 ${currentPlayer} Kazandı! 🎉`;
            celebration.classList.remove('hidden');
            updateScore(currentPlayer);
            return;
        }
    }
    if (!boardState.includes(null)) {
        message.textContent = "Oyun Berabere!";
        celebration.classList.add('hidden');
    }
}

function updateScore(winner) {
    score[winner]++;
    scoreX.textContent = `X: ${score.X}`;
    scoreO.textContent = `O: ${score.O}`;
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    celebration.classList.add('hidden');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

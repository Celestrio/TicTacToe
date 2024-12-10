const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'T'; // T for Tie
}

// Update the status message
function updateStatus(message) {
    status.textContent = message;
}

// Handle a cell click
function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] || isGameOver) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        isGameOver = true;
        if (winner === 'T') {
            updateStatus("It's a Tie!");
        } else {
            updateStatus(`${winner} wins!`);
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`${currentPlayer}'s turn`);
    }
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    updateStatus("X's turn");
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);

// Initialize game status
updateStatus("X's turn");

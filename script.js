const cells = document.querySelectorAll('[data-cell]');
const alertBox = document.getElementById('alertBox');
const alertMessage = document.getElementById('alertMessage');
const alertButton = document.getElementById('alertButton');
let turn = 'X';
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

alertButton.addEventListener('click', () => {
    alertBox.style.display = 'none';
    resetGame();
});

function handleClick(e) {
    const cell = e.target;
    cell.textContent = turn;
    if (checkWin(turn)) {
        setTimeout(() => {
            showAlert(`${turn} gagne !`);
        }, 100);
    } else if (isDraw()) {
        setTimeout(() => {
            showAlert('Match nul !');
        }, 100);
    } else {
        turn = turn === 'X' ? 'O' : 'X';
    }
}

function checkWin(currentTurn) {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentTurn;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function showAlert(message) {
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    turn = 'X';
}
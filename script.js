// Sélectionner toutes les cellules avec l'attribut 'data-cell'
const cells = document.querySelectorAll('[data-cell]');
// Sélectionner l'élément de la boîte d'alerte par son ID
const alertBox = document.getElementById('alertBox');
// Sélectionner l'élément du message d'alerte par son ID
const alertMessage = document.getElementById('alertMessage');
// Sélectionner le bouton d'alerte par son ID
const alertButton = document.getElementById('alertButton');

// Initialiser le tour à 'X'
let turn = 'X';

// Définir toutes les combinaisons gagnantes
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

// Ajouter un écouteur d'événement 'click' à chaque cellule
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

// Ajouter un écouteur d'événement 'click' au bouton d'alerte
alertButton.addEventListener('click', () => {
    alertBox.style.display = 'none'; // Cacher la boîte d'alerte
    resetGame(); // Réinitialiser le jeu
});

// Fonction appelée lorsqu'une cellule est cliquée
function handleClick(e) {
    const cell = e.target;
    cell.textContent = turn;  // Affiche le tour actuel dans la cellule
    if (checkWin(turn)) {
        setTimeout(() => {
            showAlert(`${turn} gagne !`); // Affiche un message de victoire
        }, 100);
    } else if (isDraw()) {
        setTimeout(() => {
            showAlert('Match nul !'); // Affiche un message de match nul
        }, 100);
    } else {
        turn = turn === 'X' ? 'O' : 'X'; // Change de tour
    }
}

// Cette fonction vérifie si le tour actuel a gagné
function checkWin(currentTurn) {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentTurn;
        });
    });
}

// Cette fonction vérifie si le jeu est un match nul
function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

// Cette fonction affiche un message d'alerte
function showAlert(message) {
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

// Cette fonction réinitialise le jeu
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = ''; // Vide le contenu de chaque cellule
        cell.addEventListener('click', handleClick, { once: true }); // Réajoute l'écouteur d'événement 'click'
    });
    turn = 'X'; // Réinitialise le tour à 'X'
}
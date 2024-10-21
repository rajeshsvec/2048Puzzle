const boardSize = 4;
let board = [];

const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

// Define directions for movement
const directions = {
    'w': { x: 0, y: -1 },  // up
    's': { x: 0, y: 1 },   // down
    'a': { x: -1, y: 0 },  // left
    'd': { x: 1, y: 0 }    // right
};

// Initialize the game board
function initializeBoard() {
    board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = 0;
        }
    }
    addRandomTile();
    addRandomTile();
    renderBoard();
}

// Add a random tile (2 or 4) to the board
function addRandomTile() {
    let emptyCells = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Render the board to the screen
function renderBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cellValue = board[i][j];
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (cellValue > 0) {
                cell.textContent = cellValue;
                cell.classList.add(`cell-${cellValue}`);
            }
            gameBoard.appendChild(cell);
        }
    }
}

// Move cells in the given direction
function move(direction) {
    const { x, y } = directions[direction];
    const merged = [];

    if (x === 0) {  // Moving up or down
        for (let col = 0; col < boardSize; col++) {
            let newCol = [];
            for (let row = 0; row < boardSize; row++) {
                if (board[row][col] !== 0) {
                    newCol.push(board[row][col]);
                }
            }
            for (let i = 0; i < newCol.length; i++) {
                if (i < newCol.length - 1 && newCol[i] === newCol[i + 1]) {
                    newCol[i] *= 2;
                    newCol.splice(i + 1, 1);
                }
            }
            for (let i = 0; i < boardSize; i++) {
                board[i][col] = newCol[i] || 0;
            }
        }
    } else if (y === 0) {  // Moving left or right
        for (let row = 0; row < boardSize; row++) {
            let newRow = [];
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col] !== 0) {
                    newRow.push(board[row][col]);
                }
            }
            // Merge the tiles
            for (let i = newRow.length - 1; i > 0; i--) {
                if (newRow[i] === newRow[i - 1]) {
                    newRow[i] *= 2;
                    newRow.splice(i - 1, 1);
                }
            }
            // Fill remaining spaces with 0
            while (newRow.length < boardSize) {
                newRow.unshift(0);  // Adding 0s to the start to simulate pushing to the right
            }

            // Update the row in the board
            board[row] = newRow;
        }
    }
    addRandomTile();
    renderBoard();
}


// Event listener for keyboard controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
        case 'W':
            move('w');  // Move up
            break;
        case 's':
        case 'S':
            move('s');  // Move down
            break;
        case 'a':
        case 'A':
            move('a');  // Move left
            break;
        case 'd':
        case 'D':
            move('d');  // Move right
            break;
        default:
            break;
    }
});

// Restart button functionality
restartBtn.addEventListener('click', initializeBoard);

// Initialize the game on load
initializeBoard();

//your JS code here. If required.
let currentPlayer = 1;
let board = ['', '', '', '', '', '', '', '', ''];
let players = ['', ''];

function startGame() {
    players[0] = document.getElementById('player-1').value;
    players[1] = document.getElementById('player-2').value;

    document.querySelector('.message').innerText = `${players[currentPlayer - 1]}, you're up`;

    document.getElementById('player-1').disabled = true;
    document.getElementById('player-2').disabled = true;
    document.getElementById('submit').disabled = true;

    renderBoard();
}

function renderBoard() {
    const boardDiv = document.querySelector('.board');
    boardDiv.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.id = i + 1;
        cell.addEventListener('click', handleCellClick);
        boardDiv.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cellId = event.target.id - 1;

    if (board[cellId] === '' && !checkWinner()) {
        board[cellId] = currentPlayer === 1 ? 'X' : 'O';
        document.getElementById(cellId + 1).innerText = board[cellId];

        if (checkWinner()) {
            document.querySelector('.message').innerText = `${players[currentPlayer - 1]}, congratulations you won!`;
        } else {
            currentPlayer = 3 - currentPlayer; // Switch player
            document.querySelector('.message').innerText = `${players[currentPlayer - 1]}, you're up`;
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            return true;
        }
    }

    return false;
}

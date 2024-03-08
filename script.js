document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submit');
  const inputContainer = document.getElementById('input-container');
  const gameContainer = document.getElementById('game-container');
  const messageElement = document.querySelector('.message');
  const board = document.getElementById('board');

  let currentPlayer = 'X';
  let player1Name, player2Name;

  submitButton.addEventListener('click', function () {
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;

    if (player1Name && player2Name) {
      inputContainer.style.display = 'none';
      gameContainer.style.display = 'block';
      messageElement.textContent = `${player1Name}, you're up!`;
      initializeBoard();
    }
  });

  function initializeBoard() {
    board.addEventListener('click', handleCellClick);
  }

  function handleCellClick(event) {
    const cell = event.target;

    if (!cell.textContent) {
      cell.textContent = currentPlayer;
      checkForWinner();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      messageElement.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, you're up!`;
    }
  }

  function checkForWinner() {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const winningCombos = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
      [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
      [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (cells[a - 1].textContent && cells[a - 1].textContent === cells[b - 1].textContent && cells[a - 1].textContent === cells[c - 1].textContent) {
        messageElement.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, congratulations you won!`;
        board.removeEventListener('click', handleCellClick);
        break;
      }
    }
  }
});

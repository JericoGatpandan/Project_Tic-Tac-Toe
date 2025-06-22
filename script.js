const Gameboard = () => {
  let board = [null, null, null, null, null, null, null, null, null];

  return {
    getBoard() {
      return [...board];
    },
    setMark(index, mark) {
      if (index != null && board[index] == null) {
        board[index] = mark;
        return true;
      }
      return false;
    },
    resetBoard() {
      board.fill(null);
    },
  };
};

const Player = (name, mark) => {
  let score = 0;
  return {
    getName() {
      return name;
    },
    getMark() {
      return mark;
    },
    getScore() {
      return score;
    },
    addScore() {
      score++;
    },
  };
};

const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector(".status-text");
const restartBtn = document.querySelector(".restart");

let player1 = Player("Player 1", "X");
let player2 = Player("Player 2", "O");

let board = Gameboard();
let currentPlayer = player1;
let running = false;

initializedGame();

function initializedGame() {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer.getName()}'s turn`;
  running = true;
}

function boxClicked() {
  const boxIndex = this.dataset.index;
  if (board.getBoard()[boxIndex] != null || !running) {
    return;
  }
  updateBox(this, boxIndex);
  checkWinner();
}
function updateBox(box, index) {
  board.setMark(index, currentPlayer.getMark());
  box.textContent = currentPlayer.getMark();
}
function changePlayer() {
  currentPlayer = currentPlayer == player1 ? player2 : player1;
  statusText.textContent = `${currentPlayer.getName()}'s turn`;
}
function checkWinner() {
  let roundWon = false;
  let boardArray = board.getBoard();

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];

    if (
      boardArray[a] == null ||
      boardArray[b] == null ||
      boardArray[c] == null
    ) {
      continue;
    }
    if (boardArray[a] === boardArray[b] && boardArray[b] === boardArray[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer.getName()} wins`;
    running = false;
  } else if (!boardArray.includes(null)) {
    statusText.textContent = "Draw!";
  } else {
    changePlayer();
  }
}
function restartGame() {
  board.resetBoard();
  boxes.forEach((box) => (box.textContent = ""));
  currentPlayer = player1;
  statusText.textContent = `${currentPlayer.getName()}'s turn`;
  running = true;
}

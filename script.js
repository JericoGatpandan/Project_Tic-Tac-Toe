let boxes = document.querySelectorAll(".box");
let turnX = true;

const GameBoard = function () {
  const board = [null, null, null, null, null, null, null, null, null];

  return {
    getBoard() {
      return [...board];
    },
    setMark(index, mark) {
      if (board[index] == null) {
        board[index] = mark;
        return index;
      }
    },

    resetBoard() {
      board.fill(null);
    },
  };
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const index = parseInt(box.dataset.index);

    if (turnX) {
      box.innerText = "X";
      turnX = false;
      box.disabled = true;
      board.setMark(index, "X");
    } else {
      box.innerText = "O";
      turnX = true;
      board.setMark(index, "O");
      box.disabled = true;
    }
  });
});

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

const winning_combo = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let board = GameBoard();

let player1 = Player("Player 1", "X");
let player2 = Player("Player 2", "O");

let boardArray = board.getBoard();

console.log(boardArray);

function checkWin(boardArray) {
  for (let combo of winning_combo) {
    const [a, b, c] = combo;
    if (
      boardArray[a] !== null &&
      boardArray[a] === boardArray[b] &&
      boardArray[b] === boardArray[c]
    ) {
      return boardArray[a];
    }
  }
  return null;
}

const result = checkWin(board.getBoard());

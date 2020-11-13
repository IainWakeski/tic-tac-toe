var player1 = "";
var player2 = "";

var board = "";

var document = "";

player1 = "O";
player2 = "X";

var board_full = false;
board = ["", "", "", "", "", "", "", "", ""];

var board_area = document.querySelector(".board");

var winner_condition = document.getElementById("winner");

var check_if_board_complete = () => {
  let flag = true;
  board.forEach(element => {
    if (element != player1 && element != player2) {
      flag = false;
    }
  });
  board_full = flag;
};

const check_line = (a, b, c) => {
  return (
    board[a] == board[b] &&
    board[b] == board[c] &&
    (board[a] == player1 || board[a] == player2)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      return board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      return board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    return board[0];
  }
  if (check_line(2, 4, 6)) {
    return board[2];
  }
  return "";
};

const check_for_winner = () => {
  let res = check_match();
  if (res == player1) {
    winner.innerText = "Player 1 Wins!!!";
    winner.classList.add("player1Win");
    board_full = true;
  } else if (res == player2) {
    winner.innerText = "Player 2 Wins!!!";
    winner.classList.add("player2Win");
    board_full = true;
  } else if (board_full) {
    winner.innerText = "It's a draw! Try again.";
    winner.classList.add("draw");
  }
};

const render_board = () => {
  board_area.innerHTML = "";
  board.forEach((e, i) => {
    board_area.innerHTML += `<td id="slot_${i}" onclick="addPlayer1Move(${i})">${board[i]}</td>`;
    if (e == player1 || e == player2) {
      document.querySelector(`#slot_${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  check_if_board_complete();
  check_for_winner();
};

const addPlayer1Move = e => {
  if (!board_full && board[e] === "") {
    board[e] = player;
    game_loop();
    addPlayer2Move();
  }
};

const addPlayer2Move = () => {
  if (!board_full) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (board[selected] !== "");
    board[selected] = player2;
    game_loop();
  }
};

const reset_board = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.classList.remove("player1Win");
  winner.classList.remove("player2Win");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

//initial render
render_board();
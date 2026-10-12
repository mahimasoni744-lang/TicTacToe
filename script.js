let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameOver = false;

let scoreX = 0;
let scoreO = 0;

const cells = document.querySelectorAll(".cell");

const status = document.getElementById("status");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

const newGameButton = document.getElementById("newGame");
const resetScoreButton = document.getElementById("resetScore");


const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        let index = cell.getAttribute("data-index");

        if (board[index] !== "" || gameOver) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();

    });

});


function checkWinner() {

    for (let pattern of winningPatterns) {

        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            gameOver = true;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            status.textContent = "🎉 Player " + currentPlayer + " Wins!";

            if (currentPlayer === "X") {

                scoreX++;

                scoreXElement.textContent = scoreX;

            } else {

                scoreO++;

                scoreOElement.textContent = scoreO;

            }

            return;
        }
    }


    if (!board.includes("")) {

        gameOver = true;

        status.textContent = "🤝 It's a Draw!";

        return;
    }


    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";

    }


    status.textContent = "Player " + currentPlayer + "'s Turn";

}


newGameButton.addEventListener("click", function() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameOver = false;

    status.textContent = "Player X's Turn";


    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");

    });

});


resetScoreButton.addEventListener("click", function() {

    scoreX = 0;
    scoreO = 0;

    scoreXElement.textContent = "0";
    scoreOElement.textContent = "0";

});



const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let editedPlayer = 0
let activePlayer = 0
let currentRound = 1
let gameIsOver = false
const players = [
    {
        name: "",
        symbol: "X",
    },
    {
        name: "",
        symbol: "O",
    }
]

const playerConfig = document.getElementById("config-overlay");
const backDrop = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorElement = document.getElementById("error");
const gameArea = document.getElementById("active-game")
const activePlayerElement = document.getElementById("active-player")
const gameOver = document.getElementById("gameover")
const cancelButton = document.getElementById("cancel-btn");
const editPlayer1Button = document.getElementById("player1");
const editPlayer2Button = document.getElementById("player2");
const startButton = document.getElementById("start-btn");
const gamefields = document.querySelectorAll("#game-board li");
const gameBoardElement = document.getElementById("game-board")

editPlayer1Button.addEventListener("click", openPlayerConfig);
editPlayer2Button.addEventListener("click", openPlayerConfig);
cancelButton.addEventListener("click", closePlayerConfig);
backDrop.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayer);

startButton.addEventListener("click", startNewGame);

for (const gamefield of gamefields) {
    gamefield.addEventListener("click", selectGameField)

}
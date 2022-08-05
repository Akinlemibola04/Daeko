function reset() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOver.firstElementChild.innerHTML = 'You won, <span id="winner">PLAYER NAME</span>!';
    gameOver.style.display = "none"

    let gameIndex = 0
    for (let i =0; i <3; i++) {
        for (let j = 0; j < 3; j++ ) {
            gameData[i][j] = 0;
            gameBoardElement.children[gameIndex].textContent = ""
            gameBoardElement.children[gameIndex].classList.remove("disabled");
            gameIndex++
        }
    }
}

function startNewGame() {
    if (players[0].name === "" || players[1].name === "") {
        alert("Edit player name!")
        return;
    }
    reset();
    activePlayerElement.textContent = players[activePlayer].name;
    gameArea.style.display = "block";
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1
    } else {
        activePlayer = 0
    }
    activePlayerElement.textContent = players[activePlayer].name
}

function selectGameField(event) {
    if (event.target.tagName !== "LI" || gameIsOver) {
        return;
    }

    const selectedColumn = event.target.dataset.col - 1
    const selectedRow = event.target.dataset.row - 1

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("Please select an empty field!")
        return;
    }
    event.target.textContent = players[activePlayer].symbol
    event.target.classList.add("disabled")


    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    const winnerId = checkWinner()

    if (winnerId !==0) {
        endGame(winnerId);
    }
    currentRound++
    switchPlayer();
}

function checkWinner() {
    for (let i = 0; i<3; i++) {

        if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
            return gameData[i][0]
        }
    }

    for (let i = 0; i<3; i++) {

        if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[0][i] === gameData[2][i]) {
            return gameData[0][i]
        }
    }

    if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
    return gameData[0][0]
}

if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
    return gameData[2][0]
}

if (currentRound === 9) {
    return -1
}
  return 0; 
}

function endGame(winnerId) {
    gameIsOver = true
    gameOver.style.display = "block"
    if (winnerId > 0){

        const winnerName = players[winnerId-1].name
        gameOver.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOver.firstElementChild.textContent = "It's a draw!!"
    }
}
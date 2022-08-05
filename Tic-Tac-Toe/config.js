function openPlayerConfig(event) {
    const selectedPlayerId = +event.target.dataset.playerid;
    editedPlayer = selectedPlayerId
    playerConfig.style.display = "block"
    backDrop.style.display = "block"
}

function closePlayerConfig(){
    playerConfig.style.display = "none"
    backDrop.style.display = "none"
    formElement.firstElementChild.classList.remove("errormessage")
    errorElement.textContent = "";
    formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayer(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get("username").trim();

    if(!enteredPlayerName) {
        event.target.firstElementChild.classList.add("errormessage")
        errorElement.textContent = "Please enter a valid name!";
        return;
    }

    const updatedPlayerData = document.getElementById("player-" + editedPlayer + "-data");
    updatedPlayerData.children[1].textContent = enteredPlayerName

    players[editedPlayer - 1].name = enteredPlayerName

    closePlayerConfig();
    
}
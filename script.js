const originalValues = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
values = [...originalValues];

function startGame(){
    const startButton = document.getElementById("startButton");
    shuffle(values);
    gameBoard();
    hideCards();
}

// mélange 
function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// cacher les cartes
function hideCards(){
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.setAttribute("cardHidden", "true");
    });
}

// dessiner le board
function gameBoard(){
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";

    for(let i = 0; i < 16; i++){
        const card = document.createElement("div");
        card.classList.add("card");
        card.addEventListener("click", function(){
            this.classList.add("revealed");
         });

        const value = values[i];

        card.dataset.value = value;

        card.textContent = value;

        board.appendChild(card);
    }
}
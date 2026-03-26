const originalValues = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
values = [...originalValues];
let moveCount = 0;
let nombrePaire = 0;
let bestMoveCount = 100;

function startGame(){
    const startButton = document.getElementById("startButton");
    shuffle(values);
    moveCount = 0;
    document.getElementById("moveCount").textContent = `${moveCount}`;
    nombrePaire = 0;
    document.getElementById("nombrePaire").textContent = `${nombrePaire}`;
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
            checkCards();
         });

        const value = values[i];

        card.dataset.value = value;

        card.textContent = value;

        board.appendChild(card);
    }
}

//verifier les cartes
function checkCards(){
    const revealedCards = document.querySelectorAll(".card.revealed");
    if(revealedCards.length <= 2){
        updateMoveCount();
        if(revealedCards[0].dataset.value === revealedCards[1].dataset.value){
            revealedCards[0].classList.add("defrevealed");
            revealedCards[1].classList.add("defrevealed");
            nombrePaire++;
            document.getElementById("nombrePaire").textContent = `${nombrePaire}`;
            checkWin();
            removeCards();
        }
        else{ 
            setTimeout(() => {
                removeCards();
            }, 2000);    
        }
    }
    else{
        return;
    }
}

// enlever les cartes
function removeCards(){
    const revealedCards = document.querySelectorAll(".card.revealed");
    revealedCards[0].classList.remove("revealed");
    revealedCards[1].classList.remove("revealed");
}
// compter le nombre de coups
function updateMoveCount(){
    moveCount++;
    document.getElementById("moveCount").textContent = `${moveCount}`;
}

// verifier si le jeu est terminé
function checkWin(){
    if(nombrePaire === 8){setTimeout(() => {
            alert(`Félicitations ! Vous avez gagné en ${moveCount} coups.`);
            updateBestScore();
        }, 1000);
    }
}

// mettre a jour le meilleur score
function updateBestScore(){
    if(moveCount < bestMoveCount){
        bestMoveCount = moveCount;
        document.getElementById("bestMoveCount").textContent = `${bestMoveCount}`;
    }
}

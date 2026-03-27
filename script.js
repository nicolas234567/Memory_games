const difficultySettings = {
    easy: 8,
    medium: 16,
    hard: 32
};
const img = {
    1: "images/1.svg",
    2: "images/2.svg",
    3: "images/3.svg",
    4: "images/4.svg",
    5: "images/5.svg",
    6: "images/6.svg",
    7: "images/7.svg",
    8: "images/8.svg",
    9: "images/9.svg",
    10: "images/10.svg",
    11: "images/11.svg",
    12: "images/12.svg",
    13: "images/13.svg",
    14: "images/14.svg",
    15: "images/15.svg",
    16: "images/16.svg"
};

let moveCount = 0;
let nombrePaire = 0;
let currentDifficulty = "easy";
const bestScores = {
    easy: 1000,
    medium: 1000,
    hard: 1000
}

function startGame(){
    const startButton = document.getElementById("startButton");
    difficulty();
    shuffle(values);
    moveCount = 0;
    document.getElementById("moveCount").textContent = `${moveCount}`;
    nombrePaire = 0;
    document.getElementById("nombrePaire").textContent = `${nombrePaire}`;
    gameBoard(difficultyValues);
    hideCards();
}

// réglage de la difficulté et génération des valeurs
function difficulty(){
    const difficultySelect = document.getElementById("difficulty");
    const selectedDifficulty = difficultySelect.value;
    currentDifficulty = difficultySelect.value;
    let size = difficultySettings[selectedDifficulty];
    difficultyValues = Array.from({ length: size }, (_, i) => i + 1);
    value = Array.from({ length: size/2 }, (_, i) => i + 1);
    values = value.concat(value);
}

// mélange 
function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// dessiner le board
function gameBoard(){
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";
    if(difficultyValues.length > 16){
        board.classList.add("cardContainer", "hard");
    }
    else{
        board.classList.remove("hard");
    }

    // créer les cartes
    let lenValues = difficultyValues.length;
    for(let i = 0; i < lenValues; i++){
        const card = document.createElement("div");
        card.classList.add("card");
        const value = values[i];

        //ajout des images
        const images = document.createElement("img");
        images.src = img[value];
        images.classList.add("card-image");

        card.appendChild(images);

        // gestion du clic
        card.addEventListener("click", function(){
            if(this.classList.contains("revealed")){
                return ;
            }
            else{
                this.classList.add("revealed");
                checkCards();
                removeCards();
                this.classList.add("revealed");
            }
         });

        card.dataset.value = value;

        board.appendChild(card);
    }
}

//verifier les cartes
function checkCards(){
    const revealedCards = document.querySelectorAll(".card.revealed");
    if(revealedCards.length === 2){
        updateMoveCount();
        if(revealedCards[0].dataset.value === revealedCards[1].dataset.value){
            revealedCards[0].classList.add("defrevealed");
            revealedCards[1].classList.add("defrevealed");
            nombrePaire++;
            document.getElementById("nombrePaire").textContent = `${nombrePaire}`;
            checkWin();
        }
    }
}

// enlever les cartes
function removeCards(){
    const revealedCards = document.querySelectorAll(".card.revealed");
    if(revealedCards.length === 3){
        revealedCards.forEach(card => {
            card.classList.remove("revealed");
        });
    }
}
// compter le nombre de coups
function updateMoveCount(){
    moveCount++;
    document.getElementById("moveCount").textContent = `${moveCount}`;
}

// verifier si le jeu est terminé
function checkWin(){
    if(nombrePaire === values.length / 2){setTimeout(() => {
            alert(`Félicitations ! Vous avez gagné en ${moveCount} coups.`);
            updateBestScore(currentDifficulty);
        }, 1000);
    }
}

// mettre a jour le meilleur score
function updateBestScore(){
    if (moveCount < bestScores[currentDifficulty]) {
        bestScores[currentDifficulty] = moveCount;

        if (currentDifficulty === "easy") bestMoveCountEasy = moveCount;
        if (currentDifficulty === "medium") bestMoveCountMedium = moveCount;
        if (currentDifficulty === "hard") bestMoveCountHard = moveCount;

        document.getElementById("bestMoveCount").textContent = `${moveCount}`;
    }
}

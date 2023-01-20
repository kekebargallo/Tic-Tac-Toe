const x = "╳";
const o = "◯";
let gameState = "p1";

const squares = Array.from(document.querySelectorAll(".square"));

const turnsContainer = document.querySelector("#turnsContainer");
const turns = turnsContainer.querySelector("h2");
turns.innerText = `Turn of ${gameState}`
turns.setAttribute('class', 'p1');

const dialog = document.querySelector("dialog");
const modalH2 = dialog.querySelector("H2");
const modalH3 = dialog.querySelector("H3");

const win = (winnerMovement) => {
    turns.innerText = '';
    squares.forEach((square, i)=> {
        if(winnerMovement.includes(i)){
            square.classList.add('winner');
        };
    });
    dialog.setAttribute('class', 'winModal');
    showModal(`${gameState.toUpperCase()}`, true)
    gameState = 'concluded';
};

const tie = () => {
    turns.innerText = '';
    showModal('Tie', false);
    gameState = 'concluded';
}

const showModal = (result, win) => {
    modalH2.innerText = result;
    win && modalH2.setAttribute('class', gameState);
    modalH3.innerText = win ? 'won' : ''; 
    dialog.showModal();
};

const winCheck = () => {
    const board = squares.map(square => square.innerText);
    for (let i = 0; i <= 9; i += 3) {
        if(board[i] && board[i] === board[i+1] && board[i] === board[i+2]){
            return [i, i+1, i+2];
        };
        
    };

    for (let i = 0; i <= 3; i++) {
        if(board[i] && board[i] === board[i+3] && board[i] === board[i+6]){
            return [i, i+3, i+6];
        }
        
    };

    if(board[0] && board[0] === board[4] && board[0] === board[8]){
        return [0, 4, 8];
    }else if(board[2] && board[2] === board[4] && board[2] === board[6]){
        return [2, 4, 6];
    };

    if(board.includes("")) return
    else{
        return "tie";
    };

};

squares.forEach((square, i) => {
    square.addEventListener("click", ()=> {
        if(gameState === "concluded" || square.innerText) return;
        square.classList.add(`${gameState === "p1" ? 'p1' : 'p2'}`);
        square.innerText = gameState === "p1" ? x : o;
        const winnerMovement = winCheck();
        if(typeof winnerMovement === "object"){
            win(winnerMovement);
            return;
        }else if(winnerMovement === "tie"){
            tie();
        }
        gameState = gameState === "p1" ? "p2" : "p1";
        turns.setAttribute('class', `${gameState === "p1" ? "p1" : "p2"}`);
        turns.innerText = `Turn of ${gameState}`
    })
});

dialog.querySelector("button").addEventListener("click", () => {
    squares.forEach(square => {
        square.textContent = '';
        square.classList.remove('p1');
        square.classList.remove('p2');
        square.classList.remove('winner');
    })
    gameState = 'p1';
    turns.innerText = `Turn of ${gameState}`
    dialog.close();
    modalH2.setAttribute('class', '')
    dialog.setAttribute('class', '');
})
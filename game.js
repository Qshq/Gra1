const gameStat = {
    number : 0,
    win: 0,
    losses: 0,
    draw: 0
}

const gameHand = {
    playerHand: "",
    aiHand: "",
    
}
//pobranie wyborów z html
const hands = [...document.querySelectorAll('.select img')];
//nasłuchiwanie na wybór jednej z opcji
hands.forEach(hand => hand.addEventListener('click', handSelect));
//nasłuchiwanie przycisku na kliknięcie żeby rozpocząć gre
document.querySelector('.start').addEventListener('click', gameStart);


// Wybór gracza
function handSelect() {
    gameHand.playerHand = this.dataset.option
    console.log(gameHand.playerHand);
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = '0 0 0 5px blue';

}

//wybór Ai

function aiSelect(){
    return hands[Math.floor(Math.random() * 3)].dataset.option
}

// sprawdzanie wyników gry

function gameResult(player, ai){
if(player === ai){ return "draw";
}else if (( player === "kamień" && ai === "nożyczki")|| (player === "nożyczki" && ai ==="papier")|| (player === "papier" && ai === "kamień")) {return "win";
}else {return "loss";}
}

//funkcja publikacji wyniku

function publicResult(player, ai, result){
    //wyświetlenie wyboru gracza
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    //wyświetlnie wyboru ai
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    //wyświetlnie ile gier zostało rozegranych
    document.querySelector('p.numbers span').textContent = ++gameStat.number;

    //wyświetlenie ile gier wygrałeś, przegrałeś lub ile było remisów i jaki jest wynik gry
    if(result === "win"){
        document.querySelector(' p.wins span').textContent = ++gameStat.win;
        document.querySelector('[data-summary="who-win"]').textContent = "!BRAWO WYGRAŁEŚ!";
    }else if ( result === "loss"){
        document.querySelector(' p.losses span').textContent = ++gameStat.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "!WYGRYWA KOMPUTER!";
    }else {
        document.querySelector('p.draws span').textContent = ++gameStat.draw;
        document.querySelector('[data-summary="who-win"]').textContent = "!REMIS!";
    }
}

//funkcja kończąca gre

function endGame(){
   document.querySelector(`[data-option="${gameHand.playerHand}"]`).style.boxShadow = "";
   gameHand.playerHand="";
   gameHand.aiHand = "";

}

//funckja startująca gre

function gameStart(){
    if(!gameHand.playerHand){
        alert ("!!WYBIERZ KTÓRĄŚ OPCJE!!");
    }
    gameHand.aiHand = aiSelect();
    const gameResults = gameResult(gameHand.playerHand, gameHand.aiHand);
    publicResult(gameHand.playerHand, gameHand.aiHand, gameResults);
    endGame()
}
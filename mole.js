let currMoleTile;
let currPoopTile;
let score = 0;
let gameOver = false;
let timeLeft = 60;
let timerId;


window.onload = function(){
    setGame();
}

function setGame(){
    //set up the grid for the game board in html
    for (let i = 0; i < 9; i++){ //stops at 9
        //<div></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById ("board").appendChild(tile);
    }
    setInterval(setMole, 800); //Every 0.8 seconds mole moves
    setInterval(setPoop, 1000); //Every 1 seconds, poop moves
    startTimer();
}

function startTimer (){
    document.getElementById ("timer").innerText = "Time: "+ timeLeft;
    timerId = setInterval (() => {
        timeLeft --;
        document.getElementById("timer").innerText = "Time: "+ timeLeft;
        if (timeLeft <= 0){
            clearInterval(timerId);
            gameOver = true;
            document.getElementById("score").innerText = "TIME UP: " + score;
        }
    }, 1000);
}


function getRandomTile(){
    //randomly choosing tile (0-8)
    let num = Math.floor(Math.random()*9);
    return num.toString();
}

function setMole(){
    if (gameOver){
        return;
    }
    if (currMoleTile){
        currMoleTile.innerHTML = ""; //Making the mole dissapear
    }
    let mole = document.createElement("img");
    mole.src = "./sirotan.png";

    let num = getRandomTile();
    /*insuring the poop and the seal aren't on the same tile*/
    if (currPoopTile && currPoopTile.id == num){
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPoop(){
    if (gameOver){
        return;
    }

    if (currPoopTile){
        currPoopTile.innerHTML = "";
    }
    let poop = document.createElement ("img");
    poop.src = "./poop.png";

    let num = getRandomTile();
     /*insuring the poop and the mole aren't on the same tile*/
    if (currMoleTile && currMoleTile.id == num){
        return;
    }
    currPoopTile = document.getElementById(num);
    currPoopTile.appendChild(poop);
    }

    function selectTile (){
        if (gameOver){
        return;
        }
        if (this == currMoleTile){ //when you click the mole
            score +=10;
            document.getElementById("score").innerText = "Score: "+ score.toString(); //update score
        }
        else if (this == currPoopTile){ //when the game is over
            document.getElementById("score").innerText = "GAME OVER: "+ score.toString ();
            gameOver = true;
            clearInterval(timerId);
        }
    }
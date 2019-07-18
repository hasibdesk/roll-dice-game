/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, gamePlay, winningScore;
function gameInitialize() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlay = true;

  document.querySelector(".dice").style.display = "none";

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#name-0").textContent = "Player - 1";
  document.querySelector("#name-1").textContent = "Player - 2";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
gameInitialize();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlay) {
    // Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    //Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice/dice-" + dice + ".png";

    //Update the score
    if (dice !== 1) {
      roundScore = roundScore + dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlay) {
    // add round score to the score
    scores[activePlayer] += roundScore;

    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    let inputScore = document.querySelector(".finalScore").value;
    if (inputScore) {
      winningScore = inputScore;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "WINNER!";
      document.querySelector(`.dice`).style.display = "none";
      document.querySelector(`#current-${activePlayer}`).textContent = 0;
      gamePlay = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", gameInitialize);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

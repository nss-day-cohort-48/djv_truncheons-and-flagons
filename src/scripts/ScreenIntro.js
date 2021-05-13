import {leaderboardHTML} from "./Leaderboard.js";
import {setupGame} from "./gameState.js";

document.addEventListener("click", (event) => {
  if (event.target.id === "newGameButton") {
    setupGame();
  }
});

export const introHTML = () => {
  return /*html*/ `
    <h1 class="logo">Truncheons & Flagons</h1>
    <div class="leaderboardContainer">
      <h3 class="leaderboardHeader">Current Leaderboard</h3>
      ${leaderboardHTML()}
    </div>
    <div class="newGame" id="newGameButtonContainer">
      <button class="newGame" id="newGameButton">Set Up New Game</button>
    </div>
  `;
};

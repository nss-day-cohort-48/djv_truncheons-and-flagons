import { leaderboardHTML } from "./Leaderboard.js";
import { setupGame } from "./gameState.js";

document.addEventListener("click", (event) => {
	if (event.target.id === "newGameButton") {
		setupGame();
	}
});

export const introHTML = () => {
	return /*html*/ `
    <h1 class="logo">Truncheons & Flagons</h1>
    <button class="newGameButton" id="newGameButton">Set Up New Game</button>
    <div class="leaderboardContainer">
    <h3>Current Leaderboard</h3>
    ${leaderboardHTML()}
    </div>
  `;
};

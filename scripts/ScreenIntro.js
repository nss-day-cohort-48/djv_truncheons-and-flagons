import {leaderboardHTML} from "./Leaderboard.js";

export const introHTML = () => {
  return /*html*/ `
    <h1 class="logo">Truncheons & Flagons</h1>
    <button class="newGameButton">Set Up New Game</button>
    <div class="leaderboardContainer">
    <h3>Current Leaderboard</h3>
    ${leaderboardHTML()}
    </div>
  `;
};

import { getScores } from "./database.js";
import { getPlayers } from "./database.js";
import { getTeams } from "./database.js";

export const introHTML = () => {
  leaderboardHTML();
  return /*html*/ `
    <h1 class="logo">Truncheons & Flagons</h1>
    <button class="newGameButton">Set Up New Game</button>
    <div class="leaderboardContainer">
    <h3>Current Leaderboard</h3>
    <ul>
        <li>#1: The Flo Rida Fan Club -- 4 points</li>
        <li>#2: The Red Barons -- 2 points</li>
        <li>#3: REDACTED -- 0 points</li>
    </ul>
    </div>
  `;
};

const leaderboardHTML = () => {
  const scores = getScores();
  const teams = getTeams();
  const players = getPlayers();

  const teamScores = {};
  for (const score of scores) {
    const theTeam = "teamNumber" + score.teamId.toString();
    if (!(theTeam in teamScores)) {
      teamScores[theTeam] = {
        teamId: score.teamId,
        score: 0,
      };
    }
    teamScores[theTeam].score += score.score;
  }

  return /*html*/ ``;
};

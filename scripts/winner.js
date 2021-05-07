import {getCurrentGame, getTeams} from "./database.js";

export const winner = () => {
  const currentGame = getCurrentGame();

  const scores = [
    currentGame.firstTeamScore,
    currentGame.secondTeamScore,
    currentGame.thirdTeamScore,
  ];
  const sortedScores = scores.sort();
  const winningScore = sortedScores[sortedScores.length - 1];
  let winnerId = null;

  if (currentGame.firstTeamScore === winningScore) {
    winnerId = currentGame.firstTeamId;
  }
  if (currentGame.secondTeamScore === winningScore) {
    winnerId = currentGame.secondTeamId;
  }
  if (currentGame.thirdTeamScore === winningScore) {
    winnerId = currentGame.thirdTeamId;
  }

  const teams = getTeams();
  let winner = null;
  for (const team of teams) {
    if (team.id === winnerId) {
      winner = team.name;
    }
  }
  return winner;
};

import {getTeams} from "./database.js";

export const winner = (teamsArray) => {
  // const currentGame = getCurrentGame();

  // const scores = [
  //   currentGame.firstTeamScore,
  //   currentGame.secondTeamScore,
  //   currentGame.thirdTeamScore,
  // ];

  teamsArray.sort((teamA, teamB) => (teamA.score < teamB.score ? 1 : -1));
  //const sortedScores = scores.sort();
  const winningTeam = teamsArray[0];
  // const winningScore = sortedScores[sortedScores.length - 1];
  const winningTeamId = winningTeam.id;
  // let winnerId = null;

  // if (currentGame.firstTeamScore === winningScore) {
  //   winnerId = currentGame.firstTeamId;
  // }
  // if (currentGame.secondTeamScore === winningScore) {
  //   winnerId = currentGame.secondTeamId;
  // }
  // if (currentGame.thirdTeamScore === winningScore) {
  //   winnerId = currentGame.thirdTeamId;
  // }

  const teams = getTeams();
  let winner = null;
  for (const team of teams) {
    if (team.id === winningTeamId) {
      winner = team.name;
    }
  }
  return winner;
};

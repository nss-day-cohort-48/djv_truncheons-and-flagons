import {getTeams} from "./database.js";

export const winner = (teamsArray) => {
  teamsArray.sort((teamA, teamB) => (teamA.score < teamB.score ? 1 : -1));
  const winningTeam = teamsArray[0];
  const winningTeamId = winningTeam.id;

  const teams = getTeams();
  let winner = null;
  for (const team of teams) {
    if (team.id === winningTeamId) {
      winner = team.name;
    }
  }
  return winner;
};

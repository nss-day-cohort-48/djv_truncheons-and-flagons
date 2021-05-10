import {getScores} from "./database.js";
import {getPlayers} from "./database.js";
import {getTeams} from "./database.js";

export const leaderboardHTML = () => {
  teams = teams.filter((team) => team.playerCount === 3);
  // teams are sorted in reverse order so index+1=leaderboardPosition
  teams.sort((teamA, teamB) => (teamA.score < teamB.score ? 1 : -1));

  // open a table and create the header row
  let htmlString = `<table>
    <tr><th>Rank</th><th>Team</th><th>Score</th><th>Players</th></tr>`;

  htmlString += teams
    // stObj is the (s)orted (t)eam (Obj)ect -- we are creating a table row for each
    .map((team, indexInArray) => {
      const leaderboardPosition = indexInArray + 1;
      return `<tr>
        <td>#${leaderboardPosition}</td> 
        <td>${team.name}</td> 
        <td>${team.score}</td> 
        <td>${team.playerCount}</td>
      </tr>`;
    })
    .join("");

  htmlString += `</table>`;
  return htmlString;
};

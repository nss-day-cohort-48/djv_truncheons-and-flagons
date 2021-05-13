import {getTeams} from "./TeamsProvider.js";

export const leaderboardHTML = () => {
  let teams = getSortedTeams();

  // filter out teams with less than 3 players
  teams = teams.filter((team) => team.playerCount === 3);

  // filter out teams with no score
  teams = teams.filter((team) => team.score > 0);

  // open a table and create the header row
  let htmlString = `<table>
    <tr><th>Rank</th><th>Team</th><th>Score</th><th>Players</th></tr>`;

  htmlString += teams
    // stObj is the (s)orted (t)eam (Obj)ect -- we are creating a table row for each
    .map((team, indexInArray) => {
      return `<tr>
        <td>#${team.place}</td> 
        <td>${team.name}</td> 
        <td>${team.score}</td> 
        <td>${team.playerCount}</td>
      </tr>`;
    })
    .join("");

  htmlString += `</table>`;
  return htmlString;
};

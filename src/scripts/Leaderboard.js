import {getTeams, getSortedTeams} from "./TeamsProvider.js";

export const leaderboardHTML = () => {
  let teams = getSortedTeams();

  // filter out teams with less than 3 players
  teams = teams.filter((team) => team.playerCount === 3);

  // filter out teams with no score
  teams = teams.filter((team) => team.score > 0);

  // open a table and create the header row
  let htmlString = `<table class="leaderboard">
    <tr class="leaderboard"><th>Rank</th><th>Team</th><th>Score</th><th>Players</th></tr>`;

  htmlString += teams
    // stObj is the (s)orted (t)eam (Obj)ect -- we are creating a table row for each
    .map((team, indexInArray) => {
      return `<tr class="leaderboard">
        <td class="place leaderboard">#${team.place}</td> 
        <td class="name leaderboard">${team.name}</td> 
        <td class="score leaderboard">${team.score}</td> 
        <td class="count leaderboard">${team.playerCount}</td>
      </tr>`;
    })
    .join("");

  htmlString += `</table>`;
  return htmlString;
};

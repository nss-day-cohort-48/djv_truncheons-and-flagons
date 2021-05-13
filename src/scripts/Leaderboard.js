import {getTeams} from "./TeamsProvider.js";

export const leaderboardHTML = () => {
  let teams = getTeams();
  // sort teams by score
  teams.sort((teamA, teamB) => (teamA.score > teamB.score ? 1 : -1));

  // since sort puts lowest scores first, reverse
  teams.reverse();

  // filter out teams with less than 3 players
  teams = teams.filter((team) => team.playerCount === 3);

  // considering ties, figure out what place each team is in
  teams = addPlaceNumberTo(teams);

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

const addPlaceNumberTo = (team) => {
  let prevScore = null;
  let placeCounter = 1;
  team.forEach((t) => {
    // if we arent looking at a tie with the last examined team, increment the place counter
    // also if there's no prevScore we know we're at the start
    if (prevScore && prevScore !== t.score) {
      placeCounter++;
    }
    prevScore = t.score;
    t.place = placeCounter;
  });
  return team;
};

import { getScores } from "./database.js";
import { getPlayers } from "./database.js";
import { getTeams } from "./database.js";

// we could avoid scoping these to the whole module by passing teams
//    to our helpers and then using it as a thisArg
//    and then just grab the necessary collection in each helper
let scores = getScores();
let players = getPlayers();
let teams = getTeams();

export const leaderboardHTML = () => {
    // refresh our module scoped copies of database
    scores = getScores();
    players = getPlayers();
    teams = getTeams();

    // these functions modify the new copy of the team array for templating
    countTeamScores();
    countTeamPlayers();

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

const countTeamScores = () => {
    // go through scores and store each team's total score within our copy of teams array
    scores.forEach((s) => {
        const teamIndex = teams.findIndex((t) => t.id === s.teamId);

        teams[teamIndex].score = !teams[teamIndex].score ?
            s.score // if we havent started counting for this team, start at the given score
            :
            teams[teamIndex].score + s.score; // otherwise add the score
    });
};

const countTeamPlayers = () => {
    // same but for player count
    players.forEach((p) => {
        const teamIndex = teams.findIndex((t) => t.id === p.teamId);

        teams[teamIndex].playerCount = !teams[teamIndex].playerCount ?
            1 // if we havent started counting for this team, start at one
            :
            teams[teamIndex].playerCount + 1; // otherwise add one
    });
};
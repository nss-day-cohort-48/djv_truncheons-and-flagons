import { getScores } from "./database.js";
import { getPlayers } from "./database.js";
import { getTeams } from "./database.js";

export const leaderboardHTML = () => {
  const scores = getScores();
  const teams = getTeams();
  const players = getPlayers();

  // go through scores and store each team's total score within our copy of teams array
  scores.forEach((scoreObj) => {
    // QUESTION: do I really have to do another find to get the index? Maybe I should use a for loop...
    const thisTeam = teams.find((tObj) => tObj.id === scoreObj.teamId);
    const thisTeamIndex = teams.findIndex((tObj) => tObj.id === thisTeam.id);

    if (!("score" in thisTeam)) {
      teams[thisTeamIndex].score = 0;
    }
    teams[thisTeamIndex].score += scoreObj.score;
  });

  // same but for player count
  players.forEach((playerObj) => {
    const thisTeam = teams.find((tObj) => tObj.id === playerObj.teamId);
    const thisTeamIndex = teams.findIndex((tObj) => tObj.id === thisTeam.id);

    if (!thisTeam.playerCount) {
      teams[thisTeamIndex].playerCount = 0;
    }
    teams[thisTeamIndex].playerCount += 1;
  });

  // now sort the teams using a callback that compares two elements (which are team objects)
  const sortedTeams = teams.sort((teamA, teamB) => {
    // here we set up that the comparison takes place between each object's score
    if (teamA.score > teamB.score) {
      return 1; // if the first object is bigger, we return 1 from the callback
    } else {
      return -1; // if the second object is bigger, we return -1
    }
  });

  let htmlString = `<ul>`;
  // the sort array method takes a callback which compares two array items

  htmlString += sortedTeams
    // stObj is the (s)orted (t)eam (Obj)ect
    .map((stObj, stIndex) => {
      // index+1 is the place number when you look at the sorted teams array
      return `<li>#${stIndex + 1}: ${stObj.name} have ${stObj.score} points. (${
        stObj.playerCount
      } players)</li>`;
    })
    .join("");

  htmlString += `</ul>`;
  return htmlString;
};

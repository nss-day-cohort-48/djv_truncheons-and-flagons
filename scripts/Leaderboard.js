import { getScores } from "./database.js";
import { getPlayers } from "./database.js";
import { getTeams } from "./database.js";

let scores = getScores();
let teams = getTeams();
let players = getPlayers();

const storeScore = (scoreObj) => {
  const thisTeam = teams.find((tObj) => tObj.id === scoreObj.teamId);
  // QUESTION: do I really have to do another find to get the index? Maybe I should use a for loop...
  const thisTeamIndex = teams.findIndex((tObj) => tObj.id === thisTeam.id);
  if (!("score" in thisTeam)) {
    // make sure we store in the teams array defined within the Leaderboard module
    teams[thisTeamIndex].score = 0;
  }
  // again, thisTeam is a copy so we have to operate on the teams array directly
  teams[thisTeamIndex].score += scoreObj.score;
};

const storePlayerCount = (playerObj) => {
  const thisTeam = teams.find((tObj) => tObj.id === playerObj.teamId);
  const thisTeamIndex = teams.findIndex((tObj) => tObj.id === thisTeam.id);

  if (!thisTeam.playerCount) {
    teams[thisTeamIndex].playerCount = 0;
  }
  teams[thisTeamIndex].playerCount += 1;
};

export const leaderboardHTML = () => {
  scores = getScores();
  teams = getTeams();
  players = getPlayers();

  // go through scores and store each team's score within our copy of teams array
  scores.forEach(storeScore);

  // same but for player count
  players.forEach(storePlayerCount);

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

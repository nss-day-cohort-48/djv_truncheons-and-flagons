import {teamsRaw, scoresRaw, playersRaw, postTeam} from "./dataAccess.js";

export const getTeam = (teamId) => teamsRaw().find((t) => t.id === teamId);

export const getTeams = () => {
  let teams = teamsRaw();
  const scores = scoresRaw();
  const players = playersRaw();
  // return countTeamScores(countTeamPlayers(teams, players), scores);
  teams = countTeamScores(teams, scores);
  teams = countTeamPlayers(teams, players);
  return teams.map((t) => ({...t}));
};

// convenience for when you wanna know who's WINNING
// highest scores first
export const getSortedTeams = () =>
  addPlaceNumberTo(
    getTeams().sort((teamA, teamB) => (teamA.score < teamB.score ? 1 : -1))
  );

const addPlaceNumberTo = (teams) => {
  let prevScore = null;
  let placeCounter = 1;
  teams.forEach((t) => {
    // if we arent looking at a tie with the last examined team, increment the place counter
    // also if there's no prevScore we know we're at the start
    if (prevScore && prevScore !== t.score) {
      placeCounter++;
    }
    prevScore = t.score;
    t.place = placeCounter;
  });
  return teams;
};

const countTeamScores = (teamsArray, scores) => {
  scores.forEach((s) => {
    const teamIndex = teamsArray.findIndex((t) => t.id === s.teamId);

    teamsArray[teamIndex].score = !teamsArray[teamIndex].score
      ? s.score // if we havent started counting for this team, start at the given score
      : teamsArray[teamIndex].score + s.score; // otherwise add the score
  });
  return teamsArray;
};

const countTeamPlayers = (teamsArray, players) => {
  players.forEach((p) => {
    const teamIndex = teamsArray.findIndex((t) => t.id === p.teamId);

    teamsArray[teamIndex].playerCount = !teamsArray[teamIndex].playerCount
      ? 1 // if we havent started counting for this team, start at one
      : teamsArray[teamIndex].playerCount + 1; // otherwise add one
  });
  return teamsArray;
};

export const addTeam = (teamName) => {
  //const currentGameState = getGameState();
  if (checkDuplicateTeam(teamName)) {
    const newTeam = {
      name: teamName,
    };
    postTeam(newTeam);
  } else {
    window.alert("Team name is already taken. Please choose another.");
  }
};

const checkDuplicateTeam = (teamName) => {
  const teams = teamsRaw();
  let teamNotAdded = true;
  for (const team of teams) {
    if (team.name.toLowerCase() === teamName.toLowerCase()) {
      teamNotAdded = false;
    }
  }
  return teamNotAdded;
};

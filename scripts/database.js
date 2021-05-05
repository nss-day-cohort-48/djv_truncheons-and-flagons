const database = {
  playerBuilder: {
    firstName: null,
    lastName: null,
    teamId: null,
  },
  teamBuilder: {
    name: null,
  },
  gameBuilder: {
    teamOne: null,
    teamTwo: null,
    teamThree: null,
  },
  scoreBuilder: {},
  players: [],
  scores: [],
  teams: [],
};

export const getCurrentGame = () => [...database.currentGame];
export const setScore = (score) => {
  database.scoreBuilder.score = score;
};

export const getPlayers = () => database.players.map((p) => ({ ...p }));
export const getScores = () => database.scores.map((s) => ({ ...s }));
export const getTeams = () => database.teams.map((t) => ({ ...t }));
//============================================
const apiURL = "http://localhost:8080";
// TODO look at splitting up fetches for the three collections
export const fetchAllCollections = () => {
  return fetch(apiURL + "/db")
    .then((res) => res.json())
    .then((wholeDB) => {
      database.players = wholeDB.players;
      database.teams = wholeDB.teams;
      database.scores = wholeDB.scores;
    });
};

// TODO rewrite these with POST fetches
export const addScore = () => {
  const newScore = { ...database.scoreBuilder };
  newScore.timestamp = Date.now();

  fetch(apiURL + "/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newScore),
  }).then(document.dispatchEvent(new CustomEvent("stateChanged")));
};

export const addPlayer = (firstName, lastName, playerTeam) => {
  const newPlayer = database.playerBuilder;

  newPlayer.id = [...database.players].pop().id + 1;
  newPlayer.firstName = firstName;
  newPlayer.lastName = lastName;
  newPlayer.teamId = [...database.teams].find(
    (team) => team.name === playerTeam
  ).id;

  database.players.push(newPlayer);
};

export const addTeam = (teamName) => {
  const newTeam = database.teamBuilder;

  newTeam.id = [...database.teams].pop().id + 1;
  newTeam.name = teamName;

  database.teams.push(newTeam);
};

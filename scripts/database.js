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
  currentGame: {
    roundNumber: 1,
    firstTeamScore: 0,
    secondTeamScore: 0,
    thirdTeamScore: 0,
    // TODO these should start as null, but we aren't setting up the game properly yet
    firstTeamId: 1,
    secondTeamId: 2,
    thirdTeamId: 3,
  },
  scoresBuilder: {
    firstTeamScore: 0,
    secondTeamScore: 0,
    thirdTeamScore: 0,
  },
  players: [],
  scores: [],
  teams: [],
};

export const buildScores = (
  firstTeamPoints,
  secondTeamPoints,
  thirdTeamPoints
) => {
  database.scoresBuilder.firstTeamScore = firstTeamPoints;
  database.scoresBuilder.secondTeamScore = secondTeamPoints;
  database.scoresBuilder.thirdTeamScore = thirdTeamPoints;
};

export const setFirstTeamScore = (points) =>
  (database.currentGame.firstTeamScore = points);
export const setSecondTeamScore = (points) =>
  (database.currentGame.secondTeamScore = points);
export const setThirdTeamScore = (points) =>
  (database.currentGame.thirdTeamScore = points);
export const setRoundNumber = (roundNumber) =>
  (database.currentGame.roundNumber = roundNumber);

export const getPlayers = () => database.players.map((p) => ({ ...p }));
export const getScores = () => database.scores.map((s) => ({ ...s }));
export const getTeams = () => database.teams.map((t) => ({ ...t }));
export const getCurrentGame = () => ({ ...database.currentGame });

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

export const addScores = () => {
  const newScores = { ...database.scoresBuilder };
  newScores.timestamp = Date.now();

  const firstTeamNewScore = {
    teamId: database.currentGame.firstTeamId,
    score: newScores.firstTeamScore,
    timestamp: newScores.timestamp,
  };
  const secondTeamNewScore = {
    teamId: database.currentGame.secondTeamId,
    score: newScores.secondTeamScore,
    timestamp: newScores.timestamp,
  };
  const thirdTeamNewScore = {
    teamId: database.currentGame.thirdTeamId,
    score: newScores.thirdTeamScore,
    timestamp: newScores.timestamp,
  };

  fetch(apiURL + "/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(firstTeamNewScore),
  })
    .then(
      fetch(apiURL + "/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(secondTeamNewScore),
      }).then(
        fetch(apiURL + "/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(thirdTeamNewScore),
        })
      )
    )
    .then(document.dispatchEvent(new CustomEvent("stateChanged")));

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
    document.dispatchEvent(new CustomEvent("stateChanged"))
};

export const addTeam = (teamName) => {
    const newTeam = database.teamBuilder;

    newTeam.id = [...database.teams].pop().id + 1;
    newTeam.name = teamName;

    database.teams.push(newTeam);
};
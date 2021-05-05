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
};

export const getPlayers = () => [...database.players];
export const getScores = () => [...database.scores];
export const getTeams = () => database.teams.map((t) => ({ ...t }));
export const getCurrentGame = () => [...database.currentGame];

export const setScore = (score) => {
  database.scoreBuilder.score = score;
};

export const addScore = () => {
  const newScore = { ...database.scoreBuilder };

  newScore.id = [...database.scores].pop().id + 1;

  newScore.timestamp = Date.now();
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

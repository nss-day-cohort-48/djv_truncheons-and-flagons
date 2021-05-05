// base time value for mock API entries
const rightNow = new Date();
// base time + 100 seconds (100000ms)
const hundredSecondsLater = new Date(rightNow.getTime() + 100000);

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
  // TODO: move the rest of this data to a json-server API and add fetching functions
  players: [
    {
      id: 1,
      firstName: "Jane",
      lastName: "Doe",
      teamId: 1,
    },
    {
      id: 2,
      firstName: "Dohn",
      lastName: "Joe",
      teamId: 1,
    },
    {
      id: 3,
      firstName: "Marty",
      lastName: "McFly",
      teamId: 1,
    },
    {
      id: 4,
      firstName: "French",
      lastName: "Montana",
      teamId: 2,
    },
    {
      id: 5,
      firstName: "Rick",
      lastName: "Sanchez",
      teamId: 2,
    },
    {
      id: 6,
      firstName: "Charles",
      lastName: "Darlose",
      teamId: 2,
    },
    {
      id: 7,
      firstName: "Fake",
      lastName: "Name",
      teamId: 3,
    },
    {
      id: 8,
      firstName: "Cornell",
      lastName: "West",
      teamId: 3,
    },
    {
      id: 9,
      firstName: "Bond",
      lastName: "Jamesbond",
      teamId: 3,
    },
  ],
  teams: [
    {
      id: 1,
      name: "The Red Barons",
    },
    {
      id: 2,
      name: "The Flo Rida Fan Club",
    },
    {
      id: 3,
      name: "REDACTED",
    },
  ],
  scores: [
    {
      id: 1,
      teamId: 1,
      score: 1,
      timestamp: rightNow.getDate(),
    },
    {
      id: 2,
      teamId: 2,
      score: 2,
      timestamp: rightNow.getDate(),
    },
    {
      id: 3,
      teamId: 3,
      score: 0,
      timestamp: rightNow.getDate(),
    },
    {
      id: 4,
      teamId: 1,
      score: 1,
      timestamp: hundredSecondsLater.getDate(),
    },
    {
      id: 5,
      teamId: 2,
      score: 2,
      timestamp: hundredSecondsLater.getDate(),
    },
    {
      id: 6,
      teamId: 3,
      score: 0,
      timestamp: hundredSecondsLater.getDate(),
    },
  ],
};

export const getPlayers = () => [...database.players];
export const getScores = () => [...database.scores];
// QUESTION: exporting a copy of the database needs to be done like this.... because it does?
export const getTeams = () => database.teams.map((t) => ({ ...t }));

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
  ],
  teams: [
    {
      id: 1,
      name: "The Red Barons",
    },
  ],
  scores: [
    {
      id: 1,
      teamId: 1,
      score: 0,
      timestamp: Date.now(),
    },
  ],
};

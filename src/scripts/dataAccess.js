const appState = {
  teams: [],
  players: [],
  scores: [],
};

const apiURL = "http://localhost:8080";

export const teamsRaw = () => teams.map((t) => ({...t}));
export const playersRaw = () => players.map((p) => ({...p}));
export const scoresRaw = () => scores.map((s) => ({...s}));

export const fetchAll = () => {
  return fetch(apiURL + "/db")
    .then((res) => res.json())
    .then((wholeDB) => {
      appState.teams = wholeDB.teams;
      appState.players = wholeDB.players;
      appState.scores = wholeDB.scores;
    });
};

export const fetchTeams = () => {
  return fetch(apiURL + "/teams")
    .then((res) => res.json())
    .then((teamsJSON) => (appState.teams = teamsJSON));
};

export const fetchPlayers = () => {
  return fetch(apiURL + "/players")
    .then((res) => res.json())
    .then((playersJSON) => (appState.players = playersJSON));
};

export const fetchScores = () => {
  return fetch(apiURL + "/players")
    .then((res) => res.json())
    .then((playersJSON) => (appState.players = playersJSON));
};

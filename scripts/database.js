import {makeScoreObj, headersJSON} from "./helpers.js";

const database = {
    playerBuilder: {
        firstName: null,
        lastName: null,
        teamId: null,
    },
    teamBuilder: {
        name: null,
        score: 0,
    },
    gameBuilder: {
        teamOne: null,
        teamTwo: null,
        teamThree: null,
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

<<<<<<< HEAD
// ==>> local getters
export const getPlayers = () => database.players.map((p) => ({...p}));
export const getScores = () => database.scores.map((s) => ({...s}));
export const getTeams = () => database.teams.map((t) => ({...t}));
=======
const apiURL = "http://localhost:8080";
const headersJSON = {
    "Content-Type": "application/json",
};
>>>>>>> origin/dmg-feature-gameState

// ==>> local queries
export const getPlayersOfTeam = (teamId) => database.teams.filter((t) => t.id === teamId);
export const getTeam = (teamId) => database.teams.find((t) => t.id === teamId);

// ====== API ==========
const apiURL = "http://localhost:8080";
// ===============>> Get
export const fetchAllCollections = () => {
    return fetch(apiURL + "/db")
        .then((res) => res.json())
        .then((wholeDB) => {
            database.players = wholeDB.players;
            database.teams = wholeDB.teams;
            database.scores = wholeDB.scores;
        });
};

<<<<<<< HEAD
// ===============>> Post
export const addScores = () => {
  const {teams} = getGameState();
  // prettier-ignore
  fetch(apiURL + "/scores", makeScoreObj(teams[1]))
    .then(fetch(apiURL + "/scores", makeScoreObj(teams[2]))
      .then(fetch(apiURL + "/scores", makeScoreObj(teams[3]))))
=======
export const setFirstTeamScore = (points) => (database.currentGame.firstTeamScore = points);
export const setSecondTeamScore = (points) => (database.currentGame.secondTeamScore = points);
export const setThirdTeamScore = (points) => (database.currentGame.thirdTeamScore = points);

export const buildScores = (firstTeamPoints, secondTeamPoints, thirdTeamPoints) => {
    database.scoresBuilder.firstTeamScore = firstTeamPoints;
    database.scoresBuilder.secondTeamScore = secondTeamPoints;
    database.scoresBuilder.thirdTeamScore = thirdTeamPoints;
};

export const getPlayers = () => database.players.map((p) => ({...p }));
export const getScores = () => database.scores.map((s) => ({...s }));
export const getTeams = () => database.teams.map((t) => ({...t }));

export const getPlayersOfTeam = (teamId) => database.teams.filter((t) => t.id === teamId);
export const getTeam = (teamId) => database.teams.find((t) => t.id === teamId);

// FIXME rewrite with new gameState
export const addScores = () => {
    const newScores = {...database.scoresBuilder };
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
            headers: headersJSON,
            body: JSON.stringify(firstTeamNewScore),
        })
        .then(
            fetch(apiURL + "/scores", {
                method: "POST",
                headers: headersJSON,
                body: JSON.stringify(secondTeamNewScore),
            }).then(
                fetch(apiURL + "/scores", {
                    method: "POST",
                    headers: headersJSON,
                    body: JSON.stringify(thirdTeamNewScore),
                })
            )
        )
>>>>>>> origin/dmg-feature-gameState
        .then(document.dispatchEvent(new CustomEvent("stateChanged")));
};

export const addPlayer = (firstName, lastName, playerTeam) => {
    const newPlayer = database.playerBuilder;

    newPlayer.id = [...database.players].pop().id + 1;
    newPlayer.firstName = firstName;
    newPlayer.lastName = lastName;
    newPlayer.teamId = [...database.teams].find((team) => team.name === playerTeam).id;

    fetch(apiURL + "/players", {
        method: "POST",
        headers: headersJSON,
        body: JSON.stringify(newPlayer),
    }).then(document.dispatchEvent(new CustomEvent("stateChanged")));
};

export const addTeam = (teamName) => {
    const newTeam = database.teamBuilder;

    newTeam.id = [...database.teams].pop().id + 1;
    newTeam.name = teamName;

    fetch(apiURL + "/teams", {
        method: "POST",
        headers: headersJSON,
        body: JSON.stringify(newTeam),
    }).then(document.dispatchEvent(new CustomEvent("stateChanged")));
};
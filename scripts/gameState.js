import {randomArrayOf} from "./helpers.js";

const gameState = {
  playing: false,
  round: 0,
  pteams: [
    {id: null, score: null}, // index 0 is nothing
    {id: 0, score: 0}, // team 1 has index 1
    {id: 0, score: 0}, // team 2 has index 2
    {id: 0, score: 0}, // team 3 has index 3
  ],
  roles: {
    knightsTeamIndex: 0,
    fairiesTeamIndex: 0,
    goblinsTeamIndex: 0,
  },
};

const blankGameState = {
  playing: gameState.playing,
  round: gameState.round,
  pteams: gameState.pteams.map((t) => ({...t})),
  roles: {...gameState.roles},
};

const resetGameState = () => {
  gameState.playing = blankGameState.playing;
  gameState.round = blankGameState.round;
  gameState.pteams = blankGameState.pteams.map((t) => ({...t}));
  gameState.roles = {...blankGameState.roles};
};

export const getGameState = () => ({
  playing: gameState.playing,
  round: gameState.round,
  pteams: gameState.pteams.map((t) => ({...t})),
  roles: {...gameState.roles},
});

export const startGame = (teamOneId, teamTwoId, teamThreeId) => {
  gameState.pteams[1].id = teamOneId;
  gameState.pteams[2].id = teamTwoId;
  gameState.pteams[3].id = teamThreeId;
  // shuffle first roles
  const [firstKnight, firstFairy, firstGoblin] = randomArrayOf(3);
  gameState.roles.knightsTeamIndex = gameState.pteams[firstKnight];
  gameState.roles.fairiesTeamIndex = gameState.pteams[firstFairy];
  gameState.roles.goblinsTeamIndex = gameState.pteams[firstGoblin];
  // let's GO!
  gameState.round = 1;
  gameState.playing = true;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const nextRound = (firstScore, secondScore, thirdScore) => {
  // if we're coming from a valid round number
  if (gameState.round > 0 && gameState.round <= 3) {
    sendScores(firstScore, secondScore, thirdScore);

    if (gameState.round === 3) {
      document.dispatchEvent(
        new CustomEvent("gameOver", {
          // gives copy of array of pteams in no particular order
          detail: gameState.pteams.filter((t) => t.id && t.score),
        })
      );
      resetGameState();
      document.dispatchEvent(new CustomEvent("stateChanged"));
    }
  } else {
    console.log("Can't advance round -- game hasn't started yet!");
  }
};

import {randomArrayOf} from './helpers.js'

const gameState = {
  playing: false,
  round: 0,
  teams: [
    { id = null, score = null }, // index 0 is nothing
    { id: 0, score: 0 }, // team 1 has index 1
    { id: 0, score: 0 }, // team 2 has index 2
    { id: 0, score: 0 }, // team 3 has index 3
  ],
  roles: {
    knightsTeamIndex: 0, 
    fairiesTeamIndex: 0,
    goblinsTeamIndex: 0,
  }
}

const blankGameState = {
  playing = gameState.playing,
  round = gameState.round,
  teams = gameState.teams.map(t => ({...t})),
  roles = gameState.roles.map(t => ({...t}))
}

const resetGameState = () => {
    gameState.playing = blankGameState.playing
    gameState.round = blankGameState.round
    gameState.teams = blankGameState.teams.map(t => ({...t}))
    gameState.roles = blankGameState.roles.map(t => ({...t}))
}

// export const getGameState = () => ({
//   playing = gameState.playing,
//   round = gameState.round,
//   teams = gameState.teams.map(t => ({...t})),
//   roles = gameState.roles.map(t => ({...t}))
// });

export const startGame = (teamOneId, teamTwoId, teamThreeId) => {
    gameState.teams[1].id = teamOneId
    gameState.teams[2].id = teamTwoId
    gameState.teams[3].id = teamThreeId
    // shuffle first roles
    const [firstKnight, firstFairy, firstGoblin] = randomArrayOf(3)
    gameState.roles.knightsTeamIndex = gameState.teams[firstKnight]
    gameState.roles.fairiesTeamIndex = gameState.teams[firstFairy]
    gameState.roles.goblinsTeamIndex = gameState.teams[firstGoblin]
    // let's GO!
    gameState.round = 1
    gameState.playing = true
}

export const nextRound = (firstScore, secondScore, thirdScore) => {
    // if we're coming from a valid round number
    if (gameState.round > 0 && gameState.round <= 3) {
        sendScores(firstScore, secondScore, thirdScore)

        if (gameState.round === 3) {
            resetGameState()
        }

    } else { 
        console.log("Can't advance round -- game hasn't started yet!")
    }
}

import { dispatchStateChanged, randomArrayOf } from "./helpers.js";
import { addScores } from "./ScoresProvider.js";

const gameState = {
    intro: true,
    setup: false,
    playing: false,
    round: 0,
    pteams: [
        { id: null, score: null }, // index 0 is nothing
        { id: 0, score: 0 }, // team 1 has index 1
        { id: 0, score: 0 }, // team 2 has index 2
        { id: 0, score: 0 }, // team 3 has index 3
    ],
};

const blankGameState = {
    setup: gameState.setup,
    intro: gameState.intro,
    playing: gameState.playing,
    round: gameState.round,
    pteams: gameState.pteams.map((t) => ({...t })),
};

export const resetGameState = () => {
    gameState.setup = blankGameState.setup;
    gameState.intro = blankGameState.intro;
    gameState.playing = blankGameState.playing;
    gameState.round = blankGameState.round;
    gameState.pteams = blankGameState.pteams.map((t) => ({...t }));
};

export const getGameState = () => ({
    setup: gameState.setup,
    intro: gameState.intro,
    playing: gameState.playing,
    round: gameState.round,
    pteams: gameState.pteams.map((t) => ({...t })),
});

export const setupGame = () => {
    gameState.intro = false;
    gameState.setup = true;
    document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const startGame = (teamOneId, teamTwoId, teamThreeId) => {
    const [firstKnight, firstFairy, firstGoblin] = randomArrayOf(3);
    gameState.pteams[1].id = teamOneId;
    gameState.pteams[2].id = teamTwoId;
    gameState.pteams[3].id = teamThreeId;
    // set first roles
    gameState.pteams[firstKnight].role = "Knights";
    gameState.pteams[firstFairy].role = "Fairies";
    gameState.pteams[firstGoblin].role = "Goblins";
    // let's GO!
    gameState.round = 1;
    gameState.setup = false;
    gameState.playing = true;
    gameState.intro = false;
    document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const nextRound = (firstScore, secondScore, thirdScore) => {
    // if we're coming from a valid round number
    if (gameState.round > 0 && gameState.round <= 3) {
        gameState.pteams[1].score += firstScore;
        gameState.pteams[2].score += secondScore;
        gameState.pteams[3].score += thirdScore;
        //if first round
        if (gameState.round === 1) {
            //find the teams by roles of first round
            const firstKnightsTeam = gameState.pteams.find(
                (team) => team.role === "Knights"
            );
            const firstFairiesTeam = gameState.pteams.find(
                (team) => team.role === "Fairies"
            );
            const firstGoblinsTeam = gameState.pteams.find(
                (team) => team.role === "Goblins"
            );
            //reassign the role of that team
            firstKnightsTeam.role = "Fairies";
            firstFairiesTeam.role = "Goblins";
            firstGoblinsTeam.role = "Knights";
            //increase round number
            gameState.round++;
            //if second round
            document.dispatchEvent(new CustomEvent("stateChanged"));
        } else if (gameState.round === 2) {
            //find the teeams by role of second round
            const secondKnightsTeam = gameState.pteams.find(
                (team) => team.role === "Knights"
            );
            const secondFairiesTeam = gameState.pteams.find(
                (team) => team.role === "Fairies"
            );
            const secondGoblinsTeam = gameState.pteams.find(
                (team) => team.role === "Goblins"
            );
            //reassign the role of that team again
            secondKnightsTeam.role = "Fairies";
            secondFairiesTeam.role = "Goblins";
            secondGoblinsTeam.role = "Knights";
            //increast round number
            gameState.round++;
            document.dispatchEvent(new CustomEvent("stateChanged"));
        } else if (gameState.round === 3) {
            const nonNullTeams = gameState.pteams.filter((t) => t.id);
            addScores(gameState.pteams[1], gameState.pteams[2], gameState.pteams[3]);
            document.dispatchEvent(
                new CustomEvent("gameOver", {
                    // gives copy of array of pteams in no particular order
                    detail: nonNullTeams,
                })
            );
        }
    } else {
        console.log("Can't advance round -- game hasn't started yet!");
    }
};
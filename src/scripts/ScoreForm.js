import { nextRound } from "./gameState.js";
import { getTeam, getTeams } from "./TeamsProvider.js";
import { getGameState, resetGameState } from "./gameState.js";
import { dispatchStateChanged } from "./helpers.js";

export const ScoreFormHTML = () => {
    const currentGameState = getGameState();

    const foundFirstTeam = getTeam(currentGameState.pteams[1].id);
    const foundSecondTeam = getTeam(currentGameState.pteams[2].id);
    const foundThirdTeam = getTeam(currentGameState.pteams[3].id);

    foundFirstTeam.role = currentGameState.pteams[1].role;
    foundSecondTeam.role = currentGameState.pteams[2].role;
    foundThirdTeam.role = currentGameState.pteams[3].role;

    if (foundFirstTeam.role === "Knights") {
        return /*html*/ `
   <h2 class="round" id="roundNumber">Round ${currentGameState.round} </h2>
   <fieldset class="score-field">
	 <label for="firstTeam"><strong>${foundFirstTeam.name}</strong> are playing as the <strong>${foundFirstTeam.role}</strong></label>
	 <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="6" value="0"/>
   </fieldset>
   <fieldset class="score-field">
	 <!-- add team label -->
	 <label for="secondTeam"><strong>${foundSecondTeam.name}</strong> are playing as the <strong>${foundSecondTeam.role}</strong></label>
	 <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="3" value="0"/>
   </fieldset>
   <fieldset class="score-field">
	 <!-- add team label -->
	 <label for="thirdTeam"><strong>${foundThirdTeam.name}</strong> are playing as the <strong>${foundThirdTeam.role}</strong></label>
	 <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="3" value="0"/>
   </fieldset>
	 <div id="scoreWarning"></div>
   <button class="button" id="saveScoreButton">Save Round Scores</button>
 </div>
   `;
    } else if (foundSecondTeam.role === "Knights") {
        return /*html*/ `
   <h2 class="round" id="roundNumber">Round ${currentGameState.round} </h2>
   <fieldset class="score-field">
	 <label for="firstTeam"><strong>${foundFirstTeam.name}</strong> are playing as the <strong>${foundFirstTeam.role}</strong></label>
	 <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="3" value="0"/>
	 </fieldset>
	 <fieldset class="score-field">
	 <!-- add team label -->
	 <label for="secondTeam"><strong>${foundSecondTeam.name}</strong> are playing as the <strong>${foundSecondTeam.role}</strong></label>
	 <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="6" value="0"/>
	 </fieldset>
	 <fieldset class="score-field">
	 <!-- add team label -->
	 <label for="thirdTeam"><strong>${foundThirdTeam.name}</strong> are playing as the <strong>${foundThirdTeam.role}</strong></label>
	 <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="3" value="0"/>
   </fieldset>
	 <div id="scoreWarning"></div>
   <button class="button" id="saveScoreButton">Save Round Scores</button>
 </div>
   `;
    } else if (foundThirdTeam.role === "Knights") {
        return /*html*/ `
   <h2 class="round" id="roundNumber">Round ${currentGameState.round} </h2>
   <fieldset class="score-field">
	 <label for="firstTeam"><strong>${foundFirstTeam.name}</strong> are playing as the <strong>${foundFirstTeam.role}</strong></label>
	 <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="3" value="0"/>
	 </fieldset>
	 <fieldset class="score-field">
	 <!-- add team label -->
	 <label for="secondTeam"><strong>${foundSecondTeam.name}</strong> are playing as the <strong>${foundSecondTeam.role}</strong></label>
	 <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="3" value="0"/>
	 </fieldset>
	 <fieldset class="score-field">
	 <!-- add team label -->
	 <label for="thirdTeam"><strong>${foundThirdTeam.name}</strong> are playing as the <strong>${foundThirdTeam.role}</strong></label>
	 <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="6" value="0"/>
   </fieldset>
	 <div id="scoreWarning"></div>
   <button class="button" id="saveScoreButton">Save Round Scores</button>
 </div>
   `;
    }
};

document.addEventListener("click", (event) => {
    if (event.target.id === "saveScoreButton") {
        // init local score variables
        let firstTeamRoundScore = 0;
        let secondTeamRoundScore = 0;
        let thirdTeamRoundScore = 0;
        let totalRoundScore = 0;

        // store from DOM to local score variables
        firstTeamRoundScore = parseInt(
            document.getElementById("firstTeamScore").value
        );
        secondTeamRoundScore = parseInt(
            document.getElementById("secondTeamScore").value
        );
        thirdTeamRoundScore = parseInt(
            document.getElementById("thirdTeamScore").value
        );

        // add em up
        totalRoundScore =
            firstTeamRoundScore + secondTeamRoundScore + thirdTeamRoundScore;

        // check for negatives
        if (
            firstTeamRoundScore < 0 ||
            secondTeamRoundScore < 0 ||
            thirdTeamRoundScore < 0
        ) {
            document.getElementById(
                "scoreWarning"
            ).innerHTML = `How dideth a team scoreth negative points?`;
            // handle total round score too large
        } else if (totalRoundScore === 0) {
            document.getElementById(
                "scoreWarning"
            ).innerHTML = `One of ye shalt have scored.`;
        } else if (totalRoundScore > 6) {
            document.getElementById(
                "scoreWarning"
            ).innerHTML = `Thou shalt not score more than 6 points in a round.`;
            //check if roundNumber is 3 or greater
        } else {
            nextRound(firstTeamRoundScore, secondTeamRoundScore, thirdTeamRoundScore);
        }
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === "resetGameButton") {
        resetGameState();
        dispatchStateChanged();
    }
});

const winner = (teamsArray) => {
    //sort teams to find winner from the array of playing teams
    teamsArray.sort((teamA, teamB) => (teamA.score < teamB.score ? 1 : -1));
    //assign those teams to a variable based on their position in the sorted array
    const winningTeam = teamsArray[0];
    const secondTeam = teamsArray[1];
    const thirdTeam = teamsArray[2];
    //get the array of all teams
    const teams = getTeams();
    //find the team names based on the IDs from the playing teams
    const winner = teams.find((t) => t.id === winningTeam.id).name;
    const team2 = teams.find((t) => t.id === secondTeam.id).name;
    const team3 = teams.find((t) => t.id === thirdTeam.id).name;

    //if all 3 teams tie...
    if (
        winningTeam.score === secondTeam.score &&
        winningTeam.score === thirdTeam.score
    ) {
        winningString = `Hey ${winner}, ${team2}, and ${team3} all tied!!!`;
    } else if (winningTeam.score === secondTeam.score) {
        winningString = `${winner} & ${team2} tied!!`;
    } else {
        winningString = `${winner} won!`;
    }
    submitResultsButton = `<button id="resetGameButton">Finalize Results</button>`;
    dispatchStateChanged();
};

document.addEventListener("gameOver", (event) => {
    const justPlayedTeams = event.detail;
    winner(justPlayedTeams);
});

let winningString = "";
export const winningResultsHTML = () => {
    return winningString;
};

let submitResultsButton = "";
export const sumbitResultsButton = () => {
    return submitResultsButton;
};
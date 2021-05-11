// import { setScore } from "./database.js"

import { getTeam } from "./TeamsProvider.js";
import { getGameState, nextRound } from "./gameState.js";

export const winner = (teamsArray) => {
	teamsArray.sort((teamA, teamB) => (teamA.score < teamB.score ? 1 : -1));
	const winningTeam = teamsArray[0];
	const winningTeamId = winningTeam.id;

	const teams = getTeams();
	let winner = null;
	for (const team of teams) {
		if (team.id === winningTeamId) {
			winner = team.name;
		}
	}
	return winner;
};

export const gameHTML = () => {
	const currentGameState = getGameState();

	const foundFirstTeam = getTeam(currentGameState.pteams[1].id);
	const foundSecondTeam = getTeam(currentGameState.pteams[2].id);
	const foundThirdTeam = getTeam(currentGameState.pteams[3].id);

	foundFirstTeam.role = currentGameState.pteams[1].role;
	foundSecondTeam.role = currentGameState.pteams[2].role;
	foundThirdTeam.role = currentGameState.pteams[3].role;

	// TODO restore the missing HTML
	return /*html*/ `
  <div class="game">
    <h1 class="logo">Truncheons & Flagons</h1>

    <div class="scoreForm">
      <h3 class="round" id="roundNumber">Round ${currentGameState.round} </h3>
      <fieldset>
				<label for="firstTeam">${foundFirstTeam.name} are playing as the ${foundFirstTeam.role}</label>
        <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="6" value="0"/>
				</fieldset>
				<fieldset>
        <!-- add team label -->
				<label for="secondTeam">${foundSecondTeam.name} are playing as the ${foundSecondTeam.role}</label>
        <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="6" value="0"/>
				</fieldset>
				<fieldset>
        <!-- add team label -->
				<label for="thirdTeam">${foundThirdTeam.name} are playing as the ${foundThirdTeam.role}</label>
        <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="6" value="0"/>
      </fieldset>
      <button class="button" id="saveScoreButton">Save Round Scores</button>
    </div>
  </div>

	<div class="teamScore" >
	<h4>${foundFirstTeam.name}</h4>
	<div id="teamScore1">Current Score is ${currentGameState.pteams[1].score}</div>
</div>
<div class="teamScore">
	<h4>${foundSecondTeam.name}</h4>
	<div  id="teamScore2">Current Score is ${currentGameState.pteams[2]
		.score}</div>
</div>
<div class="teamScore" >
	<h4>${foundThirdTeam.name}</h4>
	<div id="teamScore3">Current Score is ${currentGameState.pteams[3].score}</div>
</div>
  `;
};

document.addEventListener("gameOver", (event) => {
	const justPlayedTeams = event.detail;

	window.alert(`${winner(justPlayedTeams)} beat the losers!!`);
});

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

		const currentGameState = getGameState();
		// check for negatives
		if (
			firstTeamRoundScore < 0 ||
			secondTeamRoundScore < 0 ||
			thirdTeamRoundScore < 0
		) {
			window.alert(`How did you score negative points?`);
			// handle total round score too large
		} else if (totalRoundScore === 0) {
			window.alert(`Someone had to have scored...`);
		} else if (totalRoundScore > 6) {
			window.alert(`There's no way you could have scored more than 6 points.`);
			//check if roundNumber is 3 or greater
		} else {
			nextRound(firstTeamRoundScore, secondTeamRoundScore, thirdTeamRoundScore);
		}
	}
});

import { nextRound } from "./gameState.js";
import { getTeam, getTeams } from "./TeamsProvider.js";
import { getGameState } from "./gameState.js";
import { teamsRaw } from "./dataAccess.js";

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
   <h3 class="round" id="roundNumber">Round ${currentGameState.round} </h3>
   <fieldset>
     <label for="firstTeam">${foundFirstTeam.name} are playing as the ${foundFirstTeam.role}</label>
     <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="6" value="0"/>
     </fieldset>
     <fieldset>
     <!-- add team label -->
     <label for="secondTeam">${foundSecondTeam.name} are playing as the ${foundSecondTeam.role}</label>
     <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="3" value="0"/>
     </fieldset>
     <fieldset>
     <!-- add team label -->
     <label for="thirdTeam">${foundThirdTeam.name} are playing as the ${foundThirdTeam.role}</label>
     <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="3" value="0"/>
   </fieldset>
   <button class="button" id="saveScoreButton">Save Round Scores</button>
 </div>
   `;
	} else if (foundSecondTeam.role === "Knights") {
		return /*html*/ `
   <h3 class="round" id="roundNumber">Round ${currentGameState.round} </h3>
   <fieldset>
     <label for="firstTeam">${foundFirstTeam.name} are playing as the ${foundFirstTeam.role}</label>
     <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="3" value="0"/>
     </fieldset>
     <fieldset>
     <!-- add team label -->
     <label for="secondTeam">${foundSecondTeam.name} are playing as the ${foundSecondTeam.role}</label>
     <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="6" value="0"/>
     </fieldset>
     <fieldset>
     <!-- add team label -->
     <label for="thirdTeam">${foundThirdTeam.name} are playing as the ${foundThirdTeam.role}</label>
     <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="3" value="0"/>
   </fieldset>
   <button class="button" id="saveScoreButton">Save Round Scores</button>
 </div>
   `;
	} else if (foundThirdTeam.role === "Knights") {
		return /*html*/ `
   <h3 class="round" id="roundNumber">Round ${currentGameState.round} </h3>
   <fieldset>
     <label for="firstTeam">${foundFirstTeam.name} are playing as the ${foundFirstTeam.role}</label>
     <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="3" value="0"/>
     </fieldset>
     <fieldset>
     <!-- add team label -->
     <label for="secondTeam">${foundSecondTeam.name} are playing as the ${foundSecondTeam.role}</label>
     <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="3" value="0"/>
     </fieldset>
     <fieldset>
     <!-- add team label -->
     <label for="thirdTeam">${foundThirdTeam.name} are playing as the ${foundThirdTeam.role}</label>
     <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="6" value="0"/>
   </fieldset>
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
			window.alert(`How did a team score negative points?`);
			// handle total round score too large
		} else if (totalRoundScore === 0) {
			window.alert(`Someone had to have scored...`);
		} else if (totalRoundScore > 6) {
			window.alert(
				`There's no way y'all could have scored more than 6 points in a round.`
			);
			//check if roundNumber is 3 or greater
		} else {
			nextRound(firstTeamRoundScore, secondTeamRoundScore, thirdTeamRoundScore);
		}
	}
});

const winner = (teamsArray) => {
	teamsArray.sort((teamA, teamB) => (teamA.score < teamB.score ? 1 : -1));
	const winningTeam = teamsArray[0];
	const secondTeam = teamsArray[1];
	const thirdTeam = teamsArray[2];
	let winner = null;
	let winner2 = null;
	let winner3 = null;
	let draw = 0;

	debugger;

	if (
		winningTeam.score === secondTeam.score &&
		winningTeam.score === thirdTeam.score
	) {
		draw = 2;
	} else if (winningTeam.score === secondTeam.score) {
		draw = 1;
	}

	if (draw === 2) {
		const teams = getTeams();
		winner = teams.find((t) => t.id === winningTeam.id).name;
		winner2 = teams.find((t) => t.id === secondTeam.id).name;
		winner3 = teams.find((t) => t.id === thirdTeam.id).name;

		return window.alert(
			`Hey ${winner}, ${winner2}, and ${winner3}... y'all tied. Time to duke it out.`
		);
	} else if (draw === 1) {
		const teams = getTeams();
		winner = teams.find((t) => t.id === winningTeam.id).name;
		winner2 = teams.find((t) => t.id === secondTeam.id).name;
		const loser = teams.find((t) => t.id === thirdTeam.id).name;

		return window.alert(
			`${winner} & ${winner2} tied!! They beat the ${loser}!`
		);
	} else if (draw === 0) {
		const teams = getTeams();
		winner = teams.find((t) => t.id === winningTeam.id).name;
		return window.alert(`${winner} beat all y'all!!`);
	}
};

document.addEventListener("gameOver", (event) => {
	const justPlayedTeams = event.detail;
	winner(justPlayedTeams);
});

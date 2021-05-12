import { nextRound } from "./gameState.js";
import { getTeams } from "./TeamsProvider.js";

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

const winner = (teamsArray) => {
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

document.addEventListener("gameOver", (event) => {
	const justPlayedTeams = event.detail;

	window.alert(`${winner(justPlayedTeams)} beat the losers!!`);
});

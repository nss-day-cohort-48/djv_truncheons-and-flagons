import { getGameState } from "./gameState.js";
import { getTeam } from "./TeamsProvider.js";

export const ScoreBoardHTML = () => {
	const currentGameState = getGameState();

	const foundFirstTeam = getTeam(currentGameState.pteams[1].id);
	const foundSecondTeam = getTeam(currentGameState.pteams[2].id);
	const foundThirdTeam = getTeam(currentGameState.pteams[3].id);

	foundFirstTeam.score = currentGameState.pteams[1].score;
	foundSecondTeam.score = currentGameState.pteams[2].score;
	foundThirdTeam.score = currentGameState.pteams[3].score;

	return /*html*/ `
<div class="score-board-team">
  <h4 class="score-board-team-name">${foundFirstTeam.name}</h4>
	<div id="teamScore1">Current Score is ${foundFirstTeam.score}</div>
</div>
<div class="score-board-team">
	<h4 class="score-board-team-name">${foundSecondTeam.name}</h4>
	<div  id="teamScore2">Current Score is ${foundSecondTeam.score}</div>
</div>
<div class="score-board-team" >
	<h4 class="score-board-team-name">${foundThirdTeam.name}</h4>
	<div id="teamScore3">Current Score is ${foundThirdTeam.score}</div>
  `;
};

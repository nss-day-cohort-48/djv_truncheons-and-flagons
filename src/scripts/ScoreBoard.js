import { getGameState } from "./gameState.js";
import { dispatchStateChanged } from "./helpers.js";
import { getTeam } from "./TeamsProvider.js";

export const ScoreBoardHTML = () => {
    const currentGameState = getGameState();

    const foundFirstTeam = getTeam(currentGameState.pteams[1].id);
    const foundSecondTeam = getTeam(currentGameState.pteams[2].id);
    const foundThirdTeam = getTeam(currentGameState.pteams[3].id);

    foundFirstTeam.score = currentGameState.pteams[1].score;
    foundSecondTeam.score = currentGameState.pteams[2].score;
    foundThirdTeam.score = currentGameState.pteams[3].score;

    currentlyWinningFontIncrease(foundFirstTeam, foundSecondTeam, foundThirdTeam);

    return /*html*/ `
<div class="score-board-team">
  <h4 class="score-board-team-name">${foundFirstTeam.name}</h4>
	<div style="${
    foundFirstTeam.winning ? "font-size: 3rem" : ""
  }" class="team-score" id="teamScore1">${foundFirstTeam.score}</div>
</div>
<div class="score-board-team">
	<h4 class="score-board-team-name">${foundSecondTeam.name}</h4>
	<div style="${
    foundSecondTeam.winning ? "font-size: 3rem" : ""
  }" class="team-score" id="teamScore2">${foundSecondTeam.score}</div>
</div>
<div class="score-board-team" >
	<h4 class="score-board-team-name">${foundThirdTeam.name}</h4>
	<div style="${
    foundThirdTeam.winning ? "font-size: 3rem" : ""
  }" class="team-score" id="teamScore3">${foundThirdTeam.score}</div>
  `;
};

const currentlyWinningFontIncrease = (
    foundFirstTeam,
    foundSecondTeam,
    foundThirdTeam
) => {
    foundFirstTeam.winning = false;
    foundSecondTeam.winning = false;
    foundThirdTeam.winning = false;

    let playingTeams = [foundFirstTeam, foundSecondTeam, foundThirdTeam];

    let playingTeamsScores = [
        foundFirstTeam.score,
        foundSecondTeam.score,
        foundThirdTeam.score,
    ];

    for (const team of playingTeams) {
        if (team.score === Math.max(...playingTeamsScores) && team.score !== 0) {
            team.winning = true;
        } else {
            team.winning = false;
        }
    }
};
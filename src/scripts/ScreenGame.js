import {
	ScoreFormHTML,
	winningResultsHTML,
	sumbitResultsButton
} from "./ScoreForm.js";
import { ScoreBoardHTML } from "./ScoreBoard.js";
import { getGameState } from "./gameState.js";

export const gameHTML = () => {
	const currentGameState = getGameState();

	if (currentGameState.end === true) {
		return /*html*/ `
    <div class="game">
      <h1 class="logo">Truncheons & Flagons</h1>

      <div class="results">
        <div class="winningResults">${winningResultsHTML()}</div>
        <div class="resetGame">${sumbitResultsButton()}</div>
      </div>
    

      <div class="score-board" >
        ${ScoreBoardHTML()}
      </div>
    </div>
    `;
	} else {
		return /*html*/ `
  <div class="game">
    <h1 class="logo">Truncheons & Flagons</h1>

    <div class="score-form">
      ${ScoreFormHTML()}
    </div>
    </div>

	  <div class="score-board" >
		  ${ScoreBoardHTML()}
    </div>
  </div>
    
  `;
	}
};

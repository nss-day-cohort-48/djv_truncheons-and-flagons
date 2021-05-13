import { ScoreFormHTML } from "./ScoreForm.js";
import { ScoreBoardHTML } from "./ScoreBoard.js";

export const gameHTML = () => {
	return /*html*/ `
  <div class="game">
    <h1 class="logo">Truncheons & Flagons</h1>

    <div class="score-form">
      ${ScoreFormHTML()}
  </div>

	<div class="score-board" >
		${ScoreBoardHTML()}
</div>
  `;
};

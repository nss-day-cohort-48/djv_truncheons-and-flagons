import {setupHTML} from "./ScreenSetup.js";
import {introHTML} from "./ScreenIntro.js";
import {gameHTML} from "./ScreenGame.js";
import {getGameState} from "./gameState.js";

export const truncheonsHTML = () => {
  const gameState = getGameState();
  return /*html*/ `
<article id="introScreen"> ${
    gameState.intro && !gameState.setup && !gameState.playing ? introHTML() : ``
  }</article>
<article id="setupScreen">${
    !gameState.intro && gameState.setup && !gameState.playing ? setupHTML() : ``
  }</article>
<article id="gameScreen"> ${
    !gameState.intro && !gameState.setup && gameState.playing ? gameHTML() : ``
  } </article>
	`;
};

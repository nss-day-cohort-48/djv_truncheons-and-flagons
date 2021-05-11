import { setupHTML } from "./ScreenSetup.js";
// import { introHTML } from "./ScreenIntro.js";
// import { gameHTML } from "./ScreenGame.js";
// import { getGameState } from "./gameState.js";

export const truncheonsHTML = () => {
    // const gameState = getGameState();

    // 	if (gameState.intro) {
    // 		return /*html*/ `
    //       <article> ${introHTML()}</article>
    //     `;
    // 	} else if (!gameState.intro && gameState.setup && !gameState.playing) {
    // 		return /*html*/ `
    //         <article> ${setupHTML()}</article>
    //       `;
    // 	} else if (!gameState.intro && !gameState.setup && gameState.playing) {
    // 		return /*html*/ `
    //   <article> ${gameHTML()} </article>
    //   `;
    // 	}
    return `<article> ${setupHTML()}</article>`;
};
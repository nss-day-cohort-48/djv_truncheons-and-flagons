import { setupHTML } from "./ScreenSetup.js";
import { introHTML } from "./ScreenIntro.js";
import { gameHTML } from "./ScreenGame.js";

export const truncheonsHTML = () => {
  // TODO dont always render all three screens
  return /*html*/ `
  <article> ${introHTML()} </article>
  <article> ${setupHTML()} </article>
  <article> ${gameHTML()} </article>
    `;
};

import { truncheonsHTML } from "./truncheons.js";

const container = document.querySelector(".container");
const render = () => {
    // TODO fetch and chain actual rendering on with then()
    container.innerHTML = truncheonsHTML();
};

document.addEventListener("stateChanged", () => render());

render()
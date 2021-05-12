import { truncheonsHTML } from "./Truncheons.js";
import { fetchAll } from "./dataAccess.js";

const container = document.querySelector(".container");
const render = () => {
    fetchAll().then(() => {
        container.innerHTML = truncheonsHTML();
    });
};

document.addEventListener("stateChanged", () => render());

render();
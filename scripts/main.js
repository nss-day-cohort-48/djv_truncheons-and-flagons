import { fetchAllCollections } from "./database.js";
import { truncheonsHTML } from "./truncheons.js";

const container = document.querySelector(".container");
const render = () => {
    fetchAllCollections().then(() => {
        container.innerHTML = truncheonsHTML();
    });
};

document.addEventListener("stateChanged", () => render());

render();
import {fetchAllCollections} from "./database.js";
import {truncheonsHTML} from "./Truncheons.js";

const container = document.querySelector(".container");
const render = () => {
  fetchAllCollections().then(() => {
    container.innerHTML = truncheonsHTML();
  });
};

document.addEventListener("stateChanged", () => render());

render();

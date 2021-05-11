<<<<<<< HEAD
import { fetchAllCollections } from "./dataAccess.js";
import { truncheonsHTML } from "./Truncheons.js";

const container = document.querySelector(".container");
const render = () => {
    fetchAllCollections().then(() => {
        container.innerHTML = truncheonsHTML();
    });
=======
import {truncheonsHTML} from "./Truncheons.js";
import {fetchAll} from "./dataAccess.js";

const container = document.querySelector(".container");
const render = () => {
  fetchAll().then(() => {
    container.innerHTML = truncheonsHTML();
  });
>>>>>>> feature-gameState
};

document.addEventListener("stateChanged", () => render());

render();
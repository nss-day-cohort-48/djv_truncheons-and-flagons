// import { setScore } from "./database.js"

import {
  addScores,
  buildScores,
  setRoundNumber,
  setFirstTeamScore,
  setSecondTeamScore,
  setThirdTeamScore,
  getCurrentGame,
} from "./database.js";

export const gameHTML = () => {
  const currentGame = getCurrentGame();
  return /*html*/ `
  <div class="game">
    <h1 class="logo">Truncheons & Flagons</h1>

    <div class="scoreForm">
      <h3 class="round" id="roundNumber">Round ${currentGame.roundNumber} </h3>
      <fieldset>
        <label for="firstTeam">First Team</label>
        <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="3" value="0"/>
      </fieldset>
      <fieldset>
        <label for="secondTeam">Second Team</label>
        <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="3" value="0"/>
      </fieldset>
      <fieldset>
        <label for="thirdTeam">Third Team</label>
        <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="3" value="0"/>
      </fieldset>
      <button class="button" id="saveScoreButton">Save Round Scores</button>
    </div>
  </div>

  <div class="teamScore" >
    <h4>First Team</h4>
    <div id="teamScore1">Current Score is ${currentGame.firstTeamScore}</div>
  </div>
  <div class="teamScore">
    <h4>Second Team</h4>
    <div  id="teamScore2">Current Score is ${currentGame.secondTeamScore}</div>
  </div>
  <div class="teamScore" >
    <h4>Third Team</h4>
    <div id="teamScore3">Current Score is ${currentGame.thirdTeamScore}</div>
  </div>
  `;
};

document.addEventListener("click", (event) => {
  if (event.target.id === "saveScoreButton") {

    // init local score variables
    let firstTeamRoundScore = 0;
    let secondTeamRoundScore = 0;
    let thirdTeamRoundScore = 0;
    let totalRoundScore = 0;

    // store from DOM to local score variables
    firstTeamRoundScore = parseInt(
      document.getElementById("firstTeamScore").value
    );
    secondTeamRoundScore = parseInt(
      document.getElementById("secondTeamScore").value
    );
    thirdTeamRoundScore = parseInt(
      document.getElementById("thirdTeamScore").value
    );

    // add em up
    totalRoundScore =
      firstTeamRoundScore + secondTeamRoundScore + thirdTeamRoundScore;

    const currentGame = getCurrentGame()
    // check for negatives
    if (
      firstTeamRoundScore < 0 ||
      secondTeamRoundScore < 0 ||
      thirdTeamRoundScore < 0
    ) {
      window.alert(`Please enter a positive number!`);
      // handle total round score too large
    } else if (totalRoundScore > 3) {
      window.alert(
        `Total Round Score must be 3 or less, you provided ${totalRoundScore}`
      );
      // handle success case
    } else if (currentGame.roundNumber === 3) {
      setRoundNumber(1)
      setFirstTeamScore(0)
      setSecondTeamScore(0)
      setThirdTeamScore(0)

      window.alert(`And the winner is....`)
      document.dispatchEvent(new CustomEvent("stateChanged"))
    
    } else {
      const currentGame = getCurrentGame();
      setRoundNumber(currentGame.roundNumber + 1);
      setFirstTeamScore(currentGame.firstTeamScore + firstTeamRoundScore);
      setSecondTeamScore(currentGame.secondTeamScore + secondTeamRoundScore);
      setThirdTeamScore(currentGame.thirdTeamScore + thirdTeamRoundScore);

      buildScores(
        firstTeamRoundScore,
        secondTeamRoundScore,
        thirdTeamRoundScore
      );
      addScores();
    }
  }
});

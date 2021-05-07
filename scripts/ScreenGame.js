// import { setScore } from "./database.js"

import {
    addScores,
    buildScores,
    setRoundNumber,
    setFirstTeamScore,
    setSecondTeamScore,
    setThirdTeamScore,
    getCurrentGame,
    getTeams,
} from "./database.js";

import { winner } from "./winner.js";

export const gameHTML = () => {
    const currentGame = getCurrentGame();
    const teams = getTeams();

    let foundFirstTeamName = teams.find(
        (team) => currentGame.firstTeamId === team.id
    ).name;
    let foundSecondTeamName = teams.find(
        (team) => currentGame.secondTeamId === team.id
    ).name;
    let foundThirdTeamName = teams.find(
        (team) => currentGame.thirdTeamId === team.id
    ).name;

    //   for (const team of teams) {
    //     if (currentGame.firstTeamId === team.id) {
    //       foundFirstTeamName = team.name
    //     }
    //     if (currentGame.secondTeamId === team.id) {
    //       foundSecondTeamName = team.name
    //     }
    //     if (currentGame.thirdTeamId === team.id) {
    //       foundThirdTeamName = team.name
    //     }
    //  }

    return /*html*/ `
  <div class="game">
    <h1 class="logo">Truncheons & Flagons</h1>

    <div class="scoreForm">
      <h3 class="round" id="roundNumber">Round ${currentGame.roundNumber} </h3>
      <fieldset>
        <label for="firstTeam">${foundFirstTeamName}</label>
        <input class="scoreInput" id="firstTeamScore" name="firstTeam" type="number" min="0" max="6" value="0"/>
      </fieldset>
      <fieldset>
        <label for="secondTeam">${foundSecondTeamName}</label>
        <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="6" value="0"/>
      </fieldset>
      <fieldset>
        <label for="thirdTeam">${foundThirdTeamName}</label>
        <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="6" value="0"/>
      </fieldset>
      <button class="button" id="saveScoreButton">Save Round Scores</button>
    </div>
  </div>

  <div class="teamScore" >
    <h4>${foundFirstTeamName}</h4>
    <div id="teamScore1">Current Score is ${currentGame.firstTeamScore}</div>
  </div>
  <div class="teamScore">
    <h4>${foundSecondTeamName}</h4>
    <div  id="teamScore2">Current Score is ${currentGame.secondTeamScore}</div>
  </div>
  <div class="teamScore" >
    <h4>${foundThirdTeamName}</h4>
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

        const currentGame = getCurrentGame();
        // check for negatives
        if (
            firstTeamRoundScore < 0 ||
            secondTeamRoundScore < 0 ||
            thirdTeamRoundScore < 0
        ) {
            window.alert(`How did you score negative points?`);
            // handle total round score too large
        } else if (totalRoundScore === 0) {
            window.alert(`Someone had to have scored...`);
        } else if (totalRoundScore > 6) {
            window.alert(`There's no way you could have scored more than 6 points.`);
            //check if roundNumber is 3 or greater
        } else if (currentGame.roundNumber >= 3) {
            //alert the game winner
            window.alert(`And the winner is...  ${winner()}!!`);
            //reset numbers
            setRoundNumber(1);
            setFirstTeamScore(0);
            setSecondTeamScore(0);
            setThirdTeamScore(0);

            //render
            document.dispatchEvent(new CustomEvent("stateChanged"));
            // handle success case
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
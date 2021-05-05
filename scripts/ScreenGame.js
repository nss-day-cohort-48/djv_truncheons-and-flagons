// import { setScore } from "./database.js"

export const gameHTML = () => {
  return /*html*/ `
  <div class="game">
    <h1 class="logo">Truncheons & Flagons</h1>

    <div class="scoreForm">
      <h3 class="round" id="roundNumber">Round 1</h3>
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
    <div id="teamScore1">Current Score is 0</div>
  </div>
  <div class="teamScore">
    <h4>Second Team</h4>
    <div  id="teamScore2">Current Score is 0</div>
  </div>
  <div class="teamScore" >
    <h4>Third Team</h4>
    <div id="teamScore3">Current Score is 0</div>
  </div>
  `;
};

<<<<<<< HEAD
document.addEventListener("click", (event) => {
  if (event.target.id === "saveScoreButton") {
    let firstTeamScore = 0;
    let secondTeamScore = 0;
    let thirdTeamScore = 0;
    let totalRoundScore = 0;

    firstTeamScore += parseInt(document.getElementById("firstTeamScore").value);
    secondTeamScore += parseInt(
      document.getElementById("secondTeamScore").value
    );
    thirdTeamScore += parseInt(document.getElementById("thirdTeamScore").value);

    totalRoundScore = firstTeamScore + secondTeamScore + thirdTeamScore;

    if (totalRoundScore > 3) {
      window.alert(
        `Total Round Score must be 3 or less, you provided ${totalRoundScore}`
      );
    } else {
      roundNumber++;
      document.getElementById("roundNumber").innerHTML = `Round ${roundNumber}`;
      document.getElementById(
        "teamScore1"
      ).innerHTML = `<div>Current Score is ${firstTeamScore}</div`;
      document.getElementById(
        "teamScore2"
      ).innerHTML = `<div>Current Score is ${secondTeamScore}</div`;
      document.getElementById(
        "teamScore3"
      ).innerHTML = `<div>Current Score is ${thirdTeamScore}</div`;
=======


let roundNumber = 1
let firstTeamScore = 0
let secondTeamScore = 0
let thirdTeamScore = 0


document.addEventListener(
  "click",
  (event) => {
    if (event.target.id === "saveScoreButton") {

      let firstTeamRoundScore = 0
      let secondTeamRoundScore = 0
      let thirdTeamRoundScore = 0
      let totalRoundScore = 0
       
      firstTeamRoundScore = parseInt(document.getElementById("firstTeamScore").value)
      secondTeamRoundScore = parseInt(document.getElementById("secondTeamScore").value)
      thirdTeamRoundScore = parseInt(document.getElementById("thirdTeamScore").value)

      totalRoundScore = firstTeamRoundScore + secondTeamRoundScore + thirdTeamRoundScore

      if (firstTeamRoundScore < 0 || secondTeamRoundScore < 0 || thirdTeamRoundScore < 0) {
        window.alert(`Please enter a positive number!`)
      } else if (totalRoundScore <= 3) {

        totalRoundScore = 0
        roundNumber++

        firstTeamScore += parseInt(document.getElementById("firstTeamScore").value)
        secondTeamScore += parseInt(document.getElementById("secondTeamScore").value)
        thirdTeamScore += parseInt(document.getElementById("thirdTeamScore").value)

        document.getElementById("roundNumber").innerHTML = `Round ${roundNumber}`
        document.getElementById("teamScore1").innerHTML = `<div>Current Score is ${firstTeamScore}</div`
        document.getElementById("teamScore2").innerHTML = `<div>Current Score is ${secondTeamScore}</div`
        document.getElementById("teamScore3").innerHTML = `<div>Current Score is ${thirdTeamScore}</div`

        firstTeamRoundScore = 0
        secondTeamRoundScore = 0
        thirdTeamRoundScore = 0

      } else {
        window.alert(`Total Round Score must be 3 or less, you provided ${totalRoundScore}`)  
      }      
>>>>>>> 169f92b37e12781f08462334bed941e73a901c11
    }
  }
)


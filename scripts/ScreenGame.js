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
        <input class="scoreInput" id="secondTeamScore" name="secondTeam" type="number" min="0" max="3" value="0" />
      </fieldset>
      <fieldset>
        <label for="thirdTeam">Third Team</label>
        <input class="scoreInput" id="thirdTeamScore" name="thirdTeam" type="number" min="0" max="3" value="0" />
      </fieldset>
      <button class="button" id="saveScoreButton">Save Round Scores</button>
    </div>
  </div>

  <div class="teamScore">
    <h4>First Team</h4>
    <div id="teamScore1">Current Score is 0</div>
  </div>
  <div class="teamScore">
    <h4>Second Team</h4>
    <div  id="teamScore2">Current Score is 0</div>
  </div>
  <div class="teamScore">
    <h4>Third Team</h4>
    <div  id="teamScore3">Current Score is 0</div>
  </div>
  `;
};

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
    }
  }
});

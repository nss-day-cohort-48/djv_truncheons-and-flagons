export const gameHTML = () => {
  return /*html*/ `
  <div class="game">
    <h1 class="logo">Truncheons & Flagons</h1>

    <div class="scoreForm">
      <h3 class="round">Round #</h3>
      <fieldset>
        <label for="firstTeam">First Team</label>
        <input class="scoreInput" name="firstTeam" type="text" />
      </fieldset>
      <fieldset>
        <label for="secondTeam">Second Team</label>
        <input class="scoreInput" name="secondTeam" type="text" />
      </fieldset>
      <fieldset>
        <label for="thirdTeam">Third Team</label>
        <input class="scoreInput" name="thirdTeam" type="text" />
      </fieldset>
      <button class="button" id="saveScoreButton">Save Round Scores</button>
    </div>
  </div>

  <div class="teamScore">
    <h4>First Team</h4>
    <div>First Team's current score</div>
  </div>
  <div class="teamScore">
    <h4>Second Team</h4>
    <div>Second Team's current score</div>
  </div>
  <div class="teamScore">
    <h4>Third Team</h4>
    <div>Third Team's current score</div>
  </div>
  `;
};

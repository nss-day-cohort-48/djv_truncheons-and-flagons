export const truncheonsHTML = () => {
  // TODO dont always render all three screens
  return /*html*/ `
  <article> ${introHTML()} </article>
  <article> ${setupHTML()} </article>
  <article> ${gameHTML()} </article>

    `;
};




export const gameHTML = () => {
	return /*html*/`
  <div class="game">

  <h1 class="logo">Truncheons & Flagons</h1>

  <div class="scoreForm">
  <h3 class="round">Round #</h3>
  <fieldset>
      <label for="firstTeam">First Team</label>
      <input class="scoreInput" name="firstTeam" type="text">
  </fieldset>
  <fieldset>
      <label for="secondTeam">Second Team</label>
      <input class="scoreInput" name="secondTeam" type="text">
  </fieldset>
  <fieldset>
      <label for="thirdTeam">Third Team</label>
      <input class="scoreInput" name="thirdTeam" type="text">
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

export const introHTML = () => {
  return /*html*/ `
  <h1 class="logo">Truncheons & Flagons</h1>
  <button class="newGameButton">Set Up New Game</button>
  <div class="leaderboardContainer">
    <h3>Current Leaderboard</h3>
    <ul>
      <li> #1: The Flo Rida Fan Club -- 4 points</li>
      <li> #2: The Red Barons -- 2 points</li>
      <li> #3: REDACTED -- 0 points</li>
    </ul>
  </div>
  `;
};
export const setupHTML = () => {
  return /*html*/ `

    <h1 class="logo">Truncheons & Flagons</h1>
    
    <div class="selectTeamSection">
      <h2>Select Your Teams:</h2>
      <div class="selectTeamSectionDropdown">
        <div>
          <select class="teamDropdown" name="teams">
            <option>Select team 1:</option>
            <option>Some Team</option>
            <option>Some Team</option>
            <option>Some Team</option>
          </select>
        </div>
        <div>
          <select class="teamDropdown" name="teams">
            <option>Select team 2:</option>
            <option>Some Team</option>
            <option>Some Team</option>
            <option>Some Team</option>
          </select>
        </div>
        <div>
          <select class="teamDropdown" name="teams">
            <option>Select team 3:</option>
            <option>Some Team</option>
            <option>Some Team</option>
            <option>Some Team</option>
          </select>
        </div>
        <button class="startGameButton">Start Game</button>
      </div>
    </div>
    <h2>Add New Team:</h2>
    <div class="newTeamForm">
      <form action="">
        <div>
          <input placeholder="Team Name:" type="text" />
        </div>
        <div>
          <input type="submit" value="Add Team" />
        </div>
      </form>
    </div>

    <h2>Add New Player:</h2>

    <div class="newPlayerForm">
      <form>
        <input
          placeholder="First Name:"
          type="text"
          id="firstName"
          name="firstName"
        /><br />
        <input
          placeholder="Last Name:"
          type="text"
          id="lastName"
          name="lastName"
        /><br /><br />
        <div>
          <select name="teams">
            <option>Player's Team</option>
            <option>Some Team</option>
            <option>Some Team</option>
            <option>Some Team</option>
          </select>
        </div>
        <input type="submit" value="Add Player" />
      </form>
    </div>
    `;
};
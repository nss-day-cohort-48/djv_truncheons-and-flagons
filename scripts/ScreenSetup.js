import {AssignPlayerTeamHtml} from "./AssignPlayerTeam.js";
import {getPlayers, getTeams, addPlayer, addTeam} from "./database.js";
import {SelectTeamsDropdownHtml} from "./TeamSelect.js";
import {UserSetupInputValid} from "./UserSetupInputValid.js";

document.addEventListener("click", (event) => {
  if (event.target.id === "playerSubmitButton") {
    // stores the user input in variables
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const playerTeam = document.getElementById("selectedTeam").value;

    if (UserSetupInputValid(firstName, lastName, playerTeam)) {
      const teams = getTeams();
      const players = getPlayers();

      // finds the team object that matches the user input
      const teamToAddPlayerTo = teams.find((team) => playerTeam === team.name);

      // filters and stores the players that are in the currently selected team into an array
      const playersInCurrentTeam = players.filter(
        (player) => teamToAddPlayerTo.id === player.teamId
      );

      // checks if the selected team is full.
      if (playersInCurrentTeam.length < 3) {
        addPlayer(firstName, lastName, playerTeam);
      } else {
        window.alert("Selected team already has 3 players");
        return;
      }
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id === "teamSubmitButton") {
    const teamName = document.getElementById("teamName").value;

    if (teamName) {
      addTeam(teamName);
    } else {
      window.alert("Please complete all fields");
    }
  }
});

export const setupHTML = () => {
  return /*html*/ ` 
    <h1 class="logo">Truncheons & Flagons</h1>
    <div class="selectTeamSection">
    <h2>Select Your Teams:</h2>
    <div class="selectTeamSectionDropdown">

    ${SelectTeamsDropdownHtml()}

        <button class="startGameButton">Start Game</button>
    </div>
    </div>

    <h2>Add New Team:</h2>
    
    <div>
    <form class="newTeamForm">
        <div>
        <input placeholder="Team Name:" type="text" id="teamName"/>
        </div>
        <div>
        <input id="teamSubmitButton" type="submit" value="Add Team" />
        </div>
    </form>
    </div>

    <h2>Add New Player:</h2>

    <div>
    <form class="newPlayerForm">
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
        <select id="selectedTeam" name="teams">
            <option>Player's Team</option>

            ${AssignPlayerTeamHtml()}

        </select>
        </div>
        <input id="playerSubmitButton" type="submit" value="Add Player" />
    </form>
    </div>
    `;
};

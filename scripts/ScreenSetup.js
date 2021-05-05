import { getPlayers, getTeams, addPlayer, addTeam } from "./database.js";

document.addEventListener("click", (event) => {
    if (event.target.id === "playerSubmitButton") {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const playerTeam = document.getElementById("selectedTeam").value;

        if (firstName && lastName && playerTeam) {
            addPlayer(firstName, lastName, playerTeam);
        } else {
            window.alert("Please complete all fields");
        }
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === "teamSubmitButton") {
        const teamName = document.getElementById("teamName").value

        if (teamName) {
            addTeam(teamName)
        } else {
            window.alert("Please complete all fields");
        }
    }
})

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

const SelectTeamsDropdownHtml = () => {
    let teamsHtml = "";
    // counter serves to determine how many teams will be added
    let teamCounter = 1;

    const teams = getTeams();

    // each run of the while loop will add a dropdown to select every team available.
    while (teamCounter < 4) {
        // opening tag for select dropdown
        teamsHtml += `<div><select class="teamDropdown" name="teams">`;
        // adding number for currently selected team with teamCounter
        teamsHtml += `<option>Select team ${teamCounter}:</option>`;
        // mapping each option for every team to a string
        teamsHtml += teams.map((team) => `<option>${team.name}</option>`).join("");
        // closing tags
        teamsHtml += `</select></div>`;

        teamCounter++;
    }

    return teamsHtml;
};

const AssignPlayerTeamHtml = () => {
    const teams = getTeams();
    return teams.map((team) => `<option>${team.name}</option>`).join("");
};
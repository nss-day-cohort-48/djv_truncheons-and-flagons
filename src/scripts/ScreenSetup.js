import { playersRaw, teamsRaw } from "./dataAccess.js";
import { startGame } from "./gameState.js";
import { dispatchStateChanged } from "./helpers.js";
import { addPlayer, getPlayers } from "./PlayersProvider.js";
import { addTeam, getTeams } from "./TeamsProvider.js";

document.addEventListener("click", (event) => {
    if (event.target.id === "playerSubmitButton") {
        // stores the user input in variables
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const playerTeamId = parseInt(
            document.getElementById("selectedTeam").value
        );

        if (PlayerSetupInputValid(firstName, lastName, playerTeamId)) {
            if (!TeamHasThreePlayers(playerTeamId)) {
                addPlayer(firstName, lastName, playerTeamId);
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

document.addEventListener("click", (event) => {
    if (event.target.id === "startGameButton") {
        const teamOneId = parseInt(document.getElementById("1").value);
        const teamTwoId = parseInt(document.getElementById("2").value);
        const teamThreeId = parseInt(document.getElementById("3").value);

        startGame(teamOneId, teamTwoId, teamThreeId);
    }
});

document.addEventListener("change", (event) => {
    if (event.target.name === "teams") {
        const teamOneId = parseInt(document.getElementById("1").value);
        const teamTwoId = parseInt(document.getElementById("2").value);
        const teamThreeId = parseInt(document.getElementById("3").value);

        enableStartButton(teamOneId, teamTwoId, teamThreeId);
    }
});

document.addEventListener("keyup", () => {
    if (document.getElementById("teamName").value === "") {
        document.getElementById("teamSubmitButton").disabled = true;
    } else {
        document.getElementById("teamSubmitButton").disabled = false;
    }
});

document.addEventListener("change", (event) => {
    if (event.target.name === "playerAddTeams") {
        document.getElementById("playerSubmitButton").disabled = false;
    }
});

document.addEventListener("change", (event) => {
    if (event.target.name === "teams") {
        const teamOneId = parseInt(document.getElementById("1").value);
        const teamTwoId = parseInt(document.getElementById("2").value);
        const teamThreeId = parseInt(document.getElementById("3").value);

        TeamSelectMessage(teamOneId, teamTwoId, teamThreeId);
    }
});

export const setupHTML = () => {
    return /*html*/ ` 
    <h1 class="logo">Truncheons & Flagons</h1>
    <section >
    <h2>Select Your Teams:</h2>
	<div id="userInputInfo"></div>
    <div class="selectTeamSectionDropdown">

    ${SelectTeamsDropdownHtml()}

        <button disabled="true" id="startGameButton" type="button" class="startGameButton button">Start Game</button>
    </div>
    </section>

    <section class="addSection">
    
    <div class="formSection">
    <form class="newTeamForm form" onsubmit="return false">
    <h2>Add New Team:</h2>
        <div>
        <input class="minus" class="formInput" placeholder="Team Name:" type="text" id="teamName"/>
        </div>
        <div>
        <input disabled="true" id="teamSubmitButton" class="button formButton" type="button" value="Add Team" />
        </div>
    </form>
    </div>

    
    <div class="formSection">
    <form class="newPlayerForm form">
    <h2>Add New Player:</h2>
        <input
        class="minus"
        class="formInput"
        placeholder="First Name:"
        type="text"
        id="firstName"
        name="firstName"
        />
        <input
        class="minus"
        class="formInput"
        placeholder="Last Name:"
        type="text"
        id="lastName"
        name="lastName"
        />
        <div>
        <select class="formInput" id="selectedTeam" name="playerAddTeams">
            <option>Player's Team</option>

            ${AssignPlayerTeamHtml()}

        </select>
        </div>
        <input disabled="true" id="playerSubmitButton" class="button formButton" type="button" value="Add Player" />

    </form>
    </div>
    </section>
    `;
};

export const PlayerSetupInputValid = (firstName, lastName, playerTeam) => {
    if (firstName && lastName && playerTeam === "Player's Team") {
        window.alert("Please select a valid team");
        return false;
    } else if (firstName && lastName && playerTeam !== "Player's Team") {
        return true;
    } else {
        window.alert("Please complete all fields");
        return false;
    }
};

export const AssignPlayerTeamHtml = () => {
    const teams = getTeams();
    return teams
        .map((team) => `<option value="${team.id}">${team.name}</option>`)
        .join("");
};

export const SelectTeamsDropdownHtml = () => {
    let teamsHtml = "";
    // counter serves to determine how many teams will be added
    let teamCounter = 1;

    const teams = getTeams();

    // each run of the while loop will add a dropdown to select every team available.
    while (teamCounter < 4) {
        // opening tag for select dropdown
        teamsHtml += `<div><select id="${teamCounter}" class="teamDropdown formInput" name="teams">`;
        // adding number for currently selected team with teamCounter
        teamsHtml += `<option>Select team ${teamCounter}:</option>`;
        // mapping each option for every team to a string
        teamsHtml += teams
            .map((team) => `<option value="${team.id}">${team.name}</option>`)
            .join("");
        // closing tags
        teamsHtml += `</select></div>`;

        teamCounter++;
    }

    return teamsHtml;
};

const TeamSelectMessage = (teamOneId, teamTwoId, teamThreeId) => {
    const teamIdArray = [];
    if (teamOneId) {
        teamIdArray.push(teamOneId);
    }
    if (teamTwoId) {
        teamIdArray.push(teamTwoId);
    }
    if (teamThreeId) {
        teamIdArray.push(teamThreeId);
    }
    const players = playersRaw();
    const teams = teamsRaw();
    let userMessage = "";
    for (const teamId of teamIdArray) {
        const playersInTeam = players.filter(
            (player) => player.teamId === teamId
        ).length;
        if (playersInTeam < 3) {
            const invalidTeam = teams.find((team) => team.id === teamId);
            userMessage += `<div class="warning"><img id="warningIcon" src="./images/warning.png"> ${invalidTeam.name} only has ${playersInTeam} players. 3 are required. <img id="warningIcon" src="./images/warning.png"></div>`;
        }
    }
    document.getElementById("userInputInfo").innerHTML = userMessage;
};

const enableStartButton = (teamOneId, teamTwoId, teamThreeId) => {
    if (
        TeamHasThreePlayers(teamOneId) &&
        TeamHasThreePlayers(teamTwoId) &&
        TeamHasThreePlayers(teamThreeId)
    ) {
        const allTeamsId = new Set();
        if (!Number.isNaN(teamOneId)) {
            allTeamsId.add(teamOneId);
        }
        if (!Number.isNaN(teamTwoId)) {
            allTeamsId.add(teamTwoId);
        }
        if (!Number.isNaN(teamThreeId)) {
            allTeamsId.add(teamThreeId);
        }

        if (allTeamsId.size === 3) {
            document.getElementById("startGameButton").disabled = false;
        } else {
            document.getElementById("startGameButton").disabled = true;
        }
    }
};

const TeamHasThreePlayers = (teamId) => {
    const players = playersRaw();
    if (players.filter((player) => player.teamId === teamId).length === 3) {
        return true;
    } else {
        return false;
    }
};
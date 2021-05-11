import { getTeams } from "./database.js";

export const SelectTeamsDropdownHtml = () => {
    let teamsHtml = "";
    // counter serves to determine how many teams will be added
    let teamCounter = 1;

    const teams = getTeams();

    // each run of the while loop will add a dropdown to select every team available.
    while (teamCounter < 4) {
        // opening tag for select dropdown
        teamsHtml += `<div><select id="${teamCounter}" class="teamDropdown" name="teams">`;
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
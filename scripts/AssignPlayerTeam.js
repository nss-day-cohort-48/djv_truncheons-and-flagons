import { getTeams } from "./database.js";

export const AssignPlayerTeamHtml = () => {
    const teams = getTeams();
    return teams.map((team) => `<option>${team.name}</option>`).join("");
};
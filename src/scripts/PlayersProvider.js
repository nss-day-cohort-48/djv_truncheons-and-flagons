import { playersRaw, postPlayer, teamsRaw } from "./dataAccess.js";

export const getPlayers = () => playersRaw();

export const addPlayer = (firstName, lastName, teamId) => {
    const newPlayer = {
        firstName: firstName,
        lastName: lastName,
        teamId: teamId,
    };
    postPlayer(newPlayer);
};

// TODO find a clean way to factor these alerts out to a component
// export const UserSetupInputValid = (firstName, lastName, playerTeam) => {
//     if (firstName && lastName && playerTeam === "Player's Team") {
//         window.alert("Please select a valid team");
//         return false;
//     } else if (firstName && lastName && playerTeam !== "Player's Team") {
//         return true;
//     } else {
//         window.alert("Please complete all fields");
//         return false;
//     }
// };
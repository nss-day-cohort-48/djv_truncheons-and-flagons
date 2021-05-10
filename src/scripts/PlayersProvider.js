import {playersRaw, postPlayer} from "./dataAccess";

export const getPlayers = () => playersRaw();

export const addPlayer = (firstName, lastName, teamName) => {
  const teams = teamsRaw();
  newPlayer.firstName = firstName;
  newPlayer.lastName = lastName;
  newPlayer.teamId = teams.find((team) => team.name === teamName).id;

  postPlayer(newPlayer);
};

// TODO find a clean way to factor these alerts out to a component
export const UserSetupInputValid = (firstName, lastName, playerTeam) => {
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

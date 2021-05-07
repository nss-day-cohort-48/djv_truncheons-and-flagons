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
import { teamsRaw, scoresRaw, playersRaw, postTeam } from "./dataAccess.js";

export const getTeam = (teamId) => teamsRaw().find((t) => t.id === teamId);

export const getTeams = () => {
	const teams = teamsRaw();
	const scores = scoresRaw();
	const players = playersRaw();
	// return countTeamScores(countTeamPlayers(teams, players), scores);
	const teamsWithScores = countTeamScores(teams, scores);
	const teamsWithScoresAndPlayers = countTeamPlayers(teamsWithScores, players);
	return teamsWithScoresAndPlayers.map((t) => ({ ...t }));
};

const countTeamScores = (teamsArray, scores) => {
	scores.forEach((s) => {
		const teamIndex = teamsArray.findIndex((t) => t.id === s.teamId);

		teamsArray[teamIndex].score = !teamsArray[teamIndex].score
			? s.score // if we havent started counting for this team, start at the given score
			: teamsArray[teamIndex].score + s.score; // otherwise add the score
	});
	return teamsArray;
};

const countTeamPlayers = (teamsArray, players) => {
	players.forEach((p) => {
		const teamIndex = teamsArray.findIndex((t) => t.id === p.teamId);

		teamsArray[teamIndex].playerCount = !teamsArray[teamIndex].playerCount
			? 1 // if we havent started counting for this team, start at one
			: teamsArray[teamIndex].playerCount + 1; // otherwise add one
	});
	return teamsArray;
};

export const addTeam = (teamName) => {
	//const currentGameState = getGameState();
	const newTeam = {
		name : teamName
	};
	postTeam(newTeam);
};

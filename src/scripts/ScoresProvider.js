import {postScores, scoresRaw} from "./dataAccess";

export const getScores = () => scoresRaw();

export const addScores = (firstTeamScore, secondTeamScore, thirdTeamScore) => {
  postScores(
    makeScoreObj(firstTeamScore),
    makeScoreObj(secondTeamScore),
    makeScoreObj(thirdTeamScore)
  );
};

const makeScoreObj = (pteamObj) => ({
  timestamp: Date.now(),
  teamId: pteamObj.id,
  score: pteamObj.score,
});

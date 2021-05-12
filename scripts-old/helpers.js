export const randomArrayOf = (num) => {
  const a = [];
  // create an array with num elements starting from 1
  for (let i = 1; i <= num; i++) {
    a.push(i);
  }
  // ARRAY.sort() usually compares two elements in it's callback.
  //  You compare them and return a positive result if the first one is larger;
  //    or a negative number if the second one is larger.
  //  Here, we just return a random number between -0.5 and 0.5, resulting in
  //    all elements of the array being shuffled!
  return a.sort(() => Math.random() - 0.5);
};

export const headersJSON = {
  "Content-Type": "application/json",
};

export const makeScoreObj = (pteamObj) => ({
  method: "POST",
  headers: headersJSON,
  body: JSON.stringify({
    timestamp: Date.now(),
    teamId: pteamObj.id,
    score: pteamObj.score,
  }),
});

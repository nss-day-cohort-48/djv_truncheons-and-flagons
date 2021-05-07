export const randomArrayOf = (num) => {
  const a = [];
  for (let i = 1; i <= num; i++) {
    a.push(i);
  }

  return a.sort(() => Math.random() - 0.5);
};

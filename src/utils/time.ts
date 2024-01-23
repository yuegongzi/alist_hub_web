export const isExpired = (
  millisecondTimestamp: number,
  milliseconds: number
) => {
  const currentTime = Date.now();
  const t = currentTime - millisecondTimestamp;
  return t > milliseconds;
};

export const wait = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

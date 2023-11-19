export const getCounterTime = (timestamp: Date) => {
  const timestamp1 = timestamp.getTime();
  const timestamp2 = new Date().getTime();

  if (timestamp1 <= timestamp2) {
    return { minutes: 0, seconds: 0 };
  }

  const differenceInMilliseconds = timestamp1 - timestamp2;
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

  var minutes = 0;
  var seconds = differenceInSeconds;

  if (differenceInSeconds >= 60) {
    minutes = Math.floor(differenceInSeconds / 60);
    seconds = differenceInSeconds % 60;
  }

  return { minutes, seconds };
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

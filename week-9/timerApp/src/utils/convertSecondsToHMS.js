export const convertSecondsToHMS = (totalSeconds) => {
  let convertedTime = {};
  let formattedTime = "";

  const hours = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const seconds = remainingSecondsAfterHours % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  convertedTime = {
    hours,
    minutes,
    seconds,
  };

  return {
    convertedTime,
    formattedTime,
  };
};

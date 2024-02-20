export const isTimeElapsed = (fromTimeStamp, durationInSeconds) => {
  const now = Date.now()
  const totalSecondsElapsed = (now - fromTimeStamp) / 1000
  
  return totalSecondsElapsed >= durationInSeconds
};

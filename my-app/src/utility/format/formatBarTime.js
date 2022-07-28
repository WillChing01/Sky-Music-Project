export const formatTime = (songDuration, songFraction) => {
    const [hours, minutes, seconds] = getTimeValues(songDuration, songFraction);
    const isLong = getIsLong(songDuration);
    const formattedFraction = padTime(hours, minutes, seconds, isLong);
    return formattedFraction;
};

const getIsLong = (songDuration) => {
    const wholeHours = Math.floor(songDuration/3600);
    const isLong = wholeHours > 0;
    return isLong;
};

const getTimeValues = (duration, fraction) => {
    const secondsLeft = Math.round(duration * fraction);
    const secondsOnTheMinute = secondsLeft % 60;
    
    const minutesLeft = Math.floor(secondsLeft / 60);
    const minutesOnTheHour = minutesLeft % 60;

    const hoursLeft = Math.floor(minutesLeft / 60);
    const hoursOnTheDay = hoursLeft % 24;

    return [hoursOnTheDay, minutesOnTheHour, secondsOnTheMinute];
};

const padTime = (hours, minutes, seconds, isLong) => {
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    const paddedMinsAndSecs = `${paddedMinutes}:${paddedSeconds}`;
    const paddedTime = isLong ? `${paddedHours}:${paddedMinsAndSecs}`
                              : paddedMinsAndSecs;
    return paddedTime;
};
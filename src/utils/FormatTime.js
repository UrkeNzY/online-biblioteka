import moment from "moment";

export const formatTime = (actionDate) => {
  const currentDate = moment();
  const duration = moment.duration(currentDate.diff(actionDate));

  let timeSinceString = "";

  if (duration.asSeconds() < 60) {
    timeSinceString = `${Math.floor(duration.asSeconds())} sekund${
      Math.floor(duration.asMinutes()) % 10 === 1
        ? ""
        : Math.floor(duration.asMinutes()) >= 2 &&
          Math.floor(duration.asMinutes()) <= 4
        ? "e"
        : "i"
    }`;
  } else if (duration.asMinutes() < 60) {
    timeSinceString = `${Math.floor(duration.asMinutes())} minut${
      Math.floor(duration.asMinutes()) > 1 || duration.asMinutes % 10 === 0
        ? "a"
        : ""
    }`;
  } else if (duration.asHours() < 24) {
    timeSinceString = `${Math.floor(duration.asHours())} sat${
      Math.floor(duration.asHours()) % 10 > 1 &&
      Math.floor(duration.asHours()) % 10 < 4
        ? "a"
        : Math.floor(duration.asHours()) >= 5
        ? "i"
        : ""
    }`;
  } else if (duration.asDays() >= 1) {
    timeSinceString = `${Math.floor(duration.asDays())} dan${
      Math.floor(duration.asDays()) > 1 ? "a" : ""
    }`;
  } else if (duration.asWeeks() >= 1) {
    timeSinceString = `${Math.floor(duration.asWeeks())} nedjelj${
      Math.floor(duration.asWeeks()) === 1 ? "a" : "e"
    }`;
  }

  return timeSinceString;
};

export const formatDuration = (days) => {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    return `${years} godin${
      years === 1 ? "a" : years === (2 || 3 || 4) ? "e" : "a"
    } i ${remainingDays} dan${remainingDays === 1 ? "" : "a"}`;
  } else if (days >= 30) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    return `${months} mjesec${
      months === 1 ? "" : months === (2 || 3 || 4) ? "a" : "i"
    } i ${remainingDays} dan${remainingDays === 1 ? "" : "a"}`;
  } else if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    return `${weeks} nedjelj${weeks === 1 ? "a" : "e"} i ${remainingDays} dan${
      remainingDays === 1 ? "" : "a"
    }`;
  } else {
    return `${days} dan${days === 1 ? "" : "a"}`;
  }
};

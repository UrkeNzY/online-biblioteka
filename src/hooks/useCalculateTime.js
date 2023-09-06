import { useState, useEffect } from "react";
import moment from "moment";

const useCalculateTime = (actionDate) => {
  const [timeSinceString, setTimeSinceString] = useState("");

  useEffect(() => {
    const currentDate = moment();
    const duration = moment.duration(currentDate.diff(actionDate));

    let formattedTimeSince = "";

    if (duration.asSeconds() < 60) {
      const seconds = Math.floor(duration.asSeconds());
      let pluralSuffix;

      if (seconds === 1) {
        pluralSuffix = "sekunda";
      } else if (seconds >= 2 && seconds <= 4) {
        pluralSuffix = "sekunde";
      } else {
        pluralSuffix = "sekundi";
      }

      timeSinceString = `${seconds} ${pluralSuffix}`;
    } else if (duration.asMinutes() < 60) {
      timeSinceString = `${Math.floor(duration.asMinutes())} minut${
        Math.floor(duration.asMinutes()) % 10 > 1 ? "a" : ""
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
        Math.floor(duration.asDays()) % 10 > 1 ||
        Math.floor(duration.asDays()) % 10 === 0
          ? "a"
          : ""
      }`;
    } else if (duration.asWeeks() >= 1) {
      timeSinceString = `${Math.floor(duration.asWeeks())} nedjelj${
        Math.floor(duration.asWeeks()) % 10 === 1 ? "a" : "e"
      }`;
    }

    setTimeSinceString(formattedTimeSince);
  }, [actionDate]);

  return timeSinceString;
};

export default useCalculateTime;

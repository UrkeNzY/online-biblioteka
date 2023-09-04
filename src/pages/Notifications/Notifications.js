import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllReservations, allIssuances } from "../../services/books";
import moment from "moment";

import classes from "../../styles/Notifications.module.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const Notifications = () => {
  const [activityInfo, setActivityInfo] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [amountToShow, setAmountToShow] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [reservationResponse, issuanceResponse] = await Promise.all([
          getAllReservations(),
          allIssuances(),
        ]);

        const reservationData = reservationResponse.data.active;
        const issuanceData = issuanceResponse.data.izdate;

        const currentDate = moment();

        let activeReservations = 0;
        let offLimitReservations = 0;

        const activities = [];

        // Process reservations
        reservationData.forEach((reservation) => {
          const userInfo = reservation.student;
          const bookInfo = reservation.knjiga;
          const actionDate = moment(reservation.action_date).add(2, "hours");

          const duration = moment.duration(currentDate.diff(actionDate));

          let timeSinceString = "";

          if (duration.asSeconds() < 60) {
            const seconds = Math.floor(duration.asSeconds());
            let pluralSuffix;

            if (seconds === 1) {
              pluralSuffix = "sekunda";
            } else if (seconds % 10 >= 2 && seconds % 10 <= 4) {
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
              Math.floor(duration.asDays()) % 10 > 1 ? "a" : ""
            }`;
          } else if (duration.asWeeks() >= 1) {
            timeSinceString = `${Math.floor(duration.asWeeks())} nedjelj${
              Math.floor(duration.asWeeks()) % 10 === 1 ? "a" : "e"
            }`;
          }

          const reservationActivity = {
            userId: userInfo.id,
            subject: userInfo.name + " " + userInfo.surname,
            userAvatar: userInfo.photoPath,
            bookId: bookInfo.id,
            book: bookInfo.title,
            action: "je rezervisao/la knjigu",
            header: "REZERVISANJE KNJIGE",
            date: moment(reservation.action_date).format("DD.MM.YYYY"),
            timeSince: timeSinceString,
            action_date: reservation.action_date, // Add action_date for sorting
          };
          activities.push(reservationActivity);

          activeReservations++;

          if (Math.floor(duration.asDays()) > 20) {
            offLimitReservations++;
          }
        });

        // Process issuances
        issuanceData.forEach((issuance) => {
          const userInfo = issuance.student;
          const bookInfo = issuance.knjiga;
          const librarianInfo = issuance.bibliotekar0;
          const actionDate = moment(issuance.action_date).add(2, "hours");

          const duration = moment.duration(currentDate.diff(actionDate));

          let timeSinceString = "";

          if (duration.asSeconds() < 60) {
            timeSinceString = `${Math.floor(duration.asSeconds())} sekund${
              Math.floor(duration.asMinutes()) > 1 ? "e" : ""
            }`;
          } else if (duration.asMinutes() < 60) {
            timeSinceString = `${Math.floor(duration.asMinutes())} minut${
              Math.floor(duration.asMinutes()) > 1 ||
              duration.asMinutes % 10 === 0
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

          const issualActivity = {
            userId: userInfo.id,
            object: userInfo.name + " " + userInfo.surname,
            userAvatar: librarianInfo.photoPath,
            bookId: bookInfo.id,
            book: bookInfo.title,
            action: "je izdao/la knjigu",
            header: "IZDAVANJE KNJIGE",
            date: moment(issuance.action_date).format("DD.MM.YYYY"),
            timeSince: timeSinceString,
            subject: librarianInfo.name + " " + librarianInfo.surname,
            action_date: issuance.action_date, // Add action_date for sorting
          };
          activities.push(issualActivity);
        });
        // Sort the combined activities by date in descending order
        activities.sort(
          (a, b) => new Date(b.action_date) - new Date(a.action_date)
        );

        const activeReservationsInfo = reservationData.map((reservation) => {
          const userInfo = reservation.student;
          const bookInfo = reservation.knjiga;
          return {
            userId: userInfo.id,
            userName: userInfo.name + " " + userInfo.surname,
            userProfilePic: userInfo.photoPath,
            bookId: bookInfo.id,
            bookName: bookInfo.title,
            actionDate: reservation.action_date,
          };
        });

        setActivityInfo(activities);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const changeNotificationAmount = () => {
    if (amountToShow < activityInfo.length) {
      setAmountToShow((prevState) => prevState + 5);
    } else {
      setAmountToShow(7);
    }
  };

  return (
    <div className={classes.notificationsContainer}>
      {activityInfo.slice(0, amountToShow).map((activity) => {
        return (
          <div className={classes.activityContainer} key={activity.action_date}>
            <img src={activity.userAvatar} alt="user avatar" />
            <div>
              <p className={classes.activityHeader}>
                {activity.header} -{" "}
                <span className={classes.activityDate}>
                  prije {activity.timeSince}
                </span>
              </p>
              <p className={classes.activityBody}>
                <span>
                  <Link to="/">{activity.subject} </Link>
                </span>
                {activity.action}{" "}
                <span style={{ fontWeight: "500" }}>{activity.book}</span> {""}
                <span>
                  {activity.object ? "učeniku " : ""}
                  <Link to="/">{activity?.object}</Link>
                </span>{" "}
                dana <span style={{ fontWeight: "500" }}>{activity.date}</span>.
              </p>
            </div>
            <Link to="/" className={classes.activityFooterLink}>
              pogledaj detaljnije &gt;&gt;
            </Link>
          </div>
        );
      })}

      {!isLoading && (
        <button
          className={classes.activityButton}
          onClick={changeNotificationAmount}
        >
          {amountToShow < activityInfo.length ? "Prikaži još" : "Prikaži manje"}
        </button>
      )}

      {isLoading && (
        <LoadingSpinner loadingSpinner="/images/icons/data-loading-spinner.gif" />
      )}
    </div>
  );
};

export default Notifications;

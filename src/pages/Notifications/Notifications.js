import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllReservations, allIssuances } from "../../services/books";
import moment from "moment";
import { formatTime } from "../../utils/FormatTime";

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

        const activities = [];

        reservationData.forEach((reservation) => {
          const userInfo = reservation.student;
          const bookInfo = reservation.knjiga;
          const actionDate = moment(reservation.action_date).add(2, "hours");

          let timeSinceString = formatTime(actionDate);

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
            action_date: reservation.action_date,
          };
          activities.push(reservationActivity);
        });

        issuanceData.forEach((issuance) => {
          const userInfo = issuance.student;
          const bookInfo = issuance.knjiga;
          const librarianInfo = issuance.bibliotekar0;
          const actionDate = moment(issuance.action_date).add(2, "hours");

          let timeSinceString = formatTime(actionDate);

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
            action_date: issuance.action_date,
          };
          activities.push(issualActivity);
        });

        activities.sort(
          (a, b) => new Date(b.action_date) - new Date(a.action_date)
        );

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

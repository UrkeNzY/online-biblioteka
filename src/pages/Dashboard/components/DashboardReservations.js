import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCheck,
  faXmark,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { getAllReservations } from "../../../services/books";

import classes from "../../../styles/Dashboard.module.css";

const DashboardReservations = ({ setActiveReservationsAmount }) => {
  const [activeReservations, setActiveReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationData = await getAllReservations();

        const activeReservations = reservationData.data.active;

        const activeReservationsInfo = activeReservations.map((reservation) => {
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

        setActiveReservations(activeReservationsInfo);

        const activeReservationAmount = activeReservationsInfo.length;
        setActiveReservationsAmount(activeReservationAmount);

        // Now you have the extracted reservation information
        console.log("Active Reservations:", activeReservationsInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setActiveReservationsAmount]);

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const year = dateObject.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  return (
    <div className={classes.reservationsSection}>
      <div className={classes.sectionHeader}>
        <p>REZERVACIJE KNJIGA</p>
      </div>
      {activeReservations?.map((reservation) => {
        return (
          <div className={classes.reservationsContainer}>
            <div className={classes.sectionContent}>
              <div className={classes.sectionUserInfo}>
                <img src={reservation.userProfilePic} alt="user avatar" />
                <Link to={`/profile/${reservation.userId}`}>
                  {reservation.userName}
                </Link>
              </div>
              <Link to={`/book/${reservation.bookId}/main-details`}>
                {reservation.bookName}
              </Link>
              <p className={classes.reservationDate}>
                {formatDate(reservation.actionDate)}
              </p>
              <div className={classes.sectionActions}>
                <FontAwesomeIcon
                  className={classes.actionButton}
                  icon={faCheck}
                />
                <FontAwesomeIcon
                  className={classes.actionButton}
                  icon={faXmark}
                />
              </div>
            </div>
            <hr />
          </div>
        );
      })}

      <div className={classes.sectionFooter}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <p>Prikaži sve</p>
      </div>
    </div>
  );
};

export default DashboardReservations;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllReservations, allIssuances } from "../../../services/books";
import format from "date-fns/format";
import moment from "moment/moment";

import classes from "../../../styles/Dashboard.module.css";

const DashboardActivities = () => {
  const [activityInfo, setActivityInfo] = useState([]);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const reservationData = await getAllReservations();
        const issuanceData = await allIssuances();

        const activeReservations = reservationData.data.active;
        const activeIssuals = issuanceData.data.izdate;

        const currentDate = moment();

        const activities = [];

        // Combine both reservations and issuances into a single array
        activeReservations.forEach((reservation) => {
          const userInfo = reservation.student;
          const bookInfo = reservation.knjiga;
          const actionDate = moment(reservation.action_date).subtract(
            -2,
            "hours"
          );

          const duration = moment.duration(currentDate.diff(actionDate));

          let timeSinceString = "";

          if (duration.asSeconds() < 60) {
            timeSinceString = `${Math.floor(duration.asSeconds())} sekund${
              Math.floor(duration.asMinutes()) > 1 ? "e" : "e"
            }`;
          } else if (duration.asMinutes() < 60) {
            // Less than 1 hour
            timeSinceString = `${Math.floor(duration.asMinutes())} minut${
              Math.floor(duration.asMinutes()) > 1 ? "a" : ""
            }`;
          } else if (duration.asHours() < 24) {
            // Less than 1 day
            timeSinceString = `${Math.floor(duration.asHours())} sat${
              Math.floor(duration.asHours()) > 1 ? "i" : ""
            }`;
          } else if (duration.asDays() >= 1) {
            // 1 day or more
            timeSinceString = `${Math.floor(duration.asDays())} dan${
              Math.floor(duration.asDays()) > 1 ? "a" : ""
            }`;
          } else if (duration.asWeeks() >= 1) {
            // 1 week or more
            timeSinceString = `${Math.floor(duration.asWeeks())} nedjelj${
              Math.floor(duration.asWeeks()) === 1 ? "a" : "e"
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
            date: format(new Date(reservation.action_date), "dd.MM.yyyy"),
            timeSince: timeSinceString,
            action_date: reservation.action_date, // Add action_date for sorting
          };
          activities.push(reservationActivity);
        });

        activeIssuals.forEach((issual) => {
          const userInfo = issual.student;
          const bookInfo = issual.knjiga;
          const librarianInfo = issual.bibliotekar0;

          const actionDate = moment(issual.action_date).subtract(-2, "hours");

          const duration = moment.duration(currentDate.diff(actionDate));

          let timeSinceString = "";

          if (duration.asSeconds() < 60) {
            timeSinceString = `${Math.floor(duration.asSeconds())} sekund${
              Math.floor(duration.asMinutes()) > 1 ? "e" : "e"
            }`;
          } else if (duration.asMinutes() < 60) {
            // Less than 1 hour
            timeSinceString = `${Math.floor(duration.asMinutes())} minut${
              Math.floor(duration.asMinutes()) > 1 ? "a" : ""
            }`;
          } else if (duration.asHours() < 24) {
            // Less than 1 day
            timeSinceString = `${Math.floor(duration.asHours())} sat${
              Math.floor(duration.asHours()) > 1 ? "i" : ""
            }`;
          } else if (duration.asDays() >= 1) {
            // 1 day or more
            timeSinceString = `${Math.floor(duration.asDays())} dan${
              Math.floor(duration.asDays()) > 1 ? "a" : ""
            }`;
          } else if (duration.asWeeks() >= 1) {
            // 1 week or more
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
            date: format(new Date(issual.action_date), "dd.MM.yyyy"),
            timeSince: timeSinceString,
            subject: librarianInfo.name + " " + librarianInfo.surname,
            action_date: issual.action_date, // Add action_date for sorting
          };
          activities.push(issualActivity);
        });

        // Sort the combined activities by date in descending order
        activities.sort(
          (a, b) => new Date(b.action_date) - new Date(a.action_date)
        );

        setActivityInfo(activities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <div className={classes.activitiesSection}>
        <div className={classes.sectionHeader}>
          <p>AKTIVNOSTI</p>
        </div>
      </div>
      {activityInfo.slice(0, 7).map((activity) => {
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
      <button className={classes.activityButton}>Prikaži</button>
    </div>
  );
};

export default DashboardActivities;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllReservations, allIssuances } from "../../../services/books";
import format from "date-fns/format";
import {
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMinutes,
} from "date-fns";

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

        const currentDate = new Date();

        const activities = [];

        activeReservations.forEach((reservation) => {
          const userInfo = reservation.student;
          const bookInfo = reservation.knjiga;
          const actionDate = new Date(reservation.action_date);

          const minutesSince = differenceInMinutes(currentDate, actionDate);
          const hoursSince = differenceInHours(currentDate, actionDate);
          const daysSince = differenceInDays(currentDate, actionDate);
          const weeksSince = differenceInWeeks(currentDate, actionDate);

          let timeSinceString = "";
          if (minutesSince >= 1) {
            timeSinceString = `${minutesSince} minut${
              minutesSince > 1 ? "a" : ""
            }`;
          } else if (hoursSince >= 1) {
            timeSinceString = `${hoursSince} sat${hoursSince > 1 ? "i" : ""}`;
          } else if (daysSince >= 1) {
            timeSinceString = `${daysSince} dan${daysSince > 1 ? "a" : ""}`;
          } else if (weeksSince >= 1) {
            timeSinceString = `${weeksSince} nedjelj${
              weeksSince === 1 ? "a" : "e"
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
          };
          activities.push(reservationActivity);
        });

        activeIssuals.forEach((issual) => {
          const userInfo = issual.student;
          const bookInfo = issual.knjiga;
          const librarianInfo = issual.bibliotekar0;

          const actionDate = new Date(issual.action_date);

          const minutesSince = differenceInMinutes(currentDate, actionDate);
          const hoursSince = differenceInHours(currentDate, actionDate);
          const daysSince = differenceInDays(currentDate, actionDate);
          const weeksSince = differenceInWeeks(currentDate, actionDate);

          let timeSinceString = "";
          if (minutesSince >= 1) {
            timeSinceString = `${minutesSince} minut${
              minutesSince > 1 ? "a" : ""
            }`;
          } else if (hoursSince >= 1) {
            timeSinceString = `${hoursSince} sat${hoursSince > 1 ? "i" : ""}`;
          } else if (daysSince >= 1) {
            timeSinceString = `${daysSince} dan${daysSince > 1 ? "a" : ""}`;
          } else if (weeksSince >= 1) {
            timeSinceString = `${weeksSince} nedjelj${
              weeksSince === 1 ? "a" : "e"
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
          };
          activities.push(issualActivity);
        });

        activities.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
      {activityInfo.map((activity) => {
        return (
          <div className={classes.activityContainer}>
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
      <button className={classes.activityButton}>Show</button>
    </div>
  );
};

export default DashboardActivities;

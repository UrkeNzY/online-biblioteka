import { useState, useEffect } from "react";
import { allIssuances, getAllReservations } from "../../services/books";
import moment from "moment";

import classes from "../../styles/Dashboard.module.css";

import DashboardActivities from "./components/DashboardActivities";
import DashboardReservations from "./components/DashboardReservations";
import DashboardStats from "./components/DashboardStats";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
  const [activeReservationsAmount, setActiveReservationsAmount] = useState(0);
  const [activeIssuancesAmount, setActiveIssuancesAmount] = useState(0);
  const [offLimitReservationsAmount, setOffLimitReservationsAmount] =
    useState(0);
  const [activityInfo, setActivityInfo] = useState([]);
  const [activeReservations, setActiveReservations] = useState([]);
  const [isLoading, setIsLoading] = useState();

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
            timeSinceString = `${Math.floor(duration.asSeconds())} sekund${
              Math.floor(duration.asMinutes()) > 1 ? "e" : ""
            }`;
          } else if (duration.asMinutes() < 60) {
            timeSinceString = `${Math.floor(duration.asMinutes())} minut${
              Math.floor(duration.asMinutes()) > 1 ? "a" : ""
            }`;
          } else if (duration.asHours() < 24) {
            timeSinceString = `${Math.floor(duration.asHours())} sat${
              Math.floor(duration.asHours()) > 1 ? "i" : ""
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
          if (duration.asDays() > 20) {
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
              Math.floor(duration.asMinutes()) > 1 ? "a" : ""
            }`;
          } else if (duration.asHours() < 24) {
            timeSinceString = `${Math.floor(duration.asHours())} sat${
              Math.floor(duration.asHours()) > 1 ? "i" : ""
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

        setActiveReservations(activeReservationsInfo);

        setActivityInfo(activities);
        setActiveReservationsAmount(activeReservations);
        setOffLimitReservationsAmount(offLimitReservations);
        setActiveIssuancesAmount(issuanceData.length);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.dashboardContainer}>
      <DashboardActivities activityInfo={activityInfo} />
      <div className={classes.rightSection}>
        <DashboardReservations activeReservations={activeReservations} />
        <DashboardStats
          activeReservationsAmount={activeReservationsAmount}
          activeIssuancesAmount={activeIssuancesAmount}
          offLimitReservationsAmount={offLimitReservationsAmount}
        />
      </div>
      {isLoading && (
        <LoadingSpinner loadingSpinner="/images/icons/dashboard-loading-spinner.gif" />
      )}
    </div>
  );
};

export default Dashboard;

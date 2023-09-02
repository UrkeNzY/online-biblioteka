import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getBook,
  getAllReservations,
  allIssuances,
} from "../../../services/books";
import moment from "moment";

import classes from "../../../styles/BookDetails.module.css";

const BookSideInfo = () => {
  const [bookAmountData, setBookAmountData] = useState({});
  const [activityInfo, setActivityInfo] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  const { id } = useParams();

  const BOOK_AMOUNT_DATA = [
    {
      title: "Na raspolaganju:",
      data: bookAmountData.available,
      color: "#a7f3d0",
    },
    { title: "Rezervisano:", data: bookAmountData.reserved, color: "#fde68a" },
    { title: "Izdato:", data: bookAmountData.issued, color: "#bfdbfe" },
    { title: "U prekoračenju:", data: bookAmountData.late, color: "#fecaca" },
    {
      title: "Ukupna količina: ",
      data: bookAmountData.total,
      color: "#E5E4E2",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookAmount = await getBook(id);

        const formattedData = {
          available:
            bookAmount.data.samples -
            (Math.abs(bookAmount.data.bSamples) + bookAmount.data.rSamples),
          issued: Math.abs(bookAmount.data.bSamples),
          late: bookAmount.data.fSamples,
          reserved: bookAmount.data.rSamples,
          total: bookAmount.data.samples,
        };
        setBookAmountData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
            bookId: bookInfo.id,
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
            bookId: bookInfo.id,
            action: "je izdao/la knjigu učeniku",
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

        setActivityInfo(activities);
        console.log(activities.map((activity) => activity.bookId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredActivities(
      activityInfo.filter((activity) => activity.bookId == id).slice(0, 3)
    );
  }, [id, activityInfo]);

  return (
    <div className={classes.sideInfoContainer}>
      {BOOK_AMOUNT_DATA.map((bookInfo) => {
        return (
          <div className={classes.sideInfoBookData}>
            <p>{bookInfo.title}</p>
            <p
              className={classes.bookAmount}
              style={{ backgroundColor: `${bookInfo.color}` }}
            >
              {bookInfo.data} {bookInfo.data % 10 === 1 ? "komad" : "komada"}
            </p>
          </div>
        );
      })}
      <hr />
      {filteredActivities?.map((news) => {
        return (
          <div className={classes.sideInfoNews}>
            <p className={classes.newsHeader}>
              {news.header} -{" "}
              <span className={classes.newsDate}>{news.timeSince}</span>
            </p>
            <p className={classes.newsBody}>
              <span>
                <Link to="/">{news.subject} </Link>
              </span>
              {news.action} {""}
              <span>
                <Link to="/">{news.object}</Link>
              </span>{" "}
              dana <span style={{ fontWeight: "500" }}>{news.date}</span>.
            </p>
            <Link to="/">pogledaj detaljnije &gt;&gt;</Link>
          </div>
        );
      })}
      {filteredActivities.length === 0 && (
        <div className={classes.noNewsMessage}>
          <p>Nema aktivnosti za ovu knjigu.</p>
        </div>
      )}
    </div>
  );
};

export default BookSideInfo;

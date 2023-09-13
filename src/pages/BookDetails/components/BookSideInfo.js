import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { formatTime } from "../../../utils/FormatTime";
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
  const [isLoading, setIsLoading] = useState();

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
        setIsLoading(true);
        const [bookIdResponse, reservationResponse, issuanceResponse] =
          await Promise.all([
            getBook(id),
            getAllReservations(),
            allIssuances(),
          ]);

        const formattedData = {
          available:
            bookIdResponse.data.samples -
            (Math.abs(bookIdResponse.data.bSamples) +
              bookIdResponse.data.rSamples),
          issued: Math.abs(bookIdResponse.data.bSamples),
          late: bookIdResponse.data.fSamples,
          reserved: bookIdResponse.data.rSamples,
          total: bookIdResponse.data.samples,
        };

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
            bookId: bookInfo.id,
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
            bookId: bookInfo.id,
            action: "je izdao/la knjigu učeniku",
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

        setBookAmountData(formattedData);
        setActivityInfo(activities);
        setIsLoading(false);
        console.log(activities.map((activity) => activity.bookId));
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setFilteredActivities(
      activityInfo.filter((activity) => activity.bookId === +id).slice(0, 3)
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
              {isLoading ? (
                <img
                  src="/images/icons/data-loading-spinner.gif"
                  alt="loading spinner"
                  width="15"
                />
              ) : (
                bookInfo.data
              )}{" "}
              {bookInfo.data % 10 === 1 ? "komad" : "komada"}
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
      {filteredActivities.length === 0 && !isLoading && (
        <div className={classes.noNewsMessage}>
          <p>Nema aktivnosti za ovu knjigu.</p>
        </div>
      )}
      {isLoading && (
        <div className={classes.dataLoadingSpinner}>
          <img
            src="/images/icons/data-loading-spinner.gif"
            alt="loading spinner"
            width="70"
          />
        </div>
      )}
    </div>
  );
};

export default BookSideInfo;

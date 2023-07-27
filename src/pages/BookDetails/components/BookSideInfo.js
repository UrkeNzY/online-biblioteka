import { Link } from "react-router-dom";
import classes from "../../../styles/BookDetails.module.css";

const DUMMY_DATA = [
  { title: "Na raspolaganju:", data: "5 primjeraka", color: "#a7f3d0" },
  { title: "Rezervisano:", data: "2 primjerka", color: "#fde68a" },
  { title: "Izdato:", data: "102 primjerka", color: "#bfdbfe" },
  { title: "U prekoracenju:", data: "2 primjerka", color: "#fecaca" },
  { title: "Ukupna kolicina: ", data: "15 primjeraka", color: "#E5E4E2" },
];

const DUMMY_NEWS_DATA = [
  {
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
];

const BookSideInfo = () => {
  return (
    <div className={classes.sideInfoContainer}>
      {DUMMY_DATA.map((bookInfo) => {
        return (
          <div className={classes.sideInfoBookData}>
            <p>{bookInfo.title}</p>
            <p
              className={classes.bookAmount}
              style={{ backgroundColor: `${bookInfo.color}` }}
            >
              {bookInfo.data}
            </p>
          </div>
        );
      })}
      <hr />
      {DUMMY_NEWS_DATA.map((news) => {
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
    </div>
  );
};

export default BookSideInfo;

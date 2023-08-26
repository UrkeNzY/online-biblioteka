import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../../../services/books";

import classes from "../../../styles/BookDetails.module.css";

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
  const [bookAmountData, setBookAmountData] = useState({});

  const { id } = useParams();

  const BOOK_AMOUNT_DATA = [
    {
      title: "Na raspolaganju:",
      data: bookAmountData.available,
      color: "#a7f3d0",
    },
    { title: "Rezervisano:", data: bookAmountData.reserved, color: "#fde68a" },
    { title: "Izdato:", data: bookAmountData.issued, color: "#bfdbfe" },
    { title: "U prekoracenju:", data: bookAmountData.late, color: "#fecaca" },
    {
      title: "Ukupna kolicina: ",
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

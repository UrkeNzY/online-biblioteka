import { useState, Fragment, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBook, deleteBook } from "../../services/books";
import { useCreateBookContext } from "../../state/CreateBookContext";

import { useNavigate } from "react-router-dom";

import {
  faArrowTurnUp,
  faHandScissors,
  faRotateRight,
  faCalendarCheck,
  faTriangleExclamation,
  faFileEdit,
} from "@fortawesome/free-solid-svg-icons";

import classes from "../../styles/BookDetails.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import BookSideInfo from "./components/BookSideInfo";

const BookDetails = (props) => {
  let buttonRef;

  const [bookHeaderData, setBookHeaderData] = useState({});

  const { bookEditHandler, bookFound, setBookFound } = useCreateBookContext();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headerBookData = await getBook(id);

        if (headerBookData.data) {
          setBookHeaderData({
            name: headerBookData.data.title,
            cover: headerBookData.data.photo,
          });
        } else {
          setBookFound(false);
        }
      } catch (error) {
        setBookFound(false);
        console.log("Error fetching book data:", error);
      }
    };
    fetchData();
  }, [id, setBookFound]);

  const editBookHandler = async () => {
    await bookEditHandler(id);
    navigate("/new-book/general/edit");
  };

  const deleteBookHandler = async () => {
    try {
      await deleteBook(id);
      navigate("/");
      console.log("delete success");
    } catch (error) {
      console.log("Error deleting book:", error.message);
    }
  };

  const bookActions = [
    {
      name: "Izbrisi knjigu",
      image: "/images/icons/trash-icon.svg",
      onClick: deleteBookHandler,
    },
  ];

  const toggleBookActionsHandler = (event) => {
    props.getItems(bookActions);
    setButtonRefHandler(event);
  };

  const setButtonRefHandler = (event) => {
    buttonRef = event.target;
    props.getButtonRef(buttonRef);
  };

  return (
    <Fragment>
      <div className={classes.formBackground}>
        {bookFound ? (
          <div className={classes.detailsHeader}>
            <img
              src={bookHeaderData.cover}
              onError={(e) => {
                e.target.src = "/images/placeholders/book-cover.jpg";
              }}
              alt="Book cover"
              width="45"
            />
            <h1>{bookHeaderData.name}</h1>
          </div>
        ) : (
          <div className={classes.detailsHeader}>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              size="3x"
              transform="down-1.9"
            />
            <h1>Not Found</h1>
          </div>
        )}
        {bookFound ? (
          <div className={classes.detailsHeaderActions}>
            <div className={classes.headerButton}>
              <FontAwesomeIcon icon={faArrowTurnUp} />
              <p>Otpisi knjigu</p>
            </div>
            <div className={classes.headerButton}>
              <FontAwesomeIcon icon={faHandScissors} />
              <p>Izdaj knjigu</p>
            </div>
            <div className={classes.headerButton}>
              <FontAwesomeIcon icon={faRotateRight} />
              <p>Vrati knjigu</p>
            </div>
            <div className={classes.headerButton}>
              <FontAwesomeIcon icon={faCalendarCheck} />
              <p>Rezervisi knjigu</p>
            </div>
            <div className={classes.headerButton} onClick={editBookHandler}>
              <FontAwesomeIcon icon={faFileEdit} />
              <p>Izmijeni knjigu</p>
            </div>
            <div
              className={classes.headerButton}
              onClick={toggleBookActionsHandler}
            >
              <img
                src="/images/buttons/dashboard-actions.svg"
                alt="More options icon"
                width="35"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <TabSection
          tabItems={[
            { text: "Osnovni detalji", path: `/book/${id}/main-details` },
            { text: "Specifikacija", path: `/book/${id}/specifications` },
            { text: "Evidencija iznajmljivanja", path: `/book/${id}/issuing` },
            { text: "Multimedija", path: `/book/${id}/multimedia` },
          ]}
        />
        {bookFound ? (
          <div className={classes.detailsSection}>
            <div className={classes.bookDetails}>
              <Outlet />
            </div>
            <BookSideInfo />
          </div>
        ) : (
          <div className={classes.bookErrorContainer}>
            <img src="/images/icons/triangle-error-icon.svg" alt="error icon" />
            <p>Could not find the book you're looking for.</p>
            <Link to="/">Go back &#8594;</Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BookDetails;

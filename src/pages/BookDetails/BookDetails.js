import { useState, Fragment, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBook, editBook, deleteBook } from "../../services/books";

import { useNavigate } from "react-router-dom";

import {
  faArrowTurnUp,
  faHandScissors,
  faRotateRight,
  faCalendarCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import classes from "../../styles/BookDetails.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import BookSideInfo from "./components/BookSideInfo";

const BookDetails = (props) => {
  let buttonRef;

  const [bookHeaderData, setBookHeaderData] = useState({});
  const [editData, setEditData] = useState({});
  const [bookFound, setBookFound] = useState(true);

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
          setBookFound(false); // Book not found, set the state to false
        }
      } catch (error) {
        setBookFound(false); // Error occurred, set the state to false
        console.log("Error fetching book data:", error);
      }
    };
    fetchData();
  }, [id]);

  const bookEditHandler = async () => {
    const editBookData = await editBook(id);

    if (editBookData.data) {
      setEditData({
        title: editBookData.data.title,
        photo: editBookData.data.photo,
        authors: editBookData.data.authors,
        categories: editBookData.data.categories,
        genres: id,
      });
    } else {
      setBookFound(false);
    }
    console.log(editData);
    try {
    } catch (error) {
      console.log(error);
    }
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
      name: "Izmijeni knjigu",
      image: "/images/icons/edit-icon.svg",
      path: "/new-book/general",
      onClick: bookEditHandler,
    },
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
            <img
              src="/images/icons/book-not-found-emoji.svg"
              alt="error emoji"
            />
            <h4>Could not find the book you're looking for.</h4>
            <Link to="/">Go back &#8594;</Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BookDetails;

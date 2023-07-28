import { useState, Fragment, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBook } from "../../services/books";

import {
  faArrowTurnUp,
  faHandScissors,
  faRotateRight,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import classes from "../../styles/BookDetails.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import BookSideInfo from "./components/BookSideInfo";

const bookActions = [
  { name: "Izmijeni knjigu", image: "/images/icons/edit-icon.svg", path: "/" },
  { name: "Izbrisi knjigu", image: "/images/icons/trash-icon.svg", path: "/" },
];

const BookDetails = (props) => {
  let buttonRef;

  const [bookHeaderData, setBookHeaderData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const headerBookData = await getBook(id);

      setBookHeaderData({
        name: headerBookData.data.title,
        cover: headerBookData.data.photo,
      });
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

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
      <TabSection
        tabItems={[
          { text: "Osnovni detalji", path: `/book/${id}/main-details` },
          { text: "Specifikacija", path: `/book/${id}/specifications` },
          { text: "Evidencija iznajmljivanja", path: `/book/${id}/issuing` },
          { text: "Multimedija", path: `/book/${id}/multimedia` },
        ]}
      />
      <div className={classes.detailsSection}>
        <div className={classes.bookDetails}>
          <Outlet />
        </div>
        <BookSideInfo />
      </div>
    </Fragment>
  );
};

export default BookDetails;

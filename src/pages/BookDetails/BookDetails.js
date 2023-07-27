import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import classes from "../../styles/BookDetails.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import BookSideInfo from "./components/BookSideInfo";

const BookDetails = () => {
  return (
    <Fragment>
      <div className={classes.detailsHeader}>
        <img
          src="/images/placeholders/book-cover.jpg"
          alt="Book coverm"
          width="45"
        />
        <h1>Tom Sojer</h1>
      </div>
      <TabSection
        tabItems={[
          { text: "Osnovni detalji", path: "/book/main-details" },
          { text: "Specifikacija", path: "/book/specifications" },
          { text: "Evidencija iznajmljivanja", path: "/book/issuing" },
          { text: "Multimedija", path: "/book/multimedia" },
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

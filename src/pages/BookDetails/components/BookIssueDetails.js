import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faBookOpen,
  faTriangleExclamation,
  faCalendarCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import classes from "../../../styles/BookDetails.module.css";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Datum rezervacije", field: "reservationDate", width: "25%" },
  { header: "Rezervacija istice", field: "reservationExpires", width: "25%" },
  { header: "Rezervaciju podnio", field: "reservationBy", width: "25%" },
  { header: "Status", field: "reservationStatus", width: "25%" },
];

const tableData = [
  {
    id: 1,
    name: "31.04.2019",
    description: "10.05.2019",
  },
  {
    id: 2,
    name: "31.04.2019",
    description: "10.05.2019",
  },
  {
    id: 3,
    name: "31.04.2019",
    description: "10.05.2019",
  },
  {
    id: 4,
    name: "31.04.2019",
    description: "10.05.2019",
  },
  {
    id: 5,
    name: "31.04.2019",
    description: "10.05.2019",
  },
  {
    id: 6,
    name: "31.04.2019",
    description: "10.05.2019",
  },
  {
    id: 7,
    name: "31.04.2019",
    description: "10.05.2019",
  },
  {
    id: 8,
    name: "31.04.2019",
    description: "10.05.2019",
  },
];

const BookIssueDetails = () => {
  return (
    <Fragment>
      <div className={classes.issueActionsHeader}>
        <div className={classes.actionButton}>
          <FontAwesomeIcon icon={faBookOpenReader} />
          <Link to="/">Izdate knjige</Link>
        </div>
        <div className={classes.actionButton}>
          <FontAwesomeIcon icon={faBookOpen} />
          <Link to="/">Vracene knjige</Link>
        </div>
        <div className={classes.actionButton}>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <Link to="/">Knjige u prekoračenju</Link>
        </div>
        <div className={classes.actionButton}>
          <FontAwesomeIcon icon={faCalendarCheck} />
          <Link to="/">Aktivne rezervacije</Link>
        </div>
        <div className={classes.actionButton}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <Link to="/">Arhivirane rezervacije</Link>
        </div>
      </div>
      <Table tableColumns={tableColumns} tableData={tableData} />
    </Fragment>
  );
};

export default BookIssueDetails;

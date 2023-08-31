import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { allIssuances, getAllReservations } from "../../../services/books";
import {
  faBookOpenReader,
  faBookOpen,
  faTriangleExclamation,
  faCalendarCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import differenceInDays from "date-fns/differenceInDays";

import classes from "../../../styles/BookDetails.module.css";

import BookTable from "../../../components/UI/Tables/BookTable";

const BookIssueDetails = () => {
  const [issuances, setIssuances] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [issueType, setIssueType] = useState("izdate");
  const [fetchType, setFetchType] = useState("issue");

  const izdateTableColumns = [
    { header: "Izdato uceniku", field: "issuedTo", width: "25%" },
    { header: "Datum izdavanja", field: "issueDate", width: "25%" },
    {
      header: "Trenutno zadrzavanje knjige",
      field: "issueDuration",
      width: "30%",
    },
    { header: "Knjigu izdao", field: "issuedBy", width: "25%" },
  ];

  const vraceneTableColumns = [
    { header: "Izdato uceniku", field: "issuedTo", width: "20%" },
    { header: "Datum izdavanja", field: "issueDate", width: "20%" },
    { header: "Datum vracanja", field: "returnDate", width: "20%" },
    {
      header: "Zadrzavanje knjige",
      field: "issueDuration",
      width: "20%",
    },
    { header: "Knjigu primio", field: "issuedBy", width: "20%" },
  ];

  const prekoraceneTableColumns = [
    { header: "Izdato uceniku", field: "issuedTo", width: "25%" },
    { header: "Datum izdavanja", field: "issueDate", width: "25%" },
    {
      header: "Trenutno zadrzavanje knjige",
      field: "issueDuration",
      width: "25%",
    },
    { header: "Prekoracenje u danima", field: "offLimit", width: "25%" },
  ];

  const rezervacijeTableColumns = [
    { header: "Datum rezervacije", field: "reservationDate", width: "25%" },
    { header: "Rezervacija istice", field: "reservationExpires", width: "25%" },
    {
      header: "Rezervaciju podnio",
      field: "reservationBy",
      width: "25%",
    },
    { header: "Status", field: "reservationStatus", width: "25%" },
  ];

  const [tableColumns, setTableColumns] = useState(izdateTableColumns);

  const { id } = useParams();

  const formatDuration = (days) => {
    if (days >= 365) {
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      return `${years} godin${
        years === 1 ? "a" : years === (2 || 3 || 4) ? "e" : "a"
      } i ${remainingDays} dan${remainingDays === 1 ? "" : "a"}`;
    } else if (days >= 30) {
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;
      return `${months} mesec${
        months === 1 ? "" : months === (2 || 3 || 4) ? "a" : "i"
      } i ${remainingDays} dan${remainingDays === 1 ? "" : "a"}`;
    } else if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      return `${weeks} nedelj${weeks === 1 ? "a" : "e"} i ${remainingDays} dan${
        remainingDays === 1 ? "" : "a"
      }`;
    } else {
      return `${days} dan${days === 1 ? "" : "a"}`;
    }
  };

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        setIsLoading(true);
        let response;

        if (fetchType === "issue") {
          response = await allIssuances({ book_id: id });
        } else if (fetchType === "reservation") {
          response = await getAllReservations({ book_id: id });
        }

        const issuanceData = response.data[issueType];

        const currentDate = new Date();

        const processedIssuances = issuanceData.map((issuance) => {
          const borrowDate = new Date(issuance.borrow_date);
          const daysBorrowed = differenceInDays(currentDate, borrowDate);

          return {
            id: issuance.id,
            name:
              fetchType === "issue" &&
              issuance.student.name + " " + issuance.student.surname,
            borrowDate: format(new Date(issuance.borrow_date), "dd.MM.yyyy"),
            returnDate:
              issueType === "vracene"
                ? format(new Date(issuance.return_date), "dd.MM.yyyy")
                : "",
            daysBorrowed:
              fetchType === "issue" && daysBorrowed >= 0
                ? formatDuration(daysBorrowed)
                : `izdaje se za ${Math.abs(daysBorrowed)} dan${
                    Math.abs(daysBorrowed) !== 1 ? "a" : ""
                  }`,
            noOffLimit:
              fetchType === "issue" && daysBorrowed < 20 && "Nema prekoracenja",
            withOffLimit:
              fetchType === "issue" &&
              daysBorrowed > 20 &&
              `${daysBorrowed - 20} dan${daysBorrowed % 10 === 1 ? "" : "a"}`,
            issueLibrarianName:
              fetchType === "issue" &&
              issuance.bibliotekar0.name + " " + issuance.bibliotekar0.surname,
            userName:
              fetchType === "reservation" &&
              issuance.student.name + " " + issuance.student.surname,
            userProfilePic: issuance.photoPath,
            reservationDate:
              fetchType === "reservation" &&
              format(new Date(issuance.borrow_date), "dd.MM.yyyy"),
            reservationDue:
              fetchType === "reservation" &&
              format(new Date(issuance.return_date), "dd.MM.yyyy"),
            status: fetchType === "reservation" ? issuance.status : null,
            type: issueType,
          };
        });

        setIssuances(processedIssuances);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchIssueDetails();
  }, [id, issueType, fetchType]);

  const changeIssueTypeHandler = (type, fetchType) => {
    setIssueType(type);
    setFetchType(fetchType);

    let selectedTableColumns;

    switch (type) {
      case "izdate":
        selectedTableColumns = izdateTableColumns;
        break;
      case "vracene":
        selectedTableColumns = vraceneTableColumns;
        break;
      case "prekoracene":
        selectedTableColumns = prekoraceneTableColumns;
        break;
      case "active":
        selectedTableColumns = rezervacijeTableColumns;
        break;
      case "archive":
        selectedTableColumns = rezervacijeTableColumns;
        break;
      default:
        selectedTableColumns = izdateTableColumns;
        break;
    }

    setTableColumns(selectedTableColumns);

    console.log(type);
  };

  return (
    <Fragment>
      <div className={classes.issueActionsHeader}>
        <div
          className={classes.actionButton}
          onClick={() => changeIssueTypeHandler("izdate", "issue")}
        >
          <FontAwesomeIcon icon={faBookOpenReader} />
          <p>Izdate knjige</p>
        </div>
        <div
          className={classes.actionButton}
          onClick={() => changeIssueTypeHandler("vracene", "issue")}
        >
          <FontAwesomeIcon icon={faBookOpen} />
          <p>Vracene knjige</p>
        </div>
        <div
          className={classes.actionButton}
          onClick={() => changeIssueTypeHandler("prekoracene", "issue")}
        >
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <p>Knjige u prekoracenju</p>
        </div>
        <div
          className={classes.actionButton}
          onClick={() => changeIssueTypeHandler("active", "reservation")}
        >
          <FontAwesomeIcon icon={faCalendarCheck} />
          <p>Aktivne rezervacije</p>
        </div>
        <div
          className={classes.actionButton}
          onClick={() => changeIssueTypeHandler("archive", "reservation")}
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          <p to="/">Arhivirane rezervacije</p>
        </div>
      </div>
      <BookTable
        tableColumns={tableColumns}
        tableData={issuances}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default BookIssueDetails;

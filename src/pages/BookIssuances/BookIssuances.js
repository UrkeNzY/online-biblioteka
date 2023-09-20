import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { allIssuances, getAllReservations } from "../../services/books";
import { formatDuration } from "../../utils/FormatTime";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import differenceInDays from "date-fns/differenceInDays";
import {
  faBookOpenReader,
  faBookOpen,
  faTriangleExclamation,
  faCalendarCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import classes from "../../styles/BookIssuances.module.css";

import BookTable from "../../components/UI/Tables/BookTable";
import Searchbar from "../../components/UI/Searchbar/Searchbar";

const BookIssuances = () => {
  const [issuances, setIssuances] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [issueType, setIssueType] = useState("izdate");
  const [fetchType, setFetchType] = useState("issue");
  const [filteredTableData, setFilteredTableData] = useState([]);

  const izdateTableColumns = [
    { header: "Naziv knjige", field: "bookDetails", width: "20%" },
    { header: "Izdato uceniku", field: "issuedTo", width: "17%" },
    { header: "Datum izdavanja", field: "issueDate", width: "17%" },
    {
      header: "Trenutno zadrzavanje knjige",
      field: "issueDuration",
      width: "22%",
    },
    { header: "Knjigu izdao", field: "issuedBy", width: "17%" },
  ];

  const vraceneTableColumns = [
    { header: "Naziv knjige", field: "bookDetails", width: "17%" },
    { header: "Izdato uceniku", field: "issuedTo", width: "17%" },
    { header: "Datum izdavanja", field: "issueDate", width: "15%" },
    { header: "Datum vracanja", field: "returnDate", width: "15%" },
    {
      header: "Zadrzavanje knjige",
      field: "issueDuration",
      width: "17%",
    },
    { header: "Knjigu primio", field: "issuedBy", width: "20%" },
  ];

  const prekoraceneTableColumns = [
    { header: "Naziv knjige", field: "bookDetails", width: "17%" },
    { header: "Izdato uceniku", field: "issuedTo", width: "17%" },
    { header: "Datum izdavanja", field: "issueDate", width: "17%" },
    {
      header: "Trenutno zadrzavanje knjige",
      field: "issueDuration",
      width: "22%",
    },
    { header: "Prekoracenje u danima", field: "offLimit", width: "17%" },
  ];

  const rezervacijeTableColumns = [
    { header: "Naziv knjige", field: "bookDetails", width: "20%" },
    { header: "Datum rezervacije", field: "reservationDate", width: "20%" },
    { header: "Rezervacija istice", field: "reservationExpires", width: "20%" },
    {
      header: "Rezervaciju podnio",
      field: "reservationBy",
      width: "22%",
    },
    { header: "Status", field: "reservationStatus", width: "17%" },
  ];

  const [tableColumns, setTableColumns] = useState(izdateTableColumns);

  const { id } = useParams();

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
              fetchType === "issue" && daysBorrowed > 0
                ? formatDuration(daysBorrowed)
                : "manje od 1 dan",
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
            bookName: issuance.knjiga.title,
            bookCover: issuance.knjiga.photo,
            bookId: issuance.knjiga.id,
            issuancesPage: true,
          };
        });

        setIssuances(processedIssuances);
        setFilteredTableData(processedIssuances);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchIssueDetails();
  }, [id, issueType, fetchType]);

  const updateFilteredData = (value) => {
    const filteredData = issuances.filter((data) =>
      data.name
        ? data.name?.toLowerCase().includes(value.toLowerCase())
        : data.userName?.toLowerCase().includes(value.toLowerCase()) ||
          data.bookName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTableData(filteredData);
  };

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
    <div className={classes.issuancesSection}>
      <div className={classes.issuancesSearchbar}>
        <Searchbar updateFilteredData={updateFilteredData} />
      </div>
      <div className={classes.bookIssuancesContainer}>
        <div className={classes.issueActionsHeader}>
          <div
            className={`${classes.actionButton} ${
              issueType === "izdate" ? classes.activeItem : ""
            }`}
            onClick={() => changeIssueTypeHandler("izdate", "issue")}
          >
            <FontAwesomeIcon icon={faBookOpenReader} />
            <NavLink>Izdate knjige</NavLink>
          </div>
          <div
            className={`${classes.actionButton} ${
              issueType === "vracene" ? classes.activeItem : ""
            }`}
            onClick={() => changeIssueTypeHandler("vracene", "issue")}
          >
            <FontAwesomeIcon icon={faBookOpen} />
            <NavLink>Vraćene knjige</NavLink>
          </div>
          <div
            className={`${classes.actionButton} ${
              issueType === "prekoracene" ? classes.activeItem : ""
            }`}
            onClick={() => changeIssueTypeHandler("prekoracene", "issue")}
          >
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <NavLink>Knjige u prekoračenju</NavLink>
          </div>
          <div
            className={`${classes.actionButton} ${
              issueType === "active" ? classes.activeItem : ""
            }`}
            onClick={() => changeIssueTypeHandler("active", "reservation")}
          >
            <FontAwesomeIcon icon={faCalendarCheck} />
            <NavLink>Aktivne rezervacije</NavLink>
          </div>
          <div
            className={`${classes.actionButton} ${
              issueType === "archive" ? classes.activeItem : ""
            }`}
            onClick={() => changeIssueTypeHandler("archive", "reservation")}
          >
            <FontAwesomeIcon icon={faCalendarDays} />
            <NavLink>Arhivirane rezervacije</NavLink>
          </div>
        </div>
        <div className={classes.issuancesTable}>
          <BookTable
            tableColumns={tableColumns}
            tableData={filteredTableData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BookIssuances;

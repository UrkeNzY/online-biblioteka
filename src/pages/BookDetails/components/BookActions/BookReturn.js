import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { allIssuances, returnBook } from "../../../../services/books";
import format from "date-fns/format";
import differenceInDays from "date-fns/differenceInDays"; // Import the function for calculating days difference

import classes from "../../../../styles/BookDetails.module.css";

import Table from "../../../../components/UI/Tables/Table";
import FormButtons from "../../../../components/Forms/FormButtons";

const tableColumns = [
  { header: "Izdato uceniku", field: "issuedTo", width: "20%" },
  { header: "Datum izdavanja", field: "issueDate", width: "17%" },
  {
    header: "Trenutno zadrzavanje knjige",
    field: "issueDuration",
    width: "23%",
  },
  { header: "Prekoracenje u danima", field: "issueOffLimit", width: "20%" },
  { header: "Knjigu izdao", field: "reservedBy", width: "20%" },
];

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

const BookReturn = () => {
  const [issuances, setIssuances] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const handleSelectedRowsChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchIssuances = async () => {
      try {
        setIsLoading(true);
        const response = await allIssuances({ book_id: id });
        const issuanceData = response.data.izdate;

        const currentDate = new Date(); // Get the current date and time

        const processedIssuances = issuanceData.map((issuance) => {
          const borrowDate = new Date(issuance.borrow_date); // Convert the borrowDate to a Date object

          // Calculate the days borrowed using differenceInDays function
          const daysBorrowed = differenceInDays(currentDate, borrowDate);

          return {
            id: issuance.id,
            link: `/profile/${issuance.student.id}`,
            name: issuance.student.name + " " + issuance.student.surname,
            image: issuance.student.photoPath,
            borrowDate: "26.08.2023",
            daysBorrowed:
              daysBorrowed < 0
                ? `izdaje se za ${Math.abs(daysBorrowed)} dan${
                    Math.abs(daysBorrowed) > 1 ? "a" : ""
                  }`
                : formatDuration(daysBorrowed),
            noOffLimit: daysBorrowed < 20 && "Nema prekoracenja",
            withOffLimit:
              daysBorrowed > 20 &&
              `${daysBorrowed - 20} dan${daysBorrowed % 10 === 1 ? "" : "a"}`,
            librarianName:
              issuance.bibliotekar0.name + " " + issuance.bibliotekar0.surname,
            status: issuance.status,
          };
        });

        setIssuances(processedIssuances);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchIssuances();
  }, []);

  const returnBookHandler = async () => {
    try {
      await returnBook({ toReturn: selectedRows });
    } catch (error) {
      console.log(error);
      return;
    }
    navigate(`/dashboard`);
  };

  return (
    <div className={classes.bookReturnContainer}>
      <div className={classes.bookReturnHeader}>
        <p>Vrati knjigu</p>
      </div>
      <Table
        tableData={issuances}
        tableColumns={tableColumns}
        selectedRows={selectedRows}
        onSelectedRowsChange={handleSelectedRowsChange}
        isLoading={isLoading}
      />
      <div className={classes.returnButtonsContainer}>
        <FormButtons onClick={returnBookHandler} />
      </div>
    </div>
  );
};

export default BookReturn;

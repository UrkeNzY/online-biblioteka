import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allIssuances, writeBookOff } from "../../../../services/books";
import format from "date-fns/format";
import differenceInDays from "date-fns/differenceInDays"; // Import the function for calculating days difference

import classes from "../../../../styles/BookDetails.module.css";

import Table from "../../../../components/UI/Tables/Table";
import FormButtons from "../../../../components/Forms/FormButtons";

const tableColumns = [
  { header: "Izdato učeniku", field: "issuedTo", width: "20%" },
  { header: "Datum izdavanja", field: "issueDate", width: "17%" },
  {
    header: "Trenutno zadržavanje knjige",
    field: "issueDuration",
    width: "23%",
  },
  { header: "Prekoračenje u danima", field: "issueOffLimit", width: "20%" },
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

const BookWriteOff = () => {
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
        const issuanceData = response.data.prekoracene;

        const currentDate = new Date();

        const processedIssuances = issuanceData.map((issuance) => {
          const borrowDate = new Date(issuance.borrow_date);

          const daysBorrowed = differenceInDays(currentDate, borrowDate);

          return {
            id: issuance.id,
            link: `/profile/${issuance.student.id}`,
            name: issuance.student.name + " " + issuance.student.surname,
            image: issuance.student.photoPath,
            borrowDate: format(new Date(issuance.borrow_date), "dd.MM.yyyy"),
            daysBorrowed:
              daysBorrowed < 0
                ? `izdaje se za ${Math.abs(daysBorrowed)} dan${
                    Math.abs(daysBorrowed) > 1 ? "a" : ""
                  }`
                : formatDuration(daysBorrowed),
            noOffLimit: daysBorrowed < 20 && "Nema prekoračenja",
            withOffLimit:
              daysBorrowed > 20 &&
              `${daysBorrowed - 20} dan${daysBorrowed % 10 === 1 ? "" : "a"}`,
            librarianName:
              issuance.bibliotekar0.name + " " + issuance.bibliotekar0.surname,
            status: issuance.status,
            bookId: issuance.knjiga.id,
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

  const writeOffHandler = async () => {
    try {
      await writeBookOff({ toWriteoff: selectedRows });
    } catch (error) {
      console.log(error);
      return;
    }
    navigate(`/dashboard`);
  };

  return (
    <div className={classes.bookReturnContainer}>
      <div className={classes.bookReturnHeader}>
        <p>Otpiši knjigu</p>
      </div>
      <Table
        tableData={issuances.filter((issuance) => issuance.bookId === +id)}
        tableColumns={tableColumns}
        selectedRows={selectedRows}
        onSelectedRowsChange={handleSelectedRowsChange}
        isLoading={isLoading}
      />
      <div className={classes.returnButtonsContainer}>
        <FormButtons
          onClick={writeOffHandler}
          label="Otpiši"
          disabled={selectedRows.length === 0}
        />
      </div>
    </div>
  );
};

export default BookWriteOff;

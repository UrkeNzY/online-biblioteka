import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allIssuances, returnBook } from "../../../../services/books";
import format from "date-fns/format";
import differenceInDays from "date-fns/differenceInDays";
import { formatDuration } from "../../../../utils/FormatTime";

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

const BookReturn = () => {
  const [issuances, setIssuances] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchIssuances = async () => {
      try {
        setIsLoading(true);
        const response = await allIssuances({ book_id: id });
        const issuanceData = response.data.izdate;

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
            bookId: issuance.knjiga.id,
          };
        });

        setIssuances(
          processedIssuances.filter((issuance) => issuance.bookId === +id)
        );
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchIssuances();
  }, [id]);

  const handleSelectedRowsChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

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
        <FormButtons
          onClick={returnBookHandler}
          label="Vrati"
          disabled={selectedRows.length === 0}
        />
      </div>
    </div>
  );
};

export default BookReturn;

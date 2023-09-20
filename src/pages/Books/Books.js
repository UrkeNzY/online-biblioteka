import React, { useEffect, useState, useContext, Fragment } from "react";
import { listBooks } from "../../services/books";
import { GlobalContext } from "../../state/GlobalState";

import classes from "../../styles/Searchbar.module.css";

import Table from "../../components/UI/Tables/Table";
import Button from "../../components/UI/Buttons/Button";
import Searchbar from "../../components/UI/Searchbar/Searchbar";

const tableColumns = [
  { header: "Naziv knjige", field: "bookName", width: "17%" },
  { header: "Autor", field: "author", width: "20%" },
  { header: "Kategorija", field: "bookCategory", width: "10%" },
  { header: "Na raspolaganju", field: "availableBooks", width: "10%" },
  { header: "Rezervisano", field: "reservedBooks", width: "8%" },
  { header: "Izdato", field: "issuedBooks", width: "5%" },
  { header: "U prekoračenju", field: "offLimitBooks", width: "10%" },
  { header: "Ukupna količina", field: "bookTotalAmount", width: "15%" },
];

const Books = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userRole } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const books = await listBooks();
        const formattedData = books.data.map((book) => ({
          id: book.id,
          name: book.title,
          link: `/book/${book.id}/main-details`,
          author:
            book.authors.length > 0
              ? `${book.authors[0].name} ${book.authors[0].surname}`
              : "",
          category: book.categories.length > 0 ? book.categories[0].name : "",
          available: book.samples - (Math.abs(book.bSamples) + book.rSamples),
          reserved: book.rSamples.toString(),
          issued: book.bSamples.toString(),
          offLimit: book.fSamples.toString(),
          totalAmount: book.samples,
          actionButton: "images/buttons/dashboard-actions.svg",
          image: book.photo,
          imageType: "bookCover",
        }));
        setTableData(formattedData);
        setFilteredTableData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateFilteredData = (value) => {
    const filteredData = tableData.filter(
      (data) =>
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.author.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTableData(filteredData);
  };

  return (
    <Fragment>
      <div className={classes.topActionsArea}>
        {(userRole === "Administrator" || userRole === "Bibliotekar") && (
          <Button
            text="Nova knjiga"
            to="/new-book/general"
            image="/images/icons/plus.svg"
          ></Button>
        )}
        <Searchbar updateFilteredData={updateFilteredData} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={filteredTableData}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default Books;

import React, { useEffect, useState, Fragment } from "react";
import { listBooks } from "../../services/books";

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
  { header: "U prekoracenju", field: "offLimitBooks", width: "10%" },
  { header: "Ukupna kolicina", field: "bookTotalAmount", width: "15%" },
];

const Books = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          available: book.samples - Math.abs(book.bSamples),
          reserved: book.rSamples.toString(),
          issued: book.fSamples,
          offLimit: `${Math.max(book.bSamples - book.samples, 0)}`,
          totalAmount: book.samples,
          actionButton: "images/buttons/dashboard-actions.svg",
          image: book.photo,
          imageType: "bookCover",
        }));
        setTableData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <div className={classes.topActionsArea}>
        <Button text="Nova knjiga" image="/images/icons/plus.svg" />
        <Searchbar />
      </div>
      <Table tableColumns={tableColumns} tableData={tableData} />
    </Fragment>
  );
};

export default Books;

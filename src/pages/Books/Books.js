import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Tables/Table";
import { listBooks } from "../../services/books";

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
          bookName: book.title,
          author:
            book.authors.length > 0
              ? `${book.authors[0].name} ${book.authors[0].surname}`
              : "",
          category: book.categories.length > 0 ? book.categories[0].name : "",
          available: book.samples - book.bSamples,
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

  return <Table tableColumns={tableColumns} tableData={tableData} />;
};

export default Books;

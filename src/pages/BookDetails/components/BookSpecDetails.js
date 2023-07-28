import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../../services/books";

import classes from "../../../styles/BookDetails.module.css";

const BookSpecDetails = () => {
  const [bookSpecsData, setBookSpecsData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const bookSpecs = await getBook(id);

      setBookSpecsData({
        pages: bookSpecs.data.pages,
        script: bookSpecs.data.script.name,
        language: bookSpecs.data.language.name,
        bookbind: bookSpecs.data.bookbind.name,
        format: bookSpecs.data.format.name,
        isbn: bookSpecs.data.isbn,
      });
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={classes.specsContainer}>
      <div className={classes.detailContainer}>
        <p className={classes.detailTitle}>Broj strana</p>
        <p className={classes.mainDetailText}>{bookSpecsData.pages}</p>
      </div>
      <div className={classes.detailContainer}>
        <p className={classes.detailTitle}>Pismo</p>
        <p className={classes.mainDetailText}>{bookSpecsData.script}</p>
      </div>
      <div className={classes.detailContainer}>
        <p className={classes.detailTitle}>Jezik</p>
        <p className={classes.mainDetailText}>{bookSpecsData.language}</p>
      </div>
      <div className={classes.detailContainer}>
        <p className={classes.detailTitle}>Povez</p>
        <p className={classes.mainDetailText}>{bookSpecsData.bookbind}</p>
      </div>
      <div className={classes.detailContainer}>
        <p className={classes.detailTitle}>Format</p>
        <p className={classes.mainDetailText}>{bookSpecsData.format}</p>
      </div>
      <div className={classes.detailContainer}>
        <p className={classes.detailTitle}>
          International Standard Book Number (ISBN)
        </p>
        <p className={classes.mainDetailText}>{bookSpecsData.isbn}</p>
      </div>
    </div>
  );
};

export default BookSpecDetails;

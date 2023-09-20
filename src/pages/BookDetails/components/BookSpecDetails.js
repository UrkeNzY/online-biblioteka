import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../../services/books";

import classes from "../../../styles/BookDetails.module.css";

const BookSpecDetails = () => {
  const [bookSpecsData, setBookSpecsData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookSpecs = await getBook(id);

        setBookSpecsData({
          pages: bookSpecs.data.pages,
          script: bookSpecs.data.script.name,
          language: bookSpecs.data.language.name,
          bookbind: bookSpecs.data.bookbind.name,
          format: bookSpecs.data.format.name,
          isbn: bookSpecs.data.isbn,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={classes.specsContainer}>
      <DetailItem title="Broj strana" text={bookSpecsData.pages} />
      <DetailItem title="Pismo" text={bookSpecsData.script} />
      <DetailItem title="Jezik" text={bookSpecsData.language} />
      <DetailItem title="Povez" text={bookSpecsData.bookbind} />
      <DetailItem title="Format" text={bookSpecsData.format} />
      <DetailItem
        title="International Standard Book Number (ISBN)"
        text={bookSpecsData.isbn}
      />
    </div>
  );
};

const DetailItem = ({ title, text }) => (
  <div className={classes.detailContainer}>
    <p className={classes.detailTitle}>{title}</p>
    <p className={classes.mainDetailText}>{text}</p>
  </div>
);

export default BookSpecDetails;

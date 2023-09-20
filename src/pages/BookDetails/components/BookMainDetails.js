import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../../services/books";

import classes from "../../../styles/BookDetails.module.css";

import ReactShowMoreText from "react-show-more-text";

const BookMainDetails = () => {
  const [mainBookData, setMainBookData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainBookDetails = await getBook(id);

        const parser = new DOMParser();
        const descriptionText = parser.parseFromString(
          mainBookDetails.data.description,
          "text/html"
        ).documentElement.textContent;

        setMainBookData({
          title: mainBookDetails.data.title,
          categories: mainBookDetails.data.categories,
          genres: mainBookDetails.data.genres,
          authors: mainBookDetails.data.authors,
          publisher: mainBookDetails.data.publisher.name,
          releaseDate: mainBookDetails.data.pDate,
          description: descriptionText,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={classes.mainDetailsContainer}>
      <div>
        <DetailItem title="Naziv knjige" text={mainBookData.title} />
        <DetailItem
          title="Kategorija"
          text={
            mainBookData.categories &&
            mainBookData.categories.map((category, index) => (
              <>
                {category.name}
                {index < mainBookData.categories.length - 1 && ", "}
              </>
            ))
          }
        />
        <DetailItem
          title="Žanr"
          text={
            mainBookData.genres &&
            mainBookData.genres.map((genre, index) => (
              <>
                {genre.name}
                {index < mainBookData.genres.length - 1 && ", "}
              </>
            ))
          }
        />
        <DetailItem
          title="Autor/ri"
          text={
            mainBookData.authors &&
            mainBookData.authors.map((author, index) => (
              <>
                {author.name} {author.surname}
                {index < mainBookData.authors.length - 1 && ", "}
              </>
            ))
          }
        />
        <DetailItem title="Izdavač" text={mainBookData.publisher} />
        <DetailItem title="Godina izdavanja" text={mainBookData.releaseDate} />
      </div>
      <div className={classes.descriptionContainer}>
        <h4>Storyline (Kratki sadrzaj)</h4>
        <ReactShowMoreText
          lines={5}
          more="Prikaži više &#8595;"
          less="Prikaži manje &#8593;"
          anchorClass={classes.descriptionAnchor}
        >
          {mainBookData.description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

const DetailItem = ({ title, text }) => (
  <div className={classes.detailContainer}>
    <p className={classes.detailTitle}>{title}</p>
    <p className={classes.mainDetailText}>{text}</p>
  </div>
);

export default BookMainDetails;

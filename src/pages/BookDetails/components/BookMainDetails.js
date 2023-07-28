import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "../../../styles/BookDetails.module.css";

import ReactShowMoreText from "react-show-more-text";
import { getBook } from "../../../services/books";

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
        <div className={classes.detailContainer}>
          <p className={classes.detailTitle}>Naziv knjige</p>
          <p className={classes.mainDetailText}>{mainBookData.title}</p>
        </div>
        <div className={classes.detailContainer}>
          <p className={classes.detailTitle}>Kategorija</p>
          {mainBookData.categories &&
            mainBookData.categories.map((category, index) => (
              <p className={classes.mainDetailText} key={category.id}>
                {category.name}
                {index < mainBookData.categories.length - 1 && ", "}
              </p>
            ))}
        </div>
        <div className={classes.detailContainer}>
          <p className={classes.detailTitle}>Zanr</p>
          {mainBookData.genres &&
            mainBookData.genres.map((genre, index) => (
              <p className={classes.mainDetailText} key={genre.id}>
                {genre.name}
                {index < mainBookData.genres.length - 1 && ", "}
              </p>
            ))}
        </div>
        <div className={classes.detailContainer}>
          <p className={classes.detailTitle}>Autor/ri</p>
          {mainBookData.authors &&
            mainBookData.authors.map((author, index) => (
              <p className={classes.mainDetailText} key={author.id}>
                {author.name} {author.surname}
                {index < mainBookData.authors.length - 1 && ", "}
              </p>
            ))}
        </div>
        <div className={classes.detailContainer}>
          <p className={classes.detailTitle}>Izdavac</p>
          <p className={classes.mainDetailText}>{mainBookData.publisher}</p>
        </div>
        <div className={classes.detailContainer}>
          <p className={classes.detailTitle}>Godina izdavanja</p>
          <p className={classes.mainDetailText}>{mainBookData.releaseDate}</p>
        </div>
      </div>
      <div className={classes.descriptionContainer}>
        <h4>Storyline (Kratki sadrzaj)</h4>
        <ReactShowMoreText
          lines={5}
          more="Prikazi vise &#8595;"
          less="Prikazi manje &#8593;"
          anchorClass={classes.descriptionAnchor}
        >
          {mainBookData.description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

export default BookMainDetails;

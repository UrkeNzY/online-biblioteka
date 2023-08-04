import React, { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";
import { useCreateBookContext } from "../../../state/CreateBookContext";

import classes from "../../../styles/Forms.module.css";

import InputText from "../../../components/Forms/InputText";
import InputSelect from "../../../components/Forms/InputSelect";

const NewBookForm = () => {
  const {
    submittedName,
    setSubmittedName,
    submittedDescription,
    setSubmittedDescription,
    submittedCategory,
    setSubmittedCategory,
    submittedGenre,
    setSubmittedGenre,
    submittedAuthor,
    setSubmittedAuthor,
    submittedPublisher,
    setSubmittedPublisher,
    submittedAmount,
    setSubmittedAmount,
    submittedReleaseDate,
    setSubmittedReleaseDate,
    updateNewBook,
  } = useCreateBookContext();

  const [bookCategories, setBookCategories] = useState([]);
  const [bookGenres, setBookGenres] = useState([]);
  const [bookAuthors, setBookAuthors] = useState([]);
  const [bookPublishers, setBookPublishers] = useState([]);

  const changeBookNameHandler = (event) => {
    setSubmittedName(event.target.value);
  };
  const changeBookDescriptionHandler = (event) => {
    setSubmittedDescription(event.target.value);
  };
  const changeBookCategoryHandler = (value) => {
    const categoryIds = value.map((option) => option.id);
    setSubmittedCategory(categoryIds);
  };
  const changeBookGenreHandler = (value) => {
    const genreIds = value.map((option) => option.id);
    setSubmittedGenre(genreIds);
  };
  const changeBookAuthorHandler = (value) => {
    const authorIds = value.map((option) => option.id);
    setSubmittedAuthor(authorIds);
  };

  const changeBookPublisherHandler = (value) => {
    setSubmittedPublisher(value);
  };
  const changeBookAmountHandler = (event) => {
    setSubmittedAmount(event.target.value);
  };
  const changeBookReleaseDateHandler = (event) => {
    console.log(event.target.value);
    setSubmittedReleaseDate(event.target.value)
  } 

  const updateBookData = (event) => {
    event.preventDefault();
    updateNewBook({
      submittedName,
      submittedDescription,
      submittedCategory,
      submittedGenre,
      submittedAuthor,
      submittedPublisher,
      submittedAmount,
      submittedReleaseDate,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const bookData = await fetchcreateBookData();

        const categories = bookData.data.categories.map((category) => ({
          id: category.id,
          name: category.name,
        }));

        const genres = bookData.data.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        }));

        const authors = bookData.data.authors.map((author) => ({
          id: author.id,
          name: author.name + " " + author.surname,
        }));

        const publishers = bookData.data.publishers.map((publisher) => ({
          id: publisher.id,
          name: publisher.name,
        }));

        setBookCategories(categories);
        setBookGenres(genres);
        setBookAuthors(authors);
        setBookPublishers(publishers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form onBlur={updateBookData} className={classes.form}>
      <section>
        <InputText
          labelText="Naziv knjige"
          type="text"
          id="bookName"
          value={submittedName}
          onChange={changeBookNameHandler}
        />

        <label htmlFor="bookDescription">
          Kratak sadržaj<span className={classes.required}></span>
        </label>
        <textarea
          type="text"
          id="bookDescription"
          value={submittedDescription}
          onChange={changeBookDescriptionHandler}
          className={classes.textarea}
          rows="6" 
          required
        />

        <InputSelect
          labelText="Kategorija"
          id="bookCategory"
          value={submittedCategory}
          onSelect={changeBookCategoryHandler}
          required
          multiselect
          options={bookCategories}
        />

        <InputSelect
          labelText="Žanr"
          id="bookGenre"
          value={submittedGenre}
          onSelect={changeBookGenreHandler}
          required
          multiselect
          options={bookGenres}
        />
      </section>

      <section>
        <InputSelect
          labelText="Autor"
          id="bookAuthor"
          value={submittedAuthor}
          onSelect={changeBookAuthorHandler}
          required
          multiselect
          options={bookAuthors}
        />
        <InputSelect
          labelText="Izdavač"
          id="bookPublisher"
          value={submittedPublisher}
          onSelect={changeBookPublisherHandler}
          required
          options={bookPublishers}
        />
        <InputText
          labelText="Količina"
          type="number"
          id="bookAmonut"
          value={submittedAmount}
          onChange={changeBookAmountHandler}
        />
        <InputText
          labelText="Godina izdavanja"
          type="number"
          id="bookReleaseDate"
          value={submittedReleaseDate}
          required
          onChange={changeBookReleaseDateHandler}
        />
      </section>
    </form>
  );
};

export default NewBookForm;

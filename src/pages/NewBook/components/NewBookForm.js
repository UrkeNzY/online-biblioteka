import React, { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";

import classes from "../../../styles/Forms.module.css";

import InputText from "../../../components/Forms/InputText";
import InputSelect from "../../../components/Forms/InputSelect";

const NewBookForm = () => {
  const [submittedName, setSubmittedName] = useState("");
  const [submittedDescription, setSubmittedDescription] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState("");
  const [submittedGenre, setSubmittedGenre] = useState("");
  const [submittedAuthor, setSubmittedAuthor] = useState("");
  const [submittedPublisher, setSubmittedPublisher] = useState("");
  const [submittedAmount, setSubmittedAmount] = useState("");

  const [bookCategories, setBookCategories] = useState([""]);
  const [bookGenres, setBookGenres] = useState([""]);
  const [bookAuthors, setBookAuthors] = useState([""]);
  const [bookPublishers, setBookPublishers] = useState([""]);

  const changeBookNameHandler = (event) => {
    setSubmittedName(event.target.value);
  };
  const changeBookDescriptionHandler = (event) => {
    setSubmittedDescription(event.target.value);
  };
  const changeBookCategoryHandler = (event) => {
    setSubmittedCategory(event.target.value);
  };
  const changeBookGenreHandler = (event) => {
    setSubmittedGenre(event.target.value);
  };
  const changeBookAuthorHandler = (event) => {
    setSubmittedAuthor(event.target.value);
  };
  const changeBookPublisherHandler = (event) => {
    setSubmittedPublisher(event.target.value);
  };
  const changeBookAmountHandler = (event) => {
    setSubmittedAmount(event.target.value);
  };

  const newBook = {
    submittedName,
    submittedDescription,
    submittedCategory,
    submittedGenre,
    submittedAuthor,
    submittedPublisher,
    submittedAmount,
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(newBook);
    setSubmittedName("");
    setSubmittedDescription("");
    setSubmittedCategory("");
    setSubmittedGenre("");
    setSubmittedAuthor("");
    setSubmittedPublisher("");
    setSubmittedAmount("");
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
        setBookPublishers((prevState) => [prevState, ...publishers]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
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
          required
        />

        <InputSelect
          labelText="Kategorija"
          id="bookCategory"
          value={submittedCategory}
          onChange={changeBookCategoryHandler}
          required
          multiselect
          options={bookCategories}
        />

        <InputSelect
          labelText="Žanr"
          id="bookGenre"
          value={submittedGenre}
          onChange={changeBookGenreHandler}
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
          onChange={changeBookAuthorHandler}
          required
          multiselect
          options={bookAuthors}
        />
        <InputSelect
          labelText="Izdavač"
          id="bookPublisher"
          value={submittedPublisher}
          onChange={changeBookPublisherHandler}
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
      </section>
    </form>
  );
};

export default NewBookForm;

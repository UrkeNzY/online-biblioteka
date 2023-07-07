import React, { useState } from "react";
import classes from "../../../styles/Forms.module.css";
import InputText from "../../../components/Forms/InputText";
import InputSelect from "../../../components/Forms/InputSelect";
import FormButtons from "../../../components/Forms/FormButtons";

const NewBookForm = () => {
  const [bookName, setBookName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookAmount, setBookAmount] = useState("");

  const changeBookNameHandler = (event) => {
    setBookName(event.target.value);
  };
  const changeBookDescriptionHandler = (event) => {
    setBookDescription(event.target.value);
  };
  const changeBookCategoryHandler = (event) => {
    setBookCategory(event.target.value);
  };
  const changeBookGenreHandler = (event) => {
    setBookGenre(event.target.value);
  };
  const changeBookAuthorHandler = (event) => {
    setBookAuthor(event.target.value);
  };
  const changeBookPublisherHandler = (event) => {
    setBookPublisher(event.target.value);
  };
  const changeBookAmountHandler = (event) => {
    setBookAmount(event.target.value);
  };

  const newBook = {
    bookName,
    bookDescription,
    bookCategory,
    bookGenre,
    bookAuthor,
    bookPublisher,
    bookAmount,
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(newBook);
    setBookName("");
    setBookDescription("");
    setBookCategory("");
    setBookGenre("");
    setBookAuthor("");
    setBookPublisher("");
    setBookAmount("");
  };

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <section>
        <InputText
          labelText="Naziv knjige"
          type="text"
          id="bookName"
          value={bookName}
          onChange={changeBookNameHandler}
        />

        <label htmlFor="bookDescription">
          Kratak sadržaj<span className={classes.required}></span>
        </label>
        <textarea
          type="text"
          id="bookDescription"
          value={bookDescription}
          onChange={changeBookDescriptionHandler}
          className={classes.textarea}
          required
        />

        <InputSelect
          labelText="Kategorija"
          id="bookCategory"
          value={bookCategory}
          onChange={changeBookCategoryHandler}
          required
          options={["", "Udžbenici", "Romani"]}
        />

        <InputSelect
          labelText="Žanr"
          id="bookGenre"
          value={bookGenre}
          onChange={changeBookGenreHandler}
          required
          options={["", "Poezija", "Stručna literatura"]}
        />
      </section>

      <section>
        <InputSelect
          labelText="Autor"
          id="bookAuthor"
          value={bookAuthor}
          onChange={changeBookAuthorHandler}
          required
          options={["", "Mark Twain", "Pero Peric"]}
        />
        <InputSelect
          labelText="Izdavač"
          id="bookPublisher"
          value={bookPublisher}
          onChange={changeBookPublisherHandler}
          required
          options={["", "Izdavac1"]}
        />
        <InputText
          labelText="Količina"
          type="number"
          id="bookAmonut"
          value={bookAmount}
          onChange={changeBookAmountHandler}
        />
      </section>

      <FormButtons />
    </form>
  );
};

export default NewBookForm;
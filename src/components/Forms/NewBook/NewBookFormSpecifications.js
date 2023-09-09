import React, { useState } from "react";
import classes from "../Forms.module.css";
import InputText from "../ReusableComponents/InputText";
import InputSelect from "../ReusableComponents/InputSelect";
import FormButtons from "../ReusableComponents/FormButtons";

const NewBookFormSpecifications = () => {
  const [bookPages, setBookPages] = useState("");
  const [bookWriting, setBookWriting] = useState("");
  const [bookBack, setBookBack] = useState("");
  const [bookFormat, setBookFormat] = useState("");
  const [bookISBN, setBookISBN] = useState("");

  const changeBookPagesHandler = (event) => {
    setBookPages(event.target.value);
  };
  const changeBookWritingHandler = (event) => {
    setBookWriting(event.target.value);
  };
  const changeBookBackHandler = (event) => {
    setBookBack(event.target.value);
  };
  const changeBookFormatHandler = (event) => {
    setBookFormat(event.target.value);
  };
  const changeBookISBNHandler = (event) => {
    setBookISBN(event.target.value);
  };

  const newBook = {
    bookPages,
    bookWriting,
    bookBack,
    bookFormat,
    bookISBN,
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(newBook);
    setBookPages("");
    setBookWriting("");
    setBookBack("");
    setBookFormat("");
    setBookISBN("");
  };

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <section>
        <InputText
          labelText="Broj strana"
          type="number"
          id="bookPages"
          value={bookPages}
          onChange={changeBookPagesHandler}
        />

        <InputSelect
          labelText="Pismo"
          id="bookWriting"
          value={bookWriting}
          onChange={changeBookWritingHandler}
          required
          options={["", "Ćirilica", "Latinica", "Arapsko", "Kinesko"]}
        />

        <InputSelect
          labelText="Povez"
          id="bookBack"
          value={bookBack}
          onChange={changeBookBackHandler}
          required
          options={["", "Tvrdi", "Meki"]}
        />

        <InputSelect
          labelText="Format"
          id="bookFormat"
          value={bookFormat}
          onChange={changeBookFormatHandler}
          required
          options={["", "A1", "A2"]}
        />

        <InputText
          labelText="International Standard Book Num"
          type="number"
          id="bookISBN"
          value={bookISBN}
          onChange={changeBookISBNHandler}
        />
      </section>

      <FormButtons />
    </form>
  );
};

export default NewBookFormSpecifications;

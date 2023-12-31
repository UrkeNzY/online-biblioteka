import { useEffect, useState } from "react";
import { fetchcreateBookData } from "../../../services/books";
import { useCreateBookContext } from "../../../state/CreateBookContext";

import classes from "../../../styles/Forms.module.css";

import InputSelect from "../../../components/Forms/InputSelect";
import InputText from "../../../components/Forms/InputText";

const NewBookSpecs = () => {
  const {
    submittedPages,
    setSubmittedPages,
    submittedScript,
    setSubmittedScript,
    submittedLanguage,
    setSubmittedLanguage,
    submittedBinding,
    setSubmittedBinding,
    submittedFormat,
    setSubmittedFormat,
    submittedISBN,
    setSubmittedISBN,
    updateNewBook,
    editBookData,
    isEditing,
    setHasError,
    bookErrors,
  } = useCreateBookContext();

  const [bookScripts, setBookScripts] = useState([""]);
  const [bookLanguages, setBookLanguages] = useState([""]);
  const [bookBindings, setBookBindings] = useState([""]);
  const [bookFormats, setBookFormats] = useState([""]);

  useEffect(() => {
    if (editBookData.id && isEditing) {
      setSubmittedPages(editBookData.pages || "");
      setSubmittedScript(editBookData.script || "");
      setSubmittedLanguage(editBookData.language || []);
      setSubmittedBinding(editBookData.bookbinds || []);
      setSubmittedFormat(editBookData.format || "");
      setSubmittedISBN(editBookData.isbn || "");
    }
  }, [editBookData, isEditing]);

  const changeBookPagesHandler = (event) => {
    setSubmittedPages(event.target.value);
  };

  const changeBookScriptHandler = (value) => {
    console.log(value);
    setSubmittedScript(value);
  };

  const changeBookLanguageHandler = (value) => {
    console.log(value);
    setSubmittedLanguage(value);
  };

  const changeBookBindingHandler = (value) => {
    console.log(value);
    setSubmittedBinding(value);
  };

  const changeBookFormatHandler = (value) => {
    console.log(value);
    setSubmittedFormat(value);
  };

  const changeBookISBNHandler = (event) => {
    setSubmittedISBN(event.target.value);
  };

  const updateBookData = (event) => {
    event?.preventDefault();
    updateNewBook({
      submittedPages,
      submittedScript,
      submittedLanguage,
      submittedBinding,
      submittedFormat,
      submittedISBN,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const bookData = await fetchcreateBookData();

        console.log(bookData);

        const scripts = bookData.data.scripts.map((script) => ({
          id: script.id,
          name: script.name,
        }));

        const languages = bookData.data.languages.map((language) => ({
          id: language.id,
          name: language.name,
        }));

        const binds = bookData.data.bookbinds.map((bind) => ({
          id: bind.id,
          name: bind.name,
        }));

        const formats = bookData.data.formats.map((format) => ({
          id: format.id,
          name: format.name,
        }));

        setBookScripts((prevState) => [prevState, ...scripts]);
        setBookLanguages((prevState) => [prevState, ...languages]);
        setBookBindings((prevState) => [prevState, ...binds]);
        setBookFormats((prevState) => [prevState, ...formats]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    if (
      submittedPages === "" ||
      submittedScript === "" ||
      submittedLanguage.length === 0 ||
      submittedBinding.length === 0 ||
      submittedFormat === "" ||
      submittedISBN.trim() === ""
    ) {
      setHasError(true); // Set hasError to true if any field is empty
    } else {
      setHasError(false); // Set hasError to false if all fields have values
    }
  };

  // Use useEffect to call the validation function whenever the input fields change
  useEffect(() => {
    validateForm();
  }, [
    submittedPages,
    submittedScript,
    submittedLanguage,
    submittedBinding,
    submittedFormat,
    submittedISBN,
  ]);

  return (
    <form
      className={classes.form}
      onChange={updateBookData}
      onBlur={updateBookData}
    >
      <section>
        <InputText
          labelText="Broj strana"
          type="number"
          id="bookPages"
          value={submittedPages}
          required
          onChange={changeBookPagesHandler}
        />
        <p className={classes.errorText}>{bookErrors.pages}</p>
        <InputSelect
          labelText="Pismo"
          id="bookScript"
          value={submittedScript}
          required
          options={bookScripts}
          onSelect={changeBookScriptHandler}
        />
        <p className={classes.errorText}>{bookErrors.scripts}</p>
        <InputSelect
          labelText="Jezik"
          id="bookLanguage"
          value={submittedLanguage}
          required
          options={bookLanguages}
          onSelect={changeBookLanguageHandler}
        />
        <p className={classes.errorText}>{bookErrors.languages}</p>
        <InputSelect
          labelText="Povez"
          id="bookBindings"
          value={submittedBinding}
          required
          options={bookBindings}
          onSelect={changeBookBindingHandler}
        />
        <p className={classes.errorText}>{bookErrors.bookbinds}</p>
      </section>
      <section>
        <InputSelect
          labelText="Format"
          id="bookFormat"
          value={submittedFormat}
          required
          options={bookFormats}
          onSelect={changeBookFormatHandler}
        />
        <p className={classes.errorText}>{bookErrors.formats}</p>
        <InputText
          labelText="International Standard Book Num"
          type="text"
          value={submittedISBN}
          id="ISBN"
          required
          onChange={changeBookISBNHandler}
        />
        <p className={classes.errorText}>{bookErrors.isbn}</p>
      </section>
    </form>
  );
};

export default NewBookSpecs;

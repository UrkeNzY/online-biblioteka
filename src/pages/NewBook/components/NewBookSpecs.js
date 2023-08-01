import { useEffect, useState } from "react";
import { fetchcreateBookData } from "../../../services/books";
import { useCreateBookContext } from "../../../state/CreateBookContext";

import classes from "../../../styles/Forms.module.css";

import InputSelect from "../../../components/Forms/InputSelect";
import InputText from "../../../components/Forms/InputText";

const NewBookSpecs = (props) => {
  const {
    submittedPages,
    setSubmittedPages,
    submittedScript,
    setSubmittedScript,
    submittedBinding,
    setSubmittedBinding,
    submittedFormat,
    setSubmittedFormat,
    submittedISBN,
    setSubmittedISBN,
    updateNewBook,
  } = useCreateBookContext();

  const [bookScripts, setBookScripts] = useState([""]);
  const [bookBindings, setBookBindings] = useState([""]);
  const [bookFormats, setBookFormats] = useState([""]);

  const changeBookPagesHandler = (event) => {
    setSubmittedPages(event.target.value);
  };

  const changeBookScriptHandler = (value) => {
    console.log(value);
    setSubmittedScript(value);
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
    event.preventDefault();
    updateNewBook({
      submittedPages,
      submittedScript,
      submittedBinding,
      submittedFormat,
      submittedISBN,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const bookData = await fetchcreateBookData();

        const scripts = bookData.data.scripts.map((script) => ({
          id: script.id,
          name: script.name,
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
        setBookBindings((prevState) => [prevState, ...binds]);
        setBookFormats((prevState) => [prevState, ...formats]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form
      className={classes.form}
      onChange={updateBookData}
      onSelect={updateBookData}
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
        <InputSelect
          labelText="Pismo"
          id="bookScript"
          value={submittedScript}
          required
          options={bookScripts}
          onSelect={changeBookScriptHandler}
        />
        <InputSelect
          labelText="Povez"
          id="bookBindings"
          value={submittedBinding}
          required
          options={bookBindings}
          onSelect={changeBookBindingHandler}
        />
        <InputSelect
          labelText="Format"
          id="bookFormat"
          value={submittedFormat}
          required
          options={bookFormats}
          onSelect={changeBookFormatHandler}
        />
        <InputText
          labelText="International Standard Book Num"
          type="text"
          value={submittedISBN}
          id="ISBN"
          required
          onChange={changeBookISBNHandler}
        />
      </section>
    </form>
  );
};

export default NewBookSpecs;

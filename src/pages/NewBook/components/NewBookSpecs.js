import { useEffect, useState } from "react";
import { fetchcreateBookData } from "../../../services/books";

import classes from "../../../styles/Forms.module.css";

import InputSelect from "../../../components/Forms/InputSelect";
import InputText from "../../../components/Forms/InputText";

const NewBookSpecs = (props) => {
  const [submittedScript, setSubmittedScript] = useState("");
  const [submittedBinding, setSubmittedBinding] = useState("");
  const [submittedFormat, setSubmittedFormat] = useState("");
  const [submittedISBN, setSubmittedISBN] = useState("");

  const [bookScripts, setBookScripts] = useState([""]);
  const [bookBindings, setBookBindings] = useState([""]);
  const [bookFormats, setBookFormats] = useState([""]);

  const changeBookScriptHandler = (event) => {
    setSubmittedScript(event.target.value);
  };

  const changeBookBindingHandler = (event) => {
    setSubmittedBinding(event.target.value);
  };

  const changeBookFormatHandler = (event) => {
    setSubmittedFormat(event.target.value);
  };

  const changeBookISBNHandler = (event) => {
    setSubmittedISBN(event.target.value);
  }

  const newBookSpecs = {
    submittedScript,
    submittedBinding,
    submittedFormat,
    submittedISBN
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(newBookSpecs);
    setSubmittedScript("");
    setSubmittedBinding("");
    setSubmittedFormat("");
  }

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
    <form className={classes.form} onSubmit={submitFormHandler}>
      <section>
        <InputText labelText="Broj strana" type="number" id="bookPages" />
        <InputSelect
          labelText="Pismo"
          id="bookScript"
          value={submittedScript}
          required
          options={bookScripts}
          onChange={changeBookScriptHandler}
        />
        <InputSelect
          labelText="Povez"
          id="bookBindings"
          value={submittedBinding}
          required
          options={bookBindings}
          onChange={changeBookBindingHandler}
        />
        <InputSelect
          labelText="Format"
          id="bookFormat"
          value={submittedFormat}
          required
          options={bookFormats}
          onChange={changeBookFormatHandler}
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

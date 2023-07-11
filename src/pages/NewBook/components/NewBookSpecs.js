import { useEffect, useState } from "react";
import { fetchcreateBookData } from "../../../services/books";

import classes from "../../../styles/Forms.module.css";

import InputSelect from "../../../components/Forms/InputSelect";
import InputText from "../../../components/Forms/InputText";

const NewBookSpecs = () => {
  const [bookScripts, setBookScripts] = useState([""]);
  const [bookBindings, setBookBindings] = useState([""]);
  const [bookFormats, setBookFormats] = useState([""]);

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
    <form className={classes.form}>
      <section>
        <InputText labelText="Broj strana" type="number" id="bookPages" />
        <InputSelect
          labelText="Pismo"
          id="bookScript"
          required
          options={bookScripts}
        />
        <InputSelect
          labelText="Povez"
          id="bookBindings"
          required
          options={bookBindings}
        />
        <InputSelect
          labelText="Format"
          id="bookFormat"
          required
          options={bookFormats}
        />
        <InputText
          labelText="International Standard Book Num"
          type="text"
          id="standardBookNum"
          required
        />
      </section>
    </form>
  );
};

export default NewBookSpecs;

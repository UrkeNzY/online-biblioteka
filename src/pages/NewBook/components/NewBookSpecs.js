import { useEffect, useState } from "react";
import { fetchcreateBookData } from "../../../services/books";
import { useCreateBookContext } from "../../../state/CreateBookContext";

import classes from "../../../styles/Forms.module.css";

import InputSelect from "../../../components/Forms/InputSelect";
import InputText from "../../../components/Forms/InputText";

const NewBookSpecs = () => {
  const {
    updateNewBook,
    editBookData,
    isEditing,
    setHasError,
    bookErrors,
    formData,
    setFormData,
  } = useCreateBookContext();

  const [bookScripts, setBookScripts] = useState([""]);
  const [bookLanguages, setBookLanguages] = useState([""]);
  const [bookBindings, setBookBindings] = useState([""]);
  const [bookFormats, setBookFormats] = useState([""]);

  useEffect(() => {
    if (editBookData.id && isEditing) {
      setFormData((prevData) => ({
        ...prevData,
        submittedPages: editBookData.pages || "",
        submittedScript: editBookData.script || "",
        submittedLanguage: editBookData.language || "",
        submittedBinding: editBookData.bookbinds || "",
        submittedFormat: editBookData.format || "",
        submittedISBN: editBookData.isbn || "",
      }));
    }
  }, [editBookData, isEditing]);

  const handleInputChange = (name, value) => {
    let updatedValue = value;

    if (Array.isArray(value)) {
      updatedValue = value.map((option) => option.id);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const updateBookData = () => {
    updateNewBook(formData);
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
      formData.submittedPages === "" ||
      formData.submittedScript === "" ||
      formData.submittedLanguage === "" ||
      formData.submittedBinding === "" ||
      formData.submittedFormat === "" ||
      formData.submittedISBN.trim() === ""
    ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [
    formData.submittedPages,
    formData.submittedScript,
    formData.submittedLanguage,
    formData.submittedBinding,
    formData.submittedFormat,
    formData.submittedISBN,
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
          value={formData.submittedPages}
          required
          onChange={(event) =>
            handleInputChange("submittedPages", event.target.value)
          }
        />
        <p className={classes.errorText}>{bookErrors.pages}</p>
        <InputSelect
          labelText="Pismo"
          id="bookScript"
          value={formData.submittedScript}
          required
          options={bookScripts}
          onSelect={(value) => handleInputChange("submittedScript", value)}
        />
        <p className={classes.errorText}>{bookErrors.scripts}</p>
        <InputSelect
          labelText="Jezik"
          id="bookLanguage"
          value={formData.submittedLanguage}
          required
          options={bookLanguages}
          onSelect={(value) => handleInputChange("submittedLanguage", value)}
        />
        <p className={classes.errorText}>{bookErrors.languages}</p>
        <InputSelect
          labelText="Povez"
          id="bookBindings"
          value={formData.submittedBinding}
          required
          options={bookBindings}
          onSelect={(value) => handleInputChange("submittedBinding", value)}
        />
        <p className={classes.errorText}>{bookErrors.bookbinds}</p>
      </section>
      <section>
        <InputSelect
          labelText="Format"
          id="bookFormat"
          value={formData.submittedFormat}
          required
          options={bookFormats}
          onSelect={(value) => handleInputChange("submittedFormat", value)}
        />
        <p className={classes.errorText}>{bookErrors.formats}</p>
        <InputText
          labelText="International Standard Book Num"
          type="text"
          value={formData.submittedISBN}
          id="ISBN"
          required
          onChange={(event) =>
            handleInputChange("submittedISBN", event.target.value)
          }
        />
        <p className={classes.errorText}>{bookErrors.isbn}</p>
      </section>
    </form>
  );
};

export default NewBookSpecs;

import React, { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";
import { useCreateBookContext } from "../../../state/CreateBookContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    editBookData,
    updateNewBook,
    isEditing,
    setHasError,
    bookErrors,
  } = useCreateBookContext();

  useEffect(() => {
    if (editBookData.id && isEditing) {
      setSubmittedName(editBookData.title || "");
      setSubmittedDescription(editBookData.description || "");
      setSubmittedCategory(editBookData.categories || []);
      setSubmittedGenre(editBookData.genres || []);
      setSubmittedAuthor(editBookData.authors || []);
      setSubmittedPublisher(editBookData.publisher || "");
      setSubmittedAmount(editBookData.samples || "");
      setSubmittedReleaseDate(editBookData.releaseDate || "");
    }
  }, [editBookData, isEditing]);

  const [bookCategories, setBookCategories] = useState([]);
  const [bookGenres, setBookGenres] = useState([]);
  const [bookAuthors, setBookAuthors] = useState([]);
  const [bookPublishers, setBookPublishers] = useState([]);

  const changeBookNameHandler = (event) => {
    setSubmittedName(event.target.value);
  };
  const changeBookDescriptionHandler = (value) => {
    console.log(value);
    setSubmittedDescription(value);
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
    setSubmittedReleaseDate(event.target.value);
  };

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
        setBookPublishers((prevState) => [prevState, ...publishers]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    if (
      submittedName === "" ||
      submittedDescription === "" ||
      submittedCategory.length === 0 ||
      submittedGenre.length === 0 ||
      submittedAuthor.length === 0 ||
      submittedPublisher === "" ||
      submittedAmount === "" ||
      submittedReleaseDate.trim() === ""
    ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [
    submittedName,
    submittedDescription,
    submittedCategory,
    submittedGenre,
    submittedAuthor,
    submittedPublisher,
    submittedAmount,
    submittedReleaseDate,
  ]);

  return (
    <form
      onChange={updateBookData}
      onBlur={updateBookData}
      className={classes.form}
    >
      <section>
        <InputText
          labelText="Naziv knjige"
          type="text"
          id="bookName"
          value={submittedName}
          onChange={changeBookNameHandler}
          required
        />
        <p className={classes.errorText}>{bookErrors.title}</p>
        <label htmlFor="bookDescription">
          Kratak sadržaj<span className={classes.required}></span>
        </label>
        <div className={classes.reactQuillWrapper}>
          <ReactQuill
            theme="snow"
            id="bookDescription"
            value={submittedDescription}
            onChange={changeBookDescriptionHandler}
            className={classes.reactQuill}
            modules={{
              toolbar: {
                container: [
                  [{ header: [1, 2, 3, 4, 5, false] }], // Headers
                  ["bold", "italic", "underline", "strike"], // Text styles
                  [{ list: "ordered" }, { list: "bullet" }], // Lists
                  ["link", "image"], // Links and images
                ],
                handlers: {},

                options: {},
              },
            }}
            required
          />
        </div>
        <InputSelect
          labelText="Kategorija"
          id="bookCategory"
          value={submittedCategory}
          onSelect={changeBookCategoryHandler}
          required
          multiselect
          options={bookCategories}
        />
        <p className={classes.errorText}>{bookErrors.categories}</p>
        <InputSelect
          labelText="Žanr"
          id="bookGenre"
          value={submittedGenre}
          onSelect={changeBookGenreHandler}
          required
          multiselect
          options={bookGenres}
        />
        <p className={classes.errorText}>{bookErrors.genres}</p>
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
        <p className={classes.errorText}>{bookErrors.authors}</p>
        <InputSelect
          labelText="Izdavač"
          id="bookPublisher"
          value={submittedPublisher}
          onSelect={changeBookPublisherHandler}
          required
          options={bookPublishers}
        />
        <p className={classes.errorText}>{bookErrors.publishers}</p>
        <InputText
          labelText="Količina"
          type="number"
          id="bookAmonut"
          value={submittedAmount}
          onChange={changeBookAmountHandler}
        />
        <p className={classes.errorText}>{bookErrors.samples}</p>
        <InputText
          labelText="Godina izdavanja"
          type="number"
          id="bookReleaseDate"
          value={submittedReleaseDate}
          required
          onChange={changeBookReleaseDateHandler}
        />
        <p className={classes.errorText}>{bookErrors.publishDate}</p>
      </section>
    </form>
  );
};

export default NewBookForm;

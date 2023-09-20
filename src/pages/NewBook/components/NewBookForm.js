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
    editBookData,
    updateNewBook,
    isEditing,
    setHasError,
    bookErrors,
    formData,
    setFormData,
  } = useCreateBookContext();

  useEffect(() => {
    if (editBookData.id && isEditing) {
      setFormData((prevData) => ({
        ...prevData,
        submittedName: editBookData.title || "",
        submittedDescription: editBookData.description || "",
        submittedCategory: editBookData.categories || [],
        submittedGenre: editBookData.genres || [],
        submittedAuthor: editBookData.authors || [],
        submittedPublisher: editBookData.publisher || "",
        submittedAmount: editBookData.samples || "",
        submittedReleaseDate: editBookData.releaseDate || "",
      }));
    }
  }, [editBookData, isEditing]);

  const [bookCategories, setBookCategories] = useState([]);
  const [bookGenres, setBookGenres] = useState([]);
  const [bookAuthors, setBookAuthors] = useState([]);
  const [bookPublishers, setBookPublishers] = useState([]);

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

  useEffect(() => {
    const validateForm = () => {
      if (
        formData.submittedName === "" ||
        formData.submittedDescription === "" ||
        formData.submittedCategory.length === 0 ||
        formData.submittedGenre.length === 0 ||
        formData.submittedAuthor.length === 0 ||
        formData.submittedPublisher === "" ||
        formData.submittedAmount === "" ||
        formData.submittedReleaseDate.trim() === ""
      ) {
        setHasError(true);
      } else {
        setHasError(false);
      }
    };

    validateForm();
  }, [formData, setHasError]);

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
          value={formData.submittedName}
          onChange={(event) =>
            handleInputChange("submittedName", event.target.value)
          }
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
            value={formData.submittedDescription}
            onChange={(value) =>
              handleInputChange("submittedDescription", value)
            }
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
          value={formData.submittedCategory}
          onSelect={(value) => handleInputChange("submittedCategory", value)}
          required
          multiselect
          options={bookCategories}
        />
        <p className={classes.errorText}>{bookErrors.categories}</p>
        <InputSelect
          labelText="Žanr"
          id="bookGenre"
          value={formData.submittedGenre}
          onSelect={(value) => handleInputChange("submittedGenre", value)}
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
          value={formData.submittedAuthor}
          onSelect={(value) => handleInputChange("submittedAuthor", value)}
          required
          multiselect
          options={bookAuthors}
        />
        <p className={classes.errorText}>{bookErrors.authors}</p>
        <InputSelect
          labelText="Izdavač"
          id="bookPublisher"
          value={formData.submittedPublisher}
          onSelect={(value) => handleInputChange("submittedPublisher", value)}
          required
          options={bookPublishers}
        />
        <p className={classes.errorText}>{bookErrors.publishers}</p>
        <InputText
          labelText="Količina"
          type="number"
          id="bookAmonut"
          value={formData.submittedAmount}
          onChange={(event) =>
            handleInputChange("submittedAmount", event.target.value)
          }
        />
        <p className={classes.errorText}>{bookErrors.samples}</p>
        <InputText
          labelText="Godina izdavanja"
          type="number"
          id="bookReleaseDate"
          value={formData.submittedReleaseDate}
          required
          onChange={(event) =>
            handleInputChange("submittedReleaseDate", event.target.value)
          }
        />
        <p className={classes.errorText}>{bookErrors.publishDate}</p>
      </section>
    </form>
  );
};

export default NewBookForm;

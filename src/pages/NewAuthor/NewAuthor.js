import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editAuthor, showAuthor, storeAuthor } from "../../services/authors";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import classes from "../../styles/Forms.module.css";

import InputText from "../../components/Forms/InputText";
import FormButtons from "../../components/Forms/FormButtons";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const NewAuthor = () => {
  const [authorName, setAuthorName] = useState("");
  const [authorSurname, setAuthorSurname] = useState("");
  const [biography, setBiography] = useState("");

  const [inputErrors, setInputErrors] = useState({
    authorName: "",
    authorSurname: "",
  });
  const [isLoading, setIsLoading] = useState();
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const authorDataResponse = await showAuthor(id);
          const { name, surname, bio } = authorDataResponse.data;

          console.log(authorDataResponse.data);

          setAuthorName(name || "");
          setAuthorSurname(surname || "");
          setBiography(bio || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const submitAuthorDataHandler = async () => {
    try {
      setIsLoading(true);
      if (id) {
        await editAuthor(id, {
          name: authorName,
          surname: authorSurname,
          biography: biography,
          image: "",
        });
      } else {
        await storeAuthor({
          name: authorName,
          surname: authorSurname,
          biography: biography,
          image: "",
        });
      }
      navigate("/authors");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const errorData = error.response.data.data;

        setInputErrors({
          authorName: errorData.name || "",
          authorSurname: errorData.surname ? "Prezime autora je obavezno." : "",
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const hasValue = authorName !== "";

    console.log(authorName);

    setIsFormEmpty(!hasValue);
  }, [authorName]);

  return (
    <Fragment>
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <section>
            <InputText
              labelText="Ime"
              type="text"
              id="authorName"
              value={authorName}
              onChange={(event) => {
                setAuthorName(event.target.value);
              }}
            />
            <InputText
              labelText="Prezime"
              type="text"
              id="authorSurname"
              value={authorSurname}
              onChange={(event) => {
                setAuthorSurname(event.target.value);
              }}
            />
            {inputErrors.authorName && (
              <p className={classes.errorText}>{inputErrors.authorName}</p>
            )}
            {inputErrors.authorSurname && (
              <p className={classes.errorText}>{inputErrors.authorSurname}</p>
            )}
            <label htmlFor="authorDescription">Opis</label>
            <ReactQuill
              theme="snow"
              id="authorDescription"
              value={biography}
              className={classes.reactQuill}
              onChange={(value) => {
                setBiography(value);
              }}
              modules={{
                toolbar: {
                  container: [
                    [{ header: [1, 2, 3, 4, 5, false] }], // Headers
                    ["bold", "italic", "underline", "strike"], // Text styles
                    [{ list: "ordered" }, { list: "bullet" }], // Lists
                    ["link", "image"], // Links and images
                  ],
                  handlers: {
                    // Define custom handlers if needed
                  },
                  // Specify your custom options here
                  options: {
                    // You can adjust the initial row count here
                    // Default is 1
                    // Change this value to set the number of initial rows
                    // 'auto' will automatically resize the editor as needed
                    // You can also set a fixed number of rows like '6'
                  },
                },
              }}
              required
            />
          </section>
        </form>
      </div>
      <FormButtons
        label="Sačuvaj"
        onClick={submitAuthorDataHandler}
        disabled={isFormEmpty}
      />
      {isLoading && (
        <LoadingSpinner loadingSpinner="/images/icons/form-submit-loading-spinner.gif" />
      )}
    </Fragment>
  );
};

export default NewAuthor;

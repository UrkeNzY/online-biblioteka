import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editAuthor, showAuthor, storeAuthor } from "../../services/authors";

import classes from "../../styles/Forms.module.css";

import InputText from "../../components/Forms/InputText";
import FormButtons from "../../components/Forms/FormButtons";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    const hasValue = authorName !== "" && authorSurname !== "";

    setIsFormEmpty(!hasValue);
  }, [authorName, authorSurname]);

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
            {inputErrors.authorName && (
              <p className={classes.errorText}>{inputErrors.authorName}</p>
            )}
            <InputText
              labelText="Prezime"
              type="text"
              id="authorSurname"
              value={authorSurname}
              onChange={(event) => {
                setAuthorSurname(event.target.value);
              }}
            />
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
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                  ],
                  handlers: {},

                  options: {},
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

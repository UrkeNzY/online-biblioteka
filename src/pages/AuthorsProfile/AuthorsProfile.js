import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteAuthor, showAuthor } from "../../services/authors";

import classes from "../../styles/Authors.module.css";

import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const AuthorsProfile = (props) => {
  const [authorInfo, setAuthorInfo] = useState({});
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  let buttonRef;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const authorData = await showAuthor(id);

        const parser = new DOMParser();
        const bioText = parser.parseFromString(authorData.data.bio, "text/html")
          .documentElement.textContent;

        setAuthorInfo({
          name: authorData.data.name + " " + authorData.data.surname,
          bio: bioText,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const deleteAuthorHandler = async () => {
    try {
      await deleteAuthor(id);
      navigate("/authors");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItems = [
    {
      name: "Izbriši autora",
      image: "/images/icons/trash-icon.svg",
      path: "",
      onClick: deleteAuthorHandler,
    },
  ];

  const toggleDeleteProfileHandler = (event) => {
    props.getItems(deleteItems);
    setButtonRefHandler(event);
  };

  const setButtonRefHandler = (event) => {
    buttonRef = event.target;
    props.getButtonRef(buttonRef);
  };

  return (
    <Fragment>
      <div className={classes.authorsProfileContainer}>
        <div className={classes.infoContainer}>
          <p className={classes.infoTitle}>Ime prezime</p>
          <p>{authorInfo.name}</p>
        </div>
        <div className={classes.infoContainer}>
          <p className={classes.infoTitle}>Opis</p>
          <p>{authorInfo.bio}</p>
        </div>
        {isLoading && (
          <LoadingSpinner loadingSpinner="/images/icons/loading-spinner.gif" />
        )}
      </div>
      <div className={classes.authorProfileActions}>
        <Link to={`/new-author/${id}`} className={classes.authorProfileButton}>
          <img src="/images/icons/edit-icon.svg" alt="edit icon" />
          <p>Izmjeni podatke</p>
        </Link>
        <div
          className={classes.authorProfileButton}
          onClick={toggleDeleteProfileHandler}
        >
          <img
            src="/images/buttons/dashboard-actions.svg"
            alt="more actions button"
            width="40"
            height="40"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AuthorsProfile;

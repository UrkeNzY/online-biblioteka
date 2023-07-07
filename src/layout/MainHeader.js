import { Link } from "react-router-dom";
import classes from '../styles/MainHeader.module.css';

const infoAddItems = [
  { name: "Korisnik", image: "images/icons/korisnik.svg", path: "/new-user" },
  { name: "Knjiga", image: "images/icons/knjige.svg", path: "/new-book" },
  { name: "Autor", image: "images/icons/autori.svg", path: "/" },
];

const profileItems = [
  { name: "Profile", image: "images/icons/korisnik.svg", path: "/" },
  { name: "Logout", image: "images/icons/logout.svg", path: "/" },
];

const MainHeader = (props) => {
  let buttonRef;

  const toggleInfoHandler = (event) => {
    props.getItems(infoAddItems);
    setButtonRefHandler(event);
  };

  const toggleProfileHandler = (event) => {
    props.getItems(profileItems);
    setButtonRefHandler(event);
  };

  const setButtonRefHandler = (event) => {
    buttonRef = event.target;
    props.getButtonRef(buttonRef);
  };

  return (
    <header>
      <Link to="/" className={classes.logoContainer}>
        <img src="images/logo.svg" alt="logo" />
        <h1>Online Biblioteka</h1>
      </Link>
      <div className={classes.userContainer}>
        <div className={classes.userActions}>
          <img src="images/icons/notifications.svg" alt="notifications icon" />
          <img
            src="images/icons/plus.svg"
            alt="add icon"
            onClick={toggleInfoHandler}
          />
        </div>
        <img
          src="images/logo.svg"
          alt="user profile icon"
          onClick={toggleProfileHandler}
        />
      </div>
    </header>
  );
};

export default MainHeader;

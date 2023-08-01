import { Link } from "react-router-dom";
import { userLogout } from "../services/users";
import { useContext } from "react";
import { GlobalContext } from "../state/GlobalState";

import classes from "../styles/MainHeader.module.css";

const infoAddItems = [
  { name: "Korisnik", image: "/images/icons/korisnik.svg", path: "/new-user" },
  {
    name: "Knjiga",
    image: "/images/icons/knjige.svg",
    path: "/new-book/general",
  },
  { name: "Autor", image: "/images/icons/autori.svg", path: "/new-author" },
];

const MainHeader = (props) => {
  let buttonRef;

  const { logout } = useContext(GlobalContext);

  const logOut = async () => {
    try {
      await userLogout(); // Call the userLogout function to log the user out on the server
      logout(); // Update the context to remove the user data
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const profileItems = [
    { name: "Profile", image: "/images/icons/korisnik.svg", path: "/profile" },
    {
      name: "Logout",
      image: "/images/icons/logout.svg",
      path: "",
      onClick: logOut,
    },
  ];

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
        <img src="/images/logo.svg" alt="logo" />
        <h1>Online Biblioteka</h1>
      </Link>
      <div className={classes.userContainer}>
        <div className={classes.userActions}>
          <img src="/images/icons/notifications.svg" alt="notifications icon" />
          <img
            src="/images/icons/plus.svg"
            alt="add icon"
            onClick={toggleInfoHandler}
          />
        </div>
        <img
          src="/images/logo.svg"
          alt="user profile icon"
          onClick={toggleProfileHandler}
        />
      </div>
    </header>
  );
};

export default MainHeader;

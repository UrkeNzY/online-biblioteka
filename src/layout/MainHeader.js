import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { userLogout, userInfo } from "../services/users";

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

  const [userAvatar, setUserAvatar] = useState(
    "https://petardev.live/img/profile.jpg"
  );

  const { logout } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchUserPicture() {
      try {
        const userInformation = await userInfo();
        setUserAvatar(userInformation.data.photoPath);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    fetchUserPicture();
  }, []);

  const logOut = async () => {
    try {
      await userLogout();
      logout();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const profileItems = [
    {
      name: "Profile",
      image: "/images/icons/korisnik.svg",
      path: "/profile/me",
    },
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
          className={classes.headerAvatar}
          src={userAvatar}
          alt="user profile icon"
          onClick={toggleProfileHandler}
        />
      </div>
    </header>
  );
};

export default MainHeader;

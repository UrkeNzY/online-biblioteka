import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout, userInfo } from "../services/users";
import { GlobalContext } from "../state/GlobalState";

import classes from "../styles/MainHeader.module.css";

import DarkMode from "../DarkMode/DarkMode";

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
  const [userAvatar, setUserAvatar] = useState(
    "https://petardev.live/img/profile.jpg"
  );
  const { userRole, logout } = useContext(GlobalContext);

  const navigate = useNavigate();
  let buttonRef;

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

  const toggleNotificationsHandler = () => {
    navigate("/notifications");
  };

  const toggleInfoHandler = (event) => {
    event.stopPropagation();
    props.getItems(
      userRole === "Administrator"
        ? infoAddItems
        : [
            {
              name: "Knjiga",
              image: "/images/icons/knjige.svg",
              path: "/new-book/general",
            },
          ]
    );
    setButtonRefHandler(event);
    document.addEventListener("click", closeInfoOptionsOnClick);
  };

  const toggleProfileHandler = (event) => {
    event.stopPropagation();
    props.getItems(profileItems);
    setButtonRefHandler(event);
    document.addEventListener("click", closeProfileOptionsOnClick);
  };

  const closeInfoOptionsOnClick = (event) => {
    if (!event.target.closest(".info-options")) {
      props.getItems([]);
      document.removeEventListener("click", closeInfoOptionsOnClick);
    }
  };
  const closeProfileOptionsOnClick = (event) => {
    if (!event.target.closest(".profile-options")) {
      props.getItems([]);
      document.removeEventListener("click", closeProfileOptionsOnClick);
    }
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
        <DarkMode />
        <div className={classes.userActions}>
          {(userRole === "Administrator" || userRole === "Bibliotekar") && (
            <div>
              <img
                src="/images/icons/notifications.svg"
                alt="notifications icon"
                onClick={toggleNotificationsHandler}
              />
              {/* <p className={classes.notificationAmount}>2</p> */}
            </div>
          )}

          {(userRole === "Administrator" || userRole === "Bibliotekar") && (
            <img
              src="/images/icons/plus.svg"
              alt="add icon"
              onClick={toggleInfoHandler}
            />
          )}
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

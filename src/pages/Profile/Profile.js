import React, { useState, useEffect, Fragment } from "react";
import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GlobalContext } from "../../state/GlobalState";
import { userInfo, listSingleUser } from "../../services/users";

import classes from "../../styles/Profile.module.css";

const deleteItems = [
  { name: "Izbrisi profil", image: "/images/icons/trash-icon.svg", path: "/" },
];

const Profile = (props) => {
  let buttonRef;

  const [userData, setUserData] = useState({});
  const [lastLogin, setLastLogin] = useState("");

  const { loginCount } = useContext(GlobalContext);

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (id === "me") {
          const userInformation = await userInfo();
          setUserData({
            name: `${userInformation.data.name} ${userInformation.data.surname}`,
            id: userInformation.data.id,
            userType: userInformation.data.role,
            jmbg: userInformation.data.jmbg,
            email: userInformation.data.email,
            username: userInformation.data.username,
            profilePicture: userInformation.data.photoPath,
          });

          const storedLastLogin = localStorage.getItem("lastLogin");
          if (storedLastLogin) {
            setLastLogin(storedLastLogin);
          }
        } else {
          const userInformation = await listSingleUser(id);
          setUserData({
            name: `${userInformation.data.name} ${userInformation.data.surname}`,
            id: userInformation.data.id,
            userType: userInformation.data.role,
            jmbg: userInformation.data.jmbg,
            email: userInformation.data.email,
            username: userInformation.data.username,
            profilePicture: userInformation.data.photoPath,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    fetchUserData();
  }, [location.pathname, id]);

  const toggleDeleteProfileHandler = (event) => {
    props.getItems(deleteItems);
    setButtonRefHandler(event);
  };

  const setButtonRefHandler = (event) => {
    buttonRef = event.target;
    props.getButtonRef(buttonRef);
  };

  const getTimeElapsed = () => {
    if (!lastLogin) return "Nikada se nije ulogovao/la";

    const lastLoginDate = new Date(lastLogin);
    const currentTime = new Date();
    const timeDiff = currentTime - lastLoginDate;

    if (timeDiff < 60000) {
      return "Upravo sada";
    } else if (timeDiff < 3600000) {
      const minutes = Math.floor(timeDiff / 60000);
      return `Prije ${minutes} minut${minutes > 1 ? "a" : ""}`;
    } else if (timeDiff < 86400000) {
      const hours = Math.floor(timeDiff / 3600000);
      return `Prije ${hours} sat${
        hours % 10 > 1 && hours % 10 < 5 ? "a" : hours % 10 >= 5 ? "i" : ""
      }`;
    } else {
      const days = Math.floor(timeDiff / 86400000);
      return `Prije ${days} dan${days > 1 ? "a" : ""}`;
    }
  };

  return (
    <Fragment>
      <div className={classes.profileContainer}>
        {userData && (
          <section>
            <p className={classes.profileTitle}>Ime i prezime</p>
            <p>{userData.name}</p>
            <p className={classes.profileTitle}>Tip korisnika</p>
            <p>{userData.userType}</p>
            <p className={classes.profileTitle}>JMBG</p>
            <p>
              {userData.jmbg ? (
                userData.jmbg
              ) : (
                <p className={classes.errorText}>
                  Nemate JMBG. <Link to="/"> Ažurirajte nalog.</Link>
                </p>
              )}
            </p>
            <p className={classes.profileTitle}>Email</p>
            <p>{userData.email}</p>
            <p className={classes.profileTitle}>Korisnicko ime</p>
            <p>{userData.username}</p>
            <p className={classes.profileTitle}>Broj logovanja</p>
            <p>{loginCount}</p>
            <p className={classes.profileTitle}>Poslednji put logovan/a</p>
            <p>{getTimeElapsed()}</p>
          </section>
        )}
        <section>
          <div className={classes.profileImageBorder}>
            <img
              src={userData.profilePicture}
              alt="profile avatar"
              width="300"
              height="300"
            />
          </div>
        </section>
      </div>
      <div className={classes.profileActions}>
        <div className={classes.profileButton}>
          <img src="/images/icons/reset-icon.svg" alt="reset icon" />
          <p>Resetuj sifru</p>
        </div>
        <div className={classes.profileButton}>
          <img src="/images/icons/edit-icon.svg" alt="edit icon" />
          <p>Izmjeni podatke</p>
        </div>
        <div
          className={classes.profileButton}
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

export default Profile;

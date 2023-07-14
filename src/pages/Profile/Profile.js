import { Fragment } from "react";

import classes from "../../styles/Profile.module.css";

const deleteItems = [
  { name: "Izbrisi profil", image: "/images/icons/trash-icon.svg", path: "/" },
];

const Profile = (props) => {
  let buttonRef;

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
      <div className={classes.profileContainer}>
        <section>
          <p className={classes.profileTitle}>Ime i prezime</p>
          <p>Valentina Kascelan</p>
          <p className={classes.profileTitle}>Tip korisnika</p>
          <p>Bibliotekar</p>
          <p className={classes.profileTitle}>JMBG</p>
          <p>1546213456878</p>
          <p className={classes.profileTitle}>Email</p>
          <p>valentina.kascelan@domain.net</p>
          <p className={classes.profileTitle}>Korisnicko ime</p>
          <p>valentina.kascelan</p>
          <p className={classes.profileTitle}>Broj logovanja</p>
          <p>30</p>
          <p className={classes.profileTitle}>Poslednji put logovan/a</p>
          <p>Juce 11:57 AM</p>
        </section>
        <section>
          <div className={classes.profileImageBorder}>
            <img
              src="/images/placeholders/female-pic.jpg"
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

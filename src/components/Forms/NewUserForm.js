import React, { useState } from "react";
import classes from "./NewUserForm.module.css";

const NewUserForm = () => {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userJMBG, setUserJMBG] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");

  const changeUserNameHandler = (event) => {
    setUserName(event.target.value);
  };
  const changeUserTypeHandler = (event) => {
    setUserType(event.target.value);
  };
  const changeUserJMBGHandler = (event) => {
    setUserJMBG(event.target.value);
  };
  const changeUserEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const changeUserUsernameHandler = (event) => {
    setUserUsername(event.target.value);
  };
  const changeUserPasswordHandler = (event) => {
    setUserPassword(event.target.value);
  };
  const changeUserCheckPasswordHandler = (event) => {
    setUserCheckPassword(event.target.value);
  };

  const newUser = {
    userName,
    userType,
    userJMBG,
    userEmail,
    userUsername,
    userPassword,
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(newUser);
  };

  return (
    <div>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <section className={classes.info}>
          <label>
            Ime i prezime<span className={classes.required}></span>
          </label>
          <input
            type="text"
            value={userName}
            onChange={changeUserNameHandler}
            required
          />

          <label>
            Tip korisnika<span className={classes.required}></span>
          </label>
          <select value={userType} onChange={changeUserTypeHandler} required>
            <option>Bibliotekar</option>
            <option>Učenik</option>
          </select>

          <label>
            JMBG<span className={classes.required}></span>
          </label>
          <input
            type="number"
            value={userJMBG}
            onChange={changeUserJMBGHandler}
            required
          />

          <label>
            E-mail<span className={classes.required}></span>
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={changeUserEmailHandler}
            required
          />

          <label>
            Korisničko ime<span className={classes.required}></span>
          </label>
          <input
            type="text"
            value={userUsername}
            onChange={changeUserUsernameHandler}
            required
          />

          <label>
            Šifra<span className={classes.required}></span>
          </label>
          <input
            type="password"
            value={userPassword}
            onChange={changeUserPasswordHandler}
            required
          />

          <label>
            Ponovi šifru<span className={classes.required}></span>
          </label>
          <input
            type="password"
            value={userCheckPassword}
            onChange={changeUserCheckPasswordHandler}
            required
          />
        </section>

        <section className={classes.image}>
          <input type="file" accept="image/*" />
        </section>

        <section className={classes.buttons}>
          <button className={classes.button} type="reset">
            Poništi
          </button>
          <button className={classes.button} type="submit">
            Sačuvaj
          </button>
        </section>
      </form>
    </div>
  );
};

export default NewUserForm;

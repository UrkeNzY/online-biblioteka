import React, { useState } from "react";
import { BsCameraFill } from "react-icons/bs";

import classes from "../../../styles/Forms.module.css";

import InputText from "../../../components/Forms/InputText";
import InputSelect from "../../../components/Forms/InputSelect";

const NewUserForm = () => {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userJMBG, setUserJMBG] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");
  const [userImage, setUserImage] = useState(null);

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

  const changeUserImageHandler = (event) => {
    const file = event.target.files[0];
    setUserImage(file);
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
    setUserName("");
    setUserType("");
    setUserJMBG("");
    setUserEmail("");
    setUserUsername("");
    setUserPassword("");
    setUserCheckPassword("");
    setUserImage(null);
  };

  return (
      <form className={classes.form} onSubmit={submitFormHandler}>
        <section className={classes.info}>
          <InputText
            labelText="Ime i prezime"
            type="text"
            id="userName"
            value={userName}
            onChange={changeUserNameHandler}
          />

          <InputSelect
            labelText="Tip korisnika"
            id="userType"
            value={userType}
            onChange={changeUserTypeHandler}
            required
            options={["", "Bibliotekar", "Učenik"]}
          />

          <InputText
            labelText="JMBG"
            type="number"
            id="userJMBG"
            value={userJMBG}
            onChange={changeUserJMBGHandler}
          />

          <InputText
            labelText="E-mail"
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={changeUserEmailHandler}
          />

          <InputText
            labelText="Korisničko ime"
            id="userUsername"
            value={userUsername}
            onChange={changeUserUsernameHandler}
          />

          <InputText
            labelText="Šifra"
            type="password"
            id="userPassword"
            value={userPassword}
            onChange={changeUserPasswordHandler}
          />

          <InputText
            labelText="Ponovi šifru"
            type="password"
            id="userCheckPassword"
            value={userCheckPassword}
            onChange={changeUserCheckPasswordHandler}
          />
        </section>

        <section className={classes.image}>
          <label htmlFor="fileInput" className={classes.customFileInput}>
            <BsCameraFill className={classes.icon} />
            {userImage ? "Promeni profilnu sliku" : "Dodaj profilnu sliku"}
          </label>
          <input
            id="fileInput"
            className={classes.fileInput}
            type="file"
            accept="image/*"
            onChange={changeUserImageHandler}
          />
          <div className={classes.userImageHolder}>
            {userImage && (
              <img
                src={URL.createObjectURL(userImage)}
                alt="user profile avatar"
              />
            )}
          </div>
        </section>
      </form>
  );
};

export default NewUserForm;

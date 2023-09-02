import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { BsCameraFill } from "react-icons/bs";
import {
  createUser,
  updateUser,
  updateMe,
  userInfo,
  listSingleUser,
} from "../../../services/users";

import classes from "../../../styles/Forms.module.css";

import InputText from "../../../components/Forms/InputText";
import InputSelect from "../../../components/Forms/InputSelect";
import FormButtons from "../../../components/Forms/FormButtons";
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";

const NewUserForm = () => {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userJMBG, setUserJMBG] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [fetchedUserData, setFetchedUserData] = useState({});
  const [inputErrors, setInputErrors] = useState({
    userName: [],
    userEmail: [],
    userType: [],
    userJMBG: [],
    userPassword: [],
    userUsername: [],
  });
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState();

  const dropdownOptions = [
    { id: 0, name: "" },
    { id: 1, name: "Bibliotekar" },
    { id: 2, name: "Učenik" },
    { id: 3, name: "Administrator" },
  ];

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id === "me") {
          const userInformation = await userInfo();

          const selectedOption = dropdownOptions.find(
            (option) => option.name === userInformation.data.role
          );
          console.log(userInformation.data.role);
          setFetchedUserData(userInformation.data);
          setUserName(
            userInformation.data.name + " " + userInformation.data.surname || ""
          );
          setUserType(selectedOption || "");
          setUserJMBG(userInformation.data.jmbg || "");
          setUserEmail(userInformation.data.email || "");
          setUserUsername(userInformation.data.username || "");
          setUserPassword("");
          setUserCheckPassword("");
          setUserImage(null);
        } else {
          const userInformation = await listSingleUser(id);
          const selectedOption = dropdownOptions.find(
            (option) => option.name === userInformation.data.role
          );
          console.log(selectedOption.id);
          setFetchedUserData(userInformation.data);
          setUserName(
            userInformation.data.name + " " + userInformation.data.surname || ""
          );
          setUserType(selectedOption || "");
          setUserJMBG(userInformation.data.jmbg || "");
          setUserEmail(userInformation.data.email || "");
          setUserUsername(userInformation.data.username || "");
          setUserPassword("");
          setUserCheckPassword("");
          setUserImage(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const changeUserNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const changeUserTypeHandler = (value) => {
    setUserType(value);
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

  const submitFormHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const [name, surname] = userName.split(" ");
    console.log("first name: " + name + " last name: " + surname);

    try {
      if (id === "me") {
        await updateMe({
          role_id: userType,
          name: name,
          surname: surname,
          jmbg: userJMBG,
          email: userEmail,
          username: userUsername,
          password: userPassword,
          password_confirmation: userCheckPassword,
          photoPath: "https://tim6.petardev.live/img/profile.jpg",
        });
      } else if (id) {
        await updateUser(id, {
          role_id: userType,
          name: name,
          surname: surname,
          jmbg: userJMBG,
          email: userEmail,
          username: userUsername,
          password: userPassword,
          password_confirmation: userCheckPassword,
          photoPath: "",
        });
      } else {
        const userToCreate = {
          role_id: userType,
          name: name,
          surname: surname,
          jmbg: userJMBG,
          email: userEmail,
          username: userUsername,
          password: userPassword,
          password_confirmation: userCheckPassword,
        };

        const response = await createUser(userToCreate);
        console.log("created user", response.data);
      }

      setUserName("");
      setUserType("");
      setUserJMBG("");
      setUserEmail("");
      setUserUsername("");
      setUserPassword("");
      setUserCheckPassword("");
      setUserImage(null);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const errorData =
          error.response.data.errors || error.response.data.data;

        setInputErrors({
          userName: errorData.name || [],
          userEmail: errorData.email || [],
          userType: errorData.role_id || [],
          userJMBG: errorData.jmbg || [],
          userPassword: errorData.password || [],
          userUsername: errorData.username || [],
        });
        setIsLoading(false);
      } else {
        setInputErrors({
          userName: ["An error occurred during the request"],
          userEmail: [],
          userType: [],
          userJMBG: [],
          userUsername: [],
        });
        setIsLoading(false);
      }
      return;
    }
    console.log(fetchedUserData);
    navigate(userType === 1 ? "/librarians" : "/students");
  };

  useEffect(() => {
    const hasValue =
      userName.trim() !== "" ||
      userType !== "" ||
      userJMBG.trim() !== "" ||
      userEmail.trim() !== "" ||
      userUsername.trim() !== "" ||
      userPassword.trim() !== "" ||
      userCheckPassword.trim() !== "" ||
      userImage !== null;

    setIsFormEmpty(!hasValue);
  }, [
    userName,
    userType,
    userJMBG,
    userEmail,
    userUsername,
    userPassword,
    userCheckPassword,
    userImage,
  ]);

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
        {inputErrors.userName.map((errorMessage, index) => (
          <p key={index} className={classes.errorMessage}>
            {errorMessage}
          </p>
        ))}
        <InputSelect
          labelText="Tip korisnika"
          id="userType"
          value={userType}
          onSelect={changeUserTypeHandler}
          required
          options={dropdownOptions}
        />
        <InputText
          labelText="JMBG"
          type="number"
          id="userJMBG"
          value={userJMBG}
          onChange={changeUserJMBGHandler}
        />
        {inputErrors.userJMBG.map((errorMessage, index) => (
          <p className={classes.errorText} key={index}>
            {errorMessage}
          </p>
        ))}
        <InputText
          labelText="E-mail"
          type="email"
          id="userEmail"
          value={userEmail}
          onChange={changeUserEmailHandler}
        />
        {inputErrors.userEmail.map((errorMessage, index) => (
          <p className={classes.errorText} key={index}>
            {errorMessage}
          </p>
        ))}
        <InputText
          labelText="Korisničko ime"
          id="userUsername"
          value={userUsername}
          onChange={changeUserUsernameHandler}
        />
        {inputErrors.userUsername.map((errorMessage, index) => (
          <p className={classes.errorText} key={index}>
            {errorMessage}
          </p>
        ))}
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
        {inputErrors.userPassword.map((errorMessage, index) => (
          <p className={classes.errorText} key={index}>
            {errorMessage}
          </p>
        ))}
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
        {isLoading && (
          <LoadingSpinner loadingSpinner="/images/icons/form-submit-loading-spinner.gif" />
        )}
        <FormButtons label="Sačuvaj" disabled={isFormEmpty} />
      </section>
    </form>
  );
};

export default NewUserForm;

import { Fragment } from "react";

import classes from "../../styles/Forms.module.css";

import NewUserForm from "./components/NewUserForm";

const NewUser = () => {
  return (
    <Fragment>
      <div className={classes.formContainer}>
        <NewUserForm />
      </div>
    </Fragment>
  );
};

export default NewUser;

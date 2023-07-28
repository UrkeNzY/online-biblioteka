import { Fragment } from "react";
import classes from "../../styles/Forms.module.css";

import NewUserForm from "./components/NewUserForm";
import FormButtons from "../../components/Forms/FormButtons";

const NewUser = () => {
  return (
    <Fragment>
      <div className={classes.formContainer}>
        <NewUserForm />
      </div>
      <FormButtons />
    </Fragment>
  );
};

export default NewUser;

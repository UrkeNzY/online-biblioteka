import { Fragment } from "react";

import classes from "../../styles/Forms.module.css";

import InputText from "../../components/Forms/InputText";
import FormButtons from "../../components/Forms/FormButtons";

const NewAuthor = () => {
  return (
    <Fragment>
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <section>
            <InputText labelText="Ime i prezime" type="text" id="authorName" />
            <label htmlFor="authorDescription">Opis</label>
            <textarea
              type="text"
              id="authorDescription"
              className={classes.textarea}
            />
          </section>
        </form>
      </div>
      <FormButtons />
    </Fragment>
  );
};

export default NewAuthor;

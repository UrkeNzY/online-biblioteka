import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import classes from "../../styles/Forms.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import FormButtons from "../../components/Forms/FormButtons";

const NewBook = () => {
  const submitFormHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <TabSection
        tabItems={[
          { text: "Osnovni detalji", path: "/new-book/general" },
          { text: "Specifikacija", path: "/new-book/specs" },
          { text: "Multimedija", path: "/new-book/media" },
        ]}
      />
      <div className={classes.formContainer}>
        <Outlet />
      </div>
      <FormButtons submitFormHandler={submitFormHandler} />
    </Fragment>
  );
};

export default NewBook;

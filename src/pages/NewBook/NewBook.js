import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useCreateBookContext } from "../../state/CreateBookContext";

import classes from "../../styles/Forms.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import FormButtons from "../../components/Forms/FormButtons";

const NewBook = () => {
  const { submitFormHandler, resetValuesHandler } = useCreateBookContext();

  const createBookHandler = () => {
    submitFormHandler();
  };

  const resetBookDataHandler = () => {
    resetValuesHandler();
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
      <FormButtons
        onClick={createBookHandler}
        onClickAlt={resetBookDataHandler}
      />
    </Fragment>
  );
};

export default NewBook;

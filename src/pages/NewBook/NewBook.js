import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useCreateBookContext } from "../../state/CreateBookContext";

import classes from "../../styles/Forms.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import FormButtons from "../../components/Forms/FormButtons";

const NewBook = () => {
  const {
    submitFormHandler,
    resetValuesHandler,
    updateFormHandler,
    isEditing,
  } = useCreateBookContext();

  const createBookHandler = () => {
    submitFormHandler();
  };

  const editBookHandler = () => {
    updateFormHandler();
  };

  const resetBookDataHandler = () => {
    resetValuesHandler();
  };

  return (
    <Fragment>
      <TabSection
        tabItems={[
          {
            text: "Osnovni detalji",
            path: `/new-book/general${isEditing ? "/edit" : ""}`,
          },
          {
            text: "Specifikacija",
            path: `/new-book/specs${isEditing ? "/edit" : ""}`,
          },
          {
            text: "Multimedija",
            path: `/new-book/media${isEditing ? "/edit" : ""}`,
          },
        ]}
      />
      <div className={classes.formContainer}>
        <Outlet />
      </div>
      <FormButtons
        onClick={!isEditing ? createBookHandler : editBookHandler}
        onClickAlt={resetBookDataHandler}
      />
    </Fragment>
  );
};

export default NewBook;

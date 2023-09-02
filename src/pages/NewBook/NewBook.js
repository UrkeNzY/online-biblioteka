import { Fragment } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCreateBookContext } from "../../state/CreateBookContext";

import classes from "../../styles/Forms.module.css";

import TabSection from "../../components/UI/Tabs/TabSection";
import FormButtons from "../../components/Forms/FormButtons";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const NewBook = () => {
  const {
    submitFormHandler,
    resetValuesHandler,
    updateFormHandler,
    isLoading,
    isEditing,
    hasError,
  } = useCreateBookContext();

  const navigate = useNavigate();
  const location = useLocation();

  const createBookHandler = () => {
    if (location.pathname === "/new-book/general" && !hasError) {
      navigate("/new-book/specs");
      return;
    } else if (location.pathname === "/new-book/specs" && !hasError) {
      navigate("/new-book/media");
      return;
    }
    submitFormHandler();
  };

  const editBookHandler = () => {
    if (location.pathname === "/new-book/general/edit" && !hasError) {
      navigate("/new-book/specs/edit");
      return;
    } else if (location.pathname === "/new-book/specs/edit" && !hasError) {
      navigate("/new-book/media/edit");
      return;
    }
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
        disabled={hasError}
      />
      {isLoading && (
        <LoadingSpinner loadingSpinner="/images/icons/form-submit-loading-spinner.gif" />
      )}
    </Fragment>
  );
};

export default NewBook;

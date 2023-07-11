import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import classes from '../../styles/Forms.module.css';

import TabSection from "../../components/UI/Tabs/TabSection";
import FormButtons from "../../components/Forms/FormButtons";

const NewBook = () => {
  return (
    <Fragment>
      <TabSection
        tabItems={[
          { text: "Osnovni detalji", path: "/new-book" },
          { text: "Specifikacija", path: "/new-book/specs" },
          { text: "Multimedija", path: "/new-book/media" },
        ]}
      />
      <div className={classes.formContainer}>
      <Outlet />
      </div>
      <FormButtons />
    </Fragment>
  );
};

export default NewBook;

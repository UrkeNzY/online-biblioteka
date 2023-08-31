import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import TabSection from "../../components/UI/Tabs/TabSection";

const Settings = () => {
  return (
    <Fragment>
      <TabSection
        tabItems={[
          { text: "Polisa", path: "/settings/policies" },
          { text: "Kategorije", path: "/settings/categories" },
          { text: "Zanrovi", path: "/settings/genres" },
          { text: "Izdavac", path: "/settings/publishers" },
          { text: "Povez", path: "/settings/bindings" },
          { text: "Format", path: "/settings/formats" },
          { text: "Pismo", path: "/settings/writing" },
          { text: "Jezik", path: "/settings/languages" },
        ]}
      />
      <Outlet />
    </Fragment>
  );
};

export default Settings;

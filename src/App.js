import { Fragment } from "react";

import MainHeader from "./components/UI/MainHeader";
import Sidebar from "./components/UI/Sidebar";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <Sidebar />
      </main>
    </Fragment>
  );
}

export default App;

import { Fragment } from "react";

import NewUserForm from "./components/NewUserForm";
import MainHeader from "./components/UI/MainHeader";
import Sidebar from "./components/UI/Sidebar";

function App() {
  return (
    <div className="App">
      <Fragment>
        <MainHeader />
        <main>
          {/* <Sidebar /> */}
          <NewUserForm />
        </main>
      </Fragment>
    </div>
  );
}
export default App;

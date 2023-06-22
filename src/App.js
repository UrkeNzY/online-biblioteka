import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import MainHeader from "./components/UI/MainHeader";
import Sidebar from "./components/UI/Sidebar";
import ContentHeader from "./components/UI/ContentHeader";
import NewUserForm from "./components/Forms/NewUserForm";
import NewBookForm from "./components/Forms/NewBookForm";

function App() {
  return (
    <div className="App">
      <Fragment>
        <MainHeader />
        <main className="mainContainer">
          <Sidebar />
          <div className="contentContainer">
            <ContentHeader />
            <Routes>
              <Route path="/new-user" element={<NewUserForm />} />
              <Route path="/new-book" element={<NewBookForm />} />
            </Routes>
          </div>
        </main>
      </Fragment>
    </div>
  );
}

export default App;

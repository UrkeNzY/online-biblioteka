import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';

import MainHeader from "./components/UI/MainHeader";
import Sidebar from "./components/UI/Sidebar";
import NewUserForm from "./components/NewUserForm";

function App() {
  return (
    <div className="App">
      <Fragment>
        <MainHeader />
        <main className="mainContainer">
          <Sidebar />
          <div className="contentContainer">
            <Routes>
              <Route path="/new-user" element={<NewUserForm />} />
            </Routes>
          </div>
        </main>
      </Fragment>
    </div>
  );
}

export default App;

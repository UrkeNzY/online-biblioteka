<<<<<<< HEAD
import './App.css';
import NewUserForm from './components/NewUserForm';

function App() {
  return (
    <div className="App">
      <NewUserForm/>
    </div>
=======
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
>>>>>>> da49e2883e995d070642e52feaf4deb5854c06a0
  );
}

export default App;

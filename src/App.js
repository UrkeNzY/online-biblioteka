import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import MainHeader from "./components/UI/Main Page/MainHeader";
import Sidebar from "./components/UI/Main Page/Sidebar";
import ContentHeader from "./components/UI/Main Page/ContentHeader";
import DropdownCard from "./components/UI/DropdownCard";
import NewUserForm from "./components/Forms/NewUserForm";
import NewBookForm from "./components/Forms/NewBookForm";
import Librarians from "./components/pages/Librarians";
import Students from "./components/pages/Ucenici";
import Authors from "./components/pages/Authors";
import Books from "./components/pages/Knjige";

function App() {
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState(null);

  const fetchDropdownItems = (items) => {
    setDropdownItems(items);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const getButtonRef = (ref) => {
    setButtonRef(ref);
  };

  return (
    <div className="App">
      <Fragment>
        <MainHeader getItems={fetchDropdownItems} getButtonRef={getButtonRef} />
        <main className="mainContainer">
          <Sidebar />
          <div className="contentContainer">
            <ContentHeader />
            <Routes>
              <Route path="/librarians" element={<Librarians />} />
              <Route path="/students" element={<Students />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/book-record" element={<Books />} />
              <Route path="/new-user" element={<NewUserForm />} />
              <Route path="/new-book" element={<NewBookForm />} />
            </Routes>
            {isDropdownOpen && (
              <DropdownCard
                items={dropdownItems}
                button={buttonRef}
                close={toggleDropdown}
              />
            )}
          </div>
        </main>
      </Fragment>
    </div>
  );
}

export default App;

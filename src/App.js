import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./styles/App.css";

import MainHeader from "./layout/MainHeader";
import Sidebar from "./layout/Sidebar";
import ContentHeader from "./layout/ContentHeader";
import DropdownCard from "./components/UI/DropdownCards/DropdownCard";
import NewUser from "./pages/NewUser/NewUser";
import NewBook from "./pages/NewBook/NewBook";
import NewBookForm from "./pages/NewBook/components/NewBookForm";
import NewBookSpecs from "./pages/NewBook/components/NewBookSpecs";
import NewBookMedia from "./pages/NewBook/components/NewBookMedia";
import NewAuthor from "./pages/NewAuthor/NewAuthor";
import Librarians from "./pages/Librarians/Librarians";
import Students from "./pages/Students/Students";
import Authors from "./pages/Authors/Authors";
import Books from "./pages/Books/Books";
import Profile from "./pages/Profile/Profile";

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
              <Route path="/new-user" element={<NewUser />} />
              <Route path="/new-book" element={<NewBook />}>
                <Route path="/new-book/general" element={<NewBookForm />} />
                <Route path="/new-book/specs" element={<NewBookSpecs />} />
                <Route path="/new-book/media" element={<NewBookMedia />} />
              </Route>
              <Route path="/new-author" element={<NewAuthor />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    getItems={fetchDropdownItems}
                    getButtonRef={getButtonRef}
                  />
                }
              />
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

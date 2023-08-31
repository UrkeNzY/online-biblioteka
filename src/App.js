import React, { Fragment, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalContext } from "./state/GlobalState";
import { GlobalProvider } from "./state/GlobalState";
import { CreateBookProvider } from "./state/CreateBookContext";

import "./styles/App.css";

import Dashboard from "./pages/Dashboard/Dashboard";
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
import Settings from "./pages/Settings/Settings";
import PoliciesTab from "./pages/Settings/components/PoliciesTab";
import CategoriesTab from "./pages/Settings/components/CategoriesTab";
import GenresTab from "./pages/Settings/components/GenresTab";
import PublishersTab from "./pages/Settings/components/PublishersTab";
import BindingsTab from "./pages/Settings/components/BindingTab";
import FormatsTab from "./pages/Settings/components/FormatsTab";
import WritingTab from "./pages/Settings/components/WritingTab";
import LanguagesTab from "./pages/Settings/components/LanguagesTab";
import BookDetails from "./pages/BookDetails/BookDetails";
import BookMainDetails from "./pages/BookDetails/components/BookMainDetails";
import BookSpecDetails from "./pages/BookDetails/components/BookSpecDetails";
import BookIssueDetails from "./pages/BookDetails/components/BookIssueDetails";
import BookMediaDetails from "./pages/BookDetails/components/BookMediaDetails";
import BookReserve from "./pages/BookDetails/components/BookActions/BookReserve";
import BookIssue from "./pages/BookDetails/components/BookActions/BookIssue";
import BookReturn from "./pages/BookDetails/components/BookActions/BookReturn";
import BookIssuances from "./pages/BookIssuances/BookIssuances";
import BookWriteOff from "./pages/BookDetails/components/BookActions/BookWriteOff";
import LoginForm from "./components/Auth/Login/LoginForm";
import SignupForm from "./components/Auth/Signup/SignupForm";
import Logout from "./pages/Logout/Logout";

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

  function AuthenticatedRoute({ children }) {
    const { user } = useContext(GlobalContext);

    const isAuthenticated = !!user?.token;

    console.log("Checking...");

    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
  }

  function UnauthenticatedRoute({ children }) {
    const { user } = useContext(GlobalContext);

    const isAuthenticated = !!user?.token;

    console.log("Checking...");

    return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
  }

  function AuthenticatedPage({ children }) {
    return (
      <Fragment>
        <MainHeader getItems={fetchDropdownItems} getButtonRef={getButtonRef} />
        <main className="mainContainer">
          <Sidebar />
          <div className="contentContainer">
            <ContentHeader />
            {children}
          </div>
        </main>
      </Fragment>
    );
  }

  function Router() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Dashboard />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/librarians"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Librarians />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Students />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/authors"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Authors />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/book-record"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Books />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/new-user/:id?"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <NewUser />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/new-book"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <CreateBookProvider>
                  <NewBook />
                </CreateBookProvider>
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        >
          <Route path="/new-book/general/*" element={<NewBookForm />} />
          <Route path="/new-book/specs/*" element={<NewBookSpecs />} />
          <Route path="/new-book/media/*" element={<NewBookMedia />} />
        </Route>
        <Route
          path="/new-author"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <NewAuthor />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/book-issuing"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <BookIssuances />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Profile
                  getItems={fetchDropdownItems}
                  getButtonRef={getButtonRef}
                />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Logout />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <Settings />
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        >
          <Route path="/settings/policies" element={<PoliciesTab />} />
          <Route path="/settings/categories" element={<CategoriesTab />} />
          <Route path="/settings/genres" element={<GenresTab />} />
          <Route path="/settings/publishers" element={<PublishersTab />} />
          <Route path="/settings/bindings" element={<BindingsTab />} />
          <Route path="/settings/formats" element={<FormatsTab />} />
          <Route path="/settings/writing" element={<WritingTab />} />
          <Route path="/settings/languages" element={<LanguagesTab />} />
        </Route>
        <Route
          path="/book/:id"
          element={
            <AuthenticatedRoute>
              <AuthenticatedPage>
                <CreateBookProvider>
                  <BookDetails
                    getItems={fetchDropdownItems}
                    getButtonRef={getButtonRef}
                  />
                </CreateBookProvider>
              </AuthenticatedPage>
            </AuthenticatedRoute>
          }
        >
          <Route path="/book/:id/main-details" element={<BookMainDetails />} />
          <Route
            path="/book/:id/specifications"
            element={<BookSpecDetails />}
          />
          <Route path="/book/:id/issuing" element={<BookIssueDetails />} />
          <Route path="/book/:id/multimedia" element={<BookMediaDetails />} />
          <Route path="/book/:id/reserve" element={<BookReserve />} />
          <Route path="/book/:id/issue" element={<BookIssue />} />
          <Route path="/book/:id/return" element={<BookReturn />} />
          <Route path="/book/:id/writeOff" element={<BookWriteOff />} />
        </Route>

        <Route
          exact
          path="/signin"
          element={
            <UnauthenticatedRoute>
              <LoginForm />
            </UnauthenticatedRoute>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <UnauthenticatedRoute>
              <SignupForm />
            </UnauthenticatedRoute>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="App">
      <GlobalProvider>
        <Router />
        {isDropdownOpen && (
          <DropdownCard
            items={dropdownItems}
            button={buttonRef}
            close={toggleDropdown}
          />
        )}
      </GlobalProvider>
    </div>
  );
}

export default App;

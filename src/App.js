import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import MainHeader from "./components/UI/MainHeader";
import Sidebar from "./components/UI/Sidebar";
import ContentHeader from "./components/UI/ContentHeader";
import NewUserForm from "./components/Forms/NewUserForm";

import { GlobalContext } from "./state/GlobalState";
import { GlobalProvider } from "./state/GlobalState";

import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
import Home from "./components/Home/Home";

function AuthenticatedRoute({ children }) {
  const { user } = useContext(GlobalContext);
  return user?.token ? <>{children}</> : <Navigate to="/signin" />;
}

function AuthenticatedPage({ children }) {
  return (
    <Fragment>
      <MainHeader />
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
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <AuthenticatedPage>
              <Home />
            </AuthenticatedPage>
          </AuthenticatedRoute>
        }
      />

      <Route
        path="/newUser"
        element={
          <AuthenticatedRoute>
            <AuthenticatedPage>
  
            </AuthenticatedPage>
          </AuthenticatedRoute>
        }
      />

      <Route exact path="/signin" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router />
      </GlobalProvider>
    </div>
  );
}

export default App;

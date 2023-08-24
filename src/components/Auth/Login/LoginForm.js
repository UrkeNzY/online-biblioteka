import { React, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../state/GlobalState";

import classes from "../../../styles/AuthForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

export default function LoginForm() {
  const { signIn, loading } = useContext(GlobalContext);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn({ username, password, device: "DivajsNejm" });
  };

  return (
    <Fragment>
      <div className={classes.formBackground}>
        <div className={classes.leftBackground}></div>
        <div className={classes.loginForm}>
          <section className={classes.sideImage}>
            <div>
              <img src="/images/logo.svg" alt="Site logo" />
              <p>Online Biblioteka</p>
            </div>
          </section>
          <section className={classes.auth}>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
              <div className={classes.control}>
                <label>Username</label>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="JohnDoe"
                />
              </div>
              <div className={classes.control}>
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
              </div>
              <div className={classes.action}>
                <button type="submit" className={classes.toggle}>
                  Login
                </button>
                <span className={classes.control}>
                  <p>
                    Don't have an account? <Link to="/signup">Sign Up!</Link>
                  </p>
                </span>
              </div>
            </form>
          </section>
          {loading && (
            <LoadingSpinner loadingSpinner="/images/icons/loading-spinner.gif" />
          )}
        </div>
      </div>
    </Fragment>
  );
}

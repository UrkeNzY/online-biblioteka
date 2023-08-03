import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../../../state/GlobalState";

import classes from "../../../styles/AuthForm.module.css";

export default function SignupForm() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const device = "DivajsNejm2";

  const { signUp } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUp({
      name,
      surname,
      email,
      username,
      password,
      password_confirmation: passwordConfirm,
      device,
    });
    navigate("", { replace: true });
  };

  return (
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
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputSections}>
              <div>
                <div className={classes.control}>
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className={classes.control}>
                  <label>Surname</label>
                  <input
                    type="text"
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Doe"
                  />
                </div>
                <div className={classes.control}>
                  <label>Username</label>
                  <input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="JohnDoe"
                  />
                </div>
                <div className={classes.control}>
                  <label>Email</label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                  />
                </div>
                <div>
                  <div className={classes.control}>
                    <label>Password</label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>
                <div className={classes.control}>
                  <label>Password Confirmation</label>
                  <input
                    type="password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Repeat your Password"
                  />
                </div>
              </div>
            </div>
            <div className={classes.action}>
              <button type="submit" className={classes.toggle}>
                Sign Up
              </button>
              <span className={classes.control}>
                <p>
                  Already have an account? <Link to="/signin">Sign In!</Link>
                </p>
              </span>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

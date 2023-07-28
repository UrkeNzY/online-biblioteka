import { React, useState, useContext } from "react";
import classes from "./LoginForm.module.css";
import { GlobalContext } from "../../state/GlobalState";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { signIn } = useContext(GlobalContext);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn({ username, password, device: "DivajsNejm" });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label>Username</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <button type="submit" className={classes.toggle}>
            Login
          </button>
          <span className={classes.control}><Link to="/signup">You Don't have an account? Sign Up!</Link></span>
        </div>
      </form>
    </section>
  );
}

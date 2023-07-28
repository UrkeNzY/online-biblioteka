import { useContext, useState } from "react";
import classes from "./SignupForm.module.css";
import { GlobalContext } from "../../state/GlobalState";
import { useNavigate, Link } from "react-router-dom";

export default function SignupForm() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [device, setDevice] = useState("DivajsNejm2");

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
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label>Surname</label>
          <input type="text" onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label>Username</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label>Password Confirmation</label>
          <input
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <button type="submit">
            Sign Up
          </button>
          <span className={classes.control}><Link  to="/signin">You have an account? Sign In!</Link></span>
        </div>
      </form>
    </section>
    //  <div>

    //   <form className={classes.form} onSubmit={handleSubmit}>
    //     <section className={classes.info}></section>

    //       <label>Name</label>
    //       <input type="text" onChange={(e) => setName(e.target.value)} />

    //       <label>Surname</label>
    //       <input type="text" onChange={(e) => setSurname(e.target.value)} />

    //  <label>Email</label>
    //  <input type="text" onChange={(e) => setEmail(e.target.value)} />

    //       <label>Username</label>
    //       <input type="text" onChange={(e) => setUserName(e.target.value)} />

    //       <label>
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />

    //       <label>Password Confirmation</label>
    //       <input
    //         type="password"
    //         onChange={(e) => setPasswordConfirm(e.target.value)}
    //       />

    //     <section className={classes.buttons}>
    //       {/* <button className={classes.button} type="reset">
    //         Poništi
    //       </button> */}
    //       <button className={classes.button} type="submit">
    //         Sign Up
    //       </button>
    //     </section>
    //   </form>
    // </div>
  );
}

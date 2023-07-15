import classes from "../../../styles/Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.button}>
      {props.image ? <img src={props.image} alt="button icon" width="13" height="13" /> : ""} {props.text}
    </button>
  );
};

export default Button;

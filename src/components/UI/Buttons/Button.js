import React from "react";
import { Link } from "react-router-dom";
import classes from "../../../styles/Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.button}>
      {props.image && (
        <img src={props.image} alt="button icon" width="13" height="13" />
      )}
      {props.to ? <Link to={props.to}>{props.text}</Link> : <p>{props.text}</p>}
    </button>
  );
};

export default Button;

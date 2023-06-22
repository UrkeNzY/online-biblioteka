import React from "react";
import classes from "./Inputs.module.css";

const InputText = (props) => {
  return (
    <div className={classes.inputSection}>
      <label htmlFor={props.id}>
        {props.labelText}
        <span className={classes.required}></span>
      </label>

      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required
      />
    </div>
  );
};

export default InputText;

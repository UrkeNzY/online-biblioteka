import React from "react";
import classes from "./Inputs.module.css";

const InputSelect = (props) => {
  return (
    <div className={classes.inputSection}>
      <label htmlFor={props.id}>
        {props.labelText}
        <span className={props.required ? classes.required : ""}></span>
      </label>

      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;

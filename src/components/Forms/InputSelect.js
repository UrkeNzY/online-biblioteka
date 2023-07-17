import React from "react";
import classes from "../../styles/Inputs.module.css";

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
          <option
            key={option.id ? option.id : Math.random()}
            value={option.name}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;

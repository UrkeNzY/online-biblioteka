import React from "react";

import classes from "../../styles/Inputs.module.css";
import FormMultiSelect from "./FormMultiSelect";

const InputSelect = (props) => {
  return (
    <div className={classes.inputSection}>
      <label htmlFor={props.id}>
        {props.labelText}
        <span className={props.required ? classes.required : ""}></span>
      </label>

      {props.multiselect ? (
        <FormMultiSelect
          id={props.id}
          options={props.options}
          onChange={props.onChange}
        />
      ) : (
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
      )}
    </div>
  );
};

export default InputSelect;

import React from "react";
import Select from "react-select";

import classes from "../../styles/Inputs.module.css";

const InputSelect = (props) => {
  const handleChange = (selectedOption) => {
    props.onSelect(
      selectedOption ? selectedOption.map((option) => option.value) : []
    );
  };

  const handleSingleChange = (event) => {
    const selectedValue = event.target.value;

    const selectedOption = props.options.find(
      (option) => option.name === selectedValue
    );

    props.onSelect(selectedOption ? selectedOption.id : null);
  };

  const options = props.options.map((option) => ({
    label: option.name,
    value: option,
  }));

  const singleOptions = props.options.map((option) => ({
    id: option.id,
    name: option.name,
  }));

  return (
    <div className={classes.inputSection}>
      <label htmlFor={props.id}>
        {props.labelText}
        <span className={props.required ? classes.required : ""}></span>
      </label>

      {props.multiselect ? (
        <div className={classes.multiSelectInputContainer}>
          <Select
            className={classes.multiSelectInput}
            id={props.id}
            options={options}
            value={props.value.name}
            onChange={handleChange}
            isMulti
            isSearchable
            placeholder=""
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                outline: state.isFocused ? '2px solid #4558be' : '',
              }),
              input: (baseStyles, state) => ({
                ...baseStyles,
                padding: "8.5px",
              }),
              multiValue: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#4558be",
                color: "white",
                borderRadius: "3px",
              }),
              multiValueLabel: (baseStyles, state) => ({
                ...baseStyles,
                color: "white",
              }),
              multiValueRemove: (styles, { data }) => ({
                ...styles,
                color: data.color,
                ":hover": {
                  backgroundColor: data.color,
                  color: "white",
                },
              }),
            }}
          />
        </div>
      ) : (
        <select
          id={props.id}
          value={props.value.name}
          onChange={handleSingleChange}
          required
        >
          {singleOptions.map((option) => (
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

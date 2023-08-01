import { useState } from "react";
import Select from "react-select";

import classes from "../../styles/Inputs.module.css";

const FormMultiSelect = (props) => {
  const [selected, setSelected] = useState([]);
  const options = props.options.map((option) => ({
    label: option.name,
    value: option,
  }));

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    console.log(selectedOption);
    props.getSelectedOptions(selectedOption); // Pass the selected option(s) directly
  };

  return (
    <div className={classes.multiSelectInputContainer}>
      <Select
        className={classes.multiSelectInput}
        id={props.id}
        options={options}
        value={selected}
        onChange={handleChange}
        isMulti
        isSearchable
        placeholder=""
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: "rgb(189, 189, 189) 1px solid",
            borderRadius: "3px",
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
  );
};

export default FormMultiSelect;

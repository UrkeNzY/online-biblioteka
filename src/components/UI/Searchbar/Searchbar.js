import { useState, Fragment } from "react";

import classes from "../../../styles/Searchbar.module.css";

const Searchbar = ({ updateFilteredData }) => {
  const [searchValue, setSearchValue] = useState("");
  const searchInputHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    updateFilteredData(value);
  };

  const clearSearchHandler = () => {
    setSearchValue("");
    updateFilteredData("");
  };

  return (
    <Fragment>
      <div className={classes.searchbarContainer}>
        <img src="/images/icons/search-icon.svg" alt="search icon" />
        <input
          className={classes.searchbar}
          type="text"
          onChange={searchInputHandler}
          value={searchValue}
          placeholder="Search..."
        />
        {searchValue ? (
          <img
            className={classes.clearIcon}
            onClick={clearSearchHandler}
            src="/images/icons/cross-icon.svg"
            alt="delete icon"
          />
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default Searchbar;

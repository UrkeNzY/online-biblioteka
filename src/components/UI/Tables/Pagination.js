import { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";

import classes from "../../../styles/Paginate.module.css";

const Pagination = ({ tableItems, filterItems }) => {
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalItems = tableItems.length;
  const defaultItemsPerPageValue = 6;

  const [pageCount, setPageCount] = useState(
    Math.ceil(totalItems / itemsPerPage)
  );

  const displayLoadedItems = useCallback(
    (newActivePage) => {
      const loadedItems = newActivePage * itemsPerPage;
      const displayItems = tableItems.slice(
        loadedItems,
        loadedItems + itemsPerPage
      );
      filterItems(displayItems);
    },
    [itemsPerPage, filterItems, tableItems]
  );

  useEffect(() => {
    displayLoadedItems(activePage);
  }, [activePage, itemsPerPage, displayLoadedItems]);

  const changePageHandler = ({ selected }) => {
    const newActivePage = selected;
    setActivePage(newActivePage);
  };

  const changeItemsPerPageHandler = (event) => {
    const selectedValue = parseInt(event.target.value);

    const newPageCount = Math.ceil(totalItems / selectedValue);
    setPageCount(newPageCount);

    if (activePage >= newPageCount) {
      setActivePage(newPageCount - 1);
    }

    setItemsPerPage(selectedValue);
  };

  return (
    <div className={classes.paginateContainer}>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePageHandler}
        containerClassName={`${classes.paginationButtons}`}
        previousLinkClassName={`${classes.previousButton}`}
        nextLinkClassName={`${classes.nextButton}`}
        disabledClassName={`${classes.paginationDisabled}`}
        activeClassName={`${classes.paginationActive}`}
      />
      <div className={classes.paginationOptions}>
        <p>Items per page</p>
        <select
          defaultValue={defaultItemsPerPageValue}
          onChange={changeItemsPerPageHandler}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;

import { useState, useEffect, Fragment } from "react";
import ReactPaginate from "react-paginate";

import classes from "../../../styles/Paginate.module.css";

const Pagination = ({ tableItems, onUpdateFilteredData }) => {
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const totalItems = tableItems.length;
  const defaultItemsPerPageValue = 6;

  const [pageCount, setPageCount] = useState(
    Math.ceil(totalItems / itemsPerPage)
  );

  useEffect(() => {
    const loadedItems = activePage * itemsPerPage;
    const displayItems = tableItems.slice(
      loadedItems,
      loadedItems + itemsPerPage
    );

    onUpdateFilteredData(displayItems);

    const pageCount = Math.ceil(totalItems / itemsPerPage);
    setPageCount(pageCount);
  }, [activePage, totalItems, itemsPerPage, tableItems, onUpdateFilteredData]);

  const changePageHandler = ({ selected }) => {
    const newActivePage = selected;
    setActivePage(newActivePage);
  };

  const changeItemsPerPageHandler = (event) => {
    const selectedValue = parseInt(event.target.value);

    const newPageCount = Math.ceil(totalItems / selectedValue);
    setPageCount(newPageCount);

    if (activePage >= newPageCount) {
      setActivePage(Math.min(activePage, newPageCount - 1));
    }

    setItemsPerPage(selectedValue);
  };

  return (
    <div className={classes.paginateContainer}>
      {pageCount > 0 && (
        <Fragment>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePageHandler}
            forcePage={activePage}
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
        </Fragment>
      )}
    </div>
  );
};

export default Pagination;

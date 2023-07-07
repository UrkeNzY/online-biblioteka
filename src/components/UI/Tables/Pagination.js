import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import classes from "../../../styles/Paginate.module.css";

const Pagination = (props) => {
    const [activePage, setActivePage] = useState(0);
    const itemsPerPage = 6;
    const totalItems = props.tableItems.length;
    const pageCount = Math.ceil(totalItems / itemsPerPage);
  
    const displayLoadedItems = (newActivePage) => {
      const loadedItems = newActivePage * itemsPerPage;
      const displayItems = props.tableItems.slice(
        loadedItems,
        loadedItems + itemsPerPage
      );
      props.filterItems(displayItems);
    };
  
    useEffect(() => {
      displayLoadedItems(activePage);
    }, [activePage]);
  
    const changePageHandler = ({ selected }) => {
      const newActivePage = selected;
      setActivePage(newActivePage);
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
      </div>
    );
  };

export default Pagination;

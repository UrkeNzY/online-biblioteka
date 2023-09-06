import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

import classes from "../../../styles/Table.module.css";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const BookTable = (props) => {
  const {
    tableColumns,
    tableData,
    isLoading,
    selectedRows,
    onSelectedRowsChange,
  } = props;
  const [filteredData, setFilteredData] = useState(tableData);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

  const updateFilteredData = useCallback((filteredItems) => {
    setFilteredData(filteredItems);
  }, []);

  const handleHeaderCheckboxClick = () => {
    setSelectAll(!selectAll);
    if (onSelectedRowsChange) {
      onSelectedRowsChange(selectAll ? [] : filteredData.map((row) => row.id));
    }
  };

  const handleRowSelect = (rowId) => {
    if (onSelectedRowsChange) {
      if (selectedRows.includes(rowId)) {
        onSelectedRowsChange(selectedRows.filter((id) => id !== rowId));
      } else {
        onSelectedRowsChange([...selectedRows, rowId]);
      }
    }
  };

  useEffect(() => {
    if (onSelectedRowsChange) {
      if (selectAll) {
        onSelectedRowsChange(filteredData.map((row) => row.id));
      } else {
        onSelectedRowsChange([]);
      }
    }
  }, [selectAll, filteredData]);

  return (
    <Fragment>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <colgroup>
            <col key="colCheckbox" style={{ width: "5%" }} />
            {tableColumns.map((column) => (
              <col key={column.field} style={{ width: column.width }} />
            ))}
            <col key="colLast" style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={classes.checkbox}
                  checked={selectAll}
                  onChange={handleHeaderCheckboxClick}
                />
              </th>
              {tableColumns.map((column) => (
                <th key={column.field}>{column.header}</th>
              ))}
              <th colSpan={4}></th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {filteredData?.slice(0, 6).map((table) => (
                <tr key={table.id}>
                  <td>
                    <input
                      type="checkbox"
                      className={classes.checkbox}
                      checked={selectedRows && selectedRows.includes(table.id)}
                      onChange={() => handleRowSelect(table.id)}
                    />
                  </td>
                  <td>
                    <div className={classes.userColumnData}>
                      {table.bookName ? (
                        <div className={classes.issuanceBookInfo}>
                          <img src={table.bookCover} alt="book cover" />
                          <Link to={`/book/${table.bookId}/main-details`}>
                            {table.bookName}
                          </Link>
                        </div>
                      ) : table.link && !table.bookName ? (
                        <Link to={table.link}>{table.name}</Link>
                      ) : !table.bookName ? (
                        <p>{table.name}</p>
                      ) : (
                        ""
                      )}
                    </div>

                    {table.reservationDate && !table.bookCover
                      ? table.reservationDate
                      : ""}
                  </td>
                  {table.reservationDate && table.bookCover ? (
                    <td>{table.reservationDate}</td>
                  ) : (
                    ""
                  )}
                  {!table.bookName && table.link && table.issuancesPage ? (
                    <td>
                      <Link to={table.link}>{table.name}</Link>
                    </td>
                  ) : table.name && table.issuancesPage ? (
                    <td>
                      <p>{table.name}</p>
                    </td>
                  ) : (
                    ""
                  )}
                  <td>{table.borrowDate || table.reservationDue}</td>
                  <td>
                    {table.userName || table.returnDate || (
                      <p className={table.withOffLimit ? classes.offLimit : ""}>
                        {table.daysBorrowed}
                      </p>
                    )}
                  </td>
                  {table.type !== "prekoracene" && (
                    <td>
                      {table.status ? (
                        <p
                          className={`${classes.statusContainer} ${
                            classes[table.status]
                          }`}
                        >
                          {table.status}
                        </p>
                      ) : table.borrowDate && table.type !== "izdate" ? (
                        <p
                          className={table.withOffLimit ? classes.offLimit : ""}
                        >
                          {table.daysBorrowed}
                        </p>
                      ) : table.issueLibrarianName ? (
                        table.issueLibrarianName
                      ) : (
                        ""
                      )}
                    </td>
                  )}

                  <td>
                    {table.type === "prekoracene" && table.withOffLimit}
                    {!table.issueLibrarianName && table.noOffLimit ? (
                      <p className={classes.offLimit}>{table.noOffLimit}</p>
                    ) : !table.issueLibrarianName &&
                      table.withOffLimit &&
                      table.type === "prekoracene" ? (
                      <p className={classes.offLimit}>{table.withOffLimit}</p>
                    ) : (
                      table.issueLibrarianName &&
                      table.type !== "izdate" &&
                      table.type !== "prekoracene" && (
                        <>{table.issueLibrarianName}</>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {filteredData.length === 0 && !isLoading && (
        <div className={classes.noDataContainer}>
          <img src="/images/icons/no-data-icon.png" alt="no data icon" />
          <p>Nema podataka.</p>
        </div>
      )}
      {isLoading ? (
        <LoadingSpinner loadingSpinner="/images/icons/loading-spinner.gif" />
      ) : (
        <Pagination
          tableItems={tableData}
          onUpdateFilteredData={updateFilteredData}
        />
      )}
    </Fragment>
  );
};

export default BookTable;

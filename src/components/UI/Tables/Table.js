import { Fragment, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import classes from "../../../styles/Table.module.css";

import Pagination from "./Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Table = (props) => {
  const {
    tableColumns,
    tableData,
    isLoading,
    selectedRows,
    onSelectedRowsChange,
    loadingSpinner,
    isDisabled,
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
            <col key={Math.random()} style={{ width: "5%" }} />
            {tableColumns.map((column) => (
              <col key={Math.random()} style={{ width: column.width }} />
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
                  disabled={isDisabled}
                />
              </th>
              {tableColumns.map((column) => (
                <th key={column.field}>{column.header}</th>
              ))}
              <th colSpan={4}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.slice(0, 6).map((table) => (
              <tr key={table.id}>
                <td>
                  <input
                    type="checkbox"
                    className={classes.checkbox}
                    checked={selectedRows && selectedRows.includes(table.id)}
                    onChange={() => handleRowSelect(table.id)}
                    disabled={isDisabled}
                  />
                </td>
                <td>
                  <div className={classes.userColumnData}>
                    {table.image && (
                      <img
                        className={table.imageType ? classes.bookCover : ""}
                        src={table.image}
                        onError={(e) => {
                          e.target.src = "/images/placeholders/book-cover.jpg";
                        }}
                        alt="user avatar"
                      />
                    )}
                    {table.link ? (
                      <Link to={table.link}>{table.name}</Link>
                    ) : (
                      <p>{table.name}</p>
                    )}
                  </div>
                </td>
                <td>
                  {table.email ||
                    table.description ||
                    table.author ||
                    table.borrowDate}
                </td>
                <td>
                  {table.userType || table.category || table.daysBorrowed}
                </td>
                <td>
                  {table.lastAccess || table.available || table.noOffLimit}
                  {table.withOffLimit && (
                    <p className={classes.offLimit}>{table.withOffLimit}</p>
                  )}
                </td>
                {table.reserved && <td>{table.reserved}</td>}
                {table.issued && <td>{table.issued}</td>}
                {table.offLimit && <td>{table.offLimit}</td>}
                {table.totalAmount && <td>{table.totalAmount}</td>}
                {table.librarianName && <td>{table.librarianName}</td>}
                <td>
                  {table.actionButton && (
                    <img
                      src="images/buttons/dashboard-actions.svg"
                      alt="dashboard actions button"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredData.length === 0 && !isLoading && (
        <div className={classes.noDataContainer}>
          <img src="/images/icons/no-data-icon.png" alt="no data icon" />
          <p>Nema podataka.</p>
        </div>
      )}
      {isLoading ? (
        <LoadingSpinner
          loadingSpinner={
            loadingSpinner
              ? loadingSpinner
              : "/images/icons/loading-spinner.gif"
          }
        />
      ) : (
        <Pagination
          tableItems={tableData}
          onUpdateFilteredData={updateFilteredData}
        />
      )}
    </Fragment>
  );
};

export default Table;

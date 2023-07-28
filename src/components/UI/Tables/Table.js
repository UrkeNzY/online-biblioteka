import { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Pagination from "./Pagination";

import classes from "../../../styles/Table.module.css";

const Table = (props) => {
  const { tableColumns, tableData } = props;
  const [filteredData, setFilteredData] = useState(tableData);

  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

  const filterTableData = (filteredItems) => {
    setFilteredData(filteredItems);
  };

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
                <input type="checkbox" className={classes.checkbox} />
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
                  <input type="checkbox" className={classes.checkbox} />
                </td>
                <td>
                  <div className={classes.userColumnData}>
                    <img
                      className={table.imageType ? classes.bookCover : ""}
                      S
                      src={table.image}
                      onError={(e) => {
                        e.target.src = "/images/placeholders/book-cover.jpg";
                      }}
                      alt="user avatar"
                    />
                    {table.link ? (
                      <Link to={table.link}>{table.name}</Link>
                    ) : (
                      <p>{table.name}</p>
                    )}
                  </div>
                </td>
                <td>{table.email || table.description || table.author}</td>
                <td>{table.userType || table.category}</td>
                <td>{table.lastAccess || table.available}</td>
                {table.reserved && <td>{table.reserved}</td>}
                {table.issued && <td>{table.issued}</td>}
                {table.offLimit && <td>{table.offLimit}</td>}
                {table.totalAmount && <td>{table.totalAmount}</td>}
                <td>
                  <img
                    src="images/buttons/dashboard-actions.svg"
                    alt="dashboard actions button"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination tableItems={tableData} filterItems={filterTableData} />
    </Fragment>
  );
};

export default Table;

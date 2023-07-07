import classes from "../../styles/Table.module.css";

const Table = (props) => {
  const { tableColumns, tableData } = props;

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <colgroup>
          <col style={{ width: "5%" }} />
          {tableColumns.map((column) => (
            <col style={{ width: column.width }} />
          ))}
          <col style={{ width: "15%" }} />
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
          {tableData.map((table) => (
            <tr key={table.id}>
              <td>
                <input type="checkbox" className={classes.checkbox} />
              </td>
              <td>
                <div className={classes.userColumnData}>
                  <img
                    className={table.imageType ? classes.bookCover : ""}
                    src={table.image}
                    alt="user avatar"
                  />
                  <p>{table.name}</p>
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
  );
};

export default Table;

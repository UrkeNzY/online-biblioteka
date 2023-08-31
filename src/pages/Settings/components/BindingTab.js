import { useState, useEffect, Fragment } from "react";
import { fetchcreateBookData } from "../../../services/books";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv poveza", field: "categoryName", width: "100%" },
];

const BindingsTab = () => {
  const [bookBindings, setBookBindings] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const isDisabled = true;

  useEffect(() => {
    const fetchBindings = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchcreateBookData();

        const binds = bookData.data.bookbinds.map((bind) => ({
          id: bind.id,
          name: bind.name,
        }));

        setBookBindings(binds);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchBindings();
  }, []);

  return (
    <Fragment>
      <Table
        tableColumns={tableColumns}
        tableData={bookBindings}
        isLoading={isLoading}
        isDisabled={isDisabled}
        loadingSpinner="/images/icons/settings-loading-spinner.gif"
      />
    </Fragment>
  );
};

export default BindingsTab;

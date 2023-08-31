import { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv formata", field: "categoryName", width: "100%" },
];

const FormatsTab = () => {
  const [bookFormats, setBookFormats] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const isDisabled = true;

  useEffect(() => {
    const fetchFormats = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchcreateBookData();

        const formats = bookData.data.formats.map((format) => ({
          id: format.id,
          name: format.name,
        }));

        setBookFormats(formats);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchFormats();
  }, []);

  return (
    <Table
      tableColumns={tableColumns}
      tableData={bookFormats}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingSpinner="/images/icons/settings-loading-spinner.gif"
    />
  );
};

export default FormatsTab;

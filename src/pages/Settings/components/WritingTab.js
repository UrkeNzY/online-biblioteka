import { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv pisma", field: "categoryName", width: "100%" },
];

const WritingTab = () => {
  const [bookScripts, setBookScripts] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const isDisabled = true;

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchcreateBookData();

        const scripts = bookData.data.scripts.map((script) => ({
          id: script.id,
          name: script.name,
        }));

        setBookScripts(scripts);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchScripts();
  }, []);

  return (
    <Table
      tableColumns={tableColumns}
      tableData={bookScripts}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingSpinner="/images/icons/settings-loading-spinner.gif"
    />
  );
};

export default WritingTab;

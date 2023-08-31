import { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv kategorije", field: "categoryName", width: "100%" },
];

const CategoriesTab = () => {
  const [bookCategories, setBookCategories] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const isDisabled = true;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchcreateBookData();

        const categories = bookData.data.categories.map((category) => ({
          id: category.id,
          name: category.name,
        }));

        setBookCategories(categories);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Table
      tableColumns={tableColumns}
      tableData={bookCategories}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingSpinner="/images/icons/settings-loading-spinner.gif"
    />
  );
};

export default CategoriesTab;

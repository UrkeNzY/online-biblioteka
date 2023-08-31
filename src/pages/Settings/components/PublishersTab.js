import { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv izdavaca", field: "categoryName", width: "100%" },
];

const PublishersTab = () => {
  const [bookPublishers, setBookPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const isDisabled = true;

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchcreateBookData();

        const publishers = bookData.data.publishers.map((publisher) => ({
          id: publisher.id,
          name: publisher.name,
        }));

        setBookPublishers(publishers);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  return (
    <Table
      tableColumns={tableColumns}
      tableData={bookPublishers}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingSpinner="/images/icons/settings-loading-spinner.gif"
    />
  );
};

export default PublishersTab;

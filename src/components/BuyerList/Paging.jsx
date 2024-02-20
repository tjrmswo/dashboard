/* eslint-disable react/prop-types */
import { useState } from "react";

//libraries
import Pagination from "react-js-pagination";

// css
import "./Paging.css";

const Paging = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={8}
      totalItemsCount={450}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;

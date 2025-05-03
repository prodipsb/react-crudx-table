import React, { useEffect, useState } from "react";
import styles from './Pagination.module.css'; // Import the custom CSS module

const Pagination = ({ pagination, fetchData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const updatePagination = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      updatePagination(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < pagination?.totalPages) {
      updatePagination(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    console.log('click page', page)
    updatePagination(page);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationWrapper}>
        <button
          className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"></path>
          </svg>
          <span>Previous</span>
        </button>

        <span className={styles.pageInfo}>
          Page {currentPage} of {pagination?.totalPages}
        </span>

        <ul className={styles.pageNumberList}>
          {[...Array(pagination?.totalPages).keys()].map((page) => {
            const pageNumber = page + 1;
            return (
              <li key={page}>
                <button
                  className={`${styles.pageNumberItem} ${pageNumber === currentPage ? styles.active : ''}`}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          className={`${styles.paginationButton} ${currentPage === pagination?.totalPages ? styles.disabled : ''}`}
          onClick={nextPage}
          disabled={currentPage === pagination?.totalPages}
        >
          <span>Next</span>
          <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;

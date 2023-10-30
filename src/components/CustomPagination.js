import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const pages = useMemo(() => {
    const calculatedPages = [];
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 0 && i <= totalPages) {
        calculatedPages.push(i);
      }
    }
    return calculatedPages;
  }, [currentPage, totalPages]);

  return (
    <Pagination className="mt-10">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pages.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;

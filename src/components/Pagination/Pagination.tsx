import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const itemsPerPageOptions = [6, 12, 24];

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.itemsPerPageSelect}>
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            const newItemsPerPage = Number(e.target.value);
            onItemsPerPageChange(newItemsPerPage);
            onPageChange(1); // Reset to first page when changing items per page
          }}
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.navigation}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className={styles.pageInfo}>
          <span className={styles.pageNumbers}>
            Page {currentPage} of {totalPages}
          </span>
          <span className={styles.totalItems}>{totalItems} items</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
          aria-label="Next page"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

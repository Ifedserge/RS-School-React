import React from 'react';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='pagination'>
      {currentPage > 1 && (
        <button onClick={() => handleClick(currentPage - 1)} className='pagenations__btn'>
          Previous
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button onClick={() => handleClick(currentPage + 1)} className='pagenations__btn'>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;

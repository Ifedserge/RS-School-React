import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PaginationProps } from './Pagintaion.type';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, searchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set('page', (currentPage - 1).toString());
      newSearchParams.set('search', searchTerm);
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set('page', (currentPage + 1).toString());
      newSearchParams.set('search', searchTerm);
      navigate(`${location.pathname}?${newSearchParams.toString()}`);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', i.toString());
    newSearchParams.set('search', searchTerm);
    pages.push(
      <Link
        key={i}
        to={`${location.pathname}?${newSearchParams.toString()}`}
        style={{
          margin: '0 5px',
          textDecoration: currentPage === i ? 'underline' : 'none',
        }}
      >
        {i}
      </Link>
    );
  }

  return (
    <div>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      {pages}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React from 'react';
import './CloseBtn.module.css'; // Import custom styles

const CloseBtn = ({
  onClick = () => {},
  className = '',
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`close-btn ${className}`}
      >
        <svg
          className="close-btn-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CloseBtn;

import React from 'react';
import styles from './CloseBtn.module.css'; // Import custom styles

const CloseBtn = ({
  onClick = () => {},
  className = '',
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${styles.closeBtn} ${className}`}
      >
        <svg
          className={styles.closeBtnIcon}
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

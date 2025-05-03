import React from 'react';
import styles from './SmartBtn.module.css';

const SmartButton = ({
  label = 'Click Me',
  href = '#',
  type = 'button',
  icon = null,
  className = '',
  onClick = () => {},
  isLink = true,
}) => {
  const finalClass = `${styles.smartBtn} ${className}`;

  const content = (
    <>
      {icon && <span className={styles.smartBtnIcon}>{icon}</span>}
      {label}
    </>
  );

  if (isLink) {
    return (
      <a href={href} className={finalClass}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={finalClass} onClick={onClick}>
      {content}
    </button>
  );
};

export default SmartButton;

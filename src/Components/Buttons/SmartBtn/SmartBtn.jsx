import React from 'react';
import './SmartBtn.module.css'; // Custom button styles

const SmartBtn = ({
  label = 'Click Me',
  href = '#',
  type = 'button',
  icon = null,
  className = '',
  onClick = () => {},
  isLink = true,
}) => {
  const finalClass = `smart-btn ${className}`;

  const content = (
    <>
      {icon && <span className="smart-btn-icon">{icon}</span>}
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

export default SmartBtn;

// Popover.js
import React from 'react';

function Popover({ show, children, onClose }) {
  return (
    <div className={`popover-container ${show ? 'show' : ''}`}>
      <div className="popover-content">
        {children}
      </div>
      <div className="popover-overlay" onClick={onClose}></div>
    </div>
  );
}

export default Popover;

import React, { useState, useEffect } from 'react';
import './SharePopup.css'; // Import CSS file for styling

const SharePopup = ({ isOpen, onClose }) => {
  const [popupPosition, setPopupPosition] = useState({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });

  useEffect(() => {
    const handleResize = () => {
      positionPopup();
    };

    if (isOpen) {
      positionPopup();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const positionPopup = () => {
    setPopupPosition({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
  };

  return (
    isOpen && (
      <div
        className="share-popup"
        style={popupPosition}
      >
        <div className="popup-content">
          <h3>Share via Email</h3>
          <input
            type="email"
            placeholder="Enter email address"
            // Add necessary input handling logic
          />
          <div className="button-group">
            <button onClick={onClose}>Cancel</button>
            <button>Share</button>
          </div>
        </div>
      </div>
    )
  );
};

export default SharePopup;

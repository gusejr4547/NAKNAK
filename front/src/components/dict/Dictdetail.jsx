import React, { useState } from "react";
import "./Dictdetail.css";

function Dictdetail(props) {
  const [showModal, setShowModal] = useState(false);

  const handleTitleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <p className="dict-detail-title" onClick={handleTitleClick}>
        <span>{props.data.title}</span>
      </p>
      {showModal && (
        <div className="dict-detail-modal">
          <div className="dict-detail-modal-content">
            <p>{props.data.content}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dictdetail;

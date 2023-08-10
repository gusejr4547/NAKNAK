import React, { useState } from "react";
import "./Dictlist.css";

function Dictlist(props) {
  const [showModal, setShowModal] = useState(false);

  const handleTitleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <p onClick={handleTitleClick}>{props.data.title}</p>
      {showModal && (
        <div className="dict-list-modal">
          <div className="dict-list-modal-content">
            <p>{props.data.content}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dictlist;

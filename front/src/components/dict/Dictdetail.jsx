import React, { useState } from "react";
import "./Dictdetail.css";
import { div } from "@tensorflow/tfjs";

function Dictdetail(props) {
  const [showModal, setShowModal] = useState(false);

  const handleTitleClick = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <p className="dict-detail-title" onClick={handleTitleClick}>
        <span>{props.data.title}</span>
      </p>
      {showModal && !props.data.start && (
        <div className="dict-detail-content">
          <p className="dict-detail-p">{props.data.content}</p>
        </div>
        // <div className="dict-detail-modal">
        //   <div className="dict-detail-modal-content">
        //     <p>{props.data.content}</p>
        //     <button onClick={handleCloseModal}>Close</button>
        //   </div>
        // </div>
      )}
      {showModal && props.data.start && (
        <div className="dict-detail-content">
          <p className="dict-detail-p">{props.data.start}</p>
          <p className="dict-detail-p">{props.data.end}</p>
        </div>
        // <div className="dict-detail-modal">
        //   <div className="dict-detail-modal-content">
        //     <p>{props.data.start}</p>
        //     <p>{props.data.end}</p>
        //     <button onClick={handleCloseModal}>Close</button>
        //   </div>
        // </div>
      )}
    </div>
  );
}

export default Dictdetail;

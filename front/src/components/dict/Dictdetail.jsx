import React, { useState } from "react";
import "./Dictdetail.css";
import { div } from "@tensorflow/tfjs";

function Dictdetail(props) {
  const [showModal, setShowModal] = useState(false);
  const [active, setactive] = useState(false);

  const handleTitleClick = () => {
    handleCloseModal();
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    if (active) {
      setactive(false);
    } else {
      setactive(true);
    }
  };

  return (
    <div className="title-box">
      <p
        className={active ? "dict-detail-title-active" : "dict-detail-title"}
        onClick={handleTitleClick}
      >
        <span>{props.data.title}</span>
      </p>
      {showModal && !props.data.start && (
        <div className="dict-detail-content">
          <p className="dict-detail-p"> {props.data.content}</p>
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
          <p className="dict-detail-p">금어기 시작일 : {props.data.start}</p>
          <p className="dict-detail-p">금어기 종료일 : {props.data.end}</p>
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

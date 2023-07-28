import React from "react";
import "./FishDetailModal.css";

const FishDetailModal = ({ fishData, onClose }) => {
  const { fishId, imgUrl, name, info } = fishData;

  return (
    <div className="fish-detail-modal container">
      <div className="modal-content">
        <img src={imgUrl} alt={name} />
        <h3>{name}</h3>
        <p>{info}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default FishDetailModal;

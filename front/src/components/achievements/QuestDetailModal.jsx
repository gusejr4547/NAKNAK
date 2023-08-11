import React from "react";
import "./quest.css";
import "./QuestDetailModal.css";

const QuestDetailModal = ({ questData, onClose }) => {
  return (
    <div className="quest-detail-modal container">
      <div className="modal-content">
        <img src="assets/cats/cat.png" alt="" />
        <h3>{questData.title}</h3>
        <p>{questData.content}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default QuestDetailModal;

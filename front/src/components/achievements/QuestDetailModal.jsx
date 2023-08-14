import React from "react";
import "./quest.css";
import "./QuestDetailModal.css";

const QuestDetailModal = ({ questData, onClose }) => {
  return (
    <div className="quest-detail-modal container">
      <div className="modal-content">
        <img className="quest-img" src="assets/cats/cat.png" alt="" />
        <h3 className="quest-title">{questData.title}</h3>
        <p className="quest-content">{questData.content}</p>
        <p className="quest-task">{questData.task}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default QuestDetailModal;

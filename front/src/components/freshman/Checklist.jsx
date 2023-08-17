import React, { useState } from "react";

function Checklist({ text, completed, onToggle, onRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className={`checklist-item ${completed ? "completed" : ""}`}>
      <span className="checklist-text" onClick={onToggle}>
        {text}
      </span>
      <button onClick={toggleModal}>모달</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* 모달 내용을 이곳에 추가 */}
            <button onClick={toggleModal}>닫기</button>
          </div>
        </div>
      )}
      <button className="checklist-remove" onClick={onRemove}>
        삭제
      </button>
    </div>
  );
}

export default Checklist;

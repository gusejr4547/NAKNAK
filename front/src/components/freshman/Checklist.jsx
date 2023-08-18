import React, { useState } from "react";
import "./Checklist.css";

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
      {text === "릴 구매하는 방법" && (
        <button onClick={toggleModal} className="checklist-video">
          {" "}
          영상{">>"}{" "}
        </button>
      )}
      {text === "캐스팅 하는 방법" && (
        <button onClick={toggleModal} className="checklist-video">
          {" "}
          영상{">>"}{" "}
        </button>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* 모달 내용을 이곳에 추가 */}
            {text === "릴 구매하는 방법" && (
              <video width="360" height="280" controls="controls">
                <source
                  src={require("../../utils/video/reel.mp4")}
                  type="video/mp4"
                />
              </video>
            )}
            {text === "캐스팅 하는 방법" && (
              <video width="360" height="280" controls="controls">
                <source
                  src={require("../../utils/video/casting.mp4")}
                  type="video/mp4"
                />
              </video>
            )}
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

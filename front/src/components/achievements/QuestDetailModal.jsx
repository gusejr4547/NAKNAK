import React, { useState, useEffect } from "react";
import "./quest.css";
import "./QuestDetailModal.css";

const QuestDetailModal = ({ id, questData, onClose }) => {
  const [questdetail, setquestdetail] = useState({
    title: "",
    content: "",
    task: "",
  });

  useEffect(() => {
    questData.forEach((ele) => {
      if (ele.challengeDto.content === id) {
        setquestdetail(ele.challengeDto);
        // console.log(questdetail);
      }
    });
  }, []);

  // console.log(id);
  // console.log(questData);
  return (
    <div className="quest-detail-modal container">
      <div className="quest-modal-content">
        <img
          className={questdetail.title ? "quest-img-active" : "quest-img"}
          src="assets/cats/cat.png"
          alt=""
        />
        <h3
          className={questdetail.title ? "quest-title-active" : "quest-title"}
        >
          {questdetail.title}
        </h3>
        <p
          className={
            // questdetail.title ? "quest-content-active" : "quest-content"
            "quest-content-active"
          }
        >
          {questdetail.title ? questdetail.content : id}
        </p>
        <p className={questdetail.title ? "quest-task-active" : "quest-task"}>
          {questdetail.task}
        </p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default QuestDetailModal;

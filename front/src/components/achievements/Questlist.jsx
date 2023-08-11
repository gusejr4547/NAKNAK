import React, { useState, useEffect } from "react";
import "./quest.css";
import QuestDetailModal from "./QuestDetailModal";
function Questlist(props) {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const openQuestDetailModal = (quest) => {
    console.log(quest);
    setSelectedQuest(quest);
  };

  const closeQuestDetailModal = () => {
    setSelectedQuest(null);
  };
  return (
    <div className="quest-list-box ">
      <img
        className="quest-list-img"
        src="assets/cats/cat.png"
        alt=""
        onClick={() => openQuestDetailModal(props.data)}
      />
      <p className="quest-list-p">{props.data.title}</p>
      {/* 모달 컴포넌트 */}
      {selectedQuest && (
        <QuestDetailModal
          questData={selectedQuest}
          onClose={closeQuestDetailModal}
        />
      )}
    </div>
  );
}

export default Questlist;

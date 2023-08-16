import React, { useState, useEffect } from "react";
import "./quest.css";

import QuestDetailModal from "./QuestDetailModal";
import { challenge } from "../../utils/data/challenge";
function Questlist(props) {
  const [selectedQuest, setSelectedQuest] = useState(null);
  // console.log(props.data, 1, props.chk, 2, props.detail);
  const openQuestDetailModal = (quest) => {
    // console.log(quest);
    setSelectedQuest(quest);
  };

  // useEffect(() => {
  //   if (props.detail) {
  //     props.detail.forEach((ele) => {
  //       if (props.chk.includes(ele.challengeDto.challengeId)) {
  //         setSelectedQuest(ele);
  //         console.log(selectedQuest);
  //       }
  //     });
  //   }
  // }, []);

  const closeQuestDetailModal = () => {
    setSelectedQuest(null);
  };

  return (
    <div className="quest-list-box ">
      <img
        className={
          props.chk.includes(props.data.challengeId)
            ? "quest-list-img-active"
            : "quest-list-img"
        }
        src="assets/cats/cat.png"
        alt=""
        onClick={() => openQuestDetailModal(props.detail)}
      />
      <p
        className={
          props.chk.includes(props.data.challengeId)
            ? "quest-list-p-active"
            : "quest-list-p"
        }
      >
        {challenge[props.data.challengeId - 1].title}
      </p>

      {/* 모달 컴포넌트 */}
      {selectedQuest && (
        <QuestDetailModal
          id={props.data.content}
          questData={selectedQuest}
          onClose={closeQuestDetailModal}
        />
      )}
    </div>
  );
}

export default Questlist;

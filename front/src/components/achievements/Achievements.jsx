import React from "react";
import { challenge } from "../../utils/data/challenge";
import "./quest.css";
import Questlist from "./Questlist";

function Achievements(props) {
  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back();
    }
  };

  return (
    <div className="quest-container">
      <div className="quest-box quest-disable-scrollbar">
        <img
          src="/assets/icons/x.png"
          alt="exit"
          className="quest-back-button"
          onClick={goBack}
        />
        {challenge.map((item) => (
          <Questlist key={item.pk} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Achievements;

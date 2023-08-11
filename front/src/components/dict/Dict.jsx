import React, { useState } from "react";
import {
  point,
  equipment,
  Chaebi,
  manner,
  limit_length,
  action,
} from "../../utils/data/point";
import Dictlist from "./Dictlist";
import "./Dict.css";

function Dict(props) {
  const [activeView, setActiveView] = useState("");
  const [location, setLocation] = useState("");

  function updateLocation(latitude, longitude) {
    setLocation({ latitude, longitude });
    console.log("Received location:", latitude, longitude);
    // 리액트에서 현위치 정보 활용
  }

  const handleToggle = (view) => {
    setActiveView(view);
  };

  return (
    <div>
      <input type="text" />
      <div className="dictBottom">
        <div className="dicttoggleBar" style={{ display: "flex" }}>
          <button
            onClick={() => handleToggle("point")}
            className={activeView === "point" ? "dictactive" : "dictdefault"}
          >
            스팟
          </button>
          <button
            onClick={() => handleToggle("equipment")}
            className={
              activeView === "equipment" ? "dictactive" : "dictdefault"
            }
          >
            장비
          </button>
          <button
            onClick={() => handleToggle("Chaebi")}
            className={activeView === "Chaebi" ? "dictactive" : "dictdefault"}
          >
            채비
          </button>
          <button
            onClick={() => handleToggle("manner")}
            className={activeView === "manner" ? "dictactive" : "dictdefault"}
          >
            매너
          </button>
          <button
            onClick={() => handleToggle("limit_length")}
            className={
              activeView === "limit_length" ? "dictactive" : "dictdefault"
            }
          >
            금지체장
          </button>
          <button
            onClick={() => handleToggle("action")}
            className={activeView === "action" ? "dictactive" : "dictdefault"}
          >
            동작
          </button>
        </div>
        {activeView === "point" && (
          <div className="dictMiddle">
            <Dictlist data={point} />
          </div>
        )}
        {activeView === "equipment" && (
          <div className="dictMiddle">
            <Dictlist data={equipment} />
          </div>
        )}
        {activeView === "Chaebi" && (
          <div className="dictMiddle">
            <Dictlist data={Chaebi} />
          </div>
        )}
        {activeView === "limit_length" && (
          <div className="dictMiddle">
            <Dictlist limit={limit_length} />
          </div>
        )}
        {activeView === "manner" && (
          <div className="dictMiddle">
            <Dictlist data={manner} />
          </div>
        )}
        {activeView === "action" && (
          <div className="dictMiddle">
            <Dictlist data={action} />
          </div>
        )}
      </div>
      {location && <p>{location}</p>}
    </div>
  );
}

export default Dict;

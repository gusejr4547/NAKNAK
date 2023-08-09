import React from "react";
import Home from "../Home";
import "./Newbie.css";
import Talk2 from "./Talk2";

function Newbie() {
  const newbieVersion = true; // Or false, depending on your logic
  return (
    <div className="newbie-wrapper">
      <Home newbieVersion={newbieVersion} />
      <div className="newbie-talk-box">
        <span className="newbie-talk">{Talk2[0].content}</span>
      </div>
    </div>
  );
}

export default Newbie;

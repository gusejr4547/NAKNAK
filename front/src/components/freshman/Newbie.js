import React from "react";
import Home from "../Home";
import "./Newbie.css";
import Talk2 from "./Talk2";
import { useLocation } from "react-router-dom";

function Newbie() {
  let newbieVersion = 1;
  const { state } = useLocation();
  if (state) {
    newbieVersion = state;
  }
  return (
    <div className="newbie-wrapper">
      <Home newbieVersion={newbieVersion} />
      <div className="newbie-talk-box">
        <span className="newbie-talk">
          {state ? Talk2[state].content : Talk2[0].content}
        </span>
      </div>
    </div>
  );
}

export default Newbie;

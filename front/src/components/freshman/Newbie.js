import React, { useEffect, useRef, useState } from "react";
import Home from "../Home";
import "./Newbie.css";
import Talk2 from "./Talk2";

function Newbie() {
  const newbieVersion = true; // Or false, depending on your logic
  return (
    <div className="newbie_wrapper">
      <Home newbieVersion={newbieVersion} />
      <div className="newbie_talk">{Talk2[0].content}</div>
    </div>
  );
}

export default Newbie;

import React from "react";
import Home from "../Home";
import "./Newbie.css";
import Talk2 from "./Talk2";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { newbie_recoil } from "../../utils/atoms";
import TTS from "./TTS";

function Newbie() {
  let newbieVersion = 1;
  const { state } = useLocation();
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);

  // 뉴비버젼 홈화면 스테이트가 1 또는 5로 되어있음
  // 1=> 지도 이동 해주는 거
  // 5 => 카메라 이동 해주는 거
  if (state) {
    newbieVersion = state;
    setNewbie(state);
  }
  return (
    <div className="newbie-wrapper">
      <Home newbieVersion={newbieVersion} />
      <div className="newbie-talk-box">
        <span className="newbie-talk">
          {state ? (
            <div>
              {Talk2[state].content}
              <TTS message={Talk2[state].content} />
            </div>
          ) : (
            <div>
              {Talk2[0].content}
              <TTS message={Talk2[0].content} />
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default Newbie;

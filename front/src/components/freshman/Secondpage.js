import { React, useState, useEffect } from "react";
import Wave from "react-wavify";
import "./Secondpage.css";
import Lure from "./Lure";
import Onetwo from "./Onetwo";
import { useLocation } from "react-router";

// 물고기 좀 둥둥 떠다니게 하고 대화 걸기 어떰?

function Secondpage() {
  // 루어 or 원투 정보 받아오기 -> 유저에게 받아와도 됨
  const { state } = useLocation();
  const [step, setStep] = useState(0);

  const nextTalk = () => {
    setStep(step + 1);
  };
  const beforeTalk = () => {
    setStep(step - 1);
  };

  return (
    <div className="second_wrapper">
      <div className="second_talk">
        {/* <span className="second_img"></span> */}
        <span className="second_title">
          <img src={Lure[step]?.image} alt="" />
          {Lure[step].content}
        </span>
        {step > 0 && (
          <span className="btn1" onClick={() => beforeTalk()}>
            &lt; 이전
          </span>
        )}
        <span className="btn2" onClick={() => nextTalk()}>
          다음 &gt;
        </span>
      </div>
      <div className="second_wave_wrap">
        <div className="second_cat_img"></div>
        {/* 가장 가까운 파도 */}
        <Wave
          className="second_wave2"
          fill="#6ec1df"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 45,
            amplitude: 20,
            speed: 0.3,
            points: 3,
          }}
        />
        {/*중간 파도  */}
        <Wave
          className="second_wave1"
          fill="#408BD0"
          paused={false}
          // style={{ display: "flex" }}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.25,
            points: 4,
          }}
        ></Wave>
        {/* 마지막파도 */}
        <Wave
          className="second_wave3"
          fill="#82E7ED"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 35,
            amplitude: 20,
            speed: 0.2,
            points: 4,
          }}
        />
      </div>
    </div>
  );
}

export default Secondpage;

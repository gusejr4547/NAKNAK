import React, { useState } from "react";
import Wave from "react-wavify";
import "./Firstpage.css";
import talk from "./Talk";

function Firstpage() {
  const [step, setStep] = useState(0);

  const btn1 = () => {
    if (step === 0) {
      setStep(1);
    }
  };
  const btn2 = (i) => {
    if (step === 0) {
      setStep(1);
    }
  };

  return (
    <div className="first_wrapper">
      <div className="first_talk">
        <span className="first_title">
          {talk[step].content}
          {/* {talk.map((item) => {
            return (
              <>
                {item.id}
                {item.content}
              </>
            );
          })} */}
        </span>
      </div>
      <div className="first_wave_wrap">
        <div className="first_island_img"></div>
        <div className="first_cat_img"></div>
        {/* 가장 가까운 파도 */}
        <Wave
          className="first_wave2"
          fill="#82E7ED"
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
          className="first_wave1"
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
          className="first_wave3"
          fill="#6ec1df"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 35,
            amplitude: 20,
            speed: 0.2,
            points: 4,
          }}
        />
        <div className="btns">
          <span className="answer1" onClick={() => btn1()}>
            {talk[step].answer1}
          </span>
          <span className="answer2" onClick={() => btn2()}>
            {talk[step].answer2}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Firstpage;

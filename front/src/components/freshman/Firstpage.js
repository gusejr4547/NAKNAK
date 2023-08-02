import React from "react";
import Wave from "react-wavify";
import "./Firstpage.css";

function Firstpage() {
  return (
    <div className="first_wrapper">
      {/* <div className="first_malpoong"></div> */}
      <div className="first_wave_wrap">
        <div className="first_title">
          <span>안녕 낙낙월드에 처음왔지? 내가 몇가지 물어볼게!</span>
        </div>
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
        <div>
          <span>
            <button>응</button>
            <button>아니</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Firstpage;

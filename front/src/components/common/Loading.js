import React from "react";
import Wave from "react-wavify";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading_wrapper">
      <div className="wave_wrap">
        <div className="loading_title">낙낙</div>
        <div className="wave">
          <div className="island_img"></div>
          <div className="cat_img"></div>
          {/* 가장 가까운 파도 */}
          <Wave
            className="wave2"
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
            className="wave1"
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
            className="wave3"
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
        </div>
      </div>
    </div>
  );
}

export default Loading;

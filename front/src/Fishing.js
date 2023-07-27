import React, { useEffect, useState } from "react";
import "./Fishing.css";
import { Link  } from 'react-router-dom';


function Fishing(props) {
  const [fishingMode, setFishingMode] = useState("selectMode");
  //타이머 기능
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });

  useEffect(() => {
    let intervalId;

    if (fishingMode !== "selectMode") {
      intervalId = setInterval(run, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [fishingMode]);

  const start = (data) => {
    // 시작하기
    setFishingMode(data);
    run();
  };

  const run = () => {
    setTime((prevTime) => {
      let updatedS = prevTime.s;
      let updatedM = prevTime.m;
      let updatedH = prevTime.h;

      if (updatedM === 60) {
        updatedH++;
        updatedM = 0;
      }
      if (updatedS === 60) {
        updatedM++;
        updatedS = 0;
      }
      updatedS++;

      return { s: updatedS, m: updatedM, h: updatedH };
    });
  };

  return (
    <div>
      <h1>피싱모드입니다</h1>
      <div className="fishing">
        <div className="box-header">
          <div
            className={
              fishingMode === "selectMode" ? "fishing-box1" : "hiddenMode"
            }
            onClick={() => start("바다")}
          >
            <span>바다</span>
          </div>

          <div
            className={
              fishingMode === "selectMode" ? "fishing-box2" : "hiddenMode"
            }
            onClick={() => start("민물")}
          >
            <span>민물</span>
          </div>

          <div className={fishingMode === "selectMode" ? "hiddenMode" : "mode"}>
            <div>
              <div className="time">
                {" "}
                <div>
                  <span>{fishingMode}</span>
                </div>
                {`${time.h.toString().padStart(2, "0")}:${time.m
                  .toString()
                  .padStart(2, "0")}:${time.s.toString().padStart(2, "0")}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={fishingMode === "selectMode" ? "hiddenMode" : "exitBtn"}
        onClick={() =>
          setFishingMode("selectMode") & setTime({ s: 0, m: 0, h: 0 })
        }
      >
        <span>종료하기</span>
      </div>
      <Link to='/ImgTest' className="nav-link" ><input type="submit" value="촬영" /></Link>
      <Link to='/Dogam' className="nav-link" ><input type="submit" value="도감" /></Link>
  
    </div>
  );
}

export default Fishing;
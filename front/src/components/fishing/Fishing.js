import React, { useEffect, useState } from "react";
import "./Fishing.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fishingMode_recoil, time_recoil } from "../../utils/atoms";
import { getFish_recoil } from "../../utils/atoms";
import Wave from "react-wavify";
import Nowget from "./Nowget";
import StopWatch from "./StopWatch";

function Fishing(props) {
  const [fishingMode, setFishingMode] = useRecoilState(fishingMode_recoil);
  const [time, setTime] = useRecoilState(time_recoil);
  const [getFish, setGetFish] = useRecoilState(getFish_recoil);

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
  const getClose = () => {
    setGetFish(0);
  };

  const run = () => {
    setTime((prevTime) => {
      const today = Date.now();
      let updatedS = prevTime.s;
      let updatedM = prevTime.m;
      let updatedH = prevTime.h;
      const beforeDay = prevTime.today;
      // 다시 접속했을 경우 그만큼 시간 더해주기
      if (beforeDay !== 0 && today > beforeDay + 1500) {
        // 초과된 시간
        const overTime = Math.floor((today - beforeDay) / 1000);
        // 초과된 분
        const m = Math.floor(overTime / 60) % 60;
        // 초과된 시
        const h = Math.floor(overTime / 3600);
        // 초과된 초
        const s = overTime % 60;
        console.log("초가된 시간", h, m, s);
        // 원래 있던 거에 더하기
        if (updatedS + s >= 60) {
          updatedS = updatedS + s - 60;
          updatedM += 1;
        } else {
          updatedS += s;
        }
        if (updatedM + m >= 60) {
          updatedM = updatedM + m - 60;
          updatedH += 1;
        } else {
          updatedM += m;
        }
        updatedH += h;
      }

      if (updatedS === 60) {
        updatedM++;
        updatedS = 0;
      }
      if (updatedM === 60) {
        updatedH++;
        updatedM = 0;
      }
      updatedS++;

      return { s: updatedS, m: updatedM, h: updatedH, today: today };
    });
  };

  return (
    <div className="fishing-wrapper">
      <div className="fishing-cat"></div>
      <div className="fishing-ship"></div>
      {/* 앞 파도 */}
      <Wave
        className="fishing_wave1"
        fill="#4D74D7"
        paused={false}
        options={{
          height: 80,
          amplitude: 20,
          speed: 0.3,
          points: 4,
        }}
      />
      {/* 뒷 파도 */}
      <Wave
        className="fishing_wave2"
        fill="#4D96D7"
        paused={false}
        options={{
          height: 35,
          amplitude: 20,
          speed: 0.2,
          points: 3,
        }}
      />
      <div className="fishing-container">
        <div className="box-header">
          <div
            className={
              fishingMode === "selectMode" ? "fishing-box1" : "hiddenMode"
            }
          >
            <span onClick={() => start("바다")}>낚시 모드 시작</span>
          </div>
          <div
            className={
              fishingMode === "selectMode" ? "hiddenMode" : "fishing-box1"
            }
          >
            <StopWatch
              hours={time.h.toString().padStart(2, "0")}
              minutes={time.m.toString().padStart(2, "0")}
              seconds={time.s.toString().padStart(2, "0")}
            />
          </div>
        </div>
        <div className="box-header">
          <div
            className={
              fishingMode === "selectMode" ? "hiddenMode" : "fishing-close"
            }
          >
            <div
              onClick={() =>
                setFishingMode("selectMode") &
                setTime({ s: 0, m: 0, h: 0, today: 0 }) &
                getClose()
              }
            >
              종료하기
            </div>
          </div>
        </div>
      </div>
      <Nowget num={getFish} />
    </div>
  );
}

export default Fishing;

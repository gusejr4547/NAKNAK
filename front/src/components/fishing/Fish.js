import React from "react";

function Fish({ x, y, index }) {
  const isEven = index % 2 === 0; // x 좌표가 짝수인지 확인

  const fishClass = isEven ? "FishEven" : "FishOdd"; // 짝수일 때는 FishEven 클래스, 홀수일 때는 FishOdd 클래스 사용

  const style = {
    position: "absolute",
    left: x + "%",
    bottom: y + "%",
  };

  return <div className={fishClass} style={style}></div>;
}

export default Fish;

import React from "react";
import "./StopWatch.css";

const StopWatch = ({ hours, minutes, seconds }) => {
  const getDigitSegments = (digit) => {
    // 7 세그먼트 숫자 패턴
    const segments = [
      [1, 2, 3, 4, 5, 6], // 0
      [2, 3], // 1
      [1, 2, 6, 7, 4], // 2
      [1, 2, 3, 4, 7], // 3
      [2, 3, 5, 7], // 4
      [1, 3, 4, 5, 7], // 5
      [1, 3, 4, 5, 6, 7], // 6
      [1, 2, 3], // 7
      [1, 2, 3, 4, 5, 6, 7], // 8
      [1, 2, 3, 4, 5, 7], // 9
    ];

    return segments[digit];
  };

  const renderDigit = (digit) => {
    const segments = getDigitSegments(digit);
    return (
      <div className="digit">
        {segments.map((segment, index) => (
          <div key={index} className={`segment segment${segment}`}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="stopwatch">
      {renderDigit(parseInt(hours[0], 10))}
      {renderDigit(parseInt(hours[1], 10))}
      <div className="colon">:</div>
      {renderDigit(parseInt(minutes[0], 10))}
      {renderDigit(parseInt(minutes[1], 10))}
      <div className="colon">:</div>
      {renderDigit(parseInt(seconds[0], 10))}
      {renderDigit(parseInt(seconds[1], 10))}
    </div>
  );
};

export default StopWatch;

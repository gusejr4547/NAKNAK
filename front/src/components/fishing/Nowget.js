import { useEffect } from "react";
import { useState } from "react";
import "./Nowget.css";
import Fish from "./Fish";

function Nowget(props) {
  const [talk, setTalk] = useState("");
  const [fishPositions, setFishPositions] = useState([]);
  useEffect(() => {
    if (props.num === 0) {
      setTalk("아직 잡은 물고기가 없어요.");
    } else {
      setTalk(props.num + "마리를 잡았습니다.");
    }

    // 물고기 위치를 랜덤하게 생성하여 설정
    const positions = [];
    for (let i = 0; i < props.num; i++) {
      const x = Math.random() * 80; // 가로 위치 랜덤 값
      const y = Math.random() * 80; // 세로 위치 랜덤 값
      positions.push({ x, y });
    }
    setFishPositions(positions);
  }, [props.num]);

  return (
    <div className="Nowgetdiv">
      <div className="Nowget-container">
        <span className="Nowgeth">{talk}</span>
      </div>
      <div className="Aquarium">
        {fishPositions.map((position, index) => (
          <Fish key={index} x={position.x} y={position.y} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Nowget;

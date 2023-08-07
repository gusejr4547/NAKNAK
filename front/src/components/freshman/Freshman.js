import "./Freshman.css";
import Firstpage from "./Firstpage";
import Secondpage from "./Secondpage";
import { React, useState } from "react";

function Freshman() {
  const [show, setShow] = useState(false);

  // 자식 컴포넌트에서 상태를 변경하기 위한 함수 정의
  const handleChangeParentState = (status) => {
    setShow(status);
  };
  return (
    <div className="freshman_wrapper">
      <div className="freshman_wave_wrap">
        {!show && (
          <Firstpage handleChangeParentState={handleChangeParentState} />
        )}
        {show && <Secondpage show={show} />}
      </div>
    </div>
  );
}

export default Freshman;

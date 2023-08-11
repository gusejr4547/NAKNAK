import "./Freshman.css";
import Firstpage from "./Firstpage";
import Secondpage from "./Secondpage";
import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";

function Freshman() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShow(location.state.page);
  }, [location]);

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

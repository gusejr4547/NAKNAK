import "./Freshman.css";
import Firstpage from "./Firstpage";
import Secondpage from "./Secondpage";
import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";

function Freshman() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.page !== undefined) {
      setShow(location.state.page);
    }
  }, [location]);

  const handleChangeParentState = (status) => {
    setShow(status);
  };

  return (
    <div className="freshman_wrapper">
      <div className="freshman_wave_wrap">
        {show ? (
          <Secondpage show={show} />
        ) : (
          <Firstpage handleChangeParentState={handleChangeParentState} />
        )}
      </div>
    </div>
  );
}

export default Freshman;

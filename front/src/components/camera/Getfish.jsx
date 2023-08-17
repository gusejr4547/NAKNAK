import React from "react";
import { useLocation } from "react-router-dom";

function Getfish(props) {
  const location = useLocation();
  const receivedData = location.state;

  return (
    <div>
      {receivedData && receivedData.fish && (
        <div>
          <p>{receivedData.fish.name}</p>
          <p>{receivedData.fish.info}</p>
        </div>
      )}
      <p>{receivedData.size}</p>
    </div>
  );
}

export default Getfish;

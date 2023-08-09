import React from "react";
import { point } from "../../utils/data/point";

function Dict(props) {
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  console.log(point);
  return (
    <div>
      <input type="text" />
      {point.map((item) => (
        <p key={item.pk}>
          <span>{item.title}</span>
        </p>
      ))}

      {latitude && <p>{latitude}</p>}
      {longitude && <p>{longitude}</p>}
    </div>
  );
}

export default Dict;

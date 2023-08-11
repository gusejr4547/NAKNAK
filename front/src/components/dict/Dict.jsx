import React from "react";
import {
  point,
  equipment,
  Chaebi,
  manner,
  limit_length,
  action,
} from "../../utils/data/point";

function Dict(props) {
  console.log(point);
  return (
    <div>
      <input type="text" />
      {point.map((item) => (
        <p key={item.pk}>
          <span>{item.title}</span>
        </p>
      ))}
    </div>
  );
}

export default Dict;

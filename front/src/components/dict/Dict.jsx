import React from "react";
import {
  point,
  equipment,
  Chaebi,
  manner,
  limit_length,
  action,
} from "../../utils/data/point";
import Dictlist from "./Dictlist";

function Dict(props) {
  console.log(point);
  return (
    <div>
      <input type="text" />
      {point.map((item) => (
        <Dictlist key={item.pk} data={item} />
      ))}
    </div>
  );
}

export default Dict;

import React from "react";
import Dictdetail from "./Dictdetail";
import "./Dictlist.css";

function dictlist(props) {
  return (
    <div
      className="dict-disable-scrollbar"
      style={{ overflowY: "scroll", maxHeight: "400px" }}
    >
      {props.data &&
        props.data.map((item) => (
          <Dictdetail
            key={item.pk}
            data={item}
            handledetail={props.handledetail}
            activedetail={props.activedetail}
          />
        ))}
      {props.limit &&
        props.limit.map((item) => (
          <Dictdetail
            key={item.pk}
            data={item}
            handledetail={props.handledetail}
            activedetail={props.activedetail}
          />
        ))}
      {props.limit_d &&
        props.limit_d.map((item) => (
          <Dictdetail
            key={item.pk}
            data={item}
            handledetail={props.handledetail}
            activedetail={props.activedetail}
          />
        ))}
    </div>
  );
}

export default dictlist;

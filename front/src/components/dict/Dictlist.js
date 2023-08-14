import React from "react";
import Dictdetail from "./Dictdetail";
import "./Dictlist.css";

function dictlist(props) {
  return (
    <div
      className="dict-disable-scrollbar"
      style={{ overflowY: "scroll", maxHeight: "300px" }}
    >
      {props.data &&
        props.data.map((item) => <Dictdetail key={item.pk} data={item} />)}
      {props.limit &&
        props.limit.map((item) => <Dictdetail key={item.pk} data={item} />)}
      {props.limit_d &&
        props.limit_d.map((item) => <Dictdetail key={item.pk} data={item} />)}
    </div>
  );
}

export default dictlist;

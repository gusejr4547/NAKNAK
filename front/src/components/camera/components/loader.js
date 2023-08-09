import React from "react";
import "../style/loader.css";

const Loader = (props) => {
  return (
    <div className="loaderwrapper" {...props}>
      <div className="loaderspinner"></div>
      <p>{props.children}</p>
    </div>
  );
};

export default Loader;

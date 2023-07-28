import React from "react";
import "./Loading.css";

const Loading = () => {
  const canvas = React.createElement("canvas");
  const ctx = canvas.getContext("2d");

  return (
    <div className="loadingWrap">
      <div className="wave"></div>
    </div>
  );
};

export default Loading;
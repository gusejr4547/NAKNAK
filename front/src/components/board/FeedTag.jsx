import { useState } from "react";

import "./FeedTag.css";

<<<<<<< HEAD
const FeedTag = (tagInfo) => {
  // console.log(tagInfo.tagInfo);

  const onClickTest = () => {
    console.log("tag btn clicked!", tagInfo.tagInfo.tagName);
  };

  return (
    <div className="feed-tag-wrapper" onClick={onClickTest}>
      <h6>#{tagInfo.tagInfo.tagName}</h6>
=======
const FeedTag = ({ tagInfo, active, onClick }) => {
  return (
    <div
      className={`feed-tag-wrapper ${
        active ? "feed-tag-active" : "feed-tag-ianctive"
      }`}
      onClick={() => onClick(tagInfo)}
    >
      <h6>#{tagInfo.tagName}</h6>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    </div>
  );
};

export default FeedTag;

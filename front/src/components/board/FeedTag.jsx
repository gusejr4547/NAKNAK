import { useState } from "react";

import "./FeedTag.css";

const FeedTag = (tagInfo) => {
  // console.log(tagInfo.tagInfo);

  const onClickTest = () => {
    console.log("tag btn clicked!", tagInfo.tagInfo.tagName);
  };

  return (
    <div className="feed-tag-wrapper" onClick={onClickTest}>
      <h6>#{tagInfo.tagInfo.tagName}</h6>
    </div>
  );
};

export default FeedTag;

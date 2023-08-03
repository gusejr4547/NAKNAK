import { useState } from "react";

import "./Feed.css";

const Feed = ({ feedInfo }) => {
  return (
    <div className="feed-wrapper">
      <div>
        "postId": {feedInfo.postId}, "content": {feedInfo.content}, "views":{" "}
        {feedInfo.views}, "registeredAt": {feedInfo.registeredAt}, "memberId":{" "}
        {feedInfo.memberId}, "memberImageUrl": {feedInfo.memberImageUrl},
        "memberNickname": {feedInfo.memberNickname},
      </div>
    </div>
  );
};

export default Feed;

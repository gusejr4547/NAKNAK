import { useState } from "react";

import "./Feed.css";

const Feed = ({ feedInfo }) => {
  console.log(feedInfo.images);

  return (
    <div className="feed-wrapper">
      <div>
        <h4>FeedInfo</h4>
        "postId": {feedInfo.post.postId}, <br />
        "content": {feedInfo.post.content}, <br />
        "views":{feedInfo.post.views}, <br />
        "registeredAt":{feedInfo.post.registeredAt}, <br />
        "memberId":{feedInfo.post.memberId}, <br />
        "memberImageUrl": {feedInfo.post.memberImageUrl}, <br />
        "memberNickname": {feedInfo.post.memberNickname}, <br />
        "images":
        {feedInfo.images.map((image, index) => {
          console.log(image.fileUrl);
          return (
            <p key={index} style={{ margin: 0 }}>
              {image.fileUrl}
            </p>
          );
        })}
        "tags":
        {feedInfo.tags.map((tag, index) => {
          <p key={index}>{tag}</p>;
        })}
      </div>
      <div className="feed-board">요기부터 진짜 피드</div>
    </div>
  );
};

export default Feed;

import { useState } from "react";

import "./Feed.css";

const Feed = ({ feedInfo }) => {
  const followClickHandler = () => {
    // 우선 멤버 id 값을 전달할 예정입니다.
    console.log("follow btn clicked", feedInfo.post.memberId);
  };

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
      <div className="feed-board">
        <div className="feed-header">
          <img
            className="feed-profile-img"
            // null 값에 feedInfo.post.memberImageUrl가 들어가야함
            src={null || `/assets/images/jge.png`}
            alt="progile"
          />
          <div className="feed-username">username</div>
          <div className="feed-follow" onClick={followClickHandler}>
            팔로우
          </div>
        </div>

        {/* carousel start */}
        <img
          className="feed-image"
          src={"/assets/images/jge.png"}
          alt="post images"
        />
        {/* carousel end */}
        <div className="feed-footer">
          <div className="feed-insight">
            <div className="feed-views ">{feedInfo.post.views} views</div>
            {/* 하트가 클릭됐을때 무언가 돼야합니다 */}
            <img
              src="/assets/icons/heart.png"
              alt="하트"
              onClick={followClickHandler}
            />
          </div>
          <div className="feed-caption">{feedInfo.post.content}</div>
        </div>
        {/* 댓글 DB 아직 미완성 */}
        {/* <div className="comments">
            <div className="comment">Comment 1</div>
            <div className="comment">Comment 2</div>
          </div> */}
      </div>
    </div>
  );
};

export default Feed;

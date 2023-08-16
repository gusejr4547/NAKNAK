<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Feed.css";

<<<<<<< HEAD
const Feed = ({ feedInfo }) => {
=======
import { authorizedRequest } from "../account/AxiosInterceptor";

import FeedTag from "./FeedTag";
import { Link } from "react-router-dom";

const Feed = ({
  feedInfo,
  // followerList,
  currentFollowState,
  // feedLikeState,
  likedFeedData,
  userId,
  onFollowChange,
  onLikeStateChange,
}) => {
  const [feedLikeState, setFeedLikeState] = useState(
    likedFeedData
      ? likedFeedData.find((likedFeed) => likedFeed.postId === feedInfo.postId)
        ? true
        : false
      : false
  );
  const [loading, setLoading] = useState(false);

  const followStateClass = currentFollowState
    ? "feed-following"
    : "feed-not-follow";

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
    nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
  };

<<<<<<< HEAD
  const followClickHandler = () => {
    // 우선 멤버 id 값을 전달할 예정입니다.
    console.log("follow btn clicked", feedInfo.post.memberId);
  };

  return (
    <div className="feed-wrapper">
      {/* data */}
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
      {/* data */}

=======
  const followClickHandler = async () => {
    onFollowChange(currentFollowState, feedInfo.memberId);
    console.log("follow btn clicked", feedInfo.memberId);
  };

  const likeClickHandler = () => {
    console.log("like btn clicked", feedLikeState);
    feedInfo.likeCount += !feedLikeState ? 1 : -1;
    setFeedLikeState(!feedLikeState);

    onLikeStateChange(feedInfo, feedLikeState);
  };

  const tagClickHandler = () => {
    console.log("tagClicked", userId, feedInfo);
  };

  useEffect(() => {
    const toggleLikeState = async () => {
      setLoading(true);
      try {
        const response = await authorizedRequest({
          method: "post",
          url: feedLikeState
            ? `/api1/api/posts/likes?post=${feedInfo.postId}`
            : `/api1/api/posts/unlikes?post=${feedInfo.postId}`,
        });
        console.log(feedLikeState, response);
        setLoading(false);
      } catch (error) {
        console.error("fail toggle likedstate");
      } finally {
        setLoading(false);
      }
    };

    toggleLikeState();
  }, [feedLikeState]);

  return (
    <div className="feed-wrapper">
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      <div className="feed-board">
        <div className="feed-header">
          <img
            className="feed-profile-img"
            // null 값에 feedInfo.post.memberImageUrl가 들어가야함
<<<<<<< HEAD
            src={null || `/assets/images/jge.png`}
            alt="progile"
          />
          <div className="feed-username">username</div>
          <div className="feed-follow" onClick={followClickHandler}>
            팔로우
          </div>
=======
            src={
              feedInfo.memberImageUrl
                ? `${process.env.REACT_APP_BACKEND_URL}/` +
                  `${feedInfo.memberImageUrl}`
                : "/assets/cats/cat.png"
            }
            alt="profileImg"
          />
          <Link to={`/Profile/:${feedInfo.memberId}`} className="feed-username">
            {feedInfo.memberNickname}
          </Link>

          {/* 팔로우 여부, 본인 게시글 일때 출력이 달라야함 */}
          {userId === feedInfo.memberId ? (
            <Link
              to={{
                pathname: `/ModifyFeed/${feedInfo.postId}`,
                state: feedInfo.postId,
              }}
              className="feed-modify"
            >
              수정
            </Link>
          ) : (
            <div className={followStateClass} onClick={followClickHandler}>
              {currentFollowState ? "팔로잉" : "팔로우"}
            </div>
          )}
          {/* 팔로우 여부, 본인 게시글 일때 출력이 달라야함 */}
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        </div>

        {/* carousel start */}

        <Slider {...settings}>
<<<<<<< HEAD
          {feedInfo.images.map((image, index) => (
            <img
              key={index}
=======
          {feedInfo.images.length > 0 ? (
            feedInfo.images.map((image, index) => (
              <div className="feed-image-container">
                <img
                  key={index}
                  className="feed-image"
                  src={`${process.env.REACT_APP_BACKEND_URL}/${image.fileUrl}`}
                  alt="post images"
                />
              </div>
            ))
          ) : (
            <div className="feed-image-container">
              <img
                className="feed-image"
                src={"/assets/images/jge.png"}
                alt="post images"
              />
            </div>
          )}
          {/* dummy image */}
          {/* <div className="feed-image-container">
            <img
              // key={index}
              className="feed-image"
              src={"/assets/images/background.png"}
              alt="post images"
            />
          </div>
          <div className="feed-image-container">
            <img
              // key={index}
              className="feed-image"
              src={"/assets/123123123.png"}
              alt="post images"
            />
          </div>
          <div className="feed-image-container">
            <img
              // key={index}
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
              className="feed-image"
              src={"/assets/images/jge.png"}
              alt="post images"
            />
<<<<<<< HEAD
          ))}
          <img
            // key={index}
            className="feed-image"
            src={"/assets/images/jge.png"}
            alt="post images"
          />
          <img
            // key={index}
            className="feed-image"
            src={"/assets/images/jge.png"}
            alt="post images"
          />
          <img
            // key={index}
            className="feed-image"
            src={"/assets/images/jge.png"}
            alt="post images"
          />
          <img
            // key={index}
            className="feed-image"
            src={"/assets/images/jge.png"}
            alt="post images"
          />
        </Slider>
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
=======
          </div> */}

          {/* dummy image end*/}
        </Slider>
        {/* carousel end */}

        <div className="feed-footer">
          <div className="feed-insight">
            <div className="feed-likes ">{feedInfo.likeCount} likes</div>
            {/* 하트가 클릭됐을때 무언가 돼야합니다 */}
            {feedInfo.memberId !== userId && (
              <img
                src={
                  feedLikeState
                    ? "/assets/icons/likeHeart.png"
                    : "/assets/icons/unlikeHeart.png"
                }
                alt="하트"
                onClick={likeClickHandler}
              />
            )}
          </div>
          <div className="feed-caption">{feedInfo.content}</div>
          <div className="feed-tags">
            {feedInfo.tags.map((tag, index) => {
              return (
                <FeedTag
                  key={index}
                  tagInfo={tag}
                  onClick={() => tagClickHandler()}
                />
              );
            })}
          </div>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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

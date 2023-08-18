import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Feed.css";

import { authorizedRequest } from "../account/AxiosInterceptor";

import FeedTag from "./FeedTag";
import { Link } from "react-router-dom";

const Feed = ({
  feedInfo,
  currentFollowState,
  likedFeedData,
  userId,
  onFollowChange,
  onLikeStateChange,
}) => {
  const [feedLikeState, setFeedLikeState] = useState(
    likedFeedData.length > 0
      ? likedFeedData.find((likedFeed) => likedFeed.postId === feedInfo.postId)
        ? true
        : false
      : false
  );

  const [loading, setLoading] = useState(false);

  const followStateClass = currentFollowState
    ? "feed-following"
    : "feed-not-follow";

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    prevArrow: <></>,
    nextArrow: <></>,
  };

  const followClickHandler = async () => {
    onFollowChange(currentFollowState, feedInfo.memberId);
    console.log("follow btn clicked", feedInfo.memberId);
  };

  const likeClickHandler = () => {
    console.log("like btn clicked", feedLikeState);
    feedInfo.likeCount += !feedLikeState ? 1 : -1;
    toggleLikeState();

    setFeedLikeState(!feedLikeState);

    onLikeStateChange(feedInfo, !feedLikeState);

    console.log(feedInfo.postId, feedLikeState, feedInfo);
  };

  const tagClickHandler = () => {
    console.log("tagClicked", userId, feedInfo);
  };

  const toggleLikeState = async () => {
    setLoading(true);
    try {
      console.log(feedLikeState);
      const response = await authorizedRequest({
        method: "post",
        url: !feedLikeState
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

  return (
    <div className="feed-wrapper">
      <div className="feed-board">
        <div className="feed-header">
          <img
            className="feed-profile-img"
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
        </div>

        {/* carousel start */}

        <Slider {...settings}>
          {feedInfo.images.length > 0 ? (
            feedInfo.images.map((image, index) => (
              <div key={index} className="feed-image-container">
                <img
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
        </Slider>
        {/* carousel end */}

        <div className="feed-footer">
          <div className="feed-insight">
            <div className="feed-likes ">{feedInfo.likeCount} likes</div>
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
                  key={tag + index}
                  tagInfo={tag}
                  onClick={() => tagClickHandler()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
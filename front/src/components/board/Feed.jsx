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
      <div className="feed-board">
        <div className="feed-header">
          <img
            className="feed-profile-img"
            // null 값에 feedInfo.post.memberImageUrl가 들어가야함
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
        </div>

        {/* carousel start */}

        <Slider {...settings}>
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
              className="feed-image"
              src={"/assets/images/jge.png"}
              alt="post images"
            />
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
                src={feedLikeState ? "/assets/icons/heart.png" : ""}
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

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
}) => {
  // props 를 여기 usestate로 받을 것인지
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
    setFeedLikeState(!feedLikeState);
  };

  useEffect(() => {
    const toggleLikeState = async () => {
      setLoading(true);
      try {
        let urlString = feedLikeState ? "likes" : "unlikes";
        console.log("feedlikestste id", feedLikeState);
        const response = await authorizedRequest({
          method: "post",
          url: `api1/api/posts/${urlString}?post=${feedInfo.postId}`,
        });
        console.log(feedLikeState, response);
        setLoading(false);
      } catch (error) {
        console.error("fail toggle likedstate");
        setLoading(false);
      }
    };

    toggleLikeState();
  }, [feedLikeState]);

  return (
    <div className="feed-wrapper">
      {/* data */}
      <div>
        <h4>FeedInfo</h4>
        "postId": {feedInfo.postId}, <br />
        "content": {feedInfo.content}, <br />
        "views":{feedInfo.views}, <br />
        "likecnt":{feedInfo.likeCount}, <br />
        "registeredAt":{feedInfo.registeredAt}, <br />
        "memberId":{feedInfo.memberId}, <br />
        "memberImageUrl": {feedInfo.memberImageUrl}, <br />
        "memberNickname": {feedInfo.memberNickname}, <br />
        "images":
        {feedInfo.images.map((image, index) => {
          return (
            <p key={index} style={{ margin: 0 }}>
              {image.fileUrl}
            </p>
          );
        })}
        "tags":
        {feedInfo.tags.map((tag, index) => {
          return <p key={index}>{tag.name}</p>;
        })}
      </div>
      {/* data */}

      <div className="feed-board">
        <div className="feed-header">
          <img
            className="feed-profile-img"
            // null 값에 feedInfo.post.memberImageUrl가 들어가야함
            src={null || `/assets/images/jge.png`}
            alt="progile"
          />
          <Link to={`/Profile/${feedInfo.memberId}`} className="feed-username">
            {feedInfo.memberNickname}
          </Link>

          {/* 팔로우 여부, 본인 게시글 일때 출력이 달라야함 */}
          {userId === feedInfo.memberId ? (
            <Link to={`/`} className="feed-modify">
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
                  src={"/assets/images/jge.png"}
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
            <img
              src={feedLikeState ? "/assets/icons/heart.png" : ""}
              alt="하트"
              onClick={likeClickHandler}
            />
          </div>
          <div className="feed-caption">{feedInfo.content}</div>
          <div className="feed-tags">
            {feedInfo.tags.map((tag, index) => {
              return <FeedTag key={index} tagInfo={tag} />;
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

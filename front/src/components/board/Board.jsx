<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useCallback, useRef } from "react";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import { authorizedRequest } from "../account/AxiosInterceptor";
import axios from "axios";
import Feed from "./Feed";
import FeedTag from "./FeedTag";
<<<<<<< HEAD

import "./Board.css";
const Board = () => {
=======
import "../../utils/util";

import { useRecoilValue, useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

import { useInView } from "react-intersection-observer";

import "./Board.css";
import { getCurrentTime } from "../../utils/util";

import { Link } from "react-router-dom";

const Board = () => {
  const userInfo = useRecoilValue(loginuser);

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  const [tagListData, setTagListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [feedListData, setFeedListData] = useState([]);
<<<<<<< HEAD

  // #region
  ////////////////add dummy feed/////////////////////
  ///////////////////////////////////////////////////
  const addFeed = async () => {
    try {
      const response = await axios.get("api/posts/1");
      console.log("dummy load success", response.data);
      console.log(typeof response.data);
      setFeedListData((prev) => [...prev, response.data]);
      console.log("add success", feedListData);
    } catch (error) {
      console.error("list append error");
    }
  };
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  // #endregion
=======
  // 팔로우 기능을 위한 현재 사용자 정보
  const [followerList, setFollowList] = useState([]);

  // 무한 스크룰을 사용하기 위한 변수
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  // 좋아요 상태들을 저장하는 변수
  const [likedFeedData, setLikedFeedData] = useState([]);

  // 선택된 태그의 상태를 가지는 변수
  const [selectedTag, setSelectedTag] = useState(null);
  // 태그 버튼 눌렀을 때 스크룰을 최상단으로 올리는 변수
  const tagTargetDiv = useRef(null);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

  // 태그의 이름들을 가져옵니다
  useEffect(() => {
    const getTagList = async () => {
      try {
        setLoading(true);

<<<<<<< HEAD
        const response = await axios.get("api1/api/tags");
        // console.log("tag load success", response.data);
        setTagListData(response.data);
      } catch (error) {
        console.error("tag load error");
=======
        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/tags`,
        });

        console.log("tag load success", response.data);
        setTagListData(response.data);
      } catch (error) {
        console.error("tag load error");
      } finally {
        setLoading(false);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      }
    };
    getTagList();
  }, []);

<<<<<<< HEAD
  // 게시글들을 가져옵니다
  useEffect(() => {
    const getFeedList = async () => {
      try {
        setLoading(true);

        const response = await axios.get("api1/api/posts/2");
        console.log("feed load success", response.data);
        setFeedListData([response.data]);
        // console.log("feedListData", feedListData);
      } catch (error) {
        console.error("feed load error");
      }
    };

    getFeedList();
  }, []);

  return (
    <div className="board-wrapper">
      <div className="board-header">
        <div className="board-title-container">
          <div>SNS </div>
        </div>
        <div className="board-search-img-container">
          <img src="/assets/icons/kakao.PNG" alt="검색버튼" />
        </div>
      </div>
      <div className="board-tag-wrapper">
        {}
        <FeedTag tagInfo={{ tagId: 0, tagName: "ALL" }} />
        {Object.keys(tagListData).map((key) => {
          const tag = tagListData[key];
          return <FeedTag tagInfo={tag} />;
=======
  //팔로우 여부를 확인하기 위해 사용자의 팔로잉 정보를 가져옵니다
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/members/follow/${userInfo.memberId}`,
        });
        // console.log("followList success");
        setFollowList(response.data);
      } catch (error) {
        console.error("can't get current users followers");
      }
    };
    getFollowers();
    // 팔로워 팔로잉 문제가 발생하면 여기서 발생 할 것으로 추정
  }, [followerList]);

  // 좋아요하는 게시글에 대한 정보를 가져옵니다
  useEffect(() => {
    const getLikedFeeds = async () => {
      setLoading(true);
      try {
        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/posts/my-like?page=1&size=`,
        });
        console.log("success get likedFeedList", response.data);

        setLikedFeedData((prevData) => prevData.concat(response.data.data));
      } catch (error) {
        console.error("failed get likedFeedList");
      } finally {
        setLoading(false);
      }
    };
    getLikedFeeds();
  }, []);

  //보여줄 피드의 개수를 정합니다
  const showFeedCount = 5;
  const getFeedList = useCallback(async () => {
    try {
      setLoading(true);

      console.log();

      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/posts?page=${page}&size=${showFeedCount}&time=${getCurrentTime(
          Date.now()
        )}`,
      });
      if (response.data.data.length === 0) {
        return;
      }
      console.log("feed load success", response);
      console.log("feed load data", response.data.data);
      setFeedListData((prevData) => prevData.concat(response.data.data));

      console.log(feedListData);
    } catch (error) {
      console.error("feed load error");
    } finally {
    }
    setLoading(false);
  }, [page]);

  // `feedListData` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getFeedList();
  }, [getFeedList]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니고 inView가 true인 경우에만 실행
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  const followChange = async (state, postMemberId) => {
    console.log(state, postMemberId);

    try {
      const response = await authorizedRequest({
        method: "post",
        url: `/api1/api/follow/${
          state ? "cancel" : "register"
        }?follow=${postMemberId}`,
      });
      console.log("success toggle follow state", response);
    } catch (error) {
      console.error("can't change follow state");
    }
  };

  const likeStateChange = (feedInfo, like) => {
    if (like) {
      likedFeedData.filter((likedFeed) => likedFeed.postId === feedInfo.postId);
    } else {
      likedFeedData.push(feedInfo);
    }
  };

  const tagClickHandler = (tag) => {
    if (tagTargetDiv.current) {
      tagTargetDiv.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    console.log("태크클릭핸들러작동");
    if (tag.tagName === "ALL") {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  // useEffect(() => {
  //   if (selectedTag && feedListData.length > 0) {
  //     const hasTaggedFeeds = feedListData.some((feed) =>
  //       feed.tags.some((tag) => tag.tagId === selectedTag.tagId)
  //     );

  //     if (!hasTaggedFeeds) {
  //       // 태그에 해당하는 게시글이 없으면 추가적으로 게시글 로드
  //       getFeedList();
  //     }
  //   }
  // }, [selectedTag, feedListData]);

  return (
    <div className="board-wrapper">
      {/* <Test></Test> */}

      <div className="board-header">
        <div className="board-title-container">
          <h1>NAKNAK</h1>
        </div>
        <img
          className="board-search-img-container"
          src="/assets/cats/cat.PNG"
          alt="검색버튼"
        />
      </div>
      <div className="board-tag-wrapper">
        <FeedTag
          tagInfo={{ tagId: -1, tagName: "ALL" }}
          active={!selectedTag ? true : false}
          onClick={tagClickHandler}
        />
        {Object.keys(tagListData).map((key) => {
          const tag = tagListData[key];
          return (
            <FeedTag
              tagInfo={tag}
              active={
                !selectedTag
                  ? false
                  : tag.tagId === selectedTag.tagId
                  ? true
                  : false
              }
              onClick={tagClickHandler}
            />
          );
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        })}
        {/* dummy data start */}

        {/* dummy data end */}
      </div>
<<<<<<< HEAD
      <div className="board-board board-disable-scrollbar">
        <div className="borad-carousel ">
          <button onClick={addFeed}>create dummy</button>
          {/* dummy feed data start */}
          {/* feedListData의 데이터를 HTML로 출력 */}
          {Object.keys(feedListData).map((key) => {
            const feed = feedListData[key];
            return <Feed feedInfo={feed} />;
          })}
          {/* dummy feed data end */}
        </div>
      </div>
=======
      <div ref={tagTargetDiv} className="board-board board-disable-scrollbar">
        <div className="board-carousel ">
          {/* feedListData의 데이터를 HTML로 출력 */}
          {feedListData.length === 0 ? (
            <div className="board-loading">
              게시글이 없습니다.
              {/* <img src="/assets/loading.gif" alt="" /> */}
            </div>
          ) : (
            Object.keys(feedListData).map((index) => {
              const feed = feedListData[index];
              if (
                !selectedTag ||
                feed.tags.find((tag) => tag.tagId === selectedTag.tagId)
              ) {
                return (
                  <div ref={ref}>
                    {/* {inView.toString()} */}
                    <Feed
                      key={index}
                      //경고가 있어서 일단 key를 넘겼습니다 안넘겨도 현재까지는 에러발생 x
                      feedInfo={feed}
                      currentFollowState={
                        followerList.data &&
                        followerList.data.find(
                          (follower) => follower.memberId === feed.memberId
                        )
                          ? true
                          : false
                      }
                      likedFeedData={likedFeedData}
                      userId={userInfo.memberId}
                      onFollowChange={followChange}
                      onLikeStateChange={likeStateChange}
                    />
                  </div>
                );
              } else {
                // console.log("hellooooo", feedListData);

                return null;
              }

              return null;
            })
          )}
        </div>
      </div>

      <Link to={`/CreateFeed`}>
        <img
          src="/assets/icons/plus.png"
          alt="create"
          className="board-create-feed"
        />
      </Link>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    </div>
  );
};

export default Board;

import React, { useState, useEffect, useCallback, useRef } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import Feed from "./Feed";
import FeedTag from "./FeedTag";

import "../../utils/util";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { loginuser } from "../../utils/atoms";

import { useInView } from "react-intersection-observer";

import "./Board.css";

import { Link } from "react-router-dom";

const Board = () => {
  const userInfo = useRecoilValue(loginuser);

  const [tagListData, setTagListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [feedListData, setFeedListData] = useState([]);
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

  // 태그의 이름들을 가져옵니다
  useEffect(() => {
    const getTagList = async () => {
      try {
        setLoading(true);

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
      }
    };
    getTagList();
  }, []);

  //팔로우 여부를 확인하기 위해 사용자의 팔로잉 정보를 가져옵니다
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/members/follow/${userInfo.memberId}`,
        });
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
          url: `/api1/api/posts/my-like?page=1&size=&memberId=${userInfo.memberId}`,
        });
        console.log("success get likedFeedList", response.data);

        if (response.data.data.length > 0) {
          setLikedFeedData((prevData) => prevData.concat(response.data.data));
        }
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

      const responseCurrentTime = await axios.get(`/api1/api/time/server`);

      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/posts?page=${page}&size=${showFeedCount}&time=${responseCurrentTime.data.serverTime}`,
      });
      if (response.data.data.length === 0) {
        return;
      }
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

  return (
    <div className="board-wrapper">
      <div className="board-header">
        <div className="board-title-container"></div>
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
        })}
      </div>
      <div ref={tagTargetDiv} className="board-board board-disable-scrollbar">
        <div className="board-carousel ">
          {feedListData.length === 0 ? (
            <div className="board-loading">게시글이 없습니다.</div>
          ) : (
            Object.keys(feedListData).map((index) => {
              const feed = feedListData[index];
              if (
                !selectedTag ||
                feed.tags.find((tag) => tag.tagId === selectedTag.tagId)
              ) {
                return (
                  <div ref={ref}>
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
                return null;
              }
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
    </div>
  );
};

export default Board;

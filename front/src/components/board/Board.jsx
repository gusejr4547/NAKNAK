import React, { useState, useEffect, useCallback } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import axios from "axios";
import Feed from "./Feed";
import FeedTag from "./FeedTag";

import { useRecoilValue, useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

import { useInView } from "react-intersection-observer";

import "./Board.css";
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

  // 태그의 이름들을 가져옵니다
  useEffect(() => {
    const getTagList = async () => {
      try {
        setLoading(true);

        const response = await axios.get("api1/api/tags");
        // console.log("tag load success", response.data);
        setTagListData(response.data);
      } catch (error) {
        console.error("tag load error");
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
          url: `api1/api/members/follow/${userInfo.memberId}`,
        });
        setFollowList(response.data);
      } catch (error) {
        console.error("can't get current users followers");
      }
    };
    getFollowers();

    // 팔로워 팔로잉 문제가 발생하면 여기서 발생 할 것으로 추정
  }, [followerList]);

  const getFeedList = useCallback(async () => {
    try {
      setLoading(true);

      const response = await await authorizedRequest({
        method: "get",
        url: `api1/api/posts?page=${page}&size=2`,
      });
      if (response.data.data.length > 0) {
        console.log("feed load success", response.data.data);
        setFeedListData((prevData) => prevData.concat(response.data.data));
      }
      // console.log("feedListData", feedListData);
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
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  const followChange = async (state, postMemberId) => {
    console.log(state, postMemberId);

    try {
      const response = await authorizedRequest({
        method: "post",
        url: `api1/api/follow/${
          state ? "cancel" : "register"
        }?follow=${postMemberId}`,
      });
      console.log("success toggle follow state", response);
    } catch (error) {
      console.error("can't change follow state");
    }
  };

  return (
    <div className="board-wrapper">
      <div className="board-header">
        <div className="board-title-container">
          <div>
            <h3>NAKNAK</h3>
          </div>
        </div>
        <div className="board-search-img-container">
          <img src="/assets/cats/cat.PNG" alt="검색버튼" />
        </div>
      </div>
      <div className="board-tag-wrapper">
        <FeedTag tagInfo={{ tagId: 0, tagName: "ALL" }} />
        {Object.keys(tagListData).map((key) => {
          const tag = tagListData[key];
          return <FeedTag tagInfo={tag} />;
        })}
        {/* dummy data start */}

        {/* dummy data end */}
      </div>
      <div className="board-board board-disable-scrollbar">
        <div className="board-carousel ">
          {/* feedListData의 데이터를 HTML로 출력 */}
          {feedListData.length > 0 &&
            Object.keys(feedListData).map((index) => {
              const feed = feedListData[index];
              return (
                <div ref={ref}>
                  <Feed
                    key={index}
                    //경고가 있어서 일단 key를 넘겼습니다 안넘겨도 현재까지는 에러발생 x
                    feedInfo={feed}
                    followerList={followerList}
                    userId={userInfo.userId}
                    currentFollowState={
                      followerList.data.find(
                        (follower) => follower.memberId === feed.post.memberId
                      )
                        ? true
                        : false
                    }
                    onFollowChange={followChange}
                  />
                </div>
              );
            })}

          {/* dummy feed data start */}

          {/* dummy feed data end */}
        </div>
      </div>
    </div>
  );
};

export default Board;

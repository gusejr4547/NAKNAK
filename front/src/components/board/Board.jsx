import React, { useState, useEffect } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import axios from "axios";
import Feed from "./Feed";
import FeedTag from "./FeedTag";

import { useRecoilValue, useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

import "./Board.css";
const Board = () => {
  const userInfo = useRecoilValue(loginuser);

  const [tagListData, setTagListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [feedListData, setFeedListData] = useState([]);
  // 팔로우 기능을 위한 현재 사용자 정보
  const [followerList, setFollowList] = useState([]);

  // #region
  ////////////////add dummy feed/////////////////////
  ///////////////////////////////////////////////////
  const addFeed = async () => {
    try {
      const response = await axios.get("api1/api/posts/1");
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
          url: `api/members/follow/${userInfo.memberId}`,
        });
        console.log("success getting followers", response);
        setFollowList(response.data);
      } catch (error) {
        console.error("can't get current users followers");
      }
    };
    getFollowers();
  }, []);

  // 게시글들을 가져옵니다
  useEffect(() => {
    const getFeedList = async () => {
      try {
        setLoading(true);

        const response = await await authorizedRequest({
          method: "get",
          url: `api1/api/posts?page=1&size=5`,
        });
        console.log("feed load success", response.data);
        setFeedListData(response.data.data);
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
          <div>
            <h3>SNSNSNSNSNSNSN</h3>
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
        <div className="borad-carousel ">
          {/* 더미 추가 버튼 */}
          <button onClick={addFeed}>create dummy</button>

          {/* feedListData의 데이터를 HTML로 출력 */}
          {Object.keys(feedListData).map((key) => {
            const feed = feedListData[key];
            return (
              <Feed
                feedInfo={feed}
                followerList={followerList}
                userId={userInfo.userId}
              />
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

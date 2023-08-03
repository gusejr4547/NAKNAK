import React, { useState, useEffect } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import axios from "axios";
import Feed from "./Feed";
import FeedTag from "./FeedTag";

import "./Board.css";
const Board = () => {
  const [tagListData, setTagListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [feedListData, setFeedListData] = useState([]);

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

  // 태그의 이름들을 가져옵니다
  useEffect(() => {
    const getTagList = async () => {
      try {
        setLoading(true);

        const response = await axios.get("api/tags");
        // console.log("tag load success", response.data);
        setTagListData(response.data);
      } catch (error) {
        console.error("tag load error");
      }
    };
    getTagList();
  }, []);

  // 게시글들을 가져옵니다
  useEffect(() => {
    const getFeedList = async () => {
      try {
        setLoading(true);

        const response = await axios.get("api/posts/2");
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
          <div>요기는 </div>
        </div>
        <div className="board-search-img-container">
          <img src="/assets/icons/kakao.PNG" alt="검색버튼" />
        </div>
      </div>
      <div className="board-tag-wrapper">
        {Object.keys(tagListData).map((key) => {
          const tag = tagListData[key];
          return <FeedTag tagInfo={tag} />;
        })}
        {/* dummy data start */}

        {/* dummy data end */}
      </div>
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
    </div>
  );
};

export default Board;

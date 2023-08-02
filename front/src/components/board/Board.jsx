import React, { useState, useEffect } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import "./Board.css";
import axios from "axios";

const Board = () => {
  const [tagListData, setTagListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [feedListData, setFeedListData] = useState([
    //dummy data
  ]);
  ////////////////add dummy feed/////////////////////
  ///////////////////////////////////////////////////
  var cnt = 1;
  const addFeed = async () => {
    try {
      const response = await axios.get("api/posts/1");
      console.log("dummy load success", response.data);
      console.log(typeof response.data);
      response.data.postId += cnt++;
      console.log(cnt);
      setFeedListData((prev) => [...prev, response.data]);
      console.log("add success", feedListData);
    } catch (error) {
      console.error("list append error");
    }
  };
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  useEffect(() => {
    const getTagList = async () => {
      try {
        setLoading(true);

        const response = await axios.get("url");
        console.log("tag load success", response.data);
      } catch (error) {
        console.error("tag load error");
      }
    };
    // getTagList();
  }, []);

  useEffect(() => {
    const getFeedList = async () => {
      try {
        setLoading(true);

        const response = await axios.get("api/posts/1");
        console.log("feed load success", response.data);
        setFeedListData([response.data]);
        console.log("feedListData", feedListData);
      } catch (error) {
        console.error("feed load error");
      }
    };

    getFeedList();
  }, []);

  return (
    <div className="board-wrapper">
      <div className="board-search-bar"></div>
      <div className="board-tag-wrapper"></div>
      <div className="board-board">
        <div className="borad-feed-carousel">
          {/* input dummy */}
          <button onClick={addFeed}>create dummy</button>
          {/* dummy feed data start */}
          {/* feedListData의 데이터를 HTML로 출력 */}
          {Object.keys(feedListData).map((key) => {
            const feed = feedListData[key];
            return <div>{feed.postId}</div>;
          })}
          {/* dummy feed data end */}
        </div>
      </div>
    </div>
  );
};

export default Board;

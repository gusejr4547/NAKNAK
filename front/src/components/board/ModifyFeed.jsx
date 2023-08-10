import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

import "./ModifyFeed.css";

const ModifyFeed = () => {
  const postId = useParams().postId;
  const [feedInfo, setFeedInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTargetFeed = async () => {
      try {
        setLoading(true);

        const response = await authorizedRequest({
          method: "get",
          // 도무지 이해할 수 없는 다른곳은 url 앞에 다 / 를 안붙였는데 여기는 붙여야 됨... env 파일 변경 해도 다른건 다 됨..
          url: `/api1/api/posts/${postId}`,
        });

        console.log("feed load success", response.data);

        setFeedInfo(response.data);
      } catch (error) {
        console.error("feed load error");
      } finally {
        setLoading(false);
      }
    };
    getTargetFeed();
  }, []);

  // feedInfo가 존재하는 경우에만 사용
  if (!postId) {
    return <div>Loading...</div>; // 혹은 다른 처리를 할 수 있음
  }

  return (
    <div className="modify-feed-wrapper">
      <div className="modify-feed-header">
        <Link to={`/Board`} className="modify-feed-cancel">
          <img src="" alt="취소" />
        </Link>
        <div className="modify-feed-title">
          <h1>대충 수정한다는 말</h1>
        </div>
        {/* 아래 onClick 필요 */}
        <div className="modify-feed-submit">
          <img src="" alt="수정" />
        </div>
      </div>
      <div className="modify-feed-contents">
        {/* 여기서부터 하나씩 집어넣으면 됨 */}
      </div>
    </div>
  );
};

export default ModifyFeed;

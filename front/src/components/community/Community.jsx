import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { authorizedRequest } from "../account/AxiosInterceptor";

function Community(props) {
  const [feedData, setfeedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accesstoken, setToken] = useRecoilState(token);

  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    try {
      setLoading(true);
      const response = await authorizedRequest({
        method: "get",
        url: "전체 게시글",
      });
      setfeedData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error posting data:", error);
      setError("데이터 전송에 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>커뮤니티</h1>
    </div>
  );
}

export default Community;

import React, { useState } from "react";
import axios from "axios";
import ImgProcess from "./ImgProcess";

const Test = () => {
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [postData, setPostData] = useState({});
  const [getData, setGetData] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/members");
      const jsonData = response.data;
      console.log(response.data)
      setGetData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("데이터 로드에 실패했습니다.");
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchData();
  };

  const loginHandleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", loginData);
      console.log(response.data)
      setPostData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error posting data:", error);
      setError("데이터 전송에 실패했습니다.");
      setLoading(false);
    }
  };

  const loginHandleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        <h2>Test Page</h2>
      </div>
      <hr />
      <h2>Post</h2>
      <input type="text" name="email" onChange={loginHandleChange} />
      <input type="password" name="password" onChange={loginHandleChange} />
      <button onClick={loginHandleClick}>post</button>
      <br />
      <pre>{JSON.stringify(loginData, null, 2)}</pre>
      <br />
      <pre>{JSON.stringify(postData, null, 2)}</pre>
      <hr />
      <h2>Get</h2>
      <pre>{JSON.stringify(getData, null, 2)}</pre>
      <button onClick={handleClick}>데이터 가져오기</button>
      <hr />
      {/* <ImgProcess /> */}
    </div>
  );
};

export default Test;

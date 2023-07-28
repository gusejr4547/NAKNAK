import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";

function Login(props) {
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useRecoilState(loginuser);
  const [accesstoken, setToken] = useRecoilState(token);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (accesstoken) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const loginHandleClick = async () => {
    try {
      setLoading(true);
      console.log(loginData);
      const response = await axios.post("/api/login", loginData);
      setPostData(response.data);
      console.log(response.headers.authorization);
      setToken(response.headers.authorization);
      navigate("/");
      console.log(postData, 123);
      console.log(response, 456);
      setLoading(false);
    } catch (error) {
      console.log(loginData);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ margin: "30px 0px 0px 0px" }}>로그인 페이지</h1>
      <img
        src="assets/cats/cat.png"
        alt=""
        style={{ width: "150px", height: "150px" }}
      />

      <div
        style={{
          display: "inline-block",
          width: "200px",
          height: "120px",
          margin: "30px 0px 0px 0px",
        }}
      >
        <input
          type="text"
          placeholder="id"
          name="email"
          onChange={loginHandleChange}
        />
        <input
          type="text"
          placeholder="password"
          style={{ margin: "10px 0px 0px 0px" }}
          name="password"
          onChange={loginHandleChange}
        />
        <Button
          as="input"
          type="button"
          value="로그인"
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={loginHandleClick}
        />
      </div>
      <div
        className="border-top"
        style={{ width: "200px", margin: "10px 0px 0px 0px" }}
      >
        <img
          src="assets/icons/google.PNG"
          alt="Google 로고"
          style={{ width: "30px", height: "30px", margin: "10px 10px 0px 0px" }}
        />
        <img
          src="assets/icons/kakao.PNG"
          alt="Kakao 로고"
          style={{ width: "30px", height: "30px", margin: "10px 0px 0px 0px" }}
        />
        <Link to="/Signup" className="nav-link">
          <Button
            as="input"
            type="button"
            value="회원가입"
            style={{ margin: "10px 0px 0px 0px" }}
          />
        </Link>
      </div>
    </div>
  );
}

export default Login;

// const loginHandleClick = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/login", loginData);
//       setPostData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error posting data:", error);
//       setError("데이터 전송에 실패했습니다.");
//       setLoading(false);
//     }
//   };

//   const loginHandleChange = (event) => {
//     const { name, value } = event.target;
//     setLoginData({ ...loginData, [name]: value });
//   };
//   const [loginData, setLoginData] = useState({});
//   const [postData, setPostData] = useState({});

// {/* <input type="text" name="email" onChange={loginHandleChange} />
// <input type="password" name="password" onChange={loginHandleChange} />
// <button onClick={loginHandleClick}>post</button>

// const loginHandleChange = (event) => {
// const { name, value } = event.target;
// setLoginData({ ...loginData, [name]: value });
// }; */}

// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [loginData, setLoginData] = useState({});
//   const [postData, setPostData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const loginHandleClick = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post('/api/login', loginData);
//       setPostData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error posting data:', error);
//       setError('데이터 전송에 실패했습니다.');
//       setLoading(false);
//     }
//   };

//   const loginHandleChange = (event) => {
//     const { name, value } = event.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         name="email"
//         placeholder="이메일"
//         onChange={loginHandleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="비밀번호"
//         onChange={loginHandleChange}
//       />
//       <button onClick={loginHandleClick}>로그인</button>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {postData && <pre>{JSON.stringify(postData, null, 2)}</pre>}
//     </div>
//   );
// }

// export default Login;

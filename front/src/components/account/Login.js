import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import AuthInput from "./Authinput";
import useInput from "./use_input";
import emailInput from "./email_input";


const isNotEmpty = (value) => value.trim() !== '';
const isValidEmailFormat = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function Login(props) {
  // const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useRecoilState(loginuser);
  const [accesstoken, setAccessToken] = useRecoilState(token);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (accesstoken) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const {
    $value: userIdValue,
    $isValid: userIdIsValid,
    $hasError: userIdHasError,
    $valueChangeHandler: userIdChangeHandler,
    $inputBlurHandler: userIdBlurHandler,
    $reset: resetuserId,
  } = emailInput(isNotEmpty);

  const {
    $value: userPasswordValue,
    $isValid: userPasswordValueIsValid,
    $hasError: userPasswordHasError,
    $valueChangeHandler: userPasswordChangeHandler,
    $inputBlurHandler: userPasswordBlurHandler,
    $reset: resetuserPassword,
  } = useInput(isNotEmpty);




  const loginHandleClick = async () => {
    const loginData = { email: userIdValue, password: userPasswordValue };

    if (!loginData.email) {
      console.log("이메일은 필수 입력값입니다.")
      return;
    }
    if (!isValidEmailFormat(loginData.email)) {
      console.log("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!loginData.password) {
      console.log("비밀번호는 필수 입력값입니다.")
      return;
    } 

    try {
      setLoading(true);
      console.log(loginData);
      const response = await axios.post("/api/login", loginData);
      setPostData(response.data);
      console.log(response.headers.authorization);
      setAccessToken(response.headers.authorization);
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

  const socialLoginHandler = async (provider) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/oauth2/authorization/${provider}`);
      setPostData(response.data);
      console.log(response.headers.authorization);
      setAccessToken(response.headers.authorization);
      navigate("/");
      console.log(postData, 123);
      console.log(response, 456);
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
          height: "240px",
          margin: "30px 0px 0px 0px",
        }}
      >

        <AuthInput
          label="아이디"
          type="text"
          id="userId"
          placeholder="아이디 입력"
          $value={userIdValue}
          onChange={userIdChangeHandler}
          onBlur={userIdBlurHandler}
          $hasError={userIdHasError}
          $errorText={userIdHasError}
        />
        <AuthInput
          label="비밀번호"
          type="password"
          id="userPassword"
          placeholder="비밀번호 입력"
          $value={userPasswordValue}
          onChange={userPasswordChangeHandler}
          onBlur={userPasswordBlurHandler}
          $hasError={userPasswordHasError}
          $errorText="필수 입력값입니다"
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
        <Button
        as="input" 
        onClick={() => socialLoginHandler('google')}
        type="button"
        value="구글 로그인"
        style={{ backgroundColor:"white", color:"black" }}
       ></Button>
       <Button 
        as="input"
        onClick={() => socialLoginHandler('kakao')}
        type="button"
        value="카카오 로그인"
        style={{ margin: "10px 0px 0px 0px", backgroundColor:"yellow", color:"black" }}
       ></Button>
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
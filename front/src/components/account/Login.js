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
// import { getData, postData } from "../../utils/api";
import "./Login.css";

const isNotEmpty = (value) => value.trim() !== "";
const isValidEmailFormat = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function Login(props) {
  // const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useRecoilState(loginuser);
  const [accesstoken, setAccessToken] = useRecoilState(token);
  const navigate = useNavigate();
  const CLIENT_ID = "6a4bb2fa60ad461ae820953255846ebf";
  const REDIRECT_URI =
    "http://passportlkm.iptime.org:20101/login/oauth2/code/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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

  const loginHandleKey = (eve) => {
    if (eve.key == "Enter") {
      loginHandleClick();
    }
  };

  const register = () => {
    navigate("/Signup");
  };

  const logout = () => {
    setUserData(undefined);
    console.log(userData);
    setAccessToken(undefined);
    console.log(accesstoken);
    localStorage.setItem("key", undefined);
    const tt = localStorage.getItem("key");
    console.log(tt);
  };
  const loginHandleClick = async () => {
    const loginData = { email: userIdValue, password: userPasswordValue };

    if (!loginData.email) {
      console.log("이메일은 필수 입력값입니다.");
      return;
    }
    if (!isValidEmailFormat(loginData.email)) {
      console.log("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!loginData.password) {
      console.log("비밀번호는 필수 입력값입니다.");
      return;
    }

    try {
      setLoading(true);
      console.log(loginData);
      const response = await axios.post("/api1/api/login", loginData);
      setUserData(response.data);
      console.log(response.headers.authorization);
      setAccessToken(response.headers.authorization);
      localStorage.setItem("key", response.headers.authorization);
      console.log(accesstoken, 789);
      navigate("/");
      // console.log(postData, 123);
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
      const response = await axios.get(
        `/api1/oauth2/authorization/${provider}`
        // "/api1/oauth2/authorization/google"
      );
      setUserData(response.data);
      console.log(response.headers.authorization);
      setAccessToken(response.headers.authorization);
      localStorage.setItem("key", response.headers.authorization);
      navigate("/");
      // console.log(postData, 123);
      console.log(response, 456);
      setLoading(false);
    } catch (error) {
      console.error("Error posting data:", error);
      setError("데이터 전송에 실패했습니다.");
      setLoading(false);
    }
  };

  // const loginHandleChange = (event) => {
  //   const { name, value } = event.target;
  //   setLoginData({ ...loginData, [name]: value });
  // };

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
        justifyContent: "center",
        height: "100vh",
        padding: "0px 0px 50% 0px",
      }}
    >
      <img
        src="assets/cats/cat.png"
        alt=""
        style={{ width: "150px", height: "150px" }}
      />

      <div className="logininputbox">
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
          onKeyPress={loginHandleKey}
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
          onKeyPress={loginHandleKey}
        />
        <div className="loginbuttonbox">
          <Button
            as="input"
            type="button"
            value="로그인"
            style={{ margin: "auto" }}
            onClick={loginHandleClick}
          />
          <Button
            as="input"
            type="button"
            value="로그아웃"
            style={{ margin: "auto" }}
            onClick={logout}
          />
        </div>
      </div>
      <div
        className="border-top"
        style={{ width: "250px", margin: "10px 0px 0px 0px" }}
      >
        <p style={{ fontSize: "13px" }}>
          Don't have an account?{" "}
          <span onClick={register} style={{ color: "blue" }}>
            Register me
          </span>
        </p>

        <div className="loginsocial"></div>
        <Button
          as="input"
          onClick={() => socialLoginHandler("google")}
          type="button"
          value=""
          style={{
            backgroundColor: "white",
            color: "black",
            width: "30%",
            height: "30%",
            backgroundImage: `url(/assets/icons/Google1.png)`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        ></Button>

        <Button
          as="input"
          onClick={() => socialLoginHandler("kakao")}
          type="button"
          value=""
          style={{
            backgroundColor: "yellow",
            color: "black",
            width: "30%",
            height: "30%",
            backgroundImage: `url(/assets/icons/kakao_login_large.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Button>
        <a
          // href={KAKAO_AUTH_URL}
          href="api1/oauth2/authorization/google"
        >
          <p>123</p>
        </a>
      </div>
    </div>
  );
}

export default Login;

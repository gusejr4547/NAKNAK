import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import AuthInput from "./Authinput";
import useInput from "./use_input";
import emailInput from "./email_input";
// import { getData, postData } from "../../utils/api";
=======
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loginuser,
  token,
  newbie_recoil,
  profileData_recoil,
  favoritePoint_recoil,
  location_recoil,
} from "../../utils/atoms";
import AuthInput from "./Authinput";
import useInput from "./use_input";
import emailInput from "./email_input";
import { authorizedRequest } from "../account/AxiosInterceptor";
import Wave from "react-wavify";
import { GetLocation, callFlutter } from "../../utils/location";

import "./Login.css";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

const isNotEmpty = (value) => value.trim() !== "";
const isValidEmailFormat = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function Login(props) {
<<<<<<< HEAD
  // const [loginData, setLoginData] = useState({});
=======
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useRecoilState(loginuser);
  const [accesstoken, setAccessToken] = useRecoilState(token);
<<<<<<< HEAD
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
=======
  const [profileData, setProfileData] = useRecoilState(profileData_recoil);
  const navigate = useNavigate();
  // const CLIENT_ID = "6a4bb2fa60ad461ae820953255846ebf";
  // const REDIRECT_URI =
  //   "http://passportlkm.iptime.org:20101/login/oauth2/code/kakao";
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  //뉴비버젼 유무
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  // 즐겨찾기 목록 조회
  const [favoritePoint, setFavoritePoint] =
    useRecoilState(favoritePoint_recoil);
  const [location, setLocation] = useRecoilState(location_recoil);

  const {
    $value: userIdValue,
    // $isValid: userIdIsValid,
    $hasError: userIdHasError,
    $valueChangeHandler: userIdChangeHandler,
    $inputBlurHandler: userIdBlurHandler,
    // $reset: resetuserId,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  } = emailInput(isNotEmpty);

  const {
    $value: userPasswordValue,
<<<<<<< HEAD
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
  const logout = () => {
    setUserData(null);
    console.log(userData);
    setAccessToken(null);
    console.log(accesstoken);
    localStorage.setItem("key", null);
    const tt = localStorage.getItem("key");
    console.log(tt);
  };
=======
    // $isValid: userPasswordValueIsValid,
    $hasError: userPasswordHasError,
    $valueChangeHandler: userPasswordChangeHandler,
    $inputBlurHandler: userPasswordBlurHandler,
    // $reset: resetuserPassword,
  } = useInput(isNotEmpty);

  const loginHandleKey = (eve) => {
    if (eve.key === "Enter") {
      loginHandleClick();
    }
  };
  useEffect(() => {
    handlebutton();
  }, []);

  const handlebutton = () => {
    if (window.flutter_inappwebview) {
      handleButtonClick();
    } else {
      handleClick();
    }
  };

  async function handleButtonClick() {
    const data = await callFlutter();
    setLocation(data);
    // {latitude: 35.1029935, longitude: 128.8519049}
  }

  // 버튼을 누를 때 호출되는 함수
  function handleClick() {
    (async () => {
      try {
        const locationData = await GetLocation();
        // 위치 데이터를 이용한 추가 작업
        console.log(locationData);
        setLocation(locationData);
        // {latitude: 35.1029935, longitude: 128.8519049}
      } catch (error) {
        // 오류 처리
      }
    })();
  }

  const register = () => {
    navigate("/Signup");
  };

  // 즐겨찾기 목록
  const getFavoritePoint = async () => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: "/api1/api/fishingholes/favorites",
      });
      console.log(response);
      setFavoritePoint(response.data);
      // console.log(response.data);
    } catch (err) {
      throw err;
    }
  };

  //유저정보받아오기 함수
  const getUser = async (memberId) => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/members/${memberId}`,
      });
      setProfileData(response.data);
      console.log(response.data);

      // 뉴비 인지 아닌 지 저장
      // 찐 뉴비인 경우
      const tutorialProgress =
        response.data.memberStatusResponse.tutorialProgress;
      const isNewBie = response.data.memberStatusResponse.isNewBie;
      if (isNewBie === -1 && tutorialProgress === 0) {
        setNewbie(1);
        navigate("/Freshman", { state: { page: false } });
      } // 원투낚시
      else if (isNewBie === 1 && tutorialProgress === 20) {
        setNewbie(1);
        // 원투낚시 페이지로 이동
        navigate("/Freshman", { state: { page: "Onetwo" } });
      } // 루어낚시
      else if (isNewBie === 2 && tutorialProgress === 20) {
        setNewbie(1);
        navigate("/Freshman", { state: { page: "Lure" } });
      } // 40인사람은 newbie페이지 이동
      else if (isNewBie !== 0 && tutorialProgress === 40) {
        setNewbie(1);
        navigate("/Newbie");
      } // 60인사람은 카메라로 이동
      else if (isNewBie !== 0 && tutorialProgress === 60) {
        setNewbie(1);
        navigate("/Newbie", { state: 5 });
      }
      // 80인사람은 체크리스트로 이동
      else if (isNewBie !== 0 && tutorialProgress === 80) {
        setNewbie(1);
        navigate("/Checkbox");
      } // 뉴비 아닐경우 메인
      else if (isNewBie === 0) {
        navigate("/");
      }
      getFavoritePoint();
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false); // 데이터 로딩 완료 (에러 발생)
    }
  };

  // 로그인 함수
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======
      getUser(response.data.memberId);

      //로그인 성공 시, 유저 정보 받아오기
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    } catch (error) {
      console.log(loginData);
      console.error("Error posting data:", error);
      setError("데이터 전송에 실패했습니다.");
      setLoading(false);
    }
  };

<<<<<<< HEAD
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
=======
  // const socialLoginHandler = async (provider) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `/api1/oauth2/authorization/${provider}`
  //       // "/api1/oauth2/authorization/google"
  //     );
  //     setUserData(response.data);
  //     console.log(response.headers.authorization);
  //     setAccessToken(response.headers.authorization);
  //     localStorage.setItem("key", response.headers.authorization);
  //     navigate("/");
  //     // console.log(postData, 123);
  //     console.log(response, 456);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //     setError("데이터 전송에 실패했습니다.");
  //     setLoading(false);
  //   }
  // };
  
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
<<<<<<< HEAD
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

        <Button
          as="input"
          type="button"
          value="로그인"
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={loginHandleClick}
        />
        <Button
          as="input"
          type="button"
          value="로그아웃"
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={logout}
        />
      </div>
      <div
        className="border-top"
        style={{ width: "200px", margin: "10px 0px 0px 0px" }}
      >
        <Button
          as="input"
          onClick={() => socialLoginHandler("google")}
          type="button"
          value=""
          style={{
            backgroundColor: "white",
            color: "black",
            width: "50%",
            height: "40%",
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
            width: "50%",
            height: "40%",
            backgroundImage: `url(/assets/icons/kakao_login_large.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Button>

        <Link to="/Signup" className="nav-link">
          <Button
            as="input"
            type="button"
            value="회원가입"
            style={{ margin: "10px 0px 0px 0px" }}
          />
        </Link>
=======
    <div>
      <div>
        <Wave
          className="login_wave1"
          fill="#56A2E9"
          paused={false}
          options={{
            height: 10,
            amplitude: 20,
            speed: 0.3,
            points: 4,
          }}
        />
        <Wave
          className="login_wave2"
          fill="#408BD0"
          paused={false}
          options={{
            height: 10,
            amplitude: 20,
            speed: 0.2,
            points: 3,
          }}
        />
        <Wave
          className="login_wave3"
          fill="#408BD0"
          paused={false}
          options={{
            height: 10,
            amplitude: 20,
            speed: 0.2,
            points: 2,
          }}
        />
        <div className="login-wrapper"></div>
        <div className="login-inputbox">
          <AuthInput
            label="이메일"
            type="text"
            id="userId"
            placeholder="이메일 입력"
            $value={userIdValue}
            onChange={userIdChangeHandler}
            onBlur={userIdBlurHandler}
            $hasError={userIdHasError}
            $errorText={userIdHasError}
            onKeyPress={loginHandleKey}
          />
          <br />
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
          <div className="login-buttonbox">
            <span className="login-button" onClick={() => loginHandleClick()}>
              로그인
            </span>
            <span className="login-button" onClick={() => register()}>
              회원가입
            </span>
          </div>
        </div>
        <div className="login-island" />
        <div className="login-cat" />
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      </div>
    </div>
  );
}

export default Login;

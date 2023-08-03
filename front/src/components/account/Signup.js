import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthInput from "./Authinput";
import useInput from "./use_input";
import emailInput from "./email_input";

function Signup(props) {
  // const [signupData, setSignupData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [postData, setPostData] = useState({});
  const navigate = useNavigate();

  const isNotEmpty = (value) => value.trim() !== "";
  const isValidEmailFormat = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const {
    $value: userIdValue,
    $isValid: userIdIsValid,
    $hasError: userIdHasError,
    $valueChangeHandler: userIdChangeHandler,
    $inputBlurHandler: userIdBlurHandler,
    // $reset: resetuserId,
  } = emailInput(isNotEmpty);

  const {
    $value: userPasswordValue,
    $isValid: userPasswordValueIsValid,
    $hasError: userPasswordHasError,
    $valueChangeHandler: userPasswordChangeHandler,
    $inputBlurHandler: userPasswordBlurHandler,
    // $reset: resetuserPassword,
  } = useInput(isNotEmpty);

  const {
    $value: usernameValue,
    $isValid: usernameValueIsValid,
    $hasError: usernameHasError,
    $valueChangeHandler: usernameChangeHandler,
    $inputBlurHandler: usernameBlurHandler,
    // $reset: resetusername,
  } = useInput(isNotEmpty);

  const {
    $value: usernicknameValue,
    $isValid: usernicknameValueIsValid,
    $hasError: usernicknameHasError,
    $valueChangeHandler: usernicknameChangeHandler,
    $inputBlurHandler: usernicknameBlurHandler,
    // $reset: resetusernickname,
  } = useInput(isNotEmpty);

  const signupHandleKey = (eve) => {
    if (eve.key === "Enter") {
      signupHandleClick();
    }
  };

  const signupHandleClick = async () => {
    const signupData = {
      email: userIdValue,
      password: userPasswordValue,
      name: usernameValue,
      nickname: usernicknameValue,
    };

    if (!signupData.email) {
      console.log("이메일은 필수 입력값입니다.");
      return;
    }
    if (!isValidEmailFormat(signupData.email)) {
      console.log("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!signupData.password) {
      console.log("비밀번호는 필수 입력값입니다.");
      return;
    }

    if (!signupData.name) {
      console.log("이름은 필수 입력값입니다.");
      return;
    }

    if (!signupData.nickname) {
      console.log("별명은 필수 입력값입니다.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("name", signupData.name);
      formData.append("nickname", signupData.nickname);
      const member = "/api/members/register";
      const response = await axios.post("/api1/api/members/register", formData);
       //const response = await axios.post("/api/members/register", formData);
      // const response = await axios.post("/api1" + member, formData);
      // setPostData(response.data);
      navigate("/Login");
      // console.log(postData, 123);
      console.log(response, 456);
      setLoading(false);
    } catch (error) {
      console.log(signupData);
      console.error("Error posting data:", error);
      setError("데이터 전송에 실패했습니다.");
      setLoading(false);
    }
  };

  // const signupHandleChange = (event) => {
  //   const { name, value } = event.target;
  //   setSignupData({ ...signupData, [name]: value });
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "0px 0px 70% 0px",
      }}
    >
      <img
        src="./assets/cats/cat.png"
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
          onKeyPress={signupHandleKey}
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
          onKeyPress={signupHandleKey}
        />
        <AuthInput
          label="이름"
          type="name"
          id="username"
          placeholder="이름 입력"
          $value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
          $hasError={usernameHasError}
          $errorText="필수 입력값입니다"
          onKeyPress={signupHandleKey}
        />
        <AuthInput
          label="닉네임"
          type="nickname"
          id="usernickname"
          placeholder="닉네임 입력"
          $value={usernicknameValue}
          onChange={usernicknameChangeHandler}
          onBlur={usernicknameBlurHandler}
          $hasError={usernicknameHasError}
          $errorText="필수 입력값입니다"
          onKeyPress={signupHandleKey}
        />

        <Button
          as="input"
          type="button"
          value="회원가입"
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={signupHandleClick}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}

export default Signup;

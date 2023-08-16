import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthInput from "./Authinput";
import useInput from "./use_input";
import emailInput from "./email_input";
import "./signup.css";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { authorizedRequest } from "../account/AxiosInterceptor";

function UserUpdate(props) {
  // const [signupData, setSignupData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const [userData, setUserData] = useRecoilState(loginuser);
  const imgRef = useRef();
  const [showImgFile, setShowImgFile] = useState("");
  const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB
  const header = {
    "Content-Type": "multipart/form-data",
  };

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
    $value: userPasswordconValue,
    $isValid: userPasswordconValueIsValid,
    $hasError: userPasswordconHasError,
    $valueChangeHandler: userPasswordconChangeHandler,
    $inputBlurHandler: userPasswordconBlurHandler,
    // $reset: resetuserPassword,
  } = useInput(isNotEmpty);

  const {
    $value: usernicknameValue,
    $isValid: usernicknameValueIsValid,
    $hasError: usernicknameHasError,
    $valueChangeHandler: usernicknameChangeHandler,
    $inputBlurHandler: usernicknameBlurHandler,
    // $reset: resetusernickname,
  } = useInput(isNotEmpty);

  const updateHandleKey = (eve) => {
    if (eve.key === "Enter") {
      updateHandleClick();
    }
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    console.log(file);
    const allowedExtensions = ALLOW_FILE_EXTENSION.split(",");
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      console.log("올바른 이미지 파일 형식이 아닙니다.");
      imgRef.current.value = null;
      setImgFile(null);
      return;
    }
    setImgFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onloadend = () => {
      setShowImgFile(reader.result);
    };
  };

  const updateHandleClick = async () => {
    const updateData = {
      password: userPasswordValue,
      nickname: usernicknameValue,
    };

    if (!updateData.password) {
      console.log("비밀번호는 필수 입력값입니다.");
      return;
    }

    if (!updateData.nickname) {
      console.log("별명은 필수 입력값입니다.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("password", updateData.password);
      formData.append("nickname", updateData.nickname);
      if (imgFile) {
        formData.append("file", imgFile);
      }

      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/members/update",
        data: formData,
        headers: header,
      });
      // setPostData(response.data);
      navigate("/Login");
      // console.log(postData, 123);
      console.log(response, 456);
      setLoading(false);
    } catch (error) {
      console.log(updateData);
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
          label="이메일"
          type="text"
          id="userId"
          placeholder={userData.email}
          $value={userData.email}
          onChange={userIdChangeHandler}
          onBlur={userIdBlurHandler}
          $hasError={userIdHasError}
          $errorText={userIdHasError}
          onKeyPress={updateHandleKey}
          disabled
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
          onKeyPress={updateHandleKey}
        />
        <AuthInput
          label="비밀번호 확인"
          type="passwordcon"
          id="userPasswordcon"
          placeholder="비밀번호 확인"
          $value={userPasswordconValue}
          onChange={userPasswordconChangeHandler}
          onBlur={userPasswordconBlurHandler}
          $hasError={userPasswordconHasError}
          $errorText="필수 입력값입니다"
          onKeyPress={updateHandleKey}
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
          onKeyPress={updateHandleKey}
        />
        {/* // 업로드 된 이미지 미리보기 */}
        <img
          src={showImgFile ? showImgFile : "assets/cats/cat.png"}
          alt="프로필 이미지"
          style={{ width: "100px", height: "100px" }}
        />
        {/* // 이미지 업로드 input */}
        <form>
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 이미지 추가
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept=".gif, .jpg, .png, .jpeg"
            onChange={saveImgFile}
            id="profileImg"
            ref={imgRef}
            style={{ width: "200px" }}
          />
        </form>

        <Button
          as="input"
          type="button"
          value="정보수정"
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={updateHandleClick}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}

export default UserUpdate;

import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthInput from "./Authinput";
import useInput from "./use_input";
import emailInput from "./email_input";
import "./signup.css";
import swal from "sweetalert";

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const [showImgFile, setShowImgFile] = useState("");
  const imgRef = useRef();
  const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB
  const header = {
    "Content-Type": "multipart/form-data",
  };

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

  const saveImgFile = () => {
    // eve.preventDefault();
    const file = imgRef.current.files[0];
    if (!file) {
      return; // 파일이 선택되지 않았으면 아무 작업도 수행하지 않음
    }
    console.log(file);
    const allowedExtensions = ALLOW_FILE_EXTENSION.split(",");
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      swal("올바른 이미지 파일 형식이 아닙니다.");
      imgRef.current.value = null;
      setImgFile(null);
      return;
    }
    if (file.size > FILE_SIZE_MAX_LIMIT) {
      swal("이미지 파일 크기가 너무 큽니다. 5MB 이하로 선택해주세요.");
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

  const signupHandleClick = async () => {
    const signupData = {
      email: userIdValue,
      password: userPasswordValue,
      name: usernameValue,
      nickname: usernicknameValue,
    };

    if (!signupData.email) {
      console.log("이메일은 필수 입력값입니다.");
      swal("이메일을 입력해주세요");
      return;
    }
    if (!isValidEmailFormat(signupData.email)) {
      console.log("이메일 형식이 올바르지 않습니다.");
      swal("이메일 형식이 올바르지 않습니다");
      return;
    }

    if (!signupData.password) {
      console.log("비밀번호는 필수 입력값입니다.");
      swal("비밀번호를 입력해주세요");
      return;
    }

    if (!signupData.name) {
      console.log("이름은 필수 입력값입니다.");
      swal("이름을 입력해주세요");
      return;
    }

    if (!signupData.nickname) {
      console.log("별명은 필수 입력값입니다.");
      swal("닉네임을 입력해주세요");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("name", signupData.name);
      formData.append("nickname", signupData.nickname);

      if (!imgFile) {
        try {
          const response = await fetch("assets/cats/cat.png");
          const blob = await response.blob();
          formData.append("file", blob, "cat.png");
        } catch (error) {
          console.error("Error fetching default image:", error);
        }
      } else {
        formData.append("file", imgFile);
      }

      for (const pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const member = "/api/members/register";

      // const response = await axios.post("/api1/api/members/register", formData);
      const response = await axios.post("/api1" + member, formData, {
        headers: header,
      });

      // setPostData(response.data);
      navigate("/Login");
      // console.log(postData, 123);
      console.log(response, 456);
      setLoading(false);
    } catch (error) {
      console.log(signupData);
      console.error("Error posting data:", error.response.data.message);
      if (error.response.data.message === "Email Already Exists") {
        swal("이미 등록된 이메일입니다");
      }
      // setError("데이터 전송에 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <img
        src="/assets/cats/cat10.gif"
        alt=""
        style={{ width: "10rem", height: "10rem" }}
      />
      <div className="signup-input-wrapper">
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

        <div>
          <div className="signup">
            {/* // 업로드 된 이미지 미리보기 */}
            <img
              src={showImgFile ? showImgFile : "assets/cats/cat.png"}
              alt="프로필 이미지"
              style={{ width: "100px", height: "100px" }}
              className="signup-image"
            />
          </div>
          {/* // 이미지 업로드 input */}
          <form>
            <span className="signup-box">
              <input
                className="hidden-input"
                type="file"
                accept=".gif, .jpg, .png, .jpeg"
                onChange={saveImgFile}
                id="profileImg"
                ref={imgRef}
                // style={{ width: "200px" }}
              />
            </span>
            <label className="signup-profileImg-label" htmlFor="profileImg">
              프로필 이미지가 없으면 냥냥이 사진으로 대체됩니다.
              <span className="custom-file-button" htmlFor="profileImg">
                파일선택
              </span>
            </label>{" "}
            <span>
              <span
                className="login-button"
                onClick={() => signupHandleClick()}
              >
                회원가입
              </span>
            </span>
          </form>
        </div>

        {/* <input
          type="file"
          accept=".gif, .jpg, .png, .jpeg"
          id="profileImg"
          onChange={saveImgFile}
          ref={imgRef}
        /> */}
      </div>
    </div>
  );
}

export default Signup;

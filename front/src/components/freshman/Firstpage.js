import React, { useState } from "react";
import Wave from "react-wavify";
import "./Firstpage.css";
import talk from "./Talk";
import { constSelector } from "recoil";
import { useNavigate } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

function Firstpage() {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태
  const navigate = useNavigate();
  // 낚시 결과 함수

  // 낚시 설문조사 함수
  const btn1 = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      // 원투낚시
      setType("원투");
      changeNewbie(1);
      setShow(false);
    } else if (step === 5) {
      changeNewbie(0);
      console.log("뉴비아님");
      setShow(false);
      navigate("/");
    }
  };
  const btn2 = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(5);
    } else if (step === 2) {
      setStep(4);
    } else if (step === 3) {
      setType("루어");
      changeNewbie(2);
      setShow(false);
    } else if (step === 4) {
      // 루어낚시
      setType("루어");
      changeNewbie(2);
      setShow(false);
    } else if (step === 5) {
      setStep(3);
    }
  };
  // 뉴비 상태 변경
  const changeNewbie = async (status) => {
    try {
      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/members/status/newbie",
        data: { isNewbie: status },
      });
      console.log(response.data);
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false); // 데이터 로딩 완료 (에러 발생)
    }
  };

  return (
    <div className="first_wrapper">
      <div className="first_talk">
        <span className="first_title">{talk[step].content}</span>
      </div>
      <div className="first_wave_wrap">
        <div className="first_island_img"></div>
        <div className="first_cat_img"></div>
        {/* 가장 가까운 파도 */}
        <Wave
          className="first_wave2"
          fill="#82E7ED"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 45,
            amplitude: 20,
            speed: 0.3,
            points: 3,
          }}
        />
        {/*중간 파도  */}
        <Wave
          className="first_wave1"
          fill="#408BD0"
          paused={false}
          // style={{ display: "flex" }}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.25,
            points: 4,
          }}
        ></Wave>
        {/* 마지막파도 */}
        <Wave
          className="first_wave3"
          fill="#6ec1df"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 35,
            amplitude: 20,
            speed: 0.2,
            points: 4,
          }}
        />
        {show && (
          <div className="btns">
            <span className="answer1" onClick={() => btn1()}>
              {talk[step].answer1}
            </span>
            <span className="answer2" onClick={() => btn2()}>
              {talk[step].answer2}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Firstpage;

import React, { useEffect, useState } from "react";
import Wave from "react-wavify";
import "./Firstpage.css";
import talk from "./Talk";
import upgradeProgress from "../freshman/upgradeProgress";
import { useNavigate } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";
import { useRecoilState } from "recoil";
import { profileData_recoil } from "../../utils/atoms";

function Firstpage({ handleChangeParentState }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useRecoilState(profileData_recoil);

  // 리코일이 변경됐는지 확인
  // useEffect(() => {
  //   console.log("유저리코일", profileData);
  // }, [profileData]);

  // 뉴비 상태 변경
  // 0 : 뉴비 아님 1 : 원투  2: 루어
  const newbie = async (status) => {
    try {
      await authorizedRequest({
        method: "post",
        url: "/api1/api/members/status/newbie",
        data: { isNewbie: status },
      });
      // 뉴비 상태 변경된 값 리코일도 변경해주기
      setProfileData((prevData) => ({
        ...prevData,
        memberStatusResponse: {
          ...prevData.memberStatusResponse,
          isNewBie: status,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // 뉴비 튜토리얼 업그레이드
  const handleUpgradeProgress = async (status) => {
    try {
      await upgradeProgress(status);
      // 뉴비 상태 변경된 값 리코일도 변경해주기
      setProfileData((prevData) => ({
        ...prevData,
        memberStatusResponse: {
          ...prevData.memberStatusResponse,
          tutorialProgress: status,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

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
      setStep(7);
      setShow(false);
      newbie(1);
      handleUpgradeProgress(20);
      setTimeout(() => {
        handleChangeParentState("Onetwo");
        //   navigate("/Secondpage", { state: "Onetwo" });
      }, 3000);
    } else if (step === 5) {
      setShow(false);
      // 뉴비아님
      newbie(0);
      setStep(8);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      handleUpgradeProgress(100);
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
      setStep(6);
      setShow(false);
      newbie(2);
      handleUpgradeProgress(20);
      setTimeout(() => {
        handleChangeParentState("Lure");
        // navigate("/Secondpage", { state: "Lure" });
      }, 3000);
    } else if (step === 4) {
      // 루어낚시
      setStep(6);
      setShow(false);
      newbie(2);
      handleUpgradeProgress(20);
      setTimeout(() => {
        handleChangeParentState("Lure");
        // navigate("/Secondpage", { state: "Lure" });
      }, 3000);
    } else if (step === 5) {
      setStep(3);
    }
  };

  return (
    <div className="first_wrapper">
      <div className="first_island_img"></div>
      <div className="first_cat_img"></div>
      <div className="first_talk">
        <span className="first_title">{talk[step].content}</span>
      </div>

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
  );
}

export default Firstpage;

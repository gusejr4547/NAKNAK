import { React, useEffect, useState } from "react";
import Wave from "react-wavify";
import "./Secondpage.css";
import Lure from "./Lure";
import Onetwo from "./Onetwo";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { token, tts_recoil } from "../../utils/atoms";
import upgradeProgress from "./upgradeProgress";
import TTS from "./TTS";

function Secondpage({ show }) {
  const [fishingType, setFishingType] = useState("Lure");
  const [step, setStep] = useState(0);
  const [accesstoken, setAccesstoken] = useRecoilState(token);
  const navigate = useNavigate();
  const [showNext, setShowNext] = useState(false);
  const [tts, setTts] = useRecoilState(tts_recoil);
  const [setting, setSetting] = useState(false);

  // const [voice, setVoice] = useState();

  useEffect(() => {
    setSetting(true);
    console.log("길이", fishingType, tts);
    // setShowNext(false);
    setTimeout(() => setShowNext(true), tts);
  }, [tts]);

  useEffect(() => {
    if (show === "Lure") {
      setFishingType("Lure");
    } else {
      setFishingType("OneTwo");
    }
  }, []);

  // 뉴비 튜토리얼 업그레이드
  const handleUpgradeProgress = async (status) => {
    try {
      const response = await upgradeProgress(status, accesstoken);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const nextTalk = () => {
    setShowNext(false);
    if (step > (fishingType === "Lure" ? Lure : Onetwo).length - 2) {
      // 메인으로 라우터 이동
      navigate("/Newbie");
      handleUpgradeProgress(40);
    } else {
      setStep(step + 1);
    }
  };
  const beforeTalk = () => {
    setStep(step - 1);
  };

  return (
    <div className="second_wrapper">
      <div className="second_talk">
        {/* <span className="second_img"></span> */}
        <span className="second_title">
          {fishingType === "Lure" ? (
            <>
              <img src={Lure[step]?.image} alt="" />
              {Lure[step].content}
              {Lure[step].content && setting && (
                <TTS message={Lure[step].content} />
              )}
            </>
          ) : (
            <>
              {/* <span className="second_title"> */}
              <img src={Onetwo[step]?.image} alt="" />
              {Onetwo[step].content}
              {Onetwo[step].content && setting && (
                <TTS message={Onetwo[step].content} />
              )}
              {/* </span> */}
            </>
          )}
        </span>
        {/* {step > 0 && (
          <span className="btn1" onClick={() => beforeTalk()}>
            &lt; 이전
          </span>
        )} */}
        {showNext && (fishingType === "Lure" ? Lure : Onetwo) && (
          <span className="btn2" onClick={() => nextTalk()}>
            다음 &gt;
          </span>
        )}
      </div>
      <div className="second_cat_img"></div>
      {/* 가장 가까운 파도 */}
      <Wave
        className="second_wave2"
        fill="#6ec1df"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 45,
          amplitude: 20,
          speed: 0.32,
          points: 3,
        }}
      />
      {/*중간 파도  */}
      <Wave
        className="second_wave1"
        fill="#408BD0"
        paused={false}
        // style={{ display: "flex" }}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.38,
          points: 4,
        }}
      ></Wave>
      {/* 마지막파도 */}
      <Wave
        className="second_wave3"
        fill="#82E7ED"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 35,
          amplitude: 20,
          speed: 0.5,
          points: 4,
        }}
      />
    </div>
    // </div>
  );
}

export default Secondpage;

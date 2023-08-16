import React, { useEffect, useState } from "react";
import "./MapModal.css";
import { useRecoilState } from "recoil";
import {
  mapModal_recoil,
  newbie_recoil,
  mooltae_recoil,
  tts_recoil,
  weatherInfo_recoil,
  favoritePoint_recoil,
} from "../../utils/atoms";
import { useNavigate } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

import Talk2 from "../freshman/Talk2";
import upgradeProgress from "../freshman/upgradeProgress";
import TTS from "../freshman/TTS";
const MapModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [newbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(3);
  const [mooltae] = useRecoilState(mooltae_recoil);
  const [favoritePoint, setFavoritePoint] =
    useRecoilState(favoritePoint_recoil);
  const navigate = useNavigate();
  const [weatherInfo] = useRecoilState(weatherInfo_recoil);
  const [like, setLike] = useState(() => {
    for (let i = 0; i < favoritePoint.length; i++) {
      // 이미 즐겨찾기가 되어있다면
      if (favoritePoint[i].fishingHoleId === weatherInfo.pk) {
        return i;
      }
    }
    return false;
  });
  const [tts] = useRecoilState(tts_recoil);
  const [show, setShow] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const talkContents = Talk2();

  useEffect(() => {
    let skyImg = null;
    const sky = weatherInfo?.SKY;
    if (sky < 2) {
      skyImg = "sun1";
    } else if (sky < 4) {
      skyImg = "sun2";
    } else if (sky < 6) {
      skyImg = "sun3";
    } else if (sky < 8) {
      skyImg = "cloud2";
    } else if (sky < 9) {
      skyImg = "cloud1";
    } else if (sky < 11) {
      skyImg = "cloud3";
    }

    const pty = weatherInfo?.PTY;
    if (pty === 1) {
      skyImg = "rain2";
    } else if (pty === 2) {
      skyImg = "snowandrain";
    } else if (pty === 3) {
      skyImg = "snow1";
    } else if (pty === 4) {
      skyImg = "rain1";
    }
    setWeatherIcon(skyImg);
  }, [weatherInfo]);

  useEffect(() => {
    setTimeout(() => setShow(true), tts);
  }, [tts]);

  // 뉴비 튜토리얼 업그레이드
  const handleUpgradeProgress = async (status) => {
    try {
      await upgradeProgress(status);
    } catch (err) {
      console.log(err);
    }
  };
  // 뉴비버젼
  const next = () => {
    setShow(false);
    if (step === 4) {
      setModalOpen(false);
      navigate("/Newbie", { state: 5 });
      handleUpgradeProgress(60);
    }
    setStep(step + 1);
  };

  // 장소 좋아요
  const likeLocation = async () => {
    try {
      const res = await authorizedRequest({
        method: "post",
        url: "/api1/api/fishingholes/favorites/register",
        data: { fishingHoleId: weatherInfo.pk },
      });
      setLike(favoritePoint.length);

      const new_data = {
        fishingHoleId: weatherInfo.pk,
        title: weatherInfo.title,
        latitude: weatherInfo.lat,
        longitude: weatherInfo.lng,
      };
      setFavoritePoint([...favoritePoint, new_data]);
      // console.log(favoritePoint);
    } catch (err) {
      console.log(err);
    }
  };

  // 장소 좋아요취소
  const unlikeLocation = async () => {
    try {
      await authorizedRequest({
        method: "post",
        url: "/api1/api/fishingholes/favorites/cancel",
        data: { fishingHoleId: weatherInfo.pk },
      });
      const new_data = favoritePoint.filter(
        (item) => item.fishingHoleId !== weatherInfo.pk
      );
      setFavoritePoint(new_data);
      setLike(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [like]);

  return (
    <div className="presentation" role="presentation">
      {newbie && (
        <div className="map-modal-newbie-talk-box">
          {talkContents[step].content}
          {talkContents[step].content && (
            <TTS message={talkContents[step].content} />
          )}
          {show && (
            <div
              className="next"
              onClick={() => {
                next();
              }}
            >
              다음 &gt;
            </div>
          )}
        </div>
      )}
      <div className="modal_wrap">
        <div className="modal-spring" />
        {/* 닫기 버튼 */}
        <span onClick={() => setModalOpen(false)} className="modal-close" />

        {/* <div className={`modal-title ${newbie && "newbie-data"}`}> */}
        <div className="modal-title">
          {weatherInfo?.title}
          {/* 즐겨찾기 버튼 */}
          {weatherInfo?.pk && (
            <span
              onClick={() => {
                if (like === false) {
                  likeLocation();
                } else {
                  unlikeLocation();
                }
              }}
              className={like === false ? "like-location" : "unlike-location"}
            />
          )}
        </div>
        {/* <div className={`modal-information" && newbie ? "newbie-data" : ""}`}> */}
        <div className="modal-information">
          <span className="modal-info">
            <span className="modal-info-title">기온</span>
            <br />
            {weatherInfo?.TMP} ℃
          </span>
          <span className="modal-info">
            {/* 하늘상태 */}
            {/* <br /> */}
            {/* {weatherInfo?.SKY} */}
            <img
              className="modal-weather-icon"
              src={`/assets/weather/${weatherIcon}.png`}
              alt=""
            />
          </span>
          <span className="modal-info">
            <span className="modal-info-title">파고</span>
            <br />
            {weatherInfo?.WAV} M
          </span>
          <span className="modal-info">
            <span className="modal-info-title">풍향</span>
            <br />
            <span
              className="wind"
              style={{ transform: `rotate(${weatherInfo?.VEC}deg)` }}
            ></span>
          </span>
          <span className="modal-info">
            <span className="modal-info-title">물때</span>
            <br />
            {mooltae}
          </span>
          <span className="modal-info">
            <span className="modal-info-title">풍속</span>
            <br />
            {weatherInfo?.WSD} m/s
          </span>
          <span className="modal-info">
            <span className="modal-info-title">강수확률</span>
            <br />
            {weatherInfo?.POP} %
          </span>

          {weatherInfo?.PCP !== "강수없음" && (
            <span className="modal-info">
              <span className="modal-info-title">강수량</span>
              <br />
              {weatherInfo?.PCP} mm
            </span>
          )}

          <span className="modal-info">
            <span className="modal-info-title">습도</span>
            <br />
            {weatherInfo?.REH} %
          </span>

          {weatherInfo?.SNO !== "적설없음" && (
            <span className="modal-info">
              <span className="modal-info-title">1시간 신적설</span>
              <br />
              {weatherInfo?.SNO} cm
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default MapModal;

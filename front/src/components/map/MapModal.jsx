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
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(3);
  const [mooltae, setMooltae] = useRecoilState(mooltae_recoil);
  const [favoritePoint, setFavoritePoint] =
    useRecoilState(favoritePoint_recoil);
  const navigate = useNavigate();
  const [weatherInfo, setWeatherInfo] = useRecoilState(weatherInfo_recoil);
  const [like, setLike] = useState(() => {
    for (let i = 0; i < favoritePoint.length; i++) {
      // 이미 즐겨찾기가 되어있다면
      if (favoritePoint[i].fishingHoleId === weatherInfo.pk) {
        return i;
      }
    }
    return false;
  });
  const [tts, setTts] = useRecoilState(tts_recoil);
  const [show, setShow] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(null);

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
      // console.log(res);
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
      console.log(favoritePoint);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [like]);

  return (
    <div className="presentation" role="presentation">
      {newbie && (
        <div className="map-modal-newbie-talk-box">
          {Talk2[step].content}
          {Talk2[step].content && <TTS message={Talk2[step].content} />}
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
          {like === false ? (
            <span onClick={() => likeLocation()} className="like-location" />
          ) : (
            <span
              onClick={() => unlikeLocation()}
              className="unlike-location"
            />
          )}
        </div>
        {/* <div className={`modal-information" && newbie ? "newbie-data" : ""}`}> */}
        <div className="modal-information">
          <span className="modal-info">
            기온
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
            파고
            <br />
            {weatherInfo?.WAV} M
          </span>
          <span className="modal-info">
            <span>풍향</span>
            <br />
            <span
              className="wind"
              style={{ transform: `rotate(${weatherInfo?.VEC}deg)` }}
            ></span>
          </span>
          <span className="modal-info">
            물때
            <br />
            {mooltae}
          </span>
          <span className="modal-info">
            풍속
            <br />
            {weatherInfo?.WSD} m/s
          </span>
          <span className="modal-info">
            강수확률
            <br />
            {weatherInfo?.POP} %
          </span>
          <span className="modal-info">
            강수형태
            <br />
            {weatherInfo?.PTY}
          </span>
          <span className="modal-info">
            1시간 강수량
            <br />
            {weatherInfo?.PCP} mm
          </span>
          <span className="modal-info">
            습도
            <br />
            {weatherInfo?.REH} %
          </span>
          <span className="modal-info">
            1시간 신적설
            <br />
            {weatherInfo?.SNO} cm
          </span>
        </div>
      </div>
    </div>
  );
};
export default MapModal;

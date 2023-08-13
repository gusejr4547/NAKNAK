import React, { useEffect, useState } from "react";
import "./MapModal.css";
import { useRecoilState } from "recoil";
import {
  mapModal_recoil,
  fishingInfo_recoil,
  newbie_recoil,
  mooltae_recoil,
  tts_recoil,
  favoritePoint_recoil,
} from "../../utils/atoms";
import { useNavigate } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

import Talk2 from "../freshman/Talk2";
import upgradeProgress from "../freshman/upgradeProgress";
import TTS from "../freshman/TTS";
const MapModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [data, setData] = useRecoilState(fishingInfo_recoil);
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(3);
  const [mooltae, setMooltae] = useRecoilState(mooltae_recoil);
  const [favoritePoint, setFavoritePoint] =
    useRecoilState(favoritePoint_recoil);
  const navigate = useNavigate();
  // favorite 유무
  const [like, setLike] = useState(() => {
    for (let i = 0; i < favoritePoint.length; i++) {
      // 이미 즐겨찾기가 되어있다면
      if (favoritePoint[i].fishingHoleId === data[1].ID) {
        return i;
      }
    }
    return false;
  });

  const [tts, setTts] = useRecoilState(tts_recoil);
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    return () => {};
  }, [data]);

  // 장소 좋아요
  const likeLocation = async () => {
    try {
      await authorizedRequest({
        method: "post",
        url: "/api1/api/fishingholes/favorites/register",
        data: { fishingHoleId: data[1].ID },
      });
      setLike(favoritePoint.length);
      const new_data = {
        fishingHoleId: data[1].ID,
        title: data[0].TITLE ? data[0].TITLE : data[0].MMSI_NM,
        latitude: data[0].LATITUDE,
        longitude: data[0].LONGITUDE,
      };
      setFavoritePoint([...favoritePoint, new_data]);
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
        data: { fishingHoleId: data[1].ID },
      });
      const new_data = favoritePoint.filter(
        (item) => item.fishingHoleId !== data[1].ID
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
        {/* 닫기 버튼 */}
        <span onClick={() => setModalOpen(false)} className="modal-close">
          X
        </span>
        {/* 즐겨찾기 버튼 */}
        {like === false ? (
          <span onClick={() => likeLocation()} className="like-location">
            star{like}
          </span>
        ) : (
          <span onClick={() => unlikeLocation()} className="unlike-location">
            unstar {like}
          </span>
        )}

        <div className={`modal-title ${newbie ? "newbie-data" : ""}`}>
          {data[0].TITLE ? data[0].TITLE : data[0].MMSI_NM}
        </div>
        <div className={`modal-information" && newbie ? "newbie-data" : ""}`}>
          {data[0].HUMIDITY && <p>습도: {data[0].HUMIDITY}</p>}
          {data[0].AIR_TEMPERATURE && <p>기온: {data[0].AIR_TEMPERATURE}</p>}
          {/* <p>위도: {data[0].LATITUDE}</p>
          <p>경도: {data[0].LONGITUDE}</p> */}
          {data[0].WIND_DIRECT && <p>풍향: {data[0].WIND_DIRECT}</p>}
          {data[0].AIR_PRESSURE && <p>기압: {data[0].AIR_PRESSURE}</p>}
          {data[0].WIND_SPEED && <p>풍속: {data[0].WIND_SPEED}</p>}
          {data[0].WATER_TEMPER && <p>수온: {data[0].WATER_TEMPER}</p>}
          {data[0].WAVE_HEIGHT && <p>파고: {data[0].WAVE_HEIGHT}</p>}
          {data[0].SALINITY && <p>염분: {data[0].SALINITY}</p>}
          <p>물때 : {mooltae}</p>
        </div>
      </div>
    </div>
  );
};
export default MapModal;

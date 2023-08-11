import React, { useEffect, useState } from "react";
import "./MapModal.css";
import { useRecoilState } from "recoil";
import {
  mapModal_recoil,
  fishingInfo_recoil,
  newbie_recoil,
  token,
} from "../../utils/atoms";
import { useNavigate } from "react-router-dom";

import Talk2 from "../freshman/Talk2";
import upgradeProgress from "../freshman/upgradeProgress";

const MapModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [data, setData] = useRecoilState(fishingInfo_recoil);
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(3);
  const [accesstoken, setAccesstoken] = useRecoilState(token);
  const navigate = useNavigate();

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

  return (
    <div className="presentation" role="presentation">
      {newbie && (
        <div className="map-modal-newbie-talk-box">
          {Talk2[step].content}
          <div
            className="next"
            onClick={() => {
              next();
            }}
          >
            다음 &gt;
          </div>
        </div>
      )}
      <div className="modal_wrap">
        {/* 닫기 버튼 */}
        <span onClick={() => setModalOpen(false)} className="modal-close">
          X
        </span>

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
        </div>
      </div>
    </div>
  );
};
export default MapModal;

import React, { useEffect } from "react";
import "./MapModal.css";
import { useRecoilState } from "recoil";
import { mapModal_recoil, fishingInfo_recoil } from "../../utils/atoms";

const MapModal = () => {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  const [data, setData] = useRecoilState(fishingInfo_recoil);

  useEffect(() => {
    // 근데 콘솔창이 두번찍히네..
    console.log(data);

    return () => {};
  }, [data]);

  return (
    <div className="presentation" role="presentation">
      <div className="modal_wrap">
        {/* 닫기 버튼 */}
        <span onClick={() => setModalOpen(false)} className="modal-close">
          X
        </span>
        <div className="modal"></div>
        <div className="modal-title">{data[0].MMSI_NM}</div>
        <div className="modal-information">
          <p>습도: {data[0].HUMIDITY}</p>
          <p>기온: {data[0].AIR_TEMPERATURE}</p>
          <p>위도: {data[0].LATITUDE}</p>
          <p>경도: {data[0].LONGITUDE}</p>
          <p>풍향: {data[0].WIND_DIRECT}</p>
          <p>기압: {data[0].AIR_PRESSURE}</p>
          <p>풍속: {data[0].WIND_SPEED}</p>
          <p>수온: {data[0].WATER_TEMPER}</p>
        </div>

        {/* <h2>{marker}</h2> */}
        <div className="modal__content">
          <p className="modal__details">
            <span className="modal__user_perc"></span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default MapModal;

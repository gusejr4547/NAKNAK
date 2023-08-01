import React from "react";
import "./MapModal.css";
import { useRecoilState } from "recoil";
import { mapModal_recoil } from "../../utils/atoms";

const MapModal = (markerPosition) => {
  const [modalOpen, setModalOpen] = useRecoilState(mapModal_recoil);
  return (
    <div className="presentation" role="presentation">
      <div className="modal_wrap">
        {/* 닫기 버튼 */}
        <span onClick={() => setModalOpen(false)} className="modal-close">
          X
        </span>
        <div className="modal"></div>
        <h1>모달이다 이놈아</h1>
        <div>여기는 : `{markerPosition.content}`</div>
        <div>
          여기는 위치는: 경도 {markerPosition.latlng.La} 위도{" "}
          {markerPosition.latlng.Ma}
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

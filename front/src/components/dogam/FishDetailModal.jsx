import React from "react";
import "./FishDetailModal.css";

const FishDetailModal = ({ fishData, userFishData, onClose }) => {
  const { fishId, imgUrl, name, info } = fishData;

  console.log(fishData, userFishData);

  return (
    <div className="fish-detail-modal container">
      <div className="modal-content">
        <img
          className="modal-content-fishImg"
          src={process.env.REACT_APP_BACKEND_URL + imgUrl}
          alt={name}
        />
        <h3>{name}</h3>
        {userFishData ? (
          <div className="modal-content-myRecord">
            <p>최대 크기 : {userFishData.maxSize}</p>
            <p>잡은 날짜 : {userFishData.getDate.substr(2, 9)}</p>
            <p>잡은 횟수 : {userFishData.number}</p>
          </div>
        ) : (
          <div className="modal-content-myRecord">
            <p>{name} 에 대한 나의 정보가 없습니다.</p>
          </div>
        )}
        <div className="modal-content-dogam-explanation modal-disable-scrollbar">
          <p className="model-content-p">{info}</p>
        </div>
        <img
          src="/assets/icons/x.png"
          alt="exit"
          className="modal-close-button"
          onClick={onClose}
        />{" "}
        {/* <button onClick={onClose}>닫기</button> */}
      </div>
    </div>
  );
};

export default FishDetailModal;

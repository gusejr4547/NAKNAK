import React from "react";
import "./FishDetailModal.css";

const FishDetailModal = ({ fishData, userFishData, onClose }) => {
  const { fishId, imgUrl, name, info } = fishData;

  console.log(userFishData);

  return (
    <div className="fish-detail-modal container">
      <div className="modal-content">
        <img src={process.env.REACT_APP_BACKEND_URL + imgUrl} alt={name} />
        <h3>{name}</h3>
        <p>{info}</p>
        {userFishData ? (
          <div>
            <p>최대 크기 : {userFishData.maxSize}</p>
            <p>잡은 날짜 : {userFishData.getDate}</p>
            <p>잡은 횟수 : {userFishData.number}</p>
          </div>
        ) : null}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default FishDetailModal;

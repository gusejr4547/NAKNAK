import React from "react";
import "./FishDetailModal.css";

<<<<<<< HEAD
const FishDetailModal = ({ fishData, onClose }) => {
  const { fishId, imgUrl, name, info } = fishData;

  return (
    <div className="fish-detail-modal container">
      <div className="modal-content">
        <img src={"http://passportlkm.iptime.org:20101" + imgUrl} alt={name} />
        <h3>{name}</h3>
        <p>{info}</p>
        <button onClick={onClose}>닫기</button>
=======
const FishDetailModal = ({ fishData, userFishData, onClose }) => {
  const { fishId, imgUrl, name, info } = fishData;

  console.log(userFishData);

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
            <p>잡은 날짜 : {userFishData.getDate}</p>
            <p>잡은 횟수 : {userFishData.number}</p>
          </div>
        ) : (
          <div className="modal-content-myRecord">
            <p>{name} 에 대한 나의 정보가 없습니다.</p>
          </div>
        )}
        <div className="modal-content-explanation modal-disable-scrollbar">
          <p>{info}</p>
        </div>
        <img
          src="/assets/icons/x.png"
          alt="exit"
          className="modal-close-button"
          onClick={onClose}
        />{" "}
        {/* <button onClick={onClose}>닫기</button> */}
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      </div>
    </div>
  );
};

export default FishDetailModal;

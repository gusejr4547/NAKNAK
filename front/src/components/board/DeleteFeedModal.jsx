import React from "react";

import "./DeleteFeed.css";

const DeleteFeedModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-feed-modal-wrapper">
      <div className="delete-feed-modal-content ">
        <p>정말로 삭제하시겠습니까?</p>
        <div className="delete-feedl-buttons">
          <div onClick={onConfirm}>확인</div>
          <div onClick={onClose}>취소</div>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeedModal;

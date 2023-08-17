import React, { useState } from "react";

import DeleteFeedModal from "./DeleteFeedModal";

import "./DeleteFeed.css";
import "./ModifyFeed.css";

const DeleteFeed = ({ onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    onDelete();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div onClick={handleDelete}>
        <img
          src="/assets/icons/delete.png"
          alt="삭제"
          className="modify-feed-delete"
        />
      </div>
      <DeleteFeedModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </div>
  );
};

export default DeleteFeed;

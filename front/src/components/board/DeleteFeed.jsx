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
    <div className="modify-feed-delete">
      <div onClick={handleDelete}>삭제</div>
      <DeleteFeedModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </div>
  );
};

export default DeleteFeed;

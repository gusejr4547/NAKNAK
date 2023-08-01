import React from "react";
import "./SlideInnerMenu.css";

const SlideInnerMenu = ({ onClose, menuPosition, onDeleteSlide }) => {
  const handleMenuClose = (e) => {
    e.stopPropagation();
    onClose(); // 부모 컴포넌트로부터 받은 onClose 함수 호출
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteSlide();
    onClose();
  };
  return (
    <div className="slide-inner-menu" style={{}}>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleMenuClose}>Close</button>
    </div>
  );
};

export default SlideInnerMenu;

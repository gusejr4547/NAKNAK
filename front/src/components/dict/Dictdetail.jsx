import React, { useState } from "react";
import "./Dictdetail.css";
import { div } from "@tensorflow/tfjs";

function Dictdetail(props) {
  const [showModal, setShowModal] = useState(false);
  const [active, setactive] = useState(false);

  const handleTitleClick = (data) => {
    handleCloseModal();
    if (props.activedetail === data) {
      props.handledetail("");
    } else {
      props.handledetail(data);
      // console.log(data);
    }
  };

  const handleCloseModal = () => {
    if (active) {
      setactive(false);
    } else {
      setactive(true);
    }
  };

  return (
    <div className="title-box">
      <p
        className={
          props.activedetail === props.data.title
            ? "dict-detail-title-active"
            : "dict-detail-title"
        }
        onClick={() => handleTitleClick(props.data.title)}
      >
        <span>{props.data.title}</span>
      </p>
      {props.activedetail === props.data.title && !props.data.start && (
        <div className="dict-detail-content">
          <p className="dict-detail-p"> {props.data.content}</p>
        </div>
      )}
      {props.activedetail === props.data.title && props.data.start && (
        <div className="dict-detail-content">
          <p className="dict-detail-p">금어기 시작일 : {props.data.start}</p>
          <p className="dict-detail-p">금어기 종료일 : {props.data.end}</p>
        </div>
      )}
    </div>
  );
}

export default Dictdetail;

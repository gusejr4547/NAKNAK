import React from "react";
import "./FollowModal.css";
import { Link, useNavigate } from "react-router-dom";

function FollowerModal(props) {
  const navigate = useNavigate();

  function closeModal() {
    props.closeModal();
  }

  function handleProfileLinkClick(memberId) {
    navigate(`/Profile/:${memberId}`);
    window.location.reload();
    closeModal();
  }

  return (
    <div className="followModal" onClick={closeModal}>
      <div className="followmodalBody" onClick={(e) => e.stopPropagation()}>
        <button id="followmodalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.data.map((item) => (
          <p key={item.memberId}>
            {/* <Link to={`/Profile/:${item.memberId}`} className="nav-link"> */}
            <span onClick={() => handleProfileLinkClick(item.memberId)}>
              {item.nickname}
            </span>
            {/* </Link> */}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FollowerModal;

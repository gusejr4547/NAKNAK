import React, { useState, useEffect, useRef } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";

import SlideInnerMenu from "./SlideInnerMenu";

import "./Inventory.css";

const ItemSlide = ({ fishInfo, onDeleteSlide }) => {
  const [showSlideInnerMenu, setShowSlideInnerMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState(false);
  const slideRef = useRef(null);

  // 슬라이드 클릭 이벤트 핸들러
  const handleSlideClick = (e) => {
    console.log("slide clicked");
    e.stopPropagation();
    setShowSlideInnerMenu(!showSlideInnerMenu);
  };

  // 작은 메뉴 닫기 이벤트 핸들러
  const handleCloseMenu = () => {
    console.log("close clicked");
    setShowSlideInnerMenu(false);
  };

  // 작은 메뉴 삭제 버튼 클릭 이벤트 핸들러
  const handleDeleteSlide = (e) => {
    console.log("delete clicked", fishInfo);
    if (onDeleteSlide(fishInfo)) {
      setShowSlideInnerMenu(false);
    }
  };

  useEffect(() => {
    const slideElement = slideRef.current;
    if (slideElement) {
      const slideRect = slideElement.getBoundingClientRect();
      if (showSlideInnerMenu) {
        // 작은 메뉴 표시 시 슬라이드의 위치 정보를 작은 메뉴 컴포넌트에 전달
        setMenuPosition(slideRect);
      }
    }
  }, [showSlideInnerMenu]);

  return (
    <div ref={slideRef} className="inven-slide" onClick={handleSlideClick}>
      {/* 동적으로 받아온 슬라이드 내용 표시 */}
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/img/fishes/${fishInfo.fishCode}.png`}
        alt={"fish img"}
      />
      <h6>
        {fishInfo.fishName} <br />({fishInfo.fishSize}cm)
      </h6>

      {showSlideInnerMenu && (
        <SlideInnerMenu
          onClose={handleCloseMenu}
          onDeleteSlide={handleDeleteSlide}
          menuPosition={menuPosition}
          fishInfo={fishInfo}
        />
      )}
    </div>
  );
};

export default ItemSlide;

import React, { useState, useEffect, useRef } from "react";

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
    onDeleteSlide(fishInfo); // 삭제 이벤트를 부모 컴포넌트로 전달하며 현재 fishInfo를 인자로 넘겨줍니다.
    setShowSlideInnerMenu(false); // 삭제 후 작은 메뉴를 닫습니다.
    ///////////////////////////////////////////////////////
    ////////////////////////axios 통해서 db에서도 삭제 해여함
    ///////////////////////////////////////////////////////
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
        src={`http://192.168.30.161:8080/img/fishes/${fishInfo.fishCode}.png`}
        alt={"fish img"}
      />
      <p>{fishInfo.fishName}</p>
      <p>{fishInfo.fishSize}</p>

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

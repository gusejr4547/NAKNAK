import React, { useState, useEffect, useRef } from "react";
import { getData, postData } from "../../utils/api";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

import "./Inventory.css";

const SmallMenu = ({ onClose, menuPosition }) => {
  const handleMenuClose = (e) => {
    e.stopPropagation();
    onClose(); // 부모 컴포넌트로부터 받은 onClose 함수 호출
  };

  return (
    <div
      className="small-menu"
      style={{
        position: "absolute",
        top: menuPosition.top, // 슬라이드의 상단 위치
        left: menuPosition.left + menuPosition.width, // 슬라이드의 우측 위치
      }}
      onClick={handleMenuClose}
    >
      {/* 작은 메뉴 내용 */}
      <button>Close</button>
    </div>
  );
};

const ItemSlide = ({ fishInfo }) => {
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState(false);
  const slideRef = useRef(null);

  // 슬라이드 클릭 이벤트 핸들러
  const handleSlideClick = (e) => {
    console.log("slide clicked");
    e.stopPropagation();
    setShowSmallMenu(true);
  };

  // 작은 메뉴 닫기 이벤트 핸들러
  const handleCloseMenu = () => {
    console.log("close clicked");
    setShowSmallMenu(false);
  };

  useEffect(() => {
    const slideElement = slideRef.current;
    if (slideElement) {
      const slideRect = slideElement.getBoundingClientRect();
      if (showSmallMenu) {
        // 작은 메뉴 표시 시 슬라이드의 위치 정보를 작은 메뉴 컴포넌트에 전달
        setMenuPosition(slideRect);
      }
    }
  }, [showSmallMenu]);

  return (
    <div ref={slideRef} className="inven-slide" onClick={handleSlideClick}>
      {/* 동적으로 받아온 슬라이드 내용 표시 */}
      <img src={""} alt={"fish img"} />
      <p>fishInfo.name</p>
      {/* ... */}

      {showSmallMenu && (
        <SmallMenu onClose={handleCloseMenu} menuPosition={menuPosition} />
      )}
    </div>
  );
};

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginUser, setloginuser] = useRecoilState(loginuser);
  const [inventoryData, setInventoryData] = useState({});
  const [selectedFish, setSelectedFish] = useState(null);

  useEffect(() => {
    const getInventory = async () => {
      try {
        setLoading(true);
        const response = await postData("", loginUser);
        console.log("response success", response.data);
        setInventoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory");
        setError("데이터 로드에 실패했습니다.");
        setLoading(false);
      }
    };
  }, []);

  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back();
    }
  };

  return (
    <div className="inven-wrapper">
      <img
        src="/assets/icons/x.png"
        alt="exit"
        className="dogam-back-button"
        onClick={goBack}
      />
      <div className="inven-board">
        <div className="inven-carousel inven-disable-scrollbar">
          {/* {inventoryData.map((fish) => {
            <ItemSlide key={null} fishInfo={null} />;
          })} */}

          {/* dummy start */}
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />
          <ItemSlide key={null} fishInfo={null} />

          {/* dummy end */}
        </div>
      </div>
    </div>
  );
};

export default Inventory;

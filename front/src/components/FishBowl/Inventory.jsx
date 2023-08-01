import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
import { authorizedRequest } from "../account/AxiosInterceptor";

import ItemSlide from "./ItemSlide";

import "./Inventory.css";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState({});

  useEffect(() => {
    const getInventory = async () => {
      try {
        setLoading(true);

        const response = await authorizedRequest({
          method: "get",
          url: `/api/fishes/inventory/view`,
        });

        console.log("response success", response.data.data);
        setInventoryData(response.data.data);
        console.log("inven data =", inventoryData[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory");
        setError("데이터 로드에 실패했습니다.");
        setLoading(false);
      }
    };
    getInventory();
  }, []);

  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back();
    }
  };

  const handleDeleteSlide = (deletedFishInfo) => {
    setInventoryData((prevData) =>
      prevData.filter((fish) => fish !== deletedFishInfo)
    );
  };

  ////////////////////add dummy data (inven)//////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const addItem = async () => {
    try {
      setLoading(true);
      const fish = {
        fishCode: "A003",
        size: 41.3,
      };

      const response = await authorizedRequest({
        method: "post",
        url: `/api/fishes/catch`,
        data: fish,
      });

      console.log("response success", response.data);
      setInventoryData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory");
      setError("데이터 로드에 실패했습니다.");
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  return (
    <div className="inven-wrapper">
      <img
        src="/assets/icons/x.png"
        alt="exit"
        className="dogam-back-button"
        onClick={goBack}
      />
      <img
        src="/assets/icons/x.png"
        alt="exit"
        // className="dogam-back-button"
        onClick={addItem}
      />
      <div className="inven-board">
        <div className="inven-carousel inven-disable-scrollbar">
          {Object.keys(inventoryData).map((key) => {
            const fish = inventoryData[key];
            console.log("here", fish);
            return (
              <ItemSlide
                fishInfo={fish}
                onDeleteSlide={() => handleDeleteSlide(inventoryData[key])}
              />
            );
          })}
          {/* dummy start */}
          {/* <ItemSlide key={null} fishInfo={null} onDeleteSlide={() => handleDeleteSlide(fish)} />; */}

          {/* dummy end */}
        </div>
      </div>
    </div>
  );
};

export default Inventory;

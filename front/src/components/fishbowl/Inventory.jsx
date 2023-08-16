import React, { useState, useEffect } from "react";

import { authorizedRequest } from "../account/AxiosInterceptor";

import ItemSlide from "./ItemSlide";

import "./Inventory.css";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState({});
<<<<<<< HEAD

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
        // console.log("inven data =", inventoryData[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory");
        setError("데이터 로드에 실패했습니다.");
        setLoading(false);
      }
    };
    getInventory();
  }, []);

=======
  const [fishBowlData, setFishBowlData] = useState({});
  const [itemData, setItemData] = useState(0);

  useEffect(() => {
    getInventory();
    getFishBowl();
  }, []);

  const itemchange = () => {
    setItemData(itemData + 1);
    console.log(itemData);
    getFishBowl();
    getInventory();
  };

  const getInventory = async () => {
    try {
      setLoading(true);

      const response = await authorizedRequest({
        method: "get",
        url: `api1/api/fishes/inventory/view`,
      });

      console.log("response success", response.data.data);
      setInventoryData(response.data.data);
      // console.log("inven data =", inventoryData[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory");
      setError("데이터 로드에 실패했습니다.");
      setLoading(false);
    }
  };

  const getFishBowl = async () => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: "/api1/api/fishes/fishbowl/view",
      });
      setFishBowlData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back();
    }
  };

  const handleDeleteSlide = async (deletedFishInfo) => {
    console.log("deletefishinfo", deletedFishInfo.inventoryId);
    try {
      const response = await authorizedRequest({
        method: "post",
<<<<<<< HEAD
        url: `/api/fishes/inventory/delete`,
=======
        url: `api1/api/fishes/inventory/delete`,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        data: {
          inventoryId: deletedFishInfo.inventoryId,
        },
      });
      setInventoryData((prevData) =>
        prevData.filter((fish) => fish !== deletedFishInfo)
      );
    } catch (error) {
      console.error("삭제 실패");
      return 0;
    }
    return 1;
  };

  ////////////////////add dummy data (inven)//////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const addItem = async () => {
    try {
      setLoading(true);
      const fish = {
<<<<<<< HEAD
        fishCode: "A003",
=======
        name: "벵에돔",
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        size: 41.3,
      };

      const response = await authorizedRequest({
        method: "post",
<<<<<<< HEAD
        url: `/api/fishes/catch`,
=======
        url: `api1/api/fishes/catch`,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
      {/* // add dummy data code */}
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
            return (
              <ItemSlide
<<<<<<< HEAD
                fishInfo={fish}
                onDeleteSlide={() => handleDeleteSlide(inventoryData[key])}
              />
            );
          })}
          {/* dummy start */}

          {/* dummy end */}
=======
                key={`inven${fish.inventoryId}`}
                fishInfo={fish}
                isFishBowl="false"
                onDeleteSlide={() => handleDeleteSlide(inventoryData[key])}
                itemchange={itemchange}
              />
            );
          })}
        </div>
        <div className="inven-carousel inven-disable-scrollbar">
          {Object.keys(fishBowlData).map((key) => {
            const fish = fishBowlData[key];
            return (
              <ItemSlide
                key={`fishbowl${fish.fishBowlId}`}
                fishInfo={fish}
                isFishBowl="true"
                onDeleteSlide={() => handleDeleteSlide(fishBowlData[key])}
                itemchange={itemchange}
              />
            );
          })}
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        </div>
      </div>
    </div>
  );
};

export default Inventory;

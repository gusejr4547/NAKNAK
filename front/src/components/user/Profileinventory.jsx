import React, { useEffect, useState } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import axios from "axios";
<<<<<<< HEAD
=======
import "./Profileinventory.css";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

function Profileinventory(props) {
  const [loading, setLoading] = useState(true);
  const [invenData, setinvenData] = useState(true);

  const getInven = async () => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/fishes/inventory/info/${props.id}`,
      });
      setinvenData(response.data);
      console.log(invenData);
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false); // 데이터 로딩 완료 (에러 발생)
    }
  };

  useEffect(() => {
    getInven();
  }, []);

  return (
    <div
<<<<<<< HEAD
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <p> 포인트 : {props.point}</p>
      <p> 어획량 : {invenData.count}</p>
      <p> 최대어 : {invenData.maxSize}자</p>
=======
      className="profileinventorybox"
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <p className="profileinventoryp"> 💰 : {props.point}</p>
      <p className="profileinventoryp"> 🐠 : {invenData.count}</p>
      <p className="profileinventoryp"> 🐳 : {invenData.maxSize}자</p>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    </div>
  );
}

export default Profileinventory;

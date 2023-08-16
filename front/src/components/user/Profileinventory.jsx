import React, { useEffect, useState } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import axios from "axios";
import "./Profileinventory.css";

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
      className="profileinventorybox"
      style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}
    >
      <p className="profileinventoryp"> 💰 : {props.point}</p>
      <p className="profileinventoryp"> 🐠 : {invenData.count}</p>
      <p className="profileinventoryp"> 🐳 : {invenData.maxSize}자</p>
    </div>
  );
}

export default Profileinventory;
import React, { useEffect, useState } from "react";
import {
  point,
  equipment,
  Chaebi,
  manner,
  limit_length,
  action,
  limit_date,
} from "../../utils/data/point";
import Dictlist from "./Dictlist";
import "./Dict.css";
import { useRecoilState } from "recoil";
import { location_recoil } from "../../utils/atoms";

function Dict(props) {
  const [activeView, setActiveView] = useState("");
  const [location, setLocation] = useRecoilState(location_recoil);
  const [inputData, setinputData] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [lodata, setlodata] = useState("");

  const [message, setMessage] = useState("");

  const fetchDataFromFlutter = () => {
    // Call the JavaScript function defined in the WebView.
    window.requestFlutterData();
  };

  // Define the function to receive data from Flutter.
  window.receiveDataFromFlutter = (data) => {
    setMessage(data);
  };

  const getlocation = () => {
    console.log(123);
    // 리액트 웹 앱의 JavaScript 코드
    window.addEventListener(
      "flutterInAppWebViewPlatformReady",
      function (event) {
        if (window.flutter_inappwebview.callHandler) {
          window.flutter_inappwebview
            .callHandler("myHandlerName")
            .then(function (result) {
              const loca = JSON.stringify(result);
              console.log(JSON.stringify(result));
              setlodata(loca);
            });
          console.log(123);
        } else {
          window.flutter_inappwebview
            ._callHandler("myHandlerName")
            .then(function (result) {
              console.log(JSON.stringify(result));
            });
        }
      }
    );
  };

  const handleToggle = (view) => {
    setActiveView(view);
  };

  const Search = (event) => {
    if (event.key === "Enter") {
      setSearchData([]);
      const arr = [];
      point.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      equipment.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      Chaebi.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      manner.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      limit_length.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      action.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      limit_date.forEach((ele) => {
        if (ele.title.includes(inputData)) {
          arr.push(ele);
          setSearchData(...searchData, arr);
        }
      });
      console.log(searchData);
    } else {
      setSearchData([]);
      const Data = event.target.value;
      setinputData(Data);
    }
  };

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        const now = new Date();
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setlodata(position.coords.latitude, position.coords.longitude);
            resolve({
              err: 0,
              time: now.toLocaleTimeString(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            resolve({
              err: -1,
              latitude: -1,
              longitude: -1,
            });
          },
          { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
        );
      } else {
        reject({ error: -2, latitude: -1, longitude: -1 });
      }
    });
  }

  return (
    <div>
      <input
        // className="search"
        placeholder="궁금한 점을 검색해주세요."
        onChange={Search}
        onKeyPress={Search}
      />
      <div className="search-wrapper">
        {searchData.map((data, index) => (
          <p className="mapsearchresult" key={index}>
            {data.title}
          </p>
        ))}
      </div>
      <div className="dictBottom">
        <div className="dicttoggleBar" style={{ display: "flex" }}>
          <button
            onClick={() => handleToggle("point")}
            className={activeView === "point" ? "dictactive" : "dictdefault"}
          >
            스팟
          </button>
          <button
            onClick={() => handleToggle("equipment")}
            className={
              activeView === "equipment" ? "dictactive" : "dictdefault"
            }
          >
            장비
          </button>
          <button
            onClick={() => handleToggle("Chaebi")}
            className={activeView === "Chaebi" ? "dictactive" : "dictdefault"}
          >
            채비
          </button>
          <button
            onClick={() => handleToggle("manner")}
            className={activeView === "manner" ? "dictactive" : "dictdefault"}
          >
            매너
          </button>
          <button
            onClick={() => handleToggle("action")}
            className={activeView === "action" ? "dictactive" : "dictdefault"}
          >
            동작
          </button>
          <button
            onClick={() => handleToggle("limit_length")}
            className={
              activeView === "limit_length" ? "dictactive" : "dictdefault"
            }
          >
            금지체장
          </button>
          <button
            onClick={() => handleToggle("limit_date")}
            className={
              activeView === "limit_date" ? "dictactive" : "dictdefault"
            }
          >
            금어기
          </button>
        </div>
        {activeView === "point" && (
          <div className="dictMiddle">
            <Dictlist data={point} />
          </div>
        )}
        {activeView === "equipment" && (
          <div className="dictMiddle">
            <Dictlist data={equipment} />
          </div>
        )}
        {activeView === "Chaebi" && (
          <div className="dictMiddle">
            <Dictlist data={Chaebi} />
          </div>
        )}
        {activeView === "limit_length" && (
          <div className="dictMiddle">
            <Dictlist limit={limit_length} />
          </div>
        )}
        {activeView === "manner" && (
          <div className="dictMiddle">
            <Dictlist data={manner} />
          </div>
        )}
        {activeView === "action" && (
          <div className="dictMiddle">
            <Dictlist data={action} />
          </div>
        )}
        {activeView === "limit_date" && (
          <div className="dictMiddle">
            <Dictlist limit_d={limit_date} />
          </div>
        )}
      </div>
      <p>{message}</p>
      <button onClick={fetchDataFromFlutter}>Fetch Data from Flutter</button>
      {location && (
        <p>
          123
          {location.latitude}
          {location}
        </p>
      )}
      {lodata && <p>{lodata}</p>}
    </div>
  );
}

export default Dict;

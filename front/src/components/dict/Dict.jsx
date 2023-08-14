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
import { GetLocation, callFlutter } from "../../utils/location";

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

  const [meme, setMeme] = useState("");

  // function callFlutterFunction() {
  //   if (window.flutter_inappwebview) {
  //     window.flutter_inappwebview
  //       .callHandler("flutterFunction", 123)
  //       .then(function (result) {
  //         console.log(123);
  //         console.log("Result from Flutter:", result);
  //         setMeme(result);
  //       });
  //   }
  // }

  async function handleButtonClick() {
    const data = await callFlutter();
    setMeme(data);
  }

  // 버튼을 누를 때 호출되는 함수
  function handleClick() {
    (async () => {
      try {
        const locationData = await GetLocation();
        // 위치 데이터를 이용한 추가 작업
        console.log(locationData);
      } catch (error) {
        // 오류 처리
      }
    })();
  }

  // const options = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0,
  // };

  // const [position, setPosition] = useState(null);

  // function success(pos) {
  //   const crd = pos.coords;

  //   setPosition({
  //     latitude: crd.latitude,
  //     longitude: crd.longitude,
  //     accuracy: crd.accuracy,
  //   });
  // }

  // function error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // function handleGetLocation() {
  //   navigator.geolocation.getCurrentPosition(success, error, options);
  // }

  // function getLocation() {
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       const now = new Date();
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setlodata(position.coords.latitude, position.coords.longitude);
  //           resolve({
  //             err: 0,
  //             time: now.toLocaleTimeString(),
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //         },
  //         (err) => {
  //           resolve({
  //             err: -1,
  //             latitude: -1,
  //             longitude: -1,
  //           });
  //         },
  //         { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
  //       );
  //     } else {
  //       reject({ error: -2, latitude: -1, longitude: -1 });
  //     }
  //   });
  // }

  const handleToggle = (view) => {
    if (activeView === view) {
      setActiveView("");
      console.log(activeView);
    } else {
      setActiveView(view);
    }
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

  return (
    <div className="dict-box">
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
      <button onClick={handleClick}>123</button>
      {/* <button onClick={handleGetLocation}>Get Current Location</button>
      {position && (
        <div>
          <p>Your current position is:</p>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
        </div>
      )} */}
      <button onClick={handleButtonClick}>버튼123</button>
      {meme && (
        <p>
          {meme.latitude} {meme.longitude}
        </p>
      )}
    </div>
  );
}

export default Dict;

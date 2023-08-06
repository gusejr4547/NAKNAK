import React from "react";

function Picresult(props) {
  return (
    <div>
      {props.imgurl && (
        <div>
          <h2>촬영한 사진</h2>
          {/* Display the captured image using URL.createObjectURL() */}
          <img
            src={props.imgurl}
            alt="Captured Fish"
            style={{ Width: "200px", height: "200px" }}
          />
        </div>
      )}

      {/* 물고기 정보가 있을 때만 표시 */}
      {props.data && (
        <div>
          <h2>물고기 정보</h2>
          <p>인벤토리 ID: {props.data.inventoryId}</p>
          <p>물고기 ID: {props.data.fish.fishId}</p>
          <p>물고기 이름: {props.data.fish.name}</p>
          <p>물고기 코드: {props.data.fish.code}</p>
          <p>물고기 정보: {props.data.fish.info}</p>
          <p>물고기 크기: {props.data.size}cm</p>
          {/* 물고기 이미지도 표시할 수 있습니다 */}
          {/* <img src={fishImg.fish.imgUrl} alt={fishImg.fish.name} style={{ maxWidth: '200px' }} /> */}
        </div>
      )}
    </div>
  );
}

export default Picresult;

import React from "react";
import { Link } from "react-router-dom";
import AWS from "aws-sdk";
import uuid from "react-uuid";

import "./CreateFeed.css";

import Testcode from "./Testcode";

const CreateFeed = () => {
  return (
    // board-wrapper 변경 후 적용할 것
    <div className="board-wrapper">
      {/* <Test></Test> */}

      {/* board-header 변경 후 적용필요 */}
      <div className="">
        <Link to={`/Board`} className="">
          <img src="" alt="취소" />
        </Link>
        <div className="">
          <h1>새 게시글</h1>
        </div>
        <div className="">
          <img src="" alt="작성" />
        </div>
      </div>
      <div className="create-feed-wrapper">
        <div>여기 안에 게시글 작성 데이터를 넣을거임</div>
        <Testcode></Testcode>
      </div>
    </div>
  );
};

export default CreateFeed;

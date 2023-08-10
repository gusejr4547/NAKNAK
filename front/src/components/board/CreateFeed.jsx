import React from "react";
import { Link } from "react-router-dom";

import "./CreateFeed.css";

import Testcode from "./Testcode";

const CreateFeed = () => {
  return (
    // board-wrapper 변경 후 적용할 것
    <div className="create-feed-wrapper">
      {/* <Test></Test> */}

      {/* board-header 변경 후 적용필요 */}
      <div className="create-feed-header">
        <Link to={`/Board`} className="create-feed-cancel">
          <img src="" alt="취소" />
        </Link>
        <div className="create-feed-title">
          <h1>새 게시글</h1>
        </div>
        <div className="create-feed-submit">
          <img src="" alt="작성" />
        </div>
      </div>
      <div className="create-feed-contents">
        <div>여기 안에 게시글 작성 데이터를 넣을거임</div>
      </div>
    </div>
  );
};

export default CreateFeed;

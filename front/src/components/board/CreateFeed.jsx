import "./CreateFeed.css";
import React from "react";

const CreateFeed = () => {
  return (
    <div className="board-wrapper">
      {/* <Test></Test> */}

      <div className="board-header">
        <div className="board-title-container">
          <h1>NAKNAK</h1>
        </div>
        <div className="board-search-img-container">
          <img src="/assets/cats/cat.PNG" alt="검색버튼" />
        </div>
      </div>
      <div className="create-feed-wrapper">
        여기 안에 게시글 작성 데이터를 넣을거임
      </div>
    </div>
  );
};

export default CreateFeed;

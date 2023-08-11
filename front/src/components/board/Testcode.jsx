import React, { useState, useEffect } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";

import FeedTag from "./FeedTag";

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [content, setContent] = useState("");
  const [tagListData, setTagListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const getTagList = async () => {
      try {
        setLoading(true);

        const response = await authorizedRequest({
          method: "get",
          url: `api1/api/tags`,
        });
        console.log("tag load success", response.data);
        setTagListData(response.data);
      } catch (error) {
        console.error("tag load error");
      } finally {
        setLoading(false);
      }
    };
    getTagList();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(e.target.files),
    ]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // 작성된 게시글 내용(content)을 서버에 전송하는 로직을 구현할 수 있습니다.
    // 예: API 호출 등
    console.log("Submitted Content:", content);
  };

  const handleRemove = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const tagClickHandler = (tag) => {
    console.log("태크클릭핸들러작동", tag.tagId);
    setSelectedTag(tag);
  };

  const renderSelectedFiles = () => {
    return (
      <div
        style={{
          width: "412px",
          maxHeight: "20rem",
          display: "flex",
          overflowX: "scroll",
        }}
      >
        {selectedFiles.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Image ${index}`}
            style={{ maxWidth: "auto", maxHeight: "5rem", margin: "10px" }}
            onClick={() => handleRemove(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h2>사진 첨부</h2>
        <label htmlFor="fileInput">
          <img
            src="/assets/cats/cat.png"
            alt="Select Images"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              margin: "10px",
              cursor: "pointer",
            }}
          />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </div>
      {renderSelectedFiles()}

      <hr />

      <div>
        <h2>게시글 작성</h2>
        <textarea
          rows="5"
          cols="45"
          value={content}
          onChange={handleContentChange}
          placeholder="게시글 내용을 작성하세요..."
        />
        <button onClick={handleSubmit}>게시글 작성</button>
      </div>

      <hr />

      <div>
        <h2>태그 선택</h2>
        <div style={{ display: "flex" }}>
          {Object.keys(tagListData).map((key) => {
            const tag = tagListData[key];
            return (
              <FeedTag
                tagInfo={tag}
                active={
                  !selectedTag
                    ? false
                    : tag.tagId === selectedTag.tagId
                    ? true
                    : false
                }
                onClick={tagClickHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;

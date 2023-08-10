import React, { useState, useEffect } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import { Link, useNavigate } from "react-router-dom";

import "./CreateFeed.css";
import FeedTag from "./FeedTag";

const CreateFeed = () => {
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tagListData, setTagListData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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

  const fileChangeHandler = (e) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(e.target.files),
    ]);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const removeSelectedFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const tagClickHandler = (tag) => {
    if (selectedTags.includes(tag.tagName)) {
      // 이미 선택된 태그를 클릭하여 취소하는 경우
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag.tagName));
    } else {
      // 선택되지 않은 태그를 클릭하여 선택하는 경우
      setSelectedTags((prevTags) => [...prevTags, tag.tagName]);
    }
  };
  const createFeed = async () => {
    if (selectedFiles.length === 0 || selectedTags.length === 0) {
      alert("이미지와 태그를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("file", selectedFiles);
    formData.append("tags", selectedTags);
    console.log("formData", formData.data);
    try {
      setLoading(true);

      const response = await authorizedRequest({
        method: "post",
        url: `api1/api/posts/upload`,
        data: formData,
      });
      console.log("feed load success", response.data);

      setContent("");
      setSelectedFiles([]);
      setSelectedTags([]);

      navigate("/Board");
    } catch (error) {
      console.error("feed load error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-feed-wrapper">
      <div className="create-feed-header">
        <Link to={`/Board`} className="create-feed-cancel">
          <img src="" alt="취소" />
        </Link>
        <div className="create-feed-title">
          <h1>간지나는글쓰기라는문구가필요함</h1>
        </div>
        <div className="create-feed-submit" onClick={createFeed}>
          <img src="" alt="작성" />
        </div>
      </div>
      <div className="create-feed-contents">
        {/* 여기서부터 하나씩 집어넣으면 됨 */}

        {/* 이미지첨부버튼 */}
        <div className="create-feed-image-select-header">
          <h2>Images</h2>
          <label htmlFor="fileInput">
            <div className="create-feed-image-select-button"> select</div>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={fileChangeHandler}
            multiple
          />
        </div>

        {/* 이미지출력 */}
        <div className="create-feed-selected-files-carousel create-feed-disable-scrollbar">
          {selectedFiles.map((file, index) => (
            <div className="create-feed-selected-file-container">
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Image ${index}`}
                className="create-feed-selected-file"
                onClick={() => removeSelectedFile(index)}
              />
              <img
                src="/assets/icons/x.pn" // 마이너스 아이콘 이미지 경로
                alt="Delete"
                className="create-feed-image-delete-button minus-icon"
              />
            </div>
          ))}
        </div>

        {/* 게시글 작성부분 */}
        <div className="create-feed-contents-inner">
          <h2>Contents</h2>
          <textarea
            className="create-feed-textarea"
            rows="5"
            cols="45"
            value={content}
            onChange={contentChangeHandler}
            placeholder="피드 내용을 작성하세요..."
          />
        </div>

        {/* 태그 선택부분 */}
        <div className="create-feed-contents-inner">
          <h2>Tag</h2>
          <hr />
          <div className="create-feed-tag-container create-feed-disable-scrollbar">
            {Object.keys(tagListData).map((key) => {
              const tag = tagListData[key];
              return (
                <FeedTag
                  key={tag.tagId} // 고유한 키를 제공해야 합니다.
                  tagInfo={tag}
                  active={selectedTags.includes(tag.tagName)} // 선택 여부를 배열 포함 여부로 판단
                  onClick={() => tagClickHandler(tag)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeed;

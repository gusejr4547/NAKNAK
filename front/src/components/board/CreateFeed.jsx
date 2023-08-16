import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [newTag, setNewTag] = useState(""); // 새로 추가할 태그

  useEffect(() => {
    const getTagList = async () => {
      try {
        setLoading(true);

        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/tags`,
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
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.map((file) => {
      const originalExtension = file.name.split(".").pop();
      const lowerCaseExtension = originalExtension.toLowerCase();
      const newFileName = file.name.replace(
        new RegExp(`\\.${originalExtension}$`, "i"),
        `.${lowerCaseExtension}`
      );
      const transformedFile = new File([file], newFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      return transformedFile;
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
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
    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("tags", selectedTags);

    console.log(formData);

    try {
      setLoading(true);

      const response = await authorizedRequest({
        header: { "Content-Type": "multipart/form-data" },
        method: "post",
        url: `/api1/api/posts/upload`,
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

  const addNewTag = () => {
    if (newTag.trim() === "") return;

    if (Object.values(tagListData).some((tag) => tag.tagName === newTag)) {
      alert("이미 존재하는 태그입니다.");
      return;
    }

    if (newTag.length > 4) {
      alert("태그는 4글자 이하로 입력해주세요.");
      return;
    }
    // 태그 추가 로직 구현
    const newTagId = Object.keys(tagListData).length + 1; // 임의의 ID 생성
    const newTagObject = { tagId: newTagId, tagName: newTag };

    setTagListData({ ...tagListData, [newTagId]: newTagObject });
    setSelectedTags([...selectedTags, newTag]);
    setNewTag("");
  };

  return (
    <div className="create-feed-wrapper">
      <div className="create-feed-header">
        <Link to={`/Board`}>
          <img
            src="/assets/icons/back.png"
            alt="취소"
            className="create-feed-cancel"
          />
        </Link>
        <div className="create-feed-title">
          <h1>NEW FEED</h1>
        </div>
        <div onClick={createFeed}>
          <img
            src="/assets/icons/upload.png"
            className="create-feed-submit"
            alt="작성"
          />
        </div>
      </div>
      <div className="create-feed-contents">
        {/* 여기서부터 하나씩 집어넣으면 됨 */}

        {/* 이미지첨부버튼 */}
        <div className="create-feed-image-select-header">
          <h2 className="create-feed-content-title">Images</h2>
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
                src="/assets/icons/minus.png" // 마이너스 아이콘 이미지 경로
                alt="Delete"
                className="create-feed-image-delete-button minus-icon"
              />
            </div>
          ))}
        </div>

        {/* 게시글 작성부분 */}
        <div className="create-feed-contents-inner">
          <h2 className="create-feed-content-title">Contents</h2>
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
          <h2 className="create-feed-content-title">Tag</h2>
          <hr />
          {/* 태그 임의 추가 */}
          <div className="create-feed-add-tag">
            <input
              type="text"
              placeholder="새로운 태그 추가"
              value={newTag}
              maxLength={4}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <div className="create-feed-add-tag-button " onClick={addNewTag}>
              add
            </div>
          </div>

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

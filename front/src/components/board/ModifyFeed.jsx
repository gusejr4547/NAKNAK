import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

import "./ModifyFeed.css";
import FeedTag from "./FeedTag";

const ModifyFeed = () => {
  const navigate = useNavigate();

  const postId = useParams().postId;
  const [feedInfo, setFeedInfo] = useState({});

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tagListData, setTagListData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const getTargetFeed = async () => {
      try {
        setLoading(true);

        const response = await authorizedRequest({
          method: "get",
          // 도무지 이해할 수 없는 다른곳은 url 앞에 다 / 를 안붙였는데 여기는 붙여야 됨... env 파일 변경 해도 다른건 다 됨..
          url: `/api1/api/posts/${postId}`,
        });

        console.log("feed load success", response.data);

        setFeedInfo(response.data);
        setSelectedFiles(response.data.images);
        setContent(response.data.content);
      } catch (error) {
        console.error("feed load error");
      } finally {
        setLoading(false);
      }
    };
    getTargetFeed();
  }, []);

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

  return (
    <div className="modify-feed-wrapper">
      <div className="modify-feed-header">
        <Link to={`/Board`} className="modify-feed-cancel">
          <img src="" alt="취소" />
        </Link>
        <div className="modify-feed-title">
          <h1>대충 수정한다는 말</h1>
        </div>
        {/* 아래 onClick 필요 */}
        <div className="modify-feed-submit">
          <img src="" alt="수정" />
        </div>
      </div>
      <div className="modify-feed-contents">
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

export default ModifyFeed;

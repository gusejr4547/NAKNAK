import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { authorizedRequest } from "../account/AxiosInterceptor";

import "./ModifyFeed.css";
import FeedTag from "./FeedTag";
import DeleteFeed from "./DeleteFeed";

const ModifyFeed = () => {
  const navigate = useNavigate();

  const postId = useParams().postId;
  const [feedInfo, setFeedInfo] = useState({});

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deleteImageList, setDeleteImageList] = useState([]);

  const [tagListData, setTagListData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState(""); // 새로 추가할 태그

  useEffect(() => {
    const getTargetFeed = async () => {
      try {
        setLoading(true);

        const response = await authorizedRequest({
          method: "get",
          url: `/api1/api/posts/${postId}`,
        });

        console.log("feed load success", response.data);

        setFeedInfo(response.data);
        setSelectedFiles(response.data.images);

        console.log(response.data.images);

        setContent(response.data.content);

        //tagsname 을 보내야함
        setSelectedTags([...response.data.tags]);
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

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const removeSelectedFile = (indexToRemove, fileIndex) => {
    if (selectedFiles.length === 1) {
      alert("이미지는 최소 하나 이상이어야합니다.");
      return;
    }

    setDeleteImageList((prevFiles) => [...prevFiles, fileIndex]);
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const tagClickHandler = (tag) => {
    console.log("tagClicked");
    if (
      selectedTags.some((selectedTag) => selectedTag.tagName === tag.tagName)
    ) {
      // 이미 선택된 태그를 클릭하여 취소하는 경우
      setSelectedTags((prevTags) =>
        prevTags.filter((selectedTag) => selectedTag.tagName !== tag.tagName)
      );
    } else {
      // 선택되지 않은 태그를 클릭하여 선택하는 경우
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const ModifyFeed = async () => {
    if (selectedFiles.length === 0 || selectedTags.length === 0) {
      alert("이미지와 태그를 선택해주세요.");
      return;
    }
    // const formData = new FormData();
    // formData.append("postId", postId);
    // formData.append("content", content);

    // formData.append("tags", selectedTags);
    // // selectedTags.forEach((tag) => {
    // //   formData.append("tags", tag);
    // // });
    // formData.append("deleteImageList", 1);

    try {
      setLoading(true);

      const response = await authorizedRequest({
        method: "patch",
        url: `/api1/api/posts/${postId}`,
        data: {
          postId: postId,
          content: content,
          tags: selectedTags,
          deleteImageList: deleteImageList,
        },
      });
      console.log("feed modify success", response.data);

      navigate("/Board");
    } catch (error) {
      console.error("feed modify error");
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    try {
      setLoading(true);

      const response = await authorizedRequest({
        method: "delete",
        url: `/api1/api/posts/${postId}`,
      });
      console.log("feed delete success", response.data);

      navigate("/Board");
    } catch (error) {
      console.error("feed delete error");
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
    setSelectedTags([...selectedTags, { tagName: newTag }]);
    setNewTag("");
  };

  return (
    <div className="modify-feed-wrapper">
      <div className="modify-feed-header">
        <Link to={`/Board`}>
          <img
            src="/assets/icons/back.png"
            alt="취소"
            className="modify-feed-cancel"
          />
        </Link>
        <div className="modify-feed-title">
          <h1>MODIFY</h1>
        </div>
        <div onClick={ModifyFeed}>
          <img
            src="/assets/icons/check.png"
            alt="수정"
            className="modify-feed-submit"
          />
        </div>
      </div>
      <div className="modify-feed-contents">
        {/* 여기서부터 하나씩 집어넣으면 됨 */}

        {/* 이미지첨부버튼 */}
        <div className="modify-feed-image-select-header">
          <h2 className="modify-feed-content-title">Modify Images</h2>
        </div>

        {/* 이미지출력 */}
        <div className="modify-feed-selected-files-carousel modify-feed-disable-scrollbar">
          {selectedFiles.map((file, index) => (
            <div className="modify-feed-selected-file-container">
              <img
                key={index}
                src={`${process.env.REACT_APP_BACKEND_URL}/${selectedFiles[index].fileUrl}`}
                alt={`Image ${index}`}
                className="modify-feed-selected-file"
                onClick={() => removeSelectedFile(index, file.fileId)}
              />
              <img
                src="/assets/icons/minus.png" // 마이너스 아이콘 이미지 경로
                alt="Delete"
                className="modify-feed-image-delete-button minus-icon"
              />
            </div>
          ))}
        </div>

        {/* 게시글 작성부분 */}
        <div className="modify-feed-contents-inner">
          <h2 className="modify-feed-content-title">Modify Contents</h2>
          <textarea
            className="modify-feed-textarea"
            rows="5"
            cols="45"
            value={content}
            onChange={contentChangeHandler}
            placeholder="피드 내용을 작성하세요..."
          />
        </div>

        {/* 태그 선택부분 */}
        <div className="modify-feed-contents-inner">
          <h2 className="modify-feed-content-title">Modify Tag</h2>
          <hr />
          {/* 태그 임의 추가 */}
          <div className="modify-feed-add-tag">
            <input
              type="text"
              placeholder="새로운 태그 추가"
              value={newTag}
              maxLength={4}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <div className="modify-feed-add-tag-button " onClick={addNewTag}>
              add
            </div>
          </div>

          <div className="modify-feed-tag-container modify-feed-disable-scrollbar">
            {Object.keys(tagListData).map((key) => {
              const tag = tagListData[key];
              return (
                <FeedTag
                  key={tag.tagId} // 고유한 키를 제공해야 합니다.
                  tagInfo={tag}
                  active={selectedTags.some(
                    (selectedTag) => selectedTag.tagName === tag.tagName
                  )} // 선택 여부를 배열 포함 여부로 판단
                  onClick={() => tagClickHandler(tag)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <DeleteFeed onDelete={deleteHandler} />
    </div>
  );
};

export default ModifyFeed;

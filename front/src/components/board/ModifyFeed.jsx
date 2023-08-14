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
  return (
    <div className="modify-feed-wrapper">
      <div className="modify-feed-header">
        <Link to={`/Board`} className="modify-feed-cancel">
          <img src="" alt="취소" />
        </Link>
        <div className="modify-feed-title">
          <h1>대충 수정한다는 말</h1>
        </div>
        <div className="modify-feed-submit" onClick={ModifyFeed}>
          <img src="" alt="수정" />
        </div>
      </div>
      <div className="modify-feed-contents">
        {/* 여기서부터 하나씩 집어넣으면 됨 */}

        {/* 이미지첨부버튼 */}
        <div className="create-feed-image-select-header">
          <h2>Modify Images</h2>
        </div>

        {/* 이미지출력 */}
        <div className="create-feed-selected-files-carousel create-feed-disable-scrollbar">
          {selectedFiles.map((file, index) => (
            <div className="create-feed-selected-file-container">
              <img
                key={index}
                src={`${process.env.REACT_APP_BACKEND_URL}/${selectedFiles[index].fileUrl}`}
                alt={`Image ${index}`}
                className="create-feed-selected-file"
                onClick={() => removeSelectedFile(index, file.fileId)}
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
          <h2>Modify Contents</h2>
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
          <h2>Modify Tag</h2>
          <hr />
          <div className="create-feed-tag-container create-feed-disable-scrollbar">
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
      <DeleteFeed onDelete={deleteHandler}>삭제..</DeleteFeed>
    </div>
  );
};

export default ModifyFeed;

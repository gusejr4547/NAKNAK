import React, { useState } from "react";

const TagButton = ({ tag, active, onClick }) => {
  return (
    <button className={active ? "active" : ""} onClick={() => onClick(tag)}>
      {tag}
    </button>
  );
};

const Post = ({ title, tags }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{tags.join(", ")}</p>
    </div>
  );
};

const App = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // 가상의 게시물 데이터
  const posts = [
    { title: "게시물 1", tags: ["React", "Frontend"] },
    { title: "게시물 2", tags: ["React", "Backend"] },
    { title: "게시물 3", tags: ["JavaScript", "Frontend"] },
    // ...
  ];

  return (
    <div>
      <div>
        <h2>태그 버튼</h2>
        <TagButton
          tag="React"
          active={selectedTag === "React"}
          onClick={handleTagClick}
        />
        <TagButton
          tag="JavaScript"
          active={selectedTag === "JavaScript"}
          onClick={handleTagClick}
        />
        <TagButton
          tag="Frontend"
          active={selectedTag === "Frontend"}
          onClick={handleTagClick}
        />
        <TagButton
          tag="Backend"
          active={selectedTag === "Backend"}
          onClick={handleTagClick}
        />
      </div>
      <div>
        <h2>게시물</h2>
        {posts.map((post, index) => {
          if (!selectedTag || post.tags.includes(selectedTag)) {
            return <Post key={index} title={post.title} tags={post.tags} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default App;

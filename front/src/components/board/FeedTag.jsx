import "./FeedTag.css";

const FeedTag = ({ tagInfo, active, onClick }) => {
  return (
    <div
      className={`feed-tag-wrapper ${
        active ? "feed-tag-active" : "feed-tag-ianctive"
      }`}
      onClick={() => onClick(tagInfo)}
    >
      <h6>#{tagInfo.tagName}</h6>
    </div>
  );
};

export default FeedTag;

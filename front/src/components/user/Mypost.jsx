import { useEffect, useState } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { div } from "@tensorflow/tfjs";
import "./profile.css";
import { div } from "@tensorflow/tfjs";

function Mypost(props) {
  const [MypostData, setMypostData] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수 상태

  const getMyPost = async (page) => {
    console.log(123);
    const param = { page: page, size: 4 };
    try {
      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/posts/${props.ver}`,
        params: param,
      });
      setLoading(false); // 데이터 로딩 완료
      //   setLoading(false); // 데이터 로딩 완료
      if (props.ver === "my-post") {
        props.postplus(response.data.count);
      }
      console.log(response.data);
      if (response.data.count) {
        setMypostData(response.data);
      }
      //   setMypostData(response.data.count);
      //   console.log(MypostData);
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false); // 데이터 로딩 완료
      //   setLoading(false); // 데이터 로딩 완료 (에러 발생)
    }
  };

  useEffect(() => {
    getMyPost(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (MypostData && MypostData.count) {
      setTotalPage(Math.ceil(MypostData.count / 4)); // 총 페이지 수 설정
    }
  }, [MypostData]); // MypostData가 변경될 때마다 호출

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage); // 페이지 변경 처리
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postbox">
      {props.ver === "my-post" ? (
        <div className="mypost">
          {MypostData?.data?.map((item) => (
            <div key={item.postId} className="postcard">
              <div className="postimgbox">
                <img
                  className="postimg"
                  src={item.image ? item.image : "/assets/cats/cat.png"}
                  alt=""
                />
              </div>
              <div className="postbody">{item.content}</div>
              <div className="postfotter">
                {item.registeredAt.substr(0, 11)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mypost">
          {MypostData?.data?.map((item, idx) => (
            <div className="postcard">
              <div className="postimgbox">
                <img
                  className="postimg"
                  src={item.image ? item.image : "/assets/cats/cat.png"}
                  alt=""
                />
              </div>
              <div className="postbody">
                <p>{item.content}</p>
                <p>{item.memberNickname}</p>
              </div>
              <div className="postfotter">
                {item.registeredAt.substr(0, 11)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <span
          className="mypost-page-btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<<"}
        </span>
        <span>
          {currentPage} / {totalPage}
        </span>
        <span
          className="mypost-page-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">>"}
        </span>
      </div>
    </div>
  );
}

export default Mypost;

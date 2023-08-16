import { useEffect, useState } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
<<<<<<< HEAD
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Mypost(props) {
  const [MypostData, setMypostData] = useState([]);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

  const getMyPost = async () => {
    console.log(123);
    const param = { page: 1, size: 3 };
=======
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Mypost(props) {
  const [MypostData, setMypostData] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수 상태
  const [pageNation, setPageNation] = useState([]);
  const navigate = useNavigate();

  const getMyPost = async (page) => {
    const param = { page: page, size: 4, memberId: props.id };
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    try {
      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/posts/${props.ver}`,
        params: param,
      });
      setLoading(false); // 데이터 로딩 완료
      //   setLoading(false); // 데이터 로딩 완료
<<<<<<< HEAD
      console.log(response.data);
      if (response.data.count) {
        setMypostData(response.data);
      }
=======
      if (props.ver === "my-post") {
        props.postplus(response.data.count);
      }
      console.log(response.data);
      setMypostData(response.data);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      //   setMypostData(response.data.count);
      //   console.log(MypostData);
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false); // 데이터 로딩 완료
      //   setLoading(false); // 데이터 로딩 완료 (에러 발생)
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    getMyPost();
  }, []);
=======
  function handleProfileLinkClick(memberId) {
    navigate(`/Profile/:${memberId}`);
    window.location.reload();
  }

  useEffect(() => {
    getMyPost(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (MypostData.count) {
      setTotalPage(Math.ceil(MypostData.count / 4));
      console.log(totalPage, 123);

      const temp = [];
      for (let index = 1; index <= totalPage; index++) {
        temp.push(index);
      }
      setPageNation(temp);
      console.log(pageNation);
    }
  }, [MypostData]); // MypostData가 변경될 때마다 호출

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage); // 페이지 변경 처리
    }
  };
  const btnclick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage); // 페이지 변경 처리
    }
  };
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
<<<<<<< HEAD
    <Row xs={1} md={2} className="g-4">
      {MypostData?.data?.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={item.image.fileUrl} />
            <Card.Body>
              <Card.Text>{item.post.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{item.post.registeredAt}</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
    // <div>
    //   {/* <p>{MypostData.count}</p> */}
    //   {MypostData && <div>{MypostData.data.map((item) => ({ item }))}</div>}
    // </div>
=======
    <div className="postbox">
      {props.ver === "my-post" ? (
        <div className="mypost">
          {MypostData?.data?.map((item) => (
            <div key={item.postId} className="postcard">
              <div className="postimgbox">
                <img
                  className="postimg"
                  src={
                    item.image
                      ? `${process.env.REACT_APP_BACKEND_URL}/${item.image.fileUrl}`
                      : "/assets/cats/cat.png"
                  }
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
            <div key={item.postId} className="postcard">
              <div className="postimgbox">
                <img
                  className="postimg"
                  src={
                    item.image
                      ? `${process.env.REACT_APP_BACKEND_URL}/${item.image.fileUrl}`
                      : "/assets/cats/cat.png"
                  }
                  alt=""
                />
              </div>
              <div className="postbody">
                <p>{item.content}</p>
              </div>
              <div className="postfotter">
                <span onClick={() => handleProfileLinkClick(item.memberId)}>
                  {item.memberNickname}
                </span>{" "}
                {item.registeredAt.substr(0, 11)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="mypost-page-btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<<"}
        </button>
        {/* <span>
          {currentPage} / {totalPage}
        </span> */}
        {pageNation.map((item) => (
          <button
            key={item}
            onClick={() => btnclick(item)}
            className={
              currentPage === item ? "page-btn-active" : "page-btn-default"
            }
          >
            {item}
          </button>
        ))}
        <button
          className="mypost-page-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">>"}
        </button>
      </div>
    </div>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  );
}

export default Mypost;

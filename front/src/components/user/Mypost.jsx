import { useEffect, useState } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { div } from "@tensorflow/tfjs";
import "./profile.css";

function Mypost(props) {
  const [MypostData, setMypostData] = useState([]);
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

  const getMyPost = async () => {
    console.log(123);
    const param = { page: 1, size: 3 };
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
    getMyPost();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row xs={1} md={2} className="g-4 mypost">
      {MypostData?.data?.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Text>{item.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{item.registeredAt}</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Mypost;

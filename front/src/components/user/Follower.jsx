import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";
import { Button } from "react-bootstrap";
import FollowerModal from "./FollowerModal";
import { authorizedRequest } from "../account/AxiosInterceptor";

function Follower(props) {
  const [userData] = useRecoilState(loginuser);
  const [followerData, setFollowerData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [accesstoken] = useRecoilState(token);
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    if (props.user === userData.memberId) {
      setModalOpen(true);
    }
  };

  const getFllowing = async () => {
    try {
      const response = await axios.get(
        `/api1/api/members/following/${props.user}`
      );
      setFollowerData(response.data);
      const followingList = response.data.data.map((item) => item.memberId);
      setIsFollowing(followingList.includes(userData.memberId));
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("Error getting data:", error);
      setLoading(false); // 데이터 로딩 실패
    }
  };

  useEffect(() => {
    getFllowing();
  }, [props.user]);

  // const header = useMemo(() => ({
  //     Authorization: accesstoken,
  //   }),[accesstoken]);

  const followUser = async () => {
    if (props.user === userData.memberId) {
      console.log("동일");
      return;
    }

    const param = { follow: props.user };
    // const config = { params: param, headers: header };
    try {
      // const response = await axios.post(
      //   "/api1/api/follow/register",
      //   null,
      //   config
      // );
      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/follow/register",
        params: param,
      });

      getFllowing();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const unFollowUser = async () => {
    if (props.user === userData.memberId) {
      // console.log("동일");
      return;
    }
    const param = { follow: props.user };
    // const config = { params: param, headers: header };
    try {
      // const response = await axios.post(
      //   "/api1/api/follow/cancel",
      //   null,
      //   config
      // );
      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/follow/cancel",
        params: param,
      });
      getFllowing();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  if (loading) {
    return <div>팔로워: </div>;
  }

  if (!followerData) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <p onClick={showModal}>
        {followerData.count}
        <p>팔로워</p>
      </p>
      {modalOpen && (
        <FollowerModal closeModal={setModalOpen} data={followerData.data} />
      )}
      <div style={{ position: "absolute", top: "-100%", left: "25%" }}>
        {props.user !== userData.memberId && !isFollowing && (
          <Button
            as="input"
            type="button"
            value="팔로우"
            style={{ marginRight: "10px" }}
            onClick={followUser}
          />
        )}
        {props.user !== userData.memberId && isFollowing && (
          <Button
            as="input"
            type="button"
            value="언팔로우"
            style={{ backgroundColor: "red" }}
            onClick={unFollowUser}
          />
        )}
      </div>
    </div>
  );
}

export default Follower;

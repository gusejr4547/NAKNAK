import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
import FollowerModal from "./FollowerModal";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

function Following(props) {
  const [userData] = useRecoilState(loginuser);
  const [followingData, setFollowingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

<<<<<<< HEAD
  const navigate = useNavigate();

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
=======
  // 모달창 노출
  const showModal = () => {
    if (props.user === userData.memberId) {
      setModalOpen(true);
    }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  };

  const getFllowing = async () => {
    try {
      const response = await axios.get(
        `/api1/api/members/follow/${props.user}`
      );
      setFollowingData(response.data);
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("Error getting data:", error);
      setLoading(false); // 데이터 로딩 실패
    }
  };

  useEffect(() => {
    getFllowing();
  }, [props.user]);

  if (loading) {
    return <div>팔로잉: </div>;
  }

  if (!followingData) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div>
<<<<<<< HEAD
      <p onClick={showModal}>팔로잉: {followingData.count}</p>
=======
      <div onClick={showModal}>
        {followingData.count}
        <div>팔로잉</div>
      </div>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      {modalOpen && (
        <FollowerModal closeModal={setModalOpen} data={followingData.data} />
      )}
    </div>
  );
}

export default Following;

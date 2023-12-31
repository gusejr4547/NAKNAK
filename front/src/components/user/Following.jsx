import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
import FollowerModal from "./FollowerModal";

function Following(props) {
  const [userData] = useRecoilState(loginuser);
  const [followingData, setFollowingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    if (props.user === userData.memberId && props.activeView !== "aquarium") {
      setModalOpen(true);
    }
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
      <div onClick={showModal}>
        <div>팔로잉</div>
        {followingData.count}
      </div>
      {modalOpen && (
        <FollowerModal
          closeModal={setModalOpen}
          data={followingData.data}
          ver="following"
        />
      )}
    </div>
  );
}

export default Following;

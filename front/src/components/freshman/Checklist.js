import React from "react";
import { useRecoilState } from "recoil";
import upgradeProgress from "./upgradeProgress";
import { token } from "../../utils/atoms";
import Talk2 from "../freshman/Talk2";

function Checklist() {
  const [accesstoken, setAccesstoken] = useRecoilState(token);

  // 뉴비 튜토리얼 업그레이드
  const handleUpgradeProgress = async (status) => {
    try {
      const response = await upgradeProgress(status, accesstoken);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return <div>Checklist</div>;
}

export default Checklist;

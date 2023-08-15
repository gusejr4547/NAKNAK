import React, { useEffect, useState } from "react";
import { challenge } from "../../utils/data/challenge";
import "./quest.css";
import Questlist from "./Questlist";
import { authorizedRequest } from "../account/AxiosInterceptor";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

function Achievements(props) {
  const [userData] = useRecoilState(loginuser);
  const [allQuest, setAllquest] = useState([]);
  const [acquiredQuest, setAcquiredQuest] = useState([]);

  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back();
    }
  };

  const getAchiev = async () => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: `/api1/api/challenge/${userData.memberId}`,
        // url: `/api1/api/challenge/1`,
      });
      setAllquest(response.data.checkResponse);
      setAcquiredQuest(response.data.list);
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    getAchiev();
  }, []);

  return (
    <div className="quest-container">
      <div className="quest-box quest-disable-scrollbar">
        <img
          src="/assets/icons/x.png"
          alt="exit"
          className="quest-back-button"
          onClick={goBack}
        />
        {allQuest.all ? (
          allQuest.all.map((item) => (
            <Questlist
              key={item.challengeId}
              data={item}
              chk={allQuest.chk}
              detail={acquiredQuest}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Achievements;

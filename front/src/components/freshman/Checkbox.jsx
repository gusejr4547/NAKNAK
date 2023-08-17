import React, { useState } from "react";
import "./Checkbox.css";
import Checklist from "./Checklist";
import { useRecoilState } from "recoil";
import upgradeProgress from "./upgradeProgress";
import {
  newbie_recoil,
  profileData_recoil,
  tts_recoil,
} from "../../utils/atoms";
import Talk2 from "./Talk2";
import { authorizedRequest } from "../account/AxiosInterceptor";
import { useNavigate } from "react-router-dom";
import TTS from "./TTS";
import { useEffect } from "react";

function Checkbox() {
  const navigate = useNavigate();
  const [step, setStep] = useState(9);
  const [profileData, setProfileData] = useRecoilState(profileData_recoil);
  const [newbie, setNewbie] = useRecoilState(newbie_recoil);
  const [tts] = useRecoilState(tts_recoil);
  const [showNext, setShowNext] = useState(false);
  const [item, setItem] = useState("");
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems
      ? JSON.parse(storedItems)
      : [
          { id: 1, text: "낚시 채비 법 알아보기", completed: false },
          { id: 2, text: "미끼 챙기기", completed: false },
          { id: 3, text: "장소찾기", completed: false },
          { id: 4, text: "릴 구매하는 방법 시청", completed: false },
          { id: 5, text: "캐스팅 하는 방법 시청", completed: false },
        ];
  });

  const talkContents = Talk2();
  useEffect(() => {
    setTimeout(() => setShowNext(true), tts);
  }, [tts]);

  const addItem = () => {
    if (item.trim() !== "") {
      const newItem = { id: Date.now(), text: item, completed: false };
      setItems([...items, newItem]);
      localStorage.setItem("items", JSON.stringify([...items, newItem]));
      setItem("");
    }
  };

  const toggleCompletion = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const removeedItems = items.filter((item) => item.id !== id);
    setItems(removeedItems);
    localStorage.setItem("items", JSON.stringify(removeedItems));
  };

  // 뉴비 상태 변경
  // 0 : 뉴비 아님 1 : 원투  2: 루어
  const newbieState = async (status) => {
    try {
      await authorizedRequest({
        method: "post",
        url: "/api1/api/members/status/newbie",
        data: { isNewbie: status },
      });
      // 뉴비 상태 변경된 값 리코일도 변경해주기
      setProfileData((prevData) => ({
        ...prevData,
        memberStatusResponse: {
          ...prevData.memberStatusResponse,
          isNewBie: status,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // 뉴비 튜토리얼 업그레이드
  const handleUpgradeProgress = async (status) => {
    try {
      const response = await upgradeProgress(status);
    } catch (err) {
      console.log(err);
    }
  };
  const next = () => {
    setShowNext(false);
    // 뉴비 해제 axios 보내기 및 현재 newbie false 적용하기.
    if (step === 9) {
      setStep(step + 1);
    } else {
      newbieState(0);
      handleUpgradeProgress(100);
      setNewbie(false);
      navigate("/");
    }
  };

  return (
    <div className="checkbox-wrapper">
      <div>
        <div className="checklist">
          {items.map((item) => (
            <Checklist
              key={item.id}
              text={item.text}
              completed={item.completed}
              onToggle={() => toggleCompletion(item.id)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
        <div className="checkbox-input">
          <input
            type="text"
            placeholder="추가로 할 일을 입력해주세요."
            className="checkbox-inputbox"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="check-btn" type="submit" onClick={addItem}>
            추가
          </button>
        </div>
        {/* 뉴비버전 */}
        {newbie && (
          <div className="checkbox-newbie-talk-box">
            {talkContents[step].content}
            {talkContents[step].content && (
              <TTS message={talkContents[step].content} />
            )}
            {showNext && (
              <div
                className="next"
                onClick={() => {
                  next();
                }}
              >
                다음 &gt;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkbox;

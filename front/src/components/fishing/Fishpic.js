import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { token } from "../../utils/atoms";
import { getFish_recoil, fishingMode_recoil } from "../../utils/atoms";
import "./Fishpic.css";
import Picresult from "./Picresult";

function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [accesstoken] = useRecoilState(token);
  const [getFish, setGetFish] = useRecoilState(getFish_recoil);
  const [fishingMode] = useRecoilState(fishingMode_recoil);
  const [shapePosition, setShapePosition] = useState({ x: 0, y: 0 });
  const [shapeSize, setShapeSize] = useState({ width: 50, height: 50 });

  const header = {
    "Content-Type": "multipart/form-data",
    Authorization: accesstoken,
  };
  const [capturedImageFile, setCapturedImageFile] = useState(null); // 촬영한 사진의 URL을 저장하는 상태 변수
  const [fishImg, setfishImg] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false); // 카메라가 활성화되었는지 여부 상태 변수

  useEffect(() => {
    getCameraStream();
  }, []);

  const getCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("카메라 접근 오류:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
      console.log("카메라 권한이 해제되었습니다.");
    }
    setIsCameraOn(false);
  };

  const handleCapturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 캔버스에 현재 비디오 화면 캡처
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캡처한 이미지를 Blob으로 변환
      const imageBlob = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpg");
      });

      // 이미지 파일 생성
      const imageFile = new File([imageBlob], "fish.jpg", {
        type: "image/jpg",
      });

      // 이미지 파일을 FormData에 추가
      const formData = new FormData();
      setCapturedImageFile(imageFile);
      // setImgUrl(URL.createObjectURL(capturedImageFile));
      formData.append("image", imageFile);
      console.log(formData.get("image"));
      // 이미지 데이터를 서버로 전송
      uploadImage(formData);
    }
  };

  const uploadImage = async (formData) => {
    try {
      // 이미지 데이터를 서버로 전송
      const response = await axios.post("/api1/api/fishes/upload", formData, {
        headers: header,
      });

      // 서버로부터 응답을 받고 처리할 로직 추가 가능
      console.log("서버 응답:", response.data);
      if (fishingMode !== "selectMode") {
        setGetFish(getFish + 1);
      }

      setfishImg(response.data);
      // 서버로부터 응답받은 이미지 URL을 저장
      stopCamera();
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
    }
  };

  return (
    <div className="fishcamerabox">
      <video className="fishcamera" ref={videoRef} autoPlay playsInline />
      {isCameraOn && (
        <img src="./assets/icons/fishpic.png" className="shape-overlay" />
      )}
      {/* <button onClick={getCameraStream}>카메라 on</button> */}
      {isCameraOn && (
        <div className="Fishpicbtn" onClick={handleCapturePhoto}>
          <div className="fishbtnbtn"></div>
        </div>
      )}
      {/* <button onClick={stopCamera}>카메라 off</button> */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Picresult
        imgurl={
          capturedImageFile ? URL.createObjectURL(capturedImageFile) : null
        }
        data={fishImg ? fishImg : null}
      />
    </div>
  );
}

export default CameraApp;

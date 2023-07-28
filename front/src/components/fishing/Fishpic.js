import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { token } from "../../utils/atoms";

function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [accesstoken, setToken] = useRecoilState(token);
  const header = {
    "Content-Type": "multipart/form-data",
    Authorization: accesstoken,
  };
  const [capturedImageFile, setCapturedImageFile] = useState(null); // 촬영한 사진의 URL을 저장하는 상태 변수
  const [fishImg, setfishImg] = useState("");

  const getCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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
      formData.append("image", imageFile);
      console.log(formData.get("image"));
      // 이미지 데이터를 서버로 전송
      uploadImage(formData);
    }
  };

  const uploadImage = async (formData) => {
    try {
      // 이미지 데이터를 서버로 전송
      const response = await axios.post("/api/fishes/upload", formData, {
        headers: header,
      });

      // 서버로부터 응답을 받고 처리할 로직 추가 가능
      console.log("서버 응답:", response.data);
      setfishImg(response.data);
      // 서버로부터 응답받은 이미지 URL을 저장
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", maxWidth: "400px" }}
        autoPlay
        playsInline
      />
      <button onClick={getCameraStream}>카메라 on</button>
      <button onClick={handleCapturePhoto}>사진 촬영</button>
      <button onClick={stopCamera}>카메라 off</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {capturedImageFile && (
        <div>
          <h2>촬영한 사진</h2>
          {/* Display the captured image using URL.createObjectURL() */}
          <img
            src={URL.createObjectURL(capturedImageFile)}
            alt="Captured Fish"
            style={{ Width: "200px", height: "200px" }}
          />
        </div>
      )}

      {/* 물고기 정보가 있을 때만 표시 */}
      {fishImg && (
        <div>
          <h2>물고기 정보</h2>
          <p>인벤토리 ID: {fishImg.inventoryId}</p>
          <p>물고기 ID: {fishImg.fish.fishId}</p>
          <p>물고기 이름: {fishImg.fish.name}</p>
          <p>물고기 코드: {fishImg.fish.code}</p>
          <p>물고기 정보: {fishImg.fish.info}</p>
          <p>물고기 크기: {fishImg.size}cm</p>
          {/* 물고기 이미지도 표시할 수 있습니다 */}
          {/* <img src={fishImg.fish.imgUrl} alt={fishImg.fish.name} style={{ maxWidth: '200px' }} /> */}
        </div>
      )}
    </div>
  );
}

export default CameraApp;

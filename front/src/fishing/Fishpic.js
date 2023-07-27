import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useRecoilState} from "recoil";
import { token } from "../atoms";

function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [accesstoken, setToken] = useRecoilState(token);
  const header = {Authorization: accesstoken}

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('카메라 접근 오류:', error);
      }
    };

    getCameraStream();
  }, []);

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 캔버스에 현재 비디오 화면 캡처
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캡처한 이미지를 다운로드
      const image = canvas.toDataURL('image/jpg');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'captured_image.jpg';
      link.click();
      const imageData = {image : image}
      uploadImage(imageData);
    }
  };

  const uploadImage = async (imageData) => {
    try {
      // 이미지 데이터를 서버로 전송
      const response = await axios.post('/api/fishes/upload', { imageData }, {headers: header});

      // 서버로부터 응답을 받고 처리할 로직 추가 가능
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '400px' }}
        autoPlay
        playsInline
      />
      <button onClick={handleCapturePhoto}>사진 촬영</button>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default CameraApp;


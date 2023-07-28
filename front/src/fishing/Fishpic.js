// import React, { useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useRecoilState} from "recoil";
// import { token } from "../atoms";

// function CameraApp() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [accesstoken, setToken] = useRecoilState(token);
//   const header = {Authorization: accesstoken}

//   useEffect(() => {
//     const getCameraStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error('카메라 접근 오류:', error);
//       }
//     };

//     getCameraStream();
//   }, []);

//   const handleCapturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       // 캔버스에 현재 비디오 화면 캡처
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // 캡처한 이미지를 다운로드
//       const image = canvas.toDataURL('image/jpg');
//       const link = document.createElement('a');
//       link.href = image;
//       link.download = 'fish.jpg';
//       link.click();
//       const imageData = {'image' : image}
//       // const imageData = image
//       console.log(imageData)
//       uploadImage(imageData);
//     }
//   };

//   const uploadImage = async (imageData) => {
//     try {
//       // 이미지 데이터를 서버로 전송
//       const response = await axios.post('/api/fishes/upload', imageData, {headers: header});

//       // 서버로부터 응답을 받고 처리할 로직 추가 가능
//       console.log('서버 응답:', response.data);
//     } catch (error) {
//       console.error('이미지 업로드 오류:', error);
//     }
//   };

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         style={{ width: '100%', maxWidth: '400px' }}
//         autoPlay
//         playsInline
//       />
//       <button onClick={handleCapturePhoto}>사진 촬영</button>
//       <canvas
//         ref={canvasRef}
//         style={{ display: 'none' }}
//       />
//     </div>
//   );
// }

// export default CameraApp;


// import React, { useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useRecoilState } from "recoil";
// import { token } from "../atoms";

// function CameraApp() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [accesstoken, setToken] = useRecoilState(token);
//   const header = { Authorization: accesstoken };

//   useEffect(() => {
//     const getCameraStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error('카메라 접근 오류:', error);
//       }
//     };

//     getCameraStream();
//   }, []);

//   const handleCapturePhoto = async () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       // 캔버스에 현재 비디오 화면 캡처
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // 캡처한 이미지를 Blob으로 변환
//       const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpg'));

//       // 이미지 파일 생성
//       const imageFile = new File([imageBlob], 'fish.jpg', { type: 'image/jpg' });
//       console.log(imageFile)
//       // 이미지 파일을 FormData에 추가
//       const formData = new FormData();
//       formData.append('image', imageFile);
//       console.log(formData)
//       // 이미지 데이터를 서버로 전송
//       uploadImage(formData);
//     }
//   };

//   const uploadImage = async (formData) => {
//     try {
//       // 이미지 데이터를 서버로 전송
//       const response = await axios.post('/api/fishes/upload', formData, { headers: header });

//       // 서버로부터 응답을 받고 처리할 로직 추가 가능
//       console.log('서버 응답:', response.data);
//     } catch (error) {
//       console.error('이미지 업로드 오류:', error);
//     }
//   };

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         style={{ width: '100%', maxWidth: '400px' }}
//         autoPlay
//         playsInline
//       />
//       <button onClick={handleCapturePhoto}>사진 촬영</button>
//       <canvas
//         ref={canvasRef}
//         style={{ display: 'none' }}
//       />
//     </div>
//   );
// }

// export default CameraApp;


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { token } from "../atoms";

function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [accesstoken, setToken] = useRecoilState(token);
  const header = { "Content-Type": "multipart/form-data", Authorization: accesstoken };
  const [capturedImageURL, setCapturedImageURL] = useState(null); // State to store the captured image URL
  

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

  const handleCapturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 캔버스에 현재 비디오 화면 캡처
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캡처한 이미지를 Blob으로 변환
      const imageBlob = await new Promise(resolve => {
        canvas.toBlob(blob => {
          resolve(blob);
        }, 'image/jpg');
      });

      // 이미지 파일 생성
      const imageFile = new File([imageBlob], 'fish.jpg', { type: 'image/jpg' });
      // 이미지 파일을 FormData에 추가
      const formData = new FormData();
      formData.append('image', imageFile);
      console.log(formData.get('image'));
      // 이미지 데이터를 서버로 전송
      uploadImage(formData);
    }
  };

  const uploadImage = async (formData) => {
    try {
      // 이미지 데이터를 서버로 전송
      const response = await axios.post('/api/fishes/upload', formData, { headers: header });

      // 서버로부터 응답을 받고 처리할 로직 추가 가능
      console.log('서버 응답:', response.data);
      
      // 서버로부터 응답받은 이미지 URL을 저장
      setCapturedImageURL(response.data.url);
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
      {/* 이미지 URL이 있을 때만 이미지를 표시 */}
      {capturedImageURL && (
        <div>
          <h2>캡처한 이미지</h2>
          <img src={capturedImageURL} alt="Captured" style={{ maxWidth: '400px' }} />
        </div>
      )}
    </div>
  );
}

export default CameraApp;

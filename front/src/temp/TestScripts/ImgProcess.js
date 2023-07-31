// import React, { useEffect, useRef, useState } from 'react';
// import * as tmImage from '@teachablemachine/image';

// const ImgProcess = ()=>{
//   const [model, setModel] = useState(null);
//   const [webcam, setWebcam] = useState(null);
//   const [maxPredictions, setMaxPredictions] = useState(0);
//   const labelContainer = useRef(null);

//   useEffect(() => {
//     const modelURL = './my_model/model.json';
//     const metadataURL = './my_model//metadata.json';

//     const init = async () => {
//       const loadedModel = await tmImage.load(modelURL, metadataURL);
//       setModel(loadedModel);
//       setMaxPredictions(loadedModel.getTotalClasses());

//       const flip = true; // 웹캠을 플립(뒤집기) 여부
//       const webcamInstance = new tmImage.Webcam(200, 200, flip); // 웹캠 크기 설정
//       await webcamInstance.setup(); // 웹캠 초기화
//       await webcamInstance.play(); // 웹캠 시작
//       setWebcam(webcamInstance);

//       window.requestAnimationFrame(loop); // 웹캠 이미지 예측을 위한 루프 실행
//     };

//     init(); // Teachable Machine 초기화
//     return () => {
//       // 컴포넌트가 언마운트될 때 웹캠 정리
//       webcam && webcam.stop();
//     };
//   }, [webcam]);

//   const predict = async () => {
//     if (webcam) {
//       const prediction = await model.predict(webcam.canvas);
//       for (let i = 0; i < maxPredictions; i++) {
//         const classPrediction =
//           prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
  
//         // labelContainer.current.childNodes의 길이가 i보다 작으면 해당 인덱스의 요소가 존재하지 않음
//         if (i < labelContainer.current.childNodes.length) {
//           labelContainer.current.childNodes[i].innerHTML = classPrediction;
//         } else {
//           // 해당 인덱스의 요소가 없으면 새로 생성하여 추가
//           const newElement = document.createElement("div");
//           newElement.innerHTML = classPrediction;
//           labelContainer.current.appendChild(newElement);
//         }
//       }
//     }
//   };

//   const loop = async () => {
//     webcam && webcam.update(); // 웹캠 프레임 업데이트
//     await predict(); // 예측 실행
//     window.requestAnimationFrame(loop);
//   };

//   return (
//     <div>
//       <h1>Teachable Machine Image Model</h1>
//       <div id="webcam-container"></div>
//       <div ref={labelContainer} id="label-container">
//         {/* 결과가 여기에 표시됩니다. */}
//       </div>
//     </div>
//   );
// };

// export default ImgProcess;
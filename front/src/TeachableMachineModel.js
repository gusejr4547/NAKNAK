// import React, { useEffect, useRef } from "react";
// import * as tmImage from "@teachablemachine/image";

// const TeachableMachineModel = () => {
//   const webcamRef = useRef(null);
//   const labelContainerRef = useRef(null);
//   let model, maxPredictions;

//   const URL = "./my_model/";
//   const modelURL = URL + "model.json";
//   const metadataURL = URL + "metadata.json";

//   useEffect(() => {
//     // Load the image model
//     async function loadModel() {
//       model = await tmImage.load(modelURL, metadataURL);
//     //   maxPredictions = model.getTotalClasses();
//     }
//     loadModel();
//   }, []);

//   useEffect(() => {
//     // Setup the webcam
//     async function setupWebcam() {
//       const flip = true; // whether to flip the webcam
//       webcamRef.current = new tmImage.Webcam(200, 200, flip); // width, height, flip
//       await webcamRef.current.setup(); // request access to the webcam
//       await webcamRef.current.play();
//       window.requestAnimationFrame(loop);
//     }
//     setupWebcam();
//   }, []);

//   const loop = async () => {
//     webcamRef.current.update(); // update the webcam frame
//     await predict();
//     window.requestAnimationFrame(loop);
//   };

//   const predict = async () => {
//     // predict can take in an image, video or canvas html element
//     const prediction = await model.predict(webcamRef.current.canvas);
//     for (let i = 0; i < maxPredictions; i++) {
//       const classPrediction =
//         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//       labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
//     }
//   };

//   return (
//     <div>
//       <div>Teachable Machine Image Model</div>
//       <button type="button" onClick={init}>
//         Start
//       </button>
//       <div id="webcam-container" ref={webcamRef}></div>
//       <div id="label-container" ref={labelContainerRef}>
//         {Array.from({ length: maxPredictions }, (_, i) => (
//           <div key={i}></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeachableMachineModel;

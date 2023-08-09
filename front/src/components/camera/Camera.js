import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import cv from "@techstark/opencv-js";
import { Tensor, InferenceSession } from "onnxruntime-web";
import Loader from "./components/loader";
import { detectImage } from "./utils/detect";
import { download } from "./utils/download";
import "./style/App.css";

const Camera = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState({
    text: "Loading OpenCV.js",
    progress: null,
  });
  const [image, setImage] = useState(null);
  const inputImage = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const webcamRef = useRef(null); // Reference to the webcam component
  const [detecting, setDetecting] = useState(false); // State to control automatic detection

  // Configs
  const modelName = "best.onnx";
  const modelInputShape = [1, 3, 320, 320];
  const topk = 100;
  const iouThreshold = 0.45;
  const scoreThreshold = 0.25;
  const detectionInterval = 5000;

  // wait until opencv.js initialized
  cv["onRuntimeInitialized"] = async () => {
    const baseModelURL = `${process.env.PUBLIC_URL}/model`;

    // create session
    const arrBufNet = await download(
      `${baseModelURL}/${modelName}`, // url
      ["Loading YOLOv8 Segmentation model", setLoading] // logger
    );
    const yolov8 = await InferenceSession.create(arrBufNet);
    const arrBufNMS = await download(
      `${baseModelURL}/nms-yolov8.onnx`, // url
      ["Loading NMS model", setLoading] // logger
    );
    const nms = await InferenceSession.create(arrBufNMS);

    // warmup main model
    setLoading({ text: "Warming up model...", progress: null });
    const tensor = new Tensor(
      "float32",
      new Float32Array(modelInputShape.reduce((a, b) => a * b)),
      modelInputShape
    );
    await yolov8.run({ images: tensor });

    setSession({ net: yolov8, nms: nms });
    setLoading(null);
  };

  // Function to handle webcam capture
  const captureWebcam = () => {
    if (webcamRef.current) {
      const webcamImage = webcamRef.current.getScreenshot();
      setImage(webcamImage);
    }
  };

  // Function to start automatic detection
  const startDetection = () => {
    setDetecting(true);
  };

  // Function to stop automatic detection
  const stopDetection = () => {
    setDetecting(false);
  };

  useEffect(() => {
    let detectionTimer = null;
    if (detecting) {
      detectionTimer = setInterval(() => {
        captureWebcam(); // Capture webcam image automatically
      }, detectionInterval);
    } else {
      clearInterval(detectionTimer);
    }

    return () => {
      clearInterval(detectionTimer);
    };
  }, [detecting]);

  const handleWebcamError = (error) => {
    console.error("Webcam error:", error);
    // Handle the error here (e.g., display an error message or redirect to a different page)
  };

  return (
    <div className="camera">
      {loading && (
        <Loader>
          {loading.progress
            ? `${loading.text} - ${loading.progress}%`
            : loading.text}
        </Loader>
      )}

      <div className="cameracontent">
        {image ? (
          <img
            ref={imageRef}
            src={image}
            alt=""
            style={{ display: "block" }}
            onLoad={() => {
              detectImage(
                imageRef.current,
                canvasRef.current,
                session,
                topk,
                iouThreshold,
                scoreThreshold,
                modelInputShape
              );
            }}
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment", // or "user" for front-facing camera
            }}
            onUserMediaError={handleWebcamError} // Handle webcam errors
            style={{ display: "block", width: "100%" }}
          />
        )}
        <canvas
          id="canvas"
          width={modelInputShape[2]}
          height={modelInputShape[3]}
          ref={canvasRef}
        />
      </div>

      {image ? (
        <div className="btn-container">
          <button
            className="camerabutton"
            onClick={() => {
              setImage(null);
            }}
          >
            Close image
          </button>
        </div>
      ) : (
        <div className="btn-container">
          {detecting ? (
            <button className="camerabutton" onClick={stopDetection}>
              Stop Detection
            </button>
          ) : (
            <button className="camerabutton" onClick={startDetection}>
              Start Detection
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Camera;

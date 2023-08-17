import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
// import cv from "@techstark/opencv-js";
// import { Tensor, InferenceSession } from "onnxruntime-web";
import Loader from "./components/loader";
import { detectImage } from "./utils/detect";
import "./style/App.css";
// import { initializeCV } from "./utils/initializeCV";
import { useRecoilState } from "recoil";
import {
  yolo_recoil,
  newbie_recoil,
  tts_recoil,
  location_recoil,
  getFish_recoil,
  fishingMode_recoil,
  uploadfish_recoil,
} from "../../utils/atoms";
import upgradeProgress from "../freshman/upgradeProgress";
import { useNavigate } from "react-router-dom";
import Talk2 from "../freshman/Talk2";
import "./Camera.css";
import { authorizedRequest } from "../account/AxiosInterceptor";
import TTS from "../freshman/TTS";
import { GetLocation, callFlutter } from "../../utils/location";
import { div } from "@tensorflow/tfjs";
import Getfish from "./Getfish";

const Camera = () => {
  // useEffect(() => {
  //   if (!sessionStorage.getItem("pageLoaded")) {
  //     sessionStorage.setItem("pageLoaded", "true");
  //     window.location.reload();
  //   }
  //   return () => {
  //     sessionStorage.removeItem("pageLoaded");
  //   };
  // }, []);
  // // 페이지에 처음 접근할 때
  // if (!sessionStorage.getItem("pageLoaded")) {
  //   sessionStorage.setItem("pageLoaded", "true");
  //   window.location.reload();
  // } else {
  //   window.onbeforeunload = () => {
  //     sessionStorage.removeItem("pageLoaded");
  //   };
  // }

  // window.location.replace("/Camera");
  // 뉴비모드
  const [newbie] = useRecoilState(newbie_recoil);
  const [step, setStep] = useState(6);
  const navigate = useNavigate();
  const [tts] = useRecoilState(tts_recoil);
  const [show, setShow] = useState(false);
  const [fishbox, setfishbox] = useState(0);
  const [rulerbox, setrulerbox] = useState({ bounding: [1, 1, 1, 1] });

  // const [session, setSession] = useState(null);
  const [loading, setLoading] = useState({
    text: "Loading OpenCV.js",
    progress: null,
    isStuck: false, // 새로고침 유도 상태 변수
  });
  const talkContents = Talk2();

  const [image, setImage] = useState(null);
  // const inputImage = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const webcamRef = useRef(null); // Reference to the webcam component
  const [detecting, setDetecting] = useState(false); // State to control automatic detection
  const [lastCapturedImage, setLastCapturedImage] = useState(null);
  const [webcamActive, setWebcamActive] = useState(true);
  // const [errData, setErrData] = useState(false);
  const [yoloRecoil] = useRecoilState(yolo_recoil);
  const [location, setLocation] = useRecoilState(location_recoil);
  // Configs
  const [getFish, setGetFish] = useRecoilState(getFish_recoil);
  const [fishingMode] = useRecoilState(fishingMode_recoil);
  const [uploadfish, setUploadfish] = useRecoilState(uploadfish_recoil);

  const modelInputShape = [1, 3, 640, 640];
  const topk = 100;
  const iouThreshold = 0.45;
  const scoreThreshold = 0.25;
  let detectionInterval = 1000;
  // 뉴비 모드일때 시간 길게 수정하기

  if (newbie) {
    detectionInterval = 100000;
  } else {
    detectionInterval = 1000;
  }

  useEffect(() => {
    setTimeout(() => setShow(true), tts);
  }, [tts]);

  useEffect(() => {
    handlebutton();
  }, []);

  const handlebutton = () => {
    if (window.flutter_inappwebview) {
      handleButtonClick();
    } else {
      handleClick();
    }
  };

  async function handleButtonClick() {
    const data = await callFlutter();
    setLocation(data);
    // {latitude: 35.1029935, longitude: 128.8519049}
  }

  // 버튼을 누를 때 호출되는 함수
  function handleClick() {
    (async () => {
      try {
        const locationData = await GetLocation();
        // 위치 데이터를 이용한 추가 작업
        console.log(locationData);
        setLocation(locationData);
        // {latitude: 35.1029935, longitude: 128.8519049}
      } catch (error) {
        // 오류 처리
      }
    })();
  }
  const dataUpload = async () => {
    const data = {
      label: fishbox.label,
      size:
        rulerbox.bounding[2] === 1
          ? 0
          : fishbox.bounding[2] / rulerbox.bounding[2],
      probability: fishbox.probability,
      location: location,
    };
    console.log(data);

    try {
      const response = await authorizedRequest({
        method: "post",
        url: "/api1/api/fishes/catch",
        data: {
          label: fishbox.label,
          size:
            rulerbox.bounding[2] === 1
              ? 0
              : fishbox.bounding[2] / rulerbox.bounding[2],
          probability: fishbox.probability,
          location: location,
        },
      });
      console.log(response.data);
      setUploadfish(response.data);
      console.log(uploadfish);
      setrulerbox({ bounding: [1, 1, 1, 1] });
      setfishbox(0);
      if (fishingMode !== "selectMode") {
        setGetFish(getFish + 1);
        console.log(getFish);
      }
      navigate("/Getfish");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // 뉴비 튜토리얼 업그레이드
  const handleUpgradeProgress = async (status) => {
    try {
      const response = await upgradeProgress(status);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // 뉴비버젼
  const next = () => {
    setShow(false);
    if (step < 8) {
      setStep(step + 1);
    } else {
      handleUpgradeProgress(80);
      navigate("/Checkbox");
    }
  };

  // console.log(cv, 12345);
  useEffect(() => {
    // setSession({ net: yoloRecoil.net, nms: yoloRecoil.nms });
    setLoading(null);
  }, []);
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = ""; // 빈 문자열로 설정하여 브라우저가 경고 메시지를 표시하지 않도록 합니다.
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const captureWebcam = () => {
    if (webcamRef.current && webcamActive) {
      const webcamImage = webcamRef.current.getScreenshot();
      setImage(webcamImage);
      console.log(image);
    }
  };

  // Function to start automatic detection
  const startDetection = () => {
    setDetecting(true);
    setWebcamActive(true);
    setUploadfish({});
    // setLastCapturedImage(undefined)
  };

  // Function to stop automatic detection
  const stopDetection = () => {
    setDetecting(false);
    setWebcamActive(false);
  };
  useEffect(() => {
    startDetection(); // 페이지에 처음 접근할 때 감지 시작
    return () => {
      stopDetection(); // 페이지를 떠날 때 감지 중지
    };
  }, []);

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
  // console.log(session);

  return (
    <div className="camera">
      {/* 뉴비모드 시작 */}
      {newbie && (
        <div className="pic-newbie-talk-box">
          {talkContents[step].content}
          {talkContents[step].content && (
            <TTS message={talkContents[step].content} />
          )}
          <div
            className="next"
            onClick={() => {
              next();
            }}
          >
            다음 &gt;
          </div>
        </div>
      )}
      {/* 뉴비모드 끝 */}
      {loading && (
        <Loader>
          {loading.progress
            ? `${loading.text} - ${loading.progress}%`
            : loading.text}
        </Loader>
      )}

      <div className="cameracontent">
        {lastCapturedImage ? (
          <div
            className="last-captured-image"
            style={{ height: "100%", width: "100%", maxWidth: "800px" }}
          >
            <img
              src={lastCapturedImage}
              alt="Last Captured"
              style={{
                display: "block",
                // transform: "rotate(90deg)",
                height: "100%",
                objectFit: "fill",
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            />
          </div>
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment", // or "user" for front-facing camera
            }}
            onUserMediaError={handleWebcamError} // Handle webcam errors
            style={{
              display: "block",
              // transform: "rotate(90deg)",
              height: "100%",
              objectFit: "fill",
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          />
        )}
        {webcamActive && (
          <img
            src="./assets/icons/border.png"
            className="camera-shape-overlay"
          />
        )}
        {webcamActive && (
          <img
            src="./assets/icons/fire.png"
            className="camera-shape-overlay-fire"
          />
        )}
        <canvas
          id="canvas"
          width={modelInputShape[2]}
          height={modelInputShape[3]}
          ref={canvasRef}
        />
      </div>
      {/* <Detectdata
        imageRef={imageRef.current}
        canvasRef={canvasRef.current}
        session={session}
        topk={topk}
        iouThreshold={iouThreshold}
        scoreThreshold={scoreThreshold}
        modelInputShape={modelInputShape}
      /> */}

      {image && (
        <img
          ref={imageRef}
          src={image}
          alt=""
          style={{
            display: "none",
            // transform: "rotate(90deg)",
            // height: "100%",
            // objectFit: "cover",
            // width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
          }}
          onLoad={() => {
            if ({ net: yoloRecoil.net, nms: yoloRecoil.nms }) {
              // console.log(session);
              detectImage(
                imageRef.current,
                canvasRef.current,
                { net: yoloRecoil.net, nms: yoloRecoil.nms },
                topk,
                iouThreshold,
                scoreThreshold,
                modelInputShape
              )
                .then((boxes) => {
                  if (!boxes) {
                    return;
                  }
                  // boxes 배열 내부의 데이터에 접근하여 활용
                  // 라벨이 라이터인 박스는 라이터 박스
                  if (boxes.length === 2 && boxes[0].label === "라이터") {
                    setrulerbox(boxes[0]);
                    setfishbox(boxes[1]);
                  } else if (
                    boxes.length === 2 &&
                    boxes[1].label === "라이터"
                  ) {
                    setrulerbox(boxes[1]);
                    setfishbox(boxes[0]);
                  } else if (boxes.length === 1) {
                    // return;
                    setfishbox(boxes[0]);
                    setrulerbox({ bounding: [1, 1, 1, 1] });
                  }
                  setTimeout(function () {
                    startDetection();
                    setWebcamActive(true);
                    setLastCapturedImage(null);
                  }, 300000); // 300000 밀리초 (5분) 후에 실행
                  // 라벨이 라이터가 아니면 피쉬 박스
                  console.log(fishbox);
                  console.log(rulerbox);

                  const pro = fishbox.probability * 100; // 검출된 첫 번째 상자의 정보
                  if (pro >= 40) {
                    console.log(123);
                    stopDetection();
                    setLastCapturedImage(image); // 마지막 캡처 이미지 저장
                    // console.log(lastCapturedImage);
                  }
                  // 여기에 원하는 작업 추가
                })
                .catch((error) => {
                  console.error("Error in detectImage:", error);
                });
            }
          }}
        />
      )}
      {/* {lastCapturedImage ? (
        <div className="btn-container">
          <button
            className="camerabutton"
            onClick={() => {
              setLastCapturedImage(null) &&
                detectImage(
                  imageRef.current,
                  canvasRef.current,
                  { net: yoloRecoil.net, nms: yoloRecoil.nms },
                  topk,
                  iouThreshold,
                  scoreThreshold,
                  modelInputShape
                );
            }}
          >
            Close image
          </button>
        </div>
      ) : ( */}
      <div className="camera-btn-container">
        {webcamActive ? (
          <button
            className="camerabutton"
            onClick={() => stopDetection()}
            style={{
              backgroundColor: "#ffe48e",
              color: "black",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: "0.2rem",
            }}
          >
            계측 종료
          </button>
        ) : (
          <button
            className="camerabutton"
            onClick={() =>
              startDetection() &
              setWebcamActive(true) &
              setLastCapturedImage(null)
            }
            style={{
              backgroundColor: "#ffe48e",
              color: "black",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: "0.2rem",
            }}
          >
            계측 시작
          </button>
        )}
      </div>
      {fishbox !== 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            <span
              style={{ color: "red", fontWeight: "bold", fontSize: "2rem" }}
            >
              {fishbox.label}
            </span>{" "}
            포획 성공!!
          </h2>

          <button
            className="camerabutton"
            style={{
              backgroundColor: "#ffe48e",
              color: "black",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: "0.2rem",
            }}
            onClick={() => dataUpload()}
          >
            <span>등록하기</span>
          </button>
        </div>
      )}

      {/* {uploadfish && uploadfish.fish && (
        <div>
          {uploadfish.fish.name}
          {uploadfish.size}
        </div>
      )} */}

      {/* {uploadfish && Object.keys(uploadfish).length > 0 && (
        <Getfish fishdata={uploadfish} />
      )} */}
    </div>
  );
};

export default Camera;

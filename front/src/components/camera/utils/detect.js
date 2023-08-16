import cv from "@techstark/opencv-js";
import { Tensor } from "onnxruntime-web";
import { renderBoxes } from "./renderBox";
import { labelitem } from "./labels";

/**
 * Detect Image
 * @param {HTMLImageElement} image 검출할 이미지
 * @param {HTMLCanvasElement} canvas 박스 그릴 캔버스
 * @param {ort.InferenceSession} session YOLOv8 onnxruntime session
 * @param {Number} topk Integer representing the maximum number of boxes to be selected per class
 * @param {Number} iouThreshold iouThreshold IOU에 따라 상자가 너무 많이 겹치는지를 결정하는 임계값을 나타내는 부동 소수점
 * @param {Number} scoreThreshold scoreThreshold 점수에 따라 상자를 제거할 때의 임계값을 나타내는 부동 소수점
 * @param {Number[]} inputShape inputShape 모델 입력 형태. 일반적으로 YOLO 모델에서 [batch, channels, width, height] 형태
 */
export const detectImage = async (
  image,
  canvas,
  session,
  topk,
  iouThreshold,
  scoreThreshold,
  inputShape
) => {
  // console.log(
  //   image,
  //   "1",
  //   canvas,
  //   "2",
  //   session,
  //   "3",
  //   topk,
  //   "4",
  //   iouThreshold,
  //   "5",
  //   scoreThreshold,
  //   "6",
  //   inputShape
  // );
  const [modelWidth, modelHeight] = inputShape.slice(2);
  // 이미지 전처리를 수행하여 input, xRatio, yRatio를 얻음
  const [input, xRatio, yRatio] = preprocessing(image, modelWidth, modelHeight);
  //모델입력
  const tensor = new Tensor("float32", input.data32F, inputShape); // to ort.Tensor
  const config = new Tensor(
    "float32",
    new Float32Array([
      topk, // topk per class
      iouThreshold, // iou threshold
      scoreThreshold, // score threshold
    ])
  ); // nms config tensor
  // 모델 실행 및 결과 획득
  const { output0 } = await session.net.run({ images: tensor }); // run session and get output layer
  console.log(output0);
  // NMS를 사용하여 박스 필터링
  const { selected } = await session.nms.run({
    detection: output0,
    config: config,
  }); // perform nms and filter boxes
  // console.log(selected.data.length);
  if (!selected.data.length) {
    renderBoxes(canvas, 0);
    return;
  }
  const boxes = [];
  const outputdata = [];
  // looping through output
  for (let idx = 0; idx < selected.dims[1]; idx++) {
    const data = selected.data.slice(
      idx * selected.dims[2],
      (idx + 1) * selected.dims[2]
    ); // get rows
    const box = data.slice(0, 4);
    const scores = data.slice(4); // classes probability scores
    const score = Math.max(...scores); // maximum probability scores
    console.log(score * 100);
    if (score * 100 <= 40) {
      renderBoxes(canvas, 0);
      return;
    }
    const label = scores.indexOf(score); // class id of maximum probability scores
    // console.log(box[0], box[1], box[2], box[3]);
    console.log(label);
    const [x, y, w, h] = [
      (box[0] - 0.5 * box[2]) * xRatio, // upscale left
      (box[1] - 0.5 * box[3]) * yRatio, // upscale top
      box[2] * xRatio, // upscale width
      box[3] * yRatio, // upscale height
    ]; // keep boxes in maxSize range
    // console.log(x, y, w, h);
    // console.log(labelitem[label]);
    boxes.push({
      label: label,
      probability: score,
      bounding: [x, y, w, h], // upscale box
    }); // update boxes to draw later

    outputdata.push({
      label: labelitem[label],
      probability: score,
      bounding: [x, y, w, h], // upscale box
    }); // update boxes to draw later
  }

  renderBoxes(canvas, boxes); // Draw boxes
  input.delete(); // delete unused Mat
  return outputdata;
};

/**
 * Preprocessing image
 * @param {HTMLImageElement} source image source
 * @param {Number} modelWidth model input width
 * @param {Number} modelHeight model input height
 * @return preprocessed image and configs
 */
//  이미지를 모델이 요구하는 형식에 맞게 변환하는 함수
const preprocessing = (source, modelWidth, modelHeight) => {
  // 이미지를 OpenCV.js Mat 객체로 읽어옴
  const mat = cv.imread(source); // read from img tag
  // 이미지를 BGR 형식으로 변환
  const matC3 = new cv.Mat(mat.rows, mat.cols, cv.CV_8UC3); // new image matrix
  cv.cvtColor(mat, matC3, cv.COLOR_RGBA2BGR); // RGBA to BGR

  // padding image to [n x n] dim
  const maxSize = Math.max(matC3.rows, matC3.cols); // get max size from width and height
  const xPad = maxSize - matC3.cols, // set xPadding
    xRatio = maxSize / matC3.cols; // set xRatio
  const yPad = maxSize - matC3.rows, // set yPadding
    yRatio = maxSize / matC3.rows; // set yRatio
  const matPad = new cv.Mat(); // new mat for padded image
  cv.copyMakeBorder(matC3, matPad, 0, yPad, 0, xPad, cv.BORDER_CONSTANT); // padding black

  const input = cv.blobFromImage(
    matPad,
    1 / 255.0, // normalize
    new cv.Size(modelWidth, modelHeight), // resize to model input size
    new cv.Scalar(0, 0, 0),
    true, // swapRB
    false // crop
  ); // preprocessing image matrix

  // release mat opencv
  mat.delete();
  matC3.delete();
  matPad.delete();

  return [input, xRatio, yRatio];
};

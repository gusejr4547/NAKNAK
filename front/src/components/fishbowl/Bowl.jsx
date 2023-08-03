import { Ball } from "./Ball.js";

class Bowl {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.bgImage = new Image();
    this.bgImage.src = "123123123.png"; // 이미지 파일 경로 설정
    this.bgImage.onload = () => {
      window.requestAnimationFrame(this.animate.bind(this));
    };

    this.ball = new Ball(this.stageWidth, this.stageHeight, 50, 1, 1);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    // 이미지를 캔버스에 그리기
    this.ctx.drawImage(this.bgImage, 0, 0, this.stageWidth, this.stageHeight);
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, 1);
  }
}

export default Bowl;

<<<<<<< HEAD
import React, { useEffect } from "react";

export class ImageObject {
  constructor(x, y, imageUrl) {
=======
import React, { useEffect, useState } from "react";
import { authorizedRequest } from "../account/AxiosInterceptor";

export class ImageObject {
  constructor(canvas, x, y, imageUrl) {
    this.canvas = canvas;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageUrl;
    this.size = 100; // 필요에 따라 이미지 크기를 조정하세요
    this.angle = Math.random() * (Math.PI * 2);
<<<<<<< HEAD
    this.power = 1;
=======
    this.power = 0.5;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    this.directionX = this.power * Math.cos(this.angle);
    this.weight = this.power * Math.sin(this.angle);
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
<<<<<<< HEAD
=======
    // 캔버스 내부에 이미지가 나타나도록 x, y 좌표를 제한합니다.
    this.x = Math.max(this.size / 2, Math.min(x, canvas.width - this.size / 2));
    this.y = Math.max(
      this.size / 2,
      Math.min(y, canvas.height - this.size / 2)
    );
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  }

  onTouchStart(event) {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    const distance = Math.sqrt((this.x - touchX) ** 2 + (this.y - touchY) ** 2);

    if (distance <= this.size) {
      this.isDragging = true;
      this.dragOffsetX = this.x - touchX;
      this.dragOffsetY = this.y - touchY;
    }
  }

  onTouchMove(event) {
    if (this.isDragging) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
      this.x = touchX + this.dragOffsetX;
      this.y = touchY + this.dragOffsetY;
    }
  }

  onTouchEnd() {
    this.isDragging = false;
  }

  update(canvas) {
    this.y += this.weight;
    this.x += this.directionX;

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.weight *= -1;
    }
    if (this.x > canvas.width - this.size || this.x - this.size < 0) {
      this.directionX *= -1;
    }
  }

  draw(ctx) {
<<<<<<< HEAD
    ctx.drawImage(
      this.image,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
=======
    ctx.imageSmoothingEnabled = true; // 안티앨리어싱 비활성화
    var rotation = Math.atan2(-this.weight, -this.directionX);
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.directionX > 0) {
      // 이미지가 오른쪽 방향을 향할 때
      ctx.scale(1, -1); // 이미지를 좌우로 반전
      rotation = Math.atan2(this.weight, -this.directionX);
    }

    // if (this.directionY > 0) {
    //   // 이미지가 위쪽 방향을 향할 때
    //   ctx.scale(-1, 1); // 이미지를 좌우로 반전
    // }
    // if (this.directionY < 0) {
    //   // 이미지가 위쪽 방향을 향할 때
    //   ctx.scale(-1, 1); // 이미지를 좌우로 반전
    // }

    ctx.rotate(rotation);
    ctx.drawImage(
      this.image,
      -this.size / 2,
      -this.size / 2,
      this.size,
      this.size
    );
    ctx.restore();
    // ctx.drawImage(
    //   this.image,
    //   this.x - this.size / 2,
    //   this.y - this.size / 2,
    //   this.size,
    //   this.size
    // );
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  }
}

export class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.c =
      "rgba(" +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      ")";
    this.size = 30;
    this.angle = Math.random() * (Math.PI * 2);
    this.power = 1;
    this.directionX = this.power * Math.cos(this.angle);
    this.weight = this.power * Math.sin(this.angle);
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
  }

  onTouchStart(event) {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    const distance = Math.sqrt((this.x - touchX) ** 2 + (this.y - touchY) ** 2);

    if (distance <= this.size) {
      this.isDragging = true;
      this.dragOffsetX = this.x - touchX;
      this.dragOffsetY = this.y - touchY;
    }
  }

  onTouchMove(event) {
    if (this.isDragging) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
      this.x = touchX + this.dragOffsetX;
      this.y = touchY + this.dragOffsetY;
    }
  }

  onTouchEnd() {
    this.isDragging = false;
  }

  update(canvas) {
    this.y += this.weight;
    this.x += this.directionX;
    this.angle = Math.random() * (Math.PI * 2);
    this.power = Math.random() * 10;
    this.directionX = this.power * Math.cos(this.angle);
    this.weight = this.power * Math.sin(this.angle);

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.weight *= -1;
    }
    if (this.x > canvas.width - this.size || this.x - this.size < 0) {
      this.directionX *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

const loadBackgroundImage = (url, canvas, ctx) => {
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = url;
};
const image = new Image();
image.src = "./assets/dom1.png";

<<<<<<< HEAD
const ballSize = 50;

const Balls = () => {
  const onStart = () => {
=======
const Balls = () => {
  const [fishBowlData, setFishBowlData] = useState(undefined);

  const getFishBowl = async () => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: "/api1/api/fishes/fishbowl/view",
      });
      setFishBowlData(response.data);
      console.log(response);
      onStart();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    getFishBowl();
  }, []);

  const onStart = () => {
    if (!fishBowlData) {
      return; // 데이터가 아직 로드되지 않은 경우 일찍 반환
    }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
<<<<<<< HEAD

    let images = []; // 배열 이름을 'images'로 변경
    const imageUrls = [
      "./assets/dom1.png",
      "./assets/dom1.png",
      "./assets/dom1.png",
    ]; // 표시할 이미지 URL을 추가합니다.

    const init = () => {
      for (let i = 0; i < imageUrls.length; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const image = new ImageObject(x, y, imageUrls[i]);
=======
    const imageUrls = [];
    console.log(fishBowlData);
    if (fishBowlData) {
      fishBowlData.forEach((fish) => {
        console.log(fish);
        imageUrls.push(
          `${process.env.REACT_APP_BACKEND_URL}/img/${fish.fishName}.png`
        );
      });
    }
    let images = []; // 배열 이름을 'images'로 변경
    // const imageUrls = [
    //   "./assets/dom1.png",
    //   "./assets/dom1.png",
    //   "./assets/dom1.png",
    // ]; // 표시할 이미지 URL을 추가합니다.

    const init = () => {
      for (let i = 0; i < imageUrls.length; i++) {
        // const x = Math.random() * canvas.width;
        const x = 100 + Math.random() * (canvas.width - 200);
        // const y = Math.random() * canvas.height;
        const y = 100 + Math.random() * (canvas.height - 200);
        const image = new ImageObject(canvas, x, y, imageUrls[i]);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        image.touchstart = image.onTouchStart.bind(image);
        image.touchmove = image.onTouchMove.bind(image);
        image.touchend = image.onTouchEnd.bind(image);
        canvas.addEventListener("touchstart", image.touchstart);
        canvas.addEventListener("touchmove", image.touchmove);
        canvas.addEventListener("touchend", image.touchend);
        images.push(image);
      }
    };

    function animate() {
<<<<<<< HEAD
      loadBackgroundImage("./assets/images/badabada.png", canvas, ctx);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
=======
      // // 캔버스를 하나 더 생성합니다.
      // const offscreenCanvas = document.createElement("canvas");
      // offscreenCanvas.width = canvas.width;
      // offscreenCanvas.height = canvas.height;
      // const offscreenCtx = offscreenCanvas.getContext("2d");

      // // 배경과 이미지를 offscreen 캔버스에 그립니다.
      // loadBackgroundImage(
      //   "./assets/images/badabada.png",
      //   offscreenCanvas,
      //   offscreenCtx
      // );
      // for (let i = 0; i < images.length; i++) {
      //   images[i].update(offscreenCanvas);
      //   images[i].draw(offscreenCtx);
      // }

      // // offscreen 캔버스의 내용을 메인 캔버스에 복사합니다.
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.drawImage(offscreenCanvas, 0, 0);

      // window.addEventListener("resize", function () {
      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      // });
      // requestAnimationFrame(animate);

      // loadBackgroundImage("./assets/images/badabada.png", canvas, ctx);
      // ctx.fillStyle = "rgba(255,255,255,0.5)";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 지우기
      // loadBackgroundImage("./assets/images/badabada.png", canvas, ctx); // 배경화면
      ctx.fillStyle = "rgba(255,255,255,0.5)";
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
      for (let i = 0; i < images.length; i++) {
        images[i].update(canvas);
        images[i].draw(ctx);
      }

      window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
      requestAnimationFrame(animate);
    }
    // let balls = [];
    // const ballNumber = 5;
    // const init = () => {
    //   for (let i = 0; i < ballNumber; i++) {
    //     const ball = new Ball(canvas.width * 0.5, canvas.height * 0.5);
    //     ball.touchstart = ball.onTouchStart.bind(ball);
    //     ball.touchmove = ball.onTouchMove.bind(ball);
    //     ball.touchend = ball.onTouchEnd.bind(ball);
    //     canvas.addEventListener("touchstart", ball.touchstart);
    //     canvas.addEventListener("touchmove", ball.touchmove);
    //     canvas.addEventListener("touchend", ball.touchend);
    //     balls.push(ball);
    //   }
    // };

    // function animate() {
    //   loadBackgroundImage("./assets/images/badabada.png", canvas, ctx);
    //   ctx.fillStyle = "rgba(255,255,255,0.5)";
    //   // ctx.fillRect(0, 0, canvas.width, canvas.height);
    //   for (let i = 0; i < ballNumber; i++) {
    //     balls[i].update(canvas);
    //     balls[i].draw(ctx);
    //   }

    //   window.addEventListener("resize", function () {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //   });
    //   requestAnimationFrame(animate);
    // }

    init();
    animate();
  };

  useEffect(() => {
<<<<<<< HEAD
    onStart();
  }, []);

  return (
    <canvas
      className="h-full rounded-full"
      id="canvas"
      style={{
        height: "95vh",
        width: "100vw",
      }}
    ></canvas>
=======
    if (fishBowlData) {
      onStart();
    }
  }, [fishBowlData]);

  return (
    <div>
      {fishBowlData ? (
        <canvas
          className="h-full rounded-full"
          id="canvas"
          style={{
            width: "90%",
            height: "85%",
            position: "absolute",
            top: "5%",
            left: "5%",
          }}
        />
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  );
};

export default Balls;

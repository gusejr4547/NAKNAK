import React, { useEffect } from "react";

export class ImageObject {
  constructor(x, y, imageUrl) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageUrl;
    this.size = 100; // 필요에 따라 이미지 크기를 조정하세요
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

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.weight *= -1;
    }
    if (this.x > canvas.width - this.size || this.x - this.size < 0) {
      this.directionX *= -1;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
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

const ballSize = 50;

const Balls = () => {
  const onStart = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
      loadBackgroundImage("./assets/images/badabada.png", canvas, ctx);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  );
};

export default Balls;

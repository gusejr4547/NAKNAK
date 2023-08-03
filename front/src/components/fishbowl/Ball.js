export class Ball {
  constructor(stageWidth, stageHeight, radius, speed, block) {
    this.radius = radius;
    this.speed = speed;
    this.angle = Math.random() * 360;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;
    this.checkX = this.radius + Math.random() * (stageWidth - diameter);
    this.checkY = this.radius + Math.random() * (stageHeight - diameter);
    this.checkXYWithBlock =
      block.x - this.radius < this.checkX &&
      this.checkX < block.maxX + this.radius &&
      block.y - this.radius < this.checkY &&
      this.checkY < block.maxY + this.radius;
    this.x = this.checkXYWithBlock ? this.radius : this.checkX;
    this.y = this.checkXYWithBlock ? this.radius : this.checkY;

    this.onMouseDown = this.mousedown.bind(this);
    this.onMouseUp = this.mouseup.bind(this);
    this.onMouseMove = this.mousemove.bind(this);

    // 이미지 로드
    this.image = new Image();
    this.image.src = "dom1.png"; // 이미지 파일 경로를 지정해주세요.

    // 이미지 로드 완료 시 실행될 함수 정의
    this.image.onload = () => {
      this.draw(this.ctx, stageWidth, stageHeight, block);
    };
  }

  draw(ctx, stageWidth, stageHeight, block) {
    // 이미지가 로드되지 않았으면 그리지 않음
    if (!this.image.complete) {
      return;
    }

    window.addEventListener("mousedown", this.onMouseDown);
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);
    this.bounceBlock(block);

    // 이미지 그리기
    ctx.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }
  // constructor(stageWidth, stageHeight, radius, speed, block) {
  //   this.radius = radius;
  //   this.speed = speed;
  //   this.vx = speed;
  //   this.vy = speed;

  //   const diameter = this.radius * 2;
  //   this.checkX = this.radius + Math.random() * (stageWidth - diameter);
  //   this.checkY = this.radius + Math.random() * (stageHeight - diameter);
  //   this.checkXYWithBlock =
  //     block.x - this.radius < this.checkX &&
  //     this.checkX < block.maxX + this.radius &&
  //     block.y - this.radius < this.checkY &&
  //     this.checkY < block.maxY + this.radius;
  //   this.x = this.checkXYWithBlock ? this.radius : this.checkX;
  //   this.y = this.checkXYWithBlock ? this.radius : this.checkY;

  //   this.onMouseDown = this.mousedown.bind(this);
  //   this.onMouseUp = this.mouseup.bind(this);
  //   this.onMouseMove = this.mousemove.bind(this);
  // }

  // draw(ctx, stageWidth, stageHeight, block) {
  //   window.addEventListener("mousedown", this.onMouseDown);
  //   this.x += this.vx;
  //   this.y += this.vy;

  //   this.bounceWindow(stageWidth, stageHeight);
  //   this.bounceBlock(block);

  //   ctx.fillStyle = "yellow";
  //   ctx.beginPath();
  //   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  //   ctx.fill();
  // }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  bounceBlock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(maxX - this.x);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(maxY - this.y);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min === min1) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (min === min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }

  setDirection() {
    this.vxDirection = this.vx < 0 ? -1 : 1;
    this.vyDirection = this.vy < 0 ? -1 : 1;
  }

  mousedown(event) {
    window.removeEventListener("mouseup", this.onMouseUp);
    this.offsetX = event.clientX - this.x;
    this.offsetY = event.clientY - this.y;

    this.setDirection();
    if (
      Math.abs(this.offsetX) <= this.radius &&
      Math.abs(this.offsetY) <= this.radius
    ) {
      window.addEventListener("mousemove", this.onMouseMove);
    }
  }

  mousemove(event) {
    this.x = event.clientX - this.offsetX;
    this.y = event.clientY - this.offsetY;

    this.vx = 0;
    this.vy = 0;
    window.addEventListener("mouseup", this.onMouseUp);
  }

  mouseup() {
    this.vx = this.speed;
    this.vy = this.speed;

    if (this.vxDirection < 0) {
      this.vx *= -1;
    }
    if (this.vyDirection < 0) {
      this.vy *= -1;
    }

    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mousedown", this.onMouseDown);
  }
}

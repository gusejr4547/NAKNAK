import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import fish from "./fishbowl2.png";
import "./SeaScene.css";
import Balls from "./Balls";

const SeaScene = () => {
  const containerRef = useRef();

  useEffect(() => {
    let camera, scene, renderer;
    let isUserInteracting = false,
      onPointerDownMouseX = 0,
      onPointerDownMouseY = 0,
      lon = 90,
      onPointerDownLon = 0,
      lat = 0,
      onPointerDownLat = 0,
      phi = 0,
      theta = 0;

    const init = () => {
      const container = containerRef.current;

      camera = new THREE.PerspectiveCamera(
        120,
        window.innerWidth / window.innerHeight,
        1,
        1100
      );

      scene = new THREE.Scene();

      const geometry = new THREE.SphereGeometry(1100, 60, 40);
      geometry.scale(-1, 1, 1);

      const texture = new THREE.TextureLoader().load(fish);
      texture.encoding = THREE.sRGBEncoding;
      const material = new THREE.MeshBasicMaterial({ map: texture });

      const mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      // renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      container.style.touchAction = "none";
      container.addEventListener("pointerdown", onPointerDown);

      document.addEventListener("wheel", onDocumentMouseWheel);

      window.addEventListener("resize", onWindowResize);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onPointerDown = (event) => {
      if (event.isPrimary === false) return;

      isUserInteracting = true;

      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (event) => {
      if (event.isPrimary === false) return;

      lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
      lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    };

    const onPointerUp = () => {
      if (isUserInteracting === false) return;

      isUserInteracting = false;

      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };

    const onDocumentMouseWheel = (event) => {
      const fov = camera.fov + event.deltaY * 0.05;

      camera.fov = THREE.MathUtils.clamp(fov, 30, 120);

      camera.updateProjectionMatrix();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      update();
    };

    const update = () => {
      if (!isUserInteracting) {
        lon += 0.1;
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);

      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      const container = containerRef.current;
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="seascene-wrapper">
      <div
        ref={containerRef}
        id="bowlcontainer"
        className="Sea"
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "50%",
          height: "85%",
          overflow: "hidden", // 추가: 컨테이너 크기를 넘어가는 부분을 숨깁니다.
          zIndex: -1,
        }}
      >
        {/* <Balls /> */}
      </div>
      <Balls
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 100,
        }}
      />
    </div>
  );
};

export default SeaScene;

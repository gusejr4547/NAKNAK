// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const SeaScene = () => {
//   const containerRef = useRef();

//   useEffect(() => {
//     let camera, scene, renderer, mesh;

//     const container = containerRef.current;

//     const materials = [
//       createMaterial('/assets/images/fishbowl.png'), // 오른쪽
//       createMaterial('assets/images/fishbowl.png'), // 왼쪽
//       createMaterial('/images/fishbowl.png'), // 위쪽
//       createMaterial('images/fishbowl.png'), // 아래쪽
//       createMaterial('fishbowl.png'), // 뒤쪽
//       createMaterial('fishbowl.png'), // 앞쪽
//     ];

//     init();
//     animate();

//     function init() {
//       camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
//       camera.target = new THREE.Vector3();
//       scene = new THREE.Scene();

//       mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 32, 32), materials);
//       mesh.scale.x = -1;
//       scene.add(mesh);

//       const vertices = mesh.geometry.attributes.position;
//       for (let i = 0; i < vertices.count; i++) {
//         const vertex = new THREE.Vector3();
//         vertex.fromBufferAttribute(vertices, i);
//         vertex.normalize();
//         vertex.multiplyScalar(550);
//         vertices.setXYZ(i, vertex.x, vertex.y, vertex.z);
//       }

//       // 조명 설정
//       const light = new THREE.PointLight(0xffffff, 1);
//       light.position.set(0, 0, 500);
//       scene.add(light);

//       // 카메라 위치와 시선 설정
//       camera.position.set(0, 0, 1000);
//       camera.lookAt(scene.position);

//       // 카메라 피직 플레인 설정
//       camera.near = 1;
//       camera.far = 2000;
//       camera.updateProjectionMatrix();

//       renderer = new THREE.WebGLRenderer();
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       container.appendChild(renderer.domElement);

//       window.addEventListener('resize', onWindowResize);
//     }

//     function createMaterial(path) {
//       const textureLoader = new THREE.TextureLoader();
//       const texture = textureLoader.load(path, () => {
//         console.log('Texture loaded:', texture);
//         renderer.render(scene, camera); // 텍스처 로드 후 렌더링
//       });
//       const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

//       return material;
//     }

//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }

//     function animate() {
//       requestAnimationFrame(animate);
//       update();
//     }

//     function update() {
//       const time = Date.now() * 0.00005;
//       const rx = Math.sin(time * 0.7) * 0.2;
//       const ry = Math.sin(time * 0.3) * 0.1;
//       const rz = Math.sin(time * 0.2) * 0.1;

//       camera.position.x += (camera.target.x - camera.position.x) * 0.1;
//       camera.position.y += (camera.target.y - camera.position.y) * 0.1;
//       camera.position.z += (camera.target.z - camera.position.z) * 0.1;

//       camera.lookAt(scene.position);
//       renderer.render(scene, camera);
//     }

//     return () => {
//       container.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>;
// };

// export default SeaScene;

// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import fish from './fishbowl.png';

// const SeaScene = () => {
//   const containerRef = useRef();

//   useEffect(() => {
//     let scene, camera, renderer, sphere;

//     // Scene 생성
//     scene = new THREE.Scene();

//     // Camera 생성
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;

//     // Renderer 생성
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     containerRef.current.appendChild(renderer.domElement);

//     // Sphere 생성
//     // const geometry = new THREE.SphereGeometry(1, 32, 32);
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//     const textureLoader = new THREE.TextureLoader();
//     const materials = [
//       new THREE.MeshLambertMaterial({ map: textureLoader.load(fish) }),
//       new THREE.MeshLambertMaterial({ map: textureLoader.load(fish) }),
//       new THREE.MeshLambertMaterial({ map: textureLoader.load(fish) }),
//       new THREE.MeshLambertMaterial({ map: textureLoader.load(fish) }),
//       new THREE.MeshLambertMaterial({ map: textureLoader.load(fish) }),
//       new THREE.MeshLambertMaterial({ map: textureLoader.load(fish) }),
//     ];

//     sphere = new THREE.Mesh(geometry, materials);
//     scene.add(sphere);

//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(1, 1, 1);
//     scene.add(light);

//     // Animation 함수
//     const animate = () => {
//       requestAnimationFrame(animate);
//       sphere.rotation.x += 0.01;
//       sphere.rotation.y += 0.01;
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Clean-up 함수
//     return () => {
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={containerRef} />;
// };

// export default SeaScene;

// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import fish from "./fishbowl.png";

// const SeaScene = () => {
//   const containerRef = useRef();

//   useEffect(() => {
//     let scene, camera, renderer, sphere, controls;

//     // Scene 생성
//     scene = new THREE.Scene();

//     // Camera 생성
//     camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 0, 1.5); // 카메라 위치를 구의 내부로 이동

//     // Renderer 생성
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     containerRef.current.appendChild(renderer.domElement);

//     // Sphere 생성
//     const geometry = new THREE.SphereGeometry(1, 32, 32);

//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(fish);
//     texture.flipY = false; // 이미지를 수직으로 뒤집음
//     const material = new THREE.MeshLambertMaterial({
//       map: textureLoader.load(fish),
//     });

//     // 이미지 텍스처를 구의 내부를 향하도록 반전
//     // material.map.rotation.x = 1.0;
//     // material.map.rotation.y = 1.0;

//     sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(0, 0, 2);
//     scene.add(light);

//     // 카메라 위치와 구 중앙을 바라보도록 설정
//     // camera.position.set(0, 0, 2);
//     camera.lookAt(scene.position);

//     // OrbitControls 초기화 및 설정
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true; // 부드러운 움직임을 위해 damping 설정
//     controls.dampingFactor = 0.05; // damping 값 설정
//     controls.rotateSpeed = 0.5; // 회전 속도 설정
//     controls.zoomSpeed = 1.2; // 줌 속도 설정
//     controls.enablePan = false; // 패닝 비활성화

//     // Animation 함수
//     const animate = () => {
//       requestAnimationFrame(animate);
//       // sphere.rotation.x += 0.001;
//       controls.update(); // OrbitControls 업데이트
//       sphere.rotation.y += 0.005;
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Clean-up 함수
//     return () => {
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={containerRef} />;
// };

// export default SeaScene;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import fish from "./fishbowl.png";

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
        75,
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

      camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

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
    <div>
      <div
        ref={containerRef}
        id="container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener noreferrer">
          three.js webgl
        </a>{" "}
        - equirectangular panorama demo. photo by{" "}
        <a
          href="http://www.flickr.com/photos/jonragnarsson/2294472375/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jón Ragnarsson
        </a>
        .<br />
        드래그하여 equirectangular 텍스처를 페이지에 끌어오세요.
      </div>
    </div>
  );
};

export default SeaScene;

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import fish from "./fishbowl.png";

// const ThreeJsScene = () => {
//   const containerRef = useRef(null);
//   let camera,
//     scene,
//     renderer,
//     sphere,
//     lon = 0,
//     lat = 0;
//   let animationRequestId = null;

//   function init() {
//     const container = containerRef.current;

//     // Scene 생성
//     scene = new THREE.Scene();

//     // Camera 생성
//     camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       1,
//       1100
//     );
//     camera.target = new THREE.Vector3();

//     // Sphere 생성
//     const geometry = new THREE.SphereGeometry(500, 60, 40);

//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(fish);
//     const material = new THREE.MeshBasicMaterial({ map: texture });

//     sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     // 조명 설정
//     const light = new THREE.PointLight(0xffffff, 1);
//     light.position.set(0, 0, 500);
//     scene.add(light);

//     // Renderer 생성
//     renderer = new THREE.WebGLRenderer();
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);

//     // 이벤트 핸들러 등록
//     container.addEventListener("mousedown", onDocumentMouseDown, false);
//     container.addEventListener("mousemove", onDocumentMouseMove, false);
//     container.addEventListener("mouseup", onDocumentMouseUp, false);
//     container.addEventListener("touchstart", onDocumentTouchStart, false);
//     container.addEventListener("touchmove", onDocumentTouchMove, false);
//     window.addEventListener("resize", onWindowResize, false);
//   }

//   // 클릭(터치) 이벤트 핸들러
//   function onDocumentMouseDown(event) {
//     event.preventDefault();
//     const container = containerRef.current;
//     container.style.cursor = "grabbing";
//     lon = event.clientX;
//     lat = event.clientY;
//     document.addEventListener("mousemove", onDocumentMouseMove, false);
//     document.addEventListener("mouseup", onDocumentMouseUp, false);
//   }

//   function onDocumentMouseMove(event) {
//     const container = containerRef.current;
//     lon -= event.clientX;
//     lat -= event.clientY;
//     container.style.cursor = "grab";
//     camera.position.x = 500 * Math.sin(lon * 0.002);
//     camera.position.y = 500 * Math.sin(lat * 0.002);
//     camera.lookAt(scene.position);
//     renderer.render(scene, camera);
//   }

//   function onDocumentMouseUp() {
//     const container = containerRef.current;
//     container.style.cursor = "grab";
//     document.removeEventListener("mousemove", onDocumentMouseMove, false);
//     document.removeEventListener("mouseup", onDocumentMouseUp, false);
//   }

//   function onDocumentTouchStart(event) {
//     if (event.touches.length === 1) {
//       event.preventDefault();
//       const container = containerRef.current;
//       container.style.cursor = "grabbing";
//       lon = event.touches[0].pageX;
//       lat = event.touches[0].pageY;
//       document.addEventListener("touchmove", onDocumentTouchMove, false);
//       document.addEventListener("touchend", onDocumentTouchEnd, false);
//     }
//   }

//   function onDocumentTouchMove(event) {
//     if (event.touches.length === 1) {
//       event.preventDefault();
//       const container = containerRef.current;
//       lon -= event.touches[0].pageX;
//       lat -= event.touches[0].pageY;
//       container.style.cursor = "grab";
//       camera.position.x = 500 * Math.sin(lon * 0.002);
//       camera.position.y = 500 * Math.sin(lat * 0.002);
//       camera.lookAt(scene.position);
//       renderer.render(scene, camera);
//     }
//   }

//   function onDocumentTouchEnd() {
//     const container = containerRef.current;
//     container.style.cursor = "grab";
//     document.removeEventListener("touchmove", onDocumentTouchMove, false);
//     document.removeEventListener("touchend", onDocumentTouchEnd, false);
//   }

//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }

//   function animate() {
//     renderer.render(scene, camera);
//     animationRequestId = requestAnimationFrame(animate);
//   }

//   useEffect(() => {
//     init();
//     animate();

//     return () => {
//       // Clean up
//       if (animationRequestId !== null) {
//         cancelAnimationFrame(animationRequestId);
//         animationRequestId = null;
//       }
//       renderer.dispose();
//       scene = null;
//       camera = null;
//     };
//   }, []);

//   return (
//     <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
//   );
// };

// export default ThreeJsScene;

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




import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import fish from './fishbowl.png';

const SeaScene = () => {
  const containerRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, sphere;

    // Scene 생성
    scene = new THREE.Scene();

    // Camera 생성
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.z = 5;

    // Renderer 생성
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Sphere 생성
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshLambertMaterial({ map: textureLoader.load(fish) });

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 카메라 위치와 구 중앙을 바라보도록 설정
    camera.position.set(0, 0, 2);
    camera.lookAt(scene.position);

        
    // Animation 함수
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Clean-up 함수
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default SeaScene;

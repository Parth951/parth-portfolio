 import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
 import { OrbitControls } from "https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js";

 const container = document.getElementById("hero-3d");
 if (!container) return;

 let width = container.clientWidth || window.innerWidth;
 let height = container.clientHeight || 420;

 const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
 renderer.setSize(width, height);
 container.appendChild(renderer.domElement);

 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
 camera.position.set(0, 0, 90);

 const controls = new OrbitControls(camera, renderer.domElement);
 controls.enableZoom = false;
 controls.enablePan = false;
 controls.autoRotate = true;
 controls.autoRotateSpeed = 0.6;
 controls.enabled = false; // keep static, but use auto-rotate

 // Starfield
 const starGeometry = new THREE.BufferGeometry();
 const starCount = 1200;
 const positions = new Float32Array(starCount * 3);
 for (let i = 0; i < starCount; i++) {
   const radius = THREE.MathUtils.randFloat(40, 140);
   const theta = THREE.MathUtils.randFloat(0, 2 * Math.PI);
   const phi = THREE.MathUtils.randFloat(0, Math.PI);
   const x = radius * Math.sin(phi) * Math.cos(theta);
   const y = radius * Math.sin(phi) * Math.sin(theta);
   const z = radius * Math.cos(phi);
   positions[i * 3] = x;
   positions[i * 3 + 1] = y;
   positions[i * 3 + 2] = z;
 }
 starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
 const starMaterial = new THREE.PointsMaterial({
   size: 0.9,
   color: 0x88ccff,
   transparent: true,
   opacity: 0.8,
   depthWrite: false,
 });
 const stars = new THREE.Points(starGeometry, starMaterial);
 scene.add(stars);

 // Subtle gradient plane behind content for depth
 const plane = new THREE.Mesh(
   new THREE.PlaneGeometry(400, 300, 1, 1),
   new THREE.MeshBasicMaterial({ color: 0x0b1020, transparent: true, opacity: 0.35 })
 );
 plane.position.z = -20;
 scene.add(plane);

 function onResize() {
   const rect = container.getBoundingClientRect();
   width = rect.width || window.innerWidth;
   height = rect.height || container.parentElement?.clientHeight || 420;
   renderer.setSize(width, height);
   camera.aspect = width / height;
   camera.updateProjectionMatrix();
 }
 window.addEventListener("resize", onResize);
 onResize();

 function animate() {
   requestAnimationFrame(animate);
   stars.rotation.y += 0.0007;
   stars.rotation.x += 0.00025;
   controls.update();
   renderer.render(scene, camera);
 }
 animate();


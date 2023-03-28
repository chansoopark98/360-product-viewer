import * as THREE from "./three.js/three.module.js";
import { OrbitControls } from "./three.js/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(5, 5, 1);
const loader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({ map: loader.load("./img/camera1/1.jpg") });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

let cameraIndex = 1;
let imageIndex = 1;
const totalCameras = 4;
const totalImages = 24;

document.addEventListener("mousedown", (event) => {
  const startX = event.clientX;

  function onMouseMove(event) {
    const deltaX = event.clientX - startX;

    if (deltaX > 10) {
      imageIndex++;
      if (imageIndex > totalImages) imageIndex = 1;
      updateTexture();
      document.removeEventListener("mousemove", onMouseMove);
    } else if (deltaX < -10) {
      imageIndex--;
      if (imageIndex < 1) imageIndex = totalImages;
      updateTexture();
      document.removeEventListener("mousemove", onMouseMove);
    }
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove));
});

document.addEventListener("wheel", (event) => {
  if (event.deltaY < 0) {
    cameraIndex++;
    if (cameraIndex > totalCameras) cameraIndex = 1;
  } else {
    cameraIndex--;
    if (cameraIndex < 1) cameraIndex = totalCameras;
  }
  updateTexture();
});

function updateTexture() {
  material.map = loader.load(`./img/camera${cameraIndex}/${imageIndex}.jpg`);
  material.needsUpdate = true;
}

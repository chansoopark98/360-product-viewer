import * as THREE from "./three.js/three.module.js";
import { OrbitControls } from "./three.js/controls/OrbitControls.js";

const numImages = 36; // Number of images per folder (replace with your value)
const folders = ['camera1', 'camera2', 'camera3', 'camera4'];

let currentFolderIndex = 0;
let currentImageIndex = 0;

const container = document.getElementById('viewer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 60, 40);
geometry.scale(-1, 1, 1); // Invert the geometry on the x-axis to display correctly

const loader = new THREE.TextureLoader();
const materials = folders.map(folder => {
  return Array.from({ length: numImages }, (_, index) => {
    const texture = loader.load(`./img/${folder}/${index+1}.jpg`); // Replace with your image naming pattern
    return new THREE.MeshBasicMaterial({ map: texture });
  });
});

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

const mesh = new THREE.Mesh(geometry, materials[currentFolderIndex][currentImageIndex]);
scene.add(mesh);

camera.position.z = 0.01;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

container.addEventListener('mousedown', (e) => {
  const startX = e.clientX;
  const startY = e.clientY;

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
      currentImageIndex = (currentImageIndex + (dx > 0 ? 1 : -1) + numImages) % numImages;
    } else {
      currentFolderIndex = (currentFolderIndex + (dy > 0 ? 1 : -1) + folders.length) % folders.length;
    }

    mesh.material = materials[currentFolderIndex][currentImageIndex];
  }

  function onMouseUp() {
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('mouseup', onMouseUp);
  }

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseup', onMouseUp);
});

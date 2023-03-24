
import * as THREE from "./three.js/three.module.js";
import { OrbitControls } from "./three.js/controls/OrbitControls.js";

const viewer = document.getElementById("viewer");
const currentImage = document.getElementById("current-image");

const cameras = ['camera1', 'camera2', 'camera3', 'camera4'];
const totalImages = 59; // Replace this with the number of images in each folder (n)

let currentImageIndex = 1;
let currentCameraIndex = 0;

function updateImage() {
  const cameraFolder = cameras[currentCameraIndex];
  console.log(cameraFolder)
  currentImage.src = `./img/${cameraFolder}/${currentImageIndex}.jpg`;
  console.log(currentImage.src)
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// viewer.addEventListener("mousedown", (e) => {
//   console.log('test');
//   e.preventDefault();
//   const startX = e.clientX;
//   const startY = e.clientY;
//   const initialImageIndex = currentImageIndex;
//   const initialCameraIndex = currentCameraIndex;

//   function onMouseMove(e) {
//     const deltaX = e.clientX - startX;
//     const deltaY = e.clientY - startY;
//     currentImageIndex = clamp(Math.round(initialImageIndex + (deltaX / window.innerWidth) * totalImages), 1, totalImages);
//     currentCameraIndex = clamp(Math.round(initialCameraIndex - (deltaY / window.innerHeight) * (cameras.length - 1)), 0, cameras.length - 1);
//     console.log(currentCameraIndex)
//     updateImage();
//   }

//   function onMouseUp() {
//     viewer.removeEventListener("mousemove", onMouseMove);
//     viewer.removeEventListener("mouseup", onMouseUp);
//   }

//   viewer.addEventListener("mousemove", onMouseMove);
//   viewer.addEventListener("mouseup", onMouseUp);
// });

function handleStart(e) {
  e.preventDefault();
  const startX = e.clientX || e.touches[0].clientX;
  const startY = e.clientY || e.touches[0].clientY;
  const initialImageIndex = currentImageIndex;
  const initialCameraIndex = currentCameraIndex;

  function handleMove(e) {
    const deltaX = (e.clientX || e.touches[0].clientX) - startX;
    const deltaY = (e.clientY || e.touches[0].clientY) - startY;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    currentImageIndex = clamp(Math.round(initialImageIndex + (deltaX / viewer.clientWidth) * totalImages), 1, totalImages);
    currentCameraIndex = clamp(Math.round(initialCameraIndex - (deltaY / clientHeight) * (cameras.length - 1)), 0, cameras.length - 1);
    // console.log(window.innerHeight, document.documentElement.clientHeight, viewer.clientWidth, deltaX, deltaY);
    console.log(initialImageIndex + (deltaX / viewer.clientWidth));
    console.log(initialCameraIndex + (deltaY / clientHeight));
    updateImage();
  }

  function handleEnd() {
    viewer.removeEventListener("mousemove", handleMove);
    viewer.removeEventListener("touchmove", handleMove);
    viewer.removeEventListener("mouseup", handleEnd);
    viewer.removeEventListener("touchend", handleEnd);
  }

  viewer.addEventListener("mousemove", handleMove);
  viewer.addEventListener("touchmove", handleMove);
  viewer.addEventListener("mouseup", handleEnd);
  viewer.addEventListener("touchend", handleEnd);
}

viewer.addEventListener("mousedown", handleStart);
viewer.addEventListener("touchstart", handleStart);

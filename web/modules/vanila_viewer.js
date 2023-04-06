import { VideoFrameExtractor } from "./video_extract.js";

const extractor1 = new VideoFrameExtractor('video-input-1');
const extractor2 = new VideoFrameExtractor('video-input-2');
const extractor3 = new VideoFrameExtractor('video-input-3');
const extractor4 = new VideoFrameExtractor('video-input-4');
const videoFrameList = [extractor1.frames, extractor2.frames, extractor3.frames, extractor4.frames];


const viewer = document.getElementById("viewer");
const currentImage = document.getElementById("current-image");

function videoNullCheck(){
  let nullVideoIndex = [];

//   if (videoFrameList[0].length == 0){
//     console.log('Video1 list length is 0');
//     alert('Video 1번이 로드되지 않았습니다.');
//     nullVideoIndex.push(1)
//   }
//   if (videoFrameList[1].length == 0){
//     console.log('Video2 list length is 0')
//     alert('Video 2번이 로드되지 않았습니다.');
//     nullVideoIndex.push(2)
//   }
//   if (videoFrameList[2].length == 0){
//     console.log('Video3 list length is 0')
//     alert('Video 3번이 로드되지 않았습니다.');
//     nullVideoIndex.push(3)
//   }
//   if (videoFrameList[3].length == 0){
//     console.log('Video4 list length is 0')
//     alert('Video 4번이 로드되지 않았습니다.');
//     nullVideoIndex.push(4)
//   }
//   console.log(nullVideoIndex);

  if (nullVideoIndex.length == 0){
    testFunc()
    console.log('start testFunc');
  }
  
}

const videoNullCheckButton = document.getElementById("checkbutton");
videoNullCheckButton.addEventListener('click', videoNullCheck);

// Test
function testFunc(){
    const cameras = ['camera1', 'camera2', 'camera3', 'camera4'];
    
    currentImage.src = URL.createObjectURL(videoFrameList[2][12]);

    console.log(currentImage.src);
    const totalImages = videoFrameList[0].length;

    let currentImageIndex = 1;
    let currentCameraIndex = 0;

    /* Function updateImage */
    function updateImage() {
        currentImage.src = URL.createObjectURL(videoFrameList[currentCameraIndex][currentImageIndex-1]);
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function handleStart(e) {
        e.preventDefault();
        const startX = e.clientX || e.touches[0].clientX;
        const startY = e.clientY || e.touches[0].clientY;
        const initialImageIndex = currentImageIndex;
        const initialCameraIndex = currentCameraIndex;

        function handleMove(e) {
            const deltaX = (e.clientX || e.touches[0].clientX) - startX;
            const deltaY = (e.clientY || e.touches[0].clientY) - startY;

            // currentImageIndex = clamp(Math.round(initialImageIndex + (deltaX / viewer.clientWidth) * totalImages), 1, totalImages);

            currentImageIndex = Math.round(initialImageIndex + (deltaX / viewer.clientWidth) * totalImages);
            currentImageIndex = ((currentImageIndex - 1) % totalImages + totalImages) % totalImages + 1; // Wrap around index

            currentCameraIndex = clamp(Math.round(initialCameraIndex - (deltaY / viewer.clientHeight) * (cameras.length - 1)), 0, cameras.length - 1);
            console.log(currentCameraIndex, currentImageIndex);
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
}


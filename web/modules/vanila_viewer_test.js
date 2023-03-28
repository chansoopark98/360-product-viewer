const viewer = document.getElementById("viewer");
const image = document.getElementById("image");
const cameras = ["camera1", "camera2", "camera3", "camera4"];
const totalImages = 24;
let currentCameraIndex = 1;
let currentImageIndex = 12;

function loadImage() {
    const camera = cameras[currentCameraIndex];
    image.src = `./img/${camera}/${currentImageIndex}.jpg`;
}

function clamp(min, value, max) {
    return Math.min(Math.max(min, value), max);
}

viewer.addEventListener("mousedown", (e) => {
    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;
    
    
    let dragging = true;
    viewer.style.cursor = "grabbing";

    viewer.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const deltaX = (e.clientX || e.touches[0].clientX) - startX;
        const deltaY = (e.clientY || e.touches[0].clientY) - startY;
        
        const indexDeltaX = Math.round(deltaX / 50); // Change this value to adjust horizontal sensitivity
        const indexDeltaY = Math.round(deltaY / 50); // Change this value to adjust vertical sensitivity

        currentCameraIndex = clamp(0, currentCameraIndex - indexDeltaY, cameras.length - 1);
        currentImageIndex = clamp(1, currentImageIndex + indexDeltaX, totalImages);
        console.log(currentCameraIndex);
        console.log(currentImageIndex);
        loadImage();
    });

    viewer.addEventListener("mouseup", () => {
        dragging = false;
        viewer.style.cursor = "grab";
    });

    viewer.addEventListener("mouseleave", () => {
        dragging = false;
        viewer.style.cursor = "grab";
    });
});

loadImage();
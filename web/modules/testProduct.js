let viewer = document.getElementById("viewer");
let productImage = document.getElementById("product-image");

let images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
let currentImageIndex = 0;

productImage.src = 'img/' + images[currentImageIndex];

let currentRotation = 0;

viewer.addEventListener("mousedown", function(event) {
  let startX = event.clientX;
  
  function rotate(event) {
    let newX = event.clientX;
    let difference = newX - startX;
    
    currentRotation -= difference;
    productImage.style.transform = `rotateY(${currentRotation}deg)`;
    
    startX = newX;
    
    if (currentRotation % 360 === 0) {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      productImage.src = 'img/' + images[currentImageIndex];
    }
  }
  
  document.addEventListener("mousemove", rotate);
  
  document.addEventListener("mouseup", function() {
    document.removeEventListener("mousemove", rotate);
  });
});
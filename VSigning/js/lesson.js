 //DOM Elements
 const circles = document.querySelectorAll(".circle"),
 progressBar = document.querySelector(".indicator"),
 buttons = document.querySelectorAll("button");

let currentStep = 0;

// function that updates the current step and updates the DOM
const updateSteps = (e) => {
 ++currentStep;
 circles.forEach((circle, index) => {
   circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
 });
 progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;
 if (currentStep === 6) {
    window.location.href = "section_1.html";
  }
  
};
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

function createPopup(id){
    let Node = document.querySelector(id);
    function openPopup(){
        Node.classList.add("instruct");
    }
    function closePopup(){
        Node.classList.remove("instruct");
    }
    Node.querySelector(".overlay").addEventListener("click", closePopup);
    Node.querySelector('.close-btn').addEventListener("click", closePopup);
    return openPopup;
}
document.querySelector("#open-popup-1").addEventListener("click",createPopup("#popup-1"));
document.querySelector("#open-popup-2").addEventListener("click",createPopup("#popup-2"));
document.querySelector("#open-popup-3").addEventListener("click",createPopup("#popup-3"));
document.querySelector("#open-popup-4").addEventListener("click",createPopup("#popup-4"));
document.querySelector("#open-popup-5").addEventListener("click",createPopup("#popup-5"));
document.querySelector("#open-popup-6").addEventListener("click",createPopup("#popup-6"));

function createVideo(id){
    let Node = document.querySelector(id);
    function openPopup(){
        Node.classList.add("watch");
        document.getElementById('title').innerHTML = 'Video Thực Hành';
        document.getElementById('open-video-1').innerHTML = 'Webcam';
        document.getElementById('open-video-2').innerHTML = 'Webcam';
        document.getElementById('open-video-3').innerHTML = 'Webcam';
        document.getElementById('open-video-4').innerHTML = 'Webcam';
        document.getElementById('open-video-5').innerHTML = 'Webcam';
        document.getElementById('open-video-6').innerHTML = 'Webcam';
    }
    function closePopup(){
        Node.classList.remove("watch");
        Node.classList.remove("instruction");
        document.getElementById('title').innerHTML = 'Hướng Dẫn';
        document.getElementById('open-video-1').innerHTML = 'Video';
        document.getElementById('open-video-2').innerHTML = 'Video';
        document.getElementById('open-video-3').innerHTML = 'Video';
        document.getElementById('open-video-4').innerHTML = 'Video';
        document.getElementById('open-video-5').innerHTML = 'Video';
        document.getElementById('open-video-6').innerHTML = 'Video';
    }
    Node.querySelector(".overlay").addEventListener("click", updateSteps);
    Node.querySelector('.close-btn').addEventListener("click", updateSteps);
    Node.querySelector(".overlay").addEventListener("click", closePopup);
    Node.querySelector('.close-btn').addEventListener("click", closePopup);
    return openPopup;
}
document.querySelector("#open-video-1").addEventListener("click",createVideo("#popup-1"));
document.querySelector("#open-video-2").addEventListener("click",createVideo("#popup-2"));
document.querySelector("#open-video-3").addEventListener("click",createVideo("#popup-3"));
document.querySelector("#open-video-4").addEventListener("click",createVideo("#popup-4"));
document.querySelector("#open-video-5").addEventListener("click",createVideo("#popup-5"));
document.querySelector("#open-video-6").addEventListener("click",createVideo("#popup-6"));
//Top menu - slider 1
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

function moveTopSlider(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  updateTopSlider();
}

function updateTopSlider() {
  const slider = document.querySelector('.slider');
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function autoPlay() {
  slideInterval = setInterval(() => {
    moveTopSlider(1);
  }, 3000);
}

autoPlay();

document.querySelector('.prev').addEventListener('click', () => {
  clearInterval(slideInterval);
  moveTopSlider(-1);
  autoPlay();
});

document.querySelector('.next').addEventListener('click', () => {
  clearInterval(slideInterval);
  moveTopSlider(1);
  autoPlay();
});
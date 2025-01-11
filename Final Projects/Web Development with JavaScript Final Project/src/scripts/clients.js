// Clients - slider 2 and their data fetch
let currentSlide = 0;
let clientSlideInterval;

fetch('../../data.json')
    .then(response => response.json())
    .then(data => {
        const sliderWrapper = document.getElementById('slider-wrapper');
        data.clients.forEach(client => {
            const slide = document.createElement('div');
            slide.classList.add('clients__slider-item');
            
            slide.innerHTML = `
                <img src="${client.image}" alt="${client.name}">
                <p>"${client.testimonial}"</p>
                <h4>${client.name}</h4>
            `;
            
            sliderWrapper.appendChild(slide);
        });
        autoPlayClientsSlider();
    })
    .catch(error => console.error('Error loading the data:', error));

function moveClientsSlider(direction) {
    const slides = document.querySelectorAll('.clients__slider-item');
    const totalSlides = slides.length;
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    const sliderWrapper = document.querySelector('.clients__slider-wrapper');
    const offset = -currentSlide * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
}

function autoPlayClientsSlider() {
  clientSlideInterval = setInterval(() => {
      moveClientsSlider(1);
  }, 3000);
}

document.querySelector('.clients__prev').addEventListener('click', () => {
  clearInterval(clientSlideInterval);
  moveClientsSlider(-1); 
  autoPlayClientsSlider();
});

document.querySelector('.clients__next').addEventListener('click', () => {
  clearInterval(clientSlideInterval);
  moveClientsSlider(1);
  autoPlayClientsSlider();
});
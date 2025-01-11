//packages.html tours sort
document.addEventListener('DOMContentLoaded', () => {
    const sortBySelect = document.getElementById('sort-by');
    let toursData = [];
  
    // Fetch data from the JSON file
    fetch('../../data.json')
      .then(response => response.json())
      .then(data => {
        toursData = data.tours;
        renderTours(toursData);
      })
      .catch(error => console.error('Error loading data:', error));
  
    // Render tours to the page
    function renderTours(tours) {
      const tourList = document.getElementById('tour-list');
      tourList.innerHTML = ''; // Clear the existing list
  
      tours.forEach(tour => {
        const tourItem = document.createElement('div');
        tourItem.classList.add('tour-item');
        
        tourItem.innerHTML = `
          <img src="${tour.image}" alt="${tour.name} Image">
          <h3>${tour.name}</h3>
          <p>Duration: ${tour.duration} days</p>
          <p class="price">$${tour.price}</p>
          <p class="date">Start Date: ${tour.date}</p>
          <p class="reviews">Rating: ${'⭐'.repeat(tour.reviews)}</p>
          <button class="book-now">Book Now</button>
        `;
        
        tourList.appendChild(tourItem);
      });
    }
  
    // Sort the tours based on selected criteria
    function sortTours(criteria) {
      let sortedTours;
      switch (criteria) {
        case 'name-asc':
          sortedTours = toursData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          sortedTours = toursData.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'duration-asc':
          sortedTours = toursData.sort((a, b) => a.duration - b.duration);
          break;
        case 'duration-desc':
          sortedTours = toursData.sort((a, b) => b.duration - a.duration);
          break;
        case 'price-asc':
          sortedTours = toursData.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sortedTours = toursData.sort((a, b) => b.price - a.price);
          break;
        case 'reviews-asc':
          sortedTours = toursData.sort((a, b) => a.reviews - b.reviews);
          break;
        case 'reviews-desc':
          sortedTours = toursData.sort((a, b) => b.reviews - a.reviews);
          break;
        default:
          sortedTours = toursData;
      }
      renderTours(sortedTours);
    }
  
    // Event listener for sorting
    sortBySelect.addEventListener('change', (event) => {
      const selectedSort = event.target.value;
      sortTours(selectedSort);
    });
  });  
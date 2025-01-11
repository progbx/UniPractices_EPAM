//import navbar.html and footer.html with fetch
async function loadHTML() {
  try {
      // Fetch the navbar first
      const navbarResponse = await fetch('navbar.html');
      const navbarHTML = await navbarResponse.text();
      document.getElementById('header__nav').innerHTML = navbarHTML;

      // Fetch the footer next
      const footerResponse = await fetch('footer.html');
      const footerHTML = await footerResponse.text();
      document.getElementById('footer__block').innerHTML = footerHTML;

      const burgerIcon = document.getElementById('burgerIcon');
      const mobileMenu = document.getElementById('mobileMenu');
      const closeBtn = document.getElementById('closebtn');
  
      //burger menu script
      if (burgerIcon) {
        burgerIcon.addEventListener('click', function () {
          mobileMenu.style.display = 'block';
        });
      }
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          mobileMenu.style.display = 'none';
        });
      }
  } catch (error) {
      console.error('Error loading HTML:', error);
  }
}
loadHTML();
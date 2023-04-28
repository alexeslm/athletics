const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger_active');
});

document.body.addEventListener('click', (event) => {
  if (!event.target.closest('.hamburger') && event.target !== mobileMenu) {
    hamburger.classList.remove('hamburger_active');
  }
})
import Swiper, {Navigation} from "swiper";
import 'swiper/css';

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger_active');
});

document.body.addEventListener('click', (event) => {
  if (!event.target.closest('.hamburger') && event.target !== mobileMenu) {
    hamburger.classList.remove('hamburger_active');
  }
});

const brandsSwiper = new Swiper('.brands .swiper', {
  modules: [Navigation],
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 7,
  navigation: {
    nextEl: ".brands__navigation .swiper-button-next",
    prevEl: ".brands__navigation .swiper-button-prev"
  }
});

const articlesSwiper = new Swiper('.articles .swiper', {
  modules: [Navigation],
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 32,
  navigation: {
    nextEl: ".articles__navigation .swiper-button-next",
    prevEl: ".articles__navigation .swiper-button-prev"
  }
});
import Swiper, {Navigation} from "swiper";
import 'swiper/css';
import scrollSpy from 'simple-scrollspy'

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger_active');
});

document.body.addEventListener('click', (event) => {
  if (!event.target.closest('.hamburger') && event.target !== mobileMenu) {
    hamburger.classList.remove('hamburger_active');
  }
});

scrollSpy('#sidebar-nav', {
  sectionClass: '.scrollspy',
  menuActiveTarget: '.sidebar__link',
  activeClass: 'sidebar__link_active',
  offset: 200,
})

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

const newsSwiper = new Swiper('.news .swiper', {
  modules: [Navigation],
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 32,
  navigation: {
    nextEl: ".news__navigation .swiper-button-next",
    prevEl: ".news__navigation .swiper-button-prev"
  }
});


ymaps.ready(init);
let myMap;

function init() {

  myMap = new ymaps.Map("map", {
    center: [43.238253, 76.945465], // Координаты центра карты
    zoom: 13 // Маштаб карты
  });

  myMap.controls.add(
    new ymaps.control.ZoomControl()  // Добавление элемента управления картой
  );

  myPlacemark = new ymaps.Placemark([43.238253, 76.945465], { // Координаты метки объекта
    balloonContent: "<div class='ya_map'>Заезжайте в гости!</div>" // Подсказка метки
  }, {
    preset: "twirl#redDotIcon" // Тип метки
  });

  myMap.geoObjects.add(myPlacemark); // Добавление метки
  myPlacemark.balloon.open(); // Открытие подсказки метки

};
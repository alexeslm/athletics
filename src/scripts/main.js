import Swiper, {Navigation} from "swiper";
import 'swiper/css';
import scrollSpy from 'simple-scrollspy'

const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');
const main = document.querySelector('main');
const scrollbarWidth = getScrollbarWidth();

const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger_active');
  menu.classList.toggle('menu_active');
  document.body.classList.toggle('popup-open');
  if (document.body.classList.contains('popup-open')) {
    header.style.paddingRight = (parseFloat(window.getComputedStyle(header).paddingRight) + scrollbarWidth) + 'px';
    main.style.paddingRight = (parseFloat(window.getComputedStyle(main).paddingRight) + scrollbarWidth) + 'px';
  } else {
    header.style.paddingRight = (parseFloat(window.getComputedStyle(header).paddingRight) - scrollbarWidth) + 'px';
    main.style.paddingRight = (parseFloat(window.getComputedStyle(main).paddingRight) - scrollbarWidth) + 'px';
  }
});

/*document.body.addEventListener('click', (event) => {
  if (!event.target.closest('.hamburger') && event.target !== mobileMenu) {
    hamburger.classList.remove('hamburger_active');
  }
});*/

window.addEventListener('scroll', () => {
  if (window.scrollY >= 900) {
    sidebar.classList.add('sidebar_affix');
  } else {
    sidebar.classList.remove('sidebar_affix')
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

  let myPlacemark = new ymaps.Placemark([43.238253, 76.945465], { // Координаты метки объекта
    balloonContent: "<div class='ya_map'>Заезжайте в гости!</div>" // Подсказка метки
  }, {
    preset: "twirl#redDotIcon" // Тип метки
  });

  myMap.geoObjects.add(myPlacemark); // Добавление метки
  myPlacemark.balloon.open(); // Открытие подсказки метки

};
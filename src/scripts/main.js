import Swiper, {Navigation, Pagination, Thumbs} from "swiper";
import 'swiper/scss';
import 'swiper/scss/pagination'
import scrollSpy from 'simple-scrollspy';
import MicroModal from "micromodal";

const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

const searchWindow = document.querySelector('.search');
const searchButton = document.querySelector('.glass');
const searchIcon = document.querySelector('.glass__icon');
searchButton.addEventListener('click', () => {
  searchIcon.classList.toggle('glass__icon_close');
  searchWindow.classList.toggle('search_active');
  document.body.classList.toggle('popup-open');
  if (document.body.classList.contains('popup-open')) {
    header.style.paddingRight = (parseFloat(window.getComputedStyle(header).paddingRight) + scrollbarWidth) + 'px';
    main.style.paddingRight = (parseFloat(window.getComputedStyle(main).paddingRight) + scrollbarWidth) + 'px';
  } else {
    header.style.paddingRight = (parseFloat(window.getComputedStyle(header).paddingRight) - scrollbarWidth) + 'px';
    main.style.paddingRight = (parseFloat(window.getComputedStyle(main).paddingRight) - scrollbarWidth) + 'px';
  }
})

const hamburgersList = document.querySelectorAll('.hamburger');
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');
const main = document.querySelector('main');
const scrollbarWidth = getScrollbarWidth();
const headerMain = document.querySelector('.header_main');
const sidebar = document.querySelector('.sidebar');

hamburgersList.forEach((hamburger) => {
  hamburger.addEventListener('click', () => {
    hamburgersList.forEach(item => {
      item.classList.toggle('hamburger_active');
    })
    menu.classList.toggle('menu_active');
    document.body.classList.toggle('popup-open');
    headerMain.classList.toggle('header_fix');
    if (document.body.classList.contains('popup-open')) {
      header.style.paddingRight = (parseFloat(window.getComputedStyle(header).paddingRight) + scrollbarWidth) + 'px';
      main.style.paddingRight = (parseFloat(window.getComputedStyle(main).paddingRight) + scrollbarWidth) + 'px';
    } else {
      header.style.paddingRight = (parseFloat(window.getComputedStyle(header).paddingRight) - scrollbarWidth) + 'px';
      main.style.paddingRight = (parseFloat(window.getComputedStyle(main).paddingRight) - scrollbarWidth) + 'px';
    }
  });
});

const menuLinkArrow = document.querySelectorAll('.menu__link-arrow');
const listOfSubMenu = document.querySelectorAll('.menu__sub-list');
const menuBack = document.querySelector('.menu__back');
menuLinkArrow.forEach((arrow) => {
  arrow.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentMenuLink = evt.currentTarget.closest('.menu__link');
    const currentMenuSubList = currentMenuLink.nextElementSibling;
    listOfSubMenu.forEach(subMenu => subMenu.classList.remove('menu__sub-list_active'));
    currentMenuSubList.classList.add('menu__sub-list_active');
    const allSubList = document.querySelectorAll('.menu__sub-list');
    for (const item of allSubList) {
      if (item.classList.contains('menu__sub-list_active')) {
        menuBack.classList.add('menu__back_active');
        break;
      } else {
        menuBack.classList.remove('menu__back_active');
      }
    }
  })
});

menuBack.addEventListener('click', (evt) => {
  evt.preventDefault();
  listOfSubMenu.forEach(subMenu => subMenu.classList.remove('menu__sub-list_active'));
  const allSubList = document.querySelectorAll('.menu__sub-list');
  for (const item of allSubList) {
    if (item.classList.contains('menu__sub-list_active')) {
      menuBack.classList.add('menu__back_active');
      break;
    } else {
      menuBack.classList.remove('menu__back_active');
    }
  }
})



const buttonQuestion = document.querySelector('#button-question');
if (buttonQuestion) {
  buttonQuestion.addEventListener('click', () => {
    MicroModal.show('modal-question', {
      disableScroll: true,
      disableFocus: true,
    });
  })
}

if (sidebar) {
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
    offset: -500,
  })
}


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
  spaceBetween: 12,
  navigation: {
    nextEl: ".articles__navigation .swiper-button-next",
    prevEl: ".articles__navigation .swiper-button-prev"
  },
  breakpoints: {
    520: {
      spaceBetween: 32
    },
  },
});

const newsSwiper = new Swiper('.news .swiper', {
  modules: [Navigation],
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 12,
  navigation: {
    nextEl: ".news__navigation .swiper-button-next",
    prevEl: ".news__navigation .swiper-button-prev"
  },
  breakpoints: {
    520: {
      spaceBetween: 32
    },
  },
});




// *********************************************************************************************************************
const figure = document.querySelector('.figure');
if (figure) {
  figure.addEventListener('mouseover', (evt) => {
    if (evt.target.classList.contains('figure__link')) {
      const dataType = evt.target.dataset.type;
      const catalogLink = document.querySelector(`.catalog__link[data-type="${dataType}"]`);
      if (catalogLink) {
        catalogLink.classList.add('catalog__link_active');
      }
    }
  })

  figure.addEventListener('mouseout', (evt) => {
    if (evt.target.classList.contains('figure__link')) {
      const dataType = evt.target.dataset.type;
      const catalogLink = document.querySelector(`.catalog__link[data-type="${dataType}"]`);
      if (catalogLink) {
        catalogLink.classList.remove('catalog__link_active');
      }
    }
  })
}

//**********************************************************************************************************************


// *********************************************************************************************************************
const catalogLists = document.querySelectorAll('.catalog__list');
catalogLists.forEach((catalog) => {

  catalog.addEventListener('mouseover', (evt) => {
    if (evt.target.classList.contains('catalog__link')) {
      const dataType = evt.target.dataset.type;
      const figureLink = document.querySelector(`.figure__link[data-type="${dataType}"]`);
      if (figureLink) {
        figureLink.classList.add('figure__link_active');
      }
    }
  })

  catalog.addEventListener('mouseout', (evt) => {
    if (evt.target.classList.contains('catalog__link')) {
      const dataType = evt.target.dataset.type;
      const figureLink = document.querySelector(`.figure__link[data-type="${dataType}"]`);
      if (figureLink) {
        figureLink.classList.remove('figure__link_active');
      }
    }
  })

})



//**********************************************************************************************************************



if (document.querySelector('#map')) {
  ymaps.ready(init);
  let myMap;

  function init() {
    myMap = new ymaps.Map("map", {
      center: [59.896526, 30.285236],
      zoom: 15
    });
    myMap.controls.add(
        new ymaps.control.ZoomControl()
    );

    let myPlacemark = new ymaps.Placemark([59.896526, 30.285236], {

    }, {
      iconLayout: "default#image",
      iconImageHref: "/src/images/map/label.svg",
      iconImageSize: [80, 80],
    });

    myMap.geoObjects.add(myPlacemark);
  }
}






const productSwiperThumb = new Swiper(".product__swiper-thumb", {
  grabCursor: true,
  slidesPerView: 4,
  spaceBetween: 10,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});

const productSwiper = new Swiper(".product__swiper", {
  modules: [Navigation, Pagination, Thumbs],
  grabCursor: true,
  thumbs: {
    swiper: productSwiperThumb,
  },
  navigation: {
    nextEl: ".product__swiper .swiper-button-next",
    prevEl: ".product__swiper .swiper-button-prev",
  },
  pagination: {
    el: '.product .swiper-pagination',
    type: 'bullets',
  },

});
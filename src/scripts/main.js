import Swiper, {Navigation, Pagination, Thumbs} from "swiper";
import 'swiper/scss';
import 'swiper/scss/pagination'
import MicroModal from "micromodal";
import UIkit from 'uikit';

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

UIkit.toggle(hamburger, {
    target: '.menu',
    cls: 'menu_active',
    animation: 'uk-animation-fade',
    duration: 400
});

UIkit.modal('.menu', {

});

UIkit.util.on(menu, 'beforeshow', function () {
    menu.style.visibility = 'visible';
    hamburger.classList.add('hamburger_active');
});

UIkit.util.on(menu, 'beforehide', function () {
    hamburger.classList.remove('hamburger_active');
    setTimeout(() => {
        menu.style.visibility = 'hidden';
    }, 500);
});

const searchWindow = document.querySelector('.search');
const searchButton = document.querySelector('.glass');
const searchIcon = document.querySelector('.glass__icon');


UIkit.toggle(searchButton, {
    target: searchWindow,
    animation: 'uk-animation-fade',
    duration: 400
});

UIkit.modal(searchWindow, {

});

UIkit.util.on(searchWindow, 'beforeshow', function () {
    searchWindow.style.visibility = 'visible';
    searchIcon.classList.add('glass__icon_close');
});

UIkit.util.on(searchWindow, 'beforehide', function () {
    searchIcon.classList.remove('glass__icon_close');
    setTimeout(() => {
        searchWindow.style.visibility = 'hidden';
    }, 500);
});

UIkit.sticky('.header_main', {
    start: '.banner',
    clsActive: 'header_in',
    animation: 'uk-animation-slide-top',
    media: 520
});

UIkit.sticky('.sidebar', {
    start: '.banner',
    clsActive: 'sidebar_affix',
    animation: 'uk-animation-slide-left',
    media: 1680
});



const menuLinkArrow = document.querySelector('.menu__link-arrow');
const listOfSubMenu = document.querySelectorAll('.menu__sub-list');
const menuBack = document.querySelector('.menu__back');
menuLinkArrow.addEventListener('click', (evt) => {
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

        let myPlacemark = new ymaps.Placemark([59.896526, 30.285236], {}, {
            iconLayout: "default#image",
            iconImageHref: "/src/images/map/label.svg",
            iconImageSize: [80, 80],
        });

        myMap.geoObjects.add(myPlacemark);
    }
}


const productSwiperThumb = new Swiper(".product__swiper-thumb", {
    grabCursor: true,
    slidesPerView: 3,
    spaceBetween: 12,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
        520: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
    }
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
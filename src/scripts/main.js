import Swiper, {Navigation, Pagination, Thumbs} from "swiper";
import 'swiper/scss';
import 'swiper/scss/pagination';

import MicroModal from "micromodal";

import UIkit from 'uikit';

import noUiSlider from 'nouislider';

/**********************************************************************************************************************/
const priceRangeSlider = document.getElementById('priceRangeSlider');
const priceStart = document.getElementById('priceStart');
const priceEnd = document.getElementById('priceEnd');

if (priceRangeSlider) {
    noUiSlider.create(priceRangeSlider, {
        start: [priceStart.value, priceEnd.value],
        connect: true,
        range: {
            'min': parseInt(priceStart.min),
            'max': parseInt(priceStart.max)
        }
    });

    priceRangeSlider.noUiSlider.on('update', function (values, handle) {
        const value = values[handle];
        if (handle) {
            priceEnd.value = Math.round(value);
        } else {
            priceStart.value = Math.round(value);
        }
    });

    priceStart.addEventListener('change', function () {
        priceRangeSlider.noUiSlider.set([this.value, null,]);
    });

    priceEnd.addEventListener('change', function () {
        priceRangeSlider.noUiSlider.set([null, this.value]);
    });
}

/**********************************************************************************************************************/


const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

UIkit.toggle(hamburger, {
    target: '.menu',
    cls: 'menu_active',
    animation: 'uk-animation-fade',
    duration: 400
});

UIkit.modal('.menu', {});

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

UIkit.modal(searchWindow, {});

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
});

UIkit.sticky('.sidebar', {
    start: '.banner',
    clsActive: 'sidebar_affix',
    animation: 'uk-animation-slide-left',
    media: 1680
});

UIkit.sticky('.sidebar__inner', {});


// *********************************************************************************************************************
const employeesPageSelect = document.querySelector('.employees-page__select');
const employeesPageFilter = document.querySelector('.employees-page__filter');
const employeesPageFilterButton = document.querySelector('.employees-page__filter .button-select');

UIkit.dropdown(employeesPageSelect, {
    toggle: employeesPageFilterButton,
    offset: -1,
    mode: 'click',
});

UIkit.filter(employeesPageFilter, {
    target: '.employees-page__contact-list',
});

UIkit.util.on(employeesPageFilter, 'beforeFilter', function () {
    UIkit.dropdown(employeesPageSelect).hide(0);
});

UIkit.util.on(employeesPageFilter, 'afterFilter', function () {
    employeesPageFilterButton.textContent = employeesPageSelect.querySelector('.uk-active a').textContent;
});
// *********************************************************************************************************************


/**********************************************************************************************************************/
const filterDrop = document.querySelectorAll('.filter__drop');
const normalMediaQuery = window.matchMedia('(max-width: 1199px)');

const filterDropButtonsList = document.querySelectorAll('.filter__drop-button');
filterDropButtonsList.forEach( button => {
    button.addEventListener('click', () => {
        button.classList.toggle('filter__drop-button_active');
    })
});

function listener(matches) {
    if (!matches) {
        UIkit.accordion('.filter__form').$destroy();
        document.querySelector('.filter__form').classList.remove('uk-accordion');

        filterDrop.forEach( filter => {
            UIkit.dropdown(filter, {
                toggle: filter.previousElementSibling,
                offset: 40,
                mode: 'click',
                shift: false,
                flip: false,
                pos: 'bottom-center',
            });
            UIkit.util.on(filter, 'beforeshow', function () {
                filter.previousElementSibling.classList.add('filter__drop-button_active');
            });
            UIkit.util.on(filter, 'beforehide', function () {
                filter.previousElementSibling.classList.remove('filter__drop-button_active');
            });
        })

    } else {
        MicroModal.init({
            disableScroll: true,
        });

        filterDrop.forEach(filter => {
            UIkit.dropdown(filter).$destroy();
            filter.classList.remove('uk-drop', 'uk-dropdown')
        });

        UIkit.accordion('.filter__form', {
            toggle: '.filter__drop-button',
            targets: '.filter__item_mobile',
            content: '.filter__drop',
            multiple: true
        });
    }
}

if (document.querySelector('.filter__form')) {
    normalMediaQuery.addEventListener('change', evt => listener(evt.matches));
    listener(normalMediaQuery.matches);
}

const filterResetList = document.querySelectorAll('.filter__drop-reset');
filterResetList.forEach(reset => {
    reset.addEventListener('click', (evt) => {
        evt.preventDefault();
        const inputsList = reset.closest('.filter__drop').querySelectorAll('input');
        inputsList.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.type === 'number') {
                priceRangeSlider.noUiSlider.reset();
            }
        })
    })
})
/**********************************************************************************************************************/


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


new Swiper('.brands .swiper', {
    modules: [Navigation],
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 7,
    navigation: {
        nextEl: ".brands__navigation .swiper-button-next",
        prevEl: ".brands__navigation .swiper-button-prev"
    }
});

new Swiper('.articles .swiper', {
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

new Swiper('.news .swiper', {
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

new Swiper(".product__swiper", {
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

new Swiper('.company-page__employees .swiper', {
    modules: [Navigation, Pagination],
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 12,
    navigation: {
        nextEl: ".company-page__employees .swiper-button-next",
        prevEl: ".company-page__employees .swiper-button-prev"
    },
    pagination: {
        el: '.company-page__employees .swiper-pagination',
        type: 'bullets',
    },
    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 32
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 32
        },
        520: {
            slidesPerView: 2,
            spaceBetween: 32
        }
    },
});

new Swiper('.company-page__reviews .swiper', {
    modules: [Navigation, Pagination],
    loop: false,
    navigation: {
        nextEl: ".company-page__reviews .swiper-button-next",
        prevEl: ".company-page__reviews .swiper-button-prev"
    },
    pagination: {
        el: '.company-page__reviews .swiper-pagination',
        type: 'bullets',
    },
    breakpoints: {
        992: {
            slidesPerView: 2,
            spaceBetween: 70
        },
    },
});

new Swiper(".career-page__slider .swiper", {
    modules: [Navigation, Pagination],
    navigation: {
        nextEl: ".career-page__slider .swiper-button-next",
        prevEl: ".career-page__slider .swiper-button-prev",
    },
    pagination: {
        el: '.career-page__slider .swiper-pagination',
        type: 'bullets',
    },
});

new Swiper('.franchise__certificates .swiper', {
    modules: [Navigation, Pagination],
    loop: false,
    navigation: {
        nextEl: ".franchise__certificates .swiper-button-next",
        prevEl: ".franchise__certificates .swiper-button-prev"
    },
    pagination: {
        el: '.franchise__certificates .swiper-pagination',
        type: 'bullets',
    },
    breakpoints: {
        992: {
            slidesPerView: 5,
            spaceBetween: 10
        },
    },
});

/**********************************************************************************************************************/
const setRangeList = (count, width = 256) => {
    let rangeList = [];
    const percentRange = Math.floor(width / count);
    for (let i = 0; i < count; i++) {
        const rangeStart = i * percentRange;
        const rangeEnd = rangeStart + percentRange;
        rangeList.push({
            start: rangeStart,
            end: rangeEnd
        });
    }
    return rangeList;
}

const cardSwiperList = document.querySelectorAll('.card__swiper');
cardSwiperList.forEach(swiper => {
    const currentSwiper = new Swiper(swiper, {
        modules: [Pagination],
        pagination: {
            el: swiper.querySelector('.swiper-pagination'),
            type: 'bullets',
        },
    });
    const countOfSldes = currentSwiper.slides.length;
    const rangeList = setRangeList(countOfSldes, swiper.offsetWidth);
    const swiperOffsetX = swiper.getBoundingClientRect().left;

    swiper.addEventListener('mousemove', evt => {
        const mouseOffset = Math.abs(Math.floor(evt.clientX - swiperOffsetX));
        let indexOfSlide = 0;
        rangeList.forEach( (range, index) => {
            if (mouseOffset > range.start && mouseOffset <= range.end) {
                indexOfSlide = index;
            }
        } );
        currentSwiper.slideTo(indexOfSlide);
    })
});
/**********************************************************************************************************************/


const careerPageSwiperImg = document.querySelector('.career-page__swiper-img');
if (careerPageSwiperImg) {
    const careerPageSwiperButtons = document.querySelectorAll('.career-page__swiper-button');

    function setButtonHeight() {
        const currentHeight = window.getComputedStyle(careerPageSwiperImg).height;
        careerPageSwiperButtons.forEach((button) => {
            button.style.setProperty('--currentHeight', currentHeight);
        })
    }

    setButtonHeight();

    window.addEventListener('resize', setButtonHeight);
}


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
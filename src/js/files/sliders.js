/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Перечень слайдеров
// Проверяем, есть ли слайдер на стронице
if (document.querySelector('.main-block__slider')) {
	new Swiper('.main-block__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Pagination, Autoplay],
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 600,
		loop: true,

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.main-block__arrow-prev',
			nextEl: '.main-block__arrow-next',
		},

		// Dotts
		pagination: {
			el: '.controll-main-block__dotts',
			clickable: true,
		},

		on: {
			init: function (swiper) {
				const allSlides = document.querySelector('.fraction-controll__all');
				const allSlidesItems = document.querySelectorAll('.main-block__slide:not(.swiper-slide-duplicate)');
				allSlides.innerHTML = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
			},
			slideChange: function (swiper) {
				const currentSlide = document.querySelector('.fraction-controll__current');
				currentSlide.innerHTML = swiper.realIndex + 1 < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
			}
		}
	});
}

if (document.querySelector('.other-event__slider')) {
	new Swiper('.other-event__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 54,
		speed: 800,

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.other-event__arrow-prev',
			nextEl: '.other-event__arrow-next',
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			650: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			991.98: {
				slidesPerView: 3,
				spaceBetween: 56,
			},
		},
	});
}

if (document.querySelector('.main-slider-products__slider')) {
	new Swiper('.main-slider-products__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Pagination, Autoplay],
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 600,
		loop: true,

		// Dotts
		pagination: {
			el: '.main-slider-products__pagination',
			clickable: true,
		},
	});
}

if (document.querySelector('.product-card__slider')) {
	new Swiper('.product-card__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 600,

		// Dotts
		pagination: {
			el: '.product-card__pagination',
			clickable: true,
		},
	});
}


// import works from './modules/works'
import header from './modules/header'
// import services from './modules/services'
import reviews from './modules/reviews'
// import cta from './modules/cta'
// import process from './modules/process'
import accordion from './modules/accordion'
import timer from './modules/timer'
import categories from './modules/categories'
// import indicators from './modules/indicators'
// import helper from './modules/helper'
// import animation from './modules/animation'
// import date from './modules/date'
import 'regenerator-runtime/runtime';

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-why', {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        freeMode: true,
        speed: 10000,
        // allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            // reverseDirection: true,
        },
    });
	header()
    // animation()
	// services()
	reviews()
    timer()
	// cta()
	// works()
	// process()
	accordion()
	categories()
	// indicators()
    // helper()
    // function conversion () {
    //     let links = document.querySelectorAll('a[href="https://wa.me/48531903619"], a[href="tel:+48531903619"]')
    //     for(let i = 0; i < links.length; i++) {
    //         links[i].addEventListener('click', function ()  {
    //             gtag_report_conversion()
    //         })
    //     }
    // }
    // conversion()

    function toggle () {
        let elements = document.querySelectorAll('.js-toggle')
        for(let i = 0; i < elements.length; i++) {
            let element = elements[i]
            let target = element.dataset.target ? element.querySelector(element.dataset.target) : element
            let collapse = element.querySelector(element.dataset.collapse)
            target.addEventListener('click', function (e) {
                element.classList.toggle('is-active')
            })
        }
    }
    toggle()

    // const blob = document.querySelector('.cursor-blob');

    // let mouseX = 0;
    // let mouseY = 0;

    // let x = 0;
    // let y = 0;

    // window.addEventListener('mousemove', (e) => {
    //     mouseX = e.clientX;
    //     mouseY = e.clientY;
    // });

    // function animate() {
    //     x += (mouseX - x) * 0.08;
    //     y += (mouseY - y) * 0.08;

    //     blob.style.transform = `
    //     translate(
    //         calc(${x}px - 50%),
    //         calc(${y}px - 50%)
    //     )
    // `;

    //     requestAnimationFrame(animate);
    // }

    // animate();


    // Знаходимо всі блоки simulator на сторінці
    const gallerySwipers = document.querySelectorAll('.gallery-swiper-wrapper');

    gallerySwipers.forEach(section => {
        const mainSwiperEl = section.querySelector('.gallery-swiper-main');
        const thumbsSwiperEl = section.querySelector('.gallery-swiper-thumbs');

        // Якщо в блоці є обидва свайпери
        if (mainSwiperEl && thumbsSwiperEl) {
            // Спочатку ініціалізуємо мініатюри
            const thumbsSwiper = new Swiper(thumbsSwiperEl, {
                spaceBetween: 12,
                slidesPerView: 3,
                freeMode: true,
                watchSlidesProgress: true,
            });

            // Потім ініціалізуємо головний слайдер і зв'язуємо його з мініатюрами
            const mainSwiper = new Swiper(mainSwiperEl, {
                spaceBetween: 10,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },

                // --- ДОДАНІ НАЛАШТУВАННЯ АВТОПЛЕЮ ---
                autoplay: {
                    delay: 3500, // Час показу одного слайда (3.5 секунди)
                    disableOnInteraction: true, // Зупинити назавжди, якщо юзер клікнув/свайпнув
                },
                // ------------------------------------

                thumbs: {
                    swiper: thumbsSwiper,
                },
            });
        }
    });



})
// date()


// const section = document.querySelector('.section-bg');

// window.addEventListener('scroll', () => {
//     const rect = section.getBoundingClientRect();

//     const offset = rect.top * 0.15;

//     document.body.style.setProperty('--arrow-offset', `${offset}px`);
// });
document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.video-local');

    videoContainers.forEach(container => {
        const video = container.querySelector('.video-local__player');
        const playBtn = container.querySelector('.video-local__play');

        if (video && playBtn) {
            playBtn.addEventListener('click', () => {
                // Додаємо клас для приховування кастомної кнопки
                container.classList.add('is-playing');

                // Вмикаємо нативні елементи керування (пауза, гучність, таймлайн)
                video.setAttribute('controls', 'controls');

                // Запускаємо відео
                video.play();
            });
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Знаходимо твій блок з месенджерами
    const messengers = document.querySelector('.messengers');

    if (!messengers) return; // Якщо блоку немає на сторінці, скрипт не ламатиметься

    window.addEventListener('scroll', () => {
        // window.innerHeight — це висота одного екрана користувача
        // Множимо на 1.5, щоб месенджери з'явилися десь на середині другого - початку третього екрана.
        // Якщо хочеш рівно після 2 повних екранів (на початку третього), зміни 1.5 на 2.
        const scrollThreshold = window.innerHeight * 2;

        if (window.scrollY > scrollThreshold) {
            messengers.classList.add('is-visible');
        } else {
            messengers.classList.remove('is-visible');
        }
    });
});

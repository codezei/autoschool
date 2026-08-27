export default function () {

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
}

export default function () {
    let categoriesNavigation = [
        ...document.querySelectorAll(".categories-navigation-swiper"),
    ];
    let categoriesContent = [
        ...document.querySelectorAll(".categories-content-swiper"),
    ];

    categoriesNavigation.map((categoriesNavigationSwiper) => {
        let swiper = new Swiper(categoriesNavigationSwiper, {
            spaceBetween: 8,
            slidesPerView: 4,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            initialSlide: 0,
            roundLengths: true,

            on: {
                click(swiper) {
                    const clickedIndex = swiper.clickedIndex;
                    if (clickedIndex !== undefined) {
                        swiper.slideTo(clickedIndex);
                    }
                },
            },
        });

        return swiper;
    });

    categoriesContent.map((categoriesContentSwiper, categoriesContentSwiperIndex) => {
            let buttonNextSelector = categoriesContentSwiper.dataset.nextSelector || ".swiper-button-next"
            let buttonPrevSelector = categoriesContentSwiper.dataset.prevSelector || ".swiper-button-prev"
            let swiper = new Swiper(categoriesContentSwiper, {
                spaceBetween: 32,
                allowTouchMove: categoriesContentSwiper.dataset.disallowTouch ? false : true,
                slideToClickedSlide: true,
                watchSlidesProgress: true,
                initialSlide: 0,
                autoHeight: !!categoriesContentSwiper.dataset.autoHeight || false,
                navigation: {
                    nextEl: buttonNextSelector,
                    prevEl: buttonPrevSelector,
                },
                thumbs: {
                    swiper: categoriesNavigation[categoriesContentSwiperIndex].swiper,
                    multipleActiveThumbs: false,
                },
            });
            return swiper;
        }
    );

    categoriesNavigation.forEach(
        (categoriesNavigationSwiper, categoriesNavigationSwiperIndex) => {
            categoriesNavigationSwiper.swiper.on("slideChange", function (swiper) {
                if (categoriesContent[categoriesNavigationSwiperIndex]) {
                    categoriesContent[categoriesNavigationSwiperIndex].swiper.slideTo(
                        swiper.activeIndex
                    );
                }
            });
        }
    );
    categoriesContent.forEach(
        (categoriesContentSwiper, categoriesContentSwiperIndex) => {
            categoriesContentSwiper.swiper.on("slideChange", function (swiper) {
                if (categoriesNavigation[categoriesContentSwiperIndex]) {
                    categoriesNavigation[categoriesContentSwiperIndex].swiper.slideTo(
                        swiper.activeIndex
                    );
                }
            });
        }
    );


    let changeSlideAnchors = document.querySelectorAll('.js-change-slide')
    for (let i = 0; i < changeSlideAnchors.length; i++) {
        changeSlideAnchors[i].addEventListener('click', function (e) {
            let currentSwiper = document.querySelector(e.currentTarget.dataset.swiper)
            let currentSlide = +e.currentTarget.dataset.slide
            currentSwiper.swiper.slideTo(currentSlide)
        })
    }
}

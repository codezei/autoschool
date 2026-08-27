export default function () {
        const swiperWhy = new Swiper('.swiper-why', {
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
}

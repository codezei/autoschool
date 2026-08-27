(function () {
    'use strict';

    function header () {
      var header = document.querySelector('.header');
      var burger = document.querySelector('.js-burger');
      if (!header) return;
      burger.addEventListener('click', function (e) {
        document.documentElement.classList.toggle('open-menu');
        e.currentTarget.setAttribute('aria-expanded', !(e.currentTarget.getAttribute('aria-expanded') === 'true' ? true : false));
      });
      header.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' || e.target.classList.contains('header__menu')) {
          document.documentElement.classList.remove('open-menu');
          burger.setAttribute('aria-expanded', !(burger.getAttribute('aria-expanded') === 'true' ? true : false));
        }
      });
    }

    function reviews () {
      var reviewsSwiper = new Swiper(".reviews-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
          // 430: {
          //   slidesPerView: 1.5,
          // },
          576: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4
          }
        },
        navigation: {
          nextEl: ".reviews-button-next",
          prevEl: ".reviews-button-prev"
        },
        on: {
          transitionEnd: function transitionEnd(swiper) {
            var reviewTextActive = swiper.el.querySelector('.swiper-slide:not(.swiper-slide-active) .review__text.active');

            if (reviewTextActive) {
              reviewTextActive.classList.remove('active');
            }

            var reviewToggleActive = swiper.el.querySelector('.swiper-slide:not(.swiper-slide-active) .review__toggle.active');

            if (reviewToggleActive) {
              reviewToggleActive.classList.remove('active');
            }
          }
        }
      });
      var reviewTogglers = document.querySelectorAll('.review__toggle');

      for (var i = 0; i < reviewTogglers.length; i++) {
        reviewTogglers[i].addEventListener('click', function (e) {
          e.currentTarget.previousElementSibling.classList.toggle('active');
          e.currentTarget.classList.toggle('active');
        });
      }
    }

    function timer () {
      initializeTimers();

      function initializeTimers() {
        var timers = document.querySelectorAll('.timer');
        if (!timers.length) return;
        timers.forEach(function (timerEl) {
          initSingleTimer(timerEl);
        });
      }

      function initSingleTimer(timerEl) {
        var deadlineStr = (timerEl.getAttribute('data-deadline') || '').trim();
        var deadline = parseDDMMYYYY(deadlineStr);

        if (!deadline) {
          console.warn('[timer] Некорректная дата в data-deadline, ожидается dd.mm.yyyy:', deadlineStr);
          return;
        }

        var endOfDay = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate(), 23, 59, 59, 999);
        updateTimer(timerEl, endOfDay);
        var interval = setInterval(function () {
          var finished = updateTimer(timerEl, endOfDay);

          if (finished) {
            clearInterval(interval);
          }
        }, 1000);
      }

      function updateTimer(timerEl, endOfDay) {
        var now = new Date(); // Сколько миллисекунд осталось до конца

        var diff = Math.max(0, endOfDay.getTime() - now.getTime()); // Переводим в секунды

        var secondsLeft = Math.floor(diff / 1000);
        var days = Math.floor(secondsLeft / 86400);
        var hours = Math.floor(secondsLeft % 86400 / 3600);
        var minutes = Math.floor(secondsLeft % 3600 / 60);
        var seconds = secondsLeft % 60;
        var different = document.body.classList.contains('timer-different');
        var dStr = String(days).padStart(2, '0');
        var hStr = String(hours).padStart(2, '0');
        var mStr = String(minutes).padStart(2, '0');
        var sStr = String(seconds).padStart(2, '0');
        fillUnit(timerEl.getElementsByClassName('days'), dStr, different);
        fillUnit(timerEl.getElementsByClassName('hours'), hStr, different);
        fillUnit(timerEl.getElementsByClassName('minutes'), mStr, different);
        fillUnit(timerEl.getElementsByClassName('seconds'), sStr, different);
        return secondsLeft <= 0;
      }

      function fillUnit(nodeList, valueStr, splitDigits) {
        if (!nodeList || !nodeList.length) return;

        if (!splitDigits) {
          for (var i = 0; i < nodeList.length; i++) {
            nodeList[i].textContent = valueStr;
          }

          return;
        }

        var digits = valueStr.split('');

        for (var _i = 0; _i < nodeList.length; _i++) {
          nodeList[_i].textContent = digits[_i % digits.length];
        }
      }

      function parseDDMMYYYY(str) {
        var match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(str);
        if (!match) return null;
        var day = Number(match[1]);
        var month = Number(match[2]);
        var year = Number(match[3]);
        var date = new Date(year, month - 1, day); // Проверяем существование даты

        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
          return null;
        }

        return date;
      }
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function categories () {
      var categoriesNavigation = _toConsumableArray(document.querySelectorAll(".categories-navigation-swiper"));

      var categoriesContent = _toConsumableArray(document.querySelectorAll(".categories-content-swiper"));

      categoriesNavigation.map(function (categoriesNavigationSwiper) {
        var swiper = new Swiper(categoriesNavigationSwiper, {
          spaceBetween: 8,
          slidesPerView: 4,
          watchSlidesProgress: true,
          slideToClickedSlide: true,
          initialSlide: 0,
          roundLengths: true,
          on: {
            click: function click(swiper) {
              var clickedIndex = swiper.clickedIndex;

              if (clickedIndex !== undefined) {
                swiper.slideTo(clickedIndex);
              }
            }
          }
        });
        return swiper;
      });
      categoriesContent.map(function (categoriesContentSwiper, categoriesContentSwiperIndex) {
        var buttonNextSelector = categoriesContentSwiper.dataset.nextSelector || ".swiper-button-next";
        var buttonPrevSelector = categoriesContentSwiper.dataset.prevSelector || ".swiper-button-prev";
        var swiper = new Swiper(categoriesContentSwiper, {
          spaceBetween: 32,
          allowTouchMove: categoriesContentSwiper.dataset.disallowTouch ? false : true,
          slideToClickedSlide: true,
          watchSlidesProgress: true,
          initialSlide: 0,
          autoHeight: !!categoriesContentSwiper.dataset.autoHeight || false,
          navigation: {
            nextEl: buttonNextSelector,
            prevEl: buttonPrevSelector
          },
          thumbs: {
            swiper: categoriesNavigation[categoriesContentSwiperIndex].swiper,
            multipleActiveThumbs: false
          }
        });
        return swiper;
      });
      categoriesNavigation.forEach(function (categoriesNavigationSwiper, categoriesNavigationSwiperIndex) {
        categoriesNavigationSwiper.swiper.on("slideChange", function (swiper) {
          if (categoriesContent[categoriesNavigationSwiperIndex]) {
            categoriesContent[categoriesNavigationSwiperIndex].swiper.slideTo(swiper.activeIndex);
          }
        });
      });
      categoriesContent.forEach(function (categoriesContentSwiper, categoriesContentSwiperIndex) {
        categoriesContentSwiper.swiper.on("slideChange", function (swiper) {
          if (categoriesNavigation[categoriesContentSwiperIndex]) {
            categoriesNavigation[categoriesContentSwiperIndex].swiper.slideTo(swiper.activeIndex);
          }
        });
      });
      var changeSlideAnchors = document.querySelectorAll('.js-change-slide');

      for (var i = 0; i < changeSlideAnchors.length; i++) {
        changeSlideAnchors[i].addEventListener('click', function (e) {
          var currentSwiper = document.querySelector(e.currentTarget.dataset.swiper);
          var currentSlide = +e.currentTarget.dataset.slide;
          currentSwiper.swiper.slideTo(currentSlide);
        });
      }
    }

    function toggle () {
      var elements = document.querySelectorAll('.js-toggle');

      var _loop = function _loop(i) {
        var element = elements[i];
        var target = element.dataset.target ? element.querySelector(element.dataset.target) : element;
        var collapse = element.querySelector(element.dataset.collapse);
        target.addEventListener('click', function (e) {
          element.classList.toggle('is-active');
        });
      };

      for (var i = 0; i < elements.length; i++) {
        _loop(i);
      }
    }

    function why () {
      var swiper = new Swiper('.swiper-why', {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        freeMode: true,
        speed: 10000,
        // allowTouchMove: false,
        autoplay: {
          delay: 0,
          disableOnInteraction: false // reverseDirection: true,

        }
      });
    }

    function gallery () {
      // Знаходимо всі блоки simulator на сторінці
      var gallerySwipers = document.querySelectorAll('.gallery-swiper-wrapper');
      gallerySwipers.forEach(function (section) {
        var mainSwiperEl = section.querySelector('.gallery-swiper-main');
        var thumbsSwiperEl = section.querySelector('.gallery-swiper-thumbs'); // Якщо в блоці є обидва свайпери

        if (mainSwiperEl && thumbsSwiperEl) {
          // Спочатку ініціалізуємо мініатюри
          var thumbsSwiper = new Swiper(thumbsSwiperEl, {
            spaceBetween: 12,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true
          }); // Потім ініціалізуємо головний слайдер і зв'язуємо його з мініатюрами

          var mainSwiper = new Swiper(mainSwiperEl, {
            spaceBetween: 10,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            // --- ДОДАНІ НАЛАШТУВАННЯ АВТОПЛЕЮ ---
            autoplay: {
              delay: 3500,
              // Час показу одного слайда (3.5 секунди)
              disableOnInteraction: true // Зупинити назавжди, якщо юзер клікнув/свайпнув

            },
            // ------------------------------------
            thumbs: {
              swiper: thumbsSwiper
            }
          });
        }
      });
    }

    function video () {
      var videoContainers = document.querySelectorAll('.video-local');
      videoContainers.forEach(function (container) {
        var video = container.querySelector('.video-local__player');
        var playBtn = container.querySelector('.video-local__play');

        if (video && playBtn) {
          playBtn.addEventListener('click', function () {
            // Додаємо клас для приховування кастомної кнопки
            container.classList.add('is-playing'); // Вмикаємо нативні елементи керування (пауза, гучність, таймлайн)

            video.setAttribute('controls', 'controls'); // Запускаємо відео

            video.play();
          });
        }
      });
    }

    function messengers () {
      // Знаходимо твій блок з месенджерами
      var messengers = document.querySelector('.messengers');
      if (!messengers) return; // Якщо блоку немає на сторінці, скрипт не ламатиметься

      window.addEventListener('scroll', function () {
        // window.innerHeight — це висота одного екрана користувача
        // Множимо на 1.5, щоб месенджери з'явилися десь на середині другого - початку третього екрана.
        // Якщо хочеш рівно після 2 повних екранів (на початку третього), зміни 1.5 на 2.
        var scrollThreshold = window.innerHeight * 2;

        if (window.scrollY > scrollThreshold) {
          messengers.classList.add('is-visible');
        } else {
          messengers.classList.remove('is-visible');
        }
      });
    }

    function park () {
      var swiper = new Swiper('.swiper-park', {
        slidesPerView: 4,
        spaceBetween: 16,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          576: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 2.5
          },
          992: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4
          }
        }
      });
    }

    document.addEventListener('DOMContentLoaded', function () {
      header();
      reviews();
      timer();
      categories();
      toggle();
      why();
      gallery();
      video();
      messengers();
      park();
    });

}());

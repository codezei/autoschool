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

    function video () {
      var videoContainers = document.querySelectorAll('.video-local');
      videoContainers.forEach(function (container) {
        var video = container.querySelector('.video-local__player');
        var playBtn = container.querySelector('.video-local__play');

        if (video && playBtn) {
          playBtn.addEventListener('click', function () {
            container.classList.add('is-playing');
            video.setAttribute('controls', 'controls');
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

    document.addEventListener('DOMContentLoaded', function () {
      header();
      timer();
      toggle();
      video();
      messengers();
    });

}());

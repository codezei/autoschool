export default function () {
    initializeTimers();

    function initializeTimers() {
        const timers = document.querySelectorAll('.timer');

        if (!timers.length) return;

        timers.forEach((timerEl) => {
            initSingleTimer(timerEl);
        });
    }

    function initSingleTimer(timerEl) {
        const deadlineStr = (timerEl.getAttribute('data-deadline') || '').trim();
        const deadline = parseDDMMYYYY(deadlineStr);

        if (!deadline) {
            console.warn(
                '[timer] Некорректная дата в data-deadline, ожидается dd.mm.yyyy:',
                deadlineStr
            );

            return;
        }

        const endOfDay = new Date(
            deadline.getFullYear(),
            deadline.getMonth(),
            deadline.getDate(),
            23,
            59,
            59,
            999
        );

        updateTimer(timerEl, endOfDay);

        const interval = setInterval(() => {
            const finished = updateTimer(timerEl, endOfDay);

            if (finished) {
                clearInterval(interval);
            }
        }, 1000);
    }

    function updateTimer(timerEl, endOfDay) {
        const now = new Date();

        // Сколько миллисекунд осталось до конца
        const diff = Math.max(0, endOfDay.getTime() - now.getTime());

        // Переводим в секунды
        const secondsLeft = Math.floor(diff / 1000);

        const days = Math.floor(secondsLeft / 86400);
        const hours = Math.floor((secondsLeft % 86400) / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = secondsLeft % 60;

        const different = document.body.classList.contains('timer-different');

        const dStr = String(days).padStart(2, '0');
        const hStr = String(hours).padStart(2, '0');
        const mStr = String(minutes).padStart(2, '0');
        const sStr = String(seconds).padStart(2, '0');

        fillUnit(
            timerEl.getElementsByClassName('days'),
            dStr,
            different
        );

        fillUnit(
            timerEl.getElementsByClassName('hours'),
            hStr,
            different
        );

        fillUnit(
            timerEl.getElementsByClassName('minutes'),
            mStr,
            different
        );

        fillUnit(
            timerEl.getElementsByClassName('seconds'),
            sStr,
            different
        );

        return secondsLeft <= 0;
    }

    function fillUnit(nodeList, valueStr, splitDigits) {
        if (!nodeList || !nodeList.length) return;

        if (!splitDigits) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].textContent = valueStr;
            }

            return;
        }

        const digits = valueStr.split('');

        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].textContent = digits[i % digits.length];
        }
    }

    function parseDDMMYYYY(str) {
        const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(str);

        if (!match) return null;

        const day = Number(match[1]);
        const month = Number(match[2]);
        const year = Number(match[3]);

        const date = new Date(year, month - 1, day);

        // Проверяем существование даты
        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }
}

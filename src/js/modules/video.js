export default function () {
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
}

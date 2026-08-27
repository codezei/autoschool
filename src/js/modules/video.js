export default function () {
    const videoContainers = document.querySelectorAll('.video-local');

    videoContainers.forEach(container => {
        const video = container.querySelector('.video-local__player');
        const playBtn = container.querySelector('.video-local__play');

        if (video && playBtn) {
            playBtn.addEventListener('click', () => {
                container.classList.add('is-playing');
                video.setAttribute('controls', 'controls');
                video.play();
            });
        }
    });
}

export default function () {
    function checkVisibility(options = {}) {
        const elements = document.querySelectorAll('.js-observe');
        if (!elements.length) return;
        const settings = {
            threshold: 0.1,
            rootMargin: '0px',
            once: true,
            ...options
        };
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    if (settings.once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!settings.once) {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: settings.threshold,
            rootMargin: settings.rootMargin
        });
        elements.forEach(element => observer.observe(element));
    }
    checkVisibility();
}

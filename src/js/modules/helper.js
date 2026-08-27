export default function () {
    const helpers = document.querySelectorAll('.helper');

    if (!helpers.length) return;

    const observer = new IntersectionObserver(handleIntersect, {
        threshold: .2
    });

    helpers.forEach(helper => {
        observer.observe(helper);
    });


    function handleIntersect(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const helper = entry.target;

            if (helper.dataset.started) return;

            helper.dataset.started = true;

            setTimeout(() => {
                showMessage(helper);
            }, 8000);
        });
    }


    function showMessage(helper) {
        helper.classList.add('active');

        const message = helper.querySelector('.helper__message');
        const textBox = helper.querySelector('.js-helper-text');

        typeText(
            textBox,
            message.dataset.text,
            () => hideMessage(helper)
        );
    }


    function typeText(element, text, callback, index = 0) {
        if (index < text.length) {

            element.textContent += text[index];

            setTimeout(() => {
                typeText(element, text, callback, index + 1);
            }, 45);

        } else {

            setTimeout(callback, 4000);

        }
    }


    function hideMessage(helper) {
        helper.classList.remove('active');
    }
}

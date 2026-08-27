export default function () {
    const form = document.querySelector('#cta-form');

    if (!form) return;

    const ctaPopup = document.querySelector('#ctaPopup');
    const popupSuccess = document.querySelector('#popupCtaSuccess');
    const popupError = document.querySelector('#popupCtaError');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/telegram.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network error');
            }

            const answer = await response.json();
            console.log(answer)

            if (answer.success) {
                ctaPopup.close();
                popupSuccess.showModal();
                form.reset();
                setTimeout(function () {
                    popupSuccess.close();
                }, 5000)
                gtag_report_conversion();
            } else {
                ctaPopup.close();
                popupError.showModal();
                setTimeout(function () {
                    popupError.close();
                }, 5000)
            }

        } catch (error) {
            console.error(error);
            ctaPopup.close();
            popupError.showModal();
            setTimeout(function () {
                popupError.close();
            }, 5000)
        }
    });
}

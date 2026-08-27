export default function () {
    // Знаходимо твій блок з месенджерами
    const messengers = document.querySelector('.messengers');

    if (!messengers) return; // Якщо блоку немає на сторінці, скрипт не ламатиметься

    window.addEventListener('scroll', () => {
        // window.innerHeight — це висота одного екрана користувача
        // Множимо на 1.5, щоб месенджери з'явилися десь на середині другого - початку третього екрана.
        // Якщо хочеш рівно після 2 повних екранів (на початку третього), зміни 1.5 на 2.
        const scrollThreshold = window.innerHeight * 2;

        if (window.scrollY > scrollThreshold) {
            messengers.classList.add('is-visible');
        } else {
            messengers.classList.remove('is-visible');
        }
    });
}

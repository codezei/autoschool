export default function () {
    const header = document.querySelector('.header')
    const burger = document.querySelector('.js-burger')

	if (!header) return

    burger.addEventListener('click', function (e) {
        document.documentElement.classList.toggle('open-menu')
		e.currentTarget.setAttribute('aria-expanded', !(e.currentTarget.getAttribute('aria-expanded') === 'true' ? true : false))
    })

    header.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' || e.target.classList.contains('header__menu')) {

            document.documentElement.classList.remove('open-menu')
			burger.setAttribute('aria-expanded', !(burger.getAttribute('aria-expanded') === 'true' ? true : false))
        }
    })

}

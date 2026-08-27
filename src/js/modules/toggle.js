export default function () {
    let elements = document.querySelectorAll('.js-toggle')
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i]
        let target = element.dataset.target ? element.querySelector(element.dataset.target) : element
        let collapse = element.querySelector(element.dataset.collapse)
        target.addEventListener('click', function (e) {
            element.classList.toggle('is-active')
        })
    }
}

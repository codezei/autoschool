export default function () {
  const animationDuration = 2000;
  const allProgressIndicators = document.querySelectorAll(".progress");

  function animateNumber(element, finalValue, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * finalValue);
      element.textContent = `${currentValue}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  function runAnimation(container) {
    const svgElement = container.querySelector(".progress__bar");
    const circleFg = container.querySelector(".progress__bar-fg");
    const valueElement = container.querySelector(".progress__value-number");
    const targetProgress = parseInt(svgElement.dataset.progress, 10);
    const radius = 40;
    const circleLength = 2 * Math.PI * radius;

    if (!isNaN(targetProgress)) {
      circleFg.style.strokeDasharray = circleLength;
      circleFg.style.strokeDashoffset = circleLength;
      valueElement.textContent = "0";
      setTimeout(() => {
        const offset = circleLength - (targetProgress / 100) * circleLength;
        circleFg.style.strokeDashoffset = offset;
        animateNumber(valueElement, targetProgress, animationDuration);
      }, 100); // Ваша затримка у 100 мс тут доречна
    }
  }

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runAnimation(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  allProgressIndicators.forEach((container) => {
    const circleFg = container.querySelector(".progress__bar-fg");
    const valueElement = container.querySelector(".progress__value-number");
    const radius = 40;
    const circleLength = 2 * Math.PI * radius;
  
    circleFg.style.strokeDasharray = circleLength;
    circleFg.style.strokeDashoffset = circleLength;
    valueElement.textContent = "0";
    observer.observe(container);
  });
}
window.onload = () => {
  const burger = document.querySelector('a.target-burger');
  burger.addEventListener('click', (ev) => {
    [...document.querySelectorAll('.burger-el')].forEach((el) => {
      el.classList.toggle ('toggled')
    })
  })
}

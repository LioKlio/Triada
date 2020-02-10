let indexpage = document.querySelector('body').classList.contains('index');


// CHART ----
let chart = document.querySelector('.rise');
let pointData = [1, 1.45, 1.83, 2.27, 3.6, 4.1, 7.8, 15.6];
let riseChart = document.querySelector('.rise-chart');
let risePoints = document.querySelectorAll('.rise-point');
let chartInit = () => {
  let pointW = (riseChart.offsetWidth - 160) / risePoints.length;
  risePoints.forEach((point, inx) => {
    point.style.width = pointW + 'px';
    point.style.left = 80 + (inx ?  pointW*inx : 0) + 'px';
    point.style.top = (inx ?  100-(pointData[inx]*riseChart.offsetHeight/100) : 100) + '%';
    point.querySelector('.btn').textContent = pointData[inx] + '%'
  })
};


// window events ----
window.onload = () => {
  if(!!chart) chartInit();
  const burger = document.querySelector('a.target-burger');
  burger.addEventListener('click', (ev) => {
    [...document.querySelectorAll('.burger-el')].forEach((el) => {
      el.classList.toggle ('toggled')
    })
  })
}

window.onresize = () => {
  if(!!chart) chartInit();
}

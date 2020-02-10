"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.onload = function () {
  var burger = document.querySelector('a.target-burger');
  burger.addEventListener('click', function (ev) {
    _toConsumableArray(document.querySelectorAll('.burger-el')).forEach(function (el) {
      el.classList.toggle('toggled');
    });
  });
};

var pointData = [1, 1.45, 1.83, 2.27, 3.6, 4.1, 7.8, 15.6];
var riseChart = document.querySelector('.rise-chart');
var risePoints = document.querySelectorAll('.rise-point');
var pointW = (riseChart.offsetWidth - 160) / risePoints.length;
risePoints.forEach(function (point, inx) {
  point.style.width = pointW + 'px';
  point.style.left = 80 + (inx ? pointW * inx : 0) + 'px';
  point.style.top = (inx ? 100 - pointData[inx] * riseChart.offsetHeight / 100 : 100) + '%';
  point.querySelector('.btn').textContent = pointData[inx] + '%';
});
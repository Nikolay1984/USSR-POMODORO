"use strict";

let ball = document.querySelector(".ball");
ball.addEventListener("dragstart", function (e) {
  e.preventDefault();
});
ball.addEventListener("mousedown", function (e) {
  let coords = getCoords(this);
  let shiftX = e.pageX - coords.left;
  let shiftY = e.pageY - coords.top;
  document.body.appendChild(this);
  moveAt(e, this);
  this.style.zIndex = 1000;

  function moveAt(e, ball) {
    ball.style.left = e.pageX - shiftX + "px";
    ball.style.top = e.pageY - shiftY + "px";
  }

  function handlerMousemove(e) {
    moveAt(e, this);
  }

  this.addEventListener("mousemove", handlerMousemove);
  this.addEventListener("mouseup", function (e) {
    this.removeEventListener("mousemove", handlerMousemove);
  }, {
    once: true
  });
});

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
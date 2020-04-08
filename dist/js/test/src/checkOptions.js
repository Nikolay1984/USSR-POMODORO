"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default({
  reactionLabelAndOutputElementOnChangeOfHidden,
  handlerMouseDown,
  classLabel,
  classHidden,
  classCircleBig,
  classBall,
  startPosition
}) {
  let square = document.querySelector("." + classLabel);
  let elemHidden = document.querySelector("." + classHidden);
  let observeOfHidden = new MutationObserver(handlerChange);
  let configMutationObserver = {
    childList: true,
    characterData: true
  };
  observeOfHidden.observe(elemHidden, configMutationObserver);
  let circleBig = document.querySelector("." + classCircleBig);
  let ball = document.querySelector("." + classBall);
  ball.addEventListener("mousedown", handlerMouseDown);
  let ballHeight = ball.offsetHeight;
  let circleBigHeight = circleBig.offsetHeight;

  function positioningBall(ballHeight, circleBigHeight) {}

  positioningBall(ballHeight, circleBigHeight);
  elemHidden.innerHTML = startPosition;
}

function reactionLabelAndOutputElementOnChangeOfHidden(arr, classOutputElement, labelElement, maxRange, callbackCalcPositionAndChangePos) {
  let parentHeight = labelElement.offsetParent;
  let outputElement = document.querySelector("." + classOutputElement);
  let value = arr[0].target.innerText;
  let valueFormatting = Number(value.slice(0, 2));
  let period = document.querySelector(".nameCurrentPeriod").innerHTML;
  callbackCalcPositionAndChangePos(value, maxRange, parentHeight);
  outputElement.innerHTML = valueFormatting;
}

module.exports = exports.default;
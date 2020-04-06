"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  function handlerChangeOfTime(arr) {
    let outputElement = document.querySelector(".currentSecondsAndMinute");
    let period = document.querySelector(".nameCurrentPeriod").innerHTML;
    let value = arr[0].target.innerText;
    let valueFormatting = Number(value.slice(0, 2));
    square.style.left = valueFormatting + "%";

    if (period === "Работа") {
      outputElement.innerHTML = value;
    }
  }

  function handlerMouseDownTime() {
    let deactivate = document.querySelector(".deactivate");

    if (!deactivate) {
      return;
    }

    let self = this;
    let position = {
      top: square.offsetTop - 20 + "px",
      left: square.offsetLeft + 5 + "px"
    };
    timeHidden.style.display = "block";
    timeHidden.style.top = position.top;
    timeHidden.style.left = position.left;

    function handlerMove(e) {
      timeHidden.style.top = square.offsetTop - 20 + "px";
      timeHidden.style.left = square.offsetLeft + 5 + "px";
    }

    document.addEventListener("mousemove", handlerMove);
    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", handlerMove);
      timeHidden.style.display = "none";
    }, {
      once: true
    });
  }

  let square = document.querySelector(".labelTime ");
  let timeHidden = document.querySelector(".timeHidden ");
  let configMutationObserver = {
    childList: true,
    characterData: true
  };
  let observeOfTimeHidden = new MutationObserver(handlerChangeOfTime);
  observeOfTimeHidden.observe(timeHidden, configMutationObserver);
  let circleBig = document.querySelector(".circleBigTime ");
  let ballTime = circleBig.querySelector(".ballTime");
  ballTime.addEventListener("mousedown", handlerMouseDownTime);
  let ballHeight = ballTime.offsetHeight;
  let circleBigHeight = circleBig.offsetHeight;
  ballTime.style.top = (circleBigHeight - ballHeight) / 2 + "px";
  ballTime.style.left = circleBigHeight - ballHeight + "px";
  timeHidden.innerHTML = "25:00";
}

module.exports = exports.default;
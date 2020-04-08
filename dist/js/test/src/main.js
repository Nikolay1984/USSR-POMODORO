"use strict";

var _dragAndDrop = _interopRequireDefault(require("./dragAndDrop.js"));

var _checkOptionsSound = _interopRequireDefault(require("./checkOptionsSound.js"));

var _checkOptionsRest = _interopRequireDefault(require("./checkOptionsRest.js"));

var _checkOptionsRound = _interopRequireDefault(require("./checkOptionsRound.js"));

var _checkOptionsTime = _interopRequireDefault(require("./checkOptionsTime.js"));

var _Timer = _interopRequireDefault(require("./Timer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let configTime = {
  selectorOutputElem: ".timeHidden",
  selectorTargetToPage: ".sliderMinute",
  objNamesOfSlider: {
    arrClassNamesBall: ["ball", "ballTime"],
    arrClassNamesCircleBig: ["circleBig", "circleBigTime"],
    arrClassNamesCircleSmall: ["circleSmall", "circleSmallTime"]
  },
  maxRange: 100,
  hint: "time",
  limiter: true,
  minPosition: 1
};
let configRound = {
  selectorOutputElem: ".roundHidden",
  selectorTargetToPage: ".sliderRound",
  objNamesOfSlider: {
    arrClassNamesBall: ["ball", "ballTime"],
    arrClassNamesCircleBig: ["circleBig", "circleBigRound"],
    arrClassNamesCircleSmall: ["circleSmall", "circleSmallTime"]
  },
  maxRange: 15,
  hint: "round",
  limiter: true,
  minPosition: 1
};
let configBigRest = {
  selectorOutputElem: ".bigRestHidden",
  selectorTargetToPage: ".sliderBigRest",
  objNamesOfSlider: {
    arrClassNamesBall: ["ball", "ballTime"],
    arrClassNamesCircleBig: ["circleBig", "circleBigBigRest"],
    arrClassNamesCircleSmall: ["circleSmall", "circleSmallTime"]
  },
  maxRange: 30,
  hint: "rest",
  limiter: true,
  minPosition: 1
};
let configRest = {
  selectorOutputElem: ".restHidden",
  selectorTargetToPage: ".sliderRest",
  objNamesOfSlider: {
    arrClassNamesBall: ["ball", "ballTime"],
    arrClassNamesCircleBig: ["circleBig", "circleBigRest"],
    arrClassNamesCircleSmall: ["circleSmall", "circleSmallTime"]
  },
  maxRange: 10,
  hint: "rest",
  limiter: true,
  minPosition: 1
};
let configVolume = {
  selectorOutputElem: ".currentVolume",
  selectorTargetToPage: ".sliderVolume",
  objNamesOfSlider: {
    arrClassNamesBall: ["ball", "ballVolume"],
    arrClassNamesCircleBig: ["circleBig", "circleBigVolume"],
    arrClassNamesCircleSmall: ["circleSmall", "circleSmallVolume"]
  },
  maxRange: 100,
  hint: "sound",
  limiter: false,
  minPosition: 0
};
let configBehavior = {
  time: (0, _dragAndDrop.default)(configTime),
  round: (0, _dragAndDrop.default)(configRound),
  bigRest: (0, _dragAndDrop.default)(configBigRest),
  rest: (0, _dragAndDrop.default)(configRest),
  volume: (0, _dragAndDrop.default)(configVolume)
};
(0, _checkOptionsTime.default)();
(0, _checkOptionsSound.default)();
(0, _checkOptionsRest.default)();
(0, _checkOptionsRound.default)();
let timer = new _Timer.default("timerPomodoro", configBehavior);
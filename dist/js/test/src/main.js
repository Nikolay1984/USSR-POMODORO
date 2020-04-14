"use strict";

var _checkOptions = _interopRequireDefault(require("./checkOptions.js"));

var _dragAndDrop = _interopRequireDefault(require("./dragAndDrop.js"));

var _checkOptionsSound = _interopRequireDefault(require("./checkOptionsSound.js"));

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
    arrClassNamesBall: ["ball", "ballRound"],
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
    arrClassNamesBall: ["ball", "ballBigRest"],
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
    arrClassNamesBall: ["ball", "ballRest"],
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
let configTimeForCheckOptions = {
  classLabel: "labelTime",
  classHidden: "timeHidden",
  classCircleBig: "circleBigTime",
  classBall: "ballTime",
  startPosition: "25:00",
  classOutputElement: "currentSecondsAndMinute",
  maxRange: 100
};
let configBigRestForCheckOptions = {
  classLabel: "labelBigRest",
  classHidden: "bigRestHidden",
  classCircleBig: "circleBigBigRest",
  classBall: "ballBigRest",
  startPosition: "15",
  classOutputElement: "currentSecondsAndMinute",
  maxRange: 30
};
let configRestForCheckOptions = {
  classLabel: "labelRest",
  classHidden: "restHidden",
  classCircleBig: "circleBigRest",
  classBall: "ballRest",
  startPosition: "5",
  classOutputElement: "currentSecondsAndMinute",
  maxRange: 10
};
let configRoundForCheckOptions = {
  classLabel: "labelRound",
  classHidden: "roundHidden",
  classCircleBig: "circleBigRound",
  classBall: "ballRound",
  startPosition: "3",
  classOutputElement: "currentCountOfWork",
  maxRange: 15
};
(0, _checkOptions.default)(configRoundForCheckOptions);
(0, _checkOptions.default)(configRestForCheckOptions);
(0, _checkOptions.default)(configTimeForCheckOptions);
(0, _checkOptions.default)(configBigRestForCheckOptions);
(0, _checkOptionsSound.default)(configBehavior.volume);
let timer = new _Timer.default("timerPomodoro", configBehavior);
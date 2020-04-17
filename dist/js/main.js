import checkOptions from "./setOptionsTimer.js";
import transformElementToCircleSlider from "./circleSliderDragAndDrop.js";
import checkOptionsSound from "./setOptionsSound.js";

import Timer from "./Timer.js";

const configTime = {
    selectorOutputElem   : ".timeHidden" ,
    selectorTargetToPage : ".sliderMinute" ,
    objNamesOfSlider     : {
        arrClassNamesBall        : [ "ball" , "ballTime" ] ,
        arrClassNamesCircleBig   : [ "circleBig" , "circleBigTime" ] ,
        arrClassNamesCircleSmall : [ "circleSmall" , "circleSmallTime" ] ,
    } ,
    maxRange    : 100 ,
    hint        : "time" ,
    limiter     : true ,
    minPosition : 1 ,
};

const configRound = {
    selectorOutputElem   : ".roundHidden" ,
    selectorTargetToPage : ".sliderRound" ,
    objNamesOfSlider     : {
        arrClassNamesBall        : [ "ball" , "ballRound" ] ,
        arrClassNamesCircleBig   : [ "circleBig" , "circleBigRound" ] ,
        arrClassNamesCircleSmall : [ "circleSmall" , "circleSmallTime" ] ,
    } ,
    maxRange    : 15 ,
    hint        : "round" ,
    limiter     : true ,
    minPosition : 1 ,
};

const configBigRest = {
    selectorOutputElem   : ".bigRestHidden" ,
    selectorTargetToPage : ".sliderBigRest" ,
    objNamesOfSlider     : {
        arrClassNamesBall        : [ "ball" , "ballBigRest" ] ,
        arrClassNamesCircleBig   : [ "circleBig" , "circleBigBigRest" ] ,
        arrClassNamesCircleSmall : [ "circleSmall" , "circleSmallTime" ] ,
    } ,
    maxRange    : 30 ,
    hint        : "rest" ,
    limiter     : true ,
    minPosition : 1 ,
};

const configRest = {
    selectorOutputElem   : ".restHidden" ,
    selectorTargetToPage : ".sliderRest" ,
    objNamesOfSlider     : {
        arrClassNamesBall        : [ "ball" , "ballRest" ] ,
        arrClassNamesCircleBig   : [ "circleBig" , "circleBigRest" ] ,
        arrClassNamesCircleSmall : [ "circleSmall" , "circleSmallTime" ] ,
    } ,
    maxRange    : 10 ,
    hint        : "rest" ,
    limiter     : true ,
    minPosition : 1 ,
};

const configVolume = {
    selectorOutputElem   : ".currentVolume" ,
    selectorTargetToPage : ".sliderVolume" ,
    objNamesOfSlider     : {
        arrClassNamesBall        : [ "ball" , "ballVolume" ] ,
        arrClassNamesCircleBig   : [ "circleBig" , "circleBigVolume" ] ,
        arrClassNamesCircleSmall : [ "circleSmall" , "circleSmallVolume" ] ,
    } ,
    maxRange    : 100 ,
    hint        : "sound" ,
    limiter     : false ,
    minPosition : 0 ,
};

const configBehavior = {
    time    : transformElementToCircleSlider( configTime ) ,
    round   : transformElementToCircleSlider( configRound ) ,
    bigRest : transformElementToCircleSlider( configBigRest ) ,
    rest    : transformElementToCircleSlider( configRest ) ,
    volume  : transformElementToCircleSlider( configVolume ) ,
};

const configTimeForCheckOptions = {
    classLabel         : "labelTime" ,
    classHidden        : "timeHidden" ,
    classCircleBig     : "circleBigTime" ,
    classBall          : "ballTime" ,
    startPosition      : "25:00" ,
    classOutputElement : "currentSecondsAndMinute" ,
    maxRange           : 100 ,
};

const configBigRestForCheckOptions = {
    classLabel         : "labelBigRest" ,
    classHidden        : "bigRestHidden" ,
    classCircleBig     : "circleBigBigRest" ,
    classBall          : "ballBigRest" ,
    startPosition      : "15" ,
    classOutputElement : "currentSecondsAndMinute" ,
    maxRange           : 30 ,
};

const configRestForCheckOptions = {
    classLabel         : "labelRest" ,
    classHidden        : "restHidden" ,
    classCircleBig     : "circleBigRest" ,
    classBall          : "ballRest" ,
    startPosition      : "5" ,
    classOutputElement : "currentSecondsAndMinute" ,
    maxRange           : 10 ,
};

const configRoundForCheckOptions = {
    classLabel         : "labelRound" ,
    classHidden        : "roundHidden" ,
    classCircleBig     : "circleBigRound" ,
    classBall          : "ballRound" ,
    startPosition      : "3" ,
    classOutputElement : "currentCountOfWork" ,
    maxRange           : 15 ,
};
checkOptions( configRoundForCheckOptions );
checkOptions( configRestForCheckOptions );
checkOptions( configTimeForCheckOptions );
checkOptions( configBigRestForCheckOptions );

checkOptionsSound( configBehavior.volume );

const timer = new Timer( "timerPomodoro" , configBehavior );


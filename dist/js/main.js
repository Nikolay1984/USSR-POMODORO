import checkOptionsSound from "./checkOptionsSound.js";

checkOptionsSound();
function handlerChangeOfRest(arr){
	let triangle;
	let value = 1*arr[0].target.innerText;
	let parentHeight = document.querySelector(".displayOfRests").offsetHeight;
	let lengthRange =  parentHeight - ((parentHeight * 6) / 100);
	let offset = ((parentHeight * 3) / 100);
	let pos = (value * lengthRange / 100) - offset;
	if(pos <= 1){pos = offset}


	// console.dir(triangleTop)

	if(arr[0].target.className === "bigRestHidden" ){
		 triangle = document.querySelector(".labelBigRest");


	}else if(arr[0].target.className === "restHidden"){

		 triangle = document.querySelector(".labelRest");
	}
	triangle.style.top = pos + "px"
}
let observeOfBigRestHidden = new MutationObserver(handlerChangeOfRest);
observeOfBigRestHidden.observe(document.querySelector(".bigRestHidden"),{
	childList:true,
	characterData:true
})

let observeOfRestHidden = new MutationObserver(handlerChangeOfRest);
observeOfRestHidden.observe(document.querySelector(".restHidden"),{
	childList:true,
	characterData:true
})
let controlMinuteOfBigRest = document.querySelector(".controlMinuteOfBigRest");
let controlMinuteOfRest = document.querySelector(".controlMinuteOfRest");

let controlMinuteOfBigRestBall = controlMinuteOfBigRest.querySelector(".ball ");
let controlMinuteOfRestBall = controlMinuteOfRest.querySelector(".ball ");

function handlerMouseDownRest(e) {
let self = this;

	function handlerMove(e) {
		let value;
		let donorValue;
		let maxRange;
		if(self.closest(".controlMinuteOfBigRest")){
			donorValue = document.querySelector(".bigRestHidden");
			maxRange = 30;
		}else if (self.closest(".controlMinuteOfRest")){
			maxRange = 10
			donorValue = document.querySelector(".restHidden");
		}
		value =1*donorValue.innerText;
        let outputRes =  Math.ceil((value * maxRange) / 100);

		console.log(outputRes);
	}

	document.addEventListener("mousemove" , handlerMove);
	document.addEventListener("mouseup" , function () {
		document.removeEventListener("mousemove" , handlerMove);
	} , {once: true});
}
controlMinuteOfBigRestBall.addEventListener("mousedown",handlerMouseDownRest);
controlMinuteOfRestBall.addEventListener("mousedown",handlerMouseDownRest);







// import Button from "./Button.js";
// // import {Driver} from "./Driver.js";
// import Timer from "./Timer.js";
// // import {Observable} from "./Observable.js";
//
// let configTimer = {
//
// 	selectorTargetToPage:".placeTimer" ,
// 	stringCaptionTimer:"Основное табло таймера" ,
// 	stringCaptionCountOfWork:"Осталось циклов" ,
// };
// let timer = new Timer(configTimer);
// let buttonStartConfig = {
// 	type: "start" ,
// 	targetButton: document.querySelector(".start")
// };
//
// let buttonStart = new Button(buttonStartConfig);
// let configHandlerEventForButtonStart = {
// 	nameEvent: "click" ,
// 	handler: function (event) {
// 		if(timer.onTimer) {
// 			timer.stopTimeRun();
// 			this.innerHTML = "start";
// 		}else {
// 			timer.timeRun();
// 			this.innerHTML = "stop";
// 		}
// 	}
// };
//
// buttonStart.addEventListenerToButton(configHandlerEventForButtonStart);
//
// let buttonResetConfig = {
// 	type: "reset" ,
// 	targetButton: document.querySelector(".reset")
// };
//
// let buttonReset = new Button(buttonResetConfig);
// let configHandlerEventForButtonReset = {
// 	nameEvent: "click" ,
// 	handler: function (event) {
// 		timer.resetTimer();
// 	}
// };
// buttonReset.addEventListenerToButton(configHandlerEventForButtonReset);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


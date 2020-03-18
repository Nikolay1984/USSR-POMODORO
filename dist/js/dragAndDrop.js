console.log(document.querySelector(".currentSecondsAndMinute"));

function transformElementToCircleSlider(config) {
	//Get target objects from page and create new slider elements

	let target = document.querySelector(config.selectorTargetToPage);
	let outputElem = document.querySelector(config.selectorOutputElem);
	let ratio = config.ratio;
	let ball = document.createElement("div");
	let circleBig = document.createElement("div");
	let circleSmall = document.createElement("div");
	let objNamesOfSlider = config.objNamesOfSlider;

	//Configure slider  elements and add to page

	for (let nameOfArrNamesElem in objNamesOfSlider){
		let arrNames = objNamesOfSlider[nameOfArrNamesElem];
		if(nameOfArrNamesElem === "arrClassNamesBall"){
			addClassNameToElemFromArr(arrNames,ball);
		}else if(nameOfArrNamesElem === "arrClassNamesCircleBig"){
			addClassNameToElemFromArr(arrNames,circleBig);
		}else if(nameOfArrNamesElem === "arrClassNamesCircleSmall"){
			addClassNameToElemFromArr(arrNames,circleSmall);
		}

	}

	circleBig.prepend(ball,circleSmall);
	target.prepend(circleBig);

	//Imitation of drag and drop
	ball.addEventListener("dragstart" , function (e) {
		e.preventDefault();
	});
	ball.addEventListener("mousedown" , function (e) {

		let handlerMousemoveBind = handlerMousemove.bind(this);

		document.addEventListener("mousemove" , handlerMousemoveBind);

		document.addEventListener("mouseup" , function (e) {
			document.removeEventListener("mousemove" , handlerMousemoveBind);
		} , {once: true});

	});

	//Use function
	function addClassNameToElemFromArr(arrNames,elem) {
		for(let i = 0; i < arrNames.length; i++ ){
			elem.classList.add(arrNames[i]);
		}
	}
	function handlerMousemove(e) {
		let ball = this;
		let mouseCords ={
			x: e.clientX,
			y: e.clientY
		};
		let parent = this.offsetParent;
		let parentRadius = parent.offsetWidth/2;
		let ballCords = {
			offsetLeft: ball.offsetLeft,
			offsetTop: ball.offsetTop,
			viewX: ball.getBoundingClientRect().x,
			viewY: ball.getBoundingClientRect().y,
			radius: ball.offsetWidth/2
		};
		let innerRadius = parentRadius - ballCords.radius;

		let mouseCordsDecard = {
			x:(mouseCords.x - ballCords.viewX + ballCords.offsetLeft) - parentRadius ,
			y: (mouseCords.y - ballCords.viewY + ballCords.offsetTop) - parentRadius
		};
		let mouseCordsPolar = {
			angle: Math.atan(mouseCordsDecard.y/mouseCordsDecard.x)
		};
		if(mouseCordsDecard.x<0)
		{
			mouseCordsPolar.angle = mouseCordsPolar.angle + Math.PI
		}


		let targetCordsDecard = {
			x: innerRadius * Math.cos(mouseCordsPolar.angle),
			y: innerRadius * Math.sin(mouseCordsPolar.angle)
		}
		let targetCordsOffset = {
			x: parentRadius + targetCordsDecard.x - ballCords.radius,
			y: parentRadius + targetCordsDecard.y - ballCords.radius
		}

		ball.style.left = targetCordsOffset.x + "px";
		ball.style.top = targetCordsOffset.y + "px";

		outputElem.innerHTML = calculateValuePosition(mouseCordsPolar.angle, innerRadius, ratio);

	}
	function calculateValuePosition(angle, radius, ratio = 1){
		let lengthCircle = radius * 2 * Math.PI;
		let correctAngle = (angle+ Math.PI/2 ) * 57;
		let lengthArc = (correctAngle * Math.PI * radius)/180;
		let resultValue = Math.round(lengthArc/(lengthCircle/100)/ ratio);

		return resultValue;
	}
}

let configTime = {
	selectorOutputElem: ".currentSecondsAndMinute",
	selectorTargetToPage: ".sliderMinute",
	objNamesOfSlider:{
		arrClassNamesBall : ["ball", "ballTime"],
		arrClassNamesCircleBig: ["circleBig", "circleBigTime"],
		arrClassNamesCircleSmall: ["circleSmall", "circleSmallTime"]
	},
	ratio: "2"
}
let configVolume = {
	selectorOutputElem: ".displaySecondsAndMinute",
	selectorTargetToPage: ".sliderVolume",
	objNamesOfSlider:{
		arrClassNamesBall : ["ball", "ballVolume"],
		arrClassNamesCircleBig: ["circleBig", "circleBigVolume"],
		arrClassNamesCircleSmall: ["circleSmall", "circleSmallVolume"]
	},
	ratio: "1"
}
transformElementToCircleSlider(configTime);
transformElementToCircleSlider(configVolume);
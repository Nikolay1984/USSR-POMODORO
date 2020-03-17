let ball = document.querySelector(".ball");

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
	var out = document.querySelector(".out");
	out.innerHTML = calculateValuePosition(mouseCordsPolar.angle, innerRadius, 2);

}
function calculateValuePosition(angle, radius, ratio = 1){
	let correctAngle = (angle+ Math.PI/2 ) * 57;
	let lengthArc = (correctAngle * Math.PI * radius)/180;
	let resultValue = Math.round(lengthArc/8.65/ ratio);
	return resultValue;
}


let config = {
	classNameTargetToPage: ".circle",
	classNameBall : "ball",
	classCircleBig: "circleBig",
	classCircleSmall: "circleSmall",
	ratio: "2"
}

function transformElementToCircleSlider(config) {
	let target = document.querySelector(config.classNameTargetToPage);
	let ball = document.createElement("div")
}
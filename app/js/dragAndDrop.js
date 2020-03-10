let ball = document.querySelector(".ball");

ball.addEventListener("dragstart" , function (e) {
	e.preventDefault();
});

ball.addEventListener("mousedown" , function (e) {

	this.style.zIndex = 1000;
	function handlerMousemove (e) {
		moveAt(e , this);
	}

	this.addEventListener("mousemove" , handlerMousemove);

	this.addEventListener("mouseup" , function (e) {
		this.removeEventListener("mousemove" , handlerMousemove);
	} , {once:true});

});

function moveAt(e , elem) {
	let ballOffsetLeft = elem.offsetLeft;
	let ballOffsetTop = elem.offsetTop;
	let ballOffsetWidth = elem.offsetWidth;
	let ballOffsetHeight = elem.offsetHeight;
	let centerBallX = ballOffsetWidth/2 + ballOffsetLeft;
	let centerBallY = ballOffsetHeight /2 + ballOffsetTop;
	let mouseClickOfViewX = e.clientX;
	let mouseClickOfViewY = e.clientY;
	let offsetParentViewX = elem.offsetParent.getBoundingClientRect().x;
	let offsetParentViewY =  elem.offsetParent.getBoundingClientRect().y;
	let newCenterX = mouseClickOfViewX - offsetParentViewX;
	let newCenterY = mouseClickOfViewY - offsetParentViewY;
	let finalX;
	let finalY;

	if (newCenterY < centerBallY){
		// нужно отнимать
		finalY = ballOffsetTop - (centerBallY - newCenterY);
	}else if (newCenterY > centerBallY){
		// нужно пребавлять
		finalY = ballOffsetTop + ( newCenterY - centerBallY);
	}else{
		let arrfinalY = elem.style.top.split("");
		arrfinalY.splice(arrfinalY.length-2,2);
		finalY = Number(arrfinalY.join(""));
	}

	if(newCenterX < centerBallX){
		finalX = ballOffsetLeft - (centerBallX - newCenterX);
	}else if(newCenterX > centerBallX){
		finalX = ballOffsetLeft + (newCenterX - centerBallX);
	}else{
		let arrfinalX = elem.style.left.split("");
		arrfinalX.splice(arrfinalX.length-2,2);
		finalX = Number(arrfinalX.join(""));
	}

	console.log(finalX,"finalX");
	console.log(finalY,"finalY");

	elem.style.left = finalX + "px";
	elem.style.top = finalY + "px";

}
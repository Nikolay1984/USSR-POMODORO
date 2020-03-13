let ball = document.querySelector(".ball");

ball.addEventListener("dragstart" , function (e) {
	e.preventDefault();
});

ball.addEventListener("mousedown" , function (e) {

	this.style.zIndex = 1000;

	document.addEventListener("mousemove" , handlerMousemove);

	document.addEventListener("mouseup" , function (e) {
		document.removeEventListener("mousemove" , handlerMousemove);
	} , {once: true});

});

	function handlerMousemove(e) {

	}
function moveAt(e , elem) {

	// let ballOffsetLeft = elem.offsetLeft;
	// let ballOffsetTop = elem.offsetTop;
	// let ballRadius = elem.offsetWidth / 2;
	//
	// let radiusParentBig = elem.offsetParent.offsetWidth / 2;
	// let radiusParentSmall = radiusParentBig - (ballRadius * 2);
	//
	// let centerBallX = ballRadius + ballOffsetLeft;
	// let centerBallY = ballRadius + ballOffsetTop;
	//
	// let mouseClickOfViewX = e.clientX;
	// let mouseClickOfViewY = e.clientY;
	// let offsetParentViewX = elem.offsetParent.getBoundingClientRect().x;
	// let offsetParentViewY = elem.offsetParent.getBoundingClientRect().y;
	// let newCenterX = mouseClickOfViewX - offsetParentViewX;
	// let newCenterY = mouseClickOfViewY - offsetParentViewY;
	// let finalX;
	// let finalY;
	//
	// if (newCenterY < centerBallY) {
	// 	// нужно отнимать
	// 	finalY = ballOffsetTop - (centerBallY - newCenterY);
	// } else if (newCenterY > centerBallY) {
	// 	// нужно пребавлять
	// 	finalY = ballOffsetTop + (newCenterY - centerBallY);
	// } else {
	// 	let arrfinalY = elem.style.top.split("");
	// 	arrfinalY.splice(arrfinalY.length - 2 , 2);
	// 	finalY = Number(arrfinalY.join(""));
	// }
	//
	// if (newCenterX < centerBallX) {
	// 	finalX = ballOffsetLeft - (centerBallX - newCenterX);
	// } else if (newCenterX > centerBallX) {
	// 	finalX = ballOffsetLeft + (newCenterX - centerBallX);
	// } else {
	// 	let arrfinalX = elem.style.left.split("");
	// 	arrfinalX.splice(arrfinalX.length - 2 , 2);
	// 	finalX = Number(arrfinalX.join(""));
	// }

	// function offset() {
	//
	//
	// 	let newCenterBallX = finalX + ballRadius;
	// 	let newCenterBallY = finalY + ballRadius;
	// 	let bigHorizonCathet;
	// 	let bigVerticalCathet;
	//
	// 	if(newCenterBallX < radiusParentBig){
	// 		bigHorizonCathet = radiusParentBig - newCenterBallX;
	// 	} else if(newCenterBallX > radiusParentBig){
	// 		bigHorizonCathet = radiusParentBig - ((radiusParentBig*2) - newCenterBallX);
	// 	}
	//
	// 	if(newCenterBallY < radiusParentBig){
	// 				bigVerticalCathet = radiusParentBig - newCenterBallY;
	// 	}else if(newCenterBallY > radiusParentBig){
	// 			bigVerticalCathet = radiusParentBig - ((radiusParentBig*2) - newCenterBallY);
	// 	}
	//
	// 	let bigHypotenuse = Math.sqrt(Math.pow(bigHorizonCathet,2) + Math.pow(bigVerticalCathet,2));
	// 	console.log(bigHypotenuse,bigHorizonCathet,bigVerticalCathet);
	// 	let sinusAlfa = bigHorizonCathet /  bigHypotenuse;
	// 	let smallHypotenuse = Math.abs(radiusParentSmall - bigHypotenuse);
	// 	let smallHorizonCathet = sinusAlfa * smallHypotenuse;
	// 	let smallVerticalCathet = Math.sqrt(Math.pow(smallHypotenuse,2) - Math.pow(smallHorizonCathet,2));
	//
	// 	if(bigHypotenuse > radiusParentSmall){
	// 	finalY = finalY - (smallVerticalCathet - ballRadius );
	// 	finalX = finalX - (smallHorizonCathet - ballRadius );
	// 	}else if(bigHypotenuse < radiusParentSmall){
	// 		finalY = finalY + (smallVerticalCathet - ballRadius );
	// 		finalX = finalX + (smallHorizonCathet - ballRadius );
	// 	}
	//
	// }
	//
	//

	//  function offset(x,y ){
	// 	 let horizonCathet;
	// 	 let verticalCathet;
	// 	 let hypotenuse;
	// 		verticalCathet = Math.abs(centerCircleMiddleToOffsetParentY - centerBallY);
	// 		horizonCathet  = Math.abs(centerCircleMiddleToOffsetParentX - centerBallX);
	// 		hypotenuse = Math.sqrt((horizonCathet * horizonCathet) + (verticalCathet * verticalCathet));
	// 		let ang = verticalCathet/hypotenuse;
	// 		let smallHypotenuse = Math.abs(hypotenuse - circleMiddleRadius);
	// 		let newKatVertical = smallHypotenuse * ang;
	// 	 let newKatHorizon = Math.sqrt((smallHypotenuse*smallHypotenuse) - (newKatVertical*newKatVertical));
	// 	 finalY = centerBallY + newKatVertical;
	// 	 finalX = centerBallX +  newKatHorizon;
	//
	//
	//  }
	//  offset();
	elem.style.left = finalX + "px";
	elem.style.top = finalY + "px";

}
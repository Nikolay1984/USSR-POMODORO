export default function () {
	let currentCountOfWork = document.querySelector(".currentCountOfWork");
	let countOfWorkUp = document.querySelector(".countOfWorkUp");
	let countOfWorkDown = document.querySelector(".countOfWorkDown");

	function handlerClick(e) {
		let targetClassName = e.target.className;
		let currentValue = Number(currentCountOfWork.innerHTML);

		if(targetClassName.indexOf("countOfWorkUp") >= 0){
			currentCountOfWork.innerHTML = ++currentValue;
		}else {
			if(currentValue === 0){
				return
			}
			currentCountOfWork.innerHTML = --currentValue;
		}
	}

	function handlerFocus(e){
		e.target.blur();
	}

	countOfWorkUp.addEventListener("click",handlerClick);
	countOfWorkDown.addEventListener("click",handlerClick);
	countOfWorkUp.addEventListener("focus",handlerFocus);
	countOfWorkDown.addEventListener("focus",handlerFocus);
}
export default function () {
    let checkBeep = document.querySelector(".checkBeep");
    let checkAlarm = document.querySelector(".checkAlarm");

    checkBeep.addEventListener("click" , handlerClick);
    checkAlarm.addEventListener("click" , handlerClick);

    function handlerClick (e){
        let target = e.target;

		 if (target.className.indexOf("checkSoundInput") === -1){
		 	return;
		 }
        if (target.className.indexOf("checkSoundInputActive") >= 0){
            return;
        }

        let currentTarget = e.currentTarget;
        let activeElem = currentTarget.querySelector(".checkSoundInputActive");

        activeElem.classList.remove("checkSoundInputActive");
        // console.dir(activeElem);

		 target.classList.add("checkSoundInputActive");

    }
}
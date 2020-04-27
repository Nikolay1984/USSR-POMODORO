export default function (className) {
    let container = document.querySelector(`.${className}`);
    let arrOfButton = container.querySelectorAll("button");
    let buttonStart = container.querySelector(".start");

    function handlerClick(e){
        let buttonIsReset = e.target.classList.contains("reset");

        if(!buttonIsReset){
            let buttonIsActive = e.target.classList.contains("buttonActive");
            if (buttonIsActive){
                e.target.style.background = "#3a3a3a";
                e.target.style.boxShadow =   "0 0 0 #000000";
                return;
            }
            e.target.style.background = "linear-gradient(to top, #3a3a3a , #8c8b8b)";
            e.target.style.boxShadow =   "0 0 5px #000000";
            return;
        }
        e.target.style.background = "#3a3a3a";
        e.target.style.boxShadow =   "0 0 0 #000000";
        setTimeout(()=>{
            e.target.style.background = "linear-gradient(to top, #3a3a3a , #8c8b8b)";
            e.target.style.boxShadow =   "0 0 5px #000000";
            buttonStart.style.background = "linear-gradient(to top, #3a3a3a , #8c8b8b)";
            buttonStart.style.boxShadow =   "0 0 5px #000000";

            }, 500);

    }
    arrOfButton.forEach(button=>{
        button.addEventListener("click",handlerClick);
    });
}
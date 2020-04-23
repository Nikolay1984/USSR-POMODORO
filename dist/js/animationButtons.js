export default function (className) {
    let container = document.querySelector(`.${className}`);
    let arrOfButton = container.querySelectorAll("button");
    function hendlerClick(e){
        let buttonIsReset = e.target.classList.contains("reset");

        if(!buttonIsReset){
            let buttonIsActive = e.target.classList.contains("buttonActive");
            if (buttonIsActive){
                console.log(buttonIsActive);
                e.target.style.background = "#3a3a3a";
            }
            //TODO
        }


    }
    arrOfButton.forEach(button=>{button.addEventListener("click",hendlerClick)});
}
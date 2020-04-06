export default function () {
    function handlerChangeOfRound(arr){
        let outputElement = document.querySelector(".currentCountOfWork")
        let value = Number(arr[ 0 ].target.innerText);
        let parentHeight = document.querySelector(".displayOfTime").offsetWidth;
        let pos = ((value * parentHeight) / 15) - 8 ;



        if (pos <= 1){
            pos = 0;
        }

        square.style.left =  pos + "px";
        outputElement.innerHTML = value;

        
        
        
        
        
        
    }
    function handlerMouseDownTime(){
        let deactivate = document.querySelector(".deactivate");

        if(deactivate){
            return
        }


        let self = this;
        let position = {
            top  : square.offsetTop - 20 + "px" ,
            left : square.offsetLeft + 5 + "px" ,
        };

        roundHidden.style.display = "block";
        roundHidden.style.top = position.top;
        roundHidden.style.left = position.left;

        function handlerMove(e) {
            let deactivate = document.querySelector(".deactivate");

            if(deactivate){
                return
            }

            roundHidden.style.top = square.offsetTop - 20 + "px";
            roundHidden.style.left = square.offsetLeft + 5 + "px";


        }

        document.addEventListener("mousemove" , handlerMove);

        document.addEventListener("mouseup" , function () {
            document.removeEventListener("mousemove" , handlerMove);
            roundHidden.style.display = "none";
        } , {
            once: true ,
        });
    }
    let square = document.querySelector(".labelRound ");

    let roundHidden = document.querySelector(".roundHidden ");
    let configMutationObserver = {
        childList     : true ,
        characterData : true ,
    };

    let observeOfRoundHidden = new MutationObserver(handlerChangeOfRound);
    observeOfRoundHidden.observe (roundHidden , configMutationObserver);

    let circleBig = document.querySelector(".circleBigRound ");
    let ballTime = circleBig.querySelector(".ballTime");

    ballTime.addEventListener("mousedown" , handlerMouseDownTime);

    let ballHeight = ballTime.offsetHeight;
    let circleBigHeight = circleBig.offsetHeight;
    ballTime.style.top = (circleBigHeight - ballHeight)/2 + "px";
    ballTime.style.left = circleBigHeight - ballHeight+ "px";
    roundHidden.innerHTML = "3";

}
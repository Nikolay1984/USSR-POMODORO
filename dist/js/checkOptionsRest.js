export default function () {
    function handlerChangeOfRest(arr){
        let triangle;
        let maxRange;

        if(arr[ 0 ].target.className === "bigRestHidden" ){
            maxRange = 30;
            triangle = document.querySelector(".labelBigRest");

        }
        else if(arr[ 0 ].target.className === "restHidden"){
            maxRange = 10;
            triangle = document.querySelector(".labelRest");
        }

        let value = Number(arr[ 0 ].target.innerText);
        let parentHeight = document.querySelector(".displayOfRests").offsetHeight;
        let lengthRange = parentHeight - ((parentHeight * 6) / 100);
        let offset = ((parentHeight * 3) / 100);
        let pos = (value * lengthRange / maxRange) - offset;
        if(pos <= 1){
            pos = offset; 
        }

        triangle.style.top = pos + "px";
    }
    function handlerMouseDownRest(e) {
        let self = this;
        let display;
        let position;
        if(this.closest(".controlMinuteOfBigRest")){
            display = bigRestHidden;
            position = {
                top: labelBigRest.offsetTop - 20 + "px" ,
                left: labelBigRest.offsetLeft + "px" ,
            };
        }
        else if (this.closest(".controlMinuteOfRest")){
            display = restHidden;
            position = {
                top: labelRest.offsetTop - 20 + "px" ,
                left: labelRest.offsetLeft - 20 + "px" ,
            };
        }
        display.style.display = "block";
        display.style.top = position.top;
        display.style.left = position.left;

        function handlerMove(e) {
            if(self.closest(".controlMinuteOfBigRest")){
                bigRestHidden.style.top = labelBigRest.offsetTop - 20 + "px";
                bigRestHidden.style.left = labelBigRest.offsetLeft + "px";
            }
            else if (self.closest(".controlMinuteOfRest")){
                restHidden.style.top = labelRest.offsetTop - 20 + "px";
                restHidden.style.left = labelRest.offsetLeft - 20 + "px";
            }

        }

        document.addEventListener("mousemove" , handlerMove);

        document.addEventListener("mouseup" , function () {
            document.removeEventListener("mousemove" , handlerMove);
            bigRestHidden.style.display = "none";
            restHidden.style.display = "none";
        } , {
            once: true , 
        });
    }
    let bigRestHidden = document.querySelector(".bigRestHidden");
    let restHidden = document.querySelector(".restHidden");
    let configMutationObserver = {
        childList:true ,
        characterData:true ,
    };

    let observeOfBigRestHidden = new MutationObserver(handlerChangeOfRest);
    observeOfBigRestHidden.observe(bigRestHidden , configMutationObserver);

    let observeOfRestHidden = new MutationObserver(handlerChangeOfRest);
    observeOfRestHidden.observe( restHidden , configMutationObserver);

    let controlMinuteOfBigRest = document.querySelector(".controlMinuteOfBigRest");
    let controlMinuteOfRest = document.querySelector(".controlMinuteOfRest");

    let controlMinuteOfBigRestBall = controlMinuteOfBigRest.querySelector(".ball ");
    let controlMinuteOfRestBall = controlMinuteOfRest.querySelector(".ball ");

    let labelBigRest = document.querySelector(".labelBigRest");
    let labelRest = document.querySelector(".labelRest");

    controlMinuteOfBigRestBall.addEventListener("mousedown" , handlerMouseDownRest);
    controlMinuteOfRestBall.addEventListener("mousedown" , handlerMouseDownRest);


    let circleBig = document.querySelector(".sliderBigRest ");
    let ballHeight = controlMinuteOfBigRestBall.offsetHeight;
    let circleBigHeight = circleBig.offsetHeight;
    controlMinuteOfBigRestBall.style.top = circleBigHeight - ballHeight + "px";
    controlMinuteOfRestBall.style.top = circleBigHeight - ballHeight + "px";
    bigRestHidden.innerHTML = 15;
    restHidden.innerHTML = 5;
}
export default function () {



    let circleBig =  document.querySelector(".circleBigTime ");
    let ballTime = circleBig.querySelector(".ballTime")
    let ballHeight = ballTime.offsetHeight;
    let circleBigHeight = circleBig.offsetHeight;
    ballTime.style.top = (circleBigHeight - ballHeight)/2 + "px";
    ballTime.style.left = circleBigHeight - ballHeight+ "px";











}
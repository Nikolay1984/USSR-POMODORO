
function handler( arr ) {

    console.log( arr[ 0 ].addedNodes );

}

const {
    body ,
} = document;
const configObserver = {
    childList: true ,
};
const observerBody = new MutationObserver( handler );
observerBody.observe( body , configObserver );
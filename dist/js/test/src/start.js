"use strict";

function handler(arr) {
  console.log(arr[0].addedNodes);
}

let body = document.body;
let configObserver = {
  childList: true
};
let observerBody = new MutationObserver(handler);
observerBody.observe(body, configObserver);
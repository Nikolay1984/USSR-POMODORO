"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Button {
  constructor(configButton) {
    this.state = false;
    this.configHandlerEvent = null;
    this.type = configButton.type;
    this.targetButton = configButton.targetButton;
  }

  toggle() {}

  addEventListenerToButton(configHandlerEvent) {}

}

exports.default = Button;
module.exports = exports.default;
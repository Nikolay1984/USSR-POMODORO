var assert = require('chai').assert;
var Button = require("./Button.js");
require('jsdom-global')();


describe('class Button', function() {
	let startButton,configButton,instanceButton;

	describe("create work instance",function () {

		beforeEach(function () {
			startButton = document.createElement("button");
			startButton.classList.add("start");
			configButton = {
				type:"start",
				targetButton: startButton
			};
			instanceButton = new Button(configButton);

		});
		afterEach(function () {
			startButton = null;
			configButton = null;
			instanceButton = null;
		});

		it('instance should has state ', function() {
			let currentState = instanceButton.state;
			assert.isFalse(currentState)
		});
		it('instance should has configHandlerEvent ', function() {
			let currentConfigHandlerEvent = instanceButton.configHandlerEvent;
			assert.isNull(currentConfigHandlerEvent)
		});
		it('instance should has type ', function() {
			let currentType = instanceButton.type;
			assert.typeOf(currentType,"string")
		});
		it('instance should has targetButton ', function() {
					let currentTargetButton = instanceButton.targetButton;
					assert.equal(currentTargetButton.tagName,'BUTTON')
		});

	});
	describe("toggle",function () {
		beforeEach(function () {
			startButton = document.createElement("button");
			startButton.classList.add("start");
			configButton = {
				type:"start",
				targetButton: startButton
			};
			instanceButton = new Button(configButton);

		});
		afterEach(function () {
			startButton = null;
			configButton = null;
			instanceButton = null;
		});

		it('should toggle state', function() {
			instanceButton.toggle();
			assert.isTrue(instanceButton.state);
			instanceButton.toggle();
			assert.isFalse(instanceButton.state);

		});
	});
	// describe("addEventListenerToButton",function () {
	// 	it('should add  EventListener To Button', function() {
	// 	});
	// })


});



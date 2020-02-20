var assert = require("chai").assert;
var expect = require("chai").expect;
var Timer = require("./src/Timer.js");

describe("class Timer" , function() {
	let instTimer ;
	it("create work instance" , function(){
		instTimer = new Timer();
		assert.typeOf(instTimer , "object");
		instTimer = null;
	});


});
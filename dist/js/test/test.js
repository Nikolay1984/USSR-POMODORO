var assert = require('chai').assert;
var Button = require("./Button.js");

 var instBut = new Button.Button();

describe('check Hi', function() {
	it('should return Hi', function() {
		var res = instBut.sayHi();
		assert.equal(res,"Hi");
	});
});



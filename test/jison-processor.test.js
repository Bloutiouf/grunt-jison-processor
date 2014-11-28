'use strict';

var fs = require('fs');
var grunt = require('grunt');
var path = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['jison-ext'] = {
	setUp: function(done) {
		done();
	},
	calculator: function(test) {
		var dir = path.join('tmp', 'calculator');
		var files = fs.readdirSync(dir);
		
		files.forEach(function(file) {
			var ext = path.extname(file);
			var expected = path.basename(file, ext);
			
			var actual = fs.readFileSync(path.join(dir, file)).toString();
			
			test.equal(actual, expected, 'should match.');
		});
		
		test.done();
	},
	'calculator-parser': function(test) {
		var calculator = require('../tmp/calculator-parser.js');
		
		var dir = path.join('test', 'calculator');
		var files = fs.readdirSync(dir);
		
		files.forEach(function(file) {
			var ext = path.extname(file);
			var expected = path.basename(file, ext);
			var content = fs.readFileSync(path.join(dir, file)).toString();
			
			var actual = calculator.parse(content);
			
			test.equal(actual, expected, 'should match.');
		});
		
		test.done();
	}
};

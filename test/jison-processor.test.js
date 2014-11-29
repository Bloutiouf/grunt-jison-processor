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

function testParser(name) {
	return function(test) {
		var dir = path.join('tmp', name);
		var files = fs.readdirSync(dir);
		
		files.forEach(function(file) {
			var ext = path.extname(file);
			var expected = path.basename(file, ext);
			
			var actual = fs.readFileSync(path.join(dir, file)).toString();
			
			test.strictEqual(actual, expected, 'should match.');
		});
		
		var calculator = require('../tmp/' + name + '.js');
		
		dir = path.join('test', 'calculator');
		files = fs.readdirSync(dir);
		
		files.forEach(function(file) {
			var ext = path.extname(file);
			var expected = path.basename(file, ext);
			var content = fs.readFileSync(path.join(dir, file)).toString();
			
			var actual = calculator.parse(content);
			
			test.equal(actual, expected, 'should match.');
		});
		
		test.done();
	};
}

exports['jison-ext'] = {
	'calculator-jison': testParser('calculator-jison'),
	'calculator-js': testParser('calculator-js'),
	'calculator-json': testParser('calculator-json'),
	'equality': function(test) {
		var calculatorJison = fs.readFileSync(path.join('tmp', 'calculator-jison.js')).toString(),
			calculatorJs = fs.readFileSync(path.join('tmp', 'calculator-js.js')).toString(),
			calculatorJson = fs.readFileSync(path.join('tmp', 'calculator-json.js')).toString();
		
		test.strictEqual(calculatorJison, calculatorJs, 'should match.');
		test.strictEqual(calculatorJison, calculatorJson, 'should match.');
		
		test.done();
	}
};

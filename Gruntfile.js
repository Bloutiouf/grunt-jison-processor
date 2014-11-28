/*
 * grunt-jison-processor
 * https://github.com/Bloutiouf/grunt-jison-processor
 *
 * Copyright (c) 2014 Bloutiouf
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		clean: {
			tests: ['tmp']
		},

		'jison-processor': {
			options: {
				grammar: 'test/calculator.json'
				// grammar: 'test/calculator.jison'
				// grammar: require('./test/calculator.js')
			},
			calculator: {
				files: {
					'tmp/calculator': 'test/calculator/*'
				}
			},
			'calculator-parser': {
				options: {
					output: 'tmp/calculator-parser.js'
				}
			}
		},

		nodeunit: {
			tests: ['test/*.test.js']
		}

	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['clean', 'jison-processor', 'nodeunit']);

	grunt.registerTask('default', ['jshint', 'test']);

};

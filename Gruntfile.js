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
			'calculator-jison': {
				options: {
					grammar: 'test/calculator.jison',
					output: 'tmp/calculator-jison.js'
				},
				files: {
					'tmp/calculator-jison': 'test/calculator/*'
				}
			},
			'calculator-js': {
				options: {
					grammar: require('./test/calculator.js'),
					output: 'tmp/calculator-js.js'
				},
				files: {
					'tmp/calculator-js': 'test/calculator/*'
				}
			},
			'calculator-json': {
				options: {
					grammar: 'test/calculator.json',
					output: 'tmp/calculator-json.js'
				},
				files: {
					'tmp/calculator-json': 'test/calculator/*'
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

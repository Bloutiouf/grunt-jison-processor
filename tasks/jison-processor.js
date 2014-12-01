/*
 * grunt-jison-processor
 * https://github.com/Bloutiouf/grunt-jison-processor
 *
 * Copyright (c) 2014 Bloutiouf
 * Licensed under the MIT license.
 */

'use strict';

var ebnfParser = require('ebnf-parser');
var jison = require('jison');
var lexParser = require('lex-parser');
var path = require('path');

module.exports = function(grunt) {
	
	grunt.registerMultiTask('jison-processor', 'Parse files based on grammars, generate standalone parsers, or both.', function() {
		var options = this.options({
			name: 'parser',
			parser: 'lalr',
			type: 'commonjs'
		});
		
		
		var grammarSource = options.grammar;
		if (typeof grammarSource === 'string' && grunt.file.exists(grammarSource)) {
			grammarSource = grunt.file.read(grammarSource);
		}
		
		var grammar;
		if (typeof grammarSource === 'string') {
			try {
				grammar = ebnfParser.parse(grammarSource);
			} catch(err) {
				try {
					grammar = JSON.parse(grammarSource);
					if (grammar.ebnf) {
						grammar = ebnfParser.transform(grammar);
					}
				} catch(err) {
					grunt.fatal('Cannot parse options.grammar');
				}
			}
		} else if (typeof grammarSource === 'object') {
			if (grammarSource.ebnf) {
				grammar = ebnfParser.transform(grammarSource);
			} else {
				grammar = grammarSource;
			}
		} else {
			grunt.fatal('options.grammar required');
		}
		
		
		var lexerSource = options.lexer;
		if (typeof lexerSource === 'string' && grunt.file.exists(lexerSource)) {
			lexerSource = grunt.file.read(lexerSource);
		}
		
		if (typeof lexerSource === 'string') {
			try {
				grammar.lex = lexParser.parse(lexerSource);
			} catch(err) {
				try {
					grammar.lex = JSON.parse(lexerSource);
				} catch(err) {
					grunt.fatal('Cannot parse options.lexer');
				}
			}
		} else if (typeof lexerSource === 'object') {
            grammar.lex = lexerSource;
		}
        
		
		if (options.output) {
			var settings = {
				debug: options.debug,
				moduleName: options.name,
				moduleParser: options.parser,
				moduleType: options.type
			};
			
			var generator = new jison.Generator(grammar, settings);
			var parserSource = generator.generate(settings);
			grunt.file.write(options.output, parserSource);
		}
		
		
		var parser = new jison.Parser(grammar);
		
		function compile(src, dest) {
			src = grunt.file.read(src);
			var compiled = parser.parse(src);
			grunt.file.write(dest, compiled);
		}
		
		this.files.forEach(function(file) {
			if (file.src.length === 1) {
				compile(file.src[0], file.dest);
			} else if (file.src.length > 1) {
				file.src.forEach(function(src) {
					compile(src, path.join(file.dest, path.basename(src)));
				});
			} else {
				grunt.log.writeln(file.dest + ' has no sources, skipping');
			}
		});
	});
	
};

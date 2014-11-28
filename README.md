# grunt-jison-processor

Parse files based on grammars, optionally generate standalone parsers.  

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jison-processor --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jison-processor');
```

## The "jison-processor" task

### Overview

In your project's Gruntfile, add a section named `jison-processor` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'jison-processor': {
    options: {
      // Global options go here.
    },
    target: {
      options: {
        // Task-specific options go here.
      },
      files: {
        dest: [ src ]
      }
    }
  }
});
```

### Options

#### options.debug
Type: `boolean`
Default: `false`

If set to `true`, displays information about the parser.

#### options.grammar
Type: `object|string`
Mandatory

The grammar that defines the parser. It may include a lexical grammar and can contain EBNF.

If it's a `object`, it is a grammar JSON representation used by [Jison](http://zaach.github.io/jison/). If it's a `string`, it contains either a JSON grammar, a Jison grammar, or a path to a file that contains either a JSON or Jison grammar.

More information on <http://zaach.github.io/jison/docs/#specifying-a-language>

#### options.lexer
Type: `object|string`

If defined, overrides the lexical grammar included in `options.grammar`, if any.

The format is the same as for `options.grammar`.

#### options.name
Type: `string`
Default: `parser`

The name of the parser variable. Useful only when `grammar.output` is defined and `grammar.type` is `js`.

#### options.output
Type: `string`

If defined, saves the parser to this file.

#### options.parser
Type: `string`
Default: `lalr`

The algorithm to use for the parser. Possible values are `lalr`, `ll`, `lr`, `lr0`, and `slr`.

#### options.type
Type: `string`
Default: `commonjs`

The type of module generated. Possible values are `amd`, `commonjs`, and `js`. Useful only when `grammar.output` is defined.

### Files

`files` is an object where keys are a `destination` and values are `sources`.

If the `sources` consist of a single file, its content is parsed and the result is written in the _file_ `destination`

If the `sources` consist of several files, their content is parsed and the results are written in the _directory_ `destination`, the files have the same name as their corresponding source.

If there are no `sources`, the `destination` is skipped and nothing is generated.

### Usage example

This is the actual test targets for the module. The target `calculator` computes math formulas, whereas the target `calculator-parser` generates a parser for such formulas.

The calculator grammar is an example from [Jison](https://github.com/zaach/jison). 

```js
grunt.initConfig({
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
	}
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 1.0.0

* grunt-jison-processor is born \o/
* processes files based on grammar
* optionally generates standalone parsers
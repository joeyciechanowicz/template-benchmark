const Benchmark = require('benchmark');
const prettifyBenchmark = require('./prettify-benchmark');

const reactRender = require('./react');
const handlebarsRender = require('./handlebars');
const dustRender = require('./dust');
const dotRender = require('./dot');
const preactRender = require('./preact');
const mustacheRender = require('./mustache');

const suite = new Benchmark.Suite('Template');


// Run all our renderer's once so that any caches are initialised.
reactRender();
dustRender();
handlebarsRender();
dotRender();
preactRender();
mustacheRender();

suite.add('React', reactRender)
	.add('Dust', dustRender)
	.add('Handlebars', handlebarsRender)
	.add('doT', dotRender)
	.add('Preact', preactRender)
	.add('Mustache', mustacheRender);

prettifyBenchmark(suite);

suite.run({async: false});

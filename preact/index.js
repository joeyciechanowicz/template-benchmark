const render = require('preact-render-to-string');
const page = require('./page');

const data = require('../data.json');

function preactRender() {
	return render(page(data));
}

module.exports = preactRender;

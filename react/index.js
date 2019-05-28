const ReactDOMServer = require('react-dom/server');

const data = require('../data.json');

const page = require('./page.js');

function reactRenderStatic() {
  return ReactDOMServer.renderToStaticMarkup(page(data));
}

module.exports = reactRenderStatic;
const Mustache = require('mustache');

const data = require('../data.json');

const headerTemplate = `
<header class="""c-header">
	<a href="/home">Home</a>
</header>
`;

const pokemonTemplate = `
<li>
	<h2>{{Name}}{{#Type2}} - {{Type2}}{{/Type2}}</h2>
	<p>
		<span>HP: {{HP}}</span>
		<span>Attack: {{Attack}}</span>
		<span>Defense: {{Defense}}</span>
		<span>Speed: {{Speed}}</span>
		<span>Generation: {{Generation}}</span>
		<span>Legendary: {{Legendary}}</span>
	</p>
</li>
`;

const pokemonGroupTemplate = `
<section>
	<h1>{{gropuName}}</h1>

	<ul>
		{{#pokemon}}
			{{> pokemon}}
		{{/pokemon}}
	</ul>
</section>
`;

const pageTemplate = `
<div>
	{{> header}}

	<main>
		{{#groups}}
			{{> pokemon-group}}
		{{/groups}}
	</main>
</div>
`;

Mustache.parse(headerTemplate);
Mustache.parse(pokemonTemplate);
Mustache.parse(pokemonGroupTemplate);
Mustache.parse(pageTemplate);

function mustacheRender() {
	return Mustache.render(pageTemplate, data, {
		header: headerTemplate,
		'pokemon-group': pokemonGroupTemplate,
		pokemon: pokemonTemplate
	});
}

module.exports = mustacheRender;

const Handlebars = require('handlebars');
const data = require('../data.json');

Handlebars.registerPartial('header', `
<header class="""c-header">
	<a href="/home">Home</a>
</header>
`);

Handlebars.registerPartial('pokemon', `
<li>
	<h2>{{this.Name}}{{#if this.Type2}} - {{this.Type2}}{{/if}}</h2>
	<p>
		<span>HP: {{this.HP}}</span>
		<span>Attack: {{this.Attack}}</span>
		<span>Defense: {{this.Defense}}</span>
		<span>Speed: {{this.Speed}}</span>
		<span>Generation: {{this.Generation}}</span>
		<span>Legendary: {{this.Legendary}}</span>
	</p>
</li>
`);


Handlebars.registerPartial('pokemon-group', `
<section>
	<h1>{{groupName}}</h1>

	<ul>
		{{#each pokemon}}
			{{> pokemon}}
		{{/each}}
	</ul>
</section>
`);

const handleBarsTemplate = Handlebars.compile(`
<div>
	{{> header}}

	<main>
		{{#each groups}}
			{{> pokemon-group}}
		{{/each}}		
	</main>
</div>
`);

function handlebarsRender() {
	return handleBarsTemplate(data);
}

module.exports = handlebarsRender;
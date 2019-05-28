const dot = require('dot');
const data = require('../data.json');

const dotTemplate = dot.template(`
{{##def.header:
<header class="c-header">
	<a href="/home">Home</a>
</header>
#}}

{{##def.pokemon:
<li>
	<h2>{{=pokemon.Name}}{{?pokemon.Type2}} - {{=pokemon.Type2}}{{?}}</h2>
	<p>
		<span>HP: {{=pokemon.HP}}</span>
		<span>Attack: {{=pokemon.Attack}}</span>
		<span>Defense: {{=pokemon.Defense}}</span>
		<span>Speed: {{=pokemon.Speed}}</span>
		<span>Generation: {{=pokemon.Generation}}</span>
		<span>Legendary: {{=pokemon.Legendary}}</span>
	</p>
</li>
#}}

{{##def.pokemongroup:
<section>
	<h1>{{=value.groupName}}</h1>

	<ul>
		{{~value.pokemon :pokemon}}
			{{#def.pokemon}}
		{{~}}
	</ul>
</section>
#}}

<div>
	{{#def.header}}

	<main>
		{{~it.groups :value:index}}
			{{#def.pokemongroup}}
		{{~}}	
	</main>
</div>
`);


function dotRender() {
	return dotTemplate(data);
}

module.exports = dotRender;
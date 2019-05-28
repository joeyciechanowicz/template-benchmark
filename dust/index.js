const dust = require('dustjs-linkedin');
const data = require('../data.json');

const compile = (name, source) => {
	const compiled = dust.compile(source, name);
	dust.loadSource(compiled);
};

compile('header', `
<header class"c-header">
	<a href="/home">Home</a>
</header>
`);

compile('pokemon', `
<li>
	<h2>{pokemon.Name}{?pokemon.Type2} - {pokemon.Type2}{/pokemon.Type2}</h2>
	<p>
		<span>HP: {pokemon.HP}</span>
		<span>Attack: {pokemon.Attack}</span>
		<span>Defense: {pokemon.Defense}</span>
		<span>Speed: {pokemon.Speed}</span>
		<span>Generation: {pokemon.Generation}</span>
		<span>Legendary: {pokemon.Legendary}</span>
	</p>
</li>
`);


compile('pokemon-group', `
<section>
	<h1>{groupName}</h1>

	<ul>
		{#pokemon}}
			{>"pokemon" pokemon=./}
		{/pokemon}
	</ul>
</section>
`);


compile('page', `
<div>
	{>"header"/}

	<main>
		{#groups}
			{>"pokemon-group"/}
		{/groups}		
	</main>
</div>
`);

function dustRender() {
	let value;
	dust.render('page', data, function (err, out) {
		value = out;
	});
	return value;
}

module.exports = dustRender
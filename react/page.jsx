const React = require('React');

const Pokemon = function(props) {
	return (
		<li>
			<h2>{props.Name}{props.Type2 ? ' - ' + props.Type2 : ''}</h2>
			<p>
				<span>HP: {props.HP}</span>
				<span>Attack: {props.Attack}</span>
				<span>Defense: {props.Defense}</span>
				<span>Speed: {props.Speed}</span>
				<span>Generation: {props.Generation}</span>
				<span>Legendary: {props.Legendary}</span>
			</p>
		</li>
	);
};

const PokemonGroup = function(props) {
	return (
		<section>
			<h1>{props.name}</h1>

			<ul>
				{props.pokemon.map(x => <Pokemon key={x.Id} {...x} />)}
			</ul>
		</section>
	);
};

const Header = function(props) {
	return (
		<header className={"c-header"}>
			<a href="/home">Home</a>
		</header>
	);
};

/**
 *
 * @param props expects {groups: [...]}
 * @returns {*}
 */
module.exports = function(props) {
	return (
		<div>
			<Header />

			<main>
				{props.groups.map(group => <PokemonGroup key={group.groupName} name={group.groupName} pokemon={group.pokemon} />)}
			</main>
		</div>
	);
}
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const React = require('React');

const Pokemon = function (props) {
  return React.createElement("li", null, React.createElement("h2", null, props.Name, props.Type2 ? ' - ' + props.Type2 : ''), React.createElement("p", null, React.createElement("span", null, "HP: ", props.HP), React.createElement("span", null, "Attack: ", props.Attack), React.createElement("span", null, "Defense: ", props.Defense), React.createElement("span", null, "Speed: ", props.Speed), React.createElement("span", null, "Generation: ", props.Generation), React.createElement("span", null, "Legendary: ", props.Legendary)));
};

const PokemonGroup = function (props) {
  return React.createElement("section", null, React.createElement("h1", null, props.name), React.createElement("ul", null, props.pokemon.map(x => React.createElement(Pokemon, _extends({
    key: x.Id
  }, x)))));
};

const Header = function (props) {
  return React.createElement("header", {
    className: "c-header"
  }, React.createElement("a", {
    href: "/home"
  }, "Home"));
};
/**
 *
 * @param props expects {groups: [...]}
 * @returns {*}
 */


module.exports = function (props) {
  return React.createElement("div", null, React.createElement(Header, null), React.createElement("main", null, props.groups.map(group => React.createElement(PokemonGroup, {
    key: group.groupName,
    name: group.groupName,
    pokemon: group.pokemon
  }))));
};

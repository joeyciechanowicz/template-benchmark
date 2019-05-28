function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  h
} = require('preact'); // Tell Babel to transform JSX into h() calls:

/** @jsx h */


const Pokemon = function (props) {
  return h("li", null, h("h2", null, props.Name, props.Type2 ? ' - ' + props.Type2 : ''), h("p", null, h("span", null, "HP: ", props.HP), h("span", null, "Attack: ", props.Attack), h("span", null, "Defense: ", props.Defense), h("span", null, "Speed: ", props.Speed), h("span", null, "Generation: ", props.Generation), h("span", null, "Legendary: ", props.Legendary)));
};

const PokemonGroup = function (props) {
  return h("section", null, h("h1", null, props.name), h("ul", null, props.pokemon.map(x => h(Pokemon, _extends({
    key: x.Id
  }, x)))));
};

const Header = function (props) {
  return h("header", {
    className: "c-header"
  }, h("a", {
    href: "/home"
  }, "Home"));
};
/**
 *
 * @param props expects {groups: [...]}
 * @returns {*}
 */


module.exports = function (props) {
  return h("div", null, h(Header, null), h("main", null, props.groups.map(group => h(PokemonGroup, {
    key: group.groupName,
    name: group.groupName,
    pokemon: group.pokemon
  }))));
};

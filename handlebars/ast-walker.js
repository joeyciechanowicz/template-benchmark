const Handlebars = require('handlebars');

class Visitor {
	accept(object, options = {}) {
		if (!object) {
			var x = 5;
		}

		switch (object.type) {
			case 'Program':
				return this.program(object);
			case 'ContentStatement':
				return this.content(object);
			case 'PartialStatement':
				return this.partial(object);
			case 'BlockStatement':
				return this.block(object);

			default: {
				console.log(`No handler for ${object.type}`);
			}
		}

		return object;
	}

	/**
	 Serializes a `Handlebars.AST.ProgramNode`
	 @method program
	 @param {Handlebars.AST.ProgramNode} program
	 @return {String} The serialized string
	 */
	program(programNode) {
		return (programNode.body || []).reduce((joined, statement) => {
			joined += this.accept(statement);
			return joined;
		}, '');
	}

	/**
	 Serializes a `Handlebars.AST.BlockNode`
	 @method block
	 @param {Handlebars.AST.BlockNode} block
	 @return {String} The serialized string
	 */
	block(blockNode) {
		let out = this.accept(blockNode.path, {
			openingTag: true
		});

		if (blockNode.program) {
			out += this.accept(blockNode.program);
		}

		if (blockNode.inverse) {
			const inverse = this.accept(blockNode.inverse);
			out += `{{^}}${inverse}`;
		}

		return `${out}{{/${this.accept(blockNode.params[0])}}}`;
	}

	/**
	 Serializes a `Handlebars.AST.MustacheNode`.
	 Pass `{openingTag: true}` option to get an opening tag for a block
	 @method mustache
	 @param {Handlebars.AST.MustacheNode} mustache
	 @param {Object} options
	 @return {String} The serialized string
	 */
	mustache(mustacheNode, options) {
		let paramStrings = '';

		(mustacheNode.params || []).reduce((joined, curr) => {
			joined += ` ${self.accept(curr)}`;
			return joined;
		}, '');

		const hash = mustacheNode.hash ? this.accept(mustacheNode.hash) : '';
		const hashmarkOrEmptyString = options.openingTag ? '#' : '';
		let out = `{{${hashmarkOrEmptyString}`;

		out += this.accept(mustacheNode.id) + paramStrings + hash;
		out += '}}';

		if (mustacheNode.escaped) {
			return out;
		}

		return `{${out}}`;
	}

	/**
	 Serializes a `Handlebars.AST.PartialNode`
	 @method partial
	 @param {Handlebars.AST.PartialNode} partial
	 @return {String} The serialized string
	 */
	partial(partialNode) {
		let content = this.accept(partialNode.name.original);

		if (partialNode.context) {
			const context = partialNode.context;
			const acceptedContext = this.accept(context);

			content += ` ${acceptedContext}`;
		}

		return `{{>${content}}}`;
	}

	/**
	 Serializes a `Handlebars.AST.HashNode`
	 @method hash
	 @param {Handlebars.AST.HashNode} hash
	 @return {String} The serialized string
	 */
	hash(hashNode) {
		let out = '';

		const self = this;
		(hashNode.pairs || []).forEach(function (pair) {
			out += ' ' + pair[0] + '=' + self.accept(pair[1]);
		});

		return out;
	}

	/**
	 Serializes a `Handlebars.AST.StringNode`
	 @method STRING
	 @param {Handlebars.AST.StringNode} string
	 @return {String} The serialized string
	 */
	STRING(string) {
		return `"${string.string}"`;
	}

	/**
	 Serializes a `Handlebars.AST.IntegerNode`
	 @method INTEGER
	 @param {Handlebars.AST.IntegerNode} integer
	 @return {String} The serialized string
	 */
	INTEGER(integer) {
		return integer.integer;
	}

	/**
	 Serializes a `Handlebars.AST.BooleanNode`
	 @method BOOLEAN
	 @param {Handlebars.AST.BooleanNode} bool
	 @return {String} The serialized string
	 */
	BOOLEAN(boolean) {
		return boolean.bool;
	}

	/**
	 Serializes a `Handlebars.AST.PartialNameNode`
	 @method PARTIAL_NAME
	 @param {Handlebars.AST.PartialNameNode} partialName
	 @return {String} The serialized string
	 */
	PARTIAL_NAME(partialName) {
		return partialName.name;
	}

	/**
	 Serializes a `Handlebars.AST.IdNode`
	 @method ID
	 @param {Handlebars.AST.IdNode} id
	 @return {String} The serialized string
	 */
	ID(id) {
		return id.string;
	}

	/**
	 Serializes a `Handlebars.AST.DataNode`
	 @method DATA
	 @param {Handlebars.AST.BlockNode} data
	 @return {String} The serialized string
	 */
	DATA(data) {
		const id = this.accept(data.id);
		return `@${id}`;
	}

	/**
	 Serializes a `Handlebars.AST.ContentNode`
	 @method content
	 @param {Handlebars.AST.ContentNode} content
	 @return {String} The serialized string
	 */
	content(contentNode) {
		return contentNode.string;
	}

	/**
	 Serializes a `Handlebars.AST.CommentNode`
	 @method comment
	 @param {Handlebars.AST.BlockNode} comment
	 @return {String} The serialized string
	 */
	comment(commentNode) {
		return `{{!--${commentNode.comment}--}}`;
	}
}

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

const ast = Handlebars.parse(`
<div>
	{{> header}}

	<main>
		{{#each groups}}
			{{> pokemon-group}}
		{{/each}}		
	</main>
</div>
`);

const visitor = new Visitor();
const output = visitor.accept(ast);
console.log(output);



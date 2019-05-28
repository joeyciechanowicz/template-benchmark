const {table} = require('table');

module.exports = function (suite) {
	const results = [
		[
			'Name', 'Ops/sec', 'Average', 'Error', 'Samples', ''
		].map(text => `'${text}\u001b[0m`)
	];

	suite.on('cycle', function (event) {
		const t = event.target;

		results.push([
			t.name,
			+(t.hz.toFixed(2)),
			(t.stats.mean * 1000).toFixed(2) + ' ms',
			'±' + t.stats.rme.toFixed(2) + '%',
			t.stats.sample.length,
			''
		]);

		console.log(`Completed ${t.name}`);
	})
		.on('complete', function () {
			const fastestName = this.filter('fastest').map('name')[0];
			const slowestName = this.filter('slowest').map('name')[0];

			results.sort((a, b) => a[1] - b[1]);

			const fastestIndex = results.findIndex(row => row[0] === fastestName);
			const slowestIndex = results.findIndex(row => row[0] === slowestName);

			results[fastestIndex] = results[fastestIndex].map(x => '\u001b[32m' + x + '\u001b[0m');
			results[fastestIndex][5] = '\u001b[32mFastest\u001b[0m ';

			results[slowestIndex] = results[slowestIndex].map(x => '\u001b[31m' + x + '\u001b[0m');
			results[slowestIndex][5] = '\u001b[31mSlowest\u001b[0m';

			const output = table(results);
			console.log(output);
		})
};
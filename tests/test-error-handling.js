import { getSuite } from '../node_modules/just-test/dist/just-test.min.js';
import * as DataTier from '../dist/data-tier.js';

const suite = getSuite({ name: 'Testing erroneous cases' });

suite.runTest({ name: 'adding view with empty tie definition' }, () => {
	const elem = document.createElement('div');

	elem.dataset.tie = '';

	document.body.appendChild(elem);
});

suite.runTest({ name: 'accessing in other place the observable that was replaced' }, async test => {
	const
		inner = {},
		raw = { o: inner },
		data = DataTier.ties.create('errorA', raw),
		elem = document.createElement('div');

	data.observe(changes =>
		changes.forEach(change =>
			console.dir(change)));
	elem.dataset.tie = 'errorA => textContent';

	document.body.appendChild(elem);

	await test.waitNextMicrotask();

	data.o = inner;

	document.body.removeChild(elem);

	await test.waitNextMicrotask();

	document.body.appendChild(elem);
});
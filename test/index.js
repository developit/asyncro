import test from 'ava';
import { spy } from 'sinon';
import { series, parallel, map } from '..';

const get = v => Promise.resolve(v);

const sleep = time => new Promise( r => setTimeout(r, time) );


test('series', async t => {
	t.is(typeof series, 'function');

	t.deepEqual(
		await series([
			async () => await get(1),
			async () => await get(2)
		]),
		[1, 2]
	);
});


test('parallel', async t => {
	t.is(typeof parallel, 'function', 'should be a function');

	t.deepEqual(
		await parallel([
			async () => await get(1),
			async () => await get(2)
		]),
		[1, 2]
	);
});


test('map', async t => {
	t.is(typeof map, 'function');

	let fn = spy( async value => (await sleep(50), await get(value * 2)) );

	let start = Date.now();

	let out = await map([1, 2, 3], fn);

	t.deepEqual(out, [2, 4, 6]);

	let elapsed = Date.now() - start;

	t.true(elapsed < 100, 'Should invoke in parallel');
});

import assert from 'assert';
import { series, parallel } from '../src';

assert.equal(typeof series, 'function');

assert.equal(typeof parallel, 'function');

parallel([
	() => Promise.resolve('a'),
	() => Promise.resolve('b')
]).then( out => {
	assert.deepEqual(out, ['a', 'b']);

	console.log('✅ success');
	process.exit(0);
});

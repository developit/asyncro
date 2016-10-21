import assert from 'assert';
import { series, parallel } from '../src';

assert.equal(typeof series, 'function');

assert.equal(typeof parallel, 'function');

console.log('✅ success');
process.exit(0);

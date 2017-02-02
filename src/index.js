import { resolve, pushReducer } from './util';


/** Invoke an async reducer function on each item in the given Array,
 *	where the reducer transforms an accumulator value based on each item iterated over.
 *	**Note:** because `reduce()` is order-sensitive, iteration is sequential.
 *
 *	> This is an asynchronous version of `Array.prototype.reduce()`
 *
 *	@param {Array} array			The Array to reduce
 *	@param {Function} reducer		Async function, gets passed `(accumulator, value, index, array)` and returns a new value for `accumulator`
 *	@param {Any} [accumulator]		Optional initial accumulator value
 *	@returns final `accumulator` value
 *
 *	@example
 *	await reduce(
 *		['/foo', '/bar', '/baz'],
 *		async (accumulator, value) => {
 *			accumulator[v] = await fetch(value);
 *			return accumulator;
 *		},
 *		{}
 *	);
 */
export async function reduce(array, reducer, accumulator) {
	for (let i=0; i<array.length; i++) {
		accumulator = await reducer(accumulator, array[i], i, array);
	}
	return accumulator;
}


/** Invoke an async transform function on each item in the given Array **in parallel**,
 *	returning the resulting Array of mapped/transformed items.
 *
 *	> This is an asynchronous, parallelized version of `Array.prototype.map()`.
 *
 *	@param {Array} array			The Array to map over
 *	@param {Function} mapper		Async function, gets passed `(value, index, array)`, returns the new value.
 *	@returns {Array} resulting mapped/transformed values.
 *
 *	@example
 *	await map(
 *		['foo', 'baz'],
 *		async v => await fetch(v)
 *	)
 */
export function map(array, mapper) {
	return Promise.all(array.map(mapper));
}


/** Invoke an async filter function on each item in the given Array **in parallel**,
 *	returning an Array of values for which the filter function returned a truthy value.
 *
 *	> This is an asynchronous, parallelized version of `Array.prototype.filter()`.
 *
 *	@param {Array} array			The Array to filter
 *	@param {Function} filterer		Async function. Gets passed `(value, index, array)`, returns true to keep the value in the resulting filtered Array.
 *	@returns {Array} resulting filtered values
 *
 *	@example
 *	await filter(
 *		['foo', 'baz'],
 *		async v => (await fetch(v)).ok
 *	)
 */
export async function filter(array, filterer) {
	let mapped = await map(array, filterer);
	return array.filter( (v, i) => mapped[i] );
}


/** Invoke all async functions in an Array or Object **in parallel**, returning the result.
 *	@param {Array<Function>|Object<Function>} list		Array/Object with values that are async functions to invoke.
 *	@returns {Array|Object} same structure as `list` input, but with values now resolved.
 *
 *	@example
 *	await parallel([
 *		async () => await fetch('foo'),
 *		async () => await fetch('baz')
 *	])
 */
export async function parallel(list) {
	return await Promise.all(resolve(list));
}


/** Invoke all async functions in an Array or Object **sequentially**, returning the result.
 *	@param {Array<Function>|Object<Function>} list		Array/Object with values that are async functions to invoke.
 *	@returns {Array|Object} same structure as `list` input, but with values now resolved.
 *
 *	@example
 *	await series([
 *		async () => await fetch('foo'),
 *		async () => await fetch('baz')
 *	])
 */
export async function series(list) {
	return reduce(list, async (acc, v) => acc.concat(await v()), []);
}

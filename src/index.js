import { resolve, pushReducer } from './util';


/** Invoke an async reducer function on each item in the given Array,
 *	where the reducer transforms an accumulator value based on each item iterated over.
 *	**Note:** because `reduce()` is order-sensitive, iteration is sequential.
 *
 *	> This is an asynchronous version of `Array.prototype.reduce()`
 *
 *	@param {Array} array			The Array to reduce
 *	@param {Function} reducer		Async function that gets passed `(accumulator, value, index, array)`.
 *	@param {Any} [initialValue]		An initial accumulator value
 *	@returns {Any} accumulator		The final value of the accumulator
 *
 *	@example
 *	await reduce(['/foo', '/bar', '/baz'], async (acc, v) => {
 *		acc[v] = await (await fetch(v)).json();
 *		return acc;
 *	}, {});
 */
export async function reduce(arr, fn, val) {
	for (let i=0; i<arr.length; i++) {
		val = await fn(val, arr[i], i, arr);
	}
	return val;
}


/** Invoke an async transform function on each item in the given Array **in parallel**,
 *	returning the resulting Array of mapped/transformed items.
 *
 *	> This is an asynchronous, parallelized version of `Array.prototype.map()`.
 *
 *	@param {Array} array			The Array to map over
 *	@param {Function} mapper		Async function. Gets passed `(value, index, array)`, returns the new value.
 *	@returns {Array} mappedValues	The resulting mapped/transformed values.
 *
 *	@example
 *	await map(
 *		['foo', 'baz'],
 *		async v => await fetch(v)
 *	)
 */
export function map(arr, fn) {
	return Promise.all(arr.map(fn));
}


/** Invoke an async filter function on each item in the given Array **in parallel**,
 *	returning an Array of values for which the filter function returned a truthy value.
 *
 *	> This is an asynchronous, parallelized version of `Array.prototype.filter()`.
 *
 *	@param {Array} array			The Array to filter
 *	@param {Function} filterer		Async function. Gets passed `(value, index, array)`, returns true to keep the value in the resulting filtered Array.
 *	@returns {Array} filteredValues	The resulting filtered values.
 *
 *	@example
 *	await filter(
 *		['foo', 'baz'],
 *		async v => (await fetch(v)).ok
 *	)
 */
export async function filter(arr, fn) {
	let mapped = await map(arr, fn);
	return arr.filter( (v, i) => mapped[i] );
}


/** Invoke all async functions in an Array or Object **in parallel**, returning the result.
 *	@param {Array<Function>|Object<Function>} list		Array/Object with values that are async functions to invoke.
 *	@returns {Array|Object} mappedList					Same structure as `list` input, but with values now resolved.
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
 *	@returns {Array|Object} mappedList					Same structure as `list` input, but with values now resolved.
 *
 *	@example
 *	await series([
 *		async () => await fetch('foo'),
 *		async () => await fetch('baz')
 *	])
 */
export async function series(list) {
	return await reduce(resolve(list), pushReducer, []);
}

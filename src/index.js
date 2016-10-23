/** Async version of Array.prototype.reduce()
 *	await reduce(['/foo', '/bar', '/baz'], async (acc, v) => {
 *		acc[v] = await (await fetch(v)).json();
 *		return acc;
 *	}, {});
 */
export async function reduce(arr, fn, val, pure) {
	for (let i=0; i<arr.length; i++) {
		let v = await fn(val, arr[i], i, arr);
		if (pure!==false) val = v;
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

function identity(x) {
	return x;
}

function resolve(list) {
	let out = Array.isArray(list) ? [] : {};
	for (let i in list) if (list.hasOwnProperty(i)) out[i] = list[i]();
	return out;
}

/** Provided by standard lib, replaces async.parallel()
 *	await parallel([
 *		() => fetch('foo'),
 *		() => fetch('baz')
 *	])
 */
export async function parallel(list) {
	return await Promise.all(resolve(list));
}

/** Replaces async.series()
 *	await series([
 *		() => fetch('foo'),
 *		() => fetch('baz')
 *	])
 */
export async function series(list) {
	return await map(resolve(list), identity);
}

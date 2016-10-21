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

/** Async version of Array.prototype.map()
 *	await map(['foo', 'baz'], async v => await fetch(v) )
 */
export async function map(arr, fn) {
	return await reduce(arr, async (acc, value, index, arr) => {
		acc.push(await fn(value, index, arr));
	}, [], false);
}

/** Async version of Array.prototype.filter()
 *	await filter(['foo', 'baz'], async v => (await fetch(v)).ok )
 */
export async function filter(arr, fn) {
	return await reduce(arr, async (acc, value, index, arr) => {
		if (await fn(value, index, arr)) acc.push(value);
	}, [], false);
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

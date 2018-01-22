/** Invoke a list (object or array) of functions, returning their results in the same structure.
 *	@private
 */
export function resolve(list) {
	let out = Array.isArray(list) ? [] : {};
	for (let i in list) if (list.hasOwnProperty(i)) out[i] = list[i]();
	return out;
}

/** reduce() callback that pushes values into an Array accumulator
 *	@private
 */
export async function pushReducer(acc, v) {
  acc.push(await v());
	return acc;
}

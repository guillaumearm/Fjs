/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js: is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

export const _ = undefined

////////////////////////////////////////////////////////////////////////////////
/////////////////////// PRIVATE ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const isUndefined = x => (x === _)
const concatUndefined = xsa => xsb =>
	xsa.map(x => !isUndefined(x) ? x : xsb.shift()).concat(xsb)

////////////////////////////////////////////////////////////////////////////////
/////////////////////// USEFUL FOR COMPOSITION /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export const curry = (f, ...xs) =>
	xs.length === f.length
		? f(...xs)
		: curry.bind(this, f, ...xs)

export const apply = (f, ...xs) => (...otherXs) =>
	f.apply (this, concatUndefined (xs) (otherXs) )

export const compose = f => g => x => f(g(x))
export const update = obj => (...changes) => Object.assign({}, obj, ...changes)

export const foldl = f => acc => xs => xs.reduce(f, acc)
export const foldr = f => acc => xs => xs.reverse().reduce(f, acc)

////////////////////////////////////////////////////////////////////////////////
/////////////////////// USEFUL FOR COMPOSITION /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const incr = x => x + 1
export const decr = x => x - 1

export default {
	_,
	curry, apply, compose, update,
	foldl, foldr,
	incr, decr
}



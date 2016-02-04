/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js: is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/


/////////////////////// PRIVATE ////////////////////////////////////////////////
const isUndefined = x => (x === _)
const concatUndefined = xsa => xsb =>
	xsa.map(x => !isUndefined(x) ? x : xsb.shift()).concat(xsb)
////////////////////////////////////////////////////////////////////////////////

export const _ = undefined

export const union = obj => (...changes) => Object.assign({}, obj, ...changes)

export const curry = (f, ...xs) =>
	xs.length === f.length
		? f(...xs)
		: curry.bind(this, f, ...xs)

export const apply = (f, ...xs) => (...otherXs) =>
	f.apply (this, concatUndefined (xs) (otherXs) )

export const compose = f => g => x => f(g(x))
export const foldl = f => acc => xs => xs.reduce(f, acc)
export const foldr = f => acc => xs => xs.reverse().reduce(f, acc)

export default {union, curry, apply, compose, foldl, foldr, _}


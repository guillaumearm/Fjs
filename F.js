/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js; is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

// TODO: apply function

export const curry = (f, ...xs) =>
	xs.length === f.length
		? f(...xs)
		: curry.bind(this, f, ...xs)
		
export const merge = obj => (...changes) => Object.assign({}, obj, ...changes)

export const compose = f => g => x => f(g(x))
export const foldl = f => acc => xs => xs.reduce(f, acc)
export const foldr = f => acc => xs => xs.reverse().reduce(f, acc)

export default {curry, merge, compose, foldl, foldr}


/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js; is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

// TODO: apply function

const curry = (f, ...xs) =>
	xs.length === f.length
		? f(...xs)
		: curry.bind(this, f, ...xs)
		
const merge = obj => (...changes) => Object.assign({}, obj, ...changes)

const compose = f => g => x => f(g(x))
const foldl = f => acc => xs => xs.reduce(f, acc)
const foldr = f => acc => xs => xs.reverse().reduce(f, acc)

export default {curry, merge, compose, foldl, foldr}


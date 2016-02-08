/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js: is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

export const __ = undefined

////////////////////////////////////////////////////////////////////////////////
/////////////////////// PRIVATE ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const isUndefined = x => (x === __)
const concatUndefined = xsa => xsb =>
	xsa.map(x => !isUndefined(x) ? x : xsb.shift()).concat(xsb)

////////////////////////////////////////////////////////////////////////////////
/////////////////////// FUNCTIONAL STYLE BASICS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const curry = (f, ...xs) =>
	xs.length === f.length
		? f(...xs)
		: curry.bind(this, f, ...xs)

export const apply = (f, ...xs) => (...otherXs) =>
	f.apply (this, concatUndefined (xs) (otherXs) )

export const compose = f => g => x => f(g(x))

export const flip = f => a => b => f(b, a)

// inject works with objects
export const inject = curry ( (changes, obj) => { return {...obj, ...changes} } )

// f :: (element, index, array) => array
export const map = f => xs => xs.map(f, this)
export const filter = f => xs => xs.filter(f, this)

// p :: (element, index, array) => array
// p is a predicat
export const all = p => xs => xs.every(p, this)
export const any = p => xs => xs.some(p, this)

// f :: (accumulator, element, index, array) => accumulator
export const foldl = f => acc => xs => xs.reduce(f, acc)
export const foldr = f => acc => xs => xs.reverse().reduce(f, acc)


////////////////////////////////////////////////////////////////////////////////
/////////////////////// USEFUL FOR COMPOSITION /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const id = x => x
export const not = x => !x

export const and = a => b => b && a
export const or = a => b =>  b || a

export const eq = a => b =>  b == a
export const ne = a => b =>  b != a

export const lt = a => b =>  b < a
export const gt = a => b =>  b > a
export const le = a => b =>  b <= a
export const ge = a => b =>  b >= a

export const incr = x => ++x
export const decr = x => --x

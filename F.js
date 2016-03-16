/***************************************************************************************
** Author: Guillaume ARM ***************************************************************
** F.js: is little library utilites made for doing functional coding style with JS. ****
***************************************************************************************/

import './test'
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

export const compose = fs => x => {
    if (!fs.length) return x
    const f = fs.pop()
    return compose (fs) (f(x))
}

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
export const foldr = f => acc => xs => xs.reduceRight(f, acc)


////////////////////////////////////////////////////////////////////////////////
/////////////////////// USEFUL FOR COMPOSITION /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const print = x => { console.log(x) ; return x }
export const id = x => x
export const not = x => !x

export const and_ = b => a =>  a && b
export const or_  = b => a =>  a || b
export const eq_  = b => a =>  a == b
export const ne_  = b => a =>  a != b
export const lt_  = b => a =>  a < b
export const gt_  = b => a =>  a > b
export const le_  = b => a =>  a <= b
export const ge_  = b => a =>  a >= b

export const _and = a => b =>  a && b
export const _or  = a => b =>  a || b
export const _eq  = a => b =>  a == b
export const _ne  = a => b =>  a != b
export const _lt  = a => b =>  a < b
export const _gt  = a => b =>  a > b
export const _le  = a => b =>  a <= b
export const _ge  = a => b =>  a >= b

export const incr = x => ++x
export const decr = x => --x


////////////////////////////////////////////////////////////////////////////////
/////////////////////// Monads /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Monadic composition
export const composeM = fs => m => {
	if (!fs.length) return m
	const f = fs.pop()
	return composeM (fs) (m.bindM(f))
}

// Monadic do notation
export const _do = gen => {
    const step = value => {
        const result = gen.next(value)
        if (result.done)
            return result.value
        return result.value.bindM(step)
    }
		return step()
}

export const _doAsync = gen => new Async((done = id) => {
    const step = value => {
        const result = gen.next(value)
        if (result.done)
				{
						let ret = done(result.value)
						return (typeof ret === "function")
						  ? Async(ret) : ret
				}
        return result.value.bindM(step)
    }
		return step()
})


// Maybe Monad
const _Nothing = () => {
	const unit = undefined
	const bindM = () => _Nothing()
	return { unit, bindM }
}
export const Nothing = _Nothing()

export const Just = (a) => {
	const unit = a
	const bindM = f => {
		const r = f(unit)
		return (r && r.bindM) ? r : Just(r)
	}
	return { unit, bindM }
}



// Writer Monad
export const Writer = (a, b) => new _Writer(a,b)

class _Writer {
	constructor(a, b = []) {
		this.unit = [a, b]
	}
  bindM(f) {
		const [a, b] = this.unit
		const r = f(a)
		const [aa, bb] = (r && r.bindM) ? r.unit : Writer(r).unit
		this.unit = [aa, b.concat (bb)]
		return this
  }
}

// Continuation Monad


// Async Monad
export const Async = (a) => new _Async(a)
class _Async {
	constructor(a = id) {
    if (a instanceof _Async)
   		this.unit = a.unit
    else if (Array.isArray(a))
			this.unit = _parallelArray(this, a)
		else
			this.unit = a
	}
	bindM(nextAsync) {
		const currentAsync = this.unit
		currentAsync(nextAsync)
		return (typeof nextAsync === 'function')
			? Async (nextAsync) : Async (() => nextAsync)
	}
}

// Async parallel
const _parallelArray = (m, fs) => {
	let taskCounter = fs.length
	let xs = []

	return done => {
		fs.forEach((f, i) => {
			const task = f && f.unit
			task(res => {
				xs[i] = res
				if (!--taskCounter) done(xs)
			})
		})
	}
}

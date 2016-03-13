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
export const foldr = f => acc => xs => xs.reverse().reduce(f, acc)


////////////////////////////////////////////////////////////////////////////////
/////////////////////// USEFUL FOR COMPOSITION /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const print = x => { console.log(x) ; return x }
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

export const _asyncDo = gen => new Async((done = id) => {
    const step = value => {
        const result = gen.next(value)
        if (result.done)
            return done(result.value);
        return result.value.bindM(step)
    }
		return step()
})


// Maybe Monad
export class Just {
	constructor(a) {
		this.return = a
	}
  bindM(f) {
    return f(this.return)
  }
}

export class Nothing {
	constructor() {
		this.return = null
	}
  bindM() {
   return this
  }
}

// Writer Monad
export class Writer {
	constructor(a, b = []) {
		this.return = [a, b]
	}
  bindM(f) {
		const [a, b] = this.return
    const [aa, bb] = f(a).return
		this.return = [aa, b.concat (bb)]
		return this
  }
}



// Async parallel
const _parallelArray = (m, fs) => {
	let taskCounter = fs.length
	let xs = []

	return done => {
		fs.forEach((f, i) => {
			const task = f && f.return
			task(res => {
				xs[i] = res
				if (!--taskCounter) done(xs)
			})
		})
	}
}
// Async Monad
export class Async {
	constructor(f = undefined) {
		if (f && f.constructor && f.constructor.name === "Async")
			this.return = f.return
		else if (Array.isArray(f))
			this.return = _parallelArray(this, f)
		else
			this.return = f
	}
	bindM(nextAsync) {
		const currentAsync = this.return
		currentAsync(nextAsync)
		return this
	}
}
